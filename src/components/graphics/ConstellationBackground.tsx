import { useEffect, useRef, useState } from 'react'

interface Vec3 {
  x: number
  y: number
  z: number
}

interface Star3D {
  pos: Vec3
  r: number
  twinkle: number
  twinkleSpeed: number
  constellation: number
  warmth: number
  anchor: boolean
  hue: number
  idx: number
}

interface ConstellationDef {
  id: number
  theta: number
  phi: number
  scale: number
  hue: number
  points: [number, number][]
  links: [number, number][]
}

const SPHERE_R = 1.15
const CAMERA_Z = 2.35
const FOCAL = 1.45
const FILLER_COUNT = 420
const DENSE_FILLER_COUNT = 250

const CONSTELLATIONS: ConstellationDef[] = [
  { id: 0, theta: 0.4, phi: 0.55, scale: 0.11, hue: 265,
    points: [[0, 0], [0.8, 1], [1.6, 0.3], [2.2, 1.2], [1.1, 1.8], [-0.6, 1.4]],
    links: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [0, 5]] },
  { id: 1, theta: 1.8, phi: 0.35, scale: 0.1, hue: 220,
    points: [[0, 0], [1, 0.5], [2, 0], [1.5, 1.2], [0.5, 1.1]],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 4]] },
  { id: 2, theta: 2.9, phi: 0.7, scale: 0.12, hue: 280,
    points: [[0, 0], [-0.8, 1], [0.8, 1], [0, 1.8], [0, -0.9]],
    links: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2]] },
  { id: 3, theta: 4.2, phi: -0.2, scale: 0.09, hue: 48,
    points: [[0, 0], [1.2, 0.2], [2.1, 0.9], [0.9, 1.4]],
    links: [[0, 1], [1, 2], [2, 3], [3, 0]] },
  { id: 4, theta: 5.1, phi: 0.15, scale: 0.1, hue: 250,
    points: [[0, 0], [0.6, -0.9], [1.3, -0.3], [0.8, 0.7], [-0.4, 0.6]],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] },
  { id: 5, theta: 0.9, phi: -0.45, scale: 0.085, hue: 200,
    points: [[0, 0], [0.7, 0.6], [1.5, 0.1], [1, 1]],
    links: [[0, 1], [1, 2], [2, 3], [1, 3]] },
  { id: 6, theta: 3.5, phi: -0.55, scale: 0.095, hue: 270,
    points: [[0, 0], [-0.5, 0.8], [0.5, 0.8], [0, -0.7], [1.2, 0]],
    links: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2]] },
  { id: 7, theta: 1.2, phi: 0.85, scale: 0.08, hue: 42,
    points: [[0, 0], [0.9, 0.4], [1.4, -0.3], [0.3, -0.8]],
    links: [[0, 1], [1, 2], [2, 3], [3, 0]] },
  { id: 8, theta: 4.8, phi: 0.6, scale: 0.105, hue: 235,
    points: [[0, 0], [1.1, 0.3], [0.4, 1.1], [1.8, 0.9], [-0.5, 0.5]],
    links: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 2]] },
  { id: 9, theta: 2.2, phi: -0.75, scale: 0.075, hue: 255,
    points: [[0, 0], [0.5, 0.5], [1, 0], [0.5, -0.5]],
    links: [[0, 1], [1, 2], [2, 3], [3, 0]] },
  { id: 10, theta: 5.6, phi: -0.35, scale: 0.09, hue: 210,
    points: [[0, 0], [0.8, -0.4], [1.6, 0.2], [2.2, -0.2], [1, 0.9]],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 4]] },
  { id: 11, theta: 3.1, phi: 0.1, scale: 0.1, hue: 290,
    points: [[0, 0], [-0.7, 0.5], [0.7, 0.5], [-1.2, -0.3], [1.2, -0.3]],
    links: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4]] },
  { id: 12, theta: 0.2, phi: -0.15, scale: 0.088, hue: 38,
    points: [[0, 0], [1, 0.8], [1.8, 0.2], [0.6, -0.6]],
    links: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]] },
  { id: 13, theta: 4.5, phi: 0.82, scale: 0.07, hue: 225,
    points: [[0, 0], [0.6, 0.6], [1.2, 0.1]],
    links: [[0, 1], [1, 2]] },
]

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1
  return { x: v.x / len, y: v.y / len, z: v.z / len }
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

function spherePoint(theta: number, phi: number): Vec3 {
  const cp = Math.cos(phi)
  return normalize({
    x: cp * Math.cos(theta),
    y: Math.sin(phi),
    z: cp * Math.sin(theta),
  })
}

function tangentBasis(normal: Vec3) {
  const ref: Vec3 = Math.abs(normal.y) < 0.85 ? { x: 0, y: 1, z: 0 } : { x: 1, y: 0, z: 0 }
  const east = normalize(cross(ref, normal))
  const north = normalize(cross(normal, east))
  return { east, north }
}

function placeOnSphere(center: Vec3, east: Vec3, north: Vec3, u: number, v: number, scale: number): Vec3 {
  return normalize({
    x: center.x + (east.x * u + north.x * v) * scale,
    y: center.y + (east.y * u + north.y * v) * scale,
    z: center.z + (east.z * u + north.z * v) * scale,
  })
}

function rotateX(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c }
}

function rotateY(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c }
}

function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x - size, y)
  ctx.lineTo(x + size, y)
  ctx.moveTo(x, y - size)
  ctx.lineTo(x, y + size)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x - size * 0.65, y - size * 0.65)
  ctx.lineTo(x + size * 0.65, y + size * 0.65)
  ctx.moveTo(x + size * 0.65, y - size * 0.65)
  ctx.lineTo(x - size * 0.65, y + size * 0.65)
  ctx.stroke()
  ctx.restore()
}

export function ConstellationBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dragging, setDragging] = useState(false)

  const rotRef = useRef({ x: 0.25, y: 0.6 })
  const velRef = useRef({ x: 0, y: 0 })
  const draggingRef = useRef(false)
  const lastPtrRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let stars: Star3D[] = []
    let w = 0
    let h = 0
    let cx = 0
    let cy = 0
    let scalePx = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      h = rect.height
      cx = w / 2
      cy = h / 2
      const maxDim = Math.max(w, h)
      scalePx = (maxDim / 2) * 1.2 * (CAMERA_Z / FOCAL)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const buildStars = () => {
      stars = []

      for (const c of CONSTELLATIONS) {
        const center = spherePoint(c.theta, c.phi)
        const { east, north } = tangentBasis(center)

        c.points.forEach((pt, i) => {
          const pos = placeOnSphere(center, east, north, pt[0], pt[1], c.scale)
          stars.push({
            pos: { x: pos.x * SPHERE_R, y: pos.y * SPHERE_R, z: pos.z * SPHERE_R },
            r: i === 0 ? 4.8 : 3 + Math.random() * 0.9,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.007 + Math.random() * 0.01,
            constellation: c.id,
            warmth: c.hue < 100 ? 0.92 : 0.15,
            anchor: i === 0 || i === 2 || i === c.points.length - 1,
            hue: c.hue,
            idx: i,
          })
        })
      }

      for (let i = 0; i < FILLER_COUNT; i++) {
        const u = Math.random()
        const v = Math.random()
        const theta = 2 * Math.PI * u
        const phi = Math.acos(2 * v - 1)
        const p = spherePoint(theta, phi)
        const roll = Math.random()
        const isBright = roll > 0.72
        stars.push({
          pos: { x: p.x * SPHERE_R, y: p.y * SPHERE_R, z: p.z * SPHERE_R },
          r: isBright ? 2 + Math.random() * 1.4 : 1.1 + Math.random() * 1.3,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.005 + Math.random() * 0.01,
          constellation: -1,
          warmth: roll > 0.78 ? 0.95 : 0.1,
          anchor: isBright,
          hue: 220 + Math.random() * 50,
          idx: 0,
        })
      }

      for (let i = 0; i < DENSE_FILLER_COUNT; i++) {
        const u = Math.random()
        const v = Math.random()
        const theta = 2 * Math.PI * u
        const phi = Math.acos(2 * v - 1)
        const p = spherePoint(theta, phi)
        stars.push({
          pos: { x: p.x * SPHERE_R, y: p.y * SPHERE_R, z: p.z * SPHERE_R },
          r: 0.7 + Math.random() * 0.8,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.006 + Math.random() * 0.012,
          constellation: -2,
          warmth: Math.random() > 0.92 ? 0.9 : 0.05,
          anchor: false,
          hue: 235,
          idx: 0,
        })
      }
    }

    const project = (p: Vec3, rotX: number, rotY: number) => {
      let r = rotateY(rotateX(p, rotX), rotY)
      const depth = CAMERA_Z - r.z
      if (depth < 0.08) return null
      const persp = (FOCAL * scalePx) / depth
      return {
        x: cx + r.x * persp,
        y: cy - r.y * persp,
        z: r.z,
        depth,
        scale: persp / scalePx,
      }
    }

    const draw = () => {
      if (!draggingRef.current) {
        rotRef.current.x += velRef.current.x
        rotRef.current.y += velRef.current.y
        velRef.current.x *= 0.94
        velRef.current.y *= 0.94
        if (Math.abs(velRef.current.x) < 0.00004) velRef.current.x = 0
        if (Math.abs(velRef.current.y) < 0.00004) velRef.current.y = 0
        if (velRef.current.x === 0 && velRef.current.y === 0) {
          rotRef.current.y += 0.0008
        }
      }

      rotRef.current.x = Math.max(-1.2, Math.min(1.2, rotRef.current.x))

      ctx.clearRect(0, 0, w, h)

      for (const s of stars) s.twinkle += s.twinkleSpeed

      type Projected = Star3D & { x: number; y: number; z: number; depth: number; scale: number }
      const projected: Projected[] = []

      for (const s of stars) {
        const p = project(s.pos, rotRef.current.x, rotRef.current.y)
        if (!p) continue
        projected.push({ ...s, ...p })
      }

      projected.sort((a, b) => a.z - b.z)

      const byConstellation = new Map<number, Projected[]>()
      for (const s of projected) {
        if (s.constellation < 0) continue
        const list = byConstellation.get(s.constellation) ?? []
        list[s.idx] = s
        byConstellation.set(s.constellation, list)
      }

      for (const c of CONSTELLATIONS) {
        const group = byConstellation.get(c.id)
        if (!group) continue

        for (const [a, b] of c.links) {
          const sa = group[a]
          const sb = group[b]
          if (!sa || !sb) continue

          const depthFade = Math.max(0.5, Math.min(sa.depth, sb.depth) / CAMERA_Z)
          const lineAlpha = Math.min(1, depthFade * 1.35)

          ctx.save()
          ctx.globalAlpha = lineAlpha
          ctx.shadowBlur = 18
          ctx.shadowColor = `hsla(${c.hue}, 90%, 78%, 0.85)`
          ctx.beginPath()
          ctx.moveTo(sa.x, sa.y)
          ctx.lineTo(sb.x, sb.y)
          ctx.strokeStyle = `hsla(${c.hue}, 85%, 92%, 0.95)`
          ctx.lineWidth = 3.2 * ((sa.scale + sb.scale) * 0.5)
          ctx.stroke()
          ctx.restore()

          ctx.save()
          ctx.globalAlpha = lineAlpha * 0.75
          ctx.beginPath()
          ctx.moveTo(sa.x, sa.y)
          ctx.lineTo(sb.x, sb.y)
          ctx.strokeStyle = 'rgba(255,255,255,0.9)'
          ctx.lineWidth = 1.2
          ctx.stroke()
          ctx.restore()
        }
      }

      for (const s of projected) {
        const glow = 0.65 + Math.sin(s.twinkle) * 0.35
        const warm = s.warmth > 0.75
        const isConstellation = s.constellation >= 0
        const depthFade = Math.max(0.55, Math.min(1, s.depth / (CAMERA_Z * 0.85)))
        const size = s.r * s.scale * (0.95 + depthFade * 0.4) * glow
        const baseAlpha = s.anchor ? 1 : isConstellation ? 0.88 : 0.78
        const alpha = Math.min(1, baseAlpha * depthFade * (0.8 + glow * 0.2))

        const haloR = size * (s.anchor ? 7 : isConstellation ? 5 : 4)
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, haloR)
        grad.addColorStop(0, warm ? `rgba(255,230,170,${0.65 * alpha})` : `hsla(${s.hue}, 85%, 88%, ${0.5 * alpha})`)
        grad.addColorStop(0.4, warm ? `rgba(255,220,150,${0.2 * alpha})` : `hsla(${s.hue}, 80%, 80%, ${0.15 * alpha})`)
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(s.x, s.y, haloR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(s.x, s.y, Math.max(0.8, size), 0, Math.PI * 2)
        ctx.fillStyle = warm
          ? `rgba(255, 245, 210, ${alpha})`
          : `hsla(${s.hue}, 80%, 96%, ${alpha})`
        ctx.fill()

        if ((s.anchor || warm) && glow > 0.6 && depthFade > 0.3) {
          drawSparkle(
            ctx, s.x, s.y, size * (s.anchor ? 2.6 : 1.8),
            warm ? 'rgba(255,250,220,1)' : `hsla(${s.hue}, 90%, 98%, 0.95)`,
            alpha,
          )
        }
      }

      animId = requestAnimationFrame(draw)
    }

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true
      setDragging(true)
      lastPtrRef.current = { x: e.clientX, y: e.clientY }
      velRef.current = { x: 0, y: 0 }
      wrap.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const dx = e.clientX - lastPtrRef.current.x
      const dy = e.clientY - lastPtrRef.current.y
      lastPtrRef.current = { x: e.clientX, y: e.clientY }

      const dRotY = dx * 0.005
      const dRotX = dy * 0.005
      rotRef.current.y += dRotY
      rotRef.current.x += dRotX
      velRef.current.y = dRotY * 0.55
      velRef.current.x = dRotX * 0.55
    }

    const onPointerUp = (e: PointerEvent) => {
      draggingRef.current = false
      setDragging(false)
      wrap.releasePointerCapture(e.pointerId)
    }

    resize()
    buildStars()
    draw()

    const ro = new ResizeObserver(() => { resize() })
    ro.observe(wrap)
    wrap.addEventListener('pointerdown', onPointerDown)
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerup', onPointerUp)
    wrap.addEventListener('pointercancel', onPointerUp)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      wrap.removeEventListener('pointerdown', onPointerDown)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerup', onPointerUp)
      wrap.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`constellation-bg constellation-bg--3d ${dragging ? 'constellation-bg--dragging' : ''}`}
      aria-hidden="true"
    >
      <div className="constellation-bg__nebula constellation-bg__nebula--1" />
      <div className="constellation-bg__nebula constellation-bg__nebula--2" />
      <div className="constellation-bg__nebula constellation-bg__nebula--3" />
      <canvas ref={canvasRef} className="constellation-bg__canvas" />
      <div className="constellation-bg__dust" />
    </div>
  )
}
