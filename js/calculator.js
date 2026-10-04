// Kalkulyator + WhatsApp sifariş formu. Tariflər js/data/tariffs.js-dən gəlir.
import { SITE } from './data/site-config.js';
import { AREA_TARIFFS, FURNITURE_TARIFFS } from './data/tariffs.js';

const money = (n) => `${Math.round(n * 100) / 100} ${SITE.currency}`;
const num = (v) => Math.max(0, parseFloat(v) || 0);

const stepper = (id, label, value = 0) => `
  <div class="field"><label for="${id}">${label}</label>
    <div class="stepper"><button type="button" data-step="-1" data-for="${id}" aria-label="azalt">−</button>
    <input id="${id}" type="number" min="0" value="${value}" inputmode="numeric" />
    <button type="button" data-step="1" data-for="${id}" aria-label="artır">+</button></div></div>`;

const orderForm = () => `
  <div class="order">
    <h3>Sifariş məlumatları</h3>
    <div class="order-grid">
      <div class="field"><label for="f-name">Ad</label><input id="f-name" required placeholder="Adınız" autocomplete="given-name" /></div>
      <div class="field"><label for="f-surname">Soyad</label><input id="f-surname" required placeholder="Soyadınız" autocomplete="family-name" /></div>
      <div class="field"><label for="f-phone">Əlaqə nömrəsi</label><input id="f-phone" type="tel" required placeholder="055 000 00 00" autocomplete="tel" /></div>
      <div class="field wide"><label for="f-address">Ünvan</label><input id="f-address" required placeholder="Rayon, küçə, bina, mənzil" autocomplete="street-address" /></div>
      <div class="field"><label for="f-date">Tarix</label><input id="f-date" type="date" required /></div>
      <div class="field"><label for="f-time">Vaxt</label><input id="f-time" type="time" required /></div>
    </div>
    <button class="btn btn-wa btn-block" id="confirm-order" type="button" disabled>Sifarişi təsdiqlə (WhatsApp)</button>
    <p class="note">Düyməyə basanda bütün məlumatlar WhatsApp-da hazır mesaj kimi açılacaq.</p>
  </div>`;

export function initCalculator(root) {
  const slug = root.dataset.service;
  const title = root.dataset.title;
  const type = root.dataset.type;
  const tariff = AREA_TARIFFS[slug];

  root.innerHTML = `
    <div class="calc-inputs">
      <h3>${type === 'furniture' ? 'Əşyaları seç və sayını yaz' : 'Parametrləri daxil et'}</h3>
      <div id="calc-fields"></div>
    </div>
    <aside class="summary" aria-live="polite">
      <h3>Hesablama</h3>
      <ul id="sum-list"></ul>
      <div class="total"><span>Yekun qiymət</span><strong id="sum-total">0 ${SITE.currency}</strong></div>
    </aside>
    ${orderForm()}`;

  const fields = root.querySelector('#calc-fields');
  if (type === 'furniture') {
    fields.innerHTML = FURNITURE_TARIFFS.items
      .map(
        (it) => `<div class="furn" data-item="${it.id}">
        <div class="furn-name">${it.icon} ${it.name}<small>${money(it.price)} / ədəd</small></div>
        <div class="stepper"><button type="button" data-step="-1" data-for="q-${it.id}" aria-label="azalt">−</button>
        <input id="q-${it.id}" type="number" min="0" value="0" inputmode="numeric" />
        <button type="button" data-step="1" data-for="q-${it.id}" aria-label="artır">+</button></div></div>`
      )
      .join('');
  } else {
    fields.innerHTML = `
      <div class="field"><label for="c-sqm">Ümumi sahə (m²)</label><input id="c-sqm" type="number" min="0" value="" placeholder="məs. 80" inputmode="decimal" /></div>
      <div class="row2">${stepper('c-rooms', 'Otaq sayı')}${stepper('c-bath', 'Sanuzel sayı')}</div>
      ${stepper('c-win', 'Pəncərə sayı')}`;
  }

  // Hesablama: detalları və yekunu qaytarır
  function compute() {
    const lines = [];
    let total = 0;
    if (type === 'furniture') {
      for (const it of FURNITURE_TARIFFS.items) {
        const q = Math.floor(num(root.querySelector(`#q-${it.id}`).value));
        root.querySelector(`[data-item="${it.id}"]`).classList.toggle('active', q > 0);
        if (q > 0) {
          lines.push({ label: `${it.name} × ${q}`, value: q * it.price });
          total += q * it.price;
        }
      }
      total = total > 0 ? Math.max(total, FURNITURE_TARIFFS.minimum) : 0;
    } else {
      const sqm = num(root.querySelector('#c-sqm').value);
      const rooms = Math.floor(num(root.querySelector('#c-rooms').value));
      const bath = Math.floor(num(root.querySelector('#c-bath').value));
      const win = Math.floor(num(root.querySelector('#c-win').value));
      if (sqm) lines.push({ label: `Sahə ${sqm} m²`, value: sqm * tariff.perSqm });
      if (rooms) lines.push({ label: `Otaq × ${rooms}`, value: rooms * tariff.perRoom });
      if (bath) lines.push({ label: `Sanuzel × ${bath}`, value: bath * tariff.perBathroom });
      if (win) lines.push({ label: `Pəncərə × ${win}`, value: win * tariff.perWindow });
      total = lines.reduce((a, l) => a + l.value, 0);
      total = total > 0 ? Math.max(total, tariff.minimum) : 0;
    }
    return { lines, total };
  }

  const list = root.querySelector('#sum-list');
  const totalEl = root.querySelector('#sum-total');
  const confirmBtn = root.querySelector('#confirm-order');
  let last = 0;

  function render() {
    const { lines, total } = compute();
    list.innerHTML = lines.length
      ? lines.map((l) => `<li><span>${l.label}</span><span>${money(l.value)}</span></li>`).join('')
      : '<li class="empty">Hesablamaq üçün dəyərləri daxil et</li>';
    totalEl.textContent = money(total);
    if (total !== last) {
      totalEl.classList.remove('pop');
      void totalEl.offsetWidth;
      totalEl.classList.add('pop');
      last = total;
    }
    confirmBtn.disabled = total <= 0;
    return { lines, total };
  }

  root.addEventListener('input', render);
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-step]');
    if (!b) return;
    const inp = root.querySelector(`#${b.dataset.for}`);
    inp.value = Math.max(0, Math.floor(num(inp.value)) + Number(b.dataset.step));
    render();
  });

  // Tarix defoltu: bu gün
  root.querySelector('#f-date').min = new Date().toISOString().slice(0, 10);

  confirmBtn.addEventListener('click', () => {
    const { lines, total } = render();
    const get = (id) => root.querySelector(id);
    const required = ['#f-name', '#f-surname', '#f-phone', '#f-address', '#f-date', '#f-time'];
    let ok = true;
    required.forEach((id) => {
      const bad = !get(id).value.trim();
      get(id).classList.toggle('err', bad);
      if (bad) ok = false;
    });
    if (!ok || total <= 0) {
      get('#f-name').closest('.order').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const [y, m, d] = get('#f-date').value.split('-');
    const msg = [
      '*YENİ SİFARİŞ — Cleaning Express Service*',
      '',
      `*Xidmət:* ${title}`,
      '',
      '*Hesablama detalları:*',
      ...lines.map((l) => `• ${l.label} — ${money(l.value)}`),
      '',
      `*Yekun qiymət:* ${money(total)}`,
      '',
      '*Müştəri məlumatları:*',
      `• Ad Soyad: ${get('#f-name').value.trim()} ${get('#f-surname').value.trim()}`,
      `• Əlaqə: ${get('#f-phone').value.trim()}`,
      `• Ünvan: ${get('#f-address').value.trim()}`,
      `• Tarix: ${d}.${m}.${y}`,
      `• Vaxt: ${get('#f-time').value}`,
    ].join('\n');
    window.open(`https://wa.me/${SITE.phone.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  render();
}
