// Style toggle: glass <-> material
(function () {
  function getStyle() {
    return localStorage.getItem("style") === "material" ? "material" : "glass";
  }

  function setStyle(style) {
    if (style === "material") {
      document.documentElement.setAttribute("data-style", "material");
      var icon = document.getElementById("style-icon");
      if (icon) { icon.classList.remove("fa-palette"); icon.classList.add("fa-layer-group"); }
    } else {
      document.documentElement.removeAttribute("data-style");
      var icon = document.getElementById("style-icon");
      if (icon) { icon.classList.remove("fa-layer-group"); icon.classList.add("fa-palette"); }
    }
  }

  // Apply saved style on load
  setStyle(getStyle());

  // Toggle on click
  var btn = document.getElementById("style-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-style");
      var next = current === "material" ? "glass" : "material";

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
  }
})();
