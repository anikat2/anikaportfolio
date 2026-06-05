import { about } from '../data/content'
import { SectionHeader } from './SectionHeader'

export function About() {
  return (
    <section id="about" className="section about">
      <SectionHeader title="About me" subtitle={about.headline} />

      <div className="about__grid">
        <div className="about__visual">
          <div className="about__frame">
            <div className="about__avatar" aria-hidden="true">
              <span>AT</span>
            </div>
            <div className="about__ring about__ring--1" aria-hidden="true" />
            <div className="about__ring about__ring--2" aria-hidden="true" />
          </div>
        </div>

        <div className="about__text">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className="about__stats">
            {about.stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
