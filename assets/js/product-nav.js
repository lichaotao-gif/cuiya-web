/**
 * 产品页尾部的同级产品切换条。
 * 每个产品页只需给出当前 slug。
 */
import { PRODUCTS } from './data/site.js';
import { initReveal } from './lib/ui.js';

export function mountProductNav(currentSlug, host = document.getElementById('prodNav')) {
  if (!host) return;

  host.innerHTML = PRODUCTS.filter((p) => p.slug !== currentSlug)
    .map(
      (p, i) => `
      <a class="card card--link" href="/products/${p.slug}.html" data-reveal data-reveal-delay="${i * 60}">
        <div class="card__icon card__icon--img" aria-hidden="true">
          <img src="${p.iconImg}" alt="" width="144" height="144" loading="lazy" decoding="async">
        </div>
        <h3 class="card__title" style="font-size:1.05rem">${p.name}</h3>
        <p class="card__desc" style="font-size:.88rem">${p.tagline}</p>
      </a>`
    )
    .join('');

  initReveal();
}
