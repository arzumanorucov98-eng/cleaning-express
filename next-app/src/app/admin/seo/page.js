'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SeoSettingsPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const [seoData, setSeoData] = useState({
    home: {
      title: 'Cleaning Express Service — Bakıda Peşəkar Təmizlik Xidməti',
      description: 'Bakıda evlərin, ofislərin, bağ evlərinin və təmirdən sonra obyektlərin peşəkar təmizlənməsi xidməti. Münasib qiymətlər və zəmanətli təmizlik.',
      keywords: 'temizlik xidmeti, ev temizliyi baki, ofis temizliyi, divan temizlenmesi, temirden sonra temizlik'
    },
    about: {
      title: 'Haqqımızda — Cleaning Express Service Baku',
      description: 'Cleaning Express Service haqqında ətraflı məlumat. Təcrübəli heyət, müasir avadanlıqlar və etibarlı xidmət yanaşmamız.',
      keywords: 'haqqimizda temizlik, peşəkar təmizlik şirkəti, cleaning express komandası'
    },
    services: {
      title: 'Xidmətlərimiz və Qiymətlər — Cleaning Express Service',
      description: 'Bütün təmizlik xidmətlərimiz: mənzil, ofis, xalça, pərdə və kimyəvi təmizləmə. Ən son qiymətlər və paketlər.',
      keywords: 'temizlik qiymetleri, baki temizlik paketleri, xalca yuma, mebel temizleme'
    },
    blogs: {
      title: 'Bloq və Faydalı Məsləhətlər — Cleaning Express',
      description: 'Ev və ofis təmizliyi haqqında peşəkar məsləhətlər, ləkə çıxarma üsulları və gigiyena qaydaları.',
      keywords: 'temizlik meslehetleri, leke cixarilmasi, mebel baximi'
    },
    contact: {
      title: 'Əlaqə — Cleaning Express Service',
      description: 'Bizimlə 7/24 əlaqə saxlayın. Təmizlik sifarişi üçün WhatsApp və ya birbaşa zəng edə bilərsiniz.',
      keywords: 'temizlik elaqe, temizlik sifarisi baki, temizlik nomresi'
    }
  });

  const seoDocRef = doc(db, 'settings', 'seo');

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        setLoading(true);
        const docSnap = await getDoc(seoDocRef);
        if (docSnap.exists()) {
          setSeoData((prev) => ({
            ...prev,
            ...docSnap.data()
          }));
        }
      } catch (err) {
        console.error('SEO məlumatları oxunarkən xəta:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeo();
  }, []);

  const handleInputChange = (pageKey, field, value) => {
    setSeoData((prev) => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        [field]: value
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await setDoc(seoDocRef, seoData, { merge: true });
      setMsg('SEO məlumatları uğurla yadda saxlanıldı!');
      setTimeout(() => setMsg(''), 4000);
    } catch (err) {
      setMsg('Xəta baş verdi: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { key: 'home', label: 'Ana Səhifə', path: '/' },
    { key: 'about', label: 'Haqqımızda', path: '/haqqimizda' },
    { key: 'services', label: 'Xidmətlər Kataloqu', path: '/xidmetler' },
    { key: 'blogs', label: 'Bloq və Məqalələr', path: '/bloq' },
    { key: 'contact', label: 'Əlaqə', path: '/#elaqe' }
  ];

  const current = seoData[activeTab] || { title: '', description: '', keywords: '' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem' }}>
            SEO & Meta Teqlər İdarəetməsi
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
            Google və digər axtarış sistemlərində saytınızın necə görünəcəyini hər səhifə üzrə tənzimləyin.
          </p>
        </div>
        {msg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#34d399',
            padding: '0.6rem 1.25rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600
          }}>
            {msg}
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ color: '#9ca3af', padding: '3rem', textAlign: 'center' }}>Məlumatlar yüklənir...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Tab naviqasiyası */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#6b7280', paddingLeft: '0.5rem', marginBottom: '0.25rem' }}>
              Səhifə Seçimi
            </span>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                style={{
                  textAlign: 'left',
                  padding: '0.9rem 1rem',
                  borderRadius: '12px',
                  border: activeTab === tab.key ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: activeTab === tab.key ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.25), rgba(37, 99, 235, 0.1))' : '#111827',
                  color: activeTab === tab.key ? '#60a5fa' : '#9ca3af',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: activeTab === tab.key ? '#ffffff' : '#e5e7eb' }}>
                  {tab.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: activeTab === tab.key ? '#93c5fd' : '#6b7280', marginTop: '0.2rem' }}>
                  {tab.path}
                </span>
              </button>
            ))}
          </div>

          {/* Form və Live Snippet Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <form onSubmit={handleSave} className="admin-card" style={{ margin: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '0 0 0.25rem' }}>
                    {tabs.find((t) => t.key === activeTab)?.label} Səhifəsi
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    Google axtarış başlığı, açıqlaması və açar sözlər
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? 'Saxlanılır...' : 'Yadda Saxla'}
                </button>
              </div>

              {/* Meta Title */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label className="admin-label">Səhifə Başlığı (Meta Title)</label>
                  <span style={{ fontSize: '0.75rem', color: (current.title || '').length > 60 ? '#f59e0b' : '#6b7280' }}>
                    {(current.title || '').length} / 60 simvol
                  </span>
                </div>
                <input
                  type="text"
                  value={current.title || ''}
                  onChange={(e) => handleInputChange(activeTab, 'title', e.target.value)}
                  placeholder="Məs: Cleaning Express Service — Peşəkar təmizlik xidməti"
                  className="admin-input"
                  required
                />
              </div>

              {/* Meta Description */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label className="admin-label">Açıqlama (Meta Description)</label>
                  <span style={{ fontSize: '0.75rem', color: (current.description || '').length > 160 ? '#f59e0b' : '#6b7280' }}>
                    {(current.description || '').length} / 160 simvol
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={current.description || ''}
                  onChange={(e) => handleInputChange(activeTab, 'description', e.target.value)}
                  placeholder="Səhifə haqqında axtarış sistemlərində görünəcək cəlbedici qısa mətn..."
                  className="admin-textarea"
                  required
                />
              </div>

              {/* Meta Keywords */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label className="admin-label">Açar Sözlər (Keywords - vergüllə ayırın)</label>
                <input
                  type="text"
                  value={current.keywords || ''}
                  onChange={(e) => handleInputChange(activeTab, 'keywords', e.target.value)}
                  placeholder="temizlik xidmeti, ev temizliyi baki, divan temizlenmesi"
                  className="admin-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? 'Yadda saxlanılır...' : 'Dəyişiklikləri Yadda Saxla'}
                </button>
              </div>
            </form>

            {/* Google Canlı Önizləmə (Google SERP Snippet Preview) */}
            <div className="admin-card" style={{ margin: 0, background: '#0e1524' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', display: 'block', marginBottom: '0.85rem' }}>
                🔍 Google Axtarış Nəticələrində Canlı Görünüş (SERP Preview)
              </span>
              <div style={{
                background: '#202124',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #303134',
                fontFamily: 'Arial, sans-serif'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#ffffff', fontWeight: 'bold' }}>
                    C
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                    <span style={{ fontSize: '12px', color: '#dadce0' }}>cleaningexpress.az</span>
                    <span style={{ fontSize: '11px', color: '#9aa0a6' }}>
                      https://cleaningexpress.az{tabs.find((t) => t.key === activeTab)?.path}
                    </span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  color: '#8ab4f8',
                  fontWeight: 400,
                  margin: '0 0 0.35rem',
                  lineHeight: 1.3,
                  cursor: 'pointer'
                }}>
                  {current.title || 'Səhifə Başlığı Bura Yazılacaq'}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#bdc1c6',
                  lineHeight: 1.5,
                  margin: 0
                }}>
                  {current.description || 'Səhifə açıqlaması burada axtarış edən istifadəçilərə aydın şəkildə təqdim olunacaq.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
