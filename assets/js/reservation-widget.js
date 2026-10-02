/* ==========================================================================
   reservation-widget.js — laadt de floating RestoManager-reserveringsknop
   pas nadat de bezoeker een cookiekeuze heeft gemaakt (accepteren óf
   weigeren — de widget zet zelf geen cookies, dus de keuze zelf maakt
   niet uit, enkel dat ze gemaakt is).

   Waarom niet gewoon in de HTML laten staan? Op mobiel viel de
   cookiebanner samen met deze floating knop onderaan het scherm, waardoor
   "Accepteren"/"Weigeren" soms onbereikbaar was. Door de widget pas te
   laden na cookie-consent.js' 'lvg:consent-decided'-event staan ze nooit
   tegelijk op het scherm.
   ========================================================================== */
(function () {
  'use strict';

  var loaded = false;
  function loadWidget() {
    if (loaded) return;
    loaded = true;
    var script = document.createElement('script');
    script.src = 'https://book.restomanager.net/widget.js';
    script.setAttribute('data-base-url', 'https://book.restomanager.net');
    script.setAttribute('data-business-id', '6a560065063dec41c209df8c');
    script.setAttribute('data-widget-type', 'floating');
    script.setAttribute('data-floating', 'true');
    document.body.appendChild(script);
  }

  if (window.lvgConsent) loadWidget();
  window.addEventListener('lvg:consent-decided', loadWidget);
})();
