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

/* =========================================================
   TAG CLOUD — BALANCED + FREQUENCY-BASED SCALING
   ========================================================= */

.tag-cloud {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: center !important;
  align-items: flex-start !important;
  gap: 0.5rem !important;
  max-width: 100% !important;
  overflow-x: hidden !important;
  padding: 1rem !important;
  box-sizing: border-box !important;
  text-align: center !important;
}

/* Each tag item */
.tag-cloud-item {
  display: inline-block !important;
  white-space: normal !important;
  line-height: 1.4 !important;
  text-decoration: none !important;
  color: #D08770 !important; /* Nord orange */
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.9;
}

.tag-cloud-item:hover {
  transform: scale(1.08);
  opacity: 1;
}

/* =========================================================
   FONT SIZE — TRUE FREQUENCY SCALING
   ========================================================= */

/*
Quartz tag frequency data gives each tag a "size" or "weight" value (usually 1–10).
We map that visually to smaller increments so the difference is readable,
but not extreme or overpowering.
*/

.tag-cloud-item[data-weight="1"]  { font-size: 0.75rem !important; }
.tag-cloud-item[data-weight="2"]  { font-size: 0.85rem !important; }
.tag-cloud-item[data-weight="3"]  { font-size: 0.95rem !important; }
.tag-cloud-item[data-weight="4"]  { font-size: 1.05rem !important; }
.tag-cloud-item[data-weight="5"]  { font-size: 1.15rem !important; }
.tag-cloud-item[data-weight="6"]  { font-size: 1.25rem !important; }
.tag-cloud-item[data-weight="7"]  { font-size: 1.35rem !important; }
.tag-cloud-item[data-weight="8"]  { font-size: 1.45rem !important; }
.tag-cloud-item[data-weight="9"]  { font-size: 1.55rem !important; }
.tag-cloud-item[data-weight="10"] { font-size: 1.65rem !important; }

/* =========================================================
   MOBILE — SMALLER SCALE + WRAP FIX
   ========================================================= */

@media (max-width: 768px) {
  .tag-cloud {
    justify-content: center !important;
    gap: 0.35rem !important;
    padding: 0.5rem 0.5rem 1rem 0.5rem !important;
  }

  .tag-cloud-item {
    margin: 0.2rem !important;
    opacity: 0.9;
  }

  /* slightly reduce the entire scale */
  .tag-cloud-item[data-weight="1"]  { font-size: 0.7rem !important; }
  .tag-cloud-item[data-weight="5"]  { font-size: 1.0rem !important; }
  .tag-cloud-item[data-weight="10"] { font-size: 1.25rem !important; }

  html, body {
    overflow-x: hidden !important;
  }
}
`

export default (() => TagCloud) satisfies QuartzComponentConstructor
