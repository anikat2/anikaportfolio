interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="section__header">
      <h2>{title}</h2>
      <span className="section__underline" aria-hidden="true" />
      {subtitle && <p className="section__subtitle">{subtitle}</p>}
    </div>
  )
}
