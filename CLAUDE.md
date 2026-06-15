# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run build        # compile TS via Vite → dist/, then copy assets/
npx http-server      # serve the built app from dist/
```

There is no test suite or linter configured.

## Architecture

Personal portfolio SPA ([evankirsch.org](https://evankirsch.org)) built with TypeScript, bundled by Vite into static files, and deployed to GitHub Pages via `.github/workflows/build-and-deploy.yml` on every push to `main`.

**Entry point** — `src/index.ts`: instantiates `NavbarRenderer` (which renders the first page immediately) and calls `GithubRepoApis.preloadLanguageApis()` to warm the request cache in the background.

**Page routing** (`src/navbar/navbar-renderer.ts`):
- `pages` array holds `_Page` entries — each with a label, HTML file path (`assets/pages/*.html`), and optional post-render hook.
- Hash changes trigger `activatePageByHash` → `PageRenderer.renderPage`, which fetches the HTML file and injects it into `#main-body`.
- The post-render hook fires after injection and mounts widgets.

**Widgets** (`src/widgets/`):
- All implement `WidgetInterface<T>` with a `renderOn(targetEltId)` method.
- `PageManager.getElementById` (in `src/pagination/`) waits for the injected HTML to be present via polling before appending widget content.
- Key widgets: `ProjectWidget` (open-source repos with live GitHub metadata), `ClosedSourceProjectWidget` (static list with "Closed Source" badge), `LanguageWidget` (GitHub language breakdown by bytes), `HeroTaglineWidget`, `HomeSummaryWidget`, `SocialsWidget`.

**GitHub API** (`src/api/`):
- `RequestManager` is a singleton in-memory cache keyed by URL — prevents duplicate API calls across widgets and preloading.
- `GithubRepoApis` uses Octokit (unauthenticated) and has a `urlBlacklist` to exclude specific repos from language stats.

## Adding a new page

1. Create the HTML file in `assets/pages/`.
2. Add a `_Page` entry to the `pages` array in `src/navbar/navbar-renderer.ts`.
3. If the page needs dynamic content, create a widget in `src/widgets/` implementing `WidgetInterface<T>` and wire it in via the page's post-render hook.
