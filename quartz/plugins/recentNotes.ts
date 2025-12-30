import { Emitter, Page } from "./quartz/cfg"

export function RecentNotesEmitter(limit = 5): Emitter {
  return {
    name: "RecentNotes",
    emit(page: Page) {
      // Only run on pages that have file and site.pages defined
      if (!page || !page.file || !page.site?.pages) return
      if (page.file.name !== "index") return

      // Ensure pagesArray exists and is an array
      const pagesArray = Array.isArray(page.site.pages) ? page.site.pages : []
      if (!pagesArray.length) return

      const recent = pagesArray
        .filter(
          p =>
            p.file &&
            p.file.name !== page.file.name &&
            p.frontmatter?.["date-created"]
        )
        .sort(
          (a, b) =>
            new Date(b.frontmatter!["date-created"]).getTime() -
            new Date(a.frontmatter!["date-created"]).getTime()
        )
        .slice(0, limit)

      if (!recent.length) return

      const html = `
        <section class="recent-notes">
          <h2>Recent Notes</h2>
          <ul>
            ${recent
              .map(p => `<li><a href="${p.file.url}">${p.file.title ?? p.file.name}</a></li>`)
              .join("\n")}
          </ul>
        </section>
      `
      page.body += html
    },
  }
}
