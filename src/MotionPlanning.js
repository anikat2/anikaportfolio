import { useRef, useEffect, useCallback } from 'react';

// ---- Motion planning: RRT + trapezoidal velocity profile ---------------
// Two separate planning problems chained together, the way a real robot
// stack splits them:
//   1. PATH PLANNING (what geometric route avoids collision?) — solved here
//      with a Rapidly-exploring Random Tree: repeatedly sample a random
//      point, steer from the nearest existing tree node toward it by a
//      fixed step, and keep the new node if the segment is collision-free.
//      RRT is biased-random rather than exhaustive, which is exactly why
//      it scales to spaces where a full grid search (A*, Dijkstra) gets
//      expensive — at the cost of not guaranteeing the shortest path.
//   2. TRAJECTORY PLANNING (how fast to move along that route over time?)
//      — solved with a trapezoidal velocity profile: constant acceleration
//      up to a cruise speed, constant cruise, then symmetric deceleration.
//      If the path is too short to ever reach cruise speed, it degrades to
//      a triangular profile automatically.

const CANVAS_PX = 640;
const STEP = 22;
const GOAL_RADIUS = 16;
const GOAL_BIAS = 0.08;
const MAX_ITERS_PER_RUN = 4000;
const ITERS_PER_FRAME = 10;

const INK = '#2b3a55';
const ACCENT = '#a53a2c';
const PAPER = '#ede6d6';
const OBSTACLE = '#3a3630';

function makeObstacles() {
  // A handful of fixed-ish rectangles with enough randomness to feel
  // organic, but always leaving room to route around them.
  const cells = [
    [120, 90, 150, 40], [120, 90, 40, 160],
    [340, 60, 40, 220], [420, 180, 160, 36],
    [180, 340, 220, 34], [90, 420, 36, 160],
    [420, 380, 40, 200], [300, 460, 160, 34],
  ];
  return cells.map(([x, y, w, h]) => ({
    x: x + (Math.random() * 16 - 8),
    y: y + (Math.random() * 16 - 8),
    w, h,
  }));
}

function pointInObstacles(x, y, obstacles) {
  for (const o of obstacles) {
    if (x >= o.x && x <= o.x + o.w && y >= o.y && y <= o.y + o.h) return true;
  }
  return false;
}

function segmentCollides(x0, y0, x1, y1, obstacles) {
  const steps = 6;
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    if (pointInObstacles(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, obstacles)) return true;
  }
  return false;
}

function computeProfile(length) {
  const a = 1400;
  const vmaxTarget = 260;
  const distAccel = (vmaxTarget * vmaxTarget) / (2 * a);
  let vmax, t1, t2, t3, distAccel1, cruiseDist;
  if (2 * distAccel >= length) {
    vmax = Math.sqrt(Math.max(1, a * length));
    t1 = t3 = vmax / a;
    t2 = 0;
    distAccel1 = 0.5 * a * t1 * t1;
    cruiseDist = 0;
  } else {
    vmax = vmaxTarget;
    t1 = t3 = vmax / a;
    distAccel1 = 0.5 * a * t1 * t1;
    cruiseDist = length - 2 * distAccel1;
    t2 = cruiseDist / vmax;
  }
  return { a, vmax, t1, t2, t3, distAccel1, cruiseDist, total: t1 + t2 + t3, length };
}

function profileAt(p, t) {
  const { a, vmax, t1, t2, distAccel1, cruiseDist } = p;
  if (t <= t1) return { s: 0.5 * a * t * t, v: a * t };
  if (t <= t1 + t2) return { s: distAccel1 + vmax * (t - t1), v: vmax };
  const td = Math.max(0, t - t1 - t2);
  const v = Math.max(0, vmax - a * td);
  const s = distAccel1 + cruiseDist + vmax * td - 0.5 * a * td * td;
  return { s: Math.min(p.length, s), v };
}

export default function MotionPlanning() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const obstaclesRef = useRef(null);
  if (!obstaclesRef.current) obstaclesRef.current = makeObstacles();

  const stateRef = useRef({
    start: { x: 60, y: CANVAS_PX / 2 },
    goal: null,
    nodes: [],
    found: false,
    goalNodeIdx: -1,
    iters: 0,
    phase: 'idle', // idle | planning | traveling
    path: [],
    cum: [],
    profile: null,
    elapsed: 0,
    agent: { x: 60, y: CANVAS_PX / 2 },
  });

  const hintRef = useRef({ interacted: false, alpha: 1, trail: [] });

  const startPlanning = useCallback((gx, gy) => {
    const st = stateRef.current;
    if (pointInObstacles(gx, gy, obstaclesRef.current)) return;
    const from = st.phase === 'idle' && st.path.length ? st.agent : st.start;
    st.start = { x: from.x, y: from.y };
    st.goal = { x: gx, y: gy };
    st.nodes = [{ x: st.start.x, y: st.start.y, parent: -1 }];
    st.found = false;
    st.goalNodeIdx = -1;
    st.iters = 0;
    st.phase = 'planning';
    st.path = [];
    st.cum = [];
    st.profile = null;
    st.elapsed = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let lastT = null;

    function rrtStep() {
      const st = stateRef.current;
      const obstacles = obstaclesRef.current;
      for (let k = 0; k < ITERS_PER_FRAME && !st.found && st.iters < MAX_ITERS_PER_RUN; k++) {
        st.iters++;
        let sx, sy;
        if (Math.random() < GOAL_BIAS) {
          sx = st.goal.x; sy = st.goal.y;
        } else {
          sx = Math.random() * CANVAS_PX;
          sy = Math.random() * CANVAS_PX;
        }
        let nearestIdx = 0, nearestD = Infinity;
        for (let i = 0; i < st.nodes.length; i++) {
          const n = st.nodes[i];
          const d = (n.x - sx) ** 2 + (n.y - sy) ** 2;
          if (d < nearestD) { nearestD = d; nearestIdx = i; }
        }
        const nearest = st.nodes[nearestIdx];
        const dist = Math.hypot(sx - nearest.x, sy - nearest.y) || 1;
        const nx = nearest.x + ((sx - nearest.x) / dist) * Math.min(STEP, dist);
        const ny = nearest.y + ((sy - nearest.y) / dist) * Math.min(STEP, dist);
        if (nx < 4 || nx > CANVAS_PX - 4 || ny < 4 || ny > CANVAS_PX - 4) continue;
        if (segmentCollides(nearest.x, nearest.y, nx, ny, obstacles)) continue;
        st.nodes.push({ x: nx, y: ny, parent: nearestIdx });
        if (Math.hypot(nx - st.goal.x, ny - st.goal.y) < GOAL_RADIUS) {
          st.found = true;
          st.goalNodeIdx = st.nodes.length - 1;
        }
      }

      if (st.found) {
        const path = [];
        let idx = st.goalNodeIdx;
        while (idx !== -1) {
          path.push({ x: st.nodes[idx].x, y: st.nodes[idx].y });
          idx = st.nodes[idx].parent;
        }
        path.reverse();
        path.push({ x: st.goal.x, y: st.goal.y });
        const cum = [0];
        for (let i = 1; i < path.length; i++) {
          cum.push(cum[i - 1] + Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y));
        }
        st.path = path;
        st.cum = cum;
        st.profile = computeProfile(cum[cum.length - 1] || 1);
        st.phase = 'traveling';
        st.elapsed = 0;
      } else if (st.iters >= MAX_ITERS_PER_RUN) {
        st.phase = 'idle'; // give up gracefully; user can click a new goal
      }
    }

    function agentPosAt(s) {
      const { path, cum } = stateRef.current;
      if (path.length < 2) return path[0] || stateRef.current.agent;
      let i = 1;
      while (i < cum.length && cum[i] < s) i++;
      i = Math.min(i, cum.length - 1);
      const segLen = cum[i] - cum[i - 1] || 1;
      const t = (s - cum[i - 1]) / segLen;
      const a = path[i - 1], b = path[i];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }

    function draw() {
      const st = stateRef.current;
      const obstacles = obstaclesRef.current;

      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, CANVAS_PX, CANVAS_PX);

      ctx.fillStyle = OBSTACLE;
      for (const o of obstacles) ctx.fillRect(o.x, o.y, o.w, o.h);

      // exploration tree, faint
      ctx.strokeStyle = 'rgba(43,58,85,0.28)';
      ctx.lineWidth = 1;
      for (const n of st.nodes) {
        if (n.parent === -1) continue;
        const p = st.nodes[n.parent];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }

      // found path, bold
      if (st.path.length > 1) {
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(st.path[0].x, st.path[0].y);
        for (let i = 1; i < st.path.length; i++) ctx.lineTo(st.path[i].x, st.path[i].y);
        ctx.stroke();
      }

      // start marker
      ctx.beginPath();
      ctx.arc(st.start.x, st.start.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = INK;
      ctx.fill();

      // goal marker
      if (st.goal) {
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(st.goal.x, st.goal.y, 7, 0, Math.PI * 2);
        ctx.stroke();
      }

      // agent + profile advance
      if (st.phase === 'traveling') {
        st.elapsed += 1 / 60;
        const { s } = profileAt(st.profile, st.elapsed);
        st.agent = agentPosAt(s);
        if (st.elapsed >= st.profile.total) {
          st.phase = 'idle';
          st.agent = { x: st.goal.x, y: st.goal.y };
        }
      }

      ctx.beginPath();
      ctx.arc(st.agent.x, st.agent.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = INK;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(st.agent.x, st.agent.y, 7, 0, Math.PI * 2);
      ctx.strokeStyle = PAPER;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // velocity-profile inset (top-left) — only once a path has existed
      if (st.profile) {
        const px = 16, py = 16, pw = 150, ph = 46;
        ctx.strokeStyle = 'rgba(43,38,30,0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, py + ph);
        ctx.lineTo(px + pw, py + ph);
        ctx.stroke();

        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        const N = 40;
        for (let i = 0; i <= N; i++) {
          const tt = (i / N) * st.profile.total;
          const { v } = profileAt(st.profile, tt);
          const x = px + (i / N) * pw;
          const y = py + ph - (v / st.profile.vmax) * ph;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (st.phase === 'traveling') {
          const tf = Math.min(1, st.elapsed / st.profile.total);
          const { v } = profileAt(st.profile, st.elapsed);
          const mx = px + tf * pw;
          const my = py + ph - (v / st.profile.vmax) * ph;
          ctx.beginPath();
          ctx.arc(mx, my, 3, 0, Math.PI * 2);
          ctx.fillStyle = ACCENT;
          ctx.fill();
        }
      }

      // discoverability hint: a small looping ghost-drag near the obstacles,
      // shown until the first click, then fades out permanently
      const hint = hintRef.current;
      const target = hint.interacted ? 0 : 1;
      hint.alpha += (target - hint.alpha) * 0.05;
      if (hint.alpha > 0.01) {
        const t = performance.now() / 1000;
        const hx = 470 + 40 * Math.cos(t * 0.8);
        const hy = 470 + 26 * Math.sin(t * 1.5);
        hint.trail.push({ x: hx, y: hy });
        if (hint.trail.length > 16) hint.trail.shift();
        ctx.save();
        hint.trail.forEach((p, idx) => {
          const f = idx / hint.trail.length;
          ctx.beginPath();
          ctx.fillStyle = `rgba(43,38,30,${f * hint.alpha * 0.3})`;
          ctx.arc(p.x, p.y, 2 + f * 7, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.beginPath();
        ctx.strokeStyle = `rgba(43,38,30,${hint.alpha * 0.7})`;
        ctx.lineWidth = 1.3;
        ctx.arc(hx, hy, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    function frame(t) {
      if (lastT == null) lastT = t;
      lastT = t;
      const st = stateRef.current;
      if (st.phase === 'planning') rrtStep();
      draw();
      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerDown = (e) => {
    hintRef.current.interacted = true;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_PX;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_PX;
    startPlanning(x, y);
  };

  return (
    <div className="motion-planning">
      <canvas
        ref={canvasRef}
        width={CANVAS_PX}
        height={CANVAS_PX}
        onPointerDown={handlePointerDown}
        aria-label="Motion-planning field. Click to set a destination."
      />
      <div className="motion-planning-label">
        RRT search &middot; trapezoidal velocity profile; used in robot movement
      </div>
    </div>
  );
}