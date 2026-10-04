// Yüngül 2D effektlər: səhnənin üzərində qalxan köpük qabarcıqları və parıltılar.
export function startFx(canvas) {
  const g = canvas.getContext('2d');
  let w, h, dpr;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
  };
  resize();
  addEventListener('resize', resize);

  const bub = Array.from({ length: 34 }, () => spawnBubble(true));
  const spk = Array.from({ length: 16 }, () => spawnSpark());

  function spawnBubble(init) {
    return { x: (0.4 + Math.random() * 0.6) * innerWidth, y: init ? Math.random() * innerHeight : innerHeight + 20, r: 3 + Math.random() * 12, v: 18 + Math.random() * 40, ph: Math.random() * 6 };
  }
  function spawnSpark() {
    return { x: (0.45 + Math.random() * 0.55) * innerWidth, y: (0.15 + Math.random() * 0.7) * innerHeight, t: Math.random() * 3, s: 4 + Math.random() * 9 };
  }

  let last = performance.now();
  (function loop(now) {
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
      grad.addColorStop(0, 'rgba(255,255,255,0.55)');
      grad.addColorStop(0.7, 'rgba(180,225,255,0.12)');
      grad.addColorStop(1, 'rgba(255,255,255,0.65)');
      g.fillStyle = grad;
      g.beginPath(); g.arc(b.x, b.y, b.r, 0, 7); g.fill();
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
      g.shadowColor = '#9fdcff'; g.shadowBlur = 14;
      g.beginPath();
      g.moveTo(0, -r * 2); g.lineTo(r * 0.4, -r * 0.4); g.lineTo(r * 2, 0); g.lineTo(r * 0.4, r * 0.4);
      g.lineTo(0, r * 2); g.lineTo(-r * 0.4, r * 0.4); g.lineTo(-r * 2, 0); g.lineTo(-r * 0.4, -r * 0.4);
      g.fill();
      g.restore();
    }
    requestAnimationFrame(loop);
  })(last);
}
