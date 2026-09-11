/* Shared atmospheric layer. No learning state or scroll position is changed. */
(() => {
  const start = () => {
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const atmosphere = document.createElement('div');
    atmosphere.className = 'space-atmosphere';
    atmosphere.setAttribute('aria-hidden', 'true');
    atmosphere.innerHTML = `<div class="space-aurora"></div><div class="space-trails">
      <svg viewBox="0 0 1440 1000" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="ap2-trail-violet" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#b997ff" stop-opacity="0"/>
            <stop offset=".42" stop-color="#cbb4ff" stop-opacity=".8"/>
            <stop offset="1" stop-color="#9d64d9" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="ap2-trail-cyan" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#67cfcf" stop-opacity="0"/>
            <stop offset=".65" stop-color="#83d4de" stop-opacity=".45"/>
            <stop offset="1" stop-color="#83d4de" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="M1320 -100C1700 130 1510 380 1370 590S1250 890 1530 1100" stroke="url(#ap2-trail-violet)"/>
        <path d="M-160 120C200 340 50 510-80 710S-30 990 190 1100" stroke="url(#ap2-trail-cyan)"/>
      </svg>
    </div>`;
    document.body.prepend(atmosphere);

    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'motion-control';
    control.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="pause" d="M9 6v12M15 6v12"/><path class="play" d="m9 6 9 6-9 6Z"/></svg>';
    let paused = false;
    try { paused = localStorage.getItem('ap2-motion-paused') === 'true'; } catch {}
    const sync = () => {
      root.dataset.motion = document.hidden || paused || reduced.matches ? 'paused' : 'running';
      control.hidden = reduced.matches;
      control.setAttribute('aria-pressed', String(paused));
      control.title = paused ? 'Animationen fortsetzen' : 'Animationen pausieren';
      control.setAttribute('aria-label', control.title);
    };
    control.addEventListener('click', () => {
      paused = !paused;
      try { localStorage.setItem('ap2-motion-paused', String(paused)); } catch {}
      sync();
    });
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', () => {
      root.dataset.motion = document.hidden ? 'paused' : paused || reduced.matches ? 'paused' : 'running';
    });
    document.body.append(control);
    sync();

    // Track width changes rather than checkboxes: imports and synced progress
    // receive the same feedback, and no progress logic is duplicated here.
    const widths = new WeakMap();
    const timers = new WeakMap();
    document.querySelectorAll('.track > .fill').forEach(fill => widths.set(fill, parseFloat(fill.style.width) || 0));
    const progress = new MutationObserver(records => {
      for (const { target } of records) {
        if (!(target instanceof HTMLElement) || !target.matches('.track > .fill')) continue;
        const next = parseFloat(target.style.width) || 0;
        const previous = widths.get(target) ?? next;
        widths.set(target, next);
        if (next <= previous || root.dataset.motion === 'paused') continue;
        const rail = target.parentElement;
        clearTimeout(timers.get(rail));
        rail.classList.add('progress-gained');
        timers.set(rail, setTimeout(() => rail.classList.remove('progress-gained'), 900));
      }
    });
    progress.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['style'] });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
