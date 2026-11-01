(() => {
  // Thème clair / sombre + sons (coq au passage en clair, hibou au passage en sombre).
  // Les sons ne se jouent que lorsque la personne clique sur le bouton, jamais au chargement.
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const soundBtn = document.getElementById("sound-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const read = (key, fallback) => { try { return localStorage.getItem(key) ?? fallback; } catch (e) { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch (e) { /* stockage indisponible */ } };

  let soundOn = read("kf-sound", "on") !== "off";
  const sounds = {};

  function play(name) {
    if (!soundOn) return;
    Object.values(sounds).forEach((a) => { a.pause(); a.currentTime = 0; });
    if (!sounds[name]) { sounds[name] = new Audio(`assets/sounds/${name}.mp3`); sounds[name].volume = 0.55; }
    sounds[name].play().catch(() => {});
  }

  function paintLabels() {
    const dark = root.dataset.theme !== "light";
    themeBtn?.setAttribute("aria-label", dark ? "Passer en mode clair" : "Passer en mode sombre");
    themeBtn?.setAttribute("title", dark ? "Mode clair" : "Mode sombre");
    soundBtn?.setAttribute("aria-pressed", String(soundOn));
    soundBtn?.setAttribute("aria-label", soundOn ? "Couper le son" : "Activer le son");
    soundBtn?.setAttribute("title", soundOn ? "Son activé" : "Son coupé");
    if (themeColor) themeColor.setAttribute("content", dark ? "#0B1220" : "#eef4f7");
  }

  themeBtn?.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.classList.add("theme-anim");
    root.dataset.theme = next;
    write("kf-theme", next);
    paintLabels();
    play(next === "light" ? "coq" : "hibou");
    setTimeout(() => root.classList.remove("theme-anim"), 500);
  });

  soundBtn?.addEventListener("click", () => {
    soundOn = !soundOn;
    write("kf-sound", soundOn ? "on" : "off");
    if (!soundOn) Object.values(sounds).forEach((a) => { a.pause(); a.currentTime = 0; });
    paintLabels();
  });

  paintLabels();
})();
