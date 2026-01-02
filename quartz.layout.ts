import { PageLayout, SharedLayout, QuartzComponentConstructor, QuartzComponentProps } from "./quartz/cfg"
import * as Component from "./quartz/components"
import RecentNotes from "./quartz/components/RecentNotes"

// Empty footer
const EmptyFooter: QuartzComponentConstructor = () => {
  const comp = () => null
  comp.css = ""
  return comp
}

// Wrapper for ContentMeta that fixes height
const ContentMetaWrapper: QuartzComponentConstructor = () => {
  // Quartz will pass props to this component automatically
  const comp = (props: QuartzComponentProps) => {
    // Forward props to ContentMeta
    return Component.ContentMeta()(props)
  }

  // CSS to shrink it to footer height
  comp.css = `
    .center > .content-meta:last-child,
    .center .content-meta:last-of-type {
      height: 0rem !important;       /* match footer height */
      margin: 0 !important;
      padding: 0 !important;
      display: flex;
      align-items: center;           /* vertically center date */
      font-size: 0.8rem;
      opacity: 0.75;
      color: var(--gray);
      border-top: none !important;   /* remove divider */
      line-height: 0 !important;
    }
  `

  return comp
}

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.PageTitle(), Component.Darkmode()],
  afterBody: [],
  footer: EmptyFooter(),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.TagList()],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    RecentNotes({ title: "Recent Notes", limit: 5, showTags: true }),
  ],
  afterBody: [
    ContentMetaWrapper(), // planted-on date with fixed height
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
