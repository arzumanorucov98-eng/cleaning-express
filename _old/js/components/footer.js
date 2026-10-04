// =============================================
// FOOTER COMPONENT
// =============================================

function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('role', 'contentinfo');

  const isRoot = !window.location.pathname.includes('/pages/');
  const rootBase = isRoot ? '' : (window.location.pathname.includes('/xidmetler/') ? '../..' : '..');

  footer.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <!-- Brand -->
        <div class="footer__brand">
          <a href="${rootBase}/index.html" class="footer__logo">
            <span class="footer__logo-text">Cleanin<span>Express</span></span>
          </a>
          <p class="footer__description">${SITE_CONFIG.company.description}</p>
          <div class="footer__social">
            <a href="${SITE_CONFIG.social.instagram}" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="${SITE_CONFIG.social.facebook}" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="${SITE_CONFIG.social.youtube}" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="${SITE_CONFIG.social.tiktok}" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h3 class="footer__heading">Xidmətlər</h3>
          <div class="footer__links">
            <a href="${rootBase}/pages/xidmetler/ev-temizliyi.html" class="footer__link">Ev Təmizliyi</a>
            <a href="${rootBase}/pages/xidmetler/temir-sonrasi-temizlik.html" class="footer__link">Təmir Sonrası Təmizlik</a>
            <a href="${rootBase}/pages/xidmetler/obyekt-temizliyi.html" class="footer__link">Obyekt Təmizliyi</a>
            <a href="${rootBase}/pages/xidmetler/yumsaq-mebel-kimyavi-temizliyi.html" class="footer__link">Yumşaq Mebel Təmizliyi</a>
            <a href="${rootBase}/pages/xidmetler/restoran-temizliyi.html" class="footer__link">Restoran Təmizliyi</a>
            <a href="${rootBase}/pages/xidmetler/ofis-temizliyi.html" class="footer__link">Ofis Təmizliyi</a>
          </div>
        </div>

        <!-- Company -->
        <div>
          <h3 class="footer__heading">Şirkət</h3>
          <div class="footer__links">
            <a href="${rootBase}/pages/haqqimizda.html" class="footer__link">Haqqımızda</a>
            <a href="${rootBase}/pages/qiymetler.html" class="footer__link">Qiymətlər</a>
            <a href="${rootBase}/pages/portfolio.html" class="footer__link">Portfolio</a>
            <a href="${rootBase}/pages/videolar.html" class="footer__link">Videolar</a>
            <a href="${rootBase}/pages/blog.html" class="footer__link">Blog</a>
            <a href="${rootBase}/pages/faq.html" class="footer__link">FAQ</a>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="footer__heading">Əlaqə</h3>
          <div class="footer__contact-item">
            <svg class="footer__contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <a href="tel:${SITE_CONFIG.nap.phone}" class="footer__link">${SITE_CONFIG.nap.phoneFormatted}</a>
          </div>
          <div class="footer__contact-item">
            <svg class="footer__contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.126 1.528 5.86L.06 23.524a.5.5 0 00.617.617l5.664-1.468A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.78 9.78 0 01-5.316-1.564l-.38-.228-3.364.873.898-3.289-.25-.396A9.78 9.78 0 012.18 12 9.82 9.82 0 0112 2.18 9.82 9.82 0 0121.82 12 9.82 9.82 0 0112 21.82z"/></svg>
            <a href="https://wa.me/${SITE_CONFIG.contact.whatsapp.replace('+', '')}" class="footer__link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <div class="footer__contact-item">
            <svg class="footer__contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <a href="mailto:${SITE_CONFIG.contact.email}" class="footer__link">${SITE_CONFIG.contact.email}</a>
          </div>
          <div class="footer__contact-item">
            <svg class="footer__contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path></svg>
            <span class="footer__link">${SITE_CONFIG.nap.address.fullAddress}</span>
          </div>
          <div class="footer__contact-item">
            <svg class="footer__contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span class="footer__link">${SITE_CONFIG.workingHours.display}</span>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; ${new Date().getFullYear()} ${SITE_CONFIG.company.legalName}. Bütün hüquqlar qorunur.</p>
        <div class="footer__bottom-links">
          <!-- Bu linklər SEO üçün yaxşıdır, lazım olduqda səhifələrini yaratmaq olar -->
          <span class="footer__link">Məxfilik Siyasəti</span>
          <span class="footer__link">İstifadə Şərtləri</span>
        </div>
      </div>
    </div>
  `;

  // Insert footer before body ends
  document.body.appendChild(footer);

  // Add Floating CTA (WhatsApp)
  const floatingCTA = document.createElement('div');
  floatingCTA.className = 'floating-cta';
  floatingCTA.innerHTML = `
    <a href="https://wa.me/${SITE_CONFIG.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefault)}" class="floating-cta__btn floating-cta__btn--whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ilə yazın">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.126 1.528 5.86L.06 23.524a.5.5 0 00.617.617l5.664-1.468A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.78 9.78 0 01-5.316-1.564l-.38-.228-3.364.873.898-3.289-.25-.396A9.78 9.78 0 012.18 12 9.82 9.82 0 0112 2.18 9.82 9.82 0 0121.82 12 9.82 9.82 0 0112 21.82z"/></svg>
    </a>
  `;
  document.body.appendChild(floatingCTA);

  // Add Mobile Bottom Bar
  const mobileBottomBar = document.createElement('div');
  mobileBottomBar.className = 'mobile-bottom-bar';
  mobileBottomBar.innerHTML = `
    <div class="mobile-bottom-bar__inner">
      <a href="tel:${SITE_CONFIG.nap.phone}" class="mobile-bottom-bar__btn mobile-bottom-bar__btn--phone">
        📞 Zəng
      </a>
      <a href="https://wa.me/${SITE_CONFIG.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefault)}" class="mobile-bottom-bar__btn mobile-bottom-bar__btn--whatsapp" target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.126 1.528 5.86L.06 23.524a.5.5 0 00.617.617l5.664-1.468A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.78 9.78 0 01-5.316-1.564l-.38-.228-3.364.873.898-3.289-.25-.396A9.78 9.78 0 012.18 12 9.82 9.82 0 0112 2.18 9.82 9.82 0 0121.82 12 9.82 9.82 0 0112 21.82z"/></svg>
        WhatsApp
      </a>
    </div>
  `;
  document.body.appendChild(mobileBottomBar);
}
