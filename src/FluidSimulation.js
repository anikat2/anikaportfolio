import { useRef, useEffect, useCallback } from 'react';


const N = 96;
const SIZE = N + 2;
const GS_ITERS = 8;

const IX = (i, j) => i + SIZE * j;

function addSource(x, s, dt) {
  for (let i = 0; i < x.length; i++) x[i] += dt * s[i];
}

function setBnd(b, x) {
  for (let i = 1; i <= N; i++) {
    x[IX(0, i)] = b === 1 ? -x[IX(1, i)] : x[IX(1, i)];
    x[IX(N + 1, i)] = b === 1 ? -x[IX(N, i)] : x[IX(N, i)];
    x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
    x[IX(i, N + 1)] = b === 2 ? -x[IX(i, N)] : x[IX(i, N)];
  }
  x[IX(0, 0)] = 0.5 * (x[IX(1, 0)] + x[IX(0, 1)]);
  x[IX(0, N + 1)] = 0.5 * (x[IX(1, N + 1)] + x[IX(0, N)]);
  x[IX(N + 1, 0)] = 0.5 * (x[IX(N, 0)] + x[IX(N + 1, 1)]);
  x[IX(N + 1, N + 1)] = 0.5 * (x[IX(N, N + 1)] + x[IX(N + 1, N)]);
}

function linSolve(b, x, x0, a, c) {
  const cRecip = 1 / c;
  for (let k = 0; k < GS_ITERS; k++) {
    for (let j = 1; j <= N; j++) {
      for (let i = 1; i <= N; i++) {
        x[IX(i, j)] =
          (x0[IX(i, j)] +
            a * (x[IX(i - 1, j)] + x[IX(i + 1, j)] + x[IX(i, j - 1)] + x[IX(i, j + 1)])) *
          cRecip;
      }
    }
    setBnd(b, x);
  }
}

function diffuse(b, x, x0, diff, dt) {
  const a = dt * diff * N * N;
  linSolve(b, x, x0, a, 1 + 4 * a);
}

function advect(b, d, d0, u, v, dt) {
  const dt0 = dt * N;
  for (let j = 1; j <= N; j++) {
    for (let i = 1; i <= N; i++) {
      let x = i - dt0 * u[IX(i, j)];
      let y = j - dt0 * v[IX(i, j)];
      if (x < 0.5) x = 0.5;
      if (x > N + 0.5) x = N + 0.5;
      const i0 = x | 0;
      const i1 = i0 + 1;
      if (y < 0.5) y = 0.5;
      if (y > N + 0.5) y = N + 0.5;
      const j0 = y | 0;
      const j1 = j0 + 1;
      const s1 = x - i0;
      const s0 = 1 - s1;
      const t1 = y - j0;
      const t0 = 1 - t1;
      d[IX(i, j)] =
        s0 * (t0 * d0[IX(i0, j0)] + t1 * d0[IX(i0, j1)]) +
        s1 * (t0 * d0[IX(i1, j0)] + t1 * d0[IX(i1, j1)]);
    }
  }
  setBnd(b, d);
}

function project(u, v, p, div) {
  for (let j = 1; j <= N; j++) {
    for (let i = 1; i <= N; i++) {
      div[IX(i, j)] =
        (-0.5 * (u[IX(i + 1, j)] - u[IX(i - 1, j)] + v[IX(i, j + 1)] - v[IX(i, j - 1)])) / N;
      p[IX(i, j)] = 0;
    }
  }
  setBnd(0, div);
  setBnd(0, p);
  linSolve(0, p, div, 1, 4);
  for (let j = 1; j <= N; j++) {
    for (let i = 1; i <= N; i++) {
      u[IX(i, j)] -= 0.5 * N * (p[IX(i + 1, j)] - p[IX(i - 1, j)]);
      v[IX(i, j)] -= 0.5 * N * (p[IX(i, j + 1)] - p[IX(i, j - 1)]);
    }
  }
  setBnd(1, u);
  setBnd(2, v);
}

function swap(sim, key) {
  const tmp = sim[key];
  sim[key] = sim[key + '0'];
  sim[key + '0'] = tmp;
}

function velStep(sim, visc, dt) {
  addSource(sim.u, sim.u0, dt);
  addSource(sim.v, sim.v0, dt);
  swap(sim, 'u');
  diffuse(1, sim.u, sim.u0, visc, dt);
  swap(sim, 'v');
  diffuse(2, sim.v, sim.v0, visc, dt);
  project(sim.u, sim.v, sim.u0, sim.v0);
  swap(sim, 'u');
  swap(sim, 'v');
  advect(1, sim.u, sim.u0, sim.u0, sim.v0, dt);
  advect(2, sim.v, sim.v0, sim.u0, sim.v0, dt);
  project(sim.u, sim.v, sim.u0, sim.v0);
}

function densStep(sim, diff, dt) {
  addSource(sim.dens, sim.dens0, dt);
  swap(sim, 'dens');
  diffuse(0, sim.dens, sim.dens0, diff, dt);
  swap(sim, 'dens');
  advect(0, sim.dens, sim.dens0, sim.u, sim.v, dt);
}

function createSim() {
  const zeros = () => new Float32Array(SIZE * SIZE);
  return {
    u: zeros(), v: zeros(), u0: zeros(), v0: zeros(),
    dens: zeros(), dens0: zeros(),
  };
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 1040;

function getFluidViewport(canvas) {
  const size = Math.max(canvas.width, canvas.height);
  return {
    x: (canvas.width - size) / 2,
    y: (canvas.height - size) / 2,
    size,
  };
}

export default function FluidSimulation() {
  const canvasRef = useRef(null);
  const offscreenRef = useRef(null);
  const simRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, down: false, has: false });

  const viscRef = useRef(0.00008);
  const diffRef = useRef(0.00005);
  const hueRef = useRef(225);
  const runningRef = useRef(true);
  const brushRef = useRef(6);

  const interactedRef = useRef(false);
  const hintAlphaRef = useRef(1);
  const hintTrailRef = useRef([]);

  if (!simRef.current) simRef.current = createSim();

  useEffect(() => {
    const offscreen = document.createElement('canvas');
    offscreen.width = N;
    offscreen.height = N;
    offscreenRef.current = offscreen;
    const octx = offscreen.getContext('2d');
    const imgData = octx.createImageData(N, N);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingEnabled = true;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const dt = 0.12;

    function step() {
      const sim = simRef.current;
      if (runningRef.current) {
        velStep(sim, viscRef.current, dt);
        densStep(sim, diffRef.current, dt);
        for (let i = 0; i < sim.dens.length; i++) sim.dens[i] *= 0.997;
      }

      const data = imgData.data;
      const baseHue = hueRef.current; // indigo, resting ink
      const fastHue = 8; // vermillion, ink in motion
      for (let j = 1; j <= N; j++) {
        for (let i = 1; i <= N; i++) {
          const idx = IX(i, j);
          const d = Math.min(1, sim.dens[idx] / 3);
          const speed = Math.min(1, Math.hypot(sim.u[idx], sim.v[idx]) * 6);
          const h = baseHue + (fastHue - baseHue) * speed;
          const [r, g, b] = hslToRgb(h, 0.4 + speed * 0.25, 0.22 - d * 0.05);
          const px = ((j - 1) * N + (i - 1)) * 4;
          data[px] = r;
          data[px + 1] = g;
          data[px + 2] = b;
          data[px + 3] = d * 255; // alpha carries the ink concentration
        }
      }
      octx.putImageData(imgData, 0, 0);
      ctx.fillStyle = '#ece3d2'; // washi paper base
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const viewport = getFluidViewport(canvas);
      ctx.drawImage(
        offscreen,
        0,
        0,
        N,
        N,
        viewport.x,
        viewport.y,
        viewport.size,
        viewport.size
      );

      // gesture hint: a small looping "drag" motion with a fading comet
      // trail, shown until the person actually drags, then it fades for good
      const target = interactedRef.current ? 0 : 1;
      hintAlphaRef.current += (target - hintAlphaRef.current) * 0.06;
      if (hintAlphaRef.current > 0.01) {
        const t = performance.now() / 1000;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const rx = canvas.width * 0.14;
        const ry = canvas.height * 0.09;
        const hx = cx + rx * Math.cos(t * 0.9);
        const hy = cy + ry * Math.sin(t * 1.8);

        const trail = hintTrailRef.current;
        trail.push({ x: hx, y: hy });
        if (trail.length > 18) trail.shift();

        ctx.save();
        trail.forEach((p, idx) => {
          const f = idx / trail.length;
          ctx.beginPath();
          ctx.fillStyle = `rgba(43,38,30,${f * hintAlphaRef.current * 0.35})`;
          ctx.arc(p.x, p.y, 3 + f * 9, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.beginPath();
        ctx.strokeStyle = `rgba(43,38,30,${hintAlphaRef.current * 0.75})`;
        ctx.lineWidth = 1.5;
        ctx.arc(hx, hy, 13, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const injectAt = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const pointerX = (clientX - rect.left) * (canvas.width / rect.width);
    const pointerY = (clientY - rect.top) * (canvas.height / rect.height);
    const viewport = getFluidViewport(canvas);
    const fx = (pointerX - viewport.x) / viewport.size;
    const fy = (pointerY - viewport.y) / viewport.size;
    if (fx < 0 || fx > 1 || fy < 0 || fy > 1) return;

    const gx = Math.max(1, Math.min(N, Math.floor(fx * N) + 1));
    const gy = Math.max(1, Math.min(N, Math.floor(fy * N) + 1));

    const m = mouseRef.current;
    const sim = simRef.current;
    const r = brushRef.current;

    let du = 0, dv = 0;
    if (m.has) {
      du = (fx * N - m.px) * 3;
      dv = (fy * N - m.py) * 3;
    }
    m.px = fx * N;
    m.py = fy * N;
    m.has = true;

    for (let oj = -r; oj <= r; oj++) {
      for (let oi = -r; oi <= r; oi++) {
        const i = gx + oi;
        const j = gy + oj;
        if (i < 1 || i > N || j < 1 || j > N) continue;
        const dist = Math.hypot(oi, oj);
        if (dist > r) continue;
        const falloff = 1 - dist / (r + 1);
        const idx = IX(i, j);
        sim.dens[idx] += 2.8 * falloff;
        sim.dens0[idx] += 4 * falloff;
        sim.u0[idx] += du * falloff;
        sim.v0[idx] += dv * falloff;
      }
    }
  }, []);

  const clearImpulses = () => {
    const sim = simRef.current;
    sim.dens0.fill(0);
    sim.u0.fill(0);
    sim.v0.fill(0);
  };

  const handlePointerMove = (e) => {
    if (!mouseRef.current.down) return;
    injectAt(e.clientX, e.clientY);
  };
  const handlePointerDown = (e) => {
    interactedRef.current = true;
    mouseRef.current.down = true;
    mouseRef.current.has = false;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    injectAt(e.clientX, e.clientY);
  };
  const handlePointerUp = () => {
    mouseRef.current.down = false;
    mouseRef.current.has = false;
    clearImpulses();
  };
  return (
    <div className="fluid-background" aria-hidden="true">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
}