import { Link } from 'react-router-dom'
import { blogPosts } from '../data/content'
import { SectionHeader } from './SectionHeader'

export function Blog() {
  return (
    <section id="blog" className="section blog">
      <SectionHeader
        title="Blog"
      />

      <div className="blog__list">
        {blogPosts.map((post, i) => {
          const isRecipe = post.format === 'recipe'

          return (
            <article
              key={post.slug}
              className={`blog-card glass-card ${isRecipe ? 'blog-card--recipe' : ''}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {isRecipe && post.coverImage && (
                <img
                  className="blog-card__thumb"
                  src={post.coverImage.src}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}

              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <span className={`tag tag--small ${isRecipe ? 'tag--recipe' : ''}`}>{post.tag}</span>
                  <time>{post.date}</time>
                  <span>{post.readTime} read</span>
                </div>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-card__read">
                  {isRecipe ? 'View recipe →' : 'Read more →'}
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
