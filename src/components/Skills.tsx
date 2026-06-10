import { skills } from '../data/content'
import { SectionArt } from './graphics/SectionArt'
import { SectionHeader } from './SectionHeader'

const toolTags = ['AWS', 'Git', 'Docker', 'Kubernetes', 'GraphQL', 'Kafka', 'MongoDB', 'React', 'Vue', 'Express']

export function Skills() {
  return (
    <section id="skills" className="section skills">
      <SectionArt variant="skills" />
      <SectionHeader label="" title="Skills" />

      <div className="skills__hex-grid">
        {skills.map((skill, i) => (
          <div key={skill.name} className="skill-hex" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="skill-hex__inner">
              <span className="skill-hex__name">{skill.name}</span>
              <div className="skill-hex__bar">
                <div className="skill-hex__fill" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="skills__tools">
        <span className="skills__tools-label">Also fluent in</span>
        <div className="tag-cloud">
          {toolTags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
