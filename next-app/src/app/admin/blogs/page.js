'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { DEFAULT_BLOGS } from '@/lib/data';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    imageUrl: '',
    author: 'Cleaning Express Admin',
    seoTitle: '',
    seoDescription: ''
  });

  const blogsCollectionRef = collection(db, 'blogs');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getDocs(blogsCollectionRef);
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (e) {
      console.warn('Fetch blogs error:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title' && !isEditing) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9əıöğüçş]+/gi, '-')
        .replace(/ə/g, 'e')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ç/g, 'c')
        .replace(/ş/g, 's')
        .replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, title: value, slug: generatedSlug });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const blogDoc = doc(db, 'blogs', currentId);
      await updateDoc(blogDoc, { ...formData, updatedAt: serverTimestamp() });
      setIsEditing(false);
      setCurrentId(null);
    } else {
      await addDoc(blogsCollectionRef, { ...formData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    }
    
    setMsg(isEditing ? 'Məqalə uğurla yeniləndi!' : 'Yeni məqalə uğurla əlavə edildi!');
    setTimeout(() => setMsg(''), 4000);
    setFormData({ title: '', slug: '', content: '', imageUrl: '', author: 'Cleaning Express Admin', seoTitle: '', seoDescription: '' });
    fetchBlogs();
  };

  const editBlog = (blog) => {
    setIsEditing(true);
    setCurrentId(blog.id);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      content: blog.content || '',
      imageUrl: blog.imageUrl || '',
      author: blog.author || 'Admin',
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [msg, setMsg] = useState('');

  const handleSyncDefaults = async () => {
    if (!window.confirm('Saytın 5 əsas SEO məqaləsini Firebase bazasına köçürmək istəyirsiniz?')) return;
    setLoading(true);
    try {
      for (const blog of DEFAULT_BLOGS) {
        const blogData = {
          title: blog.title,
          slug: blog.slug,
          description: blog.description,
          content: blog.content,
          author: blog.author || 'Cleaning Express Admin',
          date: blog.date || '2026-10-10',
          imageUrl: blog.imageUrl || '',
          seoTitle: `${blog.title} — Cleaning Express Service`,
          seoDescription: blog.description
        };
        await setDoc(doc(db, 'blogs', blog.slug), blogData, { merge: true });
      }
      setMsg('Bütün 5 məqalə uğurla Firebase bazasına yükləndi!');
      fetchBlogs();
      setTimeout(() => setMsg(''), 4000);
    } catch (e) {
      setMsg('Xəta: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm('Bu məqaləni silmək istədiyinizə əminsiniz?')) {
      const blogDoc = doc(db, 'blogs', id);
      await deleteDoc(blogDoc);
      fetchBlogs();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem' }}>
            Bloqlar və Məqalələr İdarəetməsi
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
            Yeni SEO məqalələri əlavə edin, mövcud məqalələri redaktə edin və ya silin.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSyncDefaults}
          className="admin-btn"
          style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.8rem' }}
        >
          🔄 Əsas Məqalələri Bazaya Sinxronlaşdır
        </button>
      </div>

      {msg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          color: '#34d399',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          {msg}
        </div>
      )}

      {/* Form Card */}
      <div className="admin-card" style={{ maxWidth: '850px' }}>
        <h2 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '0 0 1.25rem' }}>
          {isEditing ? '✏️ Məqaləni Redaktə Et' : '➕ Yeni Məqalə Yaz'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="admin-label">Məqalə Başlığı</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="admin-input"
              placeholder="Məs: Ev təmizliyində ən çox buraxılan səhvlər"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="admin-label">URL Slug (Avtomatik formalaşır)</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="ev-temizliyinde-sehvler"
              />
            </div>

            <div>
              <label className="admin-label">Şəkil URL-i (İstəyə bağlı)</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="https://..."
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="admin-label">Məqalə Mətni (HTML və ya adi mətn)</label>
            <textarea
              name="content"
              required
              rows={8}
              value={formData.content}
              onChange={handleInputChange}
              className="admin-textarea"
              placeholder="Məqalənin əsas mətnini buraya daxil edin..."
            />
          </div>

          {/* SEO Block */}
          <div style={{ padding: '1rem', background: '#0e1524', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa', display: 'block', marginBottom: '0.85rem' }}>
              🔍 Məqalə üçün Axtarış (Google) Tənzimləmələri
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="admin-label">Google Başlığı (SEO Title)</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="Google axtarışında görünəcək başlıq"
                />
              </div>
              <div>
                <label className="admin-label">Google Açıqlaması (SEO Description)</label>
                <input
                  type="text"
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="Axtarışda çıxacaq qısa cəlbedici mətn"
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ title: '', slug: '', content: '', imageUrl: '', author: 'Admin', seoTitle: '', seoDescription: '' });
                }}
                className="admin-btn"
                style={{ background: '#374151', color: '#e5e7eb' }}
              >
                İmtina
              </button>
            )}
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
            >
              {isEditing ? 'Məqaləni Yenilə' : 'Məqaləni Dərc Et'}
            </button>
          </div>
        </form>
      </div>

      {/* Blogs List */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1rem', color: '#ffffff', margin: 0 }}>Firebase-dəki Məqalələr</h3>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Cəmi: {blogs.length} məqalə</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#0e1524', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Məqalə Başlığı</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>URL Ünvanı</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" style={{ padding: '2.5rem', textAlign: 'center', color: '#9ca3af' }}>
                    Yüklənir...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ padding: '2.5rem', textAlign: 'center', color: '#9ca3af' }}>
                    Hələ yeni məqalə yazılmayıb. Sayt ilkin olaraq 5 peşəkar SEO bloqundan istifadə edir.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#ffffff' }}>
                      {blog.title}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#60a5fa', fontSize: '0.8rem' }}>
                      /bloq/{blog.slug}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <button
                        onClick={() => editBlog(blog)}
                        style={{
                          background: 'rgba(59, 130, 246, 0.15)',
                          color: '#60a5fa',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          marginRight: '0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        Redaktə
                      </button>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#f87171',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
