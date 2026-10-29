# Portfolio V2 — Kilian Faure

Portfolio statique en HTML, CSS et JavaScript. Le dossier peut être placé à la racine du dépôt `KilianFAURE.github.io` sans remplacer son `index.html` actuel : la V2 reste accessible dans `portfolio-v2/`.

## Tester en local
1. Ouvrir `portfolio-v2/index.html` dans VS Code.
2. Lancer avec **Live Server** ou ouvrir le fichier dans un navigateur.
3. Tester le menu, les liens, les cartes du parcours, le téléchargement du CV et la version mobile.

## Personnalisation restante
- **Avatar :** ajouter le fichier `avatar.png` dans `assets/avatar/`. Le chemin final doit être `portfolio-v2/assets/avatar/avatar.png`. Le site l’affichera automatiquement ; aucun changement de code n’est nécessaire. Format conseillé : PNG transparent, personnage entier, vertical.
- **LinkedIn :** le lien générique a été retiré pour éviter de diriger les recruteurs vers une page incorrecte. Ajouter le lien exact du profil quand il sera disponible.
- **CV :** le bouton pointe vers `documents/CV_Kilian_Faure.pdf`. Vérifier que cette version du CV est bien celle que tu souhaites publier avant mise en ligne.
- **E-mail :** configuré sur `k.faure12@gmail.com`, d’après le CV fourni.

## Structure
- `index.html` : structure et contenu.
- `css/style.css` : design, responsive et animations.
- `js/main.js` : menu mobile, année et apparition progressive.
- `js/journey.js` : synchronisation des étapes, repères de carte et avatar.
- `assets/avatar/avatar.png` : avatar à ajouter par toi.
- `documents/CV_Kilian_Faure.pdf` : CV téléchargé.

La carte est un SVG schématique intégré à la page : aucune clé API ou service payant n’est nécessaire.

## Publication GitHub Pages
1. Conserver le `index.html` principal du dépôt si tu veux garder l’ancien site accessible.
2. Ajouter et pousser le dossier `portfolio-v2/` dans GitHub.
3. Tester la version publiée à l’adresse `https://kilianfaure.github.io/portfolio-v2/`.
4. Quand la V2 est validée, décider si elle reste dans ce sous-dossier ou si elle remplace le site principal. Ne remplace pas l’ancien `index.html` avant cette validation.
