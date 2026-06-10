import { about } from '../data/content'
import { SectionArt } from './graphics/SectionArt'
import { SectionHeader } from './SectionHeader'

const identityCards = [
  {
    icon: '⚙',
    title: 'Robotics',
    desc: 'Motion planning, ROS, and autonomous systems — from VEX competitions to NASA research.',
    accent: 'cyan',
  },
  {
    icon: '⟨/⟩',
    title: 'Software',
    desc: 'Full-stack engineering across finance, healthcare, and distributed systems at scale.',
    accent: 'violet',
  },
  {
    icon: '✦',
    title: 'Culinary',
    desc: 'Indian fusion baking and creative cooking — precision meets artistry off the keyboard.',
    accent: 'amber',
  },
]

export function About() {
  return (
    <section id="about" className="section about">
      <SectionArt variant="about" />
      <SectionHeader label="" title="About Me" subtitle={about.headline} />

      <div className="about__grid">
        <div className="about__identity">
          {identityCards.map((card) => (
            <article key={card.title} className={`identity-card identity-card--${card.accent}`}>
              <span className="identity-card__icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>

        <div className="about__panel card">
          <div className="about__avatar-wrap">
            <div className="about__avatar">
              <span>AT</span>
              <div className="about__avatar-ring" />
            </div>
          </div>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="about__text">{p}</p>
          ))}
          <div className="about__stats">
            {about.stats.map((stat) => (
              <div key={stat.label} className="stat-pill">
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
