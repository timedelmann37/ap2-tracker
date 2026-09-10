(() => {
  'use strict';

  const STORAGE_KEY = 'ap2-theme-v1';
  const STATES = ['system', 'dark', 'light'];
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const ICON_PATHS = {
    system: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none"/>',
    dark: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/>',
    light: '<circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="6.6" y2="6.6"/><line x1="17.4" y1="17.4" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="6.6" y2="17.4"/><line x1="17.4" y1="6.6" x2="19.1" y2="4.9"/>'
  };
  const LABELS = { system: 'Darstellung', dark: 'Dunkel', light: 'Hell' };

  function readTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return STATES.includes(saved) ? saved : 'system';
    } catch {
      return 'system';
    }
  }

  function effectiveTheme() {
    return themeState === 'system' ? (systemPreference.matches ? 'dark' : 'light') : themeState;
  }

  function applyDocumentTheme() {
    document.documentElement.setAttribute('data-theme', effectiveTheme());
  }

  let themeState = readTheme();
  let transitionFrame;
  applyDocumentTheme();

  function updateControl() {
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    const button = document.getElementById('themeToggle');
    const current = effectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    if (icon) icon.innerHTML = ICON_PATHS[next];
    if (label) label.textContent = LABELS[current];
    if (button) {
      button.dataset.themeState = current;
      button.title = `Zum ${next === 'dark' ? 'Dunkelmodus' : 'Hellmodus'} wechseln`;
      button.setAttribute('aria-label', button.title);
    }
  }

  function setTheme(nextTheme, persist = true) {
    // Attio-like hover fades must not delay a theme change.
    cancelAnimationFrame(transitionFrame);
    document.documentElement.setAttribute('data-theme-switching', '');
    themeState = STATES.includes(nextTheme) ? nextTheme : 'system';
    applyDocumentTheme();

    if (persist) {
      try {
        if (themeState === 'system') localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, themeState);
      } catch {
        // The current page still switches correctly when storage is unavailable.
      }
    }

    updateControl();
    transitionFrame = requestAnimationFrame(() => {
      transitionFrame = requestAnimationFrame(() => {
        document.documentElement.removeAttribute('data-theme-switching');
      });
    });
  }

  function initializeControl() {
    const button = document.getElementById('themeToggle');
    updateControl();
    if (!button) return;

    button.addEventListener('click', () => {
      setTheme(effectiveTheme() === 'dark' ? 'light' : 'dark');
    });

    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY || event.key === null) setTheme(readTheme(), false);
    });

    systemPreference.addEventListener('change', () => {
      if (themeState === 'system') setTheme('system', false);
    });
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) setTheme(readTheme(), false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeControl, { once: true });
  } else {
    initializeControl();
  }
})();
