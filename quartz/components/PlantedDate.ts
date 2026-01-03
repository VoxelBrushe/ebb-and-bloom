import { QuartzComponentConstructor, QuartzComponentProps } from "../cfg"
import * as Component from "./index" // or wherever ContentMeta lives

export const PlantedDate: QuartzComponentConstructor = () => {
  const comp = (props: QuartzComponentProps) => {
    const fm = props.fileData.frontmatter

    const created = fm?.dateCreated ?? fm?.["date-created"]
    if (!created) return null

    const date = new Date(created)
    if (isNaN(date.getTime())) return null

    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Use ContentMeta itself (Quartz-safe) instead of raw <div>
    return Component.ContentMeta()({
      ...props,
      text: `planted on ${formatted}`,
    })
  }

  // CSS tweaks (optional)
  comp.css = `
    .center > .content-meta:last-child,
    .center .content-meta:last-of-type {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1 !important;
      font-size: 0.8rem;
      opacity: 0.75;
      color: var(--gray);
      border-top: none !important;
    }
  `
  return comp
}
