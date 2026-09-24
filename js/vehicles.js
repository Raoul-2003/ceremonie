(function() {
  "use strict";

  /* =========================================================
   *  VEHICLES SHOWCASE — ES5, Compatible TV + Anti-freeze
   * ========================================================= */

  var VEHICLES = [
    {
      id: 1,
      name: "TOYOTA FORTUNER",
      subtitle: "Le Roi du Tout-Terrain",
      category: "SUV 4x4 — FLOTTE SOUTARAH",
      specs: ["Diesel 2.8L GD6 Turbo", "204 ch / 500 Nm", "4WD avec Diff Lock", "7 places"],
      media: ["images/image/Fortuner3.png", "images/image/Fortuner4.png"]
    },
    {
      id: 2,
      name: "TOYOTA TACOMA",
      subtitle: "Le Pick-up Legendaire",
      category: "PICK-UP — FLOTTE SOUTARAH",
      specs: ["Moteur V6 3.5L", "278 ch / 359 Nm", "4WD Multi-Terrain", "Charge utile 700 kg"],
      media: ["images/image/Tacoma01.png", "images/image/Tacoma03.png", "images/image/Tacoma06.png"]
    },
    {
      id: 3,
      name: "ISUZU D-MAX",
      subtitle: "La Force de Travail",
      category: "PICK-UP PROFESSIONNEL — FLOTTE SOUTARAH",
      specs: ["Diesel 3.0L 4JJ3", "190 ch / 450 Nm", "4WD avec mode Lock", "Benne renforcee"],
      media: ["images/image/Dmax1.png", "images/image/Dmax4.png", "images/image/Dmax5.png"]
    },
    {
      id: 4,
      name: "RENAULT OROCH",
      subtitle: "Pick-up Robuste & Polyvalent",
      category: "PICK-UP — FLOTTE SOUTARAH",
      specs: ["Diesel 1.6L dCi 130", "130 ch / 320 Nm", "Benne aluminium 1000 kg", "4WD"],
      media: ["images/image/Oroch02.png", "images/image/Oroch03.png", "images/image/Oroch04.png"]
    },
    {
      id: 5,
      name: "RENAULT DOKKER",
      subtitle: "L'Utilitaire Polyvalent",
      category: "UTILITAIRE — FLOTTE SOUTARAH",
      specs: ["Diesel 1.5L dCi", "90 ch", "Grande capacite", "6 places"],
      media: ["images/image/Dokker1.png", "images/image/Dokker12.jpg", "images/image/Dokker5.png"]
    },
    {
      id: 6,
      name: "SUZUKI FRONX",
      subtitle: "Crossover Elegant & Dynamique",
      category: "SUV COMPACT — FLOTTE SOUTARAH",
      specs: ["Hybride 1.5L SHVS", "102 ch", "Ecran 9p Apple CarPlay", "Camera 360"],
      media: ["images/image/Fronx2.png", "images/image/Fronx6.png", "images/image/Fronx7.png"]
    },
    {
      id: 7,
      name: "SUZUKI GRAND VITARA",
      subtitle: "L'Aventurier Incontournable",
      category: "SUV TOUT-TERRAIN — FLOTTE SOUTARAH",
      specs: ["Hybride 1.5L Allgrip", "102 ch / 135 Nm", "4WD Auto intelligent", "Toit panoramique"],
      media: ["images/image/Grand Vitara1.png", "images/image/Grand Vitara2.png", "images/image/Grand Vitara3.png", "images/image/Grand Vitara5.png"]
    },
    {
      id: 8,
      name: "MITSUBISHI PAJERO",
      subtitle: "La Legende Continue",
      category: "SUV PREMIUM — FLOTTE SOUTARAH",
      specs: ["4x4 Super Select", "7 places", "Cuir Premium", "V6 3.8L 250 ch"],
      media: ["images/image/Pajero5.png", "images/image/Pajero13.png"]
    },
    {
      id: 9,
      name: "MINIBUS",
      subtitle: "Confort pour Tous",
      category: "TRANSPORT COLLECTIF — FLOTTE SOUTARAH",
      specs: ["Grande capacite passagers", "Climatisation", "Confort Haut de Gamme"],
      media: ["images/image/MiniBus1.png", "images/image/MiniBus2.png", "images/image/MiniBus3.png"]
    },
    {
      id: 10,
      name: "VAN EXPRESS",
      subtitle: "La Livraison Rapide",
      category: "FOURGON — FLOTTE SOUTARAH",
      specs: ["Diesel economique", "Grande capacite", "Fiabilite Renault"],
      media: ["images/image/Van Express1.png", "images/image/Van Express2.jpg", "images/image/Van Express3.png", "images/image/Renault Van express.png"]
    },
    {
      id: 11,
      name: "FLOTTE SOUTARAH",
      subtitle: "L'excellence en mouvement",
      category: "VUE D'ENSEMBLE — FLOTTE SOUTARAH",
      specs: ["10 vehicules disponibles", "Flotte diversifiee"],
      media: ["images/image/17eBbOsf.jpg", "images/image/hdwFM38k.jpg", "images/image/Qm12AbAc.jpg"]
    }
  ];

  /* ---------- State ---------- */
  var currentVehicle = 0;
  var currentMediaIndex = 0;
  var mediaItems = [];
  var showcase = null;
  var SLIDE_DURATION = 12000;
  var SUB_MEDIA_DURATION = 4000;

  /* timers — using recursive setTimeout instead of setInterval for TV reliability */
  var slideTimer = null;
  var subTimer = null;
  var lastSlideTime = 0;
  var watchdogTimer = null;

  /* ---------- Helpers ---------- */
  function safeSetOpacity(el, val) {
    try { el.style.opacity = val; } catch(e) {}
  }

  /* ---------- Media ---------- */
  function showMedia(idx) {
    if (subTimer) { clearTimeout(subTimer); subTimer = null; }
    for (var i = 0; i < mediaItems.length; i++) {
      safeSetOpacity(mediaItems[i], i === idx ? '1' : '0');
    }
    if (mediaItems.length > 1) {
      subTimer = setTimeout(advanceMedia, SUB_MEDIA_DURATION);
    }
  }

  function advanceMedia() {
    subTimer = null;
    if (mediaItems.length <= 1) return;
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    showMedia(currentMediaIndex);
  }

  /* ---------- Slide ---------- */
  function scheduleNextSlide() {
    if (slideTimer) { clearTimeout(slideTimer); slideTimer = null; }
    slideTimer = setTimeout(function() {
      slideTimer = null;
      nextVehicle();
    }, SLIDE_DURATION);
    lastSlideTime = Date.now ? Date.now() : new Date().getTime();
  }

  function nextVehicle() {
    currentVehicle = (currentVehicle + 1) % VEHICLES.length;
    renderVehicle(currentVehicle);
    scheduleNextSlide();
  }

  function prevVehicle() {
    currentVehicle = (currentVehicle - 1 + VEHICLES.length) % VEHICLES.length;
    renderVehicle(currentVehicle);
    scheduleNextSlide();
  }

  function goTo(index) {
    currentVehicle = ((index % VEHICLES.length) + VEHICLES.length) % VEHICLES.length;
    renderVehicle(currentVehicle);
    scheduleNextSlide();
  }

  /* ---------- Watchdog: restart if TV freezes ---------- */
  function startWatchdog() {
    if (watchdogTimer) { clearInterval(watchdogTimer); }
    watchdogTimer = setInterval(function() {
      var now = Date.now ? Date.now() : new Date().getTime();
      var elapsed = now - lastSlideTime;
      /* If we haven't advanced in 2x the slide duration, force advance */
      if (elapsed > SLIDE_DURATION * 2) {
        if (slideTimer) { clearTimeout(slideTimer); slideTimer = null; }
        if (subTimer) { clearTimeout(subTimer); subTimer = null; }
        nextVehicle();
      }
    }, 5000);
  }

  /* ---------- Render ---------- */
  function renderVehicle(index) {
    var v = VEHICLES[index];
    var mediaContainer = document.getElementById("vp-media-container");
    if (!mediaContainer) return;

    /* Text */
    var catEl = document.getElementById("vp-category");
    var nameEl = document.getElementById("vp-name");
    var subtitleEl = document.getElementById("vp-subtitle");
    var specsList = document.getElementById("vp-specs");
    var dots = document.querySelectorAll(".vp-dot");
    var bar = document.getElementById("vp-progress-bar");

    var catParts = v.category.split('—');
    if (catParts.length > 1) {
      catEl.innerHTML = catParts[0] + '<span>— ' + catParts[1] + '</span>';
    } else {
      catEl.innerHTML = v.category;
    }
    nameEl.innerHTML = v.name;
    subtitleEl.innerHTML = v.subtitle;

    var specsHTML = '';
    for (var s = 0; s < v.specs.length; s++) {
      specsHTML += '<li class="vp-spec-item">' + v.specs[s] + '</li>';
    }
    specsList.innerHTML = specsHTML;

    /* Media */
    if (subTimer) { clearTimeout(subTimer); subTimer = null; }
    mediaContainer.innerHTML = '';
    mediaItems = [];

    for (var m = 0; m < v.media.length; m++) {
      var img = document.createElement('img');
      img.src = v.media[m];
      img.alt = v.name;
      img.className = 'vp-media-item';
      img.style.opacity = '0';
      mediaContainer.appendChild(img);
      mediaItems.push(img);
    }
    currentMediaIndex = 0;
    showMedia(0);

    /* Progress bar */
    if (bar) {
      bar.style.width = '0%';
      /* small delay to trigger transition */
      setTimeout(function() { bar.style.width = '100%'; }, 30);
    }

    /* Dots */
    for (var d = 0; d < dots.length; d++) {
      dots[d].style.background = d === index ? '#79B729' : 'rgba(0,0,0,0.2)';
    }
  }

  /* ---------- Build DOM ---------- */
  function buildDotsHTML() {
    var html = '';
    for (var i = 0; i < VEHICLES.length; i++) {
      html += '<button class="vp-dot"></button>';
    }
    return html;
  }

  function buildShowcase() {
    showcase = document.createElement("div");
    showcase.id = "vehicle-showcase";
    showcase.innerHTML =
      '<div class="vp-arc-bg"></div>' +
      '<div class="vp-progress-wrap"><div id="vp-progress-bar" class="vp-progress-bar"></div></div>' +

      '<button id="vp-sound-btn" class="vp-sound-btn">' +
        '<svg id="vp-icon-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">' +
          '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
          '<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>' +
          '<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>' +
        '</svg>' +
        '<svg id="vp-icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24" style="display:none">' +
          '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
          '<line x1="23" y1="9" x2="17" y2="15"/>' +
          '<line x1="17" y1="9" x2="23" y2="15"/>' +
        '</svg>' +
      '</button>' +

      '<header class="vp-header-area">' +
        '<img src="images/soutarah.png" alt="Soutarah Group" class="vp-logo" />' +
        '<div id="vp-category" class="vp-category"></div>' +
        '<h2 id="vp-name" class="vp-name"></h2>' +
        '<p id="vp-subtitle" class="vp-subtitle"></p>' +
      '</header>' +

      '<div id="vp-media-container" class="vp-media-container"></div>' +

      '<footer class="vp-footer-area">' +
        '<ul id="vp-specs" class="vp-specs"></ul>' +
        '<div class="vp-controls">' +
          '<button class="vp-btn-prev" id="vp-prev">&#8249;</button>' +
          '<div class="vp-dots" id="vp-dots">' + buildDotsHTML() + '</div>' +
          '<button class="vp-btn-next" id="vp-next">&#8250;</button>' +
        '</div>' +
      '</footer>';

    document.body.appendChild(showcase);

    /* Audio */
    var audio = null;
    try {
      audio = new Audio('images/2.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
    } catch(e) {}

    /* Son bouton */
    var soundBtn = document.getElementById('vp-sound-btn');
    if (soundBtn && audio) {
      soundBtn.onclick = function() {
        if (audio.muted) {
          audio.muted = false;
          document.getElementById('vp-icon-on').style.display = '';
          document.getElementById('vp-icon-off').style.display = 'none';
        } else {
          audio.muted = true;
          document.getElementById('vp-icon-on').style.display = 'none';
          document.getElementById('vp-icon-off').style.display = '';
        }
      };
    }

    /* Navigation */
    document.getElementById("vp-next").onclick = function() { nextVehicle(); };
    document.getElementById("vp-prev").onclick = function() { prevVehicle(); };

    var dotBtns = document.querySelectorAll(".vp-dot");
    for (var i = 0; i < dotBtns.length; i++) {
      (function(idx) {
        dotBtns[idx].onclick = function() { goTo(idx); };
      })(i);
    }

    /* Start */
    renderVehicle(0);
    scheduleNextSlide();
    startWatchdog();
  }

  /* ---------- Entry point ---------- */
  var isLaunched = false;

  function launchVehicleShowcase() {
    if (isLaunched) return;
    isLaunched = true;
    var mainApp = document.querySelector(".application");
    if (mainApp) { mainApp.style.display = "none"; }
    buildShowcase();
  }

  window._vpLaunch = launchVehicleShowcase;

  /* Page visibility: restart timers when TV wakes up */
  if (document.addEventListener) {
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden && isLaunched) {
        if (slideTimer) { clearTimeout(slideTimer); slideTimer = null; }
        if (subTimer) { clearTimeout(subTimer); subTimer = null; }
        renderVehicle(currentVehicle);
        scheduleNextSlide();
      }
    });
  }

  function checkAndLaunch() {
    try {
      var evenement = new Date(CONFIG.evenement);
      var now = new Date();
      if (now >= evenement) {
        launchVehicleShowcase();
      } else {
        setTimeout(checkAndLaunch, 5000);
      }
    } catch(e) {
      launchVehicleShowcase();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkAndLaunch);
  } else {
    checkAndLaunch();
  }

})();
