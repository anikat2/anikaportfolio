import { useMemo } from 'react'

type Sprinkle = {
  left: string
  width: number
  height: number
  color: string
  delay: string
  duration: string
  rot: string
  scale: number
}

export function HeroCupcakeBackdrop() {
  const sprinkles = useMemo<Sprinkle[]>(
    () => [
      { left: '6%', width: 8, height: 4, color: '#e76f51', delay: '0.0s', duration: '10.5s', rot: '-18deg', scale: 1.0 },
      { left: '12%', width: 10, height: 5, color: '#f4a261', delay: '1.2s', duration: '12.8s', rot: '12deg', scale: 1.1 },
      { left: '20%', width: 7, height: 4, color: '#2a9d8f', delay: '0.6s', duration: '11.7s', rot: '24deg', scale: 0.95 },
      { left: '28%', width: 10, height: 5, color: '#9b5de5', delay: '2.1s', duration: '14.2s', rot: '-8deg', scale: 1.05 },
      { left: '36%', width: 8, height: 4, color: '#e9c46a', delay: '0.9s', duration: '12.1s', rot: '16deg', scale: 0.9 },
      { left: '44%', width: 10, height: 5, color: '#e76f51', delay: '3.4s', duration: '13.6s', rot: '-22deg', scale: 1.05 },
      { left: '54%', width: 8, height: 4, color: '#f4a261', delay: '1.6s', duration: '11.9s', rot: '10deg', scale: 1.0 },
      { left: '62%', width: 11, height: 6, color: '#2a9d8f', delay: '2.8s', duration: '14.8s', rot: '26deg', scale: 1.15 },
      { left: '70%', width: 8, height: 4, color: '#9b5de5', delay: '4.0s', duration: '13.9s', rot: '-10deg', scale: 0.95 },
      { left: '78%', width: 9, height: 5, color: '#e9c46a', delay: '1.1s', duration: '12.9s', rot: '18deg', scale: 1.0 },
      { left: '86%', width: 10, height: 5, color: '#e76f51', delay: '2.6s', duration: '14.4s', rot: '-16deg', scale: 1.07 },
      { left: '94%', width: 8, height: 4, color: '#f4a261', delay: '4.7s', duration: '15.6s', rot: '9deg', scale: 0.92 },
    ],
    [],
  )

  return (
    <div className="hero-cupcake-bg" aria-hidden="true">
      <div className="hero-cupcake-bg__drips">
        <svg viewBox="0 0 1440 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-frosting-main" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff0f5" />
              <stop offset="50%" stopColor="#ffd6e4" />
              <stop offset="100%" stopColor="#ffc8da" />
            </linearGradient>
            <linearGradient id="hero-frosting-shine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            className="hero-cupcake-bg__body"
            fill="url(#hero-frosting-main)"
            d="
              M0,0 H1440 V62
              C1410,62 1400,138 1378,138
              C1356,138 1346,68 1320,68
              C1294,68 1284,154 1256,154
              C1228,154 1218,74 1188,74
              C1158,74 1148,170 1112,170
              C1076,170 1064,80 1032,80
              C1000,80 990,170 952,170
              C914,170 904,92 872,92
              C840,92 830,176 792,176
              C754,176 744,88 708,88
              C672,88 662,168 626,168
              C590,168 580,96 544,96
              C508,96 498,154 462,154
              C426,154 416,72 382,72
              C348,72 338,148 304,148
              C270,148 260,82 228,82
              C196,82 186,144 152,144
              C118,144 108,66 76,66
              C44,66 28,92 0,92
              Z
            "
          />

          <path fill="url(#hero-frosting-shine)" d="M0,0 H1440 V28 L0,28 Z" opacity="0.6" />
        </svg>
      </div>

      <div className="hero-cupcake-bg__sprinkles">
        {sprinkles.map((s, idx) => (
          <span
            key={idx}
            className="hero-cupcake-bg__sprinkle"
            style={{
              left: s.left,
              width: s.width,
              height: s.height,
              background: s.color,
              animationDelay: s.delay,
              animationDuration: s.duration,
              ['--rot' as any]: s.rot,
              ['--scale' as any]: s.scale,
            }}
          />
        ))}
      </div>
    </div>
  )
}

