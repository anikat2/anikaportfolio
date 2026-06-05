export function FrostingDrips() {
  const sprinkles = [
    { left: '8%', width: 8, height: 4, color: '#e76f51', delay: '0.1s', duration: '3.2s', rot: '-18deg', scale: 1.0 },
    { left: '14%', width: 10, height: 5, color: '#f4a261', delay: '1.1s', duration: '4.1s', rot: '12deg', scale: 1.1 },
    { left: '21%', width: 8, height: 4, color: '#2a9d8f', delay: '0.6s', duration: '3.7s', rot: '24deg', scale: 0.95 },
    { left: '29%', width: 10, height: 5, color: '#9b5de5', delay: '1.6s', duration: '4.4s', rot: '-8deg', scale: 1.05 },
    { left: '36%', width: 7, height: 4, color: '#e9c46a', delay: '0.2s', duration: '3.5s', rot: '16deg', scale: 0.9 },
    { left: '44%', width: 10, height: 5, color: '#e76f51', delay: '2.1s', duration: '4.6s', rot: '-22deg', scale: 1.05 },
    { left: '52%', width: 8, height: 4, color: '#f4a261', delay: '0.9s', duration: '3.6s', rot: '10deg', scale: 1.0 },
    { left: '60%', width: 11, height: 6, color: '#2a9d8f', delay: '1.4s', duration: '4.2s', rot: '26deg', scale: 1.15 },
    { left: '68%', width: 8, height: 4, color: '#9b5de5', delay: '2.4s', duration: '4.8s', rot: '-10deg', scale: 0.95 },
    { left: '76%', width: 9, height: 5, color: '#e9c46a', delay: '0.4s', duration: '3.8s', rot: '18deg', scale: 1.0 },
    { left: '84%', width: 10, height: 5, color: '#e76f51', delay: '1.9s', duration: '4.5s', rot: '-16deg', scale: 1.07 },
    { left: '92%', width: 8, height: 4, color: '#f4a261', delay: '2.7s', duration: '5.0s', rot: '9deg', scale: 0.92 },
  ]

  return (
    <div className="frosting-drips" aria-hidden="true">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="frosting-main" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff0f5" />
            <stop offset="50%" stopColor="#ffd6e4" />
            <stop offset="100%" stopColor="#ffc8da" />
          </linearGradient>
          <linearGradient id="frosting-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className="frosting-drips__body"
          fill="url(#frosting-main)"
          d="
            M0,0 H1440 V52
            C1418,52 1410,122 1390,122 C1370,122 1362,58 1340,58
            C1318,58 1310,136 1288,136 C1266,136 1258,60 1234,60
            C1210,60 1202,120 1178,120 C1154,120 1146,64 1120,64
            C1094,64 1086,148 1060,148 C1034,148 1026,66 998,66
            C970,66 962,126 934,126 C906,126 898,72 868,72
            C838,72 830,154 800,154 C770,154 762,74 730,74
            C698,74 690,132 658,132 C626,132 618,78 584,78
            C550,78 542,150 508,150 C474,150 466,76 430,76
            C394,76 386,134 350,134 C314,134 306,82 268,82
            C230,82 222,156 184,156 C146,156 138,88 98,88
            C58,88 44,116 22,116 C10,116 0,92 0,52
            Z
          "
        />

        <path fill="url(#frosting-shine)" d="M0,0 H1440 V22 L0,22 Z" opacity="0.55" />
      </svg>

      <div className="frosting-drips__sprinkles" aria-hidden="true">
        {sprinkles.map((s, idx) => (
          <span
            key={idx}
            className="frosting-sprinkle"
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
