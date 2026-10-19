'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { DEFAULT_SETTINGS } from '@/lib/data';

export default function Footer() {
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
            tiktok: data.tiktok || prev.tiktok,
            facebook: data.facebook || prev.facebook,
            address: data.address || prev.address,
            email: data.email || prev.email
          }));
        }
      } catch (err) {
        console.warn('Firebase footer load notice:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="site-footer" id="elaqe">
      <div className="container footer-grid">
        <div>
          <Link href="/" aria-label="Cleaning Express Service">
            <img
              src="/assets/images/logo_v3.png"
              alt="Cleaning Express Service loqosu"
              className="footer-logo"
              width={168}
              height={112}
              loading="lazy"
            />
          </Link>
          <p className="muted">
            Ev, ofis, restoran, obyekt, təmir sonrası və yumşaq mebel təmizliyi. Onlayn kalkulyator ilə qiyməti dərhal öyrən, sifarişi WhatsApp ilə təsdiqlə.
          </p>
          {settings.address && (
            <p className="text-xs text-white/60 mt-3 flex items-center gap-1.5">
              <span>📍</span> {settings.address}
            </p>
          )}
        </div>

        <div>
          <h3>Xidmətlər</h3>
          <ul>
            <li><Link href="/xidmetler/ev-temizliyi">Ev təmizliyi</Link></li>
            <li><Link href="/xidmetler/temir-sonrasi-temizlik">Təmir sonrası təmizlik</Link></li>
            <li><Link href="/xidmetler/yumsaq-mebel-kimyavi-temizliyi">Yumşaq mebel kimyəvi təmizliyi</Link></li>
            <li><Link href="/xidmetler/obyekt-temizliyi">Obyekt təmizliyi</Link></li>
            <li><Link href="/xidmetler/restoran-temizliyi">Restoran təmizliyi</Link></li>
            <li><Link href="/xidmetler/ofis-temizliyi">Ofis təmizliyi</Link></li>
          </ul>
        </div>

        <div>
          <h3>Əlaqə</h3>
          <a className="footer-phone" href={`tel:${settings.phoneTel}`} id="footer-phone">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
            </svg>
            <span>{settings.phone}</span>
          </a>

          <a
            className="btn btn-wa"
            href={`https://wa.me/${settings.whatsapp}?text=Salam!%20Cleaning%20Express%20Service%20sayt%C4%B1ndan%20yaz%C4%B1ram.`}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-whatsapp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .3-3.3-.7-2.8-1.2-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
            </svg>
            <span>WhatsApp ilə yaz</span>
          </a>

          <div className="social-row">
            {settings.instagram && (
              <a
                className="icon-btn"
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                id="footer-instagram"
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
                id="footer-tiktok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.6 3a5.4 5.4 0 0 0 4.4 4.7v3.4a8.8 8.8 0 0 1-4.3-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v3.5a2.7 2.7 0 1 0 1.8 2.5V3z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container footer-sub">
        <p>© 2026 Cleaning Express Service. Bütün hüquqlar qorunur.</p>
      </div>
    </footer>
  );
}
