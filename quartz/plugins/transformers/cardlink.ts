import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

interface CardLinkData {
  url: string
  title: string
  description: string
  host: string
  favicon: string
  image: string
}

export const defaultOptions = {}

export const Plugin: QuartzTransformerPlugin<typeof defaultOptions> = () => {
  return {
    name: "CardLink",
    markdownPass: ({ ast }) => {
      visit(ast, "code", (node: any, index, parent) => {
        // Check if this is a cardlink block
        if (node.lang === "cardlink" && parent && index !== undefined) {
          const cardContent = node.value
          const data: Partial<CardLinkData> = {}

          // Parse key-value pairs
          const lines = cardContent.split("\n")
          lines.forEach((line) => {
            const colonIndex = line.indexOf(": ")
            if (colonIndex === -1) return
            
            const key = line.substring(0, colonIndex).trim()
            const value = line.substring(colonIndex + 2).replace(/^["']|["']$/g, "").trim()

            if (key && value) {
              data[key as keyof CardLinkData] = value
            }
          })

          // Validate required fields
          if (data.url && data.title) {
            // Create HTML node to replace the code block
            const cardHtml = generateCardHTML(data as CardLinkData)
            
            const htmlNode = {
              type: "html",
              value: cardHtml,
            }

            // Replace the code node with the HTML node
            parent.children[index] = htmlNode
          }
        }
      })
    },
  }
}

function generateCardHTML(data: CardLinkData): string {
  const { url, title, description, host, favicon, image } = data
  const displayHost = host || new URL(data.url).hostname

  return `<a href="${escapeHtml(url)}" class="cardlink-container" style="text-decoration: none; color: inherit; display: block; margin: 1rem 0;">
  <div class="cardlink" style="
    border: 1px solid var(--lightgray, #e5e5e5);
    border-radius: 8px;
    overflow: hidden;
    background: var(--light, #faf8f8);
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  ">
    ${image ? `<div class="cardlink-image" style="
      width: 100%;
      height: 200px;
      overflow: hidden;
      background: var(--lightgray, #e5e5e5);
    ">
      <img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" style="
        width: 100%;
        height: 100%;
        object-fit: cover;
      " />
    </div>` : ""}
    
    <div class="cardlink-content" style="padding: 16px;">
      <div class="cardlink-header" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        ${favicon ? `<img src="${escapeHtml(favicon)}" alt="" style="width: 16px; height: 16px; border-radius: 3px;" onerror="this.style.display='none'" />` : ""}
        <span class="cardlink-host" style="
          font-size: 0.875rem;
          color: var(--darkgray, #4e4e4e);
        ">${escapeHtml(displayHost)}</span>
      </div>
      
      <h3 class="cardlink-title" style="
        margin: 0 0 8px 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--dark, #2b2b2b);
      ">${escapeHtml(title)}</h3>
      
      ${description ? `<p class="cardlink-description" style="
        margin: 0;
        font-size: 0.9375rem;
        color: var(--darkgray, #4e4e4e);
        line-height: 1.4;
      ">${escapeHtml(description)}</p>` : ""}
    </div>
  </div>
</a>`
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

export default Plugin