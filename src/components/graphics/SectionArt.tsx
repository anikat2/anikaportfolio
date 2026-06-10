import type { CSSProperties } from 'react'

type Variant = 'about' | 'skills' | 'experience' | 'projects' | 'blog'

export function SectionArt({ variant }: { variant: Variant }) {
  return (
    <div className={`section-art section-art--${variant}`} aria-hidden="true">
      {variant === 'about' && (
        <svg viewBox="0 0 160 160" className="section-art__svg">
          <circle cx="80" cy="80" r="50" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
          <circle cx="80" cy="80" r="35" fill="none" stroke="rgba(129,140,248,0.15)" strokeWidth="1" strokeDasharray="4 6" className="section-art__spin" />
          <circle cx="80" cy="30" r="8" fill="rgba(129,140,248,0.3)" />
          <circle cx="130" cy="80" r="5" fill="rgba(196,181,253,0.25)" />
        </svg>
      )}
      {variant === 'skills' && (
        <div className="section-art__orbit">
          {['Py', 'Rs', 'C++', 'ROS', 'K8s', 'AWS'].map((t, i) => (
            <span key={t} className="section-art__orbit-item" style={{ '--i': i } as CSSProperties}>{t}</span>
          ))}
        </div>
      )}
      {variant === 'experience' && (
        <svg viewBox="0 0 100 140" className="section-art__svg">
          <path d="M50 130 Q48 80 50 30" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" strokeDasharray="3 5" className="section-art__trail" />
          <polygon className="section-art__rocket" points="50,8 42,28 58,28" fill="rgba(196,181,253,0.5)" />
          <circle cx="50" cy="20" r="2" fill="#e0e7ff" />
        </svg>
      )}
      {variant === 'projects' && (
        <svg viewBox="0 0 140 100" className="section-art__svg">
          <circle cx="70" cy="50" r="28" fill="rgba(79,70,229,0.08)" stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
          <ellipse cx="70" cy="50" rx="42" ry="12" fill="none" stroke="rgba(129,140,248,0.2)" strokeWidth="1" transform="rotate(-20 70 50)" />
          <circle cx="108" cy="42" r="4" fill="rgba(224,231,255,0.4)" />
        </svg>
      )}
      {variant === 'blog' && (
        <svg viewBox="0 0 120 100" className="section-art__svg">
          <circle cx="60" cy="50" r="30" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
          <circle cx="45" cy="42" r="3" fill="rgba(224,231,255,0.5)" />
          <circle cx="72" cy="55" r="2" fill="rgba(224,231,255,0.4)" />
          <circle cx="58" cy="68" r="2.5" fill="rgba(255,236,180,0.5)" />
          <line x1="45" y1="42" x2="72" y2="55" stroke="rgba(167,139,250,0.2)" strokeWidth="0.8" />
          <line x1="72" y1="55" x2="58" y2="68" stroke="rgba(167,139,250,0.2)" strokeWidth="0.8" />
        </svg>
      )}
    </div>
  )
}
