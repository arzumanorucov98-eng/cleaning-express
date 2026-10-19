'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import { DEFAULT_SERVICES } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ServicesPage() {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDocs(collection(db, 'services'));
        if (!snap.empty) {
          const loaded = snap.docs.map(d => {
            const data = d.data();
            return {
              slug: data.slug || d.id,
              title: data.name || data.title,
              icon: data.icon || '✨',
              scene: data.scene || 'home',
              calc: data.calc || 'area',
              tagline: data.tagline || 'Peşəkar təmizlik',
              description: data.description || '',
              points: data.points || []
            };
          });
          setServices(loaded);
        }
      } catch (e) {
        console.warn('Fetch services notice:', e);
      }
    };
    fetchServices();
  }, []);

  return (
    <SiteLayout scene="home">
      <section className="hero container service-hero">
        <div className="hero-text">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Ana səhifə</Link> / <span>Xidmətlər</span>
          </nav>
          <span className="chip">🧹 Peşəkar və Zəmanətli Xidmət</span>
          <h1>Təmizlik Xidmətlərimiz</h1>
          <p className="lead">
            Eviniz, ofisiniz və obyektiniz üçün ən yüksək standartlara uyğun təmizlik xidmətləri.
            Hər xidmət üzrə onlayn kalkulyatordan istifadə edərək qiyməti dərhal hesablaya bilərsiniz.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="cards">
          {services.map((s) => (
            <Link
              key={s.slug}
              className="card glass group cursor-pointer"
              href={`/xidmetler/${s.slug}`}
              id={`card-${s.slug}`}
            >
              <span className="card-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.tagline}</p>
              <ul className="text-xs text-white/70 space-y-1 my-3 text-left">
                {s.points?.slice(0, 3).map((pt, i) => (
                  <li key={i}>✓ {pt}</li>
                ))}
              </ul>
              <span className="card-link">Qiyməti hesabla →</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
