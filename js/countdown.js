(() => {
  "use strict";

  const jourElement = document.getElementById("jour");
  const detailElement = document.getElementById("countdown-detail");
  const dateElement = document.getElementById("date");
  const heureElement = document.getElementById("heure");
  const fullscreenButton = document.getElementById("fullscreen-button");
  const evenement = new Date(CONFIG.evenement);
  let derniereValeur = "";

  if (Number.isNaN(evenement.getTime())) {
    jourElement.textContent = "DATE INVALIDE";
    console.error("La date définie dans config.js est invalide.");
    return;
  }

  function debutDeJour(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function calculerLibelle(now) {
    const millisecondesParJour = 24 * 60 * 60 * 1000;
    const joursRestants = Math.round((debutDeJour(evenement) - debutDeJour(now)) / millisecondesParJour);
    if (joursRestants > 0) return `J-${joursRestants}`;
    if (joursRestants === 0) return "JOUR J";
    return "TERMINÉ";
  }

  function actualiserCompte() {
    const libelle = calculerLibelle(new Date());
    if (libelle === derniereValeur) return;
    jourElement.classList.remove("is-changing");
    void jourElement.offsetWidth;
    jourElement.textContent = libelle;
    jourElement.classList.add("is-changing");
    detailElement.textContent = libelle === "TERMINÉ" ? "L'ÉVÉNEMENT EST TERMINÉ" : "AVANT LA CÉRÉMONIE";
    derniereValeur = libelle;
  }

  function afficherHeure() {
    const maintenant = new Date();
    const date = maintenant.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    dateElement.textContent = date.charAt(0).toUpperCase() + date.slice(1);
    heureElement.textContent = maintenant.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    heureElement.dateTime = maintenant.toISOString();
  }

  async function basculerPleinEcran() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (erreur) {
      console.warn("Le plein écran n'est pas disponible dans ce navigateur.", erreur);
    }
  }

  function mettreAJourBoutonPleinEcran() {
    const estEnPleinEcran = Boolean(document.fullscreenElement);
    fullscreenButton.innerHTML = estEnPleinEcran ? '<span aria-hidden="true">×</span> Quitter le plein écran' : '<span aria-hidden="true">⛶</span> Plein écran';
  }

  fullscreenButton.addEventListener("click", basculerPleinEcran);
  document.addEventListener("fullscreenchange", mettreAJourBoutonPleinEcran);
  actualiserCompte();
  afficherHeure();
  window.setInterval(afficherHeure, 1000);
  window.setInterval(actualiserCompte, 60 * 1000);
})();
