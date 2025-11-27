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
