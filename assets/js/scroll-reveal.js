/**
 * Scroll-reveal & micro-interaction animations
 * Uses IntersectionObserver for performant scroll detection
 */
(function () {
  "use strict";

  // --- Scroll Reveal ---
  function initScrollReveal() {
    var revealSelectors = [
      ".archive__item",

      ".page__content > h2",
      ".page__content > h3",
      ".page__content > p",
      ".page__content > ul",
      ".page__content > ol",
      ".page__content > table",
      ".page__content > blockquote",
      ".page__content > figure",
      ".page__content > .highlight",
      ".page__content > pre",
      ".page__content > hr + *",
      ".comment",
    ];

    var elements = document.querySelectorAll(revealSelectors.join(","));
    if (!elements.length) return;

    elements.forEach(function (el) {
      if (!el.classList.contains("reveal")) {
        el.classList.add("reveal");
      }
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Add a small staggered delay based on index
            var delay = entry.target.dataset.revealDelay || 0;
            setTimeout(function () {
              entry.target.classList.add("revealed");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Sidebar & content staggered reveal ---
  function initStaggerReveal() {
    var staggerTargets = document.querySelectorAll(
      ".author__urls.social-icons, .sidebar .author__content"
    );
    staggerTargets.forEach(function (el) {
      el.classList.add("reveal-stagger");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    staggerTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Navbar shrink on scroll ---
  function initNavbarShrink() {
    var masthead = document.querySelector(".masthead");
    if (!masthead) return;

    var ticking = false;

    function onScroll() {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 80) {
        masthead.classList.add("masthead--compact");
      } else {
        masthead.classList.remove("masthead--compact");
      }
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(onScroll);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // --- Initialize ---
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    initScrollReveal();
    initStaggerReveal();
    initNavbarShrink();

  }
})();
