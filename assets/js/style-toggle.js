// Style toggle: glass -> material -> metro -> glass
(function () {
  var styles = ["glass", "material", "metro"];
  var icons = {
    glass: "fa-palette",
    material: "fa-layer-group",
    metro: "fa-table-cells-large"
  };

  function getStyle() {
    var s = localStorage.getItem("style");
    return styles.indexOf(s) !== -1 ? s : "glass";
  }

  function setStyle(style) {
    if (style === "glass") {
      document.documentElement.removeAttribute("data-style");
    } else {
      document.documentElement.setAttribute("data-style", style);
    }
    // Update icon
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
      var current = getStyle();
      var idx = styles.indexOf(current);
      var next = styles[(idx + 1) % styles.length];

      // Smooth transition overlay
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
