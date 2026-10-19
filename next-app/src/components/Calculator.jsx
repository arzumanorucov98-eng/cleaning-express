'use client';

import { useState, useEffect, useMemo } from 'react';
import { AREA_TARIFFS, FURNITURE_TARIFFS, DEFAULT_SETTINGS } from '@/lib/data';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Calculator({ serviceSlug = 'ev-temizliyi', serviceTitle = 'Ev təmizliyi', calcType = 'area' }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  
  // Area parameters
  const [sqm, setSqm] = useState('');
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [windows, setWindows] = useState(0);

  // Furniture items quantities
  const [furnitureQty, setFurnitureQty] = useState({
    divan: 0,
    kreslo: 0,
    stul: 0,
    matras: 0
  });

  // Customer order info
  const [minDate, setMinDate] = useState('');
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    surname: '',
    phone: '',
    address: '',
    date: '',
    time: '10:00'
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setMinDate(today);
    setOrderInfo(prev => ({ ...prev, date: prev.date || today }));
  }, []);

  // Fetch whatsapp number from settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'global'));
        if (snap.exists()) {
          const data = snap.data();
          if (data.whatsapp) {
            setSettings(prev => ({ ...prev, whatsapp: data.whatsapp }));
          }
        }
      } catch (e) {
        console.warn('Calculator settings fetch notice:', e);
      }
    };
    fetchSettings();
  }, []);

  const tariff = AREA_TARIFFS[serviceSlug] || AREA_TARIFFS['ev-temizliyi'];

  const { lines, total } = useMemo(() => {
    const calcLines = [];
    let sum = 0;

    if (calcType === 'furniture') {
      FURNITURE_TARIFFS.items.forEach(it => {
        const count = furnitureQty[it.id] || 0;
        if (count > 0) {
          const cost = count * it.price;
          calcLines.push({ label: `${it.name} × ${count}`, value: cost });
          sum += cost;
        }
      });
      sum = sum > 0 ? Math.max(sum, FURNITURE_TARIFFS.minimum) : 0;
    } else {
      const parsedSqm = parseFloat(sqm) || 0;
      if (parsedSqm > 0) {
        calcLines.push({ label: `Sahə ${parsedSqm} m²`, value: parsedSqm * tariff.perSqm });
      }
      if (rooms > 0) {
        calcLines.push({ label: `Otaq × ${rooms}`, value: rooms * tariff.perRoom });
      }
      if (bathrooms > 0) {
        calcLines.push({ label: `Sanuzel × ${bathrooms}`, value: bathrooms * tariff.perBathroom });
      }
      if (windows > 0) {
        calcLines.push({ label: `Pəncərə × ${windows}`, value: windows * tariff.perWindow });
      }
      sum = calcLines.reduce((acc, curr) => acc + curr.value, 0);
      sum = sum > 0 ? Math.max(sum, tariff.minimum) : 0;
    }

    return { lines: calcLines, total: sum };
  }, [calcType, sqm, rooms, bathrooms, windows, furnitureQty, tariff]);

  const handleStepChange = (setter, current, delta) => {
    setter(Math.max(0, current + delta));
  };

  const handleFurnitureStepChange = (id, delta) => {
    setFurnitureQty(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const handleOrderChange = (e) => {
    setOrderInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirmOrder = () => {
    setValidated(true);
    const { name, surname, phone, address, date, time } = orderInfo;

    if (!name.trim() || !surname.trim() || !phone.trim() || !address.trim() || !date || !time) {
      alert('Zəhmət olmasa, sifariş məlumatlarını tam doldurun.');
      return;
    }

    if (total <= 0) {
      alert('Zəhmət olmasa, təmizlik parametrlərini seçin.');
      return;
    }

    const [y, m, d] = date.split('-');
    const messageLines = [
      '*YENİ SİFARİŞ — Cleaning Express Service*',
      '',
      `*Xidmət:* ${serviceTitle}`,
      '',
      '*Hesablama detalları:*',
      ...lines.map(l => `• ${l.label} — ${Math.round(l.value)} ₼`),
      '',
      `*Yekun qiymət:* ${Math.round(total)} ₼`,
      '',
      '*Müştəri məlumatları:*',
      `• Ad Soyad: ${name.trim()} ${surname.trim()}`,
      `• Əlaqə nömrəsi: ${phone.trim()}`,
      `• Ünvan: ${address.trim()}`,
      `• Tarix: ${d}.${m}.${y}`,
      `• Vaxt: ${time}`
    ];

    const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(messageLines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="calc glass">
      {/* Inputs Section */}
      <div className="calc-inputs">
        <h3>{calcType === 'furniture' ? 'Əşyaları seç və sayını yaz' : 'Parametrləri daxil et'}</h3>
        
        {calcType === 'furniture' ? (
          <div className="space-y-3 mt-4">
            {FURNITURE_TARIFFS.items.map(it => {
              const count = furnitureQty[it.id] || 0;
              return (
                <div key={it.id} className={`furn ${count > 0 ? 'active' : ''}`}>
                  <div className="furn-name">
                    <span>{it.icon} {it.name}</span>
                    <small>{it.price} ₼ / ədəd</small>
                  </div>
                  <div className="stepper">
                    <button
                      type="button"
                      onClick={() => handleFurnitureStepChange(it.id, -1)}
                      aria-label="azalt"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={count}
                      onChange={(e) => setFurnitureQty(prev => ({ ...prev, [it.id]: Math.max(0, parseInt(e.target.value) || 0) }))}
                    />
                    <button
                      type="button"
                      onClick={() => handleFurnitureStepChange(it.id, 1)}
                      aria-label="artır"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            <div className="field">
              <label htmlFor="c-sqm">Ümumi sahə (m²)</label>
              <input
                id="c-sqm"
                type="number"
                min="0"
                value={sqm}
                onChange={(e) => setSqm(e.target.value)}
                placeholder="məs. 80"
                inputMode="decimal"
              />
            </div>

            <div className="row2">
              <div className="field">
                <label>Otaq sayı</label>
                <div className="stepper">
                  <button type="button" onClick={() => handleStepChange(setRooms, rooms, -1)}>−</button>
                  <input
                    type="number"
                    min="0"
                    value={rooms}
                    onChange={(e) => setRooms(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                  <button type="button" onClick={() => handleStepChange(setRooms, rooms, 1)}>+</button>
                </div>
              </div>

              <div className="field">
                <label>Sanuzel sayı</label>
                <div className="stepper">
                  <button type="button" onClick={() => handleStepChange(setBathrooms, bathrooms, -1)}>−</button>
                  <input
                    type="number"
                    min="0"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                  <button type="button" onClick={() => handleStepChange(setBathrooms, bathrooms, 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="field">
              <label>Pəncərə sayı</label>
              <div className="stepper">
                <button type="button" onClick={() => handleStepChange(setWindows, windows, -1)}>−</button>
                <input
                  type="number"
                  min="0"
                  value={windows}
                  onChange={(e) => setWindows(Math.max(0, parseInt(e.target.value) || 0))}
                />
                <button type="button" onClick={() => handleStepChange(setWindows, windows, 1)}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Aside */}
      <aside className="summary" aria-live="polite">
        <h3>Hesablama</h3>
        <ul id="sum-list">
          {lines.length > 0 ? (
            lines.map((l, i) => (
              <li key={i}>
                <span>{l.label}</span>
                <span>{Math.round(l.value)} ₼</span>
              </li>
            ))
          ) : (
            <li className="empty">Hesablamaq üçün parametrləri daxil edin</li>
          )}
        </ul>

        <div className="total">
          <span>Yekun qiymət:</span>
          <strong id="sum-total">{Math.round(total)} ₼</strong>
        </div>
      </aside>

      {/* Order Info Form */}
      <div className="order">
        <h3>Sifariş məlumatları</h3>
        <div className="order-grid">
          <div className="field">
            <label htmlFor="f-name">Ad</label>
            <input
              id="f-name"
              name="name"
              value={orderInfo.name}
              onChange={handleOrderChange}
              required
              placeholder="Adınız"
              className={validated && !orderInfo.name.trim() ? 'err' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="f-surname">Soyad</label>
            <input
              id="f-surname"
              name="surname"
              value={orderInfo.surname}
              onChange={handleOrderChange}
              required
              placeholder="Soyadınız"
              className={validated && !orderInfo.surname.trim() ? 'err' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="f-phone">Əlaqə nömrəsi</label>
            <input
              id="f-phone"
              name="phone"
              type="tel"
              value={orderInfo.phone}
              onChange={handleOrderChange}
              required
              placeholder="055 000 00 00"
              className={validated && !orderInfo.phone.trim() ? 'err' : ''}
            />
          </div>

          <div className="field wide">
            <label htmlFor="f-address">Ünvan</label>
            <input
              id="f-address"
              name="address"
              value={orderInfo.address}
              onChange={handleOrderChange}
              required
              placeholder="Rayon, küçə, bina, mənzil"
              className={validated && !orderInfo.address.trim() ? 'err' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="f-date">Tarix</label>
            <input
              id="f-date"
              name="date"
              type="date"
              min={minDate || undefined}
              value={orderInfo.date}
              onChange={handleOrderChange}
              required
              className={validated && !orderInfo.date ? 'err' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="f-time">Vaxt</label>
            <input
              id="f-time"
              name="time"
              type="time"
              value={orderInfo.time}
              onChange={handleOrderChange}
              required
              className={validated && !orderInfo.time ? 'err' : ''}
            />
          </div>
        </div>

        <button
          className="btn btn-wa btn-block"
          type="button"
          onClick={handleConfirmOrder}
          disabled={total <= 0}
        >
          Sifarişi təsdiqlə (WhatsApp)
        </button>
        <p className="note">Düyməyə basanda bütün məlumatlar WhatsApp-da hazır mesaj kimi açılacaq.</p>
      </div>
    </div>
  );
}
