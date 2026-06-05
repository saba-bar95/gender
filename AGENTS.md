# AI Coding Agent Instructions for Gender Statistics Project

This file provides essential guidance for AI coding agents working in this React+Vite project.

## Project Structure

- **Root**: React app using Vite, Tailwind CSS, and ESLint. Entry: `src/App.jsx`.
- **public/**: Static assets served at the site root (SDG Excel files, fonts, favicon).
- **src/assets/**: Bundled images, PDFs, and chart assets.

## Build & Run Commands

- **Development:** `npm run dev` → **http://localhost:3000**
- **Build:** `npm run build` → output in `dist/`
- **Preview:** `npm run preview` → **http://localhost:3000** (production build)
- **Lint:** `npm run lint`

### Local port (default)

| Service | Port | URL |
|--------|------|-----|
| React app (Vite dev / preview) | **3000** | http://localhost:3000 |

Chart/statistics data is loaded from `https://pcaxis-api.geostat.ge` (no local API server required).

## Key Conventions

- Uses React functional components and hooks.
- Routing via `react-router-dom`.
- Styles: Tailwind CSS and SCSS modules.
- Main layout in `App.jsx`.
- Error boundaries: `ErrorBoundary.jsx`.
- Glossary: static data in `src/data/glossaryKa.js` and `src/data/glossaryEn.js`.
- SDG downloads: `public/files/sdg/` and `public/files/sdg_en/`.
- Section PDFs: `src/assets/pdf/`.

## Page title

- Georgian (`GE`): **ქალისა და კაცის სტატისტიკა**
- English (`EN`): **GENDER STATISTICS**

Set dynamically in `App.jsx` when the user switches language.

## Recommendations for Agents

- Prefer updating this file with new conventions or pitfalls as they are discovered.
- Link to existing documentation rather than duplicating content.
