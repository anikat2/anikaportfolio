import { useEffect, useState } from 'react'
import { site } from '../data/content'

export function SplashScreen() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 350)
    const t2 = setTimeout(() => setPhase('out'), 1600)
    const t3 = setTimeout(() => setPhase('done'), 2300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`splash splash--${phase}`} aria-hidden="true">
      <div className="splash__inner">
        <svg className="splash__cupcake" viewBox="0 0 88 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="splash__line splash__line--1" d="M44 9 Q47 4 51 3" />
          <circle className="splash__line splash__line--2" cx="44" cy="14" r="4.5" />
          <path className="splash__line splash__line--3" d="M27 54 Q29 30 44 26 Q59 30 61 54" />
          <path className="splash__line splash__line--4" d="M29 54 L21 90 Q44 98 67 90 L59 54" />
          <path className="splash__line splash__line--5" d="M35 54 L31 90" />
          <path className="splash__line splash__line--5" d="M44 54 L44 90" />
          <path className="splash__line splash__line--5" d="M53 54 L57 90" />
        </svg>
        <p className="splash__name">{site.name}</p>
      </div>
    </div>
  )
}
