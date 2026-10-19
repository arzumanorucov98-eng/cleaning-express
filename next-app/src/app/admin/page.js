'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Aktiv Xidmətlər',
      val: '6',
      sub: 'Kalkulyator ilə inteqrasiya olunub',
      icon: (
        <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      bg: 'rgba(59, 130, 246, 0.12)'
    },
    {
      label: 'SEO Bloq Məqalələri',
      val: '5',
      sub: 'Google axtarış sistemləri üçün hazır',
      icon: (
        <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      bg: 'rgba(16, 185, 129, 0.12)'
    },
    {
      label: 'SEO Səhifələri',
      val: '5',
      sub: 'Meta Title və Description konfiqurasiyası',
      icon: (
        <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      bg: 'rgba(168, 85, 247, 0.12)'
    },
    {
      label: 'Verilənlər Bazası',
      val: 'Firebase',
      sub: 'Firestore & Google Cloud aktivdir',
      icon: (
        <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      bg: 'rgba(245, 158, 11, 0.12)'
    }
  ];

  const modules = [
    {
      title: 'Xidmətlər və Qiymətlər',
      desc: 'Saytdakı təmizlik növlərini, otaq/sahə qiymətlərini və kalkulyator tariflərini idarə edin.',
      href: '/admin/services',
      badge: 'Xidmətlər',
      icon: (
        <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      title: 'Bloqlar və Məqalələr',
      desc: 'Yeni SEO məqalələri əlavə edin, mövcud yazıları redaktə edin, silin və oxunma sayını artırın.',
      href: '/admin/blogs',
      badge: 'Məqalə İdarəsi',
      icon: (
        <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )
    },
    {
      title: 'Google SEO və Meta Teqlər',
      desc: 'Ana səhifə, xidmətlər və bloq üçün Google axtarış başlıqları və açıqlamalarını canlı görünüşlə təyin edin.',
      href: '/admin/seo',
      badge: 'Axtarış Optimizasiyası',
      icon: (
        <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      title: 'Əlaqə və Sosial Şəbəkələr',
      desc: 'WhatsApp nömrənizi, telefon, ünvan, Instagram və TikTok linklərini saniyələr içində yeniləyin.',
      href: '/admin/settings',
      badge: 'Əlaqə Parametrləri',
      icon: (
        <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    }
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="admin-welcome-banner">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1>Xoş gəldiniz, Administrator 👋</h1>
          <p>
            Cleaning Express Service saytının bütün məlumatlarını (xidmətlər, qiymətlər, bloqlar, SEO və əlaqə vasitələri) bu mərkəzi paneldən təhlükəsiz şəkildə idarə edə bilərsiniz.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="admin-stats-grid">
        {stats.map((st, i) => (
          <div key={i} className="admin-stat-card">
            <div>
              <div className="admin-stat-label">{st.label}</div>
              <div className="admin-stat-value">{st.val}</div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: '0.2rem' }}>{st.sub}</div>
            </div>
            <div className="admin-stat-icon-wrap" style={{ background: st.bg }}>
              {st.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Modules Grid */}
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>İdarəetmə Bölmələri</h2>
          <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Dəyişiklik etmək istədiyiniz bölməni seçin</span>
        </div>
      </div>

      <div className="admin-cards-grid">
        {modules.map((m) => (
          <Link key={m.href} href={m.href} className="admin-module-card group">
            <div>
              <div className="admin-card-header">
                <div className="admin-card-icon">
                  {m.icon}
                </div>
                <span className="admin-card-badge">{m.badge}</span>
              </div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
            <div className="admin-card-cta">
              <span>Bölməni aç</span>
              <span style={{ transition: 'transform 0.2s' }}>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Info Footer Card */}
      <div style={{
        background: '#111827',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
          <span style={{ fontSize: '0.85rem', color: '#e5e7eb', fontWeight: 500 }}>
            Layihə gələcəkdə <strong>.az</strong> domeni və Hostinger/Firebase serverlərinə yerləşdirilmək üçün tam hazırdır.
          </span>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.8rem',
            color: '#60a5fa',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Canlı Sayta Keçid ↗
        </a>
      </div>
    </div>
  );
}
