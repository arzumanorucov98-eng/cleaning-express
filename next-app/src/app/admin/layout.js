'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import './admin.css';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-400 font-medium">Yüklənir...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Breadcrumb helper
  const getBreadcrumbTitle = () => {
    if (pathname === '/admin') return 'İdarəetmə Paneli';
    if (pathname.includes('/admin/services')) return 'Xidmətlər & Qiymətlər';
    if (pathname.includes('/admin/blogs')) return 'Bloqlar & Məqalələr';
    if (pathname.includes('/admin/seo')) return 'SEO & Meta Teqlər';
    if (pathname.includes('/admin/settings')) return 'Əlaqə & Sosial Şəbəkələr';
    return 'İdarəetmə';
  };

  const navItems = [
    {
      category: 'ƏSAS MENYU',
      items: [
        {
          label: 'İdarəetmə Paneli',
          href: '/admin',
          exact: true,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          )
        }
      ]
    },
    {
      category: 'MƏZMUN İDARƏETMƏSİ',
      items: [
        {
          label: 'Xidmətlər & Qiymətlər',
          href: '/admin/services',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )
        },
        {
          label: 'Bloqlar & Məqalələr',
          href: '/admin/blogs',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )
        }
      ]
    },
    {
      category: 'SİSTEM VƏ AXTARIŞ',
      items: [
        {
          label: 'SEO & Meta Teqlər',
          href: '/admin/seo',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )
        },
        {
          label: 'Əlaqə & Sosial',
          href: '/admin/settings',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo-icon">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="admin-brand-info">
            <h2>Cleaning Express</h2>
            <span>Admin Portal</span>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map((group, gIdx) => (
            <div key={gIdx}>
              <div className="admin-nav-category">{group.category}</div>
              {group.items.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`admin-nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="admin-nav-category" style={{ marginTop: 'auto' }}>SAYT</div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-link"
            style={{ color: '#60a5fa' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Saytı Canlı Aç ↗</span>
          </a>
        </nav>

        {/* User Card & Logout */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-card">
            <div className="admin-avatar">
              {(user.email || 'A')[0].toUpperCase()}
            </div>
            <div className="admin-user-details">
              <div className="admin-user-email">{user.email}</div>
              <div className="admin-user-role">Baş Admin</div>
            </div>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="admin-btn-logout"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sistemdən Çıxış</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main-wrap">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-breadcrumbs">
            <span>Admin</span>
            <span>/</span>
            <span style={{ color: '#60a5fa' }}>{getBreadcrumbTitle()}</span>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-status-pill">
              <span className="admin-status-dot"></span>
              <span>Canlı Sistem</span>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-link-live"
            >
              <span>Sayta Bax</span>
              <span>↗</span>
            </a>
          </div>
        </header>

        {/* Body */}
        <main className="admin-body">
          {children}
        </main>
      </div>
    </div>
  );
}
