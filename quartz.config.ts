import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import CustomTagContent from "./quartz/components/CustomTagContent"
import { sharedPageComponents } from "./quartz.layout"

/**
 * Quartz 4.0 Configuration
 * 
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "ebb and bloom",
    enableSPA: false,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://ebb-and-bloom.com/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Raleway",
        body: "Roboto",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 202, 144, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#4C566A",
          lightgray: "#4C566A",
          gray: "#D8DEE9",
          darkgray: "#ECEFF4",
          dark: "#ECEFF4",
          secondary: "#8FBCBB",
          tertiary: "#A3BE8C",
          highlight: "rgba(143, 188, 187, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },

  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "absolute" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],

    filters: [
      Plugin.RemoveDrafts(),
      (() => ({
        name: "PublishFilter",
        shouldPublish(_ctx, [_tree, vfile]) {
          const fm = vfile.data?.frontmatter
          if (fm && "publish" in fm) return fm.publish === true
          return false
        },
      }))(),
    ],

    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage({
        pageBody: CustomTagContent(),
      }),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
