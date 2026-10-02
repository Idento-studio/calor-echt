/* ==========================================================================
   site.js — progressive enhancement voor de hele site.
   Alles is optioneel: zonder JS blijft de pagina volledig leesbaar.
   ========================================================================== */
(function () {
  document.documentElement.classList.add('js');

  // Fade/settle-in on scroll (content itself is never opacity:0 — see .reveal CSS)
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }
})();
