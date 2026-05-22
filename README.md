# evankirsch.github.io

Personal portfolio website for [evankirsch.org](https://evankirsch.org), compiled from TypeScript to static files via Vite and deployed to GitHub Pages on every push.

## Commands

```bash
npm install          # install dependencies
npm run build        # compile TS via Vite → dist/, then copy assets/
npx http-server      # run app and serve files in `dist/`
```

## Structure

The app is a single-page app where the "pages" are static HTML files in `assets/pages/` that get fetched and injected into the DOM on navbar clicks.

**Startup flow** (`src/index.ts`):
1. `NavbarRenderer` builds the navbar and immediately renders the first page
2. `GithubRepoApis.preloadLanguageApis()` warms the `RequestManager` cache in the background.

**Page switching** (`src/navbar/`):
- `NavbarRenderer` holds the pages array — each entry has a label, an HTML file path, and an optional post-render hook.
- On click, `NavbarFunctions.onLiClick` updates active state, then `PageRenderer.renderPage` fetches the HTML file and sets `#open-page`.
- The post-render hook fires next, mounting any widgets the page needs.

**Widgets** (`src/widgets/`):
- All implement `WidgetInterface<T>` with a `renderOn(targetEltId)` method.
- `LanguageWidget` calls GitHub API to show language breakdown by bytes.
- `ProjectWidget` renders a hardcoded project list with links.
- `ContactInfoWidget` renders contact info.
- They use `PageManager.getElementById` (which polls with a 200ms timeout) to wait for the injected HTML to be present before appending content. This is a bug that can create race conditions.

**GitHub API** (`src/api/`):
- `RequestManager` is a singleton in-memory cache keyed by URL — avoids duplicate API calls across widget renders and preloading.
- `GithubRepoApis` uses Octokit (unauthenticated) and has a `urlBlacklist` to exclude specific repos from language stats.

**Deployment**: see `.github/workflows/build-and-deploy.yml`

## Adding a new page

1. Create the HTML file in `assets/pages/`.
2. Add a `_Page` entry to the `pages` array in `src/navbar/navbar-renderer.ts`.
3. If the page needs dynamic content, create a widget in `src/widgets/` implementing `WidgetInterface<T>` and wire it in via the page's hook.
