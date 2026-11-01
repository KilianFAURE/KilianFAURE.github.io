(() => {
  // Petit secret : chaque clic sur la photo d'accueil blesse un peu plus le personnage.
  const btn = document.getElementById("portrait-btn");
  const img = document.getElementById("portrait-img");
  const text = document.getElementById("scribble-text");
  if (!btn || !img) return;

  const normal = "assets/avatar/tete-avatar-kilian.webp";
  const hurt = [1, 2, 3, 4].map((n) => `assets/avatar/tete-avatar-blesse-${n}.webp`);
  const lines = ["c’est moi !", "aïe !", "hé, doucement…", "ça commence à faire mal", "OK, j’arrête… 🥴"];
  let stage = 0;
  let timer;

  // Préchargement discret une fois la page chargée
  window.addEventListener("load", () => setTimeout(() => hurt.forEach((src) => { new Image().src = src; }), 1500));

  btn.addEventListener("click", () => {
    clearTimeout(timer);
    stage = stage >= 4 ? 0 : stage + 1;
    img.src = stage === 0 ? normal : hurt[stage - 1];
    if (text) text.textContent = stage === 0 ? "ouf, tout est réparé !" : lines[stage];
    btn.classList.remove("is-hit");
    void btn.offsetWidth;
    btn.classList.add("is-hit");
    if (stage === 0 && text) timer = setTimeout(() => { text.textContent = lines[0]; }, 2600);
  });
})();
