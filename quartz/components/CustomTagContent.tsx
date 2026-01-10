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
              <a
                class="tag-link"
                href={`/${f.slug as FullSlug}`}
              >
                {(f.frontmatter?.title ?? f.slug).replace(/^#\s*/, "")}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  CustomTagContent.css = `
    /* Base styles */
    .custom-tag-content .tag-list {
      list-style: none;
      padding: 0;
      margin: 0.8em 0;
    }

    .custom-tag-content .tag-list li {
      margin: 0.4em 0;
    }

    /* Link styling */
    .custom-tag-content .tag-link {
      color: white !important;
      text-decoration: none !important;
      transition: color 0.2s ease-in-out;
      font-weight: 500;
    }

    /* Hover: strong specificity to override theme */
    .custom-tag-content .tag-link:hover,
    .custom-tag-content .tag-link:focus,
    .custom-tag-content .tag-link:active {
      color: #5E81AC !important;
      text-decoration: none !important;
    }

    /* Optional dark/light handling */
    html[data-theme="light"] .custom-tag-content .tag-link {
      color: #2B2B2B !important;
    }

    html[data-theme="light"] .custom-tag-content .tag-link:hover {
      color: #5E81AC !important;
    }

    html[data-theme="dark"] .custom-tag-content .tag-link {
      color: white !important;
    }

    html[data-theme="dark"] .custom-tag-content .tag-link:hover {
      color: #5E81AC !important;
    }
  `

  return CustomTagContent
}) satisfies QuartzComponentConstructor
