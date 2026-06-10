import { useLocation, useNavigate } from 'react-router-dom'
import { navLinks, site } from '../data/content'
import { scrollToSection } from '../utils/scroll'

export function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  const goToSection = (id: string) => {
    if (onHome) {
      scrollToSection(id)
      return
    }
    navigate('/', { state: { scrollTo: id } })
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">AT</span>
          <p>© {year} {site.name}</p>
        </div>
        <nav className="footer__nav">
          {navLinks.map((link) => (
            <button key={link.id} type="button" onClick={() => goToSection(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>
        <div className="footer__social">
          <a href={site.social.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={site.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
