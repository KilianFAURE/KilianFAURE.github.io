
/* BASE */
:root {
    --background: #0b1120;
    --surface: #141e32;
    --text: #f1f5f9;
    --muted: #a0aec0;
    --accent: #60a5fa;
    --border: #293750;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, sans-serif;
    background: var(--background);
    color: var(--text);
    line-height: 1.7;
}

a {
    color: inherit;
    text-decoration: none;
}

/* NAVIGATION */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 8%;
    border-bottom: 1px solid var(--border);
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
}

.logo span,
h1 span {
    color: var(--accent);
}

nav {
    display: flex;
    gap: 25px;
}

nav a {
    color: var(--muted);
    transition: color 0.2s;
}

nav a:hover {
    color: var(--accent);
}

/* ACCUEIL */
.hero {
    min-height: 75vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    padding: 90px 12%;
    background:
        radial-gradient(
            ellipse at 85% 30%,
            #1c3155 0%,
            transparent 55%
        );
}

.hero-content {
    max-width: 650px;
}

.eyebrow {
    color: var(--accent);
    font-size: 0.8rem;
    letter-spacing: 3px;
    font-weight: bold;
    margin-bottom: 18px;
}

h1 {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    line-height: 1.15;
    margin-bottom: 22px;
}

h2 {
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    line-height: 1.3;
    margin-bottom: 20px;
}

.hero-content h2 {
    color: #cbd5e1;
    font-size: 1.5rem;
}

.intro {
    color: var(--muted);
    max-width: 560px;
    margin-bottom: 30px;
}

/* BOUTONS */
.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.button {
    display: inline-block;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: bold;
    transition: transform 0.2s, background 0.2s;
}

.button:hover {
    transform: translateY(-3px);
}

.primary {
    background: var(--accent);
    color: #07111f;
}

.secondary {
    border: 1px solid var(--border);
}

/* CARTE PROFIL */
.hero-card {
    min-width: 250px;
    max-width: 320px;
    width: 100%;
    background: var(--surface);
    padding: 30px;
    border: 1px solid var(--border);
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 60px #00000030;
}

.avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto 20px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #2563eb, #67e8f9);
    color: #07111f;
    font-size: 2rem;
    font-weight: bold;
}

.card-label {
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 2px;
}

.hero-card h3 {
    margin: 10px 0;
}

.hero-card p {
    color: var(--muted);
}

.status {
    margin-top: 20px;
    font-size: 0.8rem;
}

.status span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    margin-right: 6px;
}

/* SECTIONS */
.section {
    padding: 80px 12%;
    max-width: 1500px;
    margin: auto;
}

.section > p:not(.eyebrow) {
    color: var(--muted);
    max-width: 700px;
}

/* PARCOURS */
.timeline {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin-top: 35px;
}

.journey-card {
    background: var(--surface);
    padding: 25px;
    border: 1px solid var(--border);
    border-radius: 14px;
    transition: transform 0.25s, border-color 0.25s;
}

.journey-card:hover {
    transform: translateY(-6px);
    border-color: var(--accent);
}

.journey-card h3 {
    margin: 12px 0;
}

.journey-card p {
    color: var(--muted);
}

.year {
    color: var(--accent);
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 1px;
}

/* COMPÉTENCES */
.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 25px;
}

.skill {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 12px 18px;
    border-radius: 10px;
}

/* CONTACT ET PIED DE PAGE */
.contact {
    text-align: center;
}

.contact p {
    margin: 0 auto 25px;
}

footer {
    padding: 25px;
    text-align: center;
    color: var(--muted);
    border-top: 1px solid var(--border);
}

/* ADAPTATION AUX MOBILES */
@media (max-width: 800px) {
    .navbar {
        flex-direction: column;
        gap: 15px;
    }

    nav {
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px 18px;
    }

    .hero {
        flex-direction: column;
        align-items: flex-start;
        padding: 60px 7%;
    }

    .hero-card {
        max-width: 100%;
    }

    .section {
        padding: 60px 7%;
    }

    .timeline {
        grid-template-columns: 1fr;
    }
}

