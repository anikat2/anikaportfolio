import { useState, type FormEvent } from 'react'
import { site } from '../data/content'
import { SectionHeader } from './SectionHeader'

export function Contact() {
  const [notice, setNotice] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    form.reset()
    setNotice('Your default email app should open - hit send there to reach me.')
  }

  return (
    <section id="contact" className="section contact">
      <SectionHeader label="" title="Reach out!" subtitle="Open to projects, collaborations, or a friendly chat. I usually reply within 24 hours." />

      <div className="contact__grid">
        <div className="contact__info card">
          <div className="contact__channels">
            <a href={`mailto:${site.email}`} className="contact__channel">
              <span className="contact__channel-icon">✉</span>
              <span>
                <strong>Email</strong>
                <small>{site.email}</small>
              </span>
            </a>
            <a href={site.social.github} target="_blank" rel="noreferrer" className="contact__channel">
              <span className="contact__channel-icon">⌥</span>
              <span>
                <strong>GitHub</strong>
                <small>@anikat2</small>
              </span>
            </a>
            <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="contact__channel">
              <span className="contact__channel-icon">in</span>
              <span>
                <strong>LinkedIn</strong>
                <small>Anika Thakur</small>
              </span>
            </a>
          </div>
          <p className="contact__location">Based in {site.location}</p>
        </div>

        <form className="contact__form card" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@email.com" required />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} placeholder="What's up?" required />
          </label>
          <button type="submit" className="btn btn--primary btn--full">
            Send message
          </button>
          {notice && <p className="contact__notice">{notice}</p>}
        </form>
      </div>
    </section>
  )
}
