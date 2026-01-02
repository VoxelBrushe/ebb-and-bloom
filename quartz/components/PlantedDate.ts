import { QuartzComponentConstructor } from "../cfg"

export const PlantedDate: QuartzComponentConstructor = () => {
  const comp = ({ fileData }: any) => {
    const created = fileData?.frontmatter?.["date-created"]
    if (!created) return null

    const dateObj = new Date(created)
    const formatted = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return `
      <div class="content-meta planted-date">
        planted on ${formatted}
      </div>
    `
  }

  comp.css = `
    .planted-date {
      margin: 0 !important;
      padding: 0 !important;
      font-size: 0.8rem;
      line-height: 1;
      opacity: 0.75;
    }
  `

  return comp
}
