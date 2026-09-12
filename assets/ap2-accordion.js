(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 340;
  const easing = 'cubic-bezier(.22, 1, .36, 1)';

  function finish(card, animation, open) {
    if (card._ap2AccordionAnimation !== animation) return;
    card.open = open;
    card.classList.remove('is-animating');
    card.style.height = '';
    card.style.overflow = '';
    card._ap2AccordionAnimation = null;
  }

  function animate(card, open) {
    const summary = card.querySelector(':scope > summary');
    if (!summary) return;

    card._ap2AccordionAnimation?.cancel();
    if (reducedMotion.matches) {
      card.open = open;
      return;
    }

    const startHeight = card.getBoundingClientRect().height;
    if (open) card.open = true;
    const endHeight = open
      ? summary.getBoundingClientRect().height + (card.querySelector(':scope > .card-body')?.getBoundingClientRect().height || 0) + 2
      : summary.getBoundingClientRect().height + 2;

    card.classList.add('is-animating');
    card.style.overflow = 'hidden';
    card.style.height = `${startHeight}px`;

    const animation = card.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration, easing }
    );
    card._ap2AccordionAnimation = animation;
    animation.onfinish = () => finish(card, animation, open);
    animation.oncancel = () => {
      if (card._ap2AccordionAnimation !== animation) return;
      card.classList.remove('is-animating');
      card.style.height = '';
      card.style.overflow = '';
    };
  }

  for (const card of document.querySelectorAll('details.card')) {
    const summary = card.querySelector(':scope > summary');
    summary?.addEventListener('click', event => {
      if (event.target.closest('button, a, input, label')) return;
      event.preventDefault();
      animate(card, !card.open);
    });
  }
})();
