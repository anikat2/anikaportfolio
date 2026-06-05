import { site } from '../data/content'
import { HeroCupcakeBackdrop } from './HeroCupcakeBackdrop'

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <HeroCupcakeBackdrop />
      </div>

      <div className="hero__content">
        <h1>
          Hey, I&apos;m <span className="gradient-text">{site.name}</span>!
        </h1>
        <p className="hero__role">{site.role}</p>
        {site.tagline && <p className="hero__tagline">{site.tagline}</p>}
        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={() => scrollTo('projects')}>
            Projects
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => scrollTo('blog')}>
            Blog
          </button>
        </div>
        <p className="hero__hint">scroll to explore ↓</p>
      </div>
    </section>
  )
}
