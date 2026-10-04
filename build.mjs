// Statik HTML səhifələrini data fayllarından yaradır: `npm run build`
import { writeFileSync, mkdirSync } from 'node:fs';
import { SITE } from './js/data/site-config.js';
import { SERVICES } from './js/data/catalog.js';

mkdirSync('xidmetler', { recursive: true });

const ICONS = {
  phone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3a5.4 5.4 0 0 0 4.4 4.7v3.4a8.8 8.8 0 0 1-4.3-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v3.5a2.7 2.7 0 1 0 1.8 2.5V3z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .3-3.3-.7-2.8-1.2-4.5-4-4.7-4.2-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.1-.3.3-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2 1.300 2.300 1.400.3.100.4.100.6-.1l.8-1c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.800-.1 1.400z"/></svg>',
};

const esc = (s) => String(s).replace(/"/g, '&quot;');
const wa = (text) => `https://wa.me/${SITE.phone.whatsapp}?text=${encodeURIComponent(text)}`;

const header = (active) => `
<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="${SITE.name} - Ana səhifə">
      <img src="${SITE.logo}" alt="${SITE.name} loqosu" width="168" height="112" class="brand-logo" />
    </a>
    <nav class="nav" id="main-nav" aria-label="Əsas menyu">
      <a href="/" class="${active === 'home' ? 'is-active' : ''}">Ana səhifə</a>
      <a href="/haqqimizda.html" class="${active === 'about' ? 'is-active' : ''}">Haqqımızda</a>
      <div class="nav-drop">
        <a href="/#xidmetler" class="${active === 'service' ? 'is-active' : ''}">Xidmətlər ▾</a>
        <div class="nav-menu">
          ${SERVICES.map((s) => `<a href="/xidmetler/${s.slug}.html" data-scene="${s.scene}">${s.icon} ${s.title}</a>`).join('')}
        </div>
      </div>
      <a href="/bloq.html" class="${active === 'blog' ? 'is-active' : ''}">Bloq</a>
      <a href="/#elaqe">Əlaqə</a>
    </nav>
    <div class="header-actions">
      <a class="header-phone" href="tel:${SITE.phone.tel}" id="header-phone">${ICONS.phone}<span>${SITE.phone.display}</span></a>
      <a class="icon-btn" href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram" id="header-instagram">${ICONS.instagram}</a>
      <a class="icon-btn" href="${SITE.social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok" id="header-tiktok">${ICONS.tiktok}</a>
      <button class="burger" id="burger" aria-label="Menyunu aç" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;

const footer = () => `
<footer class="site-footer" id="elaqe">
  <div class="container footer-grid">
    <div>
      <img src="${SITE.logo}" alt="${SITE.name} loqosu" class="footer-logo" width="168" height="112" loading="lazy" />
      <p class="muted">${SITE.description}</p>
    </div>
    <div>
      <h3>Xidmətlər</h3>
      <ul>${SERVICES.map((s) => `<li><a href="/xidmetler/${s.slug}.html">${s.title}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>Əlaqə</h3>
      <a class="footer-phone" href="tel:${SITE.phone.tel}" id="footer-phone">${ICONS.phone}<span>${SITE.phone.display}</span></a>
      <a class="btn btn-wa" href="${wa('Salam! Cleaning Express Service saytından yazıram.')}" target="_blank" rel="noopener" id="footer-whatsapp">${ICONS.whatsapp} WhatsApp ilə yaz</a>
      <div class="social-row">
        <a class="icon-btn" href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram" id="footer-instagram">${ICONS.instagram}</a>
        <a class="icon-btn" href="${SITE.social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok" id="footer-tiktok">${ICONS.tiktok}</a>
      </div>
    </div>
  </div>
  <div class="container footer-bottom">© ${new Date().getFullYear()} ${SITE.name}. Bütün hüquqlar qorunur.</div>
</footer>
<a class="fab-wa" href="${wa('Salam! Cleaning Express Service saytından yazıram.')}" target="_blank" rel="noopener" aria-label="WhatsApp" id="fab-whatsapp">${ICONS.whatsapp}</a>`;

const layout = ({ title, desc, path, scene, active, body, schema }) => `<!DOCTYPE html>
<html lang="az">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${esc(desc)}" />
<link rel="canonical" href="${SITE.url}${path}" />
<meta name="theme-color" content="#0b3dbd" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${SITE.url}${path}" />
<meta property="og:image" content="${SITE.url}${SITE.logo}" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" href="${SITE.logo}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/css/style.css" />
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body data-scene="${scene}" data-page="${active}">
<div class="intro" id="intro" aria-hidden="true"><img src="${SITE.logo}" alt="" /></div>
<div class="scenes" id="scenes" aria-hidden="true">
${(active === 'home' ? ['home', 'renovation', 'furniture', 'object', 'restaurant', 'office'] : [scene]).map((k) => `  <div class="scene-layer${k === scene ? ' is-active' : ''}" data-layer="${k}"><img src="/assets/scenes/${k}.jpg" alt=""${k === scene ? '' : ' loading="lazy"'} /></div>`).join('\\n')}
  <div class="shine"></div>
</div>
<canvas id="fx-canvas" aria-hidden="true"></canvas>
<div class="bg-veil"></div>

${header(active)}
<main>
${body}
</main>
${footer()}
<script type="module" src="/js/app.js"></script>
</body>
</html>`;

const bizSchema = {
  '@context': 'https://schema.org',
  '@type': 'CleaningService',
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone.tel,
  image: SITE.url + SITE.logo,
  areaServed: SITE.city,
  address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: 'AZ' },
  sameAs: Object.values(SITE.social),
};

// ---------- Ana səhifə ----------
const home = `
<section class="hero container" id="hero">
  <div class="hero-text">

    <h1>Təmizlik <span class="grad">sürətlə</span>, keyfiyyət <span class="grad">zəmanətlə</span></h1>
    <p class="lead">${SITE.description}</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="#xidmetler" id="cta-services">Xidmətlərə bax</a>
      <a class="btn btn-wa" href="${wa('Salam! Təmizlik xidməti barədə məlumat almaq istəyirəm.')}" target="_blank" rel="noopener" id="cta-whatsapp">${ICONS.whatsapp} WhatsApp</a>
    </div>
    <ul class="stats">
      <li><b>6</b><span>xidmət növü</span></li>
      <li><b>24/7</b><span>sifariş qəbulu</span></li>
      <li><b>1 dəq</b><span>qiymət hesabı</span></li>
    </ul>
  </div>
</section>

<section class="section container" id="xidmetler">
  <h2 class="section-title">Xidmətlərimiz</h2>
  <p class="section-sub">Kartın üzərinə gələndə arxa fondakı səhnə həmin xidmətin real prosesinə keçir.</p>
  <div class="cards">
    ${SERVICES.map(
      (s) => `<a class="card glass" href="/xidmetler/${s.slug}.html" data-scene="${s.scene}" id="card-${s.slug}">
      <span class="card-icon">${s.icon}</span>
      <h3>${s.title}</h3>
      <p>${s.tagline}</p>
      <span class="card-link">Qiyməti hesabla →</span>
    </a>`
    ).join('')}
  </div>
</section>

<section class="section container" id="nece-isleyir">
  <h2 class="section-title">Necə işləyir?</h2>
  <div class="steps">
    <div class="step glass"><b>1</b><h3>Xidməti seç</h3><p>Altı xidmətdən sənə uyğun olanı aç.</p></div>
    <div class="step glass"><b>2</b><h3>Qiyməti hesabla</h3><p>Sahə, otaq və ya əşya sayını yaz, nəticə dərhal çıxır.</p></div>
    <div class="step glass"><b>3</b><h3>Məlumatlarını yaz</h3><p>Ad, nömrə, ünvan, tarix və vaxtı daxil et.</p></div>
    <div class="step glass"><b>4</b><h3>WhatsApp ilə təsdiqlə</h3><p>Bütün detallar bizə avtomatik göndərilir.</p></div>
  </div>
</section>`;

writeFileSync(
  'index.html',
  layout({
    title: `${SITE.name} — Peşəkar təmizlik xidməti`,
    desc: SITE.description,
    path: '/',
    scene: 'home',
    active: 'home',
    body: home,
    schema: bizSchema,
  })
);

// ---------- Xidmət səhifələri ----------
for (const s of SERVICES) {
  const body = `
<section class="hero container service-hero">
  <div class="hero-text">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Ana səhifə</a> / <a href="/#xidmetler">Xidmətlər</a> / <span>${s.title}</span></nav>
    <span class="chip">${s.icon} ${s.tagline}</span>
    <h1>${s.title}</h1>
    <p class="lead">${s.description}</p>
    <ul class="ticks">${s.points.map((p) => `<li>${p}</li>`).join('')}</ul>
    <a class="btn btn-primary" href="#kalkulyator" id="cta-calc">Qiyməti hesabla</a>
  </div>
</section>

<section class="section container" id="kalkulyator">
  <h2 class="section-title">${s.title} kalkulyatoru</h2>
  <p class="section-sub">Qiyməti hesabla, məlumatlarını yaz və sifarişi WhatsApp ilə təsdiqlə.</p>
  <div id="calc-root" class="calc glass" data-service="${s.slug}" data-title="${esc(s.title)}" data-type="${s.calc}"></div>
</section>

<section class="section container">
  <h2 class="section-title">Digər xidmətlər</h2>
  <div class="cards">
    ${SERVICES.filter((x) => x.slug !== s.slug)
      .map(
        (x) => `<a class="card glass" href="/xidmetler/${x.slug}.html" data-scene="${x.scene}">
      <span class="card-icon">${x.icon}</span><h3>${x.title}</h3><p>${x.tagline}</p></a>`
      )
      .join('')}
  </div>
</section>`;
  writeFileSync(
    `xidmetler/${s.slug}.html`,
    layout({
      title: `${s.title} — qiyməti hesabla | ${SITE.name}`,
      desc: `${s.title}. ${s.description}`.slice(0, 160),
      path: `/xidmetler/${s.slug}.html`,
      scene: s.scene,
      active: 'service',
      body,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.title,
        provider: bizSchema,
        areaServed: SITE.city,
        description: s.description,
      },
    })
  );
}

// ---------- Haqqımızda və Bloq səhifələri ----------
const aboutBody = `
<section class="hero container service-hero">
  <div class="hero-text" style="max-width: 800px; margin: 0 auto; text-align: center;">
    <nav class="crumbs" aria-label="Breadcrumb" style="justify-content: center;"><a href="/">Ana səhifə</a> / <span>Haqqımızda</span></nav>
    <h1>Cleaning Express Service haqqında</h1>
    <p class="lead">Biz yalnız təmizlik etmirik, məkanınıza sağlamlıq və rahatlıq gətiririk.</p>
  </div>
</section>
<section class="section container" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.8;">
  <h2>Missiyamız</h2>
  <p>Məqsədimiz müştərilərimizi ən yüksək səviyyəli təmizlik xidməti ilə təmin edərək, onların vaxtına qənaət etmək və həyat keyfiyyətini artırmaqdır. Hər bir layihəyə xüsusi diqqət yetiririk və istifadə etdiyimiz bütün vasitələr ekoloji cəhətdən təhlükəsizdir.</p>
  <h2>Niyə biz?</h2>
  <ul class="ticks" style="margin-top: 1rem; display: grid; gap: 1rem;">
    <li>Peşəkar və təcrübəli komanda</li>
    <li>Avropa standartlarına uyğun təmizlik vasitələri</li>
    <li>İşə tam zəmanət və vaxtında təhvil</li>
    <li>Fərdi yanaşma və şəffaf qiymət sistemi</li>
  </ul>
</section>`;
writeFileSync('haqqimizda.html', layout({ title: `Haqqımızda | ${SITE.name}`, desc: 'Şirkətimiz, missiyamız və təmizlik sahəsindəki peşəkar yanaşmamız haqqında geniş məlumat.', path: '/haqqimizda.html', scene: 'office', active: 'about', body: aboutBody, schema: bizSchema }));

const blogBody = `
<section class="hero container service-hero">
  <div class="hero-text" style="max-width: 800px; margin: 0 auto; text-align: center;">
    <nav class="crumbs" aria-label="Breadcrumb" style="justify-content: center;"><a href="/">Ana səhifə</a> / <span>Bloq</span></nav>
    <h1>Faydalı məqalələr və məsləhətlər</h1>
    <p class="lead">Təmizlik, ev qayğısı və sağlamlıq haqqında ən son yazılarımızı oxuyun.</p>
  </div>
</section>
<section class="section container">
  <div class="cards">
    <a class="card glass" href="#"><h3>Bahar təmizliyi üçün 5 qızıl qayda</h3><p>Evdə bahar ab-havası yaratmaq üçün nədən başlamalı olduğunuzu öyrənin.</p></a>
    <a class="card glass" href="#"><h3>Yumşaq mebellərin ömrünü necə uzatmaq olar?</h3><p>Ləkələrlə mübarizə və ev şəraitində ilkin müdaxilə yolları.</p></a>
    <a class="card glass" href="#"><h3>Təmir sonrası tozlardan xilas olmağın yolları</h3><p>İnşaat tozunun zərərləri və təmizlənmə prosesinin incəlikləri.</p></a>
  </div>
</section>`;
writeFileSync('bloq.html', layout({ title: `Bloq | ${SITE.name}`, desc: 'Təmizlik haqqında faydalı məqalələr və praktiki məsləhətlər.', path: '/bloq.html', scene: 'home', active: 'blog', body: blogBody, schema: bizSchema }));


// ---------- SEO fayllari ----------
const urls = ['/', '/haqqimizda.html', '/bloq.html', ...SERVICES.map((s) => "/xidmetler/$(${s.slug}).html")];
writeFileSync('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => '  <url><loc>' + SITE.url + u + '</loc></url>').join('\n') + '\n</urlset>\n');
writeFileSync('robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + SITE.url + '/sitemap.xml\n');
console.log('? ' + urls.length + ' s?hif? yaradildi');
