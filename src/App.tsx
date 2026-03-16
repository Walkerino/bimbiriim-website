import { useEffect, useMemo, useState } from 'react';

type Locale = 'en' | 'ru';
type ServiceId = 'design' | 'development' | 'branding';

type Service = {
  id: ServiceId;
  index: string;
  title: string;
  description: string;
};

type Review = {
  quote: string;
  author: string;
  role: string;
};

type Work = {
  title: string;
  category: string;
  image: string;
};

type Translation = {
  nav: {
    work: string;
    services: string;
    reviews: string;
    resume: string;
    contact: string;
  };
  hero: {
    introLead: string;
    introConnector: string;
    name: string;
    roles: string[];
    based: string;
    hireMe: string;
  };
  works: {
    title: string;
    viewAll: string;
    items: Work[];
  };
  services: {
    title: string;
    items: Service[];
  };
  reviews: {
    title: string;
    items: Review[];
  };
  cta: {
    line1: string;
    line2: string;
    button: string;
  };
  footer: {
    signature: string;
    licenses: string;
  };
};

const translations: Record<Locale, Translation> = {
  en: {
    nav: {
      work: 'Works',
      services: 'Services',
      reviews: 'Reviews',
      resume: 'Resume',
      contact: 'Contact'
    },
    hero: {
      introLead: 'Hi,',
      introConnector: 'I\'m',
      name: 'Islam',
      roles: ['Digital Designer', 'Web Developer'],
      based: 'Based in Kazan',
      hireMe: 'Hire Me'
    },
    works: {
      title: 'Works',
      viewAll: 'View All',
      items: [
        { title: 'Project', category: 'Mobile App', image: '/assets/work-1.png' },
        { title: 'Project', category: 'Mobile App', image: '/assets/work-4.png' },
        { title: 'Project', category: 'Mobile App', image: '/assets/work-3.png' },
        { title: 'Project', category: 'Mobile App', image: '/assets/work-5.png' }
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
          role: 'CEO, Startup'
        },
        {
          quote: 'Strong designer-developer mindset. We launched faster because both design and code quality were high.',
          author: 'Anna Petrova',
          role: 'Product Lead'
        },
        {
          quote: 'Clear communication, reliable process, and very accurate implementation from Figma to production.',
          author: 'Victor Lee',
          role: 'CTO, Agency'
        },
        {
          quote: 'The portfolio redesign increased user engagement and finally matched our premium brand perception.',
          author: 'Amelia Brown',
          role: 'Marketing Director'
        }
      ]
    },
    cta: {
      line1: 'Let\'s create',
      line2: 'something together',
      button: 'Book a Call'
    },
    footer: {
      signature: 'Islam Gainullin. Designer & Developer',
      licenses: 'Licenses'
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
    hero: {
      introLead: 'Йо,',
      introConnector: 'я',
      name: 'Ислам',
      roles: ['Диджитал дизайнер', 'Веб-разработчик'],
      based: 'Из Казани',
      hireMe: 'Газ работать!'
    },
    works: {
      title: 'Работы',
      viewAll: 'Смотреть все',
      items: [
        { title: 'Проект', category: 'Мобильное приложение', image: '/assets/work-1.png' },
        { title: 'Проект', category: 'Мобильное приложение', image: '/assets/work-4.png' },
        { title: 'Проект', category: 'Мобильное приложение', image: '/assets/work-3.png' },
        { title: 'Проект', category: 'Мобильное приложение', image: '/assets/work-5.png' }
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
          role: 'CEO, Startup'
        },
        {
          quote: 'Сильный подход дизайнера и разработчика одновременно. Запуск прошел быстрее ожидаемого.',
          author: 'Анна Петрова',
          role: 'Product Lead'
        },
        {
          quote: 'Отличная коммуникация, прозрачный процесс и очень точная реализация из Figma в продакшн.',
          author: 'Victor Lee',
          role: 'CTO, Agency'
        },
        {
          quote: 'После редизайна вовлеченность выросла, и сайт наконец стал выглядеть как премиальный продукт.',
          author: 'Амелия Браун',
          role: 'Marketing Director'
        }
      ]
    },
    cta: {
      line1: 'Давайте создадим',
      line2: 'что-то вместе',
      button: 'Созвониться'
    },
    footer: {
      signature: 'Islam Gainullin. Designer & Developer',
      licenses: 'Лицензии'
    }
  }
};

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/bimbiriim' },
  { label: 'Behance', href: 'https://behance.net/bimbiriim' },
  { label: 'Telegram', href: 'https://t.me/bimbiriim' }
];

function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [activeService, setActiveService] = useState<ServiceId>('design');
  const t = translations[locale];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const roles = t.hero.roles;
  const reviewTrack = useMemo(() => [...t.reviews.items, ...t.reviews.items], [t.reviews.items]);

  useEffect(() => {
    setRoleIndex(0);
  }, [locale]);

  useEffect(() => {
    if (roles.length === 0) {
      return undefined;
    }

    const activeRole = roles[roleIndex];
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
  }, [roleIndex, roles]);

  return (
    <div className="site" data-node-id="4003:55">
      <header className="header">
        <div className="section-wrap header-inner">
          <a className="brand" href="#top" aria-label="Homepage">
            <span className="brand-main">Islam Gainullin</span>
            <span className="brand-sub">aka. bimbiriim</span>
            <sup>TM</sup>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#works">{t.nav.work}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#reviews">{t.nav.reviews}</a>
          </nav>

          <div className="header-actions">
            <a className="btn btn-light" href="/Islam_Gainullin_Resume.pdf" download>
              <span>{t.nav.resume}</span>
              <img src="/assets/icon-download.svg" alt="" aria-hidden="true" />
            </a>
            <a className="btn btn-outline" href="#contact">
              {t.nav.contact}
            </a>
            <div className="lang-switch" role="group" aria-label="Language switch">
              <button
                type="button"
                className={locale === 'en' ? 'active' : ''}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={locale === 'ru' ? 'active' : ''}
                onClick={() => setLocale('ru')}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero section-dark" data-node-id="4003:56">
          <div className="section-wrap hero-inner">
            <h1>
              <span className="hero-top-line">
                <span className="hero-muted hero-lead">{t.hero.introLead}</span>
                <span className="hero-photo" aria-hidden="true">
                  <img src="/assets/hero-accent.png" alt="" />
                </span>
                <span className="hero-muted hero-connector">{t.hero.introConnector}</span>
                <span className="hero-strong hero-name">{t.hero.name}</span>
              </span>
              <span className="hero-role">
                <span className="hero-role-text">{typedRole}</span>
                <span className="hero-caret" aria-hidden="true" />
              </span>
              <span className="hero-muted hero-based">{t.hero.based}</span>
            </h1>
            <a className="btn btn-primary" href="mailto:walkerino.web@gmail.com">
              {t.hero.hireMe}
            </a>
          </div>
        </section>

        <section className="works section-light" id="works" data-node-id="4003:74">
          <div className="section-wrap">
            <div className="section-head">
              <h2>{t.works.title}</h2>
              <button type="button" className="btn btn-outline subtle">
                {t.works.viewAll}
              </button>
            </div>

            <div className="works-grid">
              {t.works.items.map((item, index) => (
                <article className="work-card" key={`${item.image}-${index}`}>
                  <div className="work-image-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services section-dark" id="services" data-node-id="4003:98">
          <div className="section-wrap services-layout">
            <h2>{t.services.title}</h2>
            <div className="services-stack" role="list">
              {t.services.items.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  role="listitem"
                  className={service.id === activeService ? 'service-card active' : 'service-card'}
                  onClick={() => setActiveService(service.id)}
                >
                  <span className="service-index">{service.index}</span>
                  <strong>{service.title}</strong>
                  <p>{service.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews section-dark" id="reviews" data-node-id="4003:113">
          <div className="section-wrap">
            <h2>{t.reviews.title}</h2>
          </div>

          <div className="reviews-marquee" aria-label="Client reviews">
            <div className="reviews-track">
              {reviewTrack.map((review, index) => (
                <article className="review-card" key={`${review.author}-${index}`}>
                  <p className="review-quote">&quot;{review.quote}&quot;</p>
                  <div className="review-author">
                    <img src="/assets/avatar.png" alt={review.author} loading="lazy" />
                    <div>
                      <strong>{review.author}</strong>
                      <span>{review.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta section-light" id="contact" data-node-id="4003:144">
          <div className="section-wrap cta-inner">
            <h2>
              <span>{t.cta.line1}</span>
              <span>{t.cta.line2}</span>
            </h2>
            <a className="btn btn-primary" href="mailto:walkerino.web@gmail.com">
              {t.cta.button}
            </a>
          </div>
        </section>
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
            <p>{t.footer.signature}</p>
            <button type="button">{t.footer.licenses}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
