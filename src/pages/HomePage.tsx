import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../utils/scroll'
import { About } from '../components/About'
import { Blog } from '../components/Blog'
import { Contact } from '../components/Contact'
import { Experience } from '../components/Experience'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills'

export function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!id) return

    const timer = window.setTimeout(() => scrollToSection(id), 100)
    return () => window.clearTimeout(timer)
  }, [location.key, location.state])

  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
