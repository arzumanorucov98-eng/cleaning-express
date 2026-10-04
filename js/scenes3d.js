// 3D səhnələr (Three.js). Hər xidmət üçün ayrıca səhnə: işçilər brend formasındadır
// (tünd göy + ağ, sinədə və kürəkdə Cleaning Express Service loqosu).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const C = {
  royal: 0x0a3fd1, navy: 0x0a1f6b, white: 0xffffff, ice: 0xbfe6ff, ice2: 0x7cc8ff,
  skin: 0xf0c29a, wood: 0xb98b5e, darkwood: 0x6b4a2f, green: 0x2f9e6b, grey: 0xcfd8e6,
};

/* ---------- kiçik köməkçilər ---------- */
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05, ...o });
const place = (m, x = 0, y = 0, z = 0) => (m.position.set(x, y, z), m);
const Bx = (w, h, d, color, o = {}) =>
  new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.max(0.004, Math.min(o.r ?? 0.04, w / 2, h / 2, d / 2) * 0.98)), std(color, o.m));
const Cy = (rt, rb, h, color, o = {}) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, o.seg || 28), std(color, o.m));
const Sp = (r, color, o = {}) => new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), std(color, o.m));
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const glass = (color = C.ice, opacity = 0.25) =>
  new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity, roughness: 0.05, metalness: 0.1, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false });

/* ---------- teksturalar ---------- */
function canvasTex(size, draw) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const bubbleTex = () =>
  canvasTex(64, (g, s) => {
    const r = g.createRadialGradient(s / 2, s / 2, s * 0.15, s / 2, s / 2, s / 2);
    r.addColorStop(0, 'rgba(255,255,255,0.08)');
    r.addColorStop(0.8, 'rgba(190,230,255,0.45)');
    r.addColorStop(1, 'rgba(255,255,255,0.95)');
    g.fillStyle = r;
    g.beginPath(); g.arc(s / 2, s / 2, s / 2 - 1, 0, 7); g.fill();
  });
const starTex = () =>
  canvasTex(64, (g, s) => {
    const r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.fillRect(0, 0, s, s);
    g.fillStyle = '#fff';
    g.beginPath();
    g.moveTo(s / 2, 2); g.lineTo(s * 0.57, s * 0.43); g.lineTo(s - 2, s / 2); g.lineTo(s * 0.57, s * 0.57);
    g.lineTo(s / 2, s - 2); g.lineTo(s * 0.43, s * 0.57); g.lineTo(2, s / 2); g.lineTo(s * 0.43, s * 0.43);
    g.fill();
  });

/* ---------- damcı (loqo elementi) ---------- */
function dropGeometry() {
  const pts = [];
  for (let i = 0; i <= 28; i++) {
    const a = (i / 28) * Math.PI;
    const y = -Math.cos(a);
    pts.push(new THREE.Vector2(Math.sin(a) * Math.pow((1 - y) / 2, 0.55) * 0.9 + 0.001, y * 0.9));
  }
  return new THREE.LatheGeometry(pts, 36);
}

/* ---------- işçi (real insan 2D Sprite) ---------- */
const workerMatWalk = new THREE.ShaderMaterial({
  uniforms: {
    map: { value: null },
    colorKey: { value: new THREE.Color(1, 1, 1) },
    threshold: { value: 0.15 }
  },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `uniform sampler2D map; uniform vec3 colorKey; uniform float threshold; varying vec2 vUv; void main() { vec4 c = texture2D(map, vUv); float diff = length(c.rgb - colorKey); if(diff < threshold) discard; gl_FragColor = c; }`,
  transparent: true,
  side: THREE.DoubleSide
});
const workerMatClean = workerMatWalk.clone();

// Şəkilləri yükləyirik
new THREE.TextureLoader().load('/assets/images/workers/walk.jpg', t => { t.colorSpace = THREE.SRGBColorSpace; workerMatWalk.uniforms.map.value = t; });
new THREE.TextureLoader().load('/assets/images/workers/clean.jpg', t => { t.colorSpace = THREE.SRGBColorSpace; workerMatClean.uniforms.map.value = t; });

function makeWorker(ctx) {
  const g = new THREE.Group();
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), workerMatWalk);
  plane.position.y = 0.8;
  g.add(plane);
  g.userData = { plane, t0: Math.random() * 6 };
  return g;
}

/* Hər kadr: rejimə uyğun hərəkət (2D sprite üçün) */
const MODES = {
  mop: (w, t) => { w.userData.plane.material = workerMatClean; w.rotation.y = w.userData.ry + Math.sin(t*2)*0.08; w.position.y = Math.abs(Math.sin(t*3))*0.01; },
  vacuum: (w, t) => { w.userData.plane.material = workerMatClean; w.rotation.y = w.userData.ry + Math.sin(t*3)*0.1; w.position.y = Math.abs(Math.sin(t*2))*0.02; },
  wipe: (w, t) => { w.userData.plane.material = workerMatClean; w.rotation.y = w.userData.ry + Math.sin(t*4)*0.08; },
  desk: (w, t) => { w.userData.plane.material = workerMatClean; w.rotation.y = w.userData.ry + Math.sin(t*2)*0.1; },
  squeegee: (w, t) => { w.userData.plane.material = workerMatClean; w.rotation.y = w.userData.ry + Math.sin(t*1.5)*0.12; w.position.y = Math.abs(Math.sin(t*4))*0.03; },
  walk: (w, t) => { w.userData.plane.material = workerMatWalk; w.rotation.y = w.userData.walkRy; w.position.y = Math.abs(Math.sin(t * 8)) * 0.05; },
};

function spawnWorker(ctx, { mode, tool, x, z, ry }) {
  const w = makeWorker(ctx);
  w.userData.targetPos = new THREE.Vector3(x, 0, z);
  
  // İşçi qapıdan/kənardan gəlir
  const sx = x > 0 ? x + 3 : x - 3;
  w.userData.startPos = new THREE.Vector3(sx, 0, z + 2.5);
  w.position.copy(w.userData.startPos);
  
  w.userData.ry = ry;
  w.userData.mode = mode;
  // Yeriyərkən hədəfə baxış
  w.userData.walkRy = Math.atan2(w.userData.startPos.x - w.userData.targetPos.x, w.userData.startPos.z - w.userData.targetPos.z);
  
  // Dummy alət obyektləri (effektlərin crash etməməsi üçün)
  w.userData.tool = new THREE.Object3D();
  w.userData.tool.position.set(0, 0.5, 0);
  w.add(w.userData.tool);

  return w;
}

const animWorker = (w, t) => {
  const tt = t + w.userData.t0;
  const tWalk = t; // səhnə yaranandan bəri vaxt
  if (tWalk < 2.0) {
    const k = clamp(tWalk / 1.5); // 1.5 saniyə yerimə
    w.position.lerpVectors(w.userData.startPos, w.userData.targetPos, k);
    if (k < 1) {
      MODES.walk(w, tt);
      return;
    }
  }
  
  // Yerimə bitdi, təmizliyə başla
  w.position.copy(w.userData.targetPos);
  MODES[w.userData.mode](w, tt);
};

/* ---------- əşyalar ---------- */
function makeSofa(w = 2.4, color = 0x7d97c4) {
  const g = new THREE.Group();
  g.add(place(Bx(w, 0.4, 0.95, color), 0, 0.3, 0));
  const n = w > 1.8 ? 2 : 1;
  const cw = (w - 0.5) / n;
  for (let i = 0; i < n; i++) g.add(place(Bx(cw - 0.03, 0.2, 0.72, color, { r: 0.08 }), -((n - 1) * cw) / 2 + i * cw, 0.6, 0.08));
  g.add(place(Bx(w, 0.75, 0.25, color, { r: 0.08 }), 0, 0.85, -0.4));
  [-1, 1].forEach((s) => g.add(place(Bx(0.25, 0.6, 0.95, color, { r: 0.08 }), s * (w / 2 - 0.125), 0.5, 0)));
  [-1, 1].forEach((sx) => [-1, 1].forEach((sz) => g.add(place(Cy(0.04, 0.03, 0.12, C.darkwood), sx * (w / 2 - 0.12), 0.06, sz * 0.38))));
  g.userData.seat = { w: w - 0.5, y: 0.711, z: 0.08 };
  return g;
}
function makeChair(color = C.wood, seatColor = C.royal) {
  const g = new THREE.Group();
  g.add(place(Bx(0.5, 0.07, 0.5, seatColor, { r: 0.03 }), 0, 0.5, 0));
  g.add(place(Bx(0.5, 0.5, 0.06, seatColor, { r: 0.03 }), 0, 0.8, -0.22));
  [-1, 1].forEach((sx) => [-1, 1].forEach((sz) => g.add(place(Bx(0.05, 0.5, 0.05, color), sx * 0.21, 0.25, sz * 0.21))));
  return g;
}
function makePlant() {
  const g = new THREE.Group();
  g.add(place(Cy(0.2, 0.15, 0.32, C.white), 0, 0.16, 0));
  for (let i = 0; i < 6; i++) {
    const l = Sp(0.17, C.green); l.scale.set(0.6, 1.5, 0.6);
    const a = (i / 6) * Math.PI * 2;
    l.position.set(Math.cos(a) * 0.12, 0.6, Math.sin(a) * 0.12);
    l.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
    g.add(l);
  }
  return g;
}
function makeMachine() {
  const g = new THREE.Group();
  g.add(place(Bx(0.7, 0.55, 0.5, C.royal, { r: 0.08 }), 0, 0.42, 0));
  g.add(place(Bx(0.72, 0.1, 0.52, C.white, { r: 0.04 }), 0, 0.5, 0));
  g.add(place(Cy(0.2, 0.2, 0.3, C.ice, { m: { transparent: true, opacity: 0.7, roughness: 0.1 } }), 0, 0.86, 0));
  [-1, 1].forEach((s) => { const wh = Cy(0.17, 0.17, 0.1, 0x16213e); wh.rotation.z = Math.PI / 2; g.add(place(wh, s * 0.38, 0.17, -0.1)); });
  g.add(place(Sp(0.04, 0x3dff9a, { m: { emissive: 0x3dff9a, emissiveIntensity: 1.5 } }), 0.25, 0.7, 0.26));
  const port = new THREE.Object3D(); port.position.set(0, 0.6, 0.3); g.add(port);
  g.userData.port = port;
  return g;
}
function makeBucket() {
  const g = new THREE.Group();
  g.add(place(Cy(0.2, 0.15, 0.32, C.royal), 0, 0.16, 0));
  g.add(place(Cy(0.185, 0.185, 0.02, C.ice2, { m: { emissive: C.ice2, emissiveIntensity: 0.3 } }), 0, 0.3, 0));
  return g;
}
function makeDesk(color = C.white) {
  const g = new THREE.Group();
  g.add(place(Bx(1.5, 0.07, 0.8, color, { r: 0.03 }), 0, 0.95, 0));
  [-1, 1].forEach((s) => g.add(place(Bx(0.07, 0.92, 0.7, C.grey), s * 0.68, 0.46, 0)));
  const mon = new THREE.Group();
  mon.add(place(Bx(0.62, 0.38, 0.04, 0x111827), 0, 0.3, 0));
  mon.add(place(new THREE.Mesh(new THREE.PlaneGeometry(0.57, 0.33), new THREE.MeshBasicMaterial({ color: 0x8fd0ff })), 0, 0.3, 0.025));
  mon.add(place(Cy(0.04, 0.06, 0.12, 0x111827), 0, 0.06, 0));
  mon.position.set(0, 0.99, -0.2);
  g.add(mon);
  g.add(place(Bx(0.42, 0.02, 0.14, C.grey), 0, 0.99, 0.12));
  return g;
}
function makeTable(r = 0.55) {
  const g = new THREE.Group();
  g.add(place(Cy(r, r, 0.06, C.white), 0, 0.85, 0));
  g.add(place(Cy(0.05, 0.05, 0.82, C.navy), 0, 0.42, 0));
  g.add(place(Cy(0.28, 0.28, 0.04, C.navy), 0, 0.02, 0));
  g.add(place(Cy(0.07, 0.05, 0.12, C.ice2, { m: { transparent: true, opacity: 0.7 } }), 0, 0.94, 0));
  return g;
}

/* ---------- effektlər ---------- */
function bubbles(ctx, parent, count, origin) {
  const pool = [];
  for (let i = 0; i < count; i++) {
    const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: ctx.bubbleTex, transparent: true, depthWrite: false }));
    m.visible = false;
    parent.add(m);
    pool.push({ m, life: Math.random() * 2, v: new THREE.Vector3() });
  }
  return (dt) => {
    for (const p of pool) {
      p.life -= dt;
      if (p.life <= 0) {
        const o = origin();
        if (!o) { p.m.visible = false; p.life = 0.3; continue; }
        p.m.position.copy(o).add(new THREE.Vector3((Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.2));
        p.v.set((Math.random() - 0.5) * 0.25, 0.35 + Math.random() * 0.4, (Math.random() - 0.5) * 0.15);
        p.life = 1.2 + Math.random() * 1.2;
        p.s = 0.06 + Math.random() * 0.14;
        p.max = p.life;
        p.m.visible = true;
      }
      p.m.position.addScaledVector(p.v, dt);
      const k = p.life / p.max;
      p.m.scale.setScalar(p.s * (1.2 - k * 0.4));
      p.m.material.opacity = Math.min(1, k * 2) * 0.9;
    }
  };
}
function sparkles(ctx, parent, spots, color = 0xffffff) {
  const list = spots.map((s, i) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: ctx.starTex, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    sp.position.set(...s);
    parent.add(sp);
    return { sp, ph: i * 1.3 };
  });
  return (t, amount = 1) => list.forEach((o) => {
    const k = Math.max(0, Math.sin(t * 3 + o.ph)) * amount;
    o.sp.scale.setScalar(0.05 + k * 0.4);
    o.sp.material.opacity = k;
  });
}
function dust(parent, count, area) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * area.x;
    pos[i * 3 + 1] = Math.random() * area.y;
    pos[i * 3 + 2] = (Math.random() - 0.5) * area.z;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0xd9c9b0, size: 0.05, transparent: true, opacity: 0.8, depthWrite: false });
  const pts = new THREE.Points(geo, mat);
  parent.add(pts);
  return (t, dt, opacity) => {
    mat.opacity = opacity;
    const a = geo.attributes.position;
    for (let i = 0; i < count; i++) {
      a.array[i * 3 + 1] += Math.sin(t + i) * 0.002 - 0.002;
      if (a.array[i * 3 + 1] < 0) a.array[i * 3 + 1] = area.y;
    }
    a.needsUpdate = true;
  };
}
function hose(parent, color = C.royal) {
  const mesh = new THREE.Mesh(new THREE.BufferGeometry(), std(color, { roughness: 0.4 }));
  parent.add(mesh);
  return (from, to) => {
    const mid = from.clone().lerp(to, 0.5);
    mid.y = Math.min(from.y, to.y) - 0.1;
    const curve = new THREE.CatmullRomCurve3([from, from.clone().add(new THREE.Vector3(0, 0.25, 0.1)), mid, to]);
    mesh.geometry.dispose();
    mesh.geometry = new THREE.TubeGeometry(curve, 22, 0.035, 6);
  };
}
const toLocal = (group, obj, v = new THREE.Vector3()) => group.worldToLocal(obj.localToWorld(v));

/* ---------- SƏHNƏLƏR ---------- */
const SCENES = {
  // Ana səhifə + ev təmizliyi: otaq, divan, bitki, yuyucu işçi
  home(ctx) {
    const g = new THREE.Group();
    const rug = Cy(1.8, 1.8, 0.03, C.ice, { seg: 48, m: { roughness: 0.9 } }); g.add(place(rug, 0.2, 0.02, 0.4));
    const sofa = makeSofa(2.6, 0x6f8fd0); sofa.position.set(0.4, 0, -1.2); g.add(sofa);
    g.add(place(makePlant(), -2.3, 0, -1.2));
    g.add(place(makePlant(), 3.1, 0, -0.8));
    const table = Bx(1.0, 0.35, 0.6, C.white, { r: 0.06 }); g.add(place(table, 0.4, 0.2, 0.2));
    const w = spawnWorker(ctx, { mode: 'mop', tool: 'mop', x: -0.6, z: 1.0, ry: Math.PI * 0.82 }); g.add(w);
    const bk = makeBucket(); g.add(place(bk, 1.9, 0, 1.1));
    const b = bubbles(ctx, g, 18, () => toLocal(g, w.userData.tool, new THREE.Vector3(0, -1.4, 0)));
    const sp = sparkles(ctx, g, [[-0.9, 0.2, 1.4], [0.8, 0.9, -0.8], [1.6, 1.2, -1.1], [-0.3, 0.1, 1.8]]);
    return { group: g, update: (t, dt) => { animWorker(w, t); b(dt); sp(t); } };
  },

  // Təmir sonrası: pəncərə silmək, toz təmizləmək
  renovation(ctx) {
    const g = new THREE.Group();
    g.add(place(Bx(6.4, 3.6, 0.25, 0xeef3fb, { r: 0.02 }), 0.4, 1.8, -1.9));
    g.add(place(Bx(0.25, 3.6, 3.6, 0xe6edf8, { r: 0.02 }), -2.9, 1.8, -0.1));
    // pəncərə
    const win = new THREE.Group(); win.position.set(1.4, 1.7, -1.74);
    win.add(place(new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.7), new THREE.MeshBasicMaterial({ color: 0xa8dcff })), 0, 0, -0.02));
    [[2.2, 0.12, 0, 0.9], [2.2, 0.12, 0, -0.9], [0.12, 1.9, -1.05, 0], [0.12, 1.9, 1.05, 0], [0.07, 1.7, 0, 0], [2.0, 0.07, 0, 0]].forEach(([w, h, x, y]) => win.add(place(Bx(w, h, 0.12, C.white, { r: 0.02 }), x, y, 0.02)));
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.7), glass(C.ice, 0.18)); pane.position.z = 0.04; win.add(pane);
    const dirt = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.7), new THREE.MeshBasicMaterial({ color: 0x8a7a66, transparent: true, opacity: 0.6, depthWrite: false }));
    dirt.position.z = 0.06; win.add(dirt);
    g.add(win);
    // alət-avadanlıq
    const ladder = new THREE.Group();
    [-1, 1].forEach((s) => ladder.add(place(Bx(0.06, 2.2, 0.06, C.grey), s * 0.28, 1.1, 0)));
    for (let i = 0; i < 6; i++) ladder.add(place(Bx(0.55, 0.05, 0.05, C.grey), 0, 0.3 + i * 0.35, 0));
    ladder.position.set(-2.4, 0, -1.4); ladder.rotation.set(-0.12, 0.3, 0); g.add(ladder);
    [[-1.2, -1.2, 0.8], [2.8, -1.2, 0.6], [2.9, -0.3, 0.5]].forEach(([x, z, s], i) => { const bx = Bx(s, s * 0.8, s, 0xc9a26b, { r: 0.03 }); g.add(place(bx, x, (s * 0.8) / 2, z)); bx.rotation.y = i; });
    g.add(place(makeBucket(), 0.2, 0, -0.6));
    const w1 = spawnWorker(ctx, { mode: 'wipe', tool: 'cloth', x: 1.4, z: -0.95, ry: Math.PI + 0.25 }); g.add(w1);
    const w2 = spawnWorker(ctx, { mode: 'mop', tool: 'mop', x: -0.9, z: 0.5, ry: Math.PI * 0.8 }); g.add(w2);
    const d = dust(g, 120, { x: 6, y: 3.2, z: 3 });
    const sp = sparkles(ctx, g, [[0.7, 2.3, -1.6], [2.1, 1.2, -1.6], [1.4, 2.5, -1.6], [2.2, 2.3, -1.6]], C.ice);
    const b = bubbles(ctx, g, 10, () => toLocal(g, w2.userData.tool, new THREE.Vector3(0, -1.4, 0)));
    return {
      group: g,
      update: (t, dt) => {
        animWorker(w1, t); animWorker(w2, t); b(dt);
        const tt = t % 9, clean = clamp(tt / 6), back = clamp(tt - 8);
        dirt.material.opacity = 0.6 * Math.max(1 - clean, back);
        d(t, dt, 0.85 * Math.max(1 - clean * 0.7, back));
        sp(t, clean);
      },
    };
  },

  // Yumşaq mebel: aparatla divan/kreslo/stul/matras
  furniture(ctx) {
    const g = new THREE.Group();
    const sofa = makeSofa(2.5, 0x7d97c4); sofa.position.set(0.5, 0, -1.2); g.add(sofa);
    const dirt = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.72), new THREE.MeshBasicMaterial({ color: 0x5b3f26, transparent: true, opacity: 0.5, depthWrite: false }));
    dirt.rotation.x = -Math.PI / 2; dirt.position.set(0, 0.715, 0.08); sofa.add(dirt);
    const arm = makeSofa(1.15, 0x9bb1d8); arm.position.set(-2.5, 0, -0.5); arm.rotation.y = 0.5; g.add(arm);
    const chair = makeChair(C.wood, C.royal); chair.position.set(2.7, 0, 0.5); chair.rotation.y = -0.5; g.add(chair);
    const chair2 = makeChair(C.wood, C.ice2); chair2.position.set(3.4, 0, -0.5); chair2.rotation.y = -0.9; g.add(chair2);
    const mat = new THREE.Group();
    mat.add(Bx(1.15, 2.0, 0.26, C.white, { r: 0.1 }));
    [-0.55, 0, 0.55].forEach((y) => mat.add(place(Bx(1.17, 0.07, 0.275, C.ice2, { r: 0.02 }), 0, y, 0)));
    mat.position.set(3.3, 1.0, -1.5); mat.rotation.set(-0.12, -0.25, 0.1); g.add(mat);
    const mach = makeMachine(); mach.position.set(-1.7, 0, 0.9); mach.rotation.y = 0.6; g.add(mach);
    const w = spawnWorker(ctx, { mode: 'vacuum', tool: 'wand', x: -0.3, z: 0.2, ry: Math.PI + 0.35 }); g.add(w);
    const setHose = hose(g);
    const foam = bubbles(ctx, g, 26, () => toLocal(g, w.userData.tool, new THREE.Vector3(0, -0.55, 0)));
    const sp = sparkles(ctx, g, [[-0.2, 1.0, -0.9], [0.9, 1.1, -0.9], [1.7, 0.9, -0.9], [-2.4, 0.9, -0.3], [2.7, 1.1, 0.5], [3.3, 1.9, -1.6]]);
    return {
      group: g,
      update: (t, dt) => {
        animWorker(w, t);
        g.updateMatrixWorld(true);
        setHose(toLocal(g, mach.userData.port), toLocal(g, w.userData.tool, new THREE.Vector3(0, -0.05, 0)));
        foam(dt);
        const tt = t % 9, clean = clamp(tt / 6), back = clamp(tt - 8);
        dirt.material.opacity = 0.5 * Math.max(1 - clean, back);
        sp(t, clean);
      },
    };
  },

  // Ofis: masalar, monitorlar, silinən səthlər
  office(ctx) {
    const g = new THREE.Group();
    g.add(place(Bx(6.6, 3.2, 0.2, 0xe9f0fb, { r: 0.02 }), 0.6, 1.6, -2.2));
    [[-0.5, -1.0], [1.5, -1.0], [3.4, -1.0]].forEach(([x, z], i) => {
      const d = makeDesk(); d.position.set(x, 0, z); g.add(d);
      const ch = makeChair(C.navy, C.royal); ch.position.set(x, 0, z + 0.9); ch.rotation.y = Math.PI + (i - 1) * 0.15; ch.scale.setScalar(1.05); g.add(ch);
    });
    g.add(place(makePlant(), -2.3, 0, -1.7));
    g.add(place(makePlant(), 4.5, 0, -1.7));
    const w = spawnWorker(ctx, { mode: 'desk', tool: 'cloth', x: -1.6, z: -0.2, ry: Math.PI * 1.35 }); g.add(w);
    const w2 = spawnWorker(ctx, { mode: 'mop', tool: 'mop', x: 2.3, z: 0.9, ry: Math.PI * 0.85 }); g.add(w2);
    const b = bubbles(ctx, g, 14, () => toLocal(g, w2.userData.tool, new THREE.Vector3(0, -1.4, 0)));
    const sp = sparkles(ctx, g, [[-0.5, 1.1, -0.8], [1.5, 1.2, -1.0], [3.4, 1.1, -0.8], [0.4, 0.1, 1.2]]);
    return { group: g, update: (t, dt) => { animWorker(w, t); animWorker(w2, t); b(dt); sp(t); } };
  },

  // Restoran: masalar, bar, asma lampalar
  restaurant(ctx) {
    const g = new THREE.Group();
    g.add(place(Bx(7, 3.4, 0.2, 0xe9f0fb, { r: 0.02 }), 0.6, 1.7, -2.4));
    const bar = new THREE.Group();
    bar.add(place(Bx(4.2, 1.0, 0.7, C.navy, { r: 0.05 }), 0, 0.5, 0));
    bar.add(place(Bx(4.4, 0.08, 0.85, C.white, { r: 0.03 }), 0, 1.04, 0));
    for (let i = 0; i < 7; i++) bar.add(place(Cy(0.07, 0.07, 0.4, [C.ice2, C.royal, C.white][i % 3], { m: { transparent: true, opacity: 0.85 } }), -1.7 + i * 0.55, 1.28, 0));
    bar.position.set(1.2, 0, -1.8); g.add(bar);
    [[-1.6, -0.1], [0.5, 0.4], [2.7, 0.1]].forEach(([x, z], k) => {
      const t = makeTable(); t.position.set(x, 0, z); g.add(t);
      for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2 + k; const ch = makeChair(C.darkwood, C.royal); ch.position.set(x + Math.cos(a) * 0.85, 0, z + Math.sin(a) * 0.85); ch.rotation.y = -a - Math.PI / 2; ch.scale.setScalar(0.85); g.add(ch); }
      const lamp = new THREE.Group();
      lamp.add(place(Cy(0.01, 0.01, 1.5, C.grey), 0, 0.75, 0));
      lamp.add(place(Sp(0.2, 0xfff4cc, { m: { emissive: 0xffe9a8, emissiveIntensity: 1.6 } }), 0, 0, 0));
      lamp.position.set(x, 3.0, z - 0.3); g.add(lamp);
    });
    const w = spawnWorker(ctx, { mode: 'mop', tool: 'mop', x: 0.2, z: 1.9, ry: Math.PI * 0.8 }); g.add(w);
    g.add(place(makeBucket(), 1.5, 0, 2.1));
    const b = bubbles(ctx, g, 22, () => toLocal(g, w.userData.tool, new THREE.Vector3(0, -1.4, 0)));
    const sp = sparkles(ctx, g, [[-1.6, 0.95, -0.1], [0.5, 0.95, 0.4], [2.7, 0.95, 0.1], [-0.8, 0.1, 2.0]]);
    return { group: g, update: (t, dt) => { animWorker(w, t); b(dt); sp(t); } };
  },

  // Obyekt: vitrin/fasad şüşəsi silinir
  object(ctx) {
    const g = new THREE.Group();
    g.add(place(Bx(6.2, 4.0, 0.3, 0x24408f, { r: 0.03 }), 0.8, 2.0, -2.1));
    for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) g.add(place(new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.7), new THREE.MeshBasicMaterial({ color: (r + c) % 3 ? 0x8fd0ff : 0xdff2ff })), -1.7 + c * 0.9 + 0.6, 2.7 + r * 0.85, -1.94));
    // vitrin
    const shop = new THREE.Group(); shop.position.set(0.8, 1.05, -1.94);
    shop.add(place(Bx(5.6, 0.1, 0.14, C.white), 0, 0.95, 0));
    shop.add(place(Bx(5.6, 0.1, 0.14, C.white), 0, -0.95, 0));
    [-2.8, 0, 2.8].forEach((x) => shop.add(place(Bx(0.1, 2.0, 0.14, C.white), x, 0, 0)));
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 1.85), glass(C.ice, 0.22)); pane.position.z = 0.06; shop.add(pane);
    const dirt = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 1.85), new THREE.MeshBasicMaterial({ color: 0x7a6e5e, transparent: true, opacity: 0.5, depthWrite: false })); dirt.position.z = 0.08; shop.add(dirt);
    g.add(shop);
    const awn = Bx(5.8, 0.12, 0.9, C.royal, { r: 0.04 }); awn.rotation.x = 0.3; g.add(place(awn, 0.8, 2.2, -1.6));
    const w = spawnWorker(ctx, { mode: 'squeegee', tool: 'squeegee', x: -0.4, z: -0.95, ry: Math.PI + 0.3 }); g.add(w);
    const w2 = spawnWorker(ctx, { mode: 'mop', tool: 'mop', x: 2.7, z: 0.6, ry: Math.PI * 0.82 }); g.add(w2);
    g.add(place(makeBucket(), 1.2, 0, -0.7));
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 4), std(0xffc233)); g.add(place(cone, 3.9, 0.3, 0.6));
    const b = bubbles(ctx, g, 16, () => toLocal(g, w2.userData.tool, new THREE.Vector3(0, -1.4, 0)));
    const sp = sparkles(ctx, g, [[-0.9, 1.4, -1.8], [0.6, 1.0, -1.8], [1.9, 1.6, -1.8], [3.0, 1.2, -1.8]]);
    return {
      group: g,
      update: (t, dt) => {
        animWorker(w, t); animWorker(w2, t); b(dt);
        const tt = t % 9, clean = clamp(tt / 6), back = clamp(tt - 8);
        dirt.material.opacity = 0.5 * Math.max(1 - clean, back);
        sp(t, clean);
      },
    };
  },
};

/* ---------- Səhnə meneceri ---------- */
export function createStage(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  const root = new THREE.Group();
  scene.add(root);

  scene.add(new THREE.AmbientLight(0xbfd8ff, 0.8));
  scene.add(new THREE.HemisphereLight(0xe3f1ff, 0x0a2a8f, 0.9));
  const sun = new THREE.DirectionalLight(0xffffff, 2.4); sun.position.set(4, 7, 6); scene.add(sun);
  const rim = new THREE.PointLight(0x5b9bff, 60, 18); rim.position.set(3, 3, -4); scene.add(rim);
  const fill = new THREE.PointLight(0x7cc8ff, 35, 14); fill.position.set(-4, 2.5, 4); scene.add(fill);

  const ctx = {
    bubbleTex: bubbleTex(),
    starTex: starTex(),
    logoTex: new THREE.TextureLoader().load('/assets/images/logo.png'),
  };
  ctx.logoTex.colorSpace = THREE.SRGBColorSpace;
  ctx.logoTex.repeat.set(0.78, 0.5);
  ctx.logoTex.offset.set(0.11, 0.25);

  // dayanıqlı platforma + işıq halqası
  const stageProps = new THREE.Group();
  const plat = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 5.0, 0.16, 72), new THREE.MeshPhysicalMaterial({ color: 0xcfe6ff, roughness: 0.25, metalness: 0.25, clearcoat: 1 }));
  plat.position.y = -0.09; stageProps.add(plat);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(5.0, 0.04, 8, 96), new THREE.MeshBasicMaterial({ color: 0x9fdcff }));
  ring.rotation.x = Math.PI / 2; ring.position.y = -0.02; stageProps.add(ring);
  root.add(stageProps);

  // süzən damcılar (loqo motivi)
  const dropGeo = dropGeometry();
  const dropMat = new THREE.MeshPhysicalMaterial({ color: 0xcfeaff, roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.88, emissive: 0x3a8cff, emissiveIntensity: 0.35 });
  const drops = [[-3.6, 3.6, -2, 0.55], [4.2, 4.2, -2.4, 0.7], [-2.0, 4.8, -3, 0.4], [5.2, 2.4, -1, 0.35], [3.0, 5.2, -3.4, 0.5], [-4.6, 2.0, -1, 0.3]].map(([x, y, z, s], i) => {
    const m = new THREE.Mesh(dropGeo, dropMat); m.position.set(x, y, z); m.scale.setScalar(s); m.userData = { y, ph: i * 1.1, s }; root.add(m); return m;
  });

  const cache = {};
  let current = null, outgoing = null, clock = 0;
  const px = { x: 0, y: 0, tx: 0, ty: 0 };

  function setScene(key) {
    if (!SCENES[key] || (current && current.key === key)) return;
    if (current) { outgoing = current; outgoing.t = clock; }
    cache[key] ??= { key, ...SCENES[key](ctx) };
    current = cache[key];
    current.t = clock;
    current.group.visible = true;
    root.add(current.group);
    current.born = clock;
  }

  const ease = (x) => 1 - Math.pow(1 - x, 3) * Math.cos(x * 2.2);
  function applyAnim() {
    if (current) {
      const k = ease(clamp((clock - current.born) / 0.9));
      current.group.scale.setScalar(Math.max(0.001, k));
      current.group.position.y = (1 - k) * -1.2;
      current.group.rotation.y = (1 - k) * -1.1;
    }
    if (outgoing) {
      const k = clamp((clock - outgoing.t) / 0.45);
      outgoing.group.scale.setScalar(Math.max(0.001, 1 - k));
      outgoing.group.rotation.y = k * 0.8;
      if (k >= 1) { root.remove(outgoing.group); outgoing = null; }
    }
  }

  function resize() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const wide = camera.aspect > 1.15;
    root.userData.off = wide ? 2.6 : 0;
    root.userData.s = wide ? 1 : 0.62;
    root.userData.y = wide ? 0 : 0.9;
    camera.position.set(0, 3.0, wide ? 10.5 : 11.5);
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize);
  resize();
  addEventListener('pointermove', (e) => { px.tx = (e.clientX / innerWidth - 0.5) * 2; px.ty = (e.clientY / innerHeight - 0.5) * 2; });

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; clock += dt;
    px.x += (px.tx - px.x) * 0.05; px.y += (px.ty - px.y) * 0.05;
    root.position.set(root.userData.off, root.userData.y, 0);
    root.scale.setScalar(root.userData.s);
    root.rotation.y = px.x * 0.28 + Math.sin(clock * 0.3) * 0.08;
    camera.position.y = 3.0 - px.y * 0.5;
    camera.lookAt(root.userData.off * 0.9, 1.5, 0);
    drops.forEach((d) => { d.position.y = d.userData.y + Math.sin(clock * 0.9 + d.userData.ph) * 0.25; d.rotation.y = clock * 0.6 + d.userData.ph; });
    ring.material.color.setHSL(0.55, 0.9, 0.6 + Math.sin(clock * 2) * 0.08);
    if (current) current.update(clock, dt);
    if (outgoing) outgoing.update(clock, dt);
    applyAnim();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  canvas.classList.add('ready');
  return { setScene };
}
