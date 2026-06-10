import { projects } from '../data/content'
import { SectionArt } from './graphics/SectionArt'
import { SectionHeader } from './SectionHeader'

const accents = ['cyan', 'violet', 'pink', 'amber', 'green'] as const
const sizes = ['large', 'normal', 'normal', 'normal', 'large'] as const

export function Projects() {
  return (
    <section id="projects" className="section projects">
      <SectionArt variant="projects" />
      <SectionHeader label="" title="Selected work" />

      <div className="bento">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.link}
            target={project.link.startsWith('http') ? '_blank' : undefined}
            rel={project.link.startsWith('http') ? 'noreferrer' : undefined}
            className={`bento__card bento__card--${sizes[i]} bento__card--${accents[i % accents.length]}`}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="bento__glow" aria-hidden="true" />
            <div className="bento__index">0{i + 1}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="bento__tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="bento__link">Explore →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
