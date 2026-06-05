## Gender Statistics Portal

**Gender Statistics Portal – Georgia Edition** is a bilingual React SPA that presents **official gender-related statistics** for Georgia. Browse indicators across **demography, health, education, employment, crime, sport**, and more — with interactive charts, downloadable datasets, SDG indicators, publications, and a glossary.

Built for **policymakers, researchers, and the public**, it connects to Geostat’s gender statistics API and packages the data in an accessible, mobile-friendly experience aligned with the [official Geostat gender portal](https://gender.geostat.ge/gender/index.php?lang=en).

---

## Features

- **Statistics sections** — 13 thematic areas loaded dynamically from the Geostat API (population, health, education, social protection, households, employment, income, ICT, business, agriculture, crime, governance, sport)
- **Interactive charts** — custom SVG line and bar charts with metadata-driven filters, tooltips, and export (PNG / PDF)
- **Section PDFs** — language-specific overview documents per statistics section
- **SDG indicators** — 17 Sustainable Development Goals with downloadable Excel files (`/goals/:id`)
- **Glossary** — static Georgian and English definitions with search and print
- **Infographics** — sector previews with in-app PDF viewer
- **Publications & legislation** — links to Geostat reports and national legal frameworks
- **About Gender** — introductory modal on gender equality and gender statistics
- **Bilingual UI** — Georgian and English (flag toggle in header/footer; choice persisted in `localStorage`)
- **Responsive layout** — adapted for mobile through desktop

---

## How to use

1. Open the site and pick a language with the **flag control** in the header or footer.
2. On the home page, scroll to **Statistics** and click a sector card to open that section’s charts.
3. Use **chart filters** in the sidebar to narrow dimensions (year, region, etc., depending on the dataset).
4. Click the **section icon** (where available) to open the section PDF in your language.
5. Open **Glossary** from the header for term definitions; use **Print** to export the current list.
6. Scroll to **SDG**, click a goal image, and download linked Excel indicators.
7. Use **Infographic** in the navigation for visual summaries and full PDFs.

**Routes:**

| Path | Page |
|------|------|
| `/` | Home (all sections) |
| `/statistics/:section` | Statistics subsection (e.g. `demography`, `employment`) |
| `/goals/:goalId` | SDG goal downloads (1–17) |

---

## Data sources

- **Statistics & charts:** [National Statistics Office of Georgia (Geostat)](https://www.geostat.ge/)
- **SDG indicators, section PDFs, infographics, and publications:** official Geostat resources and bundled static assets

No local backend is required; the app runs as a static SPA after `npm run build`.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| **UI** | [React 19](https://react.dev/) + [React Router v7](https://reactrouter.com/) |
| **Build** | [Vite 8](https://vite.dev/) + [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) |
| **CSS** | [Tailwind CSS v4](https://tailwindcss.com/) + SCSS modules |
| **Charts** | Custom SVG components (`DatasetLineChart`) |
| **Export** | [jsPDF](https://github.com/parallax/jsPDF) + html2canvas |
| **Carousel** | [Swiper](https://swiperjs.com/) |

---

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
git clone https://github.com/saba-bar95/gender.git
cd gender
npm install
npm run dev
```

Open **http://localhost:3000**.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

### Deployment

Build once, then serve the `dist/` folder (nginx, Apache, Vercel, Netlify, etc.). Configure SPA fallback so `/statistics/...` and `/goals/...` routes resolve to `index.html`.

On **Vercel**, `vercel.json` in the repo root handles SPA rewrites automatically.

---

## Project structure

```
src/
├── api/                 # Geostat API fetch helpers
├── components/          # UI (Header, Main, charts, modals, SDG page, …)
├── constants/           # API URLs and gender-statistics config
├── data/                # Static glossary (Georgian & English)
├── hooks/               # Statistics sections and dataset chart hooks
├── utils/               # Chart data, filters, PDFs, exports
└── App.jsx              # Routes, language state, page title

public/                  # Static files (favicon, SDG downloads, fonts, …)
```

---

## Project history

This repository continues work started by **[Gudadze Oto](https://github.com/gudadzeoto)** on the original Geostat gender portal frontend. The table below summarizes what was in place before continuation and what was added afterward.

### Original foundation ([Gudadze Oto](https://github.com/gudadzeoto))

- Initial **React + Vite** project and main page layout
- **Hero** slider, **publications**, **legislation**, and **partner links** sections
- **About Gender** modal
- **SDG** sub-pages with static Excel file mapping
- **Infographic** modal with image grid and PDF viewer
- Base styling, scroll-to-top, and publication links to Geostat media

The early version also included an **Express + MSSQL backend** for glossary and file metadata from a database.

### Continued development (Saba Barbakadze)

- **Live statistics** wired to Geostat’s gender statistics API with dynamic section navigation
- **Inline interactive charts** on the home page and statistics routes, with metadata-driven filters
- **Custom SVG chart** implementation (replacing the earlier chart approach) plus sidebar controls and exports
- **Section group images** and per-dataset chart image mapping (crime, education, employment, ICT, agriculture, …)
- **Section PDF downloads** from bundled, language-specific assets
- **Static bilingual glossary** (no database/API dependency) with search, print, and responsive modals
- **Responsive layout** pass across header, statistics pages, footer, and all modals
- **Repository cleanup** — removed unused backend, moved the app to the repository root for simpler deploy
- **Branding** — language-specific page title and favicon matching the official portal

---

## Author

**Saba Barbakadze** — continued development and deployment  
**[Gudadze Oto](https://github.com/gudadzeoto)** — original portal foundation
