// Localization, navigation, and small UI interactions for LGT Media site
// - Language switching via data-i18n keys
// - Persists selection via localStorage and supports ?lang=en|nl
// - Updates text nodes and attributes using data-i18n and data-i18n-attr
// - Rewrites internal links to carry the selected lang param
// - Mobile menu toggle and simple reveal animations

(function () {
  const DEFAULT_LANG = 'nl';
  const SUPPORTED_LANGS = ['en', 'nl'];

  // Centralized translations object. Keep keys consistent across pages.
  // Keys are structured: section.subsection.key for clarity.
  const translations = {
    en: {
      common: {
        brand: 'LGT Media',
        ctaBook: 'Book a Call',
        ctaBookLong: 'Book Your Free Growth Strategy Call',
        langEN: 'EN',
        langNL: 'NL',
        menu: 'Menu',
        close: 'Close',
        schedulingCta: 'Schedule on Calendly',
      },
      nav: {
        home: 'Home',
        services: 'Services',
        technology: 'Technology',
        casestudies: 'Case Studies',
        about: 'About',
        blog: 'Blog',
        contact: 'Contact',
      },
      footer: {
        tagline: 'AI-powered growth, built together.',
        rights: 'All rights reserved.',
        quickLinks: 'Quick Links',
        contact: 'Contact',
        follow: 'Follow',
      },
      index: {
        metaTitle: "Let's Grow Together Media – AI-Powered Automation for Ambitious Businesses",
        metaDescription: 'We build intelligent systems that generate leads and streamline operations so you can focus on your vision.',
        heroHeadline: "Let's Grow Together: AI-Powered Automation for Ambitious Businesses.",
        heroSub: 'We partner with businesses to build intelligent systems that generate leads and streamline operations, so you can focus on your vision.',
        heroCta: 'Book Your Free Growth Strategy Call',
        processTitle: 'Our Partnership Process',
        step1Title: 'Discover',
        step1Desc: 'We audit your processes and goals together.',
        step2Title: 'Build',
        step2Desc: 'We design and implement your custom AI & automation stack.',
        step3Title: 'Grow',
        step3Desc: 'We manage and optimize the system for continuous success.',
        testimonialsTitle: 'What Our Clients Say',
        testimonial1: '“Their automation saved us dozens of hours per week and improved lead quality.”',
        testimonial2: '“Clear strategy, fast delivery, and measurable results from the first month.”',
        testimonial3: '“Professional and collaborative from strategy to execution.”',
        ctaBandTitle: 'Ready to grow with AI-driven systems?',
        ctaBandCta: 'Book a Call',
      },
      services: {
        metaTitle: 'How We Help You Grow – Services | LGT Media',
        metaDescription: 'AI lead generation, custom AI agents, business process automation, and performance marketing to drive measurable growth.',
        title: 'How We Help You Grow',
        s1Title: 'AI-Powered Lead Generation',
        s1Desc: 'Deploy data-driven funnels, enrichment, and outreach to consistently create qualified opportunities.',
        s2Title: 'Custom AI Agent Development',
        s2Desc: 'Design specialized agents for research, prospecting, support, and internal tooling tailored to your workflows.',
        s3Title: 'Business Process Automation',
        s3Desc: 'Eliminate repetitive work with robust automations across your stack (CRM, ops, analytics).',
        s4Title: 'Performance Marketing (Ads)',
        s4Desc: 'Scale paid channels with creative testing, conversion tracking, and full-funnel optimization.',
      },
      technology: {
        metaTitle: 'Our Technology – Tools We Use | LGT Media',
        metaDescription: 'Our toolkit includes Cursor, Google ADK, CrewAI/n8n, and Google & Meta Ads Platforms to build reliable, scalable systems.',
        title: 'The Tools We Use to Build Your Future',
        t1Title: 'Cursor',
        t1Desc: 'Accelerated development with AI-assisted coding and best practices.',
        t2Title: 'Google ADK',
        t2Desc: 'Powerful AI developer kit for data-driven automation and integrations.',
        t3Title: 'CrewAI / n8n',
        t3Desc: 'Composable agents and workflows that orchestrate complex processes.',
        t4Title: 'Google & Meta Ads',
        t4Desc: 'Performance platforms to reach, convert, and scale your ideal audience.',
      },
      casestudies: {
        metaTitle: 'Our Work & Results – Case Studies | LGT Media',
        metaDescription: 'Proof-of-concept projects with real outcomes that demonstrate our approach and results.',
        title: 'Our Work & Results',
        c1Title: 'B2B SaaS – Lead Engine POC',
        c1Result: '+42% qualified demos in 6 weeks with AI-enriched outbound.',
        c2Title: 'E-commerce – Automation POC',
        c2Result: 'Saved ~30 hours/month by automating ops and reporting.',
        c3Title: 'Agency – Ads & Attribution POC',
        c3Result: 'Reduced CPA by 23% with creative testing and clean tracking.',
      },
      about: {
        metaTitle: 'From Warehouse to AI Entrepreneur – About | LGT Media',
        metaDescription: 'Our story and the “Let’s Grow Together” philosophy behind how we partner with clients.',
        title: 'From Warehouse to AI Entrepreneur',
        body1: 'I started in the warehouse—hands-on, process-focused, and resourceful. That mindset now powers how we build AI systems: practical, measurable, and built around your real-world constraints.',
        body2: '“Let’s Grow Together” is more than a tagline. We co-create with your team, aligning business goals with systems that scale with you.',
      },
      blog: {
        metaTitle: 'AI & Growth Insights – Blog | LGT Media',
        metaDescription: 'Short, practical takes on AI, automation, and performance growth.',
        title: 'AI & Growth Insights',
        p1Title: 'Practical AI Agents for Prospecting',
        p1Excerpt: 'How focused agents can research, enrich, and prioritize leads—without manual busywork.',
        p2Title: 'Attribution Without the Drama',
        p2Excerpt: 'A simple framework for reliable tracking that aligns with decision-making.',
        p3Title: 'Automation Wins You Can Ship This Week',
        p3Excerpt: 'Low-risk process automations that save time and compound over time.',
        p4Title: 'Designing a Lead Engine That Scales',
        p4Excerpt: 'Map your funnel, instrument metrics, and iterate on the highest-impact levers.',
        read: 'Read',
      },
      contact: {
        metaTitle: "Let's Start a Conversation – Contact | LGT Media",
        metaDescription: 'Get in touch or schedule a growth strategy call. We reply within 1 business day.',
        title: "Let's Start a Conversation",
        formName: 'Name',
        formEmail: 'Email',
        formMessage: 'Message',
        formConsent: 'I agree to be contacted and accept the privacy policy.',
        formSubmit: 'Send Message',
        phName: 'Your name',
        phEmail: 'name@company.com',
        phMessage: 'How can we help?',
        scheduleTitle: 'Prefer to pick a time?',
        scheduleDesc: 'Pick a 20-minute growth strategy call at a time that suits you.',
        scheduleCta: 'Schedule on Calendly',
      },
    },
    nl: {
      common: {
        brand: 'LGT Media',
        ctaBook: 'Plan een gesprek',
        ctaBookLong: 'Boek uw Gratis Groeistrategiegesprek',
        langEN: 'EN',
        langNL: 'NL',
        menu: 'Menu',
        close: 'Sluiten',
        schedulingCta: 'Plan via Calendly',
      },
      nav: {
        home: 'Home',
        services: 'Diensten',
        technology: 'Technologie',
        casestudies: 'Case Studies',
        about: 'Over Ons',
        blog: 'Blog',
        contact: 'Contact',
      },
      footer: {
        tagline: 'AI-gedreven groei, samen gebouwd.',
        rights: 'Alle rechten voorbehouden.',
        quickLinks: 'Snelle Links',
        contact: 'Contact',
        follow: 'Volgen',
      },
      index: {
        metaTitle: 'Let’s Grow Together Media – AI-Gedreven Automatisering voor Ambitieuze Bedrijven',
        metaDescription: 'We bouwen intelligente systemen die leads genereren en processen stroomlijnen, zodat u zich kunt richten op uw visie.',
        heroHeadline: 'Laten we Samen Groeien: AI-Gedreven Automatisering voor Ambitieuze Bedrijven.',
        heroSub: 'We werken samen met bedrijven om intelligente systemen te bouwen die leads genereren en processen stroomlijnen, zodat u zich kunt richten op uw visie.',
        heroCta: 'Boek uw Gratis Groeistrategiegesprek',
        processTitle: 'Ons Samenwerkingsproces',
        step1Title: 'Ontdekken',
        step1Desc: 'We auditeren samen uw processen en doelen.',
        step2Title: 'Bouwen',
        step2Desc: 'We ontwerpen en implementeren uw aangepaste AI- & automatiseringsstack.',
        step3Title: 'Groeien',
        step3Desc: 'We beheren en optimaliseren het systeem voor continu succes.',
        testimonialsTitle: 'Wat Klanten Zeggen',
        testimonial1: '“Hun automatisering bespaarde ons tientallen uren per week en verbeterde de leadkwaliteit.”',
        testimonial2: '“Heldere strategie, snelle levering en meetbare resultaten vanaf de eerste maand.”',
        testimonial3: '“Professioneel en samenwerkend van strategie tot uitvoering.”',
        ctaBandTitle: 'Klaar om te groeien met AI-gestuurde systemen?',
        ctaBandCta: 'Plan een gesprek',
      },
      services: {
        metaTitle: 'Hoe Wij U Helpen Groeien – Diensten | LGT Media',
        metaDescription: 'AI leadgeneratie, aangepaste AI-agents, procesautomatisering en performance advertising voor meetbare groei.',
        title: 'Hoe Wij U Helpen Groeien',
        s1Title: 'AI-Gedreven Leadgeneratie',
        s1Desc: 'Zet datagedreven funnels, verrijking en outreach in om consistent gekwalificeerde kansen te creëren.',
        s2Title: 'Aangepaste AI Agent-ontwikkeling',
        s2Desc: 'Ontwerp gespecialiseerde agents voor research, prospectie, support en interne tooling afgestemd op uw workflows.',
        s3Title: 'Bedrijfsprocesautomatisering',
        s3Desc: 'Elimineer repetitief werk met robuuste automatiseringen in uw stack (CRM, operations, analytics).',
        s4Title: 'Performance Marketing (Ads)',
        s4Desc: 'Schaal paid kanalen met creatieve tests, conversietracking en full-funnel optimalisatie.',
      },
      technology: {
        metaTitle: 'Onze Technologie – Tools die we gebruiken | LGT Media',
        metaDescription: 'Onze toolkit omvat Cursor, Google ADK, CrewAI/n8n en Google & Meta Ads-platforms voor betrouwbare, schaalbare systemen.',
        title: 'De Tools die We Gebruiken om uw Toekomst te Bouwen',
        t1Title: 'Cursor',
        t1Desc: 'Versnelde ontwikkeling met AI-ondersteund coderen en best practices.',
        t2Title: 'Google ADK',
        t2Desc: 'Krachtige AI developer kit voor datagedreven automatisering en integraties.',
        t3Title: 'CrewAI / n8n',
        t3Desc: 'Samenstelbare agents en workflows die complexe processen orkestreren.',
        t4Title: 'Google & Meta Ads',
        t4Desc: 'Performance-platforms om uw ideale doelgroep te bereiken, converteren en schalen.',
      },
      casestudies: {
        metaTitle: 'Ons Werk & Onze Resultaten – Case Studies | LGT Media',
        metaDescription: 'Proof-of-concept projecten met echte uitkomsten die onze aanpak en resultaten tonen.',
        title: 'Ons Werk & Onze Resultaten',
        c1Title: 'B2B SaaS – Lead Engine POC',
        c1Result: '+42% gekwalificeerde demo’s in 6 weken met AI-verrijkte outbound.',
        c2Title: 'E-commerce – Automatisering POC',
        c2Result: 'Bespaarde ~30 uur/maand door operations en rapportage te automatiseren.',
        c3Title: 'Agency – Ads & Attributie POC',
        c3Result: 'CPA met 23% verlaagd met creatieve tests en schone tracking.',
      },
      about: {
        metaTitle: 'Van Magazijnmedewerker tot AI-Ondernemer – Over Ons | LGT Media',
        metaDescription: 'Ons verhaal en de “Let’s Grow Together”-filosofie achter hoe we met klanten samenwerken.',
        title: 'Van Magazijnmedewerker tot AI-Ondernemer',
        body1: 'Ik begon in het magazijn—hands-on, procesgericht en vindingrijk. Die mindset stuurt nu hoe we AI-systemen bouwen: praktisch, meetbaar en afgestemd op uw realiteit.',
        body2: '“Let’s Grow Together” is meer dan een slogan. We co-creëren met uw team en verbinden bedrijfsdoelen met systemen die met u meegroeien.',
      },
      blog: {
        metaTitle: 'AI & Groei Inzichten – Blog | LGT Media',
        metaDescription: 'Korte, praktische inzichten over AI, automatisering en groei.',
        title: 'AI & Groei Inzichten',
        p1Title: 'Praktische AI-Agents voor Prospectie',
        p1Excerpt: 'Hoe gerichte agents leads kunnen onderzoeken, verrijken en prioriteren—zonder handmatig werk.',
        p2Title: 'Attributie Zonder Drama',
        p2Excerpt: 'Een eenvoudig kader voor betrouwbare tracking in lijn met besluitvorming.',
        p3Title: 'Automatiseringswinst die u Deze Week Kunt Shippen',
        p3Excerpt: 'Laag-risico procesautomatiseringen die tijd besparen en cumuleren.',
        p4Title: 'Een Scale-bare Lead Engine Ontwerpen',
        p4Excerpt: 'Breng uw funnel in kaart, meet wat telt en itereren op de hoogste-impact hefbomen.',
        read: 'Lees',
      },
      contact: {
        metaTitle: 'Laten we een Gesprek Beginnen – Contact | LGT Media',
        metaDescription: 'Neem contact op of plan een groeistrategiegesprek. We reageren binnen 1 werkdag.',
        title: 'Laten we een Gesprek Beginnen',
        formName: 'Naam',
        formEmail: 'E-mail',
        formMessage: 'Bericht',
        formConsent: 'Ik ga akkoord om gecontacteerd te worden en accepteer het privacybeleid.',
        formSubmit: 'Bericht Verzenden',
        phName: 'Uw naam',
        phEmail: 'naam@bedrijf.com',
        phMessage: 'Waarmee kunnen we helpen?',
        scheduleTitle: 'Liever direct plannen?',
        scheduleDesc: 'Plan een groeistrategiegesprek van 20 minuten op een moment dat u past.',
        scheduleCta: 'Plan via Calendly',
      },
    },
  };

  function getInitialLanguage() {
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang && SUPPORTED_LANGS.includes(urlLang)) return urlLang;
    const stored = window.localStorage.getItem('lang');
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
    return DEFAULT_LANG;
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    window.localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    applyLanguage(lang);
    rewriteInternalLinks(lang);
    updateLangSwitcherUI(lang);
    updateMeta(lang);
  }

  function applyLanguage(lang) {
    const dict = translations[lang];
    // Update any element with data-i18n (textContent by default)
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      // Skip <title>, handled by updateMeta
      if (el.tagName.toLowerCase() === 'title') return;
      const attr = el.getAttribute('data-i18n-attr');
      const value = getDeep(dict, key) || '';
      if (attr) {
        // Support comma-separated list of attributes
        attr.split(',').map(a => a.trim()).forEach((a) => {
          if (a) el.setAttribute(a, value);
        });
      } else {
        el.textContent = value;
      }
    });
  }

  function updateMeta(lang) {
    const dict = translations[lang];
    const titleKey = detectPageTitleKey();
    const descKey = detectPageDescriptionKey();
    const titleValue = getDeep(dict, titleKey);
    const descValue = getDeep(dict, descKey);

    if (titleValue) document.title = titleValue;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && descValue) metaDesc.setAttribute('content', descValue);
  }

  function detectPageTitleKey() {
    const pageId = document.documentElement.getAttribute('data-page');
    switch (pageId) {
      case 'index': return 'index.metaTitle';
      case 'services': return 'services.metaTitle';
      case 'technology': return 'technology.metaTitle';
      case 'casestudies': return 'casestudies.metaTitle';
      case 'about': return 'about.metaTitle';
      case 'blog': return 'blog.metaTitle';
      case 'contact': return 'contact.metaTitle';
      default: return 'index.metaTitle';
    }
  }

  function detectPageDescriptionKey() {
    const pageId = document.documentElement.getAttribute('data-page');
    switch (pageId) {
      case 'index': return 'index.metaDescription';
      case 'services': return 'services.metaDescription';
      case 'technology': return 'technology.metaDescription';
      case 'casestudies': return 'casestudies.metaDescription';
      case 'about': return 'about.metaDescription';
      case 'blog': return 'blog.metaDescription';
      case 'contact': return 'contact.metaDescription';
      default: return 'index.metaDescription';
    }
  }

  function rewriteInternalLinks(lang) {
    const links = document.querySelectorAll('a[href]');
    links.forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      const isInternal = href.startsWith('/') || href.endsWith('.html') || href === '#';
      const isAnchor = href.startsWith('#');
      if (!isInternal || isAnchor) return;
      const url = new URL(href, window.location.origin);
      url.searchParams.set('lang', lang);
      a.setAttribute('href', url.pathname + url.search + url.hash);
    });
  }

  function updateLangSwitcherUI(lang) {
    document.querySelectorAll('[data-lang]')?.forEach((el) => {
      if (el.getAttribute('data-lang') === lang) {
        el.classList.add('text-growth', 'font-semibold');
      } else {
        el.classList.remove('text-growth', 'font-semibold');
      }
    });
  }

  function getDeep(obj, path) {
    return path.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
  }

  function setupLangSwitcher() {
    document.querySelectorAll('[data-lang]')?.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = el.getAttribute('data-lang');
        setLanguage(lang);
        // update query param without navigation
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
      });
    });
  }

  function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const isHidden = menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      if (isHidden) {
        menu.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        menu.classList.add('opacity-0', 'pointer-events-none');
      }
    });
  }

  function setupRevealAnimations() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || revealEls.length === 0) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-2');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-2', 'transition', 'duration-700');
      io.observe(el);
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const initialLang = getInitialLanguage();
    setLanguage(initialLang);
    setupLangSwitcher();
    setupMobileMenu();
    setupRevealAnimations();
  });
})();