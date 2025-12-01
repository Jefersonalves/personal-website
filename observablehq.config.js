// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "About me",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {name: "Resume", path: "/resume"},
    {name: "Projects", path: "/projects"},
    {
      name: "Blog",
      open: false,
      pages: [
        //{name: "Example Report", path: "/example-report"}
      ]
    }
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: `<link rel="icon" href="observable.png" type="image/png" sizes="32x32">
  <style>
    /* Global spacing reduction for all pages */
    main {
      padding-bottom: 0 !important;
      margin-bottom: 0 !important;
    }

    footer {
      margin-top: 2rem !important;
      padding-top: 0 !important;
    }

    footer nav,
    footer > *,
    .observablehq-next,
    [role="navigation"] {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }

    .grid.grid-cols-3 {
      margin-bottom: 0 !important;
    }

    main > *:last-child {
      margin-bottom: 0 !important;
    }

    hr {
      margin: 1rem 0 !important;
    }

    body {
      --main-padding-bottom: 0;
    }

    main + footer {
      margin-top: 4rem !important;
    }
  </style>`,

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  header: '<a href="/index">Jeferson Alves</a>', // what to show in the header (HTML)
  footer: "Thanks for reading! If you have any questions or feedback, please let me know on LinkedIn.", // what to show in the footer (HTML)
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  search: true,
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // cleanUrls: true, // drop .html from URLs
};
