// =============================================
// HEADER COMPONENT
// =============================================

function renderHeader(activePage) {
  const header = document.createElement('header');
  header.className = 'header';
  header.id = 'site-header';
  header.setAttribute('role', 'banner');

  // Determine base path (root or pages)
  const isRoot = !window.location.pathname.includes('/pages/');
  const base = isRoot ? '' : (window.location.pathname.includes('/xidmetler/') ? '../../' : '../');
  const rootBase = isRoot ? '' : (window.location.pathname.includes('/xidmetler/') ? '../..' : '..');

  header.innerHTML = `
    <div class="header__inner">
      <a href="${rootBase}/index.html" class="header__logo" aria-label="Cleanin Express Ana Səhifə">
        <span class="header__logo-text">Cleanin<span>Express</span></span>
      </a>

      <nav class="nav" aria-label="Əsas naviqasiya">
        <a href="${rootBase}/index.html" class="nav__link ${activePage === 'home' ? 'is-active' : ''}">Ana Səhifə</a>

        <div class="nav__dropdown">
          <a href="${rootBase}/pages/xidmetler.html" class="nav__link nav__dropdown-trigger ${activePage === 'xidmetler' ? 'is-active' : ''}">
            Xidmətlər
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
          </a>
          <div class="nav__dropdown-menu">
            <a href="${rootBase}/pages/xidmetler/ev-temizliyi.html" class="nav__dropdown-item"><span class="icon">🏠</span> Ev Təmizliyi</a>
            <a href="${rootBase}/pages/xidmetler/temir-sonrasi-temizlik.html" class="nav__dropdown-item"><span class="icon">🔨</span> Təmir Sonrası Təmizlik</a>
            <a href="${rootBase}/pages/xidmetler/obyekt-temizliyi.html" class="nav__dropdown-item"><span class="icon">🏢</span> Obyekt Təmizliyi</a>
            <a href="${rootBase}/pages/xidmetler/yumsaq-mebel-kimyavi-temizliyi.html" class="nav__dropdown-item"><span class="icon">🛋️</span> Yumşaq Mebel Təmizliyi</a>
            <a href="${rootBase}/pages/xidmetler/restoran-temizliyi.html" class="nav__dropdown-item"><span class="icon">🍽️</span> Restoran Təmizliyi</a>
            <a href="${rootBase}/pages/xidmetler/ofis-temizliyi.html" class="nav__dropdown-item"><span class="icon">💼</span> Ofis Təmizliyi</a>
          </div>
        </div>

        <a href="${rootBase}/pages/haqqimizda.html" class="nav__link ${activePage === 'haqqimizda' ? 'is-active' : ''}">Haqqımızda</a>
        <a href="${rootBase}/pages/qiymetler.html" class="nav__link ${activePage === 'qiymetler' ? 'is-active' : ''}">Qiymətlər</a>
        <a href="${rootBase}/pages/portfolio.html" class="nav__link ${activePage === 'portfolio' ? 'is-active' : ''}">Portfolio</a>
        <a href="${rootBase}/pages/musteri-reyleri.html" class="nav__link ${activePage === 'reyleri' ? 'is-active' : ''}">Rəylər</a>
        <a href="${rootBase}/pages/elaqe.html" class="nav__link ${activePage === 'elaqe' ? 'is-active' : ''}">Əlaqə</a>
      </nav>

      <div class="header__cta">
        <a href="tel:${SITE_CONFIG.nap.phone}" class="header__phone" aria-label="Zəng edin">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          ${SITE_CONFIG.nap.phoneDisplay}
        </a>
        <a href="https://wa.me/${SITE_CONFIG.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefault)}" class="btn btn--whatsapp btn--sm" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ilə əlaqə">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.126 1.528 5.86L.06 23.524a.5.5 0 00.617.617l5.664-1.468A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.78 9.78 0 01-5.316-1.564l-.38-.228-3.364.873.898-3.289-.25-.396A9.78 9.78 0 012.18 12 9.82 9.82 0 0112 2.18 9.82 9.82 0 0121.82 12 9.82 9.82 0 0112 21.82z"/></svg>
          WhatsApp
        </a>
      </div>

      <button class="menu-toggle" id="menu-toggle" aria-label="Menyu" aria-expanded="false">
        <span class="menu-toggle__bar"></span>
      </button>
    </div>

    <div class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobil naviqasiya">
      <a href="${rootBase}/index.html" class="mobile-menu__link">Ana Səhifə</a>
      <a href="${rootBase}/pages/xidmetler.html" class="mobile-menu__link">Xidmətlər ▾</a>
      <div class="mobile-menu__submenu" id="mobile-services-submenu">
        <a href="${rootBase}/pages/xidmetler/ev-temizliyi.html" class="mobile-menu__link">🏠 Ev Təmizliyi</a>
        <a href="${rootBase}/pages/xidmetler/temir-sonrasi-temizlik.html" class="mobile-menu__link">🔨 Təmir Sonrası</a>
        <a href="${rootBase}/pages/xidmetler/obyekt-temizliyi.html" class="mobile-menu__link">🏢 Obyekt Təmizliyi</a>
        <a href="${rootBase}/pages/xidmetler/yumsaq-mebel-kimyavi-temizliyi.html" class="mobile-menu__link">🛋️ Mebel Təmizliyi</a>
        <a href="${rootBase}/pages/xidmetler/restoran-temizliyi.html" class="mobile-menu__link">🍽️ Restoran Təmizliyi</a>
        <a href="${rootBase}/pages/xidmetler/ofis-temizliyi.html" class="mobile-menu__link">💼 Ofis Təmizliyi</a>
      </div>
      <a href="${rootBase}/pages/haqqimizda.html" class="mobile-menu__link">Haqqımızda</a>
      <a href="${rootBase}/pages/qiymetler.html" class="mobile-menu__link">Qiymətlər</a>
      <a href="${rootBase}/pages/portfolio.html" class="mobile-menu__link">Portfolio</a>
      <a href="${rootBase}/pages/videolar.html" class="mobile-menu__link">Videolar</a>
      <a href="${rootBase}/pages/musteri-reyleri.html" class="mobile-menu__link">Müştəri Rəyləri</a>
      <a href="${rootBase}/pages/blog.html" class="mobile-menu__link">Blog</a>
      <a href="${rootBase}/pages/faq.html" class="mobile-menu__link">FAQ</a>
      <a href="${rootBase}/pages/elaqe.html" class="mobile-menu__link">Əlaqə</a>

      <div class="mobile-menu__cta">
        <a href="https://wa.me/${SITE_CONFIG.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefault)}" class="btn btn--whatsapp btn--full" target="_blank" rel="noopener noreferrer">
          WhatsApp ilə Yazın
        </a>
        <a href="tel:${SITE_CONFIG.nap.phone}" class="btn btn--primary btn--full">
          📞 ${SITE_CONFIG.nap.phoneDisplay}
        </a>
      </div>
    </div>
  `;

  document.body.prepend(header);

  // Mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('is-scrolled', currentScroll > 50);
    lastScroll = currentScroll;
  }, { passive: true });
}
