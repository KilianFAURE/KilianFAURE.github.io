/* Parcours interactif : scroll séquentiel, carte, avatar et navigation clavier/boutons. */
(() => {
  const cards = [...document.querySelectorAll('.timeline-card')];
  const markers = [...document.querySelectorAll('.map-marker')];
  const avatar = document.querySelector('.avatar-placeholder');
  const avatarImage = document.querySelector('.avatar-image');
  const avatarFallback = document.querySelector('.avatar-fallback');
  const previous = document.querySelector('.journey-prev');
  const next = document.querySelector('.journey-next');
  const progress = document.querySelector('.journey-progress');
  const dots = document.querySelector('.journey-step-dots');
  const triggers = [...document.querySelectorAll('.journey-scroll-trigger')];
  if (!cards.length) return;

  if (avatarImage) {
    const showAvatar = () => { avatarImage.hidden = false; if (avatarFallback) avatarFallback.hidden = true; };
    avatarImage.addEventListener('load', showAvatar);
    avatarImage.addEventListener('error', () => { avatarImage.hidden = true; if (avatarFallback) avatarFallback.hidden = false; });
    if (avatarImage.complete && avatarImage.naturalWidth > 0) showAvatar();
  }
  // Positions exprimées dans la carte de fond (1536 × 1024). L'avatar repose juste au-dessus du point.
  const positions = {
    clermont: { left: 47.7, top: 67.6 },
    'rians': { left: 45, top: 45.9 },
    'saint-etienne': { left: 55.1, top: 72.1 },
    issoire: { left: 47.5, top: 72.1 },
    singen: { left: 85.9, top: 39.1 }
  };
  let activeIndex = Math.max(0, cards.findIndex(card => card.classList.contains('is-active')));
  let isScrollActivating = false;

  if (dots) {
    cards.forEach((card, index) => {
      const dot = document.createElement('button'); dot.type = 'button'; dot.className = 'journey-dot';
      dot.setAttribute('aria-label', `Afficher l'étape ${index + 1} : ${card.querySelector('h3')?.textContent || ''}`);
      dot.addEventListener('click', () => activate(index, true)); dots.appendChild(dot);
    });
  }
  function activate(index, shouldScroll = false) {
    activeIndex = Math.max(0, Math.min(cards.length - 1, index));
    const card = cards[activeIndex];
    cards.forEach((item, i) => {
      const active = i === activeIndex; item.hidden = !active; item.setAttribute('aria-hidden', String(!active));
      item.classList.toggle('is-active', active);
    });
    const place = card.dataset.place || 'clermont';
    markers.forEach(marker => {
      const active = marker.dataset.place === place; marker.classList.toggle('is-active', active); marker.setAttribute('aria-pressed', String(active));
    });
    if (avatar && positions[place]) {
      avatar.style.left = `${positions[place].left}%`; avatar.style.top = `${positions[place].top}%`;
    }
    if (previous) previous.disabled = activeIndex === 0;
    if (next) next.disabled = activeIndex === cards.length - 1;
    if (progress) progress.textContent = `Étape ${activeIndex + 1} sur ${cards.length}`;
    if (dots) [...dots.children].forEach((dot, i) => { dot.classList.toggle('is-active', i === activeIndex); dot.setAttribute('aria-current', i === activeIndex ? 'step' : 'false'); });
    if (shouldScroll && !isScrollActivating && triggers[activeIndex]) {
      isScrollActivating = true; triggers[activeIndex].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      window.setTimeout(() => { isScrollActivating = false; }, 700);
    }
  }
  previous?.addEventListener('click', () => activate(activeIndex - 1, true));
  next?.addEventListener('click', () => activate(activeIndex + 1, true));
  // Défilement : le déclencheur le plus proche du centre de l'écran choisit la carte.
  if (triggers.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (isScrollActivating) return;
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - innerHeight / 2) - Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - innerHeight / 2));
      if (visible[0]) activate(Number(visible[0].target.dataset.scrollStep));
    }, { rootMargin: '-38% 0px -38% 0px', threshold: 0 });
    triggers.forEach(trigger => observer.observe(trigger));
  }
  markers.forEach(marker => {
    marker.setAttribute('role', 'button'); marker.setAttribute('tabindex', '0');
    marker.setAttribute('aria-label', `Afficher une étape à ${marker.dataset.place}`);
    const selectLocation = () => { const matches = cards.map((card, index) => ({ card, index })).filter(item => item.card.dataset.place === marker.dataset.place); if (!matches.length) return; const current = matches.findIndex(item => item.index === activeIndex); activate(matches[(current + 1) % matches.length].index, true); };
    marker.addEventListener('click', selectLocation); marker.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectLocation(); } });
  });
  activate(activeIndex);
})();
