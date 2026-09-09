/**
 * 首屏 Canvas 知识图谱 —— 呼应「基于知识图谱的个性化学习」这一真实产品能力。
 *
 * 降级策略：
 *   1. prefers-reduced-motion / 无 2D context / 窄屏 → 不启动，露出 CSS 静态渐变底
 *   2. 页面不可见时暂停 RAF，避免后台耗电
 *   3. 节点数按视口面积自适应，DPR 上限 2
 */

import { REDUCED } from './lib/ui.js';

const BRAND = [255, 122, 24];
const CYAN = [56, 189, 248];

export function initHeroGraph(canvas) {
  if (!canvas || REDUCED) return;
  if (matchMedia('(max-width: 640px)').matches) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  canvas.previousElementSibling?.classList.remove('hero__fallback');

  let w = 0;
  let h = 0;
  let dpr = 1;
  let nodes = [];
  let raf = 0;
  const pointer = { x: -9999, y: -9999, active: false };

  const LINK_DIST = 148;
  const POINTER_DIST = 190;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(Math.min(Math.max((w * h) / 15000, 46), 110));
    nodes = Array.from({ length: count }, () => spawn());
  }

  function spawn() {
    const big = Math.random() < 0.16;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.19,
      vy: (Math.random() - 0.5) * 0.19,
      r: big ? 2.4 + Math.random() * 1.5 : 1 + Math.random() * 0.9,
      hub: big,
      // 少量节点用青色，形成双色数据流
      c: Math.random() < 0.28 ? CYAN : BRAND,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.014;

      if (n.x < -20) n.x = w + 20;
      if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20;
      if (n.y > h + 20) n.y = -20;
    }

    // 连线：节点间 + 鼠标附近加强
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK_DIST * LINK_DIST) continue;

        const d = Math.sqrt(d2);
        const base = (1 - d / LINK_DIST) * 0.2;

        // 鼠标靠近时该连线提亮
        let boost = 0;
        if (pointer.active) {
          const mx = (a.x + b.x) / 2 - pointer.x;
          const my = (a.y + b.y) / 2 - pointer.y;
          const md = Math.sqrt(mx * mx + my * my);
          if (md < POINTER_DIST) boost = (1 - md / POINTER_DIST) * 0.5;
        }

        const c = a.hub ? a.c : b.c;
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${base + boost})`;
        ctx.lineWidth = 0.7 + boost * 1.1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // 节点
    for (const n of nodes) {
      const breathe = n.hub ? 0.72 + Math.sin(n.pulse) * 0.24 : 0.5;
      const [r, g, b] = n.c;

      if (n.hub) {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        grd.addColorStop(0, `rgba(${r},${g},${b},0.32)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(${r},${g},${b},${breathe})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  resize();
  start();

  let rt = 0;
  addEventListener(
    'resize',
    () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 180);
    },
    { passive: true }
  );

  canvas.addEventListener(
    'pointermove',
    (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    },
    { passive: true }
  );

  canvas.addEventListener('pointerleave', () => {
    pointer.active = false;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  // 滚出首屏后停掉，省电
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    ).observe(canvas);
  }
}
