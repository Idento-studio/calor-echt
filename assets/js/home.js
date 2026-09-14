/* ==========================================================================
   home.js — interactie die alleen op de homepage voorkomt: sticky header,
   mobiel uitklapmenu, de tabs van de menukaart en de botanische lijnprint
   achter "La Carta". Scroll-reveal (.reveal) en de cookiebanner lopen via
   site.js / cookie-consent.js, die op elke pagina staan.
   ========================================================================== */
(function () {
  'use strict';

  /* --- Botanische lijnprint (inline SVG, geen externe asset) --- */
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520" fill="none" stroke="%23EBCFA0" stroke-width="1.4">'
    + '<circle cx="90" cy="86" r="34"/><circle cx="146" cy="118" r="26"/><path d="M90 52c0-14 10-24 22-26-2 14-10 24-22 26z"/>'
    + '<ellipse cx="392" cy="96" rx="46" ry="30" transform="rotate(-18 392 96)"/><path d="M360 84c14 10 44 14 64 4"/>'
    + '<path d="M250 214c22-26 58-26 80 0-22 26-58 26-80 0z"/><circle cx="290" cy="214" r="9"/>'
    + '<path d="M64 300c26-10 58 2 70 26-28 8-58-4-70-26z"/><path d="M74 300c20 2 44 12 56 26"/>'
    + '<circle cx="430" cy="330" r="30"/><circle cx="466" cy="366" r="20"/><path d="M430 296c2-16 14-26 28-28-4 16-14 26-28 28z"/>'
    + '<path d="M160 420c0-30 24-54 54-54v54h-54z"/><path d="M214 366c30 0 54 24 54 54h-54"/>'
    + '<ellipse cx="360" cy="470" rx="40" ry="22"/><path d="M330 464c16 8 44 8 60 0"/>'
    + '<path d="M40 170q30-22 60 0t60 0"/><path d="M330 246q30-22 60 0t60 0"/>'
    + '</svg>';
  var botanic = document.querySelectorAll('.botanic');
  for (var i = 0; i < botanic.length; i++) {
    botanic[i].style.backgroundImage = 'url("data:image/svg+xml;utf8,' + svg.replace(/#/g, '%23').replace(/"/g, "'") + '")';
  }

  /* --- Sticky header --- */
  var hdr = document.getElementById('hdr');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('is-stuck', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Mobiel uitklapmenu --- */
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) burger.click();
    });
  }

  /* --- Menukaart-tabs --- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, idx) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var next = tabs[(idx + d + tabs.length) % tabs.length];
      next.focus(); select(next);
    });
  });

  /* --- Jaartal --- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
