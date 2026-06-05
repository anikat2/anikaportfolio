import { useState } from 'react'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  variant?: 'inline' | 'cover'
}

export function BlogImage({ src, alt, caption, variant = 'inline' }: BlogImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <figure className={`blog-image blog-image--missing blog-image--${variant}`}>
        <div className="blog-image__placeholder">
          <span>Add image at <code>{src}</code></span>
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className={`blog-image blog-image--${variant}`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
