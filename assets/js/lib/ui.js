/**
 * 通用交互：滚动入场、数字增长、卡片鼠标高光、Tab 切换、ScrollStory。
 * 全部尊重 prefers-reduced-motion。
 */

export const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 滚动入场：交错 60ms，只触发一次 */
export function initReveal() {
  const nodes = document.querySelectorAll('[data-reveal]');
  if (!nodes.length) return;

  if (REDUCED || !('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const delay = Number(el.dataset.revealDelay || 0);
        setTimeout(() => el.classList.add('is-in'), delay);
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  nodes.forEach((n) => io.observe(n));
}

/** 给同一容器下的子元素自动排交错延迟 */
export function stagger(selector, step = 60) {
  document.querySelectorAll(selector).forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      if (child.hasAttribute('data-reveal')) child.dataset.revealDelay = String(i * step);
    });
  });
}

/** 数字增长：tabular-nums 保证不跳动 */
export function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const run = (el) => {
    const target = Number(el.dataset.count);
    const dur = 1400;
    if (REDUCED) {
      el.textContent = String(target);
      return;
    }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    els.forEach(run);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
}

/** 卡片跟随鼠标的径向高光 */
export function initSpotlight() {
  if (REDUCED) return;
  document.addEventListener(
    'pointermove',
    (e) => {
      const card = e.target.closest('.card, .craft, .dl-item');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    { passive: true }
  );
}

/** Tab 切换器：[data-tabs] > [data-tab-btn] / [data-tab-panel] */
export function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((root) => {
    const btns = root.querySelectorAll('[data-tab-btn]');
    const panels = root.querySelectorAll('[data-tab-panel]');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.tabBtn;
        btns.forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', String(on));
        });
        panels.forEach((p) => p.classList.toggle('is-active', p.dataset.tabPanel === key));
      });
    });
  });
}

/** ScrollStory：步骤进入视口时点亮，并切换右侧配图 */
export function initStory() {
  document.querySelectorAll('[data-story]').forEach((root) => {
    const steps = root.querySelectorAll('[data-story-step]');
    const shots = root.querySelectorAll('[data-story-shot]');
    if (!steps.length) return;

    if (REDUCED || !('IntersectionObserver' in window)) {
      steps.forEach((s) => s.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const key = e.target.dataset.storyStep;
          steps.forEach((s) => s.classList.toggle('is-in', s === e.target));
          shots.forEach((s) => s.classList.toggle('is-active', s.dataset.storyShot === key));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    steps.forEach((s) => io.observe(s));
  });
}

/** 无障碍：把日期格式化成中文可读 */
export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
}

/**
 * 清洗 CMS 富文本再注入。接口内容虽为自有后台，但仍不直接信任。
 * 同时抹掉后台带来的行内宽高，让图片适配文章栏宽。
 */
export function sanitizeHtml(html) {
  const doc = new DOMParser().parseFromString(String(html), 'text/html');

  doc.querySelectorAll('script,style,iframe,object,embed,link,meta,base,form').forEach((n) => n.remove());

  doc.body.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      const val = attr.value.replace(/\s+/g, '').toLowerCase();
      if (name.startsWith('on')) el.removeAttribute(attr.name);
      else if ((name === 'href' || name === 'src' || name === 'xlink:href') && val.startsWith('javascript:')) {
        el.removeAttribute(attr.name);
      }
    });

    if (el.tagName === 'IMG') {
      el.removeAttribute('width');
      el.removeAttribute('height');
      el.setAttribute('loading', 'lazy');
      el.setAttribute('decoding', 'async');
      el.style.maxWidth = '100%';
      el.style.height = 'auto';
    }
    if (el.tagName === 'A' && el.getAttribute('href')) {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
    el.style.removeProperty('width');
    el.style.removeProperty('font-family');
    el.style.removeProperty('background-color');
    el.style.removeProperty('color');
  });

  return doc.body.innerHTML;
}

/** 分页器：窗口化页码 + 省略号，点击回调 onGo(page) */
export function renderPager(el, { page, pages, total, onGo }) {
  if (!el) return;
  if (pages <= 1) {
    el.innerHTML = '';
    return;
  }

  const win = [];
  const push = (n) => { if (!win.includes(n)) win.push(n); };
  push(1);
  for (let n = page - 1; n <= page + 1; n++) if (n > 1 && n < pages) push(n);
  push(pages);
  win.sort((a, b) => a - b);

  let html = `<button class="pager__btn" type="button" data-go="${page - 1}"${page === 1 ? ' disabled' : ''} aria-label="上一页">←</button>`;
  win.forEach((n, i) => {
    if (i && n - win[i - 1] > 1) html += `<span class="pager__gap" aria-hidden="true">…</span>`;
    html += `<button class="pager__btn${n === page ? ' is-active' : ''}" type="button" data-go="${n}"${
      n === page ? ' aria-current="page"' : ''
    }>${n}</button>`;
  });
  html += `<button class="pager__btn" type="button" data-go="${page + 1}"${page === pages ? ' disabled' : ''} aria-label="下一页">→</button>`;
  html += `<div class="pager__total">第 ${page} / ${pages} 页 · 共 ${total} 条</div>`;

  el.innerHTML = html;
  el.querySelectorAll('[data-go]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const n = Number(btn.dataset.go);
      if (n >= 1 && n <= pages && n !== page) onGo(n);
    });
  });
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);
}
