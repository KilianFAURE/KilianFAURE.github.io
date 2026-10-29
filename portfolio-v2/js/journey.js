/* Synchronise la carte schématique avec l'étape sélectionnée ou visible */
(() => {
  const cards = [...document.querySelectorAll(".timeline-card")];
  const markers = [...document.querySelectorAll(".map-marker")];
  const avatar = document.querySelector(".avatar-placeholder");
  const avatarImage = document.querySelector(".avatar-image");
  const avatarFallback = document.querySelector(".avatar-fallback");
  if (avatarImage) {
    avatarImage.addEventListener("load", () => {
      avatarImage.hidden = false;
      if (avatarFallback) avatarFallback.hidden = true;
    });
    avatarImage.addEventListener("error", () => { avatarImage.hidden = true; });
    if (avatarImage.complete && avatarImage.naturalWidth > 0) {
      avatarImage.hidden = false;
      if (avatarFallback) avatarFallback.hidden = true;
    }
  }
  if (!cards.length || !markers.length) return;

  const positions = {
    clermont: { left: "46%", top: "50%" },
    issoire: { left: "45%", top: "59%" },
    singen: { left: "77%", top: "23%" }
  };

  function activateCard(card) {
    cards.forEach((item) => {
      const active = item === card;
      item.classList.toggle("is-active", active);
      const button = item.querySelector(".step-select");
      if (button) button.setAttribute("aria-pressed", String(active));
    });

    const place = card.dataset.place || "clermont";
    markers.forEach((marker) => {
      marker.classList.toggle("is-active", marker.dataset.place === place);
    });

    if (avatar && positions[place]) {
      avatar.style.left = positions[place].left;
      avatar.style.top = positions[place].top;
    }
  }

  cards.forEach((card) => {
    const button = card.querySelector(".step-select");
    if (button) {
      button.addEventListener("click", () => {
        activateCard(card);
        card.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
      });
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) activateCard(visible[0].target);
    }, { threshold: [0.25, 0.45, 0.65], rootMargin: "-15% 0px -20% 0px" });
    cards.forEach((card) => observer.observe(card));
  }

  activateCard(cards[0]);
})();
