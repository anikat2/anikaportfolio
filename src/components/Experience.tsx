import { experience } from '../data/content'
import { SectionArt } from './graphics/SectionArt'
import { SectionHeader } from './SectionHeader'

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <SectionArt variant="experience" />
      <SectionHeader label="" title="Experience" />

      <div className="timeline">
        {experience.map((job, i) => (
          <article key={job.company + job.period} className="timeline__item" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="timeline__marker">
              <div className="timeline__dot" />
            </div>
            <div className="timeline__card card">
              <div className="timeline__top">
                <time>{job.period}</time>
                <span className="timeline__company">{job.company}</span>
              </div>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
