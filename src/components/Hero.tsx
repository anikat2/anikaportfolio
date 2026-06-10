import { site } from '../data/content'
import { ConstellationBackground } from './graphics/ConstellationBackground'

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <ConstellationBackground />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__layout">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-star">✦</span>
            {site.location}
          </p>

          <h1 className="hero__title">
            <span className="hero__name" tabIndex={0}>
              <span className="hero__name-text">{site.name}</span>
            </span>
          </h1>

          <p className="hero__role">{site.role}</p>
          <p className="hero__tagline">{site.tagline}</p>

          <div className="hero__actions">
            <button type="button" className="btn btn--primary btn--lg" onClick={() => scrollTo('projects')}>
              View projects
            </button>
            <button type="button" className="btn btn--ghost btn--lg" onClick={() => scrollTo('contact')}>
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
