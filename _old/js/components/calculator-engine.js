// =============================================
// CALCULATOR ENGINE
// =============================================
// PRICING data (from pricing.js) and buildWhatsAppUrl (from whatsapp.js) 
// are expected to be loaded before this file.

class CalculatorEngine {
  constructor(type, containerId) {
    this.type = type; // 'ev-temizliyi', 'temir-sonrasi', 'obyekt', 'yumsaq-mebel', 'restoran', 'ofis'
    this.container = document.getElementById(containerId);
    this.config = typeof PRICING !== 'undefined' ? PRICING[type] : null;
    this.currentTotal = 0;
    this.formData = {};
    
    if (this.container && this.config) {
      this.init();
    }
  }

  init() {
    this.renderForm();
    this.attachEvents();
    this.calculate(); // Initial calculation
  }

  renderForm() {
    let html = '<form id="calc-form" class="calc-form">';
    
    // Add specific fields based on calculator type
    switch (this.type) {
      case 'ev-temizliyi':
        html += this.renderEvTemizliyiFields();
        break;
      case 'temir-sonrasi':
        html += this.renderTemirSonrasiFields();
        break;
      case 'obyekt':
        html += this.renderObyektFields();
        break;
      case 'yumsaq-mebel':
        html += this.renderMebelFields();
        break;
      case 'restoran':
        html += this.renderRestoranFields();
        break;
      case 'ofis':
        html += this.renderOfisFields();
        break;
    }

    // Add extras if they exist for this type
    if (this.config.extras && this.config.extras.length > 0) {
      html += this.renderExtras();
    }

    // Render result area
    html += \`
      </form>
      <div class="calculator__result">
        <p class="calculator__result-label">Təxmini Qiymət:</p>
        <div>
          <span class="calculator__result-price" id="calc-result">0</span>
          <span class="calculator__result-currency">AZN</span>
        </div>
        <p class="calculator__result-note">* Yekun qiymət mütəxəssis baxışından sonra dəqiqləşdirilir.</p>
        
        <div class="calculator__cta">
          <button type="button" class="btn btn--whatsapp" id="calc-whatsapp-btn">
            WhatsApp ilə Sifariş
          </button>
          <a href="tel:\${typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.nap.phone : ''}" class="btn btn--primary">
            Zəng Et
          </a>
        </div>
      </div>
    \`;

    this.container.innerHTML = html;
  }

  // --- Field Renderers ---

  renderNumberInput(id, label, min = 0, value = 0, suffix = '') {
    return \`
      <div class="form-group">
        <label class="form-label" for="\${id}">\${label}</label>
        <div class="number-input">
          <button type="button" class="number-input__btn js-num-minus" data-target="\${id}">-</button>
          <input type="number" class="number-input__value js-calc-input" id="\${id}" name="\${id}" min="\${min}" value="\${value}" readonly>
          <button type="button" class="number-input__btn js-num-plus" data-target="\${id}">+</button>
          \${suffix ? \`<span>\${suffix}</span>\` : ''}
        </div>
      </div>
    \`;
  }

  renderSelectInput(id, label, options) {
    let optionsHtml = options.map(opt => \`<option value="\${opt.id}">\${opt.name}</option>\`).join('');
    return \`
      <div class="form-group">
        <label class="form-label" for="\${id}">\${label}</label>
        <select class="form-select js-calc-input" id="\${id}" name="\${id}">
          \${optionsHtml}
        </select>
      </div>
    \`;
  }

  renderRangeInput(id, label, min, max, value, step = 1, suffix = '') {
    return \`
      <div class="form-group">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
          <label class="form-label" for="\${id}" style="margin-bottom:0;">\${label}</label>
          <span class="form-range-value"><span id="\${id}-val">\${value}</span> \${suffix}</span>
        </div>
        <input type="range" class="form-range js-calc-input js-range-input" id="\${id}" name="\${id}" min="\${min}" max="\${max}" step="\${step}" value="\${value}">
      </div>
    \`;
  }

  renderExtras() {
    let html = \`
      <div class="form-group" style="margin-top: 24px;">
        <label class="form-label">Əlavə Xidmətlər</label>
        <div class="calc-extras">
    \`;

    this.config.extras.forEach(extra => {
      // If extra has a price per unit (like windows), make it a number input instead of checkbox
      if (extra.unit && extra.unit !== 'm²' && extra.unit !== '') {
         html += \`
          <div class="calc-extra" style="grid-column: 1 / -1; display:flex; justify-content:space-between;">
            <label class="calc-extra__label" style="margin-bottom:0;">\${extra.name} (+\${extra.price} AZN/\${extra.unit})</label>
            <div class="number-input">
              <button type="button" class="number-input__btn js-num-minus" data-target="extra_\${extra.id}">-</button>
              <input type="number" class="number-input__value js-calc-input js-extra-qty" id="extra_\${extra.id}" name="extra_\${extra.id}" data-price="\${extra.price}" min="0" value="0" readonly style="width:40px; height:30px; font-size:14px;">
              <button type="button" class="number-input__btn js-num-plus" data-target="extra_\${extra.id}">+</button>
            </div>
          </div>
        \`;
      } else {
        // Standard checkbox
        html += \`
          <label class="calc-extra">
            <input type="checkbox" class="js-calc-input js-extra-checkbox" name="extra_\${extra.id}" value="\${extra.price}" data-name="\${extra.name}">
            <span class="calc-extra__label">\${extra.name}</span>
            <span class="calc-extra__price">+\${extra.price} \${extra.unit === 'm²' ? 'AZN/m²' : 'AZN'}</span>
          </label>
        \`;
      }
    });

    html += '</div></div>';
    return html;
  }

  // --- Specific Form Renders ---

  renderEvTemizliyiFields() {
    return \`
      \${this.renderRangeInput('area', 'Evin sahəsi', 30, 300, 70, 5, 'm²')}
      <div class="calc-row">
        \${this.renderSelectInput('type', 'Təmizlik növü', this.config.types)}
        \${this.renderSelectInput('rooms', 'Otaq sayı', [
          {id: 1, name: '1 otaq'}, {id: 2, name: '2 otaq'}, 
          {id: 3, name: '3 otaq'}, {id: 4, name: '4 otaq'}, {id: 5, name: '5+ otaq'}
        ])}
      </div>
    \`;
  }

  renderTemirSonrasiFields() {
    return \`
      \${this.renderRangeInput('area', 'Obyektin sahəsi', 40, 500, 80, 5, 'm²')}
      <div class="calc-row">
        \${this.renderSelectInput('objType', 'Obyekt tipi', this.config.objectTypes)}
        \${this.renderSelectInput('pollution', 'Çirklənmə səviyyəsi', this.config.pollutionLevels)}
      </div>
    \`;
  }

  renderObyektFields() {
    return \`
      \${this.renderRangeInput('area', 'Obyektin sahəsi', 50, 1000, 100, 10, 'm²')}
      <div class="calc-row">
        \${this.renderSelectInput('period', 'Təmizlik tezliyi', this.config.periodicity)}
      </div>
    \`;
  }

  renderOfisFields() {
    return \`
      \${this.renderRangeInput('area', 'Ofisin sahəsi', 30, 500, 100, 10, 'm²')}
      <div class="calc-row">
        \${this.renderSelectInput('freq', 'Təmizlik tezliyi', this.config.frequencies)}
        \${this.renderSelectInput('rooms', 'Otaq sayı (Sanitar qovşaq xaric)', [
          {id: 1, name: '1 otaq'}, {id: 2, name: '2 otaq'}, 
          {id: 3, name: '3 otaq'}, {id: 4, name: '4 otaq'}, {id: '6+', name: '6+ otaq'}
        ])}
      </div>
      <div class="form-group">
        <label class="form-label">Sanitar qovşaq sayı</label>
        <div class="number-input">
          <button type="button" class="number-input__btn js-num-minus" data-target="sanitar"> - </button>
          <input type="number" class="number-input__value js-calc-input" id="sanitar" name="sanitar" min="0" value="1" readonly>
          <button type="button" class="number-input__btn js-num-plus" data-target="sanitar"> + </button>
        </div>
      </div>
    \`;
  }

  renderRestoranFields() {
    return \`
      <div class="form-group" style="margin-bottom: 24px;">
        <label class="form-label">Sahələr (m²)</label>
        <div class="calc-row">
          \${this.renderNumberInput('area_metbex', 'Mətbəx sahəsi', 0, 30, 'm²')}
          \${this.renderNumberInput('area_zal', 'Zal sahəsi', 0, 50, 'm²')}
        </div>
      </div>
      <div class="calc-row">
        \${this.renderNumberInput('sanitar', 'Sanitar qovşaq sayı', 0, 2)}
        \${this.renderSelectInput('freq', 'Təmizlik tezliyi', this.config.frequencies)}
      </div>
    \`;
  }

  renderMebelFields() {
    let html = '<div class="form-group"><label class="form-label">Mebellərin sayı</label><div class="mebel-items">';
    
    this.config.items.forEach(item => {
      html += \`
        <div class="mebel-item">
          <div class="mebel-item__info">
            <div class="mebel-item__name">\${item.name}</div>
            <div class="mebel-item__price">\${item.price} \${item.isPerSqm ? 'AZN/m²' : 'AZN'}</div>
          </div>
          <div class="number-input">
            <button type="button" class="number-input__btn js-num-minus" data-target="item_\${item.id}">-</button>
            <input type="number" class="number-input__value js-calc-input js-mebel-qty" id="item_\${item.id}" name="item_\${item.id}" data-price="\${item.price}" data-sqm="\${item.isPerSqm ? 'true' : 'false'}" min="0" value="0" readonly style="width:40px; height:30px; font-size:14px;">
            <button type="button" class="number-input__btn js-num-plus" data-target="item_\${item.id}">+</button>
          </div>
        </div>
      \`;
    });
    
    html += '</div></div>';
    return html;
  }

  // --- Events & Calculation ---

  attachEvents() {
    // Inputs change
    const inputs = this.container.querySelectorAll('.js-calc-input');
    inputs.forEach(input => {
      input.addEventListener('change', () => this.calculate());
      input.addEventListener('input', (e) => {
        // Update range value display immediately
        if (e.target.classList.contains('js-range-input')) {
          const valDisplay = document.getElementById(\`\${e.target.id}-val\`);
          if (valDisplay) valDisplay.textContent = e.target.value;
          this.calculate();
        }
      });
    });

    // Plus/Minus buttons
    const minusBtns = this.container.querySelectorAll('.js-num-minus');
    const plusBtns = this.container.querySelectorAll('.js-num-plus');

    minusBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        let val = parseInt(input.value) || 0;
        let min = parseInt(input.getAttribute('min')) || 0;
        if (val > min) {
          input.value = val - 1;
          this.calculate();
        }
      });
    });

    plusBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        let val = parseInt(input.value) || 0;
        let max = parseInt(input.getAttribute('max')) || 999;
        if (val < max) {
          input.value = val + 1;
          this.calculate();
        }
      });
    });

    // WhatsApp Button
    const waBtn = document.getElementById('calc-whatsapp-btn');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        if (typeof buildWhatsAppUrl === 'function') {
          const url = buildWhatsAppUrl(this.type, this.formData, this.currentTotal);
          window.open(url, '_blank');
        }
      });
    }
  }

  calculate() {
    let total = 0;
    this.formData = {}; // Reset data for WhatsApp message
    const form = document.getElementById('calc-form');
    if (!form) return;

    const data = new FormData(form);

    switch (this.type) {
      case 'ev-temizliyi':
        const area = parseFloat(data.get('area')) || 0;
        const type = data.get('type');
        const rooms = parseInt(data.get('rooms')) || 1;
        
        const pricePerSqm = this.config.perSqm[type];
        const roomAdd = this.config.roomSurcharge[rooms] || 0;
        
        total = (area * pricePerSqm) + roomAdd;
        
        this.formData = {
          Sahə: area + ' m²',
          'Təmizlik növü': this.config.types.find(t => t.id === type)?.name,
          'Otaq sayı': rooms
        };
        break;

      case 'temir-sonrasi':
        const tArea = parseFloat(data.get('area')) || 0;
        const objType = data.get('objType');
        const pol = data.get('pollution');
        
        const tPricePerSqm = this.config.perSqm[objType];
        const mult = this.config.pollutionMultiplier[pol];
        
        total = tArea * tPricePerSqm * mult;
        
        this.formData = {
          Sahə: tArea + ' m²',
          'Obyekt tipi': this.config.objectTypes.find(t => t.id === objType)?.name,
          'Çirklənmə': this.config.pollutionLevels.find(t => t.id === pol)?.name
        };
        break;

      case 'obyekt':
        const oArea = parseFloat(data.get('area')) || 0;
        const period = data.get('period');
        
        // Find multiplier
        const pObj = this.config.periodicity.find(p => p.id === period);
        const pMult = pObj ? pObj.multiplier : 1.0;
        
        // Base price is birdefelik
        const oBase = this.config.perSqm.birdefеlik;
        
        total = oArea * oBase * pMult;
        
        this.formData = {
          Sahə: oArea + ' m²',
          'Tezlik': pObj?.name
        };
        break;

      case 'ofis':
        const ofArea = parseFloat(data.get('area')) || 0;
        const ofFreq = data.get('freq');
        const ofRooms = data.get('rooms');
        const ofSanitar = parseInt(data.get('sanitar')) || 0;
        
        const ofBasePrice = ofArea * this.config.perSqm;
        const ofRoomAdd = this.config.roomSurcharge[ofRooms] || 0;
        const ofSanitarAdd = ofSanitar * this.config.sanitarPrice;
        
        const ofMult = this.config.frequencyMultiplier[ofFreq] || 1.0;
        
        total = (ofBasePrice + ofRoomAdd + ofSanitarAdd) * ofMult;
        
        this.formData = {
          Sahə: ofArea + ' m²',
          'Otaq sayı': ofRooms,
          'Sanitar qovşaq': ofSanitar,
          'Tezlik': this.config.frequencies.find(f => f.id === ofFreq)?.name
        };
        break;

      case 'restoran':
        const rMetbex = parseFloat(data.get('area_metbex')) || 0;
        const rZal = parseFloat(data.get('area_zal')) || 0;
        const rSanitar = parseInt(data.get('sanitar')) || 0;
        const rFreq = data.get('freq');
        
        const rMetbexPrice = rMetbex * this.config.areas.metbex.pricePerSqm;
        const rZalPrice = rZal * this.config.areas.zal.pricePerSqm;
        const rSanitarPrice = rSanitar * this.config.areas.sanitar.pricePerUnit;
        
        const rMult = this.config.frequencyMultiplier[rFreq] || 1.0;
        
        total = (rMetbexPrice + rZalPrice + rSanitarPrice) * rMult;
        
        this.formData = {
          'Mətbəx sahəsi': rMetbex + ' m²',
          'Zal sahəsi': rZal + ' m²',
          'Sanitar qovşaq': rSanitar,
          'Tezlik': this.config.frequencies.find(f => f.id === rFreq)?.name
        };
        
        // If all 0, total 0 (don't apply minimum)
        if (rMetbex === 0 && rZal === 0 && rSanitar === 0) total = 0;
        break;

      case 'yumsaq-mebel':
        let mTotal = 0;
        let mItems = [];
        
        const qtyInputs = this.container.querySelectorAll('.js-mebel-qty');
        qtyInputs.forEach(input => {
          const qty = parseInt(input.value) || 0;
          if (qty > 0) {
            const price = parseFloat(input.getAttribute('data-price')) || 0;
            mTotal += qty * price;
            
            // Get item name for form data
            const id = input.id.replace('item_', '');
            const itemObj = this.config.items.find(i => i.id === id);
            if (itemObj) {
              mItems.push(\`\${itemObj.name}: \${qty}\${itemObj.isPerSqm ? ' m²' : ' ədəd'}\`);
            }
          }
        });
        
        total = mTotal;
        this.formData = {
          'Mebellər': mItems.length > 0 ? mItems.join(', ') : 'Seçilməyib'
        };
        break;
    }

    // Add Extras for all types (if they exist)
    if (this.config.extras) {
      let extrasArr = [];
      
      // Checkboxes
      const checkboxes = this.container.querySelectorAll('.js-extra-checkbox:checked');
      checkboxes.forEach(cb => {
        let price = parseFloat(cb.value) || 0;
        // If per sqm, multiply by area (except mebel)
        if (cb.parentNode.textContent.includes('/m²')) {
          const area = parseFloat(data.get('area')) || 0;
          price = price * area;
        }
        total += price;
        extrasArr.push(cb.getAttribute('data-name'));
      });
      
      // Quantity extras
      const extraQtys = this.container.querySelectorAll('.js-extra-qty');
      extraQtys.forEach(eq => {
        const qty = parseInt(eq.value) || 0;
        if (qty > 0) {
          const price = parseFloat(eq.getAttribute('data-price')) || 0;
          total += qty * price;
          const id = eq.id.replace('extra_', '');
          const exObj = this.config.extras.find(e => e.id === id);
          if (exObj) {
            extrasArr.push(\`\${exObj.name}: \${qty}\`);
          }
        }
      });
      
      if (extrasArr.length > 0) {
        this.formData['Əlavələr'] = extrasArr.join(', ');
      }
    }

    // Apply minimum if total > 0
    if (total > 0 && typeof applyMinimum === 'function') {
      total = applyMinimum(total, this.config.minimumPrice);
    }

    // Format and display
    this.currentTotal = total;
    const resultEl = document.getElementById('calc-result');
    if (resultEl) {
      resultEl.textContent = typeof formatPrice === 'function' ? formatPrice(total) : Math.round(total);
    }
  }
}
