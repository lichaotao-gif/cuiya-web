const STORAGE_KEY = 'cuiya-theme';
const VALID_PREFERENCES = new Set(['system', 'light', 'dark']);
const LABELS = {
  system: '跟随系统',
  light: '浅色模式',
  dark: '深色模式',
};

const systemQuery = matchMedia('(prefers-color-scheme: dark)');

function readPreference() {
  const fromDom = document.documentElement.dataset.themePreference;
  if (VALID_PREFERENCES.has(fromDom)) return fromDom;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (VALID_PREFERENCES.has(saved)) return saved;
  } catch (_) {
    // 存储不可用时回退到系统设置。
  }
  return 'system';
}

function resolvedTheme(preference) {
  return preference === 'system' ? (systemQuery.matches ? 'dark' : 'light') : preference;
}

function updateControls(preference, resolved) {
  document.querySelectorAll('[data-theme-option]').forEach((button) => {
    const selected = button.dataset.themeOption === preference;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.dataset.resolvedTheme = resolved;
    button.setAttribute('aria-label', `显示模式：${LABELS[preference]}`);
    button.setAttribute('title', `显示模式：${LABELS[preference]}`);
  });
}

function updateThemeColor(theme) {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = theme === 'dark' ? '#0b0e18' : '#f4f6fa';
}

function applyTheme(preference, { persist = true } = {}) {
  const safePreference = VALID_PREFERENCES.has(preference) ? preference : 'system';
  const resolved = resolvedTheme(safePreference);
  const root = document.documentElement;

  root.dataset.theme = resolved;
  root.dataset.themePreference = safePreference;
  root.style.colorScheme = resolved;
  updateThemeColor(resolved);
  updateControls(safePreference, resolved);

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, safePreference);
    } catch (_) {
      // 存储不可用不影响当前页面切换。
    }
  }
}

export function initThemeControls() {
  let preference = readPreference();
  applyTheme(preference, { persist: false });

  const picker = document.querySelector('[data-theme-picker]');
  const toggle = document.querySelector('[data-theme-toggle]');

  const closePicker = () => {
    if (!picker || !toggle) return;
    picker.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  if (picker && toggle) {
    toggle.addEventListener('click', () => {
      const open = picker.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (event) => {
      if (!picker.contains(event.target)) closePicker();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && picker.classList.contains('is-open')) {
        closePicker();
        toggle.focus();
      }
    });
  }

  document.querySelectorAll('[data-theme-option]').forEach((button) => {
    button.addEventListener('click', () => {
      preference = button.dataset.themeOption;
      applyTheme(preference);
      closePicker();
    });
  });

  const handleSystemChange = () => {
    if (preference === 'system') applyTheme('system', { persist: false });
  };

  if (systemQuery.addEventListener) systemQuery.addEventListener('change', handleSystemChange);
  else systemQuery.addListener(handleSystemChange);
}
