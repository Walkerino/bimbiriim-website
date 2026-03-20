# bimbiriim-website

Portfolio website implemented from Figma in React + TypeScript + Vite.

## Features

- Bilingual UI: English / Russian
- Switzer variable font integration
- Figma-based assets and layout
- Hero typewriter animation with backspace cycle
- Responsive behavior for desktop and mobile

## Deployment: Vercel Frontend + External API

Use this setup when frontend is hosted on Vercel and API/SQLite stays on your server.

### 1) Frontend on Vercel

- Import this repository in Vercel.
- Add environment variable in Vercel project settings:
  - `VITE_API_BASE_URL=https://api.your-domain.com`
- Redeploy.

`VITE_API_BASE_URL` is optional for local dev. If omitted, frontend uses relative `/api/content` (works with Vite local proxy and single-host deployment).

### 2) API on your server

Run API with CORS allowlist, for example:

```bash
CORS_ORIGINS="https://your-project.vercel.app,https://your-domain.com,https://www.your-domain.com,*.vercel.app" \
docker compose up -d --build
```

Notes:

- `CORS_ORIGINS` accepts comma-separated origins.
- Wildcard patterns like `*.vercel.app` are supported for preview deployments.
- SQLite stays on your server (`/data/content.db` volume), not on Vercel.

### 3) DNS

- Point `your-domain.com` to Vercel (frontend).
- Point `api.your-domain.com` to your API server.
