import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>© {year} {site.name}</p>
      <nav className="footer__nav">
        {navLinks.map((link) => (
          <Link key={link.id} to="/" state={{ scrollTo: link.id }}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
