'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import Calculator from '@/components/Calculator';
import { DEFAULT_SERVICES, DEFAULT_SETTINGS } from '@/lib/data';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [selectedCalcService, setSelectedCalcService] = useState('ev-temizliyi');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings
        const settingsSnap = await getDoc(doc(db, 'settings', 'global'));
        if (settingsSnap.exists()) {
          setSettings(prev => ({ ...prev, ...settingsSnap.data() }));
        }

        // Fetch custom services from Firestore if any
        const servicesSnap = await getDocs(collection(db, 'services'));
        if (!servicesSnap.empty) {
          const loaded = servicesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          // Merge or supplement default services
          if (loaded.length > 0) {
            // map loaded services into format
            const mapped = loaded.map((s, index) => ({
              slug: s.slug || `service-${index}`,
              title: s.name || s.title,
              icon: s.icon || '✨',
              scene: s.scene || 'home',
              calc: s.calc || 'area',
              tagline: s.tagline || s.description || 'Peşəkar təmizlik',
              description: s.description || '',
              points: s.points || ['Yüksək keyfiyyət', 'Təcrübəli komanda', 'Sərfəli qiymət']
            }));
            setServices(mapped);
          }
        }
      } catch (err) {
        console.warn('Firebase data fetch note:', err);
      }
    };

    fetchData();
  }, []);

  const handleCardHover = (sceneName) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('change-scene', { detail: { scene: sceneName } }));
    }
  };

  const activeService = services.find(s => s.slug === selectedCalcService) || services[0];

  return (
    <SiteLayout scene="home">
      {/* Hero Section */}
      <section className="hero container" id="hero">
        <div className="hero-text">
          <h1>
            Təmizlik <span className="grad">sürətlə</span>, keyfiyyət <span className="grad">zəmanətlə</span>
          </h1>
          <p className="lead">
            {settings.description ||
              'Ev, ofis, restoran, obyekt, təmir sonrası və yumşaq mebel təmizliyi. Onlayn kalkulyator ilə qiyməti dərhal öyrən, sifarişi WhatsApp ilə təsdiqlə.'}
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#xidmetler" id="cta-services">
              Xidmətlərə bax
            </a>
            <a
              className="btn btn-wa"
              href={`https://wa.me/${settings.whatsapp}?text=Salam!%20T%C9%99mizlik%20xidm%C9%99ti%20bar%C9%99d%C9%99%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m.`}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .3-3.3-.7-2.8-1.2-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <ul className="stats">
            <li>
              <b>{services.length}</b>
              <span>xidmət növü</span>
            </li>
            <li>
              <b>24/7</b>
              <span>sifariş qəbulu</span>
            </li>
            <li>
              <b>1 dəq</b>
              <span>qiymət hesabı</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section container" id="xidmetler">
        <h2 className="section-title">Xidmətlərimiz</h2>
        <p className="section-sub">
          Kartın üzərinə gələndə arxa fondakı səhnə həmin xidmətin real prosesinə keçir.
        </p>

        <div className="cards">
          {services.map((s) => (
            <Link
              key={s.slug}
              className="card glass group cursor-pointer"
              href={`/xidmetler/${s.slug}`}
              onMouseEnter={() => handleCardHover(s.scene)}
              id={`card-${s.slug}`}
            >
              <span className="card-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.tagline}</p>
              <span className="card-link">Qiyməti hesabla →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="section container" id="kalkulyator">
        <h2 className="section-title">Onlayn Qiymət Kalkulyatoru</h2>
        <p className="section-sub">
          Xidmət növünü seçin, parametrləri yazın və qiyməti canlı görün.
        </p>

        {/* Service selector tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {services.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => {
                setSelectedCalcService(s.slug);
                handleCardHover(s.scene);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                selectedCalcService === s.slug
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                  : 'bg-white/10 hover:bg-white/20 text-white/80 border-white/10'
              }`}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </div>

        {/* Dynamic Calculator Component */}
        <Calculator
          key={activeService.slug}
          serviceSlug={activeService.slug}
          serviceTitle={activeService.title}
          calcType={activeService.calc || 'area'}
        />
      </section>

      {/* How it Works Section */}
      <section className="section container" id="nece-isleyir">
        <h2 className="section-title">Necə işləyir?</h2>
        <div className="steps">
          <div className="step glass">
            <b>1</b>
            <h3>Xidməti seç</h3>
            <p>Ehtiyacınıza uyğun təmizlik növünü müəyyənləşdirin.</p>
          </div>
          <div className="step glass">
            <b>2</b>
            <h3>Qiyməti hesabla</h3>
            <p>Sahə, otaq və ya əşya sayını yazın, qiymət dərhal hesablansın.</p>
          </div>
          <div className="step glass">
            <b>3</b>
            <h3>Məlumatlarını yaz</h3>
            <p>Ad, nömrə, ünvan, arzuladığınız tarix və vaxtı daxil edin.</p>
          </div>
          <div className="step glass">
            <b>4</b>
            <h3>WhatsApp ilə təsdiqlə</h3>
            <p>Bütün detallar bir kliklə operatorumuza göndərilir.</p>
          </div>
        </div>
      </section>

      {/* Work Process / Videos Section */}
      <section className="section container" id="videolar">
        <h2 className="section-title">İş Proseslərimiz</h2>
        <p className="section-sub">Real təmizlik prosesimizi və komandamızın işini izləyin.</p>
        <div className="shorts-grid">
          <div className="glass p-8 rounded-2xl text-center text-white/80 border border-white/10">
            <span className="text-4xl block mb-2">✨</span>
            <p className="text-base font-medium">Bütün təmizlik işlərimiz beynəlxalq gigiyena standartlarına və müasir avadanlıqlara uyğun həyata keçirilir.</p>
            <p className="text-sm text-white/60 mt-2">Daha ətraflı video və foto nümunələr üçün Instagram və TikTok səhifəmizi izləyə bilərsiniz.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
