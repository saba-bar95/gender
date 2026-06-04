# AI Coding Agent Instructions for Gender Statistics Project

This file provides essential guidance for AI coding agents working in this monorepo, which contains both a React+Vite frontend and an Express+MSSQL backend. The goal is to maximize agent productivity and ensure consistent, high-quality contributions.

## Project Structure

- **frontend/**: React app using Vite, Tailwind CSS, and ESLint. Entry: `src/App.jsx`.
- **backend/**: Express server with MSSQL database. Entry: `index.js`.

## Build & Run Commands

### Frontend
- **Development:** `npm run dev` (in `frontend/`) → **http://localhost:3000**
- **Build:** `npm run build` (in `frontend/`)
- **Preview:** `npm run preview` (in `frontend/`) → **http://localhost:3000** (production build)
- **Lint:** `npm run lint` (in `frontend/`)

### Backend
- **Development:** `npm run dev` (in `backend/`) → **http://localhost:3001**
- **Production:** `npm start` (in `backend/`)

### Local ports (default)

| Service | Port | URL |
|--------|------|-----|
| React app (Vite dev / preview) | **3000** | http://localhost:3000 |
| Express API | **3001** | http://localhost:3001 |

On another device on the same network, use your PC’s IP instead of `localhost`, e.g. `http://192.168.1.10:3000`.

Chart/statistics data is loaded from `https://pcaxis-api.geostat.ge` (no local port). Glossary and other DB features need the backend on **3001** and a `frontend/.env` file containing `VITE_API_URL=http://localhost:3001`.

## Key Conventions

- **Frontend:**
  - Uses React functional components and hooks.
  - Routing via `react-router-dom`.
  - Styles: Tailwind CSS and SCSS modules.
  - Main layout in `App.jsx`.
  - Error boundaries: `ErrorBoundary.jsx`.
  - Glossary modal: `GlossaryModal.jsx`.
- **Backend:**
  - Express routes in `backend/routes/`.
  - MSSQL config in `dbConfig.js` (uses environment variables).
  - CORS configured for local dev and production domains.
  - API endpoints: `/api/files`, `/api/glossary`, `/api/goals`.

## Environment

- **Frontend:** Optional `frontend/.env` with `VITE_API_URL=http://localhost:3001` for glossary/DB APIs. Charts work without it.
- **Backend:** Requires `.env` file with MSSQL connection details (`DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_NAME`, etc.).

## Useful Links
- [Frontend README](frontend/README.md)

## Recommendations for Agents
- Prefer updating this file (AGENTS.md) with new conventions or pitfalls as they are discovered.
- Link to existing documentation rather than duplicating content.
- If adding new skills or custom agents, document their purpose and usage here.
