import { PageLayout, SharedLayout, QuartzComponentConstructor } from "./quartz/cfg"
import * as Component from "./quartz/components"
import RecentNotes from "./quartz/components/RecentNotes"
import { PlantedDate } from "./quartz/components/PlantedDate"
import TagDisplay from "./quartz/components/TagDisplay"


// Empty footer (prevents phantom spacing)
const EmptyFooter: QuartzComponentConstructor = () => {
  const comp = () => null
  comp.css = ""
  return comp
}

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Darkmode(),
  ],
  afterBody: [],
  footer: EmptyFooter(),
}


export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.TagList(),
  ],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    RecentNotes({
      title: "Recent Notes",
      limit: 5,
      showTags: true,
    }),
  ],
  afterBody: [
    TagDisplay(), // ← Add this - appears after content, before footer
    PlantedDate(),
  ],
}