'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  
  const [formData, setFormData] = useState({
    phone: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    address: '',
    email: ''
  });

  const settingsDocRef = doc(db, 'settings', 'global');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const docSnap = await getDoc(settingsDocRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    } catch (e) {
      console.warn('Settings fetch note:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await setDoc(settingsDocRef, formData);
      setMsg('Məlumatlar uğurla yeniləndi!');
      setTimeout(() => setMsg(''), 4000);
    } catch (err) {
      setMsg('Xəta baş verdi: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
          Əlaqə və Sosial Şəbəkələr
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
          Burada qeyd etdiyiniz bütün nömrələr və sosial linklər saytın header, footer və düymələrində real vaxtda avtomatik yenilənir.
        </p>
      </div>

      <div className="admin-card" style={{ maxWidth: '850px' }}>
        {loading ? (
          <div style={{ color: '#9ca3af', padding: '2rem', textAlign: 'center' }}>Məlumatlar yüklənir...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Contact Group */}
            <div style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#60a5fa', margin: '0 0 0.25rem' }}>Əsas Əlaqə Vasitələri</h3>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Telefon və WhatsApp əlaqələri</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div>
                <label className="admin-label">Telefon Nömrəsi</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="+994 55 626 00 28"
                />
              </div>

              <div>
                <label className="admin-label">WhatsApp Nömrəsi (wa.me formatında)</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp || ''}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="994556260028"
                />
              </div>

              <div>
                <label className="admin-label">Rəsmi Email Ünvanı</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="info@cleaningexpress.az"
                />
              </div>

              <div>
                <label className="admin-label">Ofis / Ünvan</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="Bakı şəhəri, ..."
                />
              </div>
            </div>

            {/* Social Group */}
            <div style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#60a5fa', margin: '0 0 0.25rem' }}>Sosial Şəbəkələr</h3>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Instagram, TikTok və Facebook rəsmi səhifə linkləri</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div>
                <label className="admin-label">Instagram Linki</label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram || ''}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="https://instagram.com/cleaning.express.service..."
                />
              </div>

              <div>
                <label className="admin-label">TikTok Linki</label>
                <input
                  type="url"
                  name="tiktok"
                  value={formData.tiktok || ''}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="https://tiktok.com/@cleaning_express_baku..."
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label className="admin-label">Facebook Linki (İstəyə bağlı)</label>
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook || ''}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>

            {/* Footer and Submit */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 600 }}>
                {msg}
              </div>
              <button
                type="submit"
                disabled={saving}
                className="admin-btn admin-btn-success"
              >
                {saving ? 'Yadda saxlanılır...' : 'Məlumatları Yadda Saxla'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
