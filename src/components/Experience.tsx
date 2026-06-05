import { experience } from '../data/content'
import { SectionHeader } from './SectionHeader'

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <SectionHeader
        title="Work Experience"
      />

      <div className="timeline">
        {experience.map((job, i) => (
          <article key={job.company + job.period} className="timeline__item" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="timeline__dot" />
            <div className="timeline__card glass-card">
              <time>{job.period}</time>
              <h3>{job.title}</h3>
              <p className="timeline__company">{job.company}</p>
              <p>{job.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
