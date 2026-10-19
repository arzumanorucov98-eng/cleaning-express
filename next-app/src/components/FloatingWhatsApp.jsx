'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { DEFAULT_SETTINGS } from '@/lib/data';

export default function FloatingWhatsApp() {
  const [whatsapp, setWhatsapp] = useState(DEFAULT_SETTINGS.whatsapp);

  useEffect(() => {
    const fetchWa = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'global'));
        if (snap.exists() && snap.data().whatsapp) {
          setWhatsapp(snap.data().whatsapp);
        }
      } catch (e) {
        // silent fallback
      }
    };
    fetchWa();
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=Salam!%20Cleaning%20Express%20Service%20sayt%C4%B1ndan%20yaz%C4%B1ram.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ilə əlaqə"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-medium text-sm border-2 border-white/20"
      id="floating-whatsapp"
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .3-3.3-.7-2.8-1.2-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
      </svg>
      <span className="hidden sm:inline font-bold">WhatsApp</span>
    </a>
  );
}
