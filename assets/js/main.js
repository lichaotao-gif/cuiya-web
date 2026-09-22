/**
 * 全站入口。各页面只需 <script type="module" src="/assets/js/main.js">。
 */

import { mountChrome } from './chrome.js?v=20260922-7';
import { initReveal, initCounters, initSpotlight, initTabs, initStory, stagger } from './lib/ui.js';
import { initHeroGraph } from './hero-graph.js';
import { initContactForm } from './lib/contact.js';

function boot() {
  mountChrome();

  // 网格类容器自动交错
  stagger('[data-stagger]');

  initReveal();
  initCounters();
  initSpotlight();
  initTabs();
  initStory();
  initContactForm();

  const heroCanvas = document.getElementById('heroGraph');
  if (heroCanvas) initHeroGraph(heroCanvas);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
