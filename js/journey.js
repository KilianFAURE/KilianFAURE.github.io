/* Parcours interactif : une seule étape affichée, synchronisée avec la carte et l'avatar. */
(() => {
  const cards = [...document.querySelectorAll('.timeline-card')];
  const markers = [...document.querySelectorAll('.map-marker')];
  const avatar = document.querySelector('.avatar-placeholder');
  const avatarImage = document.querySelector('.avatar-image');
  const avatarFallback = document.querySelector('.avatar-fallback');
  const avatarHint = document.querySelector('.avatar-hint');
  const previous = document.querySelector('.journey-prev');
  const next = document.querySelector('.journey-next');
  const progress = document.querySelector('.journey-progress');
  const dots = document.querySelector('.journey-step-dots');
  if (!cards.length) return;

  if (avatarImage) {
    const showAvatar = () => {
      avatarImage.hidden = false;
      if (avatarFallback) avatarFallback.hidden = true;
      if (avatarHint) avatarHint.hidden = true;
    };
    avatarImage.addEventListener('load', showAvatar);
    avatarImage.addEventListener('error', () => { avatarImage.hidden = true; });
    if (avatarImage.complete && avatarImage.naturalWidth > 0) showAvatar();
  }

  const positions = {
    clermont: { left: '45.6%', top: '44%' },
    issoire: { left: '44.9%', top: '48.8%' },
    singen: { left: '76.8%', top: '30.3%' }
  };
  let activeIndex = Math.max(0, cards.findIndex(card => card.classList.contains('is-active')));

  if (dots) {
    cards.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'journey-dot';
      dot.setAttribute('aria-label', `Afficher l'étape ${index + 1} : ${card.querySelector('h3')?.textContent || ''}`);
      dot.addEventListener('click', () => activate(index));
      dots.appendChild(dot);
    });
  }

  function activate(index, shouldScroll = false) {
    activeIndex = Math.max(0, Math.min(cards.length - 1, index));
    const card = cards[activeIndex];
    cards.forEach((item, i) => {
      const active = i === activeIndex;
      item.hidden = !active;
      item.setAttribute('aria-hidden', String(!active));
      item.classList.toggle('is-active', active);
      const button = item.querySelector('.step-select');
      if (button) button.setAttribute('aria-pressed', String(active));
    });

    const place = card.dataset.place || 'clermont';
    markers.forEach(marker => {
      const active = marker.dataset.place === place;
      marker.classList.toggle('is-active', active);
      marker.setAttribute('aria-pressed', String(active));
    });
    if (avatar && positions[place]) {
      avatar.style.left = positions[place].left;
      avatar.style.top = positions[place].top;
    }
    if (previous) previous.disabled = activeIndex === 0;
    if (next) next.disabled = activeIndex === cards.length - 1;
    if (progress) progress.textContent = `Étape ${activeIndex + 1} sur ${cards.length}`;
    if (dots) [...dots.children].forEach((dot, i) => {
      dot.classList.toggle('is-active', i === activeIndex);
      dot.setAttribute('aria-current', i === activeIndex ? 'step' : 'false');
    });
    if (shouldScroll) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.querySelector('.journey-detail')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
    }
  }

  previous?.addEventListener('click', () => activate(activeIndex - 1));
  next?.addEventListener('click', () => activate(activeIndex + 1));
  cards.forEach((card, index) => card.querySelector('.step-select')?.addEventListener('click', () => activate(index)));

  // Un clic sur un repère géographique parcourt les étapes associées à ce lieu.
  markers.forEach(marker => {
    marker.setAttribute('role', 'button');
    marker.setAttribute('tabindex', '0');
    marker.setAttribute('aria-label', `Afficher une étape à ${marker.dataset.place}`);
    const selectLocation = () => {
      const matches = cards.map((card, index) => ({ card, index }))
        .filter(item => item.card.dataset.place === marker.dataset.place);
      if (!matches.length) return;
      const currentMatch = matches.findIndex(item => item.index === activeIndex);
      activate(matches[(currentMatch + 1) % matches.length].index, true);
    };
    marker.addEventListener('click', selectLocation);
    marker.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectLocation(); }
    });
  });

  activate(activeIndex);
})();
