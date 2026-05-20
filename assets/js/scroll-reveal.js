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
      ".home-section .glass-card",
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

    // Add staggered delays to home-section cards
    var homeCards = document.querySelectorAll(".home-section .glass-card");
    homeCards.forEach(function (card, i) {
      card.dataset.revealDelay = i * 100;
    });

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

  // --- Smooth parallax for orbs ---
  function initOrbParallax() {
    var orbs = document.querySelectorAll(".orb");
    if (!orbs.length) return;

    var ticking = false;
    window.addEventListener(
      "mousemove",
      function (e) {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          var x = (e.clientX / window.innerWidth - 0.5) * 2;
          var y = (e.clientY / window.innerHeight - 0.5) * 2;
          orbs.forEach(function (orb, i) {
            var factor = (i + 1) * 8;
            orb.style.transform =
              "translate(" +
              x * factor +
              "px, " +
              y * factor +
              "px)";
          });
          ticking = false;
        });
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
    initOrbParallax();
  }
})();
