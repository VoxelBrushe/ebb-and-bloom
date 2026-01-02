import {
  PageLayout,
  SharedLayout,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./quartz/cfg"

import * as Component from "./quartz/components"
import RecentNotes from "./quartz/components/RecentNotes"

/* =========================================================
   EMPTY FOOTER (Quartz-safe)
   ========================================================= */

const EmptyFooter: QuartzComponentConstructor = () => {
  const comp = () => null
  comp.css = "" // Quartz requires this
  return comp
}

/* =========================================================
   COMPACT CONTENT META WRAPPER
   (keeps date, removes divider & excess height)
   ========================================================= */

const CompactContentMeta: QuartzComponentConstructor = () => {
  const comp = (props: QuartzComponentProps) => {
    // Forward props correctly to ContentMeta
    return Component.ContentMeta()(props)
  }

  comp.css = `
    /* Target only the final ContentMeta instance */
    .center > .content-meta:last-child,
    .center .content-meta:last-of-type {
      margin: 0 !important;
      padding: 0 !important;
      border-top: none !important;

      display: flex;
      align-items: center;

      font-size: 0.8rem;
      line-height: 1;
      opacity: 0.75;
      color: var(--gray);
    }

    /* Kill the divider pseudo-element */
    .center > .content-meta:last-child::before,
    .center .content-meta:last-of-type::before {
      content: none !important;
      display: none !important;
    }
  `

  return comp
}

/* =========================================================
   SHARED LAYOUT
   ========================================================= */

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Darkmode(),
  ],
  afterBody: [],
  footer: EmptyFooter(), // ← removes default Quartz footer
}

/* =========================================================
   CONTENT PAGES
   ========================================================= */

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
    CompactContentMeta(), // ← compact planted-on date
  ],
}

/* =========================================================
   LIST / INDEX PAGES
   ========================================================= */

export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
