import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import TagDisplay from "./TagDisplay"
import { PlantedDate } from "./PlantedDate"

export default (() => {
  const TagsAndDate = (props?: QuartzComponentProps) => {
    // Log once at build time (helpful for Quartz static rendering)
    console.log("🪴 Rendering TagsAndDate for:", props?.fileData?.slug ?? "(no slug)")

    // Always render a wrapper, even if props are missing
    if (!props || !props.fileData) {
      return <div class="tags-date-line empty">No props or fileData</div>
    }

    // Instantiate the child components as Quartz constructors
    const RenderPlantedDate = PlantedDate()
    const RenderTagDisplay = TagDisplay()

    // Render the line
    return (
      <div class="tags-date-line">
        <div class="tags-date-left">{RenderPlantedDate(props)}</div>
        <div class="tags-date-right">{RenderTagDisplay(props)}</div>
      </div>
    )
  }

  // Minimal CSS (you can move this to your SCSS later)
  TagsAndDate.css = `
.tags-date-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.tags-date-line.empty {
  opacity: 0.5;
  font-style: italic;
}
`

  return TagsAndDate
}) satisfies QuartzComponentConstructor
