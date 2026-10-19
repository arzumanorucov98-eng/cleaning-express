'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const SCENES = [
  { id: 'home', src: '/assets/scenes/home.jpg' },
  { id: 'renovation', src: '/assets/scenes/renovation.jpg' },
  { id: 'furniture', src: '/assets/scenes/furniture.jpg' },
  { id: 'object', src: '/assets/scenes/object.jpg' },
  { id: 'restaurant', src: '/assets/scenes/restaurant.jpg' },
  { id: 'office', src: '/assets/scenes/office.jpg' },
];

export default function SceneBackground({ forceScene }) {
  const canvasRef = useRef(null);
  const pathname = usePathname();
  const [activeScene, setActiveScene] = useState(forceScene || 'home');

  // Match scene based on route if not forced
  useEffect(() => {
    if (forceScene) {
      setActiveScene(forceScene);
      return;
    }

    if (pathname.includes('temir-sonrasi')) setActiveScene('renovation');
    else if (pathname.includes('yumsaq-mebel')) setActiveScene('furniture');
    else if (pathname.includes('obyekt')) setActiveScene('object');
    else if (pathname.includes('restoran')) setActiveScene('restaurant');
    else if (pathname.includes('ofis')) setActiveScene('office');
    else setActiveScene('home');
  }, [pathname, forceScene]);

  // Listen to custom scene change events (from hover on cards)
  useEffect(() => {
    const handleSceneEvent = (e) => {
      if (e.detail?.scene) {
        setActiveScene(e.detail.scene);
      }
    };
    window.addEventListener('change-scene', handleSceneEvent);
    return () => window.removeEventListener('change-scene', handleSceneEvent);
  }, []);

  // Floating sparkle & bubbles canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const g = canvas.getContext('2d');
    let animationId;
    let w, h, dpr;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    function spawnBubble(init) {
      return {
        x: (0.35 + Math.random() * 0.65) * window.innerWidth,
        y: init ? Math.random() * window.innerHeight : window.innerHeight + 20,
        r: 3 + Math.random() * 11,
        v: 18 + Math.random() * 38,
        ph: Math.random() * 6
      };
    }

    function spawnSpark() {
      return {
        x: (0.4 + Math.random() * 0.6) * window.innerWidth,
        y: (0.1 + Math.random() * 0.8) * window.innerHeight,
        t: Math.random() * 3,
        s: 4 + Math.random() * 9
      };
    }

    const bub = Array.from({ length: 28 }, () => spawnBubble(true));
    const spk = Array.from({ length: 14 }, () => spawnSpark());

    let last = performance.now();
    function loop(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);

      for (const b of bub) {
        b.y -= b.v * dt;
        b.ph += dt * 2;
        b.x += Math.sin(b.ph) * 10 * dt;
        if (b.y < -20) Object.assign(b, spawnBubble(false));
        const grad = g.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
        grad.addColorStop(0, 'rgba(255,255,255,0.6)');
        grad.addColorStop(0.7, 'rgba(180,225,255,0.15)');
        grad.addColorStop(1, 'rgba(255,255,255,0.7)');
        g.fillStyle = grad;
        g.beginPath();
        g.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        g.fill();
      }

      for (const s of spk) {
        s.t += dt;
        const k = Math.max(0, Math.sin(s.t * 2.2));
        if (s.t > 6.3) Object.assign(s, spawnSpark(), { t: 0 });
        const r = s.s * k;
        if (r < 0.3) continue;
        g.save();
        g.translate(s.x, s.y);
        g.fillStyle = `rgba(255,255,255,${k})`;
        g.shadowColor = '#9fdcff';
        g.shadowBlur = 12;
        g.beginPath();
        g.moveTo(0, -r * 2);
        g.lineTo(r * 0.4, -r * 0.4);
        g.lineTo(r * 2, 0);
        g.lineTo(r * 0.4, r * 0.4);
        g.lineTo(0, r * 2);
        g.lineTo(-r * 0.4, r * 0.4);
        g.lineTo(-r * 2, 0);
        g.lineTo(-r * 0.4, -r * 0.4);
        g.fill();
        g.restore();
      }

      animationId = requestAnimationFrame(loop);
    }

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <div className="scenes" id="scenes" aria-hidden="true">
        {SCENES.map((scene) => (
          <div
            key={scene.id}
            className={`scene-layer ${activeScene === scene.id ? 'is-active' : ''}`}
            data-layer={scene.id}
          >
            <img src={scene.src} alt="" loading="lazy" />
          </div>
        ))}
        <div className="shine"></div>
      </div>
      <canvas id="fx-canvas" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="bg-veil"></div>
    </>
  );
}
