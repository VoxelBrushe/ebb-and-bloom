import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const CustomTagContent: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const tag = fileData.slug?.split("/").pop()
    if (!tag) return null

    // Filter all notes that include this tag
    const taggedNotes = allFiles.filter((f) =>
      f.frontmatter?.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
    )

    return (
      <article class="custom-tag-content">
        <h1>{tag}</h1>
        <ul>
          {taggedNotes.map((note) => {
            const title = note.frontmatter?.title ?? note.slug
            const link = "/" + note.slug + "/" // ✅ absolute URL to fix redirect issue
            return (
              <li>
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
      margin: 0.5rem 0;
    }

    .custom-tag-content a.internal {
      color: white;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .custom-tag-content a.internal:hover {
      color: #EBCB8B;
    }

    .custom-tag-content h1 {
      text-transform: capitalize;
      margin-bottom: 1rem;
      color: var(--secondary);
    }
  `

  return CustomTagContent
}) satisfies QuartzComponentConstructor
