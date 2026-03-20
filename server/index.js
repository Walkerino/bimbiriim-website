import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const PORT = Number(process.env.PORT ?? 8787);
const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'data', 'content.db');
const LOCALES = ['en', 'ru'];
const COLLECTION_SECTION_TYPES = new Set(['works', 'services', 'reviews']);

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

  CREATE TABLE IF NOT EXISTS content_sections (
    locale TEXT NOT NULL,
    section_id TEXT NOT NULL,
    type TEXT NOT NULL,
    draft_order_index INTEGER,
    published_order_index INTEGER,
    draft_props_json TEXT,
    published_props_json TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (locale, section_id)
  );

  CREATE TABLE IF NOT EXISTS content_items (
    locale TEXT NOT NULL,
    section_id TEXT NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL,
    draft_order_index INTEGER,
    published_order_index INTEGER,
    draft_json TEXT,
    published_json TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (locale, section_id, item_id)
  );
`);

const getLegacyByLocaleStmt = db.prepare(`
  SELECT locale, draft_json, published_json, updated_at
  FROM page_content
  WHERE locale = ?
`);

const getSectionsByLocaleStmt = db.prepare(`
  SELECT locale, section_id, type, draft_order_index, published_order_index, draft_props_json, published_props_json
  FROM content_sections
  WHERE locale = ?
`);

const getItemsByLocaleStmt = db.prepare(`
  SELECT locale, section_id, item_id, item_type, draft_order_index, published_order_index, draft_json, published_json
  FROM content_items
  WHERE locale = ?
`);

const hasNormalizedContentStmt = db.prepare(`
  SELECT 1
  FROM content_sections
  WHERE locale = ?
  LIMIT 1
`);

const upsertDraftSectionStmt = db.prepare(`
  INSERT INTO content_sections (
    locale,
    section_id,
    type,
    draft_order_index,
    draft_props_json,
    updated_at
  )
  VALUES (
    @locale,
    @sectionId,
    @type,
    @orderIndex,
    @propsJson,
    CURRENT_TIMESTAMP
  )
  ON CONFLICT(locale, section_id) DO UPDATE SET
    type = excluded.type,
    draft_order_index = excluded.draft_order_index,
    draft_props_json = excluded.draft_props_json,
    updated_at = CURRENT_TIMESTAMP
`);

const upsertPublishedSectionStmt = db.prepare(`
  INSERT INTO content_sections (
    locale,
    section_id,
    type,
    published_order_index,
    published_props_json,
    updated_at
  )
  VALUES (
    @locale,
    @sectionId,
    @type,
    @orderIndex,
    @propsJson,
    CURRENT_TIMESTAMP
  )
  ON CONFLICT(locale, section_id) DO UPDATE SET
    type = excluded.type,
    published_order_index = excluded.published_order_index,
    published_props_json = excluded.published_props_json,
    updated_at = CURRENT_TIMESTAMP
`);

const clearDraftSectionStmt = db.prepare(`
  UPDATE content_sections
  SET draft_order_index = NULL,
      draft_props_json = NULL,
      updated_at = CURRENT_TIMESTAMP
  WHERE locale = @locale
    AND section_id = @sectionId
`);

const clearPublishedSectionStmt = db.prepare(`
  UPDATE content_sections
  SET published_order_index = NULL,
      published_props_json = NULL,
      updated_at = CURRENT_TIMESTAMP
  WHERE locale = @locale
    AND section_id = @sectionId
`);

const deleteEmptySectionStmt = db.prepare(`
  DELETE FROM content_sections
  WHERE locale = @locale
    AND section_id = @sectionId
    AND draft_order_index IS NULL
    AND published_order_index IS NULL
    AND draft_props_json IS NULL
    AND published_props_json IS NULL
`);

const upsertDraftItemStmt = db.prepare(`
  INSERT INTO content_items (
    locale,
    section_id,
    item_id,
    item_type,
    draft_order_index,
    draft_json,
    updated_at
  )
  VALUES (
    @locale,
    @sectionId,
    @itemId,
    @itemType,
    @orderIndex,
    @itemJson,
    CURRENT_TIMESTAMP
  )
  ON CONFLICT(locale, section_id, item_id) DO UPDATE SET
    item_type = excluded.item_type,
    draft_order_index = excluded.draft_order_index,
    draft_json = excluded.draft_json,
    updated_at = CURRENT_TIMESTAMP
`);

const upsertPublishedItemStmt = db.prepare(`
  INSERT INTO content_items (
    locale,
    section_id,
    item_id,
    item_type,
    published_order_index,
    published_json,
    updated_at
  )
  VALUES (
    @locale,
    @sectionId,
    @itemId,
    @itemType,
    @orderIndex,
    @itemJson,
    CURRENT_TIMESTAMP
  )
  ON CONFLICT(locale, section_id, item_id) DO UPDATE SET
    item_type = excluded.item_type,
    published_order_index = excluded.published_order_index,
    published_json = excluded.published_json,
    updated_at = CURRENT_TIMESTAMP
`);

const clearDraftItemStmt = db.prepare(`
  UPDATE content_items
  SET draft_order_index = NULL,
      draft_json = NULL,
      updated_at = CURRENT_TIMESTAMP
  WHERE locale = @locale
    AND section_id = @sectionId
    AND item_id = @itemId
`);

const clearPublishedItemStmt = db.prepare(`
  UPDATE content_items
  SET published_order_index = NULL,
      published_json = NULL,
      updated_at = CURRENT_TIMESTAMP
  WHERE locale = @locale
    AND section_id = @sectionId
    AND item_id = @itemId
`);

const deleteEmptyItemStmt = db.prepare(`
  DELETE FROM content_items
  WHERE locale = @locale
    AND section_id = @sectionId
    AND item_id = @itemId
    AND draft_order_index IS NULL
    AND published_order_index IS NULL
    AND draft_json IS NULL
    AND published_json IS NULL
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

function normalizeReviewItem(item, index) {
  const source = item && typeof item === 'object' ? item : {};

  return {
    id:
      typeof source.id === 'string' && source.id.trim()
        ? source.id
        : `review-${index + 1}`,
    quote: typeof source.quote === 'string' ? source.quote : '',
    author: typeof source.author === 'string' ? source.author : '',
    role: typeof source.role === 'string' ? source.role : '',
    avatar: typeof source.avatar === 'string' ? source.avatar : ''
  };
}

function getNormalizedItemId(sectionType, item, index) {
  if (item && typeof item.id === 'string' && item.id.trim()) {
    return item.id;
  }

  return `${sectionType}-item-${index + 1}`;
}

function splitPageContent(page, locale) {
  const sections = [];
  const items = [];
  const inputSections = Array.isArray(page?.sections) ? page.sections : [];

  inputSections.forEach((section, index) => {
    const sourceSection = section && typeof section === 'object' ? section : {};
    const sectionType = typeof sourceSection.type === 'string' ? sourceSection.type : 'hero';
    const sectionId =
      typeof sourceSection.id === 'string' && sourceSection.id.trim()
        ? sourceSection.id
        : `${sectionType}-${index + 1}`;
    const sourceProps =
      sourceSection.props && typeof sourceSection.props === 'object' ? sourceSection.props : {};
    const orderIndex =
      Number.isInteger(sourceSection.order) && sourceSection.order > 0 ? sourceSection.order : index + 1;
    const nextSection = {
      locale,
      sectionId,
      type: sectionType,
      orderIndex,
      propsJson: ''
    };

    if (COLLECTION_SECTION_TYPES.has(sectionType)) {
      const sectionItems = Array.isArray(sourceProps.items) ? sourceProps.items : [];
      const propsWithoutItems = { ...sourceProps };
      delete propsWithoutItems.items;

      nextSection.propsJson = JSON.stringify(propsWithoutItems);

      sectionItems.forEach((item, itemIndex) => {
        const normalizedItem =
          sectionType === 'reviews' ? normalizeReviewItem(item, itemIndex) : item && typeof item === 'object' ? item : {};
        items.push({
          locale,
          sectionId,
          itemId: getNormalizedItemId(sectionType, normalizedItem, itemIndex),
          itemType: sectionType,
          orderIndex: itemIndex + 1,
          itemJson: JSON.stringify(normalizedItem)
        });
      });
    } else {
      nextSection.propsJson = JSON.stringify(sourceProps);
    }

    sections.push(nextSection);
  });

  return {
    pageId: typeof page?.id === 'string' ? page.id : 'home',
    locale,
    sections,
    items
  };
}

function buildPageFromNormalized(locale, kind, sectionRows, itemRows) {
  const orderKey = kind === 'draft' ? 'draft_order_index' : 'published_order_index';
  const propsKey = kind === 'draft' ? 'draft_props_json' : 'published_props_json';
  const itemJsonKey = kind === 'draft' ? 'draft_json' : 'published_json';

  const sections = sectionRows
    .filter((row) => row[orderKey] !== null && row[propsKey] !== null)
    .sort((left, right) => left[orderKey] - right[orderKey])
    .map((row) => {
      const props = parseJsonOrNull(row[propsKey]) ?? {};

      if (COLLECTION_SECTION_TYPES.has(row.type)) {
        const items = itemRows
          .filter(
            (itemRow) =>
              itemRow.section_id === row.section_id &&
              itemRow[orderKey] !== null &&
              itemRow[itemJsonKey] !== null
          )
          .sort((left, right) => left[orderKey] - right[orderKey])
          .map((itemRow) => parseJsonOrNull(itemRow[itemJsonKey]))
          .filter(Boolean);

        return {
          id: row.section_id,
          type: row.type,
          order: row[orderKey],
          props: {
            ...props,
            items
          }
        };
      }

      return {
        id: row.section_id,
        type: row.type,
        order: row[orderKey],
        props
      };
    });

  if (sections.length === 0) {
    return null;
  }

  return {
    id: 'home',
    locale,
    sections
  };
}

function cleanupSectionRow(locale, sectionId) {
  deleteEmptySectionStmt.run({ locale, sectionId });
}

function cleanupItemRow(locale, sectionId, itemId) {
  deleteEmptyItemStmt.run({ locale, sectionId, itemId });
}

function persistNormalizedPage(locale, page, kind) {
  const upsertSectionStmt = kind === 'draft' ? upsertDraftSectionStmt : upsertPublishedSectionStmt;
  const clearSectionStmt = kind === 'draft' ? clearDraftSectionStmt : clearPublishedSectionStmt;
  const upsertItemStmt = kind === 'draft' ? upsertDraftItemStmt : upsertPublishedItemStmt;
  const clearItemStmt = kind === 'draft' ? clearDraftItemStmt : clearPublishedItemStmt;
  const orderKey = kind === 'draft' ? 'draft_order_index' : 'published_order_index';
  const propsKey = kind === 'draft' ? 'draft_props_json' : 'published_props_json';
  const itemJsonKey = kind === 'draft' ? 'draft_json' : 'published_json';

  const normalized = splitPageContent(page, locale);
  const existingSections = getSectionsByLocaleStmt.all(locale);
  const existingItems = getItemsByLocaleStmt.all(locale);
  const incomingSectionIds = new Set();
  const incomingItemKeys = new Set();

  normalized.sections.forEach((section) => {
    incomingSectionIds.add(section.sectionId);
    const existing = existingSections.find((entry) => entry.section_id === section.sectionId);
    const isChanged =
      !existing ||
      existing.type !== section.type ||
      existing[orderKey] !== section.orderIndex ||
      existing[propsKey] !== section.propsJson;

    if (isChanged) {
      upsertSectionStmt.run(section);
    }
  });

  existingSections.forEach((section) => {
    if (!incomingSectionIds.has(section.section_id) && section[orderKey] !== null) {
      clearSectionStmt.run({
        locale,
        sectionId: section.section_id
      });
      cleanupSectionRow(locale, section.section_id);
    }
  });

  normalized.items.forEach((item) => {
    const key = `${item.sectionId}::${item.itemId}`;
    incomingItemKeys.add(key);

    const existing = existingItems.find(
      (entry) => entry.section_id === item.sectionId && entry.item_id === item.itemId
    );
    const isChanged =
      !existing ||
      existing.item_type !== item.itemType ||
      existing[orderKey] !== item.orderIndex ||
      existing[itemJsonKey] !== item.itemJson;

    if (isChanged) {
      upsertItemStmt.run(item);
    }
  });

  existingItems.forEach((item) => {
    const key = `${item.section_id}::${item.item_id}`;
    if (!incomingItemKeys.has(key) && item[orderKey] !== null) {
      clearItemStmt.run({
        locale,
        sectionId: item.section_id,
        itemId: item.item_id
      });
      cleanupItemRow(locale, item.section_id, item.item_id);
    }
  });
}

const persistNormalizedPageTx = db.transaction((locale, page, kind) => {
  persistNormalizedPage(locale, page, kind);
});

const publishNormalizedPageTx = db.transaction((locale, page) => {
  persistNormalizedPage(locale, page, 'draft');
  persistNormalizedPage(locale, page, 'published');
});

function readLegacyLocaleContent(locale) {
  const row = getLegacyByLocaleStmt.get(locale);
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

function ensureLocaleMigrated(locale) {
  if (hasNormalizedContentStmt.get(locale)) {
    return;
  }

  const legacy = readLegacyLocaleContent(locale);
  if (!legacy.draft && !legacy.published) {
    return;
  }

  const migrateTx = db.transaction(() => {
    if (legacy.draft) {
      persistNormalizedPage(locale, legacy.draft, 'draft');
    }

    if (legacy.published) {
      persistNormalizedPage(locale, legacy.published, 'published');
    }
  });

  migrateTx();
}

function readLocaleContent(locale) {
  ensureLocaleMigrated(locale);

  const sections = getSectionsByLocaleStmt.all(locale);
  const items = getItemsByLocaleStmt.all(locale);

  if (sections.length === 0) {
    return readLegacyLocaleContent(locale);
  }

  return {
    locale,
    draft: buildPageFromNormalized(locale, 'draft', sections, items),
    published: buildPageFromNormalized(locale, 'published', sections, items),
    updatedAt: new Date().toISOString()
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

  persistNormalizedPageTx(locale, page, 'draft');
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

  publishNormalizedPageTx(locale, page);
  res.json(readLocaleContent(locale));
});

app.listen(PORT, () => {
  process.stdout.write(`API server is running on http://localhost:${PORT}\n`);
});
