import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { FullSlug } from "../util/path"

export default ((opts?: { sort?: (a: any, b: any) => number }) => {
  const CustomTagContent: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
    const thisTag = fileData.slug?.split("/")[1]
    const tagged = allFiles
      .filter((f) => f.frontmatter?.tags?.includes(thisTag))
      .sort(opts?.sort)

    return (
      <div class="tag-content">
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
  CustomTagContent.css = "/* optional custom styles */"
  return CustomTagContent
}) satisfies QuartzComponentConstructor
