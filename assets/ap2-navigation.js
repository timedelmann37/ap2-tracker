(() => {
  'use strict';
  const wrap = document.getElementById('navThemenWrap');
  const button = document.getElementById('navThemenBtn');
  const menu = document.getElementById('navThemenMenu');
  if (!wrap || !button || !menu) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 821px)');
  const links = [...menu.querySelectorAll('a')];
  let isOpen = false;
  let animation;
  let hoverOpenTimer;
  let hoverCloseTimer;
  button.setAttribute('aria-controls', menu.id);
  menu.inert = true;

  function setOpen(next, restoreFocus = false) {
    if (isOpen === next) return;
    const wasHidden = menu.hidden;
    const style = getComputedStyle(menu);
    const from = { opacity: wasHidden ? '0' : style.opacity,
      transform: wasHidden ? 'translateY(-4px)' : style.transform };
    animation?.cancel();
    isOpen = next;
    button.setAttribute('aria-expanded', String(next));
    wrap.classList.toggle('open', next);
    menu.inert = !next;
    if (restoreFocus) button.focus();
    menu.hidden = false;
    const finish = () => { menu.hidden = !isOpen; animation = undefined; };
    if (reduced.matches || !menu.animate) { finish(); return; }
    animation = menu.animate([from, {
      opacity: next ? '1' : '0',
      transform: next ? 'translateY(0)' : 'translateY(-4px)'
    }], { duration: 150, easing: 'cubic-bezier(.65,0,.35,1)' });
    animation.onfinish = finish;
  }

  function clearHoverTimers() {
    clearTimeout(hoverOpenTimer);
    clearTimeout(hoverCloseTimer);
  }

  // The desktop reference exposes its navigation on pointer hover. A short
  // close delay bridges the visual gap between the trigger and the popover.
  wrap.addEventListener('pointerenter', event => {
    if (!desktop.matches || event.pointerType === 'touch') return;
    clearHoverTimers();
    hoverOpenTimer = setTimeout(() => setOpen(true), 50);
  });
  wrap.addEventListener('pointerleave', event => {
    if (!desktop.matches || event.pointerType === 'touch') return;
    clearTimeout(hoverOpenTimer);
    hoverCloseTimer = setTimeout(() => {
      if (!wrap.matches(':hover')) setOpen(false);
    }, 140);
  });

  button.addEventListener('click', () => setOpen(!isOpen));
  button.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    setOpen(true);
    (event.key === 'ArrowDown' ? links[0] : links.at(-1))?.focus();
  });
  menu.addEventListener('keydown', event => {
    const current = links.indexOf(document.activeElement);
    const offsets = { ArrowDown: 1, ArrowUp: -1 };
    if (event.key in offsets) {
      event.preventDefault();
      links[(current + offsets[event.key] + links.length) % links.length]?.focus();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      (event.key === 'Home' ? links[0] : links.at(-1))?.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!wrap.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setOpen(false, wrap.contains(document.activeElement));
    }
  });
  wrap.addEventListener('focusout', event => {
    if (!wrap.contains(event.relatedTarget)) setOpen(false);
  });
  desktop.addEventListener('change', () => {
    clearHoverTimers();
    if (!desktop.matches) setOpen(false);
  });
  reduced.addEventListener('change', () => { if (reduced.matches) animation?.finish(); });
})();
