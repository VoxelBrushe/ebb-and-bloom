import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export const TagCloud: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  // Collect tag frequencies
  const tagCounts: Record<string, number> = {}
  allFiles.forEach(file => {
    const tags = file.frontmatter?.tags ?? []
    tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const tags = Object.entries(tagCounts)
  if (tags.length === 0) return null

  // Randomize order
  const shuffled = tags.sort(() => Math.random() - 0.5)

  const minCount = Math.min(...tags.map(([_, c]) => c))
  const maxCount = Math.max(...tags.map(([_, c]) => c))

  // Nonlinear scaling (more natural)
  const scale = (count: number) => {
    if (maxCount === minCount) return 1
    const normalized = (count - minCount) / (maxCount - minCount)
    return 0.8 + Math.pow(normalized, 0.7) * 1.2 // gently nonlinear
  }

  return (
    <div class="tag-cloud">
      <h3>driftwood tags</h3>
      <div class="tag-cloud-content">
        {shuffled.map(([tag, count]) => (
          <a
            href={`/tags/${tag}`}
            class="tag-cloud-item"
            style={`font-size: ${scale(count)}rem; transform: rotate(${(Math.random() - 0.5) * 8}deg);`}
          >
            #{tag}
          </a>
        ))}
      </div>
    </div>
  )
}

TagCloud.css = `
/* =========================================================
   TAG CLOUD — RANDOM DISTRIBUTION (NORD THEME)
   ========================================================= */

.tag-cloud {
  width: 100%;
  margin-top: 0.5rem !important;
  padding: 1rem !important;
  box-sizing: border-box;
  text-align: center;
}

/* Optional: reduce extra bottom gap for clean edge alignment */
.tag-cloud:last-child {
  margin-bottom: 0 !important;
  padding-bottom: 0.5rem !important;
}

[saved-theme="dark"] .tag-cloud {
  background-color: #2E3440 !important;
}

[saved-theme="light"] .tag-cloud {
  background-color: #D8DEE9 !important;
}

.tag-cloud h3 {
  font-size: 1.4rem !important;
  font-weight: 600 !important;
  margin: 0 0 1rem 0 !important;
}

[saved-theme="dark"] .tag-cloud h3 {
  color: #8FBCBB !important;
}

[saved-theme="light"] .tag-cloud h3 {
  color: #5E81AC !important;
}

/* Tag distribution */
.tag-cloud-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem 0.8rem;
  line-height: 1.5;
}

/* Each tag */
.tag-cloud-item {
  text-decoration: none !important;
  color: #D08770 !important;
  transition: transform 0.2s ease, color 0.2s ease, opacity 0.3s ease;
  display: inline-block;
  opacity: 0.9;
}

.tag-cloud-item:hover {
  transform: scale(1.15) rotate(0deg);
  opacity: 1;
}

/* Hover colors (theme aware) */
[saved-theme="light"] .tag-cloud-item:hover {
  color: #5E81AC !important;
}

[saved-theme="dark"] .tag-cloud-item:hover {
  color: #8FBCBB !important;
}
`

export default (() => TagCloud) satisfies QuartzComponentConstructor
