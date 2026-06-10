import type { BlogBlock } from '../data/content'
import { BlogImage } from './BlogImage'

interface BlogContentProps {
  blocks: BlogBlock[]
  isRecipe?: boolean
}

export function BlogContent({ blocks, isRecipe = false }: BlogContentProps) {
  return (
    <div className="blog-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return <h2 key={i}>{block.text}</h2>
          case 'paragraph':
            return <p key={i}>{block.text}</p>
          case 'list':
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case 'image':
            if (isRecipe) return null
            return (
              <BlogImage
                key={i}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
                variant={block.variant}
              />
            )
          case 'recipe-info':
            return (
              <div key={i} className="recipe-info">
                {block.prepTime && (
                  <div className="recipe-info__item">
                    <span className="recipe-info__label">Prep</span>
                    <span>{block.prepTime}</span>
                  </div>
                )}
                {block.cookTime && (
                  <div className="recipe-info__item">
                    <span className="recipe-info__label">Cook</span>
                    <span>{block.cookTime}</span>
                  </div>
                )}
                {block.servings && (
                  <div className="recipe-info__item">
                    <span className="recipe-info__label">Serves</span>
                    <span>{block.servings}</span>
                  </div>
                )}
              </div>
            )
          case 'ingredients':
            return (
              <div key={i} className="recipe-ingredients">
                <h2>Ingredients</h2>
                <div className="recipe-ingredients__grid">
                  {block.groups.map((group) => (
                    <div key={group.title ?? group.items[0]} className="recipe-ingredients__group glass-card">
                      {group.title && <h3>{group.title}</h3>}
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )
          case 'steps':
            return (
              <div key={i} className="recipe-steps">
                <h2>Steps</h2>
                <ol>
                  {block.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
