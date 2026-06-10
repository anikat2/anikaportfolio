import { Link } from 'react-router-dom'
import { blogPosts } from '../data/content'
import { SectionArt } from './graphics/SectionArt'
import { SectionHeader } from './SectionHeader'

export function Blog() {
  return (
    <section id="blog" className="section blog">
      <SectionArt variant="blog" />
      <SectionHeader label="" title="Writing & recipes" />

      <div className="blog__grid">
        {blogPosts.map((post, i) => {
          const isRecipe = post.format === 'recipe'

          return (
            <article
              key={post.slug}
              className={`blog-card card ${isRecipe ? 'blog-card--recipe' : 'blog-card--article'}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="blog-card__graphic" aria-hidden="true">
                {isRecipe ? (
                  <svg viewBox="0 0 120 80" fill="none">
                    <ellipse cx="60" cy="52" rx="38" ry="14" stroke="rgba(253,224,71,0.35)" strokeWidth="1" />
                    <path d="M30 48 Q60 18 90 48" stroke="rgba(253,224,71,0.55)" strokeWidth="1.5" />
                    <circle cx="48" cy="38" r="4" fill="rgba(232,121,249,0.5)" />
                    <circle cx="68" cy="34" r="3" fill="rgba(196,181,253,0.5)" />
                    <circle cx="58" cy="42" r="3.5" fill="rgba(253,224,71,0.45)" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 120 80" fill="none">
                    <rect x="10" y="20" width="100" height="50" rx="4" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
                    <circle cx="35" cy="45" r="12" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
                    <path d="M55 55 L75 35 L95 50" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <span className={`tag ${isRecipe ? 'tag--warm' : 'tag--cool'}`}>{post.tag}</span>
                  <time>{post.date}</time>
                  <span>{post.readTime}</span>
                </div>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-card__cta">
                  {isRecipe ? 'View recipe →' : 'Read article →'}
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
