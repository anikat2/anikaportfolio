import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navLinks, site } from '../data/content'
import { scrollToSection } from '../utils/scroll'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToSection = (id: string) => {
    setMenuOpen(false)
    if (onHome) {
      scrollToSection(id)
      return
    }
    navigate('/', { state: { scrollTo: id } })
  }

  return (
    <header className={`navbar ${scrolled || !onHome ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
        <span className="navbar__logo-mark" />
        {site.name.split(' ')[0]}
      </Link>

      <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
        {navLinks.map((link) => (
          <button key={link.id} type="button" onClick={() => goToSection(link.id)}>
            {link.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="navbar__burger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
