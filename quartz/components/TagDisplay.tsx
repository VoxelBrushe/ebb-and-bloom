import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export const TagDisplay: QuartzComponentConstructor = () => {
  const TagDisplayComponent: QuartzComponent = ({ 
    fileData, 
    displayClass 
  }: QuartzComponentProps) => {
    // Get tags from frontmatter
    const tags = fileData.frontmatter?.tags ?? []
    
    // Don't show if no tags
    if (tags.length === 0) {
      return null
    }
    
    // Normalize tag for URL (remove # if present, lowercase)
    const normalizeTag = (tag: string) => {
      return tag.replace(/^#/, "").trim().toLowerCase()
    }
    
    return (
      <div class={classNames(displayClass, "note-tags")}>
        {tags.map((tag) => {
          const normalizedTag = normalizeTag(tag)
          const displayTag = normalizedTag // Show without # prefix
          const href = `/tags/${normalizedTag}/`
          
          return (
            <a 
              key={tag}
              href={href} 
              class="internal tag-link"
            >
              {displayTag}
            </a>
          )
        })}
      </div>
    )
  }
  
  TagDisplayComponent.css = `
    .note-tags {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.5rem;
      margin: 1.5rem 0 0.5rem 0;
      padding: 0;
      flex-wrap: wrap;
    }
    
    .note-tags a.tag-link {
      color: #D08770 !important;
      text-decoration: none !important;
      font-size: 0.85rem;
      transition: color 0.2s ease;
    }
    
    .note-tags a.tag-link::before {
      content: "#";
    }
    
    .note-tags a.tag-link:hover {
      color: #EBCB8B !important;
    }
  `
  
  return TagDisplayComponent
}

export default TagDisplay