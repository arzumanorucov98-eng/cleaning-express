'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import { DEFAULT_BLOGS } from '@/lib/data';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

export default function BlogDetailClient({ slug, initialBlog }) {
  const [blog, setBlog] = useState(initialBlog || null);

  useEffect(() => {
    const fetchFromDb = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'blogs', slug));
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
          return;
        }

        const q = query(collection(db, 'blogs'), where('slug', '==', slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setBlog({ id: snap.docs[0].id, ...snap.docs[0].data() });
        }
      } catch (e) {
        console.warn('Firestore blog sync notice:', e);
      }
    };
    fetchFromDb();
  }, [slug]);

  if (!blog) return null;

  const otherBlogs = DEFAULT_BLOGS.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <SiteLayout scene="home">
      <section className="hero container service-hero">
        <div className="hero-text text-center max-w-3xl mx-auto">
          <nav className="crumbs justify-center" aria-label="Breadcrumb">
            <Link href="/">Ana səhifə</Link> / <Link href="/bloq">Bloq</Link> / <span>Məqalə</span>
          </nav>
          <div className="flex items-center justify-center gap-3 text-xs text-white/60 mb-2">
            <span>📅 {blog.date || '2026'}</span>
            <span>•</span>
            <span>✍️ {blog.author || 'Cleaning Express'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">{blog.title}</h1>
        </div>
      </section>

      <article className="section container max-w-4xl mx-auto">
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 text-white/90 leading-relaxed text-base md:text-lg">
          <div
            className="prose prose-invert max-w-none space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Quick CTA Box inside article */}
          <div className="mt-12 p-6 rounded-2xl bg-blue-600/30 border border-blue-400/40 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Evinizdə və ya ofisinizdə peşəkar təmizlik istəyirsiniz?
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Cleaning Express Service komandası müasir avadanlıqlar və zəmanətli təmizlik ilə xidmətinizdədir.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/xidmetler" className="btn btn-primary text-sm py-2 px-5">
                Xidmətlər və Qiymətlər
              </Link>
              <a
                href="https://wa.me/994556260028?text=Salam!%20Bloq%20m%C9%99qal%C9%99nizi%20oxudum,%20t%C9%99mizlik%20sifarisi%20etm%C9%99k%20ist%C9%99yir%C9%99m."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa text-sm py-2 px-5"
              >
                WhatsApp ilə Sifariş
              </a>
            </div>
          </div>
        </div>

        {/* Other blogs */}
        {otherBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title text-2xl">Digər maraqlı məqalələr</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {otherBlogs.map((b) => (
                <Link
                  key={b.slug}
                  href={`/bloq/${b.slug}`}
                  className="card glass p-6 block hover:border-blue-400/80 transition"
                >
                  <span className="text-xs text-blue-300 font-medium block mb-2">{b.date}</span>
                  <h4 className="font-bold text-white text-base line-clamp-2 mb-2">{b.title}</h4>
                  <p className="text-xs text-white/70 line-clamp-2">{b.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </SiteLayout>
  );
}
