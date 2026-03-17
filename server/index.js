import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const PORT = Number(process.env.PORT ?? 8787);
const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'data', 'content.db');
const LOCALES = ['en', 'ru'];

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS page_content (
    locale TEXT PRIMARY KEY,
    draft_json TEXT,
    published_json TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const getByLocaleStmt = db.prepare(`
  SELECT locale, draft_json, published_json, updated_at
  FROM page_content
  WHERE locale = ?
`);

const saveDraftStmt = db.prepare(`
  INSERT INTO page_content (locale, draft_json, updated_at)
  VALUES (@locale, @draftJson, CURRENT_TIMESTAMP)
  ON CONFLICT(locale) DO UPDATE SET
    draft_json = excluded.draft_json,
    updated_at = CURRENT_TIMESTAMP
`);

const publishStmt = db.prepare(`
  INSERT INTO page_content (locale, draft_json, published_json, updated_at)
  VALUES (@locale, @pageJson, @pageJson, CURRENT_TIMESTAMP)
  ON CONFLICT(locale) DO UPDATE SET
    draft_json = excluded.draft_json,
    published_json = excluded.published_json,
    updated_at = CURRENT_TIMESTAMP
`);

app.use(
  express.json({
    limit: process.env.API_JSON_LIMIT ?? '30mb'
  })
);

function isLocale(locale) {
  return LOCALES.includes(locale);
}

function parseJsonOrNull(raw) {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isValidPagePayload(page) {
  return Boolean(page && typeof page === 'object' && Array.isArray(page.sections));
}

function readLocaleContent(locale) {
  const row = getByLocaleStmt.get(locale);
  if (!row) {
    return {
      locale,
      draft: null,
      published: null,
      updatedAt: null
    };
  }

  return {
    locale,
    draft: parseJsonOrNull(row.draft_json),
    published: parseJsonOrNull(row.published_json),
    updatedAt: row.updated_at ?? null
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/content', (_req, res) => {
  const content = {};
  LOCALES.forEach((locale) => {
    content[locale] = readLocaleContent(locale);
  });
  res.json({ content });
});

app.get('/api/content/:locale', (req, res) => {
  const { locale } = req.params;
  if (!isLocale(locale)) {
    res.status(400).json({ error: 'Unsupported locale' });
    return;
  }

  res.json(readLocaleContent(locale));
});

app.put('/api/content/:locale/draft', (req, res) => {
  const { locale } = req.params;
  if (!isLocale(locale)) {
    res.status(400).json({ error: 'Unsupported locale' });
    return;
  }

  const page = req.body?.page;
  if (!isValidPagePayload(page)) {
    res.status(400).json({ error: 'Invalid page payload' });
    return;
  }

  const pageJson = JSON.stringify(page);
  saveDraftStmt.run({
    locale,
    draftJson: pageJson
  });

  res.json(readLocaleContent(locale));
});

app.post('/api/content/:locale/publish', (req, res) => {
  const { locale } = req.params;
  if (!isLocale(locale)) {
    res.status(400).json({ error: 'Unsupported locale' });
    return;
  }

  const page = req.body?.page;
  if (!isValidPagePayload(page)) {
    res.status(400).json({ error: 'Invalid page payload' });
    return;
  }

  const pageJson = JSON.stringify(page);
  publishStmt.run({
    locale,
    pageJson
  });

  res.json(readLocaleContent(locale));
});

app.listen(PORT, () => {
  process.stdout.write(`API server is running on http://localhost:${PORT}\n`);
});
