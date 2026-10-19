'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import Calculator from '@/components/Calculator';
import { DEFAULT_SERVICES } from '@/lib/data';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ServiceDetailClient({ slug, initialService }) {
  const [service, setService] = useState(initialService || null);

  useEffect(() => {
    const fetchFromDb = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'services', slug));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setService({
            slug: data.slug || slug,
            title: data.name || data.title,
            icon: data.icon || '✨',
            scene: data.scene || 'home',
            calc: data.calc || 'area',
            tagline: data.tagline || '',
            description: data.description || '',
            points: data.points || []
          });
        }
      } catch (e) {
        console.warn('Firestore service sync notice:', e);
      }
    };
    fetchFromDb();
  }, [slug]);

  if (!service) return null;

  const otherServices = DEFAULT_SERVICES.filter((s) => s.slug !== slug);

  return (
    <SiteLayout scene={service.scene}>
      <section className="hero container service-hero">
        <div className="hero-text">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Ana səhifə</Link> / <Link href="/xidmetler">Xidmətlər</Link> / <span>{service.title}</span>
          </nav>
          <span className="chip">{service.icon} {service.tagline}</span>
          <h1>{service.title}</h1>
          <p className="lead">{service.description}</p>
          
          <ul className="ticks">
            {service.points?.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>
          
          <a className="btn btn-primary" href="#kalkulyator" id="cta-calc">
            Qiyməti hesabla
          </a>
        </div>
      </section>

      <section className="section container" id="kalkulyator">
        <h2 className="section-title">{service.title} kalkulyatoru</h2>
        <p className="section-sub">Qiyməti hesabla, məlumatlarını yaz və sifarişi WhatsApp ilə təsdiqlə.</p>
        
        <Calculator
          key={service.slug}
          serviceSlug={service.slug}
          serviceTitle={service.title}
          calcType={service.calc}
        />
      </section>

      <section className="section container">
        <h2 className="section-title">Digər xidmətlər</h2>
        <div className="cards">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              className="card glass group cursor-pointer"
              href={`/xidmetler/${s.slug}`}
            >
              <span className="card-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.tagline}</p>
              <span className="card-link">Ətraflı və Hesabla →</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
