# bimbiriim-website

Portfolio website on React + TypeScript + Vite with static content for GitHub Pages.

## Content Storage

All live content is stored in:

- `public/content/site-content.json`

This file contains both locales (`en`, `ru`) with `draft` and `published` snapshots.

## Local Admin Workflow

1. Install and run:

```bash
npm ci
npm run dev
```

2. Open admin UI:

- `http://localhost:5173/?admin=1`
- Login password: `VITE_ADMIN_PASSWORD` (or fallback `bimbiriim-admin`)

3. Edit content in admin mode:

- `Save changes` keeps draft in browser `localStorage`
- `Publish` updates local published snapshot
- `Export JSON` downloads a full content file
- `Import JSON` loads a previously exported file

4. Replace repository file:

- Copy downloaded JSON into `public/content/site-content.json`

5. Commit and push to `main`.

## GitHub Pages Deployment

Deployment is automated by `.github/workflows/deploy.yml`.

- Trigger: push to `main`
- Build command: `npm run build:pages`
- Artifact: `dist/` (with `404.html` SPA fallback)

By default workflow builds for repository path:

- `VITE_BASE_PATH=/<repo-name>/`

If you use a custom domain/root hosting, set repository variable:

- `VITE_BASE_PATH=/`

## Optional Docker Preview

Static preview with Nginx:

```bash
docker compose up -d --build
```

Then open:

- `http://localhost:8080`
