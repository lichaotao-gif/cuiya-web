/**
 * 在样式表加载前确定主题，避免首屏从深色闪到浅色。
 * 这是经典脚本，需同步放在 <head> 的 CSS 之前。
 */
(function initThemeBeforePaint() {
  var key = 'cuiya-theme';
  var preference = 'system';

  try {
    var saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark' || saved === 'system') preference = saved;
  } catch (_) {
    // 隐私模式或受限存储环境下继续使用系统设置。
  }

  var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var resolved = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
  var root = document.documentElement;

  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved;

  var color = resolved === 'dark' ? '#0b0e18' : '#f4f6fa';
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = color;
})();
