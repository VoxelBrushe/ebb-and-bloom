import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug } from "../util/path"

export default ((opts?: { sort?: (a: any, b: any) => number }) => {
  const CustomTagContent: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
    const thisTag = fileData.slug?.split("/")[1]
    const tagged = allFiles
      .filter((f) => f.frontmatter?.tags?.includes(thisTag))
      .sort(opts?.sort)

    return (
      <div class="custom-tag-content">
        <h1>{`#${thisTag}`}</h1>
        <ul class="tag-list">
          {tagged.map((f) => (
            <li>
              <a class="tag-link" href={`/${f.slug as FullSlug}`}>
                {f.frontmatter?.title ?? f.slug}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // ✅ Scoped but strong CSS (won’t be overridden by theme)
  CustomTagContent.css = `
    .custom-tag-content .tag-link {
      color: white !important;
      text-decoration: none !important;
      transition: color 0.2s ease-in-out;
    }

    .custom-tag-content .tag-link:hover {
      color: #5E81AC !important;
      text-decoration: none !important;
    }

    .custom-tag-content .tag-list {
      list-style: none;
      padding-left: 0;
      margin-top: 0.8em;
    }

    .custom-tag-content .tag-list li {
      margin: 0.4em 0;
    }
  `

  return CustomTagContent
}) satisfies QuartzComponentConstructor
