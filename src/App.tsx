import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

type Locale = 'en' | 'ru';

type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
};

type Review = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

type Work = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  website?: string;
  gallery: string[];
};

type HeroProps = {
  introLead: string;
  introConnector: string;
  name: string;
  roles: string[];
  based: string;
  hireMe: string;
  accentImage: string;
  contactEmail: string;
};

type WorksProps = {
  title: string;
  viewAll: string;
  items: Work[];
};

type ServicesProps = {
  title: string;
  items: Service[];
};

type ReviewsProps = {
  title: string;
  items: Review[];
};

type CtaProps = {
  line1: string;
  line2: string;
  button: string;
  email: string;
};

type SectionType = 'hero' | 'works' | 'services' | 'reviews' | 'cta';

type SectionBase<TType extends SectionType, TProps> = {
  id: string;
  type: TType;
  order: number;
  props: TProps;
};

type HeroSection = SectionBase<'hero', HeroProps>;
type WorksSection = SectionBase<'works', WorksProps>;
type ServicesSection = SectionBase<'services', ServicesProps>;
type ReviewsSection = SectionBase<'reviews', ReviewsProps>;
type CtaSection = SectionBase<'cta', CtaProps>;

type PageSection = HeroSection | WorksSection | ServicesSection | ReviewsSection | CtaSection;

type PageData = {
  id: string;
  locale: Locale;
  sections: PageSection[];
};

type Translation = {
  nav: {
    work: string;
    services: string;
    reviews: string;
    resume: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  project: {
    back: string;
    backToHome: string;
  };
  footer: {
    signature: string;
    licenses: string;
  };
  defaults: {
    hero: HeroProps;
    works: WorksProps;
    services: ServicesProps;
    reviews: ReviewsProps;
    cta: CtaProps;
  };
};

const DEFAULT_REVIEW_AVATAR = '/assets/avatar.png';

const translations: Record<Locale, Translation> = {
  en: {
    nav: {
      work: 'Works',
      services: 'Services',
      reviews: 'Reviews',
      resume: 'Resume',
      contact: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    },
    project: {
      back: 'Back to works',
      backToHome: 'Back to home'
    },
    footer: {
      signature: 'Islam Gainullin. Designer & Developer',
      licenses: 'Licenses'
    },
    defaults: {
      hero: {
        introLead: 'Hi,',
        introConnector: "I'm",
        name: 'Islam',
        roles: ['Digital Designer', 'Web Developer'],
        based: 'Based in Kazan',
        hireMe: 'Hire Me',
        accentImage: '/assets/hero-accent.png',
        contactEmail: 'walkerino.web@gmail.com'
      },
      works: {
        title: 'Works',
        viewAll: 'View All',
        items: []
      },
      services: {
        title: 'Services',
        items: [
          {
            id: 'design',
            index: '01',
            title: 'Design',
            description:
              'UI/UX and visual design for products, websites, and digital experiences with clear conversion goals.'
          },
          {
            id: 'development',
            index: '02',
            title: 'Development',
            description:
              'High-performance front-end implementation in React with clean architecture, responsive behavior, and SEO basics.'
          },
          {
            id: 'branding',
            index: '03',
            title: 'Branding',
            description:
              'Identity systems, brand direction, and visual consistency across landing pages, social media, and products.'
          }
        ]
      },
      reviews: {
        title: 'Reviews',
        items: [
          {
            quote: 'Islam delivered everything on time and translated business goals into a clean product experience.',
            author: 'Jordan Smith',
            role: 'CEO, Startup',
            avatar: DEFAULT_REVIEW_AVATAR
          },
          {
            quote: 'Strong designer-developer mindset. We launched faster because both design and code quality were high.',
            author: 'Anna Petrova',
            role: 'Product Lead',
            avatar: DEFAULT_REVIEW_AVATAR
          },
          {
            quote: 'Clear communication, reliable process, and very accurate implementation from Figma to production.',
            author: 'Victor Lee',
            role: 'CTO, Agency',
            avatar: DEFAULT_REVIEW_AVATAR
          },
          {
            quote: 'The portfolio redesign increased user engagement and finally matched our premium brand perception.',
            author: 'Amelia Brown',
            role: 'Marketing Director',
            avatar: DEFAULT_REVIEW_AVATAR
          }
        ]
      },
      cta: {
        line1: "Let's create",
        line2: 'something together',
        button: 'Book a Call',
        email: 'walkerino.web@gmail.com'
      }
    }
  },
  ru: {
    nav: {
      work: 'Работы',
      services: 'Услуги',
      reviews: 'Отзывы',
      resume: 'Резюме',
      contact: 'Контакты',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню'
    },
    project: {
      back: 'Назад к работам',
      backToHome: 'На главную'
    },
    footer: {
      signature: 'Islam Gainullin. Designer & Developer',
      licenses: ''
    },
    defaults: {
      hero: {
        introLead: 'Йо,',
        introConnector: 'я',
        name: 'Ислам',
        roles: ['Диджитал дизайнер', 'Веб-разработчик'],
        based: 'Из Москвы',
        hireMe: 'Газ работать!',
        accentImage: '/assets/hero-accent.png',
        contactEmail: 'walkerino.web@gmail.com'
      },
      works: {
        title: 'Работы',
        viewAll: 'Смотреть все',
        items: []
      },
      services: {
        title: 'Услуги',
        items: [
          {
            id: 'design',
            index: '01',
            title: 'Дизайн',
            description:
              'UI/UX и визуальный дизайн для продуктов, сайтов и цифровых сервисов с фокусом на конверсию.'
          },
          {
            id: 'development',
            index: '02',
            title: 'Разработка',
            description:
              'Быстрая и чистая front-end разработка на React: адаптивность, структура и готовность к росту проекта.'
          },
          {
            id: 'branding',
            index: '03',
            title: 'Брендинг',
            description:
              'Айдентика, бренд-направление и единая визуальная система для сайтов, соцсетей и digital-продуктов.'
          }
        ]
      },
      reviews: {
        title: 'Отзывы',
        items: [
          {
            quote: 'Ислам выполнил задачу в срок и отлично перевел бизнес-цели в понятный пользовательский опыт.',
            author: 'Jordan Smith',
            role: 'CEO, Startup',
            avatar: DEFAULT_REVIEW_AVATAR
          },
          {
            quote: 'Сильный подход дизайнера и разработчика одновременно. Запуск прошел быстрее ожидаемого.',
            author: 'Анна Петрова',
            role: 'Product Lead',
            avatar: DEFAULT_REVIEW_AVATAR
          },
          {
            quote: 'Отличная коммуникация, прозрачный процесс и очень точная реализация из Figma в продакшн.',
            author: 'Victor Lee',
            role: 'CTO, Agency',
            avatar: DEFAULT_REVIEW_AVATAR
          },
          {
            quote: 'После редизайна вовлеченность выросла, и сайт наконец стал выглядеть как премиальный продукт.',
            author: 'Амелия Браун',
            role: 'Marketing Director',
            avatar: DEFAULT_REVIEW_AVATAR
          }
        ]
      },
      cta: {
        line1: 'Давайте создадим',
        line2: 'что-то вместе',
        button: 'Созвониться',
        email: 'walkerino.web@gmail.com'
      }
    }
  }
};

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/bimbiriim' },
  { label: 'Dprofile', href: 'https://dprofile.ru/bimbiriim' },
  { label: 'Telegram', href: 'https://t.me/bimbiriim' }
];

const SECTION_CHOICES: Array<{ type: SectionType; label: string }> = [
  { type: 'hero', label: 'Hero' },
  { type: 'works', label: 'Works' },
  { type: 'services', label: 'Services' },
  { type: 'reviews', label: 'Reviews' },
  { type: 'cta', label: 'CTA' }
];

const SECTION_ANCHORS: Partial<Record<SectionType, string>> = {
  works: 'works',
  services: 'services',
  reviews: 'reviews',
  cta: 'contact'
};

const ADMIN_AUTH_STORAGE_KEY = 'inline-admin-auth';
const DEFAULT_ADMIN_PASSWORD = 'bimbiriim-admin';
const INITIAL_PRELOADER_MAX_WAIT_MS = 1800;
const VIDEO_STORAGE_MAX_BYTES = 8 * 1024 * 1024;
const MAIN_PAGE_WORKS_LIMIT = 6;
const SUPPORTED_LOCALES: Locale[] = ['en', 'ru'];
const REVIEWS_MOBILE_MEDIA_QUERY = '(max-width: 980px)';
const APP_BASE_PATH = (() => {
  const raw = (import.meta.env.BASE_URL ?? '/').trim();
  if (!raw || raw === '/') {
    return '';
  }

  return `/${raw.replace(/^\/+|\/+$/g, '')}`;
})();
const STATIC_CONTENT_PATH = `${APP_BASE_PATH || ''}/content/site-content.json`;
const LOCAL_CONTENT_SAVE_PATH = '/__admin/content';

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function buildInitialPages(): Record<Locale, PageData> {
  return {
    en: buildDefaultPage('en'),
    ru: buildDefaultPage('ru')
  };
}

type ContentSnapshot = {
  draft: PageData | null;
  published: PageData | null;
};

type ContentBundle = Partial<Record<Locale, Partial<ContentSnapshot>>>;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}

function normalizeServerPage(page: PageData | null, locale: Locale): PageData {
  if (!page || !Array.isArray(page.sections)) {
    return buildDefaultPage(locale);
  }

  const migrated = migrateLegacyPageData(
    {
      ...page,
      locale,
      id: typeof page.id === 'string' ? page.id : 'home'
    },
    locale
  );

  return {
    ...migrated,
    sections: normalizeSectionOrder(migrated.sections)
  };
}

function withBasePath(path: string): string {
  if (!path.startsWith('/')) {
    return path;
  }

  if (!APP_BASE_PATH) {
    return path;
  }

  if (path === APP_BASE_PATH || path.startsWith(`${APP_BASE_PATH}/`)) {
    return path;
  }

  return `${APP_BASE_PATH}${path}`;
}

function stripBasePath(path: string): string {
  if (!APP_BASE_PATH) {
    return path;
  }

  if (path === APP_BASE_PATH) {
    return '/';
  }

  if (path.startsWith(`${APP_BASE_PATH}/`)) {
    return path.slice(APP_BASE_PATH.length) || '/';
  }

  return path;
}

function resolveContentPath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (
    /^(?:https?:|mailto:|tel:|data:|blob:)/i.test(trimmed) ||
    trimmed.startsWith('//')
  ) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    return withBasePath(trimmed);
  }

  return trimmed;
}

function normalizeContentBundle(bundle: unknown): {
  draftPages: Record<Locale, PageData>;
  publishedPages: Record<Locale, PageData>;
} {
  const draftPages = buildInitialPages();
  const publishedPages = buildInitialPages();
  const unwrapped =
    bundle &&
    typeof bundle === 'object' &&
    'content' in (bundle as Record<string, unknown>) &&
    (bundle as { content?: unknown }).content
      ? (bundle as { content: unknown }).content
      : bundle;
  const source =
    unwrapped && typeof unwrapped === 'object'
      ? (unwrapped as Partial<Record<Locale, unknown>>)
      : {};

  SUPPORTED_LOCALES.forEach((supportedLocale) => {
    const rawEntry = source[supportedLocale];
    const entry =
      rawEntry && typeof rawEntry === 'object' ? (rawEntry as Partial<ContentSnapshot>) : {};

    const publishedCandidate = entry.published ?? entry.draft ?? null;
    const draftCandidate = entry.draft ?? entry.published ?? null;

    publishedPages[supportedLocale] = normalizeServerPage(
      publishedCandidate as PageData | null,
      supportedLocale
    );
    draftPages[supportedLocale] = normalizeServerPage(
      draftCandidate as PageData | null,
      supportedLocale
    );
  });

  return { draftPages, publishedPages };
}

function buildContentBundle(
  draftPages: Record<Locale, PageData>,
  publishedPages: Record<Locale, PageData>
): ContentBundle {
  const payload: ContentBundle = {};

  SUPPORTED_LOCALES.forEach((supportedLocale) => {
    payload[supportedLocale] = {
      draft: cloneDeep(draftPages[supportedLocale]),
      published: cloneDeep(publishedPages[supportedLocale])
    };
  });

  return payload;
}

async function fetchPublishedContentBundle() {
  let response: Response;
  try {
    response = await fetch(STATIC_CONTENT_PATH, { cache: 'no-store' });
  } catch {
    throw new Error('Cannot load `public/content/site-content.json`.');
  }

  if (!response.ok) {
    throw new Error(`Cannot load published content (HTTP ${response.status}).`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error('Published content file is not valid JSON.');
  }

  return normalizeContentBundle((await response.json()) as unknown);
}

async function saveContentBundleToProject(payload: ContentBundle) {
  let response: Response;
  try {
    response = await fetch(LOCAL_CONTENT_SAVE_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch {
    throw new Error('Local file-save endpoint is unavailable.');
  }

  if (!response.ok) {
    let details = '';
    try {
      details = (await response.text()).trim();
    } catch {
      // Ignore response read failures and fall back to status only.
    }

    throw new Error(
      details ? `Local save failed (HTTP ${response.status}): ${details}` : `Local save failed (HTTP ${response.status}).`
    );
  }
}

function downloadJsonFile(fileName: string, payload: unknown) {
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read selected file'));
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read selected file'));
      }
    };
    reader.readAsDataURL(file);
  });
}

async function optimizeImageForStorage(file: File): Promise<string> {
  if (file.type.startsWith('video/') && file.size > VIDEO_STORAGE_MAX_BYTES) {
    throw new Error('Video file is too large. Use a URL to /assets/... instead.');
  }

  return readFileAsDataUrl(file);
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function collectProjectMedia(image: string, gallery: string[]): string[] {
  const ordered = [image, ...gallery];
  const seen = new Set<string>();

  return ordered.filter((src) => {
    if (typeof src !== 'string') {
      return false;
    }

    const normalized = src.trim();
    if (!normalized || seen.has(normalized)) {
      return false;
    }

    seen.add(normalized);
    return true;
  });
}

function isVideoSource(src: string): boolean {
  const normalized = src.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  if (normalized.startsWith('data:video/')) {
    return true;
  }

  const withoutQueryOrHash = normalized.split('#')[0]?.split('?')[0] ?? normalized;
  return /\.(mp4|webm|ogg|ogv|mov|m4v)$/i.test(withoutQueryOrHash);
}

const WORKS_ROUTE_BASE = '/works';

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '') || '/';
}

function parseAppRoute(pathname: string): { page: 'home' | 'works' | 'project'; projectId?: string } {
  const normalizedPath = normalizePathname(stripBasePath(pathname));
  if (normalizedPath === WORKS_ROUTE_BASE) {
    return { page: 'works' };
  }

  const projectPrefix = `${WORKS_ROUTE_BASE}/`;
  if (normalizedPath.startsWith(projectPrefix)) {
    const encodedProjectId = normalizedPath.slice(projectPrefix.length);
    if (!encodedProjectId) {
      return { page: 'works' };
    }

    try {
      return { page: 'project', projectId: decodeURIComponent(encodedProjectId) };
    } catch {
      return { page: 'works' };
    }
  }

  return { page: 'home' };
}

function buildProjectRoute(projectId: string): string {
  return `${WORKS_ROUTE_BASE}/${encodeURIComponent(projectId)}`;
}

function scrollWindowToTop(behavior: ScrollBehavior = 'auto') {
  if (typeof window === 'undefined') {
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior });
}

function normalizeSectionOrder(sections: PageSection[]): PageSection[] {
  return [...sections]
    .sort((a, b) => a.order - b.order)
    .map((section, index) => ({ ...section, order: index + 1 }));
}

function migrateLegacyPageData(page: PageData, locale: Locale): PageData {
  const defaultReviews = translations[locale].defaults.reviews;

  return {
    ...page,
    locale,
    sections: page.sections.map((section) => {
      if (section.type !== 'reviews') {
        return section;
      }

      const legacyProps = (section.props ?? {}) as ReviewsProps & {
        avatar?: unknown;
        items?: unknown;
        title?: unknown;
      };

      const fallbackAvatar =
        typeof legacyProps.avatar === 'string' && legacyProps.avatar.trim()
          ? legacyProps.avatar
          : DEFAULT_REVIEW_AVATAR;

      const migratedItems = Array.isArray(legacyProps.items)
        ? legacyProps.items.map((item) => {
            const review = (item ?? {}) as Partial<Review> & { avatar?: unknown };

            return {
              quote: typeof review.quote === 'string' ? review.quote : '',
              author: typeof review.author === 'string' ? review.author : '',
              role: typeof review.role === 'string' ? review.role : '',
              avatar:
                typeof review.avatar === 'string' && review.avatar.trim()
                  ? review.avatar
                  : fallbackAvatar
            };
          })
        : [];

      return {
        ...section,
        props: {
          title: typeof legacyProps.title === 'string' ? legacyProps.title : defaultReviews.title,
          items: migratedItems.length > 0 ? migratedItems : cloneDeep(defaultReviews.items)
        }
      };
    })
  };
}

function buildDefaultPage(locale: Locale): PageData {
  const defaults = translations[locale].defaults;

  return {
    id: 'home',
    locale,
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        order: 1,
        props: cloneDeep(defaults.hero)
      },
      {
        id: 'works-1',
        type: 'works',
        order: 2,
        props: cloneDeep(defaults.works)
      },
      {
        id: 'services-1',
        type: 'services',
        order: 3,
        props: cloneDeep(defaults.services)
      },
      {
        id: 'reviews-1',
        type: 'reviews',
        order: 4,
        props: cloneDeep(defaults.reviews)
      },
      {
        id: 'cta-1',
        type: 'cta',
        order: 5,
        props: cloneDeep(defaults.cta)
      }
    ]
  };
}

function createSectionFromType(type: SectionType, locale: Locale): PageSection {
  const defaults = translations[locale].defaults;

  if (type === 'hero') {
    return {
      id: createId('hero'),
      type,
      order: 0,
      props: cloneDeep(defaults.hero)
    };
  }

  if (type === 'works') {
    return {
      id: createId('works'),
      type,
      order: 0,
      props: cloneDeep(defaults.works)
    };
  }

  if (type === 'services') {
    return {
      id: createId('services'),
      type,
      order: 0,
      props: cloneDeep(defaults.services)
    };
  }

  if (type === 'reviews') {
    return {
      id: createId('reviews'),
      type,
      order: 0,
      props: cloneDeep(defaults.reviews)
    };
  }

  return {
    id: createId('cta'),
    type,
    order: 0,
    props: cloneDeep(defaults.cta)
  };
}

function useAdminMode() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === '1';
  });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [loginError, setLoginError] = useState('');

  const canAccessControls = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const params = new URLSearchParams(window.location.search);
    return isAuthenticated || params.get('admin') === '1';
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAdminMode(false);
    }
  }, [isAuthenticated]);

  const login = (password: string) => {
    const required = import.meta.env.VITE_ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;
    if (password !== required) {
      setLoginError('Invalid admin password');
      return false;
    }

    setLoginError('');
    setIsAuthenticated(true);
    setIsAdminMode(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, '1');
    }

    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setLoginError('');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    }
  };

  return {
    isAuthenticated,
    isAdminMode,
    canAccessControls,
    loginError,
    setIsAdminMode,
    login,
    logout
  };
}

function isMobileReviewsViewport(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(REVIEWS_MOBILE_MEDIA_QUERY).matches;
}

type EditableTextProps = {
  as?: 'span' | 'p' | 'strong' | 'h1' | 'h2' | 'h3' | 'div';
  value: string;
  className?: string;
  multiline?: boolean;
  adminMode: boolean;
  onChange: (value: string) => void;
};

function EditableText({
  as = 'span',
  value,
  className,
  multiline = false,
  adminMode,
  onChange
}: EditableTextProps) {
  const Tag = as;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!adminMode || multiline) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      (event.currentTarget as HTMLElement).blur();
    }
  };

  return (
    <Tag
      className={`${className ?? ''}${adminMode ? ' editable-text' : ''}`}
      contentEditable={adminMode}
      suppressContentEditableWarning={adminMode}
      onBlur={(event) =>
        onChange(
          multiline
            ? event.currentTarget.innerText.replace(/\r/g, '').replace(/\n$/, '')
            : event.currentTarget.textContent ?? ''
        )
      }
      onKeyDown={handleKeyDown}
    >
      {value}
    </Tag>
  );
}

type EditableImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  adminMode: boolean;
  onChange: (nextSrc: string) => void;
};

function buildLocalWebpVariant(src: string): string | null {
  if (isVideoSource(src)) {
    return null;
  }

  const normalizedSrc = stripBasePath(src);
  if (!normalizedSrc.startsWith('/assets/')) {
    return null;
  }

  const match = normalizedSrc.match(/^([^?#]+)\.(png|jpe?g)([?#].*)?$/i);
  if (!match) {
    return null;
  }

  return withBasePath(`${match[1]}.webp${match[3] ?? ''}`);
}

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  videoControls?: boolean;
};

function OptimizedImage({
  src,
  alt,
  className,
  loading,
  decoding = 'async',
  fetchPriority,
  videoControls = false
}: OptimizedImageProps) {
  const resolvedSrc = resolveContentPath(src);
  const isVideo = isVideoSource(resolvedSrc);
  const webpVariant = buildLocalWebpVariant(resolvedSrc);

  if (isVideo) {
    return (
      <video
        src={resolvedSrc}
        aria-label={alt}
        className={className}
        playsInline
        controls={videoControls}
        autoPlay={!videoControls}
        muted={!videoControls}
        loop={!videoControls}
        preload={loading === 'eager' ? 'auto' : 'metadata'}
      />
    );
  }

  return (
    <picture className="optimized-image">
      {webpVariant ? <source srcSet={webpVariant} type="image/webp" /> : null}
      <img
        src={resolvedSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

function EditableImage({
  src,
  alt,
  className,
  loading,
  decoding = 'async',
  fetchPriority,
  adminMode,
  onChange
}: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const nextSrc = await optimizeImageForStorage(file);
      onChange(nextSrc);
    } catch (error) {
      window.alert(getErrorMessage(error));
    } finally {
      event.target.value = '';
    }
  };

  const changeFromUrl = () => {
    const next = window.prompt('Paste media URL (image/video)', src);
    if (next && next.trim()) {
      onChange(next.trim());
    }
  };

  return (
    <span className={`editable-image${adminMode ? ' editable-image-admin' : ''}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
      {adminMode ? (
        <span className="editable-image-controls">
          <button type="button" onClick={() => inputRef.current?.click()}>
            Upload
          </button>
          <button type="button" onClick={changeFromUrl}>
            URL
          </button>
          <input ref={inputRef} type="file" accept="image/*,video/*" hidden onChange={handleFileChange} />
        </span>
      ) : null}
    </span>
  );
}

type AdminImageFieldProps = {
  label: string;
  value: string;
  onChange: (nextSrc: string) => void;
};

function AdminImageField({ label, value, onChange }: AdminImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const nextSrc = await optimizeImageForStorage(file);
      onChange(nextSrc);
    } catch (error) {
      window.alert(getErrorMessage(error));
    } finally {
      event.target.value = '';
    }
  };

  return (
    <label className="admin-image-field">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Media URL or data URI"
      />
      <button type="button" className="admin-chip" onClick={() => fileInputRef.current?.click()}>
        Upload media
      </button>
      <input ref={fileInputRef} type="file" accept="image/*,video/*" hidden onChange={handleFileChange} />
    </label>
  );
}

type AddSectionPickerProps = {
  className?: string;
  onAdd: (type: SectionType) => void;
  buttonLabel: string;
};

function AddSectionPicker({ className, onAdd, buttonLabel }: AddSectionPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`add-section-picker ${className ?? ''}`}>
      <button
        type="button"
        className="admin-chip"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((current) => !current);
        }}
      >
        {buttonLabel}
      </button>
      {open ? (
        <div className="add-section-menu" role="menu">
          {SECTION_CHOICES.map((choice) => (
            <button
              key={choice.type}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setOpen(false);
                onAdd(choice.type);
              }}
            >
              {choice.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type EditableSectionProps = {
  section: PageSection;
  isAdminMode: boolean;
  isSelected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelect: () => void;
  onAddAfter: (type: SectionType) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  children: React.ReactNode;
};

function EditableSection({
  section,
  isAdminMode,
  isSelected,
  canMoveUp,
  canMoveDown,
  onSelect,
  onAddAfter,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  children
}: EditableSectionProps) {
  return (
    <div
      className={`editable-section${isAdminMode ? ' editable-section-admin' : ''}${
        isSelected ? ' selected' : ''
      }`}
      data-section-type={section.type}
      onClick={() => {
        if (isAdminMode) {
          onSelect();
        }
      }}
    >
      {children}
      {isAdminMode ? (
        <div className="editable-section-controls" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="admin-chip" onClick={onSelect}>
            Edit
          </button>
          <AddSectionPicker buttonLabel="Add component" onAdd={onAddAfter} />
          <button type="button" className="admin-chip" onClick={onDuplicate}>
            Duplicate
          </button>
          <button type="button" className="admin-chip danger" onClick={onDelete}>
            Delete
          </button>
          <button type="button" className="admin-chip" onClick={onMoveUp} disabled={!canMoveUp}>
            Up
          </button>
          <button type="button" className="admin-chip" onClick={onMoveDown} disabled={!canMoveDown}>
            Down
          </button>
        </div>
      ) : null}
    </div>
  );
}

type AddSectionInsertionProps = {
  isAdminMode: boolean;
  onAdd: (type: SectionType) => void;
};

function AddSectionInsertion({ isAdminMode, onAdd }: AddSectionInsertionProps) {
  if (!isAdminMode) {
    return null;
  }

  return (
    <div className="add-section-insertion">
      <AddSectionPicker buttonLabel="+ Add section" onAdd={onAdd} />
    </div>
  );
}

function App() {
  const locale: Locale = 'ru';
  const [pages, setPages] = useState<Record<Locale, PageData>>(() => buildInitialPages());
  const [publishedPages, setPublishedPages] = useState<Record<Locale, PageData>>(() => buildInitialPages());
  const [savedPages, setSavedPages] = useState<Record<Locale, PageData>>(() => buildInitialPages());
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isWorksPageOpen, setIsWorksPageOpen] = useState(false);
  const [activeServiceBySection, setActiveServiceBySection] = useState<Record<string, string>>({});
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [publishMessage, setPublishMessage] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isMobileReviews, setIsMobileReviews] = useState(() => isMobileReviewsViewport());
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const admin = useAdminMode();
  const translation = translations[locale];
  const currentPage = admin.isAdminMode ? pages[locale] : publishedPages[locale];
  const editablePage = pages[locale];
  const savedPage = savedPages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia(REVIEWS_MOBILE_MEDIA_QUERY);
    const update = () => {
      setIsMobileReviews(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  const sections = useMemo(
    () => normalizeSectionOrder(currentPage.sections),
    [currentPage.sections]
  );

  const sectionsById = useMemo(() => {
    const map = new Map<string, PageSection>();
    sections.forEach((section) => {
      map.set(section.id, section);
    });

    return map;
  }, [sections]);

  const firstSectionIdsByType = useMemo(() => {
    const map: Partial<Record<SectionType, string>> = {};
    sections.forEach((section) => {
      if (!map[section.type]) {
        map[section.type] = section.id;
      }
    });

    return map;
  }, [sections]);

  const selectedSection = selectedSectionId ? sectionsById.get(selectedSectionId) ?? null : null;

  const firstHeroSection = sections.find((section): section is HeroSection => section.type === 'hero');
  const firstWorksSection = sections.find((section): section is WorksSection => section.type === 'works');

  const worksItems = firstWorksSection?.props.items ?? [];
  const worksTitle = firstWorksSection?.props.title ?? translation.nav.work;
  const activeProject = worksItems.find((item) => item.id === activeProjectId) ?? null;
  const isMainPage = !isWorksPageOpen && !activeProject;
  const hasScrolledHome = isMainPage && isScrolledDown;

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(editablePage) !== JSON.stringify(savedPage);
  }, [editablePage, savedPage]);

  useEffect(() => {
    let cancelled = false;
    const preloaderTimeoutId = window.setTimeout(() => {
      if (!cancelled) {
        setIsInitialLoading(false);
      }
    }, INITIAL_PRELOADER_MAX_WAIT_MS);

    const runInitialSync = async () => {
      setIsSyncing(true);
      try {
        const publishedBundle = await fetchPublishedContentBundle();
        const nextPublishedPages = publishedBundle.publishedPages;
        const nextDraftPages = publishedBundle.draftPages;

        if (cancelled) {
          return;
        }

        setPublishedPages(cloneDeep(nextPublishedPages));
        setPages(cloneDeep(nextDraftPages));
        setSavedPages(cloneDeep(nextDraftPages));
        setPublishMessage('Content loaded from public/content/site-content.json');
      } catch (error) {
        if (cancelled) {
          return;
        }

        const message = getErrorMessage(error);
        setPublishMessage(`Load failed: ${message}`);
        console.error('Initial content load failed', error);
      } finally {
        window.clearTimeout(preloaderTimeoutId);
        if (!cancelled) {
          setIsSyncing(false);
          setIsInitialLoading(false);
        }
      }
    };

    runInitialSync();

    return () => {
      cancelled = true;
      window.clearTimeout(preloaderTimeoutId);
    };
  }, []);

  const applyPageUpdate = (updater: (page: PageData) => PageData) => {
    setPages((previous) => {
      const updatedPage = updater(previous[locale]);
      const nextPage = {
        ...updatedPage,
        sections: normalizeSectionOrder(updatedPage.sections)
      };
      return {
        ...previous,
        [locale]: nextPage
      };
    });
  };

  const updateSection = (sectionId: string, updater: (section: PageSection) => PageSection) => {
    applyPageUpdate((page) => ({
      ...page,
      sections: page.sections.map((section) => (section.id === sectionId ? updater(section) : section))
    }));
  };

  const patchHero = (sectionId: string, updater: (props: HeroProps) => HeroProps) => {
    updateSection(sectionId, (section) => {
      if (section.type !== 'hero') {
        return section;
      }

      return {
        ...section,
        props: updater(section.props)
      };
    });
  };

  const patchWorks = (sectionId: string, updater: (props: WorksProps) => WorksProps) => {
    updateSection(sectionId, (section) => {
      if (section.type !== 'works') {
        return section;
      }

      return {
        ...section,
        props: updater(section.props)
      };
    });
  };

  const patchWorkItem = (
    sectionId: string,
    workId: string,
    updater: (work: Work) => Work
  ) => {
    patchWorks(sectionId, (props) => ({
      ...props,
      items: props.items.map((work) => (work.id === workId ? updater(work) : work))
    }));
  };

  const patchServices = (sectionId: string, updater: (props: ServicesProps) => ServicesProps) => {
    updateSection(sectionId, (section) => {
      if (section.type !== 'services') {
        return section;
      }

      return {
        ...section,
        props: updater(section.props)
      };
    });
  };

  const patchReviews = (sectionId: string, updater: (props: ReviewsProps) => ReviewsProps) => {
    updateSection(sectionId, (section) => {
      if (section.type !== 'reviews') {
        return section;
      }

      return {
        ...section,
        props: updater(section.props)
      };
    });
  };

  const patchCta = (sectionId: string, updater: (props: CtaProps) => CtaProps) => {
    updateSection(sectionId, (section) => {
      if (section.type !== 'cta') {
        return section;
      }

      return {
        ...section,
        props: updater(section.props)
      };
    });
  };

  const updateActiveProject = (updater: (project: Work) => Work) => {
    if (!activeProjectId || !firstWorksSection) {
      return;
    }

    patchWorkItem(firstWorksSection.id, activeProjectId, updater);
  };

  const addSectionAt = (insertIndex: number, type: SectionType) => {
    const section = createSectionFromType(type, locale);
    applyPageUpdate((page) => {
      const ordered = normalizeSectionOrder(page.sections);
      const next = [...ordered];
      next.splice(insertIndex, 0, section);
      return {
        ...page,
        sections: normalizeSectionOrder(next)
      };
    });
    setSelectedSectionId(section.id);
  };

  const duplicateSection = (sectionId: string) => {
    applyPageUpdate((page) => {
      const ordered = normalizeSectionOrder(page.sections);
      const index = ordered.findIndex((section) => section.id === sectionId);
      if (index < 0) {
        return page;
      }

      const copy = cloneDeep(ordered[index]);
      copy.id = createId(copy.type);
      const next = [...ordered];
      next.splice(index + 1, 0, copy);
      return {
        ...page,
        sections: normalizeSectionOrder(next)
      };
    });
  };

  const deleteSection = (sectionId: string) => {
    applyPageUpdate((page) => {
      if (page.sections.length <= 1) {
        return page;
      }

      return {
        ...page,
        sections: normalizeSectionOrder(page.sections.filter((section) => section.id !== sectionId))
      };
    });

    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
    }
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    applyPageUpdate((page) => {
      const ordered = normalizeSectionOrder(page.sections);
      const index = ordered.findIndex((section) => section.id === sectionId);
      if (index < 0) {
        return page;
      }

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= ordered.length) {
        return page;
      }

      const next = [...ordered];
      const [picked] = next.splice(index, 1);
      next.splice(targetIndex, 0, picked);
      return {
        ...page,
        sections: normalizeSectionOrder(next)
      };
    });
  };

  const saveDraft = async () => {
    const pageToSave = cloneDeep(editablePage);
    setIsSyncing(true);
    try {
      const nextPages = cloneDeep(pages);
      nextPages[locale] = pageToSave;
      setPages(nextPages);
      setSavedPages(cloneDeep(nextPages));
      setPublishMessage('Draft saved in session');
    } catch (error) {
      setPublishMessage(`Save failed: ${getErrorMessage(error)}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const resetDraft = async () => {
    setIsSyncing(true);
    try {
      const nextDraftPages = cloneDeep(publishedPages);
      setPages(nextDraftPages);
      setSavedPages(cloneDeep(nextDraftPages));
      setSelectedSectionId(null);
      setPublishMessage('Draft reset to published content');
    } catch (error) {
      setPublishMessage(`Reset failed: ${getErrorMessage(error)}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const publishDraft = async () => {
    const pageToPublish = cloneDeep(editablePage);
    setIsSyncing(true);
    try {
      const nextDraftPages = cloneDeep(pages);
      const nextPublishedPages = cloneDeep(publishedPages);
      nextDraftPages[locale] = pageToPublish;
      nextPublishedPages[locale] = pageToPublish;

      setPages(nextDraftPages);
      setSavedPages(cloneDeep(nextDraftPages));
      setPublishedPages(nextPublishedPages);
      setPublishMessage(`Published locally at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      setPublishMessage(`Publish failed: ${getErrorMessage(error)}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const exportContent = async () => {
    setIsSyncing(true);
    try {
      const fileName = `site-content-${new Date().toISOString().slice(0, 10)}.json`;
      const payload = buildContentBundle(pages, publishedPages);
      try {
        await saveContentBundleToProject(payload);
        setPublishMessage('Saved to public/content/site-content.json');
      } catch (saveError) {
        downloadJsonFile(fileName, payload);
        setPublishMessage(
          `Exported ${fileName}. Auto-save unavailable (${getErrorMessage(saveError)}). Replace public/content/site-content.json`
        );
      }
    } catch (error) {
      setPublishMessage(`Export failed: ${getErrorMessage(error)}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImportContent = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as unknown;
      const normalized = normalizeContentBundle(parsed);
      setPublishedPages(cloneDeep(normalized.publishedPages));
      setPages(cloneDeep(normalized.draftPages));
      setSavedPages(cloneDeep(normalized.draftPages));
      setSelectedSectionId(null);
      setPublishMessage(`Imported ${file.name}. Use Export JSON to persist to public/content.`);
    } catch (error) {
      setPublishMessage(`Import failed: ${getErrorMessage(error)}`);
    } finally {
      event.target.value = '';
    }
  };

  useEffect(() => {
    if (selectedSectionId && !sectionsById.has(selectedSectionId)) {
      setSelectedSectionId(null);
    }
  }, [sectionsById, selectedSectionId]);

  useEffect(() => {
    if (!activeProjectId) {
      return;
    }

    const exists = worksItems.some((item) => item.id === activeProjectId);
    if (!exists) {
      setActiveProjectId(null);
    }
  }, [activeProjectId, worksItems]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.classList.toggle('menu-open', isMobileMenuOpen);
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const closeOnDesktop = () => {
      if (window.innerWidth > 980) {
        setIsMobileMenuOpen(false);
      }
    };

    closeOnDesktop();
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      setIsScrolledDown(window.scrollY > 180);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeProjectId, isWorksPageOpen]);

  useEffect(() => {
    if (activeProjectId || isWorksPageOpen) {
      scrollWindowToTop();
      return;
    }

    if (!window.location.hash) {
      scrollWindowToTop();
    }
  }, [activeProjectId, isWorksPageOpen]);

  useEffect(() => {
    if (!admin.isAdminMode || !isWorksPageOpen || activeProject || !firstWorksSection) {
      return;
    }

    if (selectedSectionId !== firstWorksSection.id) {
      setSelectedSectionId(firstWorksSection.id);
    }
  }, [
    admin.isAdminMode,
    isWorksPageOpen,
    activeProject,
    firstWorksSection,
    selectedSectionId
  ]);

  useEffect(() => {
    setRoleIndex(0);
  }, [locale, firstHeroSection?.id]);

  useEffect(() => {
    const roles = firstHeroSection?.props.roles ?? [];

    if (roles.length === 0) {
      setTypedRole('');
      return undefined;
    }

    if (admin.isAdminMode) {
      setTypedRole(roles[0]);
      return undefined;
    }

    const activeRole = roles[roleIndex % roles.length];
    let timerId: number;
    const typingSpeed = 80;
    const deleteSpeed = 50;
    const holdAfterTyping = 2400;
    const holdAfterDeleting = 200;

    const typeText = (characters: number) => {
      setTypedRole(activeRole.slice(0, characters));
      if (characters < activeRole.length) {
        timerId = window.setTimeout(() => typeText(characters + 1), typingSpeed);
      } else {
        timerId = window.setTimeout(() => deleteText(characters - 1), holdAfterTyping);
      }
    };

    const deleteText = (characters: number) => {
      setTypedRole(activeRole.slice(0, Math.max(0, characters)));
      if (characters > 0) {
        timerId = window.setTimeout(() => deleteText(characters - 1), deleteSpeed);
      } else {
        timerId = window.setTimeout(
          () => setRoleIndex((current) => (current + 1) % roles.length),
          holdAfterDeleting
        );
      }
    };

    typeText(1);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [admin.isAdminMode, firstHeroSection?.props.roles, roleIndex]);

  const updateBrowserUrl = (pathname: string, mode: 'push' | 'replace', hash = '') => {
    if (typeof window === 'undefined') {
      return;
    }

    const normalizedPath = normalizePathname(withBasePath(normalizePathname(pathname)));
    const search = window.location.search;
    const nextUrl = `${normalizedPath}${search}${hash}`;
    const currentUrl = `${normalizePathname(window.location.pathname)}${window.location.search}${
      window.location.hash
    }`;

    if (nextUrl === currentUrl) {
      return;
    }

    if (mode === 'replace') {
      window.history.replaceState({}, '', nextUrl);
      return;
    }

    window.history.pushState({}, '', nextUrl);
  };

  const openProject = (
    projectId: string,
    options?: { fromWorksPage?: boolean; historyMode?: 'push' | 'replace' | 'none' }
  ) => {
    const fromWorksPage = options?.fromWorksPage ?? isWorksPageOpen;
    const historyMode = options?.historyMode ?? 'push';

    setIsMobileMenuOpen(false);
    setIsWorksPageOpen(fromWorksPage);
    setActiveProjectId(projectId);

    if (admin.isAdminMode && fromWorksPage && firstWorksSection) {
      setSelectedSectionId(firstWorksSection.id);
    }

    if (historyMode !== 'none') {
      updateBrowserUrl(buildProjectRoute(projectId), historyMode);
    }
  };

  const openWorksPage = (options?: { historyMode?: 'push' | 'replace' | 'none'; shouldScroll?: boolean }) => {
    const historyMode = options?.historyMode ?? 'push';
    const shouldScroll = options?.shouldScroll ?? true;

    setIsMobileMenuOpen(false);
    setActiveProjectId(null);
    setIsWorksPageOpen(true);

    if (admin.isAdminMode && firstWorksSection) {
      setSelectedSectionId(firstWorksSection.id);
    }

    if (historyMode !== 'none') {
      updateBrowserUrl(WORKS_ROUTE_BASE, historyMode);
    }

    if (shouldScroll) {
      window.setTimeout(() => {
        document.getElementById('all-works')?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  const closeWorksPage = () => {
    setIsMobileMenuOpen(false);
    setActiveProjectId(null);
    setIsWorksPageOpen(false);
    updateBrowserUrl('/', 'push', '#works');
    window.setTimeout(() => {
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const openMainContent = (options?: {
    historyMode?: 'push' | 'replace' | 'none';
    hash?: string;
    shouldScroll?: boolean;
  }) => {
    const historyMode = options?.historyMode ?? 'push';
    const hash = options?.hash ?? '';
    const shouldScroll = options?.shouldScroll ?? false;

    setIsMobileMenuOpen(false);
    setActiveProjectId(null);
    setIsWorksPageOpen(false);

    if (historyMode !== 'none') {
      updateBrowserUrl('/', historyMode, hash);
    }

    if (hash && shouldScroll) {
      window.setTimeout(() => {
        document.getElementById(hash.replace(/^#/, ''))?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  const navigateToMainSection =
    (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      event.preventDefault();
      openMainContent({ hash: `#${sectionId}`, shouldScroll: true });
    };

  const closeProject = () => {
    setIsMobileMenuOpen(false);
    setActiveProjectId(null);
    if (isWorksPageOpen) {
      updateBrowserUrl(WORKS_ROUTE_BASE, 'replace');
      window.setTimeout(() => {
        document.getElementById('all-works')?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
      return;
    }

    updateBrowserUrl('/', 'replace', '#works');
    window.setTimeout(() => {
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const applyRouteFromLocation = () => {
      const route = parseAppRoute(window.location.pathname);

      setIsMobileMenuOpen(false);

      if (route.page === 'works') {
        setActiveProjectId(null);
        setIsWorksPageOpen(true);
        return;
      }

      if (route.page === 'project' && route.projectId) {
        const projectExists = worksItems.some((item) => item.id === route.projectId);
        if (projectExists) {
          setActiveProjectId(route.projectId);
          setIsWorksPageOpen(true);
          return;
        }

        setActiveProjectId(null);
        setIsWorksPageOpen(true);
        updateBrowserUrl(WORKS_ROUTE_BASE, 'replace');
        return;
      }

      setActiveProjectId(null);
      setIsWorksPageOpen(false);

      const hashTarget = window.location.hash.replace(/^#/, '');
      if (hashTarget) {
        window.setTimeout(() => {
          document.getElementById(hashTarget)?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    };

    applyRouteFromLocation();
    window.addEventListener('popstate', applyRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', applyRouteFromLocation);
    };
  }, [worksItems]);

  const adminLoginForm = admin.canAccessControls && !admin.isAuthenticated ? (
    <div className="admin-toolbar admin-login-bar">
      <strong>Admin access</strong>
      <input
        type="password"
        value={passwordInput}
        onChange={(event) => setPasswordInput(event.target.value)}
        placeholder="Password"
      />
      <button
        type="button"
        className="admin-chip"
        onClick={() => {
          const success = admin.login(passwordInput);
          if (success) {
            setPasswordInput('');
          }
        }}
      >
        Login
      </button>
      {admin.loginError ? <span className="admin-error">{admin.loginError}</span> : null}
    </div>
  ) : null;

  const adminToolbar = admin.canAccessControls && admin.isAuthenticated ? (
    <div className="admin-toolbar">
      <label className="admin-toggle">
        <input
          type="checkbox"
          checked={admin.isAdminMode}
          onChange={(event) => {
            admin.setIsAdminMode(event.target.checked);
            if (!event.target.checked) {
              setSelectedSectionId(null);
            }
          }}
        />
        <span>Admin Mode</span>
      </label>
      <button type="button" className="admin-chip" onClick={saveDraft} disabled={isSyncing}>
        Save changes
      </button>
      <button
        type="button"
        className="admin-chip"
        onClick={resetDraft}
        disabled={!hasUnsavedChanges || isSyncing}
      >
        Cancel / Reset draft
      </button>
      <button type="button" className="admin-chip primary" onClick={publishDraft} disabled={isSyncing}>
        Publish
      </button>
      <button type="button" className="admin-chip" onClick={exportContent} disabled={isSyncing}>
        Export JSON
      </button>
      <button type="button" className="admin-chip" onClick={() => importInputRef.current?.click()} disabled={isSyncing}>
        Import JSON
      </button>
      <input
        ref={importInputRef}
        type="file"
        accept="application/json"
        hidden
        onChange={handleImportContent}
      />
      <button
        type="button"
        className="admin-chip"
        onClick={() => {
          admin.logout();
          setSelectedSectionId(null);
        }}
      >
        Logout
      </button>
      <span className="admin-status">
        {isSyncing ? 'Syncing local content…' : publishMessage || (hasUnsavedChanges ? 'Unsaved changes' : 'Saved')}
      </span>
    </div>
  ) : null;

  const renderSection = (section: PageSection, index: number) => {
    const isSelected = selectedSectionId === section.id;
    const domId =
      firstSectionIdsByType[section.type] === section.id
        ? SECTION_ANCHORS[section.type]
        : undefined;

    if (section.type === 'hero') {
      const firstRole = section.props.roles[0] ?? '';
      const visibleRole = admin.isAdminMode ? firstRole : typedRole;

      return (
        <EditableSection
          section={section}
          isAdminMode={admin.isAdminMode}
          isSelected={isSelected}
          canMoveUp={index > 0}
          canMoveDown={index < sections.length - 1}
          onSelect={() => setSelectedSectionId(section.id)}
          onAddAfter={(type) => addSectionAt(index + 1, type)}
          onDuplicate={() => duplicateSection(section.id)}
          onDelete={() => deleteSection(section.id)}
          onMoveUp={() => moveSection(section.id, 'up')}
          onMoveDown={() => moveSection(section.id, 'down')}
        >
          <section className="hero section-dark" id={domId}>
            <div className="section-wrap hero-inner">
              <h1>
                <span className="hero-top-line">
                  <EditableText
                    className="hero-muted hero-lead"
                    as="span"
                    value={section.props.introLead}
                    adminMode={admin.isAdminMode}
                    onChange={(value) => patchHero(section.id, (props) => ({ ...props, introLead: value }))}
                  />
                  <span className="hero-photo" aria-hidden="true">
                    <EditableImage
                      src={section.props.accentImage}
                      alt=""
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      adminMode={admin.isAdminMode}
                      onChange={(nextSrc) => patchHero(section.id, (props) => ({ ...props, accentImage: nextSrc }))}
                    />
                  </span>
                  <EditableText
                    className="hero-muted hero-connector"
                    as="span"
                    value={section.props.introConnector}
                    adminMode={admin.isAdminMode}
                    onChange={(value) =>
                      patchHero(section.id, (props) => ({ ...props, introConnector: value }))
                    }
                  />
                  <EditableText
                    className="hero-strong hero-name"
                    as="span"
                    value={section.props.name}
                    adminMode={admin.isAdminMode}
                    onChange={(value) => patchHero(section.id, (props) => ({ ...props, name: value }))}
                  />
                </span>
                <span className="hero-role">
                  <EditableText
                    className="hero-role-text"
                    as="span"
                    value={visibleRole}
                    adminMode={admin.isAdminMode}
                    onChange={(value) =>
                      patchHero(section.id, (props) => ({
                        ...props,
                        roles: props.roles.length > 0 ? [value, ...props.roles.slice(1)] : [value]
                      }))
                    }
                  />
                  <span className="hero-caret" aria-hidden="true" />
                </span>
                <EditableText
                  className="hero-muted hero-based"
                  as="span"
                  value={section.props.based}
                  adminMode={admin.isAdminMode}
                  onChange={(value) => patchHero(section.id, (props) => ({ ...props, based: value }))}
                />
              </h1>
              <a
                className="btn btn-primary"
                href="https://t.me/bimbiriim"
                target="_blank"
                rel="noreferrer"
              >
                <EditableText
                  as="span"
                  value={section.props.hireMe}
                  adminMode={admin.isAdminMode}
                  onChange={(value) => patchHero(section.id, (props) => ({ ...props, hireMe: value }))}
                />
              </a>
            </div>
          </section>
        </EditableSection>
      );
    }

    if (section.type === 'works') {
      return (
        <EditableSection
          section={section}
          isAdminMode={admin.isAdminMode}
          isSelected={isSelected}
          canMoveUp={index > 0}
          canMoveDown={index < sections.length - 1}
          onSelect={() => setSelectedSectionId(section.id)}
          onAddAfter={(type) => addSectionAt(index + 1, type)}
          onDuplicate={() => duplicateSection(section.id)}
          onDelete={() => deleteSection(section.id)}
          onMoveUp={() => moveSection(section.id, 'up')}
          onMoveDown={() => moveSection(section.id, 'down')}
        >
          <section className="works section-light" id={domId}>
            <div className="section-wrap">
              <div className="section-head">
                <EditableText
                  as="h2"
                  value={section.props.title}
                  adminMode={admin.isAdminMode}
                  onChange={(value) => patchWorks(section.id, (props) => ({ ...props, title: value }))}
                />
                <button
                  type="button"
                  className="btn btn-outline subtle"
                  onClick={() => {
                    if (!admin.isAdminMode) {
                      openWorksPage();
                    }
                  }}
                >
                  <EditableText
                    as="span"
                    value={section.props.viewAll}
                    adminMode={admin.isAdminMode}
                    onChange={(value) =>
                      patchWorks(section.id, (props) => ({ ...props, viewAll: value }))
                    }
                  />
                </button>
              </div>

              <div className="works-grid">
                {section.props.items.slice(0, MAIN_PAGE_WORKS_LIMIT).map((item, itemIndex) => (
                  <button
                    className="work-card"
                    key={`${section.id}-${item.id}-${itemIndex}`}
                    type="button"
                    onClick={() => {
                      if (!admin.isAdminMode) {
                        openProject(item.id);
                      }
                    }}
                    aria-label={`Open ${item.title} project`}
                  >
                    <div className="work-image-wrap">
                      <EditableImage
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        adminMode={admin.isAdminMode}
                        onChange={(nextSrc) =>
                          patchWorks(section.id, (props) => ({
                            ...props,
                            items: props.items.map((work, indexInList) =>
                              indexInList === itemIndex ? { ...work, image: nextSrc } : work
                            )
                          }))
                        }
                      />
                    </div>
                    <EditableText
                      as="h3"
                      value={item.title}
                      adminMode={admin.isAdminMode}
                      onChange={(value) =>
                        patchWorks(section.id, (props) => ({
                          ...props,
                          items: props.items.map((work, indexInList) =>
                            indexInList === itemIndex ? { ...work, title: value } : work
                          )
                        }))
                      }
                    />
                    <EditableText
                      as="p"
                      value={item.category}
                      adminMode={admin.isAdminMode}
                      onChange={(value) =>
                        patchWorks(section.id, (props) => ({
                          ...props,
                          items: props.items.map((work, indexInList) =>
                            indexInList === itemIndex ? { ...work, category: value } : work
                          )
                        }))
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      );
    }

    if (section.type === 'services') {
      const activeService =
        activeServiceBySection[section.id] ?? section.props.items[0]?.id ?? '';

      return (
        <EditableSection
          section={section}
          isAdminMode={admin.isAdminMode}
          isSelected={isSelected}
          canMoveUp={index > 0}
          canMoveDown={index < sections.length - 1}
          onSelect={() => setSelectedSectionId(section.id)}
          onAddAfter={(type) => addSectionAt(index + 1, type)}
          onDuplicate={() => duplicateSection(section.id)}
          onDelete={() => deleteSection(section.id)}
          onMoveUp={() => moveSection(section.id, 'up')}
          onMoveDown={() => moveSection(section.id, 'down')}
        >
          <section className="services section-dark" id={domId}>
            <div className="section-wrap services-layout">
              <EditableText
                as="h2"
                value={section.props.title}
                adminMode={admin.isAdminMode}
                onChange={(value) => patchServices(section.id, (props) => ({ ...props, title: value }))}
              />
              <div className="services-stack" role="list">
                {section.props.items.map((service, serviceIndex) => (
                  <button
                    key={`${section.id}-${service.id}-${serviceIndex}`}
                    type="button"
                    role="listitem"
                    className={
                      service.id === activeService ? 'service-card active' : 'service-card'
                    }
                    onClick={() => {
                      if (!admin.isAdminMode) {
                        setActiveServiceBySection((previous) => ({
                          ...previous,
                          [section.id]: service.id
                        }));
                      }
                    }}
                  >
                    <EditableText
                      as="span"
                      className="service-index"
                      value={service.index}
                      adminMode={admin.isAdminMode}
                      onChange={(value) =>
                        patchServices(section.id, (props) => ({
                          ...props,
                          items: props.items.map((entry, indexInList) =>
                            indexInList === serviceIndex ? { ...entry, index: value } : entry
                          )
                        }))
                      }
                    />
                    <EditableText
                      as="strong"
                      value={service.title}
                      adminMode={admin.isAdminMode}
                      onChange={(value) =>
                        patchServices(section.id, (props) => ({
                          ...props,
                          items: props.items.map((entry, indexInList) =>
                            indexInList === serviceIndex ? { ...entry, title: value } : entry
                          )
                        }))
                      }
                    />
                    <EditableText
                      as="p"
                      value={service.description}
                      adminMode={admin.isAdminMode}
                      onChange={(value) =>
                        patchServices(section.id, (props) => ({
                          ...props,
                          items: props.items.map((entry, indexInList) =>
                            indexInList === serviceIndex ? { ...entry, description: value } : entry
                          )
                        }))
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      );
    }

    if (section.type === 'reviews') {
      const reviewTrack = isMobileReviews ? section.props.items : [...section.props.items, ...section.props.items];
      const marqueeClassName = `reviews-marquee${isMobileReviews ? ' manual' : ''}`;
      const trackClassName = `reviews-track${isMobileReviews ? ' manual' : ''}`;

      return (
        <EditableSection
          section={section}
          isAdminMode={admin.isAdminMode}
          isSelected={isSelected}
          canMoveUp={index > 0}
          canMoveDown={index < sections.length - 1}
          onSelect={() => setSelectedSectionId(section.id)}
          onAddAfter={(type) => addSectionAt(index + 1, type)}
          onDuplicate={() => duplicateSection(section.id)}
          onDelete={() => deleteSection(section.id)}
          onMoveUp={() => moveSection(section.id, 'up')}
          onMoveDown={() => moveSection(section.id, 'down')}
        >
          <section className="reviews section-dark" id={domId}>
            <div className="section-wrap">
              <EditableText
                as="h2"
                value={section.props.title}
                adminMode={admin.isAdminMode}
                onChange={(value) => patchReviews(section.id, (props) => ({ ...props, title: value }))}
              />
            </div>

            <div className={marqueeClassName} aria-label="Client reviews">
              <div className={trackClassName}>
                {reviewTrack.map((review, reviewIndex) => {
                  const sourceIndex = reviewIndex % section.props.items.length;

                  return (
                    <article className="review-card" key={`${section.id}-${review.author}-${reviewIndex}`}>
                      <EditableText
                        as="p"
                        className="review-quote"
                        value={`"${review.quote}"`}
                        adminMode={admin.isAdminMode}
                        multiline
                        onChange={(value) =>
                          patchReviews(section.id, (props) => ({
                            ...props,
                            items: props.items.map((item, indexInList) =>
                              indexInList === sourceIndex
                                ? {
                                    ...item,
                                    quote: value.replace(/^"/, '').replace(/"$/, '')
                                  }
                                : item
                            )
                          }))
                        }
                      />
                      <div className="review-author">
                        <EditableImage
                          src={review.avatar || DEFAULT_REVIEW_AVATAR}
                          alt={review.author}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          adminMode={admin.isAdminMode}
                          onChange={(nextSrc) =>
                            patchReviews(section.id, (props) => ({
                              ...props,
                              items: props.items.map((item, indexInList) =>
                                indexInList === sourceIndex ? { ...item, avatar: nextSrc } : item
                              )
                            }))
                          }
                        />
                        <div>
                          <EditableText
                            as="strong"
                            value={review.author}
                            adminMode={admin.isAdminMode}
                            onChange={(value) =>
                              patchReviews(section.id, (props) => ({
                                ...props,
                                items: props.items.map((item, indexInList) =>
                                  indexInList === sourceIndex ? { ...item, author: value } : item
                                )
                              }))
                            }
                          />
                          <EditableText
                            as="span"
                            value={review.role}
                            adminMode={admin.isAdminMode}
                            onChange={(value) =>
                              patchReviews(section.id, (props) => ({
                                ...props,
                                items: props.items.map((item, indexInList) =>
                                  indexInList === sourceIndex ? { ...item, role: value } : item
                                )
                              }))
                            }
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </EditableSection>
      );
    }

    return (
      <EditableSection
        section={section}
        isAdminMode={admin.isAdminMode}
        isSelected={isSelected}
        canMoveUp={index > 0}
        canMoveDown={index < sections.length - 1}
        onSelect={() => setSelectedSectionId(section.id)}
        onAddAfter={(type) => addSectionAt(index + 1, type)}
        onDuplicate={() => duplicateSection(section.id)}
        onDelete={() => deleteSection(section.id)}
        onMoveUp={() => moveSection(section.id, 'up')}
        onMoveDown={() => moveSection(section.id, 'down')}
      >
        <section className="cta section-light" id={domId}>
          <div className="section-wrap cta-inner">
            <h2>
              <EditableText
                as="span"
                value={section.props.line1}
                adminMode={admin.isAdminMode}
                onChange={(value) => patchCta(section.id, (props) => ({ ...props, line1: value }))}
              />
              <EditableText
                as="span"
                value={section.props.line2}
                adminMode={admin.isAdminMode}
                onChange={(value) => patchCta(section.id, (props) => ({ ...props, line2: value }))}
              />
            </h2>
            <a
              className="btn btn-primary"
              href="https://t.me/bimbiriim"
              target="_blank"
              rel="noreferrer"
            >
              <EditableText
                as="span"
                value={section.props.button}
                adminMode={admin.isAdminMode}
                onChange={(value) => patchCta(section.id, (props) => ({ ...props, button: value }))}
              />
            </a>
          </div>
        </section>
      </EditableSection>
    );
  };

  const renderSelectedSectionSettings = () => {
    if (!admin.isAdminMode || !selectedSection || activeProject) {
      return null;
    }

    if (selectedSection.type === 'hero') {
      return (
        <aside className="admin-drawer" aria-label="Section settings">
          <h3>Hero settings</h3>
          <label>
            Roles (one per line)
            <textarea
              value={selectedSection.props.roles.join('\n')}
              onChange={(event) =>
                patchHero(selectedSection.id, (props) => ({
                  ...props,
                  roles: event.target.value
                    .split('\n')
                    .map((entry) => entry.trim())
                    .filter(Boolean)
                }))
              }
            />
          </label>
          <label>
            Contact email
            <input
              value={selectedSection.props.contactEmail}
              onChange={(event) =>
                patchHero(selectedSection.id, (props) => ({
                  ...props,
                  contactEmail: event.target.value
                }))
              }
            />
          </label>
          <button type="button" className="admin-chip" onClick={() => setSelectedSectionId(null)}>
            Close
          </button>
        </aside>
      );
    }

    if (selectedSection.type === 'works') {
      return (
        <aside className="admin-drawer" aria-label="Section settings">
          <h3>Works settings</h3>
          <button
            type="button"
            className="admin-chip"
            onClick={() =>
              patchWorks(selectedSection.id, (props) => ({
                ...props,
                items: [
                  ...props.items,
                  {
                    id: createId('work'),
                    title: 'New project',
                    category: 'Category',
                    image: '/assets/work-1.png',
                    description: 'Project description',
                    website: '',
                    gallery: ['/assets/work-1.png']
                  }
                ]
              }))
            }
          >
            Add project
          </button>
          {selectedSection.props.items.map((work, index) => (
            <div className="drawer-group" key={`${work.id}-${index}`}>
              <strong>Project {index + 1}</strong>
              <input
                value={work.title}
                onChange={(event) =>
                  patchWorks(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, title: event.target.value } : item
                    )
                  }))
                }
                placeholder="Title"
              />
              <input
                value={work.category}
                onChange={(event) =>
                  patchWorks(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, category: event.target.value } : item
                    )
                  }))
                }
                placeholder="Category"
              />
              <textarea
                value={work.description}
                onChange={(event) =>
                  patchWorks(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, description: event.target.value } : item
                    )
                  }))
                }
                placeholder="Description"
              />
              <input
                value={work.website ?? ''}
                onChange={(event) =>
                  patchWorks(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index
                        ? {
                            ...item,
                            website: event.target.value || undefined
                          }
                        : item
                    )
                  }))
                }
                placeholder="Website URL"
              />
              <AdminImageField
                label="Cover media"
                value={work.image}
                onChange={(nextSrc) =>
                  patchWorkItem(selectedSection.id, work.id, (item) => ({
                    ...item,
                    image: nextSrc
                  }))
                }
              />
              <div className="drawer-subsection">
                <strong>Gallery media</strong>
                {work.gallery.map((galleryImage, galleryIndex) => (
                  <div className="drawer-inline" key={`${work.id}-gallery-${galleryIndex}`}>
                    <AdminImageField
                      label={`Media ${galleryIndex + 1}`}
                      value={galleryImage}
                      onChange={(nextSrc) =>
                        patchWorkItem(selectedSection.id, work.id, (item) => ({
                          ...item,
                          gallery: item.gallery.map((entry, entryIndex) =>
                            entryIndex === galleryIndex ? nextSrc : entry
                          )
                        }))
                      }
                    />
                    <button
                      type="button"
                      className="admin-chip danger"
                      onClick={() =>
                        patchWorkItem(selectedSection.id, work.id, (item) => ({
                          ...item,
                          gallery: item.gallery.filter((_, entryIndex) => entryIndex !== galleryIndex)
                        }))
                      }
                    >
                      Remove media
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="admin-chip"
                  onClick={() =>
                    patchWorkItem(selectedSection.id, work.id, (item) => ({
                      ...item,
                      gallery: [...item.gallery, item.image || '/assets/work-1.png']
                    }))
                  }
                >
                  Add gallery media
                </button>
              </div>
              <button
                type="button"
                className="admin-chip"
                onClick={() => openProject(work.id)}
              >
                Open project page editor
              </button>
              <button
                type="button"
                className="admin-chip danger"
                onClick={() =>
                  patchWorks(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.filter((_, itemIndex) => itemIndex !== index)
                  }))
                }
              >
                Remove project
              </button>
            </div>
          ))}
          <button type="button" className="admin-chip" onClick={() => setSelectedSectionId(null)}>
            Close
          </button>
        </aside>
      );
    }

    if (selectedSection.type === 'services') {
      return (
        <aside className="admin-drawer" aria-label="Section settings">
          <h3>Services settings</h3>
          <button
            type="button"
            className="admin-chip"
            onClick={() =>
              patchServices(selectedSection.id, (props) => ({
                ...props,
                items: [
                  ...props.items,
                  {
                    id: createId('service'),
                    index: `${props.items.length + 1}`.padStart(2, '0'),
                    title: 'New service',
                    description: 'Service description'
                  }
                ]
              }))
            }
          >
            Add service
          </button>
          {selectedSection.props.items.map((service, index) => (
            <div className="drawer-group" key={`${service.id}-${index}`}>
              <strong>Service {index + 1}</strong>
              <input
                value={service.index}
                onChange={(event) =>
                  patchServices(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, index: event.target.value } : item
                    )
                  }))
                }
                placeholder="Index"
              />
              <input
                value={service.title}
                onChange={(event) =>
                  patchServices(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, title: event.target.value } : item
                    )
                  }))
                }
                placeholder="Title"
              />
              <textarea
                value={service.description}
                onChange={(event) =>
                  patchServices(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, description: event.target.value } : item
                    )
                  }))
                }
                placeholder="Description"
              />
              <button
                type="button"
                className="admin-chip danger"
                onClick={() =>
                  patchServices(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.filter((_, itemIndex) => itemIndex !== index)
                  }))
                }
              >
                Remove service
              </button>
            </div>
          ))}
          <button type="button" className="admin-chip" onClick={() => setSelectedSectionId(null)}>
            Close
          </button>
        </aside>
      );
    }

    if (selectedSection.type === 'reviews') {
      return (
        <aside className="admin-drawer" aria-label="Section settings">
          <h3>Reviews settings</h3>
          <button
            type="button"
            className="admin-chip"
            onClick={() =>
              patchReviews(selectedSection.id, (props) => ({
                ...props,
                items: [
                  ...props.items,
                  {
                    quote: 'New review',
                    author: 'Client name',
                    role: 'Role',
                    avatar: DEFAULT_REVIEW_AVATAR
                  }
                ]
              }))
            }
          >
            Add review
          </button>
          {selectedSection.props.items.map((review, index) => (
            <div className="drawer-group" key={`${review.author}-${index}`}>
              <strong>Review {index + 1}</strong>
              <AdminImageField
                label="Avatar"
                value={review.avatar}
                onChange={(nextSrc) =>
                  patchReviews(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, avatar: nextSrc } : item
                    )
                  }))
                }
              />
              <textarea
                value={review.quote}
                onChange={(event) =>
                  patchReviews(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, quote: event.target.value } : item
                    )
                  }))
                }
                placeholder="Quote"
              />
              <input
                value={review.author}
                onChange={(event) =>
                  patchReviews(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, author: event.target.value } : item
                    )
                  }))
                }
                placeholder="Author"
              />
              <input
                value={review.role}
                onChange={(event) =>
                  patchReviews(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, role: event.target.value } : item
                    )
                  }))
                }
                placeholder="Role"
              />
              <button
                type="button"
                className="admin-chip danger"
                onClick={() =>
                  patchReviews(selectedSection.id, (props) => ({
                    ...props,
                    items: props.items.filter((_, itemIndex) => itemIndex !== index)
                  }))
                }
              >
                Remove review
              </button>
            </div>
          ))}
          <button type="button" className="admin-chip" onClick={() => setSelectedSectionId(null)}>
            Close
          </button>
        </aside>
      );
    }

    return (
      <aside className="admin-drawer" aria-label="Section settings">
        <h3>CTA settings</h3>
        <label>
          Email
          <input
            value={selectedSection.props.email}
            onChange={(event) =>
              patchCta(selectedSection.id, (props) => ({ ...props, email: event.target.value }))
            }
          />
        </label>
        <button type="button" className="admin-chip" onClick={() => setSelectedSectionId(null)}>
          Close
        </button>
      </aside>
    );
  };

  const renderProjectAdminSettings = () => {
    if (!admin.isAdminMode || !activeProject) {
      return null;
    }

    return (
      <aside className="admin-drawer project-page-admin-drawer" aria-label="Project settings">
        <h3>Project page settings</h3>
        <label>
          Title
          <input
            value={activeProject.title}
            onChange={(event) =>
              updateActiveProject((project) => ({ ...project, title: event.target.value }))
            }
          />
        </label>
        <label>
          Category
          <input
            value={activeProject.category}
            onChange={(event) =>
              updateActiveProject((project) => ({ ...project, category: event.target.value }))
            }
          />
        </label>
        <label>
          Description
          <textarea
            value={activeProject.description}
            onChange={(event) =>
              updateActiveProject((project) => ({ ...project, description: event.target.value }))
            }
          />
        </label>
        <label>
          Website URL
          <input
            value={activeProject.website ?? ''}
            onChange={(event) =>
              updateActiveProject((project) => ({
                ...project,
                website: event.target.value || undefined
              }))
            }
          />
        </label>
        <AdminImageField
          label="Cover media"
          value={activeProject.image}
          onChange={(nextSrc) => updateActiveProject((project) => ({ ...project, image: nextSrc }))}
        />
        <div className="drawer-subsection">
          <strong>Gallery media</strong>
          {activeProject.gallery.map((image, index) => (
            <div className="drawer-inline" key={`${activeProject.id}-project-gallery-${index}`}>
              <AdminImageField
                label={`Media ${index + 1}`}
                value={image}
                onChange={(nextSrc) =>
                  updateActiveProject((project) => ({
                    ...project,
                    gallery: project.gallery.map((entry, entryIndex) =>
                      entryIndex === index ? nextSrc : entry
                    )
                  }))
                }
              />
              <button
                type="button"
                className="admin-chip danger"
                onClick={() =>
                  updateActiveProject((project) => ({
                    ...project,
                    gallery: project.gallery.filter((_, entryIndex) => entryIndex !== index)
                  }))
                }
              >
                Remove media
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-chip"
            onClick={() =>
              updateActiveProject((project) => ({
                ...project,
                gallery: [...project.gallery, project.image || '/assets/work-1.png']
              }))
            }
          >
            Add gallery media
          </button>
        </div>
        <button type="button" className="admin-chip" onClick={closeProject}>
          Close project page
        </button>
      </aside>
    );
  };

  if (isInitialLoading) {
    return (
      <div className={`site-preloader locale-${locale}`} role="status" aria-live="polite" aria-busy="true">
        <span className="site-preloader-spinner" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`site locale-${locale}`} data-node-id="4003:55">
      {adminLoginForm}
      {adminToolbar}
      {renderSelectedSectionSettings()}
      {renderProjectAdminSettings()}

      <header className={`header${hasScrolledHome ? ' home-scrolled' : ''}`}>
        <div className="section-wrap header-inner">
          <a
            className="brand"
            href="#top"
            aria-label="Homepage"
            onClick={navigateToMainSection('top')}
          >
            <span className="brand-main">Islam Gainullin</span>
            <span className="brand-sub">aka. bimbiriim</span>
            <sup>TM</sup>
          </a>

          <button
            type="button"
            className={`menu-toggle${isMobileMenuOpen ? ' active' : ''}`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="main-navigation"
            aria-label={isMobileMenuOpen ? translation.nav.closeMenu : translation.nav.openMenu}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span className="menu-toggle-line" />
            <span className="menu-toggle-line" />
            <span className="menu-toggle-line" />
          </button>

          <div className={`header-menu${isMobileMenuOpen ? ' open' : ''}`}>
            <nav className="main-nav" id="main-navigation" aria-label="Main navigation">
              <a href="#works" onClick={navigateToMainSection('works')}>
                {translation.nav.work}
              </a>
              <a href="#services" onClick={navigateToMainSection('services')}>
                {translation.nav.services}
              </a>
              <a href="#reviews" onClick={navigateToMainSection('reviews')}>
                {translation.nav.reviews}
              </a>
              <a href="#contact" onClick={navigateToMainSection('contact')}>
                {translation.nav.contact}
              </a>
            </nav>

            <div className="header-actions">
              <a
                className="btn btn-light"
                href={resolveContentPath('/Islam_Gainullin_Resume.pdf')}
                target="_blank"
                rel="noreferrer"
                onClick={() => openMainContent()}
              >
                <span>{translation.nav.resume}</span>
                <img src={resolveContentPath('/assets/icon-download.svg')} alt="" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        {activeProject ? (
          <section className="project-page section-dark" id="project">
            <div className="section-wrap">
              <div className="project-controls">
                <button type="button" className="btn btn-outline subtle" onClick={closeProject}>
                  {translation.project.back}
                </button>
              </div>

              <div className="project-header">
                <h1 className="project-title">{activeProject.title}</h1>
                <p className="project-category">{activeProject.category}</p>
                {activeProject.website ? (
                  <a className="project-website" href={activeProject.website} target="_blank" rel="noreferrer">
                    {activeProject.website.replace(/^https?:\/\//, '')}
                  </a>
                ) : null}
                <p className="project-description">{activeProject.description}</p>
              </div>

              <div className="project-media-stack" aria-label="Project gallery">
                {collectProjectMedia(activeProject.image, activeProject.gallery).map((image, index) => (
                  <div className="project-media-item" key={`${image}-${index}`}>
                    <OptimizedImage
                      src={image}
                      alt={`${activeProject.title} media ${index + 1}`}
                      videoControls
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'low'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : isWorksPageOpen ? (
          <section className="works-page section-light" id="all-works">
            <div className="section-wrap">
              <div className="project-controls">
                <button type="button" className="btn btn-outline subtle" onClick={closeWorksPage}>
                  {translation.project.backToHome}
                </button>
              </div>

              <div className="section-head">
                <h2>{worksTitle}</h2>
              </div>

              <div className="works-grid" aria-label="All works">
                {worksItems.map((item, itemIndex) => (
                  <button
                    className="work-card"
                    key={`all-works-${item.id}-${itemIndex}`}
                    type="button"
                    onClick={() => openProject(item.id)}
                    aria-label={`Open ${item.title} project`}
                  >
                    <div className="work-image-wrap">
                      <OptimizedImage
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <>
            <AddSectionInsertion isAdminMode={admin.isAdminMode} onAdd={(type) => addSectionAt(0, type)} />
            {sections.map((section, index) => (
              <Fragment key={section.id}>
                {renderSection(section, index)}
                <AddSectionInsertion
                  isAdminMode={admin.isAdminMode}
                  onAdd={(type) => addSectionAt(index + 1, type)}
                />
              </Fragment>
            ))}
          </>
        )}
      </main>

      {isScrolledDown ? (
        <button
          type="button"
          className="scroll-top-button"
          aria-label="Scroll to top"
          onClick={() => scrollWindowToTop('smooth')}
        >
          ↑
        </button>
      ) : null}

      <footer className="footer section-light" data-node-id="4003:148">
        <div className="section-wrap">
          <img
            className="footer-line"
            src={resolveContentPath('/assets/footer-line.svg')}
            alt=""
            aria-hidden="true"
          />
          <div className="footer-nav">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
          <div className="footer-bottom">
            <p>{translation.footer.signature}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
