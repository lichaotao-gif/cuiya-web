/**
 * 全站导航与页脚 —— 单处定义，各页面注入，避免 12 个 HTML 重复维护。
 */

import { NAV, PRODUCTS, CONTACT } from './data/site.js';

const LOGO = '<img class="brand__logo" src="/assets/images/logo-on-dark.svg" width="107" height="34" alt="">';

function isActive(href) {
  const path = location.pathname.replace(/index\.html$/, '') || '/';
  if (href === '/') return path === '/';
  if (href === '/about.html') return path.startsWith('/about');
  if (href.startsWith('/products/')) return path.startsWith('/products/');
  return path.startsWith(href.replace('.html', ''));
}

function navMarkup() {
  const links = NAV.map((item) => {
    const active = isActive(item.href) ? ' is-active' : '';

    if (!item.panel) {
      return `<li><a class="nav__link${active}" href="${item.href}">${item.label}</a></li>`;
    }

    const panel = PRODUCTS.map(
      (p) => `<a class="nav__panel-item" href="/products/${p.slug}.html">
        <i aria-hidden="true"><img src="${p.iconImg}" alt="" width="144" height="144" loading="lazy" decoding="async"></i>
        <div><b>${p.name}</b><span>${p.blurb}</span></div>
      </a>`
    ).join('');

    return `<li class="nav__item">
      <a class="nav__link${active}" href="${item.href}" aria-haspopup="true">${item.label}</a>
      <div class="nav__panel">${panel}</div>
    </li>`;
  }).join('');

  const drawerLinks = NAV.map((item) => {
    const subs = item.panel
      ? PRODUCTS.map((p) => `<a class="sub" href="/products/${p.slug}.html">${p.name}</a>`).join('')
      : '';
    return `<a href="${item.href}">${item.label}</a>${subs}`;
  }).join('');

  return `<a class="skip-link" href="#main">跳到主要内容</a>
  <header class="nav" id="siteNav">
    <div class="nav__inner">
      <a class="brand" href="/" aria-label="四川萃雅教育科技 首页">${LOGO}</a>
      <nav aria-label="主导航"><ul class="nav__links">${links}</ul></nav>
      <button class="nav__burger" id="navBurger" type="button" aria-label="打开菜单" aria-expanded="false" aria-controls="navDrawer">
        <span></span>
      </button>
    </div>
  </header>
  <div class="drawer" id="navDrawer">${drawerLinks}</div>`;
}

function footerMarkup() {
  const products = PRODUCTS.map(
    (p) => `<li><a href="/products/${p.slug}.html">${p.name}</a></li>`
  ).join('');

  return `<footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <a class="brand" href="/" aria-label="四川萃雅教育科技 首页" style="margin-bottom:16px">${LOGO}</a>
          <p style="color:var(--text-3);font-size:.9rem;max-width:34ch">
            四川萃雅教育科技有限公司 —— 科技打造创新教育新模式。
          </p>
        </div>
        <div>
          <h5>产品中心</h5>
          <ul>${products}</ul>
        </div>
        <div>
          <h5>了解萃雅</h5>
          <ul>
            <li><a href="/about.html">关于我们</a></li>
            <li><a href="/research.html">巴蜀文化数字研究院</a></li>
            <li><a href="/news.html">媒体报道</a></li>
            <li><a href="/policy.html">相关政策</a></li>
            <li><a href="/download.html">下载中心</a></li>
          </ul>
        </div>
        <div>
          <h5>联系我们</h5>
          <ul>
            <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
            <li><a href="tel:${CONTACT.phone}" class="num">${CONTACT.phone}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} 四川萃雅教育科技有限公司</span>
        <a href="${CONTACT.icpUrl}" target="_blank" rel="noopener noreferrer">ICP备案号：${CONTACT.icp}</a>
      </div>
    </div>
  </footer>`;
}

export function mountChrome() {
  const navSlot = document.getElementById('site-nav');
  const footSlot = document.getElementById('site-footer');
  if (navSlot) navSlot.outerHTML = navMarkup();
  if (footSlot) footSlot.outerHTML = footerMarkup();

  const nav = document.getElementById('siteNav');
  const burger = document.getElementById('navBurger');
  const drawer = document.getElementById('navDrawer');

  if (nav) {
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 12);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    });
  }
}
