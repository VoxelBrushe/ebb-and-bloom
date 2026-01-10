import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { simplifySlug } from "../util/path"

export default (() => {
  const CustomTagContent: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const slug = fileData.slug
    if (!slug || !slug.startsWith("tags/")) return null
    
    // Extract the tag from the slug (e.g., "tags/character" -> "character")
    const tag = slug.slice("tags/".length)
    
    // Helper function to normalize tag for comparison
    const normalizeTag = (t: string) => {
      // Remove # prefix if present, trim whitespace, lowercase
      return t.replace(/^#/, "").trim().toLowerCase()
    }
    
    const normalizedTag = normalizeTag(tag)
    
    // Filter all notes that include this tag
    const taggedNotes = allFiles.filter((f) => {
      const noteTags = f.frontmatter?.tags ?? []
      return noteTags.some((noteTag) => normalizeTag(noteTag) === normalizedTag)
    })
    
    // Sort by date (newest first)
    taggedNotes.sort((a, b) => {
      const dateA = a.dates?.created ?? new Date(0)
      const dateB = b.dates?.created ?? new Date(0)
      return dateB.getTime() - dateA.getTime()
    })
    
    return (
      <article class="custom-tag-content">
        <h1>{tag}</h1>
        <p class="tag-count">{taggedNotes.length} {taggedNotes.length === 1 ? 'note' : 'notes'}</p>
        <ul>
          {taggedNotes.map((note) => {
            // Clean up title - remove date prefix if present
            let title = note.frontmatter?.title ?? note.slug ?? "Untitled"
            title = title.replace(/^\d{4}-\d{2}-\d{2}_/, "").replace(/_/g, " ")
            
            const link = "/" + note.slug
            
            return (
              <li key={note.slug}>
                <a class="internal" href={link}>
                  {title}
                </a>
              </li>
            )
          })}
        </ul>
      </article>
    )
  }
  
  CustomTagContent.css = `
    .custom-tag-content ul {
      list-style: none;
      padding-left: 0;
      margin: 1.5rem 0;
    }
    
    .custom-tag-content li {
      margin: 0.75rem 0;
    }
    
    .custom-tag-content a.internal {
      color: white;
      text-decoration: none;
      transition: color 0.2s ease;
      font-size: 1.1rem;
    }
    
    .custom-tag-content a.internal:hover {
      color: #EBCB8B;
    }
    
    .custom-tag-content h1 {
      text-transform: capitalize;
      margin-bottom: 0.5rem;
      color: #8FBCBB;
    }
    
    .custom-tag-content .tag-count {
      color: var(--gray);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      opacity: 0.8;
    }
  `
  
  return CustomTagContent
}) satisfies QuartzComponentConstructor