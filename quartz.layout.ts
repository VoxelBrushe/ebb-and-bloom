import { PageLayout, SharedLayout, QuartzComponentConstructor } from "./quartz/cfg"
import * as Component from "./quartz/components"
import RecentNotes from "./quartz/components/RecentNotes"
import ContactForm from "./quartz/components/ContactForm"
import { PlantedDate } from "./quartz/components/PlantedDate"
import TagDisplay from "./quartz/components/TagDisplay"

// Debug helper for Quartz emitter crash
function safeComponent<T>(comp: T | null | undefined, name: string): T {
  if (comp == null) {
    console.error(`❌ Component '${name}' is null or undefined`);
  }
  return comp as T;
}

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
  right: [
    safeComponent(Component.Graph(), "Graph"),
    safeComponent(RecentNotes({
      title: "Recent Notes",
      limit: 5,
      showTags: true,
    }), "RecentNotes"),
    safeComponent(ContactForm(), "ContactForm"),
  ],
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [],
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
    ContactForm(),
  ],
  afterBody: [
    Component.TagsAndDate(),
  ],
}