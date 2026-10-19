'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { DEFAULT_SETTINGS } from '@/lib/data';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'global');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setSettings((prev) => ({
            ...prev,
            phone: data.phone || prev.phone,
            phoneTel: data.phone ? data.phone.replace(/[^0-9+]/g, '') : prev.phoneTel,
            whatsapp: data.whatsapp || prev.whatsapp,
            instagram: data.instagram || prev.instagram,
            tiktok: data.tiktok || prev.tiktok
          }));
        }
      } catch (err) {
        console.warn('Firebase settings load notice:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <header className="site-header" id="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Cleaning Express Service - Ana səhifə">
          <img
            src="/assets/images/logo_v3.png"
            alt="Cleaning Express Service loqosu"
            width={168}
            height={112}
            className="brand-logo"
          />
        </Link>

        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} id="main-nav" aria-label="Əsas menyu">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={pathname === '/' ? 'is-active' : ''}
          >
            Ana səhifə
          </Link>
          <Link
            href="/haqqimizda"
            onClick={() => setMenuOpen(false)}
            className={pathname === '/haqqimizda' ? 'is-active' : ''}
          >
            Haqqımızda
          </Link>

          <div className="nav-drop">
            <Link
              href="/xidmetler"
              onClick={() => setMenuOpen(false)}
              className={pathname.startsWith('/xidmetler') ? 'is-active' : ''}
            >
              Xidmətlər ▾
            </Link>
            <div className="nav-menu">
              <Link href="/xidmetler/ev-temizliyi" onClick={() => setMenuOpen(false)}>
                🏠 Ev təmizliyi
              </Link>
              <Link href="/xidmetler/temir-sonrasi-temizlik" onClick={() => setMenuOpen(false)}>
                🧱 Təmir sonrası təmizlik
              </Link>
              <Link href="/xidmetler/yumsaq-mebel-kimyavi-temizliyi" onClick={() => setMenuOpen(false)}>
                🛋️ Yumşaq mebel kimyəvi təmizliyi
              </Link>
              <Link href="/xidmetler/obyekt-temizliyi" onClick={() => setMenuOpen(false)}>
                🏢 Obyekt təmizliyi
              </Link>
              <Link href="/xidmetler/restoran-temizliyi" onClick={() => setMenuOpen(false)}>
                🍽️ Restoran təmizliyi
              </Link>
              <Link href="/xidmetler/ofis-temizliyi" onClick={() => setMenuOpen(false)}>
                💼 Ofis təmizliyi
              </Link>
            </div>
          </div>

          <Link
            href="/bloq"
            onClick={() => setMenuOpen(false)}
            className={pathname.startsWith('/bloq') ? 'is-active' : ''}
          >
            Bloq
          </Link>

          <Link href="/#elaqe" onClick={() => setMenuOpen(false)}>
            Əlaqə
          </Link>

          <Link
            href="/admin"
            onClick={() => setMenuOpen(false)}
            className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded border border-white/20 transition ml-2"
          >
            Admin Panel ⚙️
          </Link>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={`tel:${settings.phoneTel}`} id="header-phone">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
            </svg>
            <span>{settings.phone}</span>
          </a>

          {settings.instagram && (
            <a
              className="icon-btn"
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              id="header-instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
          )}

          {settings.tiktok && (
            <a
              className="icon-btn"
              href={settings.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              id="header-tiktok"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 3a5.4 5.4 0 0 0 4.4 4.7v3.4a8.8 8.8 0 0 1-4.3-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v3.5a2.7 2.7 0 1 0 1.8 2.5V3z" />
              </svg>
            </a>
          )}

          <button
            className="burger"
            id="burger"
            aria-label="Menyunu aç"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
