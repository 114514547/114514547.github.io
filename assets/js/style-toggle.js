// Style toggle: glass <-> metro
(function () {
  var icons = {
    glass: "fa-palette",
    metro: "fa-table-cells-large"
  };

  function getStyle() {
    try { return localStorage.getItem("style") === "metro" ? "metro" : "glass"; }
    catch (_) { return document.documentElement.getAttribute('data-style') === 'metro' ? 'metro' : 'glass'; }
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
    var control = document.querySelector('#style-toggle a');
    if (control) control.setAttribute('aria-label', style === 'metro' ? '切换毛玻璃风格' : '切换磁贴风格');
  }

  // Apply saved style immediately (before render)
  setStyle(getStyle());

  // Bind click after DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("style-toggle");
    if (!btn) return;

    setStyle(getStyle());

    function toggle() {
      var next = getStyle() === "metro" ? "glass" : "metro";
      try { localStorage.setItem('style', next); } catch (_) {}
      setStyle(next);
      window.dispatchEvent(new Event('resize'));
    }
    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
})();
