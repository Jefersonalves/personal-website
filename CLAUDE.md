# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with **Observable Framework** (v1.12.0), a modern framework for creating data-driven, interactive websites. The site is deployed to GitHub Pages at jefersonalves.com.

Observable Framework uses a markdown-first approach where pages are written as `.md` files with embedded JavaScript for data visualization and interactivity. The framework compiles everything to static HTML.

## Common Commands

```bash
# Start local development server (http://localhost:3000)
npm run dev

# Build for production (cleans dist/ and rebuilds everything)
npm run build

# Deploy to GitHub Pages with custom domain
npm run deploy

# Clear Observable's build cache (useful if you encounter caching issues)
npm run clean
```

## Importing Observable Notebooks

Observable Framework provides a built-in command to convert and import notebooks from observablehq.com:

```bash
# Import a notebook from Observable
npx observable convert https://observablehq.com/@author/notebook-name src/path/to/page.md
```

**What this does:**
- Downloads the notebook content and converts it to Framework markdown format
- Automatically downloads any file attachments (images, data files, etc.)
- Preserves all code cells, including Web Workers and npm imports
- Maintains compatibility with Observable notebook features like `FileAttachment`, `DOM.context2d`, `invalidation`, etc.

**Example workflow for importing to blog:**
```bash
# Import notebook to blog directory
npx observable convert https://observablehq.com/@mbostock/voronoi-stippling src/blog/voronoi-stippling.md

# Move downloaded files to blog directory if needed
mv src/page.md src/blog/
mv src/asset.png src/blog/

# Update observablehq.config.js to add the page to navigation
# Add entry like: {name: "Page Title", path: "/blog/page-name"}
```

**Important notes:**
- The convert command may show an "Invalid URL" error at the end, but files are usually downloaded successfully - always check the src directory
- **⚠️ Notebook APIs are NOT fully supported**: Framework intentionally omits some Observable Notebook stdlib functions (see below)
- File attachments are referenced relative to the markdown file location
- Remember to update `observablehq.config.js` to add the new page to the navigation

### Converting Notebook APIs to Framework

**Observable Framework vs Observable Notebooks**: Framework intentionally omits certain stdlib functions for better portability, safety, and standards compliance. When importing notebooks, you'll need to convert these patterns:

**1. DOM utilities → Vanilla JavaScript**

Notebooks provide `DOM.context2d()` helper, but Framework requires vanilla JS:

```javascript
// ❌ Observable Notebook (will fail in Framework)
const context = DOM.context2d(width, height);

// ✅ Observable Framework (vanilla JavaScript)
function context2d(width, height, dpi = devicePixelRatio) {
  const canvas = document.createElement("canvas");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = `${width}px`;
  const context = canvas.getContext("2d");
  context.scale(dpi, dpi);
  return context;
}
const context = context2d(width, height);
```

**2. Module resolution: require → import.meta**

Framework uses modern ES modules instead of AMD:

```javascript
// ❌ Observable Notebook (will fail in Framework)
const url = await require.resolve("d3-delaunay@6");

// ✅ Observable Framework (ES modules)
const url = await import.meta.resolve("npm:d3-delaunay@6");
```

**3. Web Workers: importScripts → ES module imports**

Workers in Framework must use ES module syntax. **Critical:** The Blob MIME type must be `"text/javascript"`, while the Worker constructor specifies `{type: "module"}` separately.

```javascript
// ❌ Observable Notebook Worker pattern
const blob = new Blob([`
importScripts("${await require.resolve("d3-delaunay@6")}");
// ... worker code
`], {type: "text/javascript"});
const worker = new Worker(URL.createObjectURL(blob));

// ✅ Observable Framework Worker pattern - CORRECT
const d3Url = await import.meta.resolve("npm:d3-delaunay@6");
const blob = new Blob([`
import * as d3 from "${d3Url}";
// ... worker code
`], {type: "text/javascript"});  // ← MIME type for JavaScript
const worker = new Worker(URL.createObjectURL(blob), {type: "module"});  // ← Parser mode

// ❌ WRONG - Will fail with MIME type error
const blob = new Blob([`...`], {type: "module"});  // "module" is not a valid MIME type!
```

**Why this matters:** `{type: "module"}` in the Blob options is not a valid MIME type and will cause the error: *"Failed to load module script: The server responded with a non-JavaScript MIME type"*. The Blob type must be a valid JavaScript MIME type (`"text/javascript"` or `"application/javascript"`), while module semantics are specified in the Worker constructor.

**4. Missing Functions: md, tex, html, require, DOM**

These are intentionally omitted:
- `md` - Unsafe with interpolation; use markdown in the page itself
- `tex` - Not included; use KaTeX libraries directly if needed
- `html` - Not included; use standard DOM APIs
- `require` - Use `import.meta.resolve("npm:package-name")`
- `DOM` - Use vanilla JavaScript (see pattern above)

**Testing for Runtime Errors**

Create a testing script to catch these issues:

```javascript
// check-errors.js
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', error => errors.push(error.toString()));

  await page.goto('http://localhost:3000/your-page', {
    waitUntil: 'networkidle0'
  });

  console.log(errors.length === 0 ? '✅ No errors' : '❌ Errors:', errors);
  await browser.close();
})();
```

Run with: `node check-errors.js` (requires `npm install puppeteer --save-dev`)

## Architecture and Code Organization

### Framework-Specific Patterns

**Markdown Pages with Frontmatter**: Pages in `src/*.md` use YAML frontmatter to control metadata:
```yaml
---
title: Page Title
toc: false
---
```

**Component Pattern**: Reusable visualizations live in `src/components/` and export functions that return D3 or Observable Plot charts:
```javascript
// src/components/timeline.js
import * as Plot from "npm:@observablehq/plot";

export function timeline(events, {width, height} = {}) {
  return Plot.plot({...});
}
```

Components can be imported in markdown files using:
```javascript
import {timeline} from "./components/timeline.js";
```

**Data Files**: Static data sources in `src/data/*.json` feed visualization components. Reference them in markdown:
```javascript
const events = FileAttachment("data/events.json").json();
```

**Navigation Structure**: Configured centrally in `observablehq.config.js`, not in individual pages. The config defines:
- Site title and header
- Sidebar navigation (including collapsible sections)
- Search, theme, and other features

**Styling**: Use inline `<style>` blocks within markdown files. Observable Framework automatically scopes styles. The framework provides CSS variables like `--theme-*` and `--sans-serif`.

### Directory Structure

- `src/` - Source content (markdown pages, components, data files)
  - `src/components/` - Reusable JavaScript modules (D3/Plot visualizations)
  - `src/data/` - JSON data files
  - `src/*.md` - Page content (index, resume, projects)
- `dist/` - Generated build output (NEVER edit directly - always regenerated on build)
- `observablehq.config.js` - Framework configuration (navigation, features, branding)

### Build Process

Observable Framework:
1. Processes markdown files and resolves imports
2. Bundles JavaScript components and npm dependencies
3. Generates static HTML pages in `dist/`
4. Creates `_observablehq/`, `_npm/`, `_file/` directories for framework runtime and assets

The `dist/` directory is completely generated - any manual changes will be overwritten on the next build.

## Deployment

The site deploys to GitHub Pages using the `gh-pages` npm package:
- `npm run deploy` automatically builds and publishes to the `gh-pages` branch
- Custom domain (jefersonalves.com) is configured via CNAME file and `--cname` flag
- `.nojekyll` file ensures GitHub serves raw HTML without Jekyll processing

## Requirements

- Node.js 18 or higher
- dont run the server with `npm run dev` I will do it myself