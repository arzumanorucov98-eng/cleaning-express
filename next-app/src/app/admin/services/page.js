'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { DEFAULT_SERVICES } from '@/lib/data';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    tagline: '',
    icon: '🏠',
    scene: 'home',
    calc: 'area',
    points: '',
    description: ''
  });

  const servicesCollectionRef = collection(db, 'services');

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await getDocs(servicesCollectionRef);
      setServices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (e) {
      console.warn('Fetch services error:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && !isEditing && !formData.slug) {
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
      setFormData(prev => ({ ...prev, name: value, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    const pointsArray = typeof formData.points === 'string'
      ? formData.points.split('\n').map(p => p.trim()).filter(Boolean)
      : (formData.points || []);

    const dataToSave = {
      name: formData.name,
      title: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: formData.price,
      tagline: formData.tagline || '',
      icon: formData.icon || '✨',
      scene: formData.scene || 'home',
      calc: formData.calc || 'area',
      points: pointsArray,
      description: formData.description
    };

    try {
      if (isEditing) {
        const serviceDoc = doc(db, 'services', currentId);
        await updateDoc(serviceDoc, dataToSave);
        setMsg('Xidmət uğurla yeniləndi!');
      } else {
        const docId = dataToSave.slug;
        await setDoc(doc(db, 'services', docId), dataToSave, { merge: true });
        setMsg('Yeni xidmət uğurla əlavə olundu!');
      }

      setIsEditing(false);
      setCurrentId(null);
      setFormData({
        name: '',
        slug: '',
        price: '',
        tagline: '',
        icon: '🏠',
        scene: 'home',
        calc: 'area',
        points: '',
        description: ''
      });
      fetchServices();
      setTimeout(() => setMsg(''), 4000);
    } catch (err) {
      setMsg('Xəta baş verdi: ' + err.message);
    }
  };

  const editService = (service) => {
    setIsEditing(true);
    setCurrentId(service.id);
    const pointsStr = Array.isArray(service.points)
      ? service.points.join('\n')
      : (service.points || '');

    setFormData({
      name: service.name || service.title || '',
      slug: service.slug || service.id || '',
      price: service.price || '',
      tagline: service.tagline || '',
      icon: service.icon || '🏠',
      scene: service.scene || 'home',
      calc: service.calc || 'area',
      points: pointsStr,
      description: service.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteService = async (id) => {
    if (window.confirm('Bu xidməti silmək istədiyinizə əminsiniz?')) {
      const serviceDoc = doc(db, 'services', id);
      await deleteDoc(serviceDoc);
      fetchServices();
    }
  };

  const handleSyncDefaults = async () => {
    if (!window.confirm('Saytın 6 əsas xidmətini Firebase bazasına köçürmək istəyirsiniz?')) return;
    setLoading(true);
    try {
      for (const service of DEFAULT_SERVICES) {
        const serviceData = {
          name: service.title,
          title: service.title,
          slug: service.slug,
          price: service.slug === 'ev-temizliyi' ? '50 AZN-dən' :
                 service.slug === 'temir-sonrasi-temizlik' ? '120 AZN-dən' :
                 service.slug === 'yumsaq-mebel-kimyavi-temizliyi' ? '20 AZN-dən' :
                 service.slug === 'obyekt-temizliyi' ? '80 AZN-dən' :
                 service.slug === 'restoran-temizliyi' ? '100 AZN-dən' : '60 AZN-dən',
          icon: service.icon,
          scene: service.scene,
          calc: service.calc,
          tagline: service.tagline,
          description: service.description,
          points: service.points
        };
        await setDoc(doc(db, 'services', service.slug), serviceData, { merge: true });
      }
      setMsg('Bütün 6 xidmət uğurla Firebase bazasına yükləndi!');
      fetchServices();
      setTimeout(() => setMsg(''), 4000);
    } catch (e) {
      setMsg('Xəta: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem' }}>
            Xidmətlər və Qiymətlər İdarəetməsi
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
            Saytda təqdim olunan bütün təmizlik xidmətlərini, qiymətlərini və kalkulyator parametrlərini idarə edin.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSyncDefaults}
          className="admin-btn"
          style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.8rem' }}
        >
          🔄 Əsas Xidmətləri Bazaya Sinxronlaşdır
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
      <div className="admin-card" style={{ maxWidth: '950px' }}>
        <h2 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '0 0 1.25rem' }}>
          {isEditing ? '✏️ Xidməti Redaktə Et' : '➕ Yeni Xidmət Əlavə Et'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="admin-label">Xidmətin Adı</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="Məs: Ev təmizliyi"
              />
            </div>

            <div>
              <label className="admin-label">URL Slug</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="ev-temizliyi"
              />
            </div>

            <div>
              <label className="admin-label">Başlanğıc Qiymət (AZN)</label>
              <input
                type="text"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="50 AZN-dən"
              />
            </div>

            <div>
              <label className="admin-label">İkon / Emoji</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="🏠 və ya ✨"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="admin-label">Qısa Şüar (Tagline)</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="Evinizdə hər guşə parıldasın"
              />
            </div>

            <div>
              <label className="admin-label">Kalkulyator Tipi</label>
              <select
                name="calc"
                value={formData.calc}
                onChange={handleInputChange}
                className="admin-select"
              >
                <option value="area">Sahə əsaslı (m², otaq, sanuzel)</option>
                <option value="furniture">Yumşaq mebel əsaslı (divan, kreslo, stul)</option>
              </select>
            </div>

            <div>
              <label className="admin-label">Arxa Fon Səhnəsi (Scene)</label>
              <select
                name="scene"
                value={formData.scene}
                onChange={handleInputChange}
                className="admin-select"
              >
                <option value="home">Ev səhnəsi (home.jpg)</option>
                <option value="renovation">Təmir səhnəsi (renovation.jpg)</option>
                <option value="furniture">Mebel səhnəsi (furniture.jpg)</option>
                <option value="object">Obyekt səhnəsi (object.jpg)</option>
                <option value="restaurant">Restoran səhnəsi (restaurant.jpg)</option>
                <option value="office">Ofis səhnəsi (office.jpg)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="admin-label">Xidmət Üstünlükləri (Hər sətirdə biri)</label>
              <textarea
                name="points"
                rows={4}
                value={formData.points}
                onChange={handleInputChange}
                className="admin-textarea"
                placeholder={"Otaq, mətbəx və sanuzelin tam təmizliyi\nPəncərə və güzgülərin parıltısı\nToz və ləkələrdən dərin təmizlik"}
              />
            </div>

            <div>
              <label className="admin-label">Ətraflı Açıqlama</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="admin-textarea"
                placeholder="Mənzil və həyət evlərinin ümumi və dərin təmizliyi..."
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: '',
                    slug: '',
                    price: '',
                    tagline: '',
                    icon: '🏠',
                    scene: 'home',
                    calc: 'area',
                    points: '',
                    description: ''
                  });
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
              {isEditing ? 'Dəyişiklikləri Yadda Saxla' : 'Xidməti Əlavə Et'}
            </button>
          </div>
        </form>
      </div>

      {/* Services List Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1rem', color: '#ffffff', margin: 0 }}>Firebase Bazadakı Xidmətlər</h3>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Cəmi: {services.length} xidmət</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#0e1524', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Xidmət Adı</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Qiymət</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Qısa Şüar</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Tip</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ padding: '2.5rem', textAlign: 'center', color: '#9ca3af' }}>
                    Yüklənir...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '2.5rem', textAlign: 'center', color: '#9ca3af' }}>
                    Hələ heç bir xidmət tapılmadı. Yuxarıdakı "Əsas Xidmətləri Bazaya Sinxronlaşdır" düyməsinə basaraq hazır 6 xidməti yükləyə bilərsiniz.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr
                    key={service.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.15s' }}
                  >
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#ffffff' }}>
                      <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>{service.icon || '✨'}</span>
                      {service.name || service.title}
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#60a5fa', fontWeight: 400, marginTop: '2px' }}>
                        /xidmetler/{service.slug || service.id}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#34d399', fontWeight: 600 }}>
                      {service.price}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#9ca3af', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {service.tagline || service.description}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '6px',
                        background: service.calc === 'furniture' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                        color: service.calc === 'furniture' ? '#c084fc' : '#93c5fd'
                      }}>
                        {service.calc === 'furniture' ? '🛋️ Mebel' : '📐 Sahə'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <button
                        onClick={() => editService(service)}
                        style={{
                          background: 'rgba(59, 130, 246, 0.15)',
                          color: '#60a5fa',
                          border: 'none',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          marginRight: '0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        Redaktə et
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#f87171',
                          border: 'none',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
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
