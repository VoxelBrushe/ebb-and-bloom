import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  limit: number
  showTags?: boolean
  filter?: (page: any) => boolean
}

const defaultOptions: Options = {
  title: "Recent Notes",
  limit: 5,
  showTags: false,
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }
  
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    // Filter and sort files
    const pages = allFiles
      .filter((file) => {
        // Exclude the current page
        if (file.slug === fileData.slug) return false
        
        // Exclude index pages
        if (file.slug?.endsWith("index") || file.slug === "") return false
        
        // Apply custom filter if provided
        if (opts.filter && !opts.filter(file)) return false
        
        return true
      })
      .sort((a, b) => {
        // Sort by date-created from frontmatter, fallback to file dates
        const dateA = a.dates?.created ?? new Date(0)
        const dateB = b.dates?.created ?? new Date(0)
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, opts.limit)

    if (pages.length === 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3>currents</h3>
        <ul class="recent-notes-list">
          {pages.map((page) => {
            // Get title - prefer frontmatter title, fallback to slug
            let title = page.frontmatter?.title ?? page.slug ?? "Untitled"
            
            // Remove date prefix (YYYY-MM-DD_ format) and replace underscores
            title = title.replace(/^\d{4}-\d{2}-\d{2}_/, "").replace(/_/g, " ")
            
            const tags = page.frontmatter?.tags ?? []
            
            return (
              <li key={page.slug}>
                <a href={`/${page.slug}`} class="internal">
                  {title}
                </a>
                {opts.showTags && tags.length > 0 && (
                  <span class="recent-notes-tags">
                    {tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} class="tag">
                        #{tag}
                      </span>
                    ))}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  RecentNotes.css = `
  .recent-notes {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .recent-notes h3 {
    margin-bottom: 1rem !important;
    font-size: 1.2rem !important;
  }
  
  .recent-notes-list {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .recent-notes-list li {
    margin-bottom: 0.75rem !important;
    display: block !important;
  }
  
  .recent-notes-list li a.internal {
    display: inline !important;
  }
  
  .recent-notes-tags {
    display: inline-flex !important;
    gap: 0.25rem !important;
    font-size: 0.85rem !important;
    opacity: 0.7 !important;
    margin-left: 0.5rem !important;
  }
  
  .recent-notes-tags .tag {
    padding: 0.1rem 0.4rem !important;
    border-radius: 4px !important;
  }
  `

  return RecentNotes
}) satisfies QuartzComponentConstructor