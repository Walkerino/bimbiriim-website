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
  };
  project: {
    back: string;
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
      contact: 'Contact'
    },
    project: {
      back: 'Back to works'
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
        items: [
          {
            id: 'pulse',
            title: 'Pulse App',
            category: 'Mobile App',
            image: '/assets/work-1.png',
            website: 'https://pulse.example.com',
            description:
              'A wellness tracking app that blends habit loops, daily insights, and calm UI to keep users consistent.',
            gallery: ['/assets/work-1.png', '/assets/work-4.png', '/assets/work-3.png']
          },
          {
            id: 'atelier',
            title: 'Atelier Studio',
            category: 'Brand Site',
            image: '/assets/work-4.png',
            website: 'https://atelier.example.com',
            description:
              'A bold portfolio site for a creative studio with editorial layouts, wide imagery, and clear CTAs.',
            gallery: ['/assets/work-4.png', '/assets/work-5.png', '/assets/work-1.png']
          },
          {
            id: 'drive',
            title: 'Drive Control',
            category: 'Dashboard',
            image: '/assets/work-3.png',
            description:
              'A control dashboard for a logistics company with real-time KPIs, alerts, and route management.',
            gallery: ['/assets/work-3.png', '/assets/work-1.png', '/assets/work-5.png']
          },
          {
            id: 'nova',
            title: 'Nova Commerce',
            category: 'E-commerce',
            image: '/assets/work-5.png',
            description:
              'A premium storefront with smooth product browsing, bold typography, and a focused checkout flow.',
            gallery: ['/assets/work-5.png', '/assets/work-4.png', '/assets/work-3.png']
          }
        ]
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
      contact: 'Контакты'
    },
    project: {
      back: 'Назад к работам'
    },
    footer: {
      signature: 'Islam Gainullin. Designer & Developer',
      licenses: 'Лицензии'
    },
    defaults: {
      hero: {
        introLead: 'Йо,',
        introConnector: 'я',
        name: 'Ислам',
        roles: ['Диджитал дизайнер', 'Веб-разработчик'],
        based: 'Из Казани',
        hireMe: 'Газ работать!',
        accentImage: '/assets/hero-accent.png',
        contactEmail: 'walkerino.web@gmail.com'
      },
      works: {
        title: 'Работы',
        viewAll: 'Смотреть все',
        items: [
          {
            id: 'pulse',
            title: 'Pulse App',
            category: 'Мобильное приложение',
            image: '/assets/work-1.png',
            website: 'https://pulse.example.com',
            description:
              'Трекер привычек и самочувствия с понятными инсайтами, спокойным интерфейсом и ежедневными ритуалами.',
            gallery: ['/assets/work-1.png', '/assets/work-4.png', '/assets/work-3.png']
          },
          {
            id: 'atelier',
            title: 'Atelier Studio',
            category: 'Сайт бренда',
            image: '/assets/work-4.png',
            website: 'https://atelier.example.com',
            description:
              'Портфолио-лендинг креативной студии с редакционными сетками, крупными визуалами и понятными CTA.',
            gallery: ['/assets/work-4.png', '/assets/work-5.png', '/assets/work-1.png']
          },
          {
            id: 'drive',
            title: 'Drive Control',
            category: 'Дашборд',
            image: '/assets/work-3.png',
            description:
              'Панель управления логистикой с актуальными KPI, тревогами и маршрутизацией в одном экране.',
            gallery: ['/assets/work-3.png', '/assets/work-1.png', '/assets/work-5.png']
          },
          {
            id: 'nova',
            title: 'Nova Commerce',
            category: 'E-commerce',
            image: '/assets/work-5.png',
            description:
              'Премиальный магазин с плавным каталогом, выразительной типографикой и фокусом на конверсии.',
            gallery: ['/assets/work-5.png', '/assets/work-4.png', '/assets/work-3.png']
          }
        ]
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
  { label: 'Behance', href: 'https://behance.net/bimbiriim' },
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
const API_BASE_PATH = '/api/content';
const IMAGE_STORAGE_TARGET_BYTES = 220 * 1024;
const IMAGE_MAX_DIMENSIONS = [1400, 1100, 900, 720, 560];
const IMAGE_QUALITY_LEVELS = [0.88, 0.8, 0.72, 0.64, 0.56];

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function buildInitialPages(): Record<Locale, PageData> {
  return {
    en: buildDefaultPage('en'),
    ru: buildDefaultPage('ru')
  };
}

type ServerContentResponse = {
  locale: Locale;
  draft: PageData | null;
  published: PageData | null;
  updatedAt: string | null;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}

async function requestJson<T>(input: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(input, init);
  } catch {
    throw new Error('API server is unreachable. Start backend with `npm run dev:server`.');
  }

  if (!response.ok) {
    const responseText = await response.text();
    let serverMessage = '';

    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      try {
        const payload = JSON.parse(responseText) as { error?: string };
        serverMessage = payload.error ?? '';
      } catch {
        serverMessage = '';
      }
    } else {
      serverMessage = responseText.trim();
    }

    const hasProxyRefusedConnection =
      response.status === 500 &&
      (/ECONNREFUSED/i.test(responseText) || /http proxy error/i.test(responseText));

    if (hasProxyRefusedConnection) {
      throw new Error('API server is unreachable. Start backend with `npm run dev:server`.');
    }

    throw new Error(serverMessage || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
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

async function fetchContentFromServer(locale: Locale): Promise<ServerContentResponse> {
  return requestJson<ServerContentResponse>(`${API_BASE_PATH}/${locale}`);
}

async function saveDraftToServer(locale: Locale, page: PageData): Promise<ServerContentResponse> {
  return requestJson<ServerContentResponse>(`${API_BASE_PATH}/${locale}/draft`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page })
  });
}

async function publishToServer(locale: Locale, page: PageData): Promise<ServerContentResponse> {
  return requestJson<ServerContentResponse>(`${API_BASE_PATH}/${locale}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page })
  });
}

function estimateDataUriBytes(dataUri: string): number {
  const commaIndex = dataUri.indexOf(',');
  if (commaIndex < 0) {
    return dataUri.length;
  }

  const payloadLength = dataUri.length - commaIndex - 1;
  return Math.floor((payloadLength * 3) / 4);
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

function loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to process selected image'));
    image.src = dataUrl;
  });
}

function renderScaledImageDataUrl(
  image: HTMLImageElement,
  maxDimension: number,
  quality: number
): string {
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    return image.src;
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/webp', quality);
}

async function optimizeImageForStorage(file: File): Promise<string> {
  const originalDataUrl = await readFileAsDataUrl(file);
  if (!file.type.startsWith('image/')) {
    return originalDataUrl;
  }

  let image: HTMLImageElement;
  try {
    image = await loadImageFromDataUrl(originalDataUrl);
  } catch {
    return originalDataUrl;
  }

  let bestDataUrl = originalDataUrl;
  let bestSize = estimateDataUriBytes(originalDataUrl);

  for (const maxDimension of IMAGE_MAX_DIMENSIONS) {
    for (const quality of IMAGE_QUALITY_LEVELS) {
      const candidate = renderScaledImageDataUrl(image, maxDimension, quality);
      const candidateSize = estimateDataUriBytes(candidate);

      if (candidateSize < bestSize) {
        bestDataUrl = candidate;
        bestSize = candidateSize;
      }

      if (candidateSize <= IMAGE_STORAGE_TARGET_BYTES) {
        return candidate;
      }
    }
  }

  return bestDataUrl;
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
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
  adminMode: boolean;
  onChange: (nextSrc: string) => void;
};

function EditableImage({ src, alt, className, loading, adminMode, onChange }: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const nextSrc = await optimizeImageForStorage(file);
      onChange(nextSrc);
    } catch {
      window.alert('Failed to process this image. Try another file.');
    } finally {
      event.target.value = '';
    }
  };

  const changeFromUrl = () => {
    const next = window.prompt('Paste image URL', src);
    if (next && next.trim()) {
      onChange(next.trim());
    }
  };

  return (
    <span className={`editable-image${adminMode ? ' editable-image-admin' : ''}`}>
      <img src={src} alt={alt} className={className} loading={loading} />
      {adminMode ? (
        <span className="editable-image-controls">
          <button type="button" onClick={() => inputRef.current?.click()}>
            Upload
          </button>
          <button type="button" onClick={changeFromUrl}>
            URL
          </button>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
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
    } catch {
      window.alert('Failed to process this image. Try another file.');
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
        placeholder="Image URL or data URI"
      />
      <button type="button" className="admin-chip" onClick={() => fileInputRef.current?.click()}>
        Upload image
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
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
  const [publishedPages, setPublishedPages] = useState<Record<Locale, PageData>>(() =>
    buildInitialPages()
  );
  const [savedPages, setSavedPages] = useState<Record<Locale, PageData>>(() => buildInitialPages());
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeServiceBySection, setActiveServiceBySection] = useState<Record<string, string>>({});
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [publishMessage, setPublishMessage] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const admin = useAdminMode();
  const translation = translations[locale];
  const currentPage = admin.isAdminMode ? pages[locale] : publishedPages[locale];
  const editablePage = pages[locale];
  const savedPage = savedPages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
  const activeProject = worksItems.find((item) => item.id === activeProjectId) ?? null;

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(editablePage) !== JSON.stringify(savedPage);
  }, [editablePage, savedPage]);

  useEffect(() => {
    let cancelled = false;

    const syncFromServer = async () => {
      setIsSyncing(true);
      try {
        const response = await fetchContentFromServer(locale);
        const nextPublished = normalizeServerPage(response.published, locale);
        const nextDraft = normalizeServerPage(response.draft ?? response.published, locale);

        if (cancelled) {
          return;
        }

        setPublishedPages((previous) => ({
          ...previous,
          [locale]: nextPublished
        }));
        setPages((previous) => ({
          ...previous,
          [locale]: cloneDeep(nextDraft)
        }));
        setSavedPages((previous) => ({
          ...previous,
          [locale]: cloneDeep(nextDraft)
        }));
        setPublishMessage('Server content loaded');
      } catch (error) {
        if (cancelled) {
          return;
        }
        setPublishMessage(`Failed to load server content: ${getErrorMessage(error)}`);
      } finally {
        if (!cancelled) {
          setIsSyncing(false);
        }
      }
    };

    syncFromServer();

    return () => {
      cancelled = true;
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
      const response = await saveDraftToServer(locale, pageToSave);
      const nextDraft = normalizeServerPage(response.draft ?? pageToSave, locale);

      setPages((previous) => ({
        ...previous,
        [locale]: cloneDeep(nextDraft)
      }));
      setSavedPages((previous) => ({
        ...previous,
        [locale]: cloneDeep(nextDraft)
      }));
      setPublishMessage('Draft saved to server');
    } catch (error) {
      setPublishMessage(`Save failed: ${getErrorMessage(error)}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const resetDraft = async () => {
    setIsSyncing(true);
    try {
      const response = await fetchContentFromServer(locale);
      const nextDraft = normalizeServerPage(response.draft ?? response.published, locale);
      const nextPublished = normalizeServerPage(response.published, locale);

      setPages((previous) => ({
        ...previous,
        [locale]: cloneDeep(nextDraft)
      }));
      setSavedPages((previous) => ({
        ...previous,
        [locale]: cloneDeep(nextDraft)
      }));
      setPublishedPages((previous) => ({
        ...previous,
        [locale]: cloneDeep(nextPublished)
      }));
      setSelectedSectionId(null);
      setPublishMessage('Draft reloaded from server');
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
      const response = await publishToServer(locale, pageToPublish);
      const nextPublished = normalizeServerPage(response.published ?? pageToPublish, locale);
      const nextDraft = normalizeServerPage(response.draft ?? nextPublished, locale);

      setPages((previous) => ({
        ...previous,
        [locale]: cloneDeep(nextDraft)
      }));
      setSavedPages((previous) => ({
        ...previous,
        [locale]: cloneDeep(nextDraft)
      }));
      setPublishedPages((previous) => ({
        ...previous,
        [locale]: cloneDeep(nextPublished)
      }));
      setPublishMessage(`Published at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      setPublishMessage(`Publish failed: ${getErrorMessage(error)}`);
    } finally {
      setIsSyncing(false);
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

  const closeProject = () => {
    setActiveProjectId(null);
    window.setTimeout(() => {
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

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
        {isSyncing ? 'Syncing with server…' : publishMessage || (hasUnsavedChanges ? 'Unsaved changes' : 'Saved')}
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
              <a className="btn btn-primary" href={`mailto:${section.props.contactEmail}`}>
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
                <button type="button" className="btn btn-outline subtle">
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
                {section.props.items.map((item, itemIndex) => (
                  <button
                    className="work-card"
                    key={`${section.id}-${item.id}-${itemIndex}`}
                    type="button"
                    onClick={() => {
                      if (!admin.isAdminMode) {
                        setActiveProjectId(item.id);
                      }
                    }}
                    aria-label={`Open ${item.title} project`}
                  >
                    <div className="work-image-wrap">
                      <EditableImage
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
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
      const reviewTrack = [...section.props.items, ...section.props.items];

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

            <div className="reviews-marquee" aria-label="Client reviews">
              <div className="reviews-track">
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
            <a className="btn btn-primary" href={`mailto:${section.props.email}`}>
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
                label="Cover image"
                value={work.image}
                onChange={(nextSrc) =>
                  patchWorkItem(selectedSection.id, work.id, (item) => ({
                    ...item,
                    image: nextSrc
                  }))
                }
              />
              <div className="drawer-subsection">
                <strong>Gallery images</strong>
                {work.gallery.map((galleryImage, galleryIndex) => (
                  <div className="drawer-inline" key={`${work.id}-gallery-${galleryIndex}`}>
                    <AdminImageField
                      label={`Image ${galleryIndex + 1}`}
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
                      Remove image
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
                  Add gallery image
                </button>
              </div>
              <button
                type="button"
                className="admin-chip"
                onClick={() => setActiveProjectId(work.id)}
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
          label="Cover image"
          value={activeProject.image}
          onChange={(nextSrc) => updateActiveProject((project) => ({ ...project, image: nextSrc }))}
        />
        <div className="drawer-subsection">
          <strong>Gallery images</strong>
          {activeProject.gallery.map((image, index) => (
            <div className="drawer-inline" key={`${activeProject.id}-project-gallery-${index}`}>
              <AdminImageField
                label={`Image ${index + 1}`}
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
                Remove image
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
            Add gallery image
          </button>
        </div>
        <button type="button" className="admin-chip" onClick={closeProject}>
          Close project page
        </button>
      </aside>
    );
  };

  return (
    <div className={`site locale-${locale}`} data-node-id="4003:55">
      {adminLoginForm}
      {adminToolbar}
      {renderSelectedSectionSettings()}
      {renderProjectAdminSettings()}

      <header className="header">
        <div className="section-wrap header-inner">
          <a className="brand" href="#top" aria-label="Homepage">
            <span className="brand-main">Islam Gainullin</span>
            <span className="brand-sub">aka. bimbiriim</span>
            <sup>TM</sup>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#works">{translation.nav.work}</a>
            <a href="#services">{translation.nav.services}</a>
            <a href="#reviews">{translation.nav.reviews}</a>
          </nav>

          <div className="header-actions">
            <a className="btn btn-light" href="/Islam_Gainullin_Resume.pdf" download>
              <span>{translation.nav.resume}</span>
              <img src="/assets/icon-download.svg" alt="" aria-hidden="true" />
            </a>
            <a className="btn btn-outline" href="#contact">
              {translation.nav.contact}
            </a>
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

              <div className="project-cover">
                <img src={activeProject.image} alt={`${activeProject.title} preview`} />
              </div>

              <div className="project-gallery" aria-label="Project gallery">
                {activeProject.gallery.map((image, index) => (
                  <div className="project-gallery-item" key={`${image}-${index}`}>
                    <img src={image} alt={`${activeProject.title} case ${index + 1}`} loading="lazy" />
                  </div>
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

      <footer className="footer section-light" data-node-id="4003:148">
        <div className="section-wrap">
          <img className="footer-line" src="/assets/footer-line.svg" alt="" aria-hidden="true" />
          <div className="footer-nav">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
          <div className="footer-bottom">
            <p>{translation.footer.signature}</p>
            <button type="button">{translation.footer.licenses}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
