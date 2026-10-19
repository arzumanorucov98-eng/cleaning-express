'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import { DEFAULT_BLOGS } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        if (!querySnapshot.empty) {
          const loaded = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // Merge with default blogs if not already existing
          const merged = [...loaded];
          DEFAULT_BLOGS.forEach(def => {
            if (!merged.some(b => b.slug === def.slug)) {
              merged.push(def);
            }
          });
          setBlogs(merged);
        }
      } catch (err) {
        console.warn('Firebase blogs fetch note:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <SiteLayout scene="home">
      <section className="hero container service-hero">
        <div className="hero-text text-center max-w-3xl mx-auto">
          <nav className="crumbs justify-center" aria-label="Breadcrumb">
            <Link href="/">Ana səhifə</Link> / <span>Bloq</span>
          </nav>
          <span className="chip">📚 Faydalı Məsləhətlər</span>
          <h1>Təmizlik və Gigiyena Bloqu</h1>
          <p className="lead">
            Eviniz və ofisiniz üçün peşəkar təmizlik tövsiyələri, ləkə çıxarma sirləri və düzgün qulluq qaydaları.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <article
              key={b.slug}
              className="card glass flex flex-col justify-between group hover:border-blue-400/80 transition-all duration-300"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-2 block">
                  {b.date || 'Təmizlik Məsləhəti'}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition mb-3 leading-snug">
                  {b.title}
                </h3>
                <p className="text-white/75 text-sm line-clamp-3 leading-relaxed mb-4">
                  {b.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/50">{b.author || 'Admin'}</span>
                <Link
                  href={`/bloq/${b.slug}`}
                  className="text-sm font-semibold text-blue-300 group-hover:text-white flex items-center gap-1 transition"
                >
                  Oxu →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
