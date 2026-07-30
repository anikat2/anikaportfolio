import { useRef, useEffect, useCallback } from 'react';

// ---- Simple rigid-body dynamics ---------------------------------------
// Each dropped object is a rigid disc with linear velocity (vx, vy) and
// angular velocity (omega). Integration is explicit Euler:
//   v += g * dt
//   p += v * dt
// On collision with the floor or a wall, the velocity component along the
// contact normal is reflected and scaled by a restitution coefficient
// (energy lost per bounce), and a little of the tangential velocity is
// converted into spin (and vice versa via rolling friction) so the object
// looks like it's actually rolling/tumbling rather than just reflecting.

const GRAVITY = 2200; // px/s^2
const RESTITUTION = 0.56;
const WALL_RESTITUTION = 0.62;
const FLOOR_FRICTION = 0.86; // tangential velocity retained per bounce
const AIR_DAMPING = 0.999;
const SPIN_DAMPING = 0.985;
const REST_EPS = 26; // vy below this at floor contact => settle
const MAX_BODIES = 60;

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 360;

const INK_COLORS = ['#2b3a55', '#a53a2c', '#3f4a35', '#5a4632'];

function makeBody(x, y) {
  const r = 10 + Math.random() * 12;
  return {
    x, y, r,
    vx: (Math.random() - 0.5) * 60,
    vy: 0,
    rot: Math.random() * Math.PI * 2,
    omega: (Math.random() - 0.5) * 2,
    color: INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)],
    resting: false,
  };
}

function stepBody(b, dt, w, h, floorY) {
  if (b.resting) {
    // small settle: keep integrating rotation/friction decay only
    b.omega *= SPIN_DAMPING;
    b.vx *= 0.9;
    b.x += b.vx * dt;
    b.rot += b.omega * dt;
    if (b.x - b.r < 0) { b.x = b.r; b.vx *= -WALL_RESTITUTION; }
    if (b.x + b.r > w) { b.x = w - b.r; b.vx *= -WALL_RESTITUTION; }
    return;
  }

  b.vy += GRAVITY * dt;
  b.vx *= AIR_DAMPING;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  b.rot += b.omega * dt;
  b.omega *= SPIN_DAMPING;

  // floor
  if (b.y + b.r > floorY) {
    b.y = floorY - b.r;
    if (Math.abs(b.vy) < REST_EPS) {
      b.vy = 0;
      b.resting = true;
    } else {
      b.vy = -b.vy * RESTITUTION;
      // a bounce imparts/consumes a bit of spin from tangential motion
      b.omega += b.vx * 0.01;
      b.vx *= FLOOR_FRICTION;
    }
  }

  // walls
  if (b.x - b.r < 0) { b.x = b.r; b.vx = -b.vx * WALL_RESTITUTION; }
  if (b.x + b.r > w) { b.x = w - b.r; b.vx = -b.vx * WALL_RESTITUTION; }
}

export default function RigidBodyDrop() {
  const canvasRef = useRef(null);
  const bodiesRef = useRef([]);
  const rafRef = useRef(null);
  const lastTRef = useRef(null);
  const sizeRef = useRef({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });

  const spawnAt = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    const bodies = bodiesRef.current;
    bodies.push(makeBody(x, Math.max(20, y)));
    if (bodies.length > MAX_BODIES) bodies.shift();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const previous = sizeRef.current;

      if (width === previous.width && height === previous.height) return;

      const scaleX = width / previous.width;
      const scaleY = height / previous.height;
      const radiusScale = Math.min(scaleX, scaleY);
      for (const body of bodiesRef.current) {
        body.x *= scaleX;
        body.y *= scaleY;
        body.r *= radiusScale;
      }

      canvas.width = width;
      canvas.height = height;
      sizeRef.current = { width, height };
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    function frame(t) {
      if (lastTRef.current == null) lastTRef.current = t;
      const dt = Math.min(0.032, (t - lastTRef.current) / 1000);
      lastTRef.current = t;

      const { width: w, height: h } = sizeRef.current;
      const floorY = h - 24;
      const bodies = bodiesRef.current;
      for (const b of bodies) stepBody(b, dt, w, h, floorY);

      ctx.fillStyle = '#ede6d6';
      ctx.fillRect(0, 0, w, h);

      // floor line — a single ink stroke, like a horizon on paper
      ctx.strokeStyle = '#c9bea3';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, floorY + 0.5);
      ctx.lineTo(w, floorY + 0.5);
      ctx.stroke();

      for (const b of bodies) {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.beginPath();
        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        // orientation notch so the spin actually reads visually
        ctx.strokeStyle = '#ede6d6';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(b.r * 0.8, 0);
        ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="rigidbody">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onPointerDown={(e) => spawnAt(e.clientX, e.clientY)}
        aria-label="Click to drop a rigid body"
      />
    </div>
  );
}