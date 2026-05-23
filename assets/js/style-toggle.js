// Style toggle: glass <-> metro
(function () {
  var icons = {
    glass: "fa-palette",
    metro: "fa-table-cells-large"
  };

  function getStyle() {
    return localStorage.getItem("style") === "metro" ? "metro" : "glass";
  }

  function setStyle(style) {
    if (style === "metro") {
      document.documentElement.setAttribute("data-style", "metro");
    } else {
      document.documentElement.removeAttribute("data-style");
    }
    var icon = document.getElementById("style-icon");
    if (icon) {
      icon.className = "fa-solid " + (icons[style] || icons.glass);
    }
  }

  // Apply saved style immediately (before render)
  setStyle(getStyle());

  // Bind click after DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("style-toggle");
    if (!btn) return;

    setStyle(getStyle());

    btn.addEventListener("click", function () {
      var next = getStyle() === "metro" ? "glass" : "metro";

      var overlay = document.createElement("div");
      overlay.className = "md-theme-transition";
      document.body.appendChild(overlay);
      requestAnimationFrame(function () {
        overlay.classList.add("active");
        setTimeout(function () {
          localStorage.setItem("style", next);
          setStyle(next);
          setTimeout(function () {
            overlay.classList.remove("active");
            setTimeout(function () { overlay.remove(); }, 300);
          }, 100);
        }, 250);
      });
    });
  });
})();
