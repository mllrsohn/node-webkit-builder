import { defineConfig } from "vitepress";

export default defineConfig({
  title: "nw-builder",
  description: "Build NW.js applications",
  base: "/nw-builder/",
  themeConfig: {
    nav: [
      { text: "NW.js Utils", link: "https://nwutils.io/" },
      { text: "npm", link: "https://www.npmjs.com/package/nw-builder" },
      {
        text: "Changelog",
        link: "https://github.com/nwutils/nw-builder/blob/main/CHANGELOG.md",
      },
      { text: "Contributing", link: "./contributing" },
      {
        text: "Code of Conduct",
        link: "https://github.com/nwutils/.github/blob/main/CODE_OF_CONDUCT.md",
      },
      {
        text: "License",
        link: "https://github.com/nwutils/nw-builder/blob/main/LICENSE",
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        collapsible: true,
        items: [
          { text: "Intro", link: "/index" },
          { text: "Get mode", link: "/mode-get" },
          { text: "Run mode", link: "/mode-run" },
          { text: "Build mode", link: "/mode-build" },
        ],
      },
      {
        text: "Migration Guide",
        collapsible: true,
        items: [{ text: "Migrate from v3 to v4", link: "./migrate-v3-v4" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/nwutils/nw-builder" },
    ],
  },
});
