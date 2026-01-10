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
        <ul>
          {tagged.map((f) => (
            <li>
              <a href={`/${f.slug as FullSlug}`}>{f.frontmatter?.title ?? f.slug}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // ✅ Add scoped CSS for the tag overview links
  CustomTagContent.css = `
    .custom-tag-content a {
      color: white;
      text-decoration: none;
      transition: color 0.2s ease-in-out;
    }

    .custom-tag-content a:hover {
      color: #5E81AC;
      text-decoration: none;
    }

    /* Optional: make list clean */
    .custom-tag-content ul {
      list-style: none;
      padding: 0;
    }

    .custom-tag-content li {
      margin: 0.4em 0;
    }
  `

  return CustomTagContent
}) satisfies QuartzComponentConstructor
