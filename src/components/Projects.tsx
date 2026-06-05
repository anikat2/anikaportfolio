import { projects } from '../data/content'
import { SectionHeader } from './SectionHeader'

const accentColors = ['coral', 'mango', 'teal', 'lavender'] as const

export function Projects() {
  return (
    <section id="projects" className="section projects">
      <SectionHeader
        title="Projects"
      />

      <div className="projects__grid">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.link}
            className="project-card glass-card"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className={`project-card__accent project-card__accent--${accentColors[i % accentColors.length]}`} aria-hidden="true" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-card__tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="project-card__link">Take a peek →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
