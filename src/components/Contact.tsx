import { site } from '../data/content'

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="contact__wrapper glass-card">
        <div className="section__header section__header--left">
          <h2>Reach out!</h2>
          <span className="section__underline section__underline--left" aria-hidden="true" />
          <p className="section__subtitle">
            Open to working on projects, collaborations, or just a friendly chat. I usually reply within a 24 hours.
          </p>
          <div className="contact__social">
            <a href={site.social.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={site.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Name
            <input type="text" name="name" placeholder="Name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@email.com" required />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} placeholder="Message" required />
          </label>
          <button type="submit" className="btn btn--primary btn--full">
            Send a note
          </button>
        </form>
      </div>
    </section>
  )
}
