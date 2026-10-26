
/*
 * Première utilisation de JavaScript :
 * afficher automatiquement l'année actuelle.
 */

const yearElement = document.querySelector("#year");

yearElement.textContent = new Date().getFullYear();
