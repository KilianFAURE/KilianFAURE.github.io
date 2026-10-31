# Portfolio — Kilian Faure

Portfolio statique (HTML, CSS, JavaScript) publié avec GitHub Pages : https://kilianfaure.github.io/

## Tester en local
Ouvrir le dossier dans VS Code et lancer **Live Server** (ou `python3 -m http.server` puis http://localhost:8000).
Vérifier : menu, parcours (boutons, points, carte, flèches ← →), téléchargement du CV, version mobile.

## Structure
- `index.html` : contenu et structure (meta SEO, Open Graph, données structurées).
- `css/style.css` : design, responsive, animations (la fin du fichier contient les ajustements V3).
- `js/main.js` : menu mobile, lien de navigation actif, apparition progressive.
- `js/journey.js` : parcours interactif (étapes, carte, avatar, navigation clavier).
- `assets/` : images **au format WebP** (parcours, logos, avatar, carte), favicons, image de partage `og-image.jpg`.
- `documents/CV_Kilian_Faure.pdf` : CV téléchargeable (garder exactement ce nom).
- `404.html`, `robots.txt`, `sitemap.xml` : pages et fichiers utiles au référencement.

## Ajouter ou remplacer une image du parcours
1. Préparer l'image (idéalement ~480 px de large, ratio proche de 4/5).
2. L'enregistrer en **WebP** sous `assets/images/parcours/etape-0X.webp` (minuscules : GitHub Pages distingue majuscules et minuscules).
3. Avant de publier : pas de fichiers `.png~`, `.jfif` ou copies de sauvegarde dans le dépôt.

## À compléter
- Liens vers les projets GitHub / démonstrations, si possible non confidentiels.
