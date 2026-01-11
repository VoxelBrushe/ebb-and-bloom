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
        // Sort by creation date, newest first
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
            const title = page.frontmatter?.title ?? page.slug ?? "Untitled"
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

  // ✅ Required: define component CSS *inside* before returning it
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
  font-family: 'Roboto', sans-serif !important;
  color: var(--text-normal, white) !important;
  text-decoration: none !important;
}

.recent-notes-tags {
  display: none;
}
`

  // ✅ Return the actual component constructor
  return RecentNotes
}) satisfies QuartzComponentConstructor
