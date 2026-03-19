# bimbiriim-website

Portfolio website implemented from Figma in React + TypeScript + Vite.

## Scripts

- `npm install`
- `npm run dev`
- `npm run dev:all`
- `npm run dev:server`
- `npm run build`
- `npm run preview`
- `npm start`

## Server-backed CMS storage

Admin draft/publish data is stored in a server SQLite database (`data/content.db`), not in browser localStorage.

- Draft save: `PUT /api/content/:locale/draft`
- Publish: `POST /api/content/:locale/publish`
- Read content: `GET /api/content/:locale`

All sections are persisted as JSON payloads (`works`, `reviews`, images, names, etc.) per locale.

## Local development

Run frontend and backend in separate terminals:

1. `npm run dev:server` (API on `http://localhost:8787`)
2. `npm run dev` (Vite on `http://localhost:5173`, proxied `/api` to backend)

Or run both together:

- `npm run dev:all`

## Production notes

- Run backend API with `npm start` (set `PORT` and optional `DB_PATH`).
- Build frontend with `npm run build`.
- Serve `dist/` behind Nginx (or via Docker), and proxy `/api` to Node API.

## GitHub auto-deploy (main -> server)

This repo now includes:

- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Docker runtime: `docker-compose.yml`, `Dockerfile.api`, `Dockerfile.web`

Workflow trigger:

- Every push to `main`
- Manual run via `workflow_dispatch`

Required GitHub repository secrets:

1. `SERVER_USER` (SSH user)
2. `SERVER_SSH_KEY` (private key content for that user)
3. `SERVER_DEPLOY_PATH` (target path on server, e.g. `/opt/bimbiriim-website`)
4. `SERVER_PORT` (optional, default `22`)

Target host is currently hardcoded in workflow to `212.80.7.115`.

Server prerequisites:

1. Docker + Docker Compose installed.
2. SSH user has permission to run `docker compose`.
3. Port `80` open for inbound traffic.

## Features

- Bilingual UI: English / Russian
- Switzer variable font integration
- Figma-based assets and layout
- Hero typewriter animation with backspace cycle
- Responsive behavior for desktop and mobile
