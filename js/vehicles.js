(() => {
  "use strict";

  /* =========================================================
   *  VEHICLES SHOWCASE — Fullscreen Cinematic Theme
   * ========================================================= */

  const VEHICLES = [
    {
      id: 1,
      name: "TOYOTA FORTUNER",
      subtitle: "Le Roi du Tout-Terrain",
      category: "SUV 4×4 — FLOTTE SOUTARAH",
      specs: ["Diesel 2.8L GD6 Turbo", "204 ch / 500 Nm", "4WD avec Diff Lock", "7 places — Finition VXR"],
      badge: "BEST SELLER",
      media: [
        "images/image/Fortuner3.png",
        "images/image/Fortuner4.png",
      ]
    },
    {
      id: 2,
      name: "TOYOTA TACOMA",
      subtitle: "Le Pick-up Légendaire",
      category: "PICK-UP — FLOTTE SOUTARAH",
      specs: ["Moteur V6 3.5L", "278 ch / 359 Nm", "4WD Multi-Terrain", "Charge utile 700 kg"],
      badge: "ROBUSTE",
      media: [
        "images/image/Tacoma01.png",
        "images/image/Tacoma03.png",
        "images/image/Tacoma06.png",
      ]
    },
    {
      id: 3,
      name: "ISUZU D-MAX",
      subtitle: "La Force de Travail",
      category: "PICK-UP PROFESSIONNEL — FLOTTE SOUTARAH",
      specs: ["Diesel 3.0L 4JJ3", "190 ch / 450 Nm", "4WD avec mode Lock", "Benne renforcée"],
      badge: "PROFESSIONNEL",
      media: [
        "images/image/Dmax1.png",
        "images/image/Dmax4.png",
        "images/image/Dmax5.png",
      ]
    },
    {
      id: 4,
      name: "RENAULT OROCH",
      subtitle: "Pick-up Robuste & Polyvalent",
      category: "PICK-UP DOUBLE CABINE — FLOTTE SOUTARAH",
      specs: ["Diesel 1.6L dCi 130", "130 ch / 320 Nm", "Benne aluminium 1 000 kg", "4WD"],
      badge: "TERRAIN",
      media: [
        "images/image/Oroch02.png",
        "images/image/Oroch03.png",
        "images/image/Oroch04.png",
      ]
    },
    {
      id: 5,
      name: "RENAULT DOKKER",
      subtitle: "L'Utilitaire Polyvalent",
      category: "UTILITAIRE — FLOTTE SOUTARAH",
      specs: ["Diesel 1.5L dCi", "90 ch", "Grande capacité de chargement", "6 places"],
      badge: "UTILITAIRE",
      media: [
        "images/image/Dokker1.png",
        "images/image/Dokker12.jpg",
        "images/image/Dokker5.png",
      ]
    },
    {
      id: 6,
      name: "SUZUKI FRONX",
      subtitle: "Crossover Élégant & Dynamique",
      category: "SUV COMPACT — FLOTTE SOUTARAH",
      specs: ["Hybride 1.5L SHVS", "102 ch — Conso. 4.9L/100", "Écran 9 pouces Apple CarPlay", "Caméra 360°"],
      badge: "NEW 2026",
      media: [
        "images/image/Fronx2.png",
        "images/image/Fronx6.png",
        "images/image/Fronx7.png",
      ]
    },
    {
      id: 7,
      name: "SUZUKI GRAND VITARA",
      subtitle: "L'Aventurier Incontournable",
      category: "SUV TOUT-TERRAIN — FLOTTE SOUTARAH",
      specs: ["Hybride 1.5L Allgrip", "102 ch / 135 Nm", "Mode Auto 4WD intelligent", "Toit panoramique"],
      badge: "POPULAIRE",
      media: [
        "images/image/Grand Vitara1.png",
        "images/image/Grand Vitara2.png",
        "images/image/Grand Vitara3.png",
        "images/image/Grand Vitara5.png",
      ]
    },
    {
      id: 8,
      name: "MITSUBISHI PAJERO",
      subtitle: "La Légende Continue",
      category: "SUV PREMIUM — FLOTTE SOUTARAH",
      specs: ["4x4 Super Select", "7 places", "Cuir Premium", "V6 3.8L 250 ch"],
      badge: "PREMIUM",
      media: [
        "images/image/Pajero5.png",
        "images/image/Pajero13.png",
      ]
    },
    {
      id: 9,
      name: "MINIBUS",
      subtitle: "Confort pour Tous",
      category: "TRANSPORT COLLECTIF — FLOTTE SOUTARAH",
      specs: ["Grande capacité passagers", "Climatisation", "Confort Haut de Gamme"],
      badge: "COLLECTIF",
      media: [
        "images/image/MiniBus1.png",
        "images/image/MiniBus2.png",
        "images/image/MiniBus3.png",
      ]
    },
    {
      id: 10,
      name: "VAN EXPRESS",
      subtitle: "La Livraison Rapide",
      category: "FOURGON — FLOTTE SOUTARAH",
      specs: ["Diesel économique", "Grande capacité de chargement", "Fiabilité Renault"],
      badge: "EXPRESS",
      media: [
        "images/image/Van Express1.png",
        "images/image/Van Express2.jpg",
        "images/image/Van Express3.png",
        "images/image/Renault Van express.png",
      ]
    },
    {
      id: 11,
      name: "FLOTTE SOUTARAH",
      subtitle: "L'excellence en mouvement",
      category: "VUE D'ENSEMBLE — FLOTTE SOUTARAH",
      specs: ["10 véhicules disponibles", "Flotte diversifiée"],
      badge: "SHOWROOM",
      media: [
        "images/image/17eBbOsf.jpg",
        "images/image/hdwFM38k.jpg",
        "images/image/Qm12AbAc.jpg",
      ]
    },
  ];

  /* ---------- State ---------- */
  let currentVehicle = 0;
  let currentMediaIndex = 0;
  let showcaseInterval = null;
  let subInterval = null;
  const SLIDE_DURATION = 15000; // ms per vehicle (15s so we can see the videos)
  const SUB_MEDIA_DURATION = 4000; // ms per photo/video change

  /* ---------- DOM ---------- */
  let showcase = null;

  /* ---------- Render ---------- */
  function renderVehicle(index) {
    const v = VEHICLES[index];
    const mediaContainer = document.getElementById("vp-media-container");
    const headerArea = document.querySelector(".vp-header-area");
    if (!mediaContainer || !headerArea) return;

    // Reset animation
    headerArea.style.animation = 'none';
    void headerArea.offsetWidth; // Trigger reflow
    headerArea.style.animation = 'vp-card-enter 1s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';

    // Update Text
    const catParts = v.category.split('—');
    if (catParts.length > 1) {
      document.getElementById("vp-category").innerHTML = `${catParts[0]} <span>— ${catParts[1]}</span>`;
    } else {
      document.getElementById("vp-category").textContent = v.category;
    }
    document.getElementById("vp-name").textContent = v.name;
    document.getElementById("vp-subtitle").textContent = v.subtitle;
    
    // Specs
    const specsList = document.getElementById("vp-specs");
    specsList.innerHTML = v.specs.map(s => `<li class="vp-spec-item">${s}</li>`).join("");

    // Build Media Elements
    mediaContainer.innerHTML = '';
    const mediaItems = [];
    v.media.forEach((src, i) => {
      const isVideo = src.toLowerCase().endsWith('.mp4');
      const media = document.createElement(isVideo ? 'video' : 'img');
      media.className = "vp-media-item";
      media.src = src;
      if (isVideo) {
        media.autoplay = false; // We control play manually
        media.loop = false;     // Must NOT loop so 'ended' fires
        media.muted = false;
        media.volume = 0.8;
      }
      mediaContainer.appendChild(media);
      mediaItems.push(media);
    });

    // Smart sub-media switching: videos play to the end, images use a fixed timer
    if (subInterval) clearInterval(subInterval);
    currentMediaIndex = 0;

    function advanceMedia() {
      if (mediaItems.length <= 1) return;
      currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
      showMedia(currentMediaIndex);
    }

    function scheduleNext(mediaEl) {
      if (mediaEl.tagName === 'VIDEO') {
        // Wait for the video to end, then advance
        mediaEl.addEventListener('ended', advanceMedia, { once: true });
      } else {
        // For images, use a fixed 4-second timer
        if (mediaItems.length > 1) {
          subInterval = setTimeout(advanceMedia, SUB_MEDIA_DURATION);
        }
      }
    }

    function showMedia(idx) {
      // Clear any pending image timer
      if (subInterval) clearTimeout(subInterval);
      subInterval = null;

      mediaItems.forEach((m, i) => {
        if (i === idx) {
          m.classList.add('active');
          if (m.tagName === 'VIDEO') { m.currentTime = 0; m.play().catch(()=>{}); }
        } else {
          m.classList.remove('active');
          if (m.tagName === 'VIDEO') { m.pause(); }
        }
      });

      scheduleNext(mediaItems[idx]);
    }

    showMedia(0);

    // Progress bar
    const bar = document.getElementById("vp-progress-bar");
    if (bar) {
      bar.style.transition = "none";
      bar.style.width = "0%";
      void bar.offsetWidth;
      bar.style.transition = `width ${SLIDE_DURATION}ms linear`;
      bar.style.width = "100%";
    }

    // Dots
    document.querySelectorAll(".vp-dot").forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }

  function goTo(index) {
    currentVehicle = ((index % VEHICLES.length) + VEHICLES.length) % VEHICLES.length;
    renderVehicle(currentVehicle);
  }

  function nextVehicle() { goTo(currentVehicle + 1); }
  function prevVehicle() { goTo(currentVehicle - 1); }

  function startShowcase() {
    showcaseInterval = setInterval(nextVehicle, SLIDE_DURATION);
  }

  function resetTimer() {
    clearInterval(showcaseInterval);
    startShowcase();
  }

  /* ---------- Build DOM ---------- */
  function buildShowcase() {
    showcase = document.createElement("div");
    showcase.id = "vehicle-showcase";
    showcase.innerHTML = `
      <div class="vp-arc-bg"></div>
      
      <div class="vp-progress-wrap">
        <div id="vp-progress-bar" class="vp-progress-bar"></div>
      </div>

      <!-- Header Area (Top) -->
      <header class="vp-header-area">
        <img src="images/soutarah.png" alt="Soutarah Group" class="vp-logo" />
        <div id="vp-category" class="vp-category"></div>
        <h2 id="vp-name" class="vp-name"></h2>
        <p id="vp-subtitle" class="vp-subtitle"></p>
      </header>

      <!-- Media Area (Center) -->
      <div id="vp-media-container" class="vp-media-container"></div>

      <!-- Footer Area (Bottom) -->
      <footer class="vp-footer-area">
        <ul id="vp-specs" class="vp-specs"></ul>
        
        <!-- Controls -->
        <div class="vp-controls">
          <button class="vp-btn-prev" id="vp-prev" aria-label="Précédent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div class="vp-dots" id="vp-dots">
            ${VEHICLES.map((_, i) => `<button class="vp-dot ${i === 0 ? 'active' : ''}"></button>`).join("")}
          </div>
          <button class="vp-btn-next" id="vp-next" aria-label="Suivant">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </footer>
    `;

    document.body.appendChild(showcase);

    /* Interactions */
    document.getElementById("vp-next").addEventListener("click", () => { nextVehicle(); resetTimer(); });
    document.getElementById("vp-prev").addEventListener("click", () => { prevVehicle(); resetTimer(); });
    document.querySelectorAll(".vp-dot").forEach((dot, i) => {
      dot.addEventListener("click", () => { goTo(i); resetTimer(); });
    });

    /* Render first vehicle */
    renderVehicle(0);
    startShowcase();
  }

  let isLaunched = false;
  
  /* ---------- Entry point ---------- */
  function launchVehicleShowcase() {
    if (isLaunched) return; // Déjà lancé
    isLaunched = true;

    const mainApp = document.querySelector(".application");
    if (mainApp) mainApp.style.display = "none";

    buildShowcase();
    showcase.style.opacity = "1";
  }

  window._vpLaunch = launchVehicleShowcase;

  function checkCountdownDone() {
    const evenement = new Date(CONFIG.evenement);
    const now = new Date();
    if (now >= evenement) {
      launchVehicleShowcase();
      return;
    }
    setTimeout(checkCountdownDone, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkCountdownDone);
  } else {
    checkCountdownDone();
  }

})();
