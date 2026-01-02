import { PageLayout, SharedLayout, QuartzComponentConstructor } from "./quartz/cfg"
import * as Component from "./quartz/components"
import RecentNotes from "./quartz/components/RecentNotes"

// Empty component that Quartz accepts
const EmptyFooter: QuartzComponentConstructor = () => {
  const comp = () => null
  comp.css = "" // <-- Quartz expects a css property
  return comp
}

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Darkmode(),
  ],
  afterBody: [],
  footer: EmptyFooter(), // ← safe empty footer
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
    Component.ContentMeta(), // your "planted on" date
  ],
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
