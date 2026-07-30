import './App.css';
import FluidSimulation from './FluidSimulation';
import RigidBodyDrop from './Rigidbody';
import MotionPlanning from './MotionPlanning';
import Blog from './Blog';

function App() {
  return (
    <div className="App">
      <main className="hero" id="home">
        <header className="site-header">
          <a className="monogram" href="#home" aria-label="Anika Thakur, home">
            <span>A</span>
          </a>
          <a className="header-note" href="#home" aria-label="Return to hero">
            Software engineer
            <span aria-hidden="true"> / </span>
            Portfolio
          </a>
        </header>

        <div className="portfolio-layout">
          <section className="simulation-panel" aria-label="Interactive Navier–Stokes simulation">
            <FluidSimulation />
            <div className="simulation-caption">
              <span>drag to disturb the ink</span>
              <span>navier-stokes; used in royalslib</span>
            </div>
          </section>

          <section className="content-panel" aria-labelledby="hero-title">
            <div className="intro">
              <h1 id="hero-title">
                Anika <span>Thakur</span>
              </h1>
              <p className="hero-description">
                Software engineer and roboticist.
              </p>
            </div>

            <div className="rigidbody-demo" aria-label="Interactive rigid-body study">
              <RigidBodyDrop />
              <span>click to drop; rigidbodies - used in capy's journey</span>
            </div>

            <section className="projects" aria-labelledby="projects-title">
              <div className="section-heading">
                <h2 id="projects-title">Selected projects</h2>
                <span>01—03</span>
              </div>

              <div className="project-list">
                <article className="project project-row">
                  <span className="project-number">01</span>
                  <div>
                    <h3>Robot Movement</h3>
                    <p>
                      The first Arduino-native open-source library for motion
                      planning and robot movement. Compatible with four-wheel
                      drives in non-holonomic and holonomic conditions.
                    </p>
                  </div>
                </article>

                <a
                  className="project project-row project-link"
                  href="https://github.com/anikat2/squarenetes"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="project-number">02</span>
                  <div>
                    <h3>Squarenetes</h3>
                    <p>
                      A Kubernetes-like system that breaks enterprise-scale LLM
                      prompts into worker pods, completing queries approximately
                      10× faster than a single prompt.
                    </p>
                  </div>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </a>

                <article className="project project-row">
                  <span className="project-number">03</span>
                  <div>
                    <h3>AquaRo(ver)</h3>
                    <p>
                      A sea-surface robot with LIDAR capabilities that retrieves
                      ocean trash, stores it onboard, and returns it to a
                      designated disposal location.
                    </p>
                  </div>
                </article>
              </div>
            </section>
          </section>
        </div>
      </main>

      <section className="motion-section" aria-labelledby="experience-title">
        <div className="section-index">

        </div>
        <div className="motion-copy">
          <h2 id="experience-title">Work experience</h2>

          <div className="experience-list">
            <article className="experience-item">
              <div className="experience-meta">
                <time>Jun 2026 — Present</time>
                <span>Internship</span>
              </div>
              <h3>Machine Vision Intern</h3>
              <p className="experience-org">Dover Corporation</p>
              <p>
                Created a cloud retrieval application that ingests
                machine-captured images, completes counterfeit detection and
                feature extraction, then displays results in a simple,
                user-friendly way for internal clients.
              </p>
            </article>

            <article className="experience-item">
              <div className="experience-meta">
                <time>Jun 2025 — Present</time>
                <span>Internship</span>
              </div>
              <h3>Software Engineer Intern</h3>
              <p className="experience-org">Bloomberg</p>
              <p>
                Developed an archival program to search through chat
                transcripts attached to tickets, remove identifying
                information, summarize solutions, and close stale chats.
                Estimated to impact ~2 million tickets and counting.
              </p>
            </article>

            <article className="experience-item">
              <div className="experience-meta">
                <time>Jul 2026</time>
              </div>
              <h3>Early ID Technologist</h3>
              <p className="experience-org">Humana</p>
              <p>
                Flew out to Louisville HQ and created a mockup for an
                AI-powered application that ingests patient vitals from
                e-wearables and uses predictive algorithms to prevent ER
                visits and minimize health complications.
              </p>
            </article>

            <article className="experience-item">
              <div className="experience-meta">
                <time>Jul 2026</time>
              </div>
              <h3>Capital One Tech Summit</h3>
              <p className="experience-org">Capital One</p>
              <p>
                Learned about Capital One opportunities, case interviews, and
                various aspects of working at a fintech company.
              </p>
            </article>

            <article className="experience-item">
              <div className="experience-meta">
                <time>Jan 2026 — May 2026</time>
              </div>
              <h3>Researcher</h3>
              <p className="experience-org">
                NASA — National Aeronautics and Space Administration
              </p>
              <p>
                Addressed NASA pain points with solutions relating to
                robotics, autonomy, and AI. Developed a voice-activated AI
                assistant to assist robots in maintenance tasks through
                enabling hands-free communication.
              </p>
            </article>

            <article className="experience-item">
              <div className="experience-meta">
                <time>Dec 2025 — May 2026</time>
              </div>
              <h3>Game Developer</h3>
              <p className="experience-org">Capy&apos;s Journey</p>
              <p>
                Used Unity 2D to develop a gamified mindfulness app designed
                for children and young adults. Integrated Firebase Firestore
                for long-term data storage.
              </p>
            </article>

            <article className="experience-item">
              <div className="experience-meta">
                <time>May 2024 — Mar 2025</time>
              </div>
              <h3>Microelectronics Researcher</h3>
              <p className="experience-org">MIT Lincoln Laboratory</p>
              <p>
                Built a smart walking cane with haptic feedback for visually
                impaired users using Arduino UNO and ESP32-Cam. Gained
                foundational knowledge in microelectronics, including doping
                and silicon wafer engraving.
              </p>
            </article>
          </div>

          <span className="interaction-note">Click the square to set a destination</span>
        </div>
        <div className="motion-demo">
          <MotionPlanning />
        </div>
      </section>

      <div className="closing-grid">
        <Blog />

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-index contact-index">
          </div>
          <div className="closing-copy">
            <h2 id="contact-title">
              Let&apos;s get
              <span>connected!</span>
            </h2>
            <p className="closing-lede">
              Open to internships, collaborations, and conversations!
            </p>
          </div>
          <div className="contact-links">
            <a
              className="contact-link"
              href="https://github.com/anikat2"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-label">GitHub</span>
              <span className="contact-value">@anikat2</span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              className="contact-link"
              href="mailto:anikathakur212@gmail.com"
            >
              <span className="contact-label">Email</span>
              <span className="contact-value">anikathakur212@gmail.com</span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              className="contact-link"
              href="https://linkedin.com/in/anika-thakur"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">https://linkedin.com/in/anika-thakur</span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="contact-footer">
          </p>
        </section>
      </div>
    </div>
  );
}

export default App;