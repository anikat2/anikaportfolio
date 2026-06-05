import { skills } from '../data/content'
import { SectionHeader } from './SectionHeader'

export function Skills() {
  return (
    <section id="skills" className="section skills">
      <SectionHeader
        title="Skills and Tools"
      />

      <div className="skills__grid">
        {skills.map((skill, i) => (
          <div key={skill.name} className="skill-card" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="skill-card__top">
              <span>{skill.name}</span>
            </div>
            <div className="skill-card__bar">
              <div className="skill-card__fill" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="skills__tags">
        {['AWS', 'Git', 'Docker', 'Kubernetes', 'GraphQL', 'Kafka', 'MongoDB', 'React, Vue, Express'].map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </section>
  )
}
