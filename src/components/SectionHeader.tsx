interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
}

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="section-header">
      {label && <span className="section-header__label">{label}</span>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      <div className="section-header__line" aria-hidden="true" />
    </header>
  )
}
