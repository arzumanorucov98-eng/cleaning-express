'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const translateError = (err) => {
    const code = err.code || '';
    if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
      return 'Email və ya şifrə yanlışdır.';
    }
    if (code.includes('email-already-in-use')) {
      return 'Bu email ilə artıq admin hesabı mövcuddur. Zəhmət olmasa "Daxil Ol" seçin.';
    }
    if (code.includes('weak-password')) {
      return 'Şifrə ən azı 6 simvoldan ibarət olmalıdır.';
    }
    if (code.includes('invalid-email')) {
      return 'Düzgün email ünvanı daxil edin.';
    }
    return err.message || 'Xəta baş verdi.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    setLoading(true);

    try {
      if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email);
        setMsg('Şifrə yeniləmə linki poçt ünvanınıza göndərildi.');
      } else if (mode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
        setMsg('Admin hesabı uğurla yaradıldı! Yönləndirilirsiniz...');
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/admin');
      }
    } catch (err) {
      setError(translateError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top, #1e293b 0%, #0b0f19 100%)',
      padding: '1.5rem',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{
        background: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)'
          }}>
            ✨
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem' }}>
            Cleaning Express
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
            İdarəetmə Panelinə Giriş
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{
          display: 'flex',
          background: '#1f2937',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '1.5rem'
        }}>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setMsg(''); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '7px',
              border: 'none',
              background: mode === 'login' ? '#2563eb' : 'transparent',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Daxil Ol
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); setMsg(''); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '7px',
              border: 'none',
              background: mode === 'register' ? '#2563eb' : 'transparent',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Admin Yarat
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#f87171',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        {msg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#34d399',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#9ca3af', marginBottom: '0.4rem' }}>
              Email ünvanı
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cleaningexpress.az"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: '#1f2937',
                border: '1px solid #374151',
                color: '#ffffff',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9ca3af' }}>
                  Şifrə
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('reset'); setError(''); setMsg(''); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#60a5fa',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Şifrəni unutmusunuz?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: '#1f2937',
                  border: '1px solid #374151',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '8px',
              border: 'none',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1,
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Gözləyin...' : (
              mode === 'reset' ? 'Şifrəni Yenilə' :
              mode === 'register' ? 'Admin Hesabı Yarat' : 'Daxil Ol'
            )}
          </button>
        </form>

        {mode === 'reset' && (
          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setMsg(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#60a5fa',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              ← Giriş ekranına qayıt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
