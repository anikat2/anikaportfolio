import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getBlogPostBySlug } from '../data/content'
import { BlogContent } from './BlogContent'
import { BlogImage } from './BlogImage'
import { Footer } from './Footer'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getBlogPostBySlug(slug) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <Navigate to="/" replace />
  }

  const isRecipe = post.format === 'recipe'

  return (
    <article className={`blog-post ${isRecipe ? 'blog-post--recipe' : ''}`}>
      <div className="blog-post__inner">
        <Link to="/" state={{ scrollTo: 'blog' }} className="blog-post__back">
          ← Back to blog
        </Link>

        {post.coverImage && (
          <BlogImage
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            caption={post.coverImage.caption}
            variant="cover"
          />
        )}

        <header className="blog-post__header">
          <div className="blog-post__meta">
            <span className={`tag tag--small ${isRecipe ? 'tag--recipe' : ''}`}>{post.tag}</span>
            <time>{post.date}</time>
            <span>{post.readTime} read</span>
          </div>
          <h1>{post.title}</h1>
          <p className="blog-post__excerpt">{post.excerpt}</p>
        </header>

        <div className="blog-post__body glass-card">
          <BlogContent blocks={post.content} />
        </div>
      </div>
      <Footer />
    </article>
  )
}
