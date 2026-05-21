/**
 * Subtle rain effect for glassmorphism theme
 * Uses canvas for performant rendering
 */
(function () {
  "use strict";

  function createRain() {
    var canvas = document.createElement("canvas");
    canvas.id = "rain-canvas";
    canvas.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:-1;opacity:0.85;";

    // Insert before first child of body
    if (document.body.firstChild) {
      document.body.insertBefore(canvas, document.body.firstChild);
    } else {
      document.body.appendChild(canvas);
    }

    var ctx = canvas.getContext("2d");
    var w, h;
    var drops = [];
    var dropCount = 220;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    // Create raindrops
    for (var i = 0; i < dropCount; i++) {
      drops.push(resetDrop(true));
    }

    function resetDrop(randomY) {
      return {
        x: Math.random() * w * 1.3 - w * 0.15,
        y: randomY ? Math.random() * h : -(Math.random() * h * 0.6),
        length: 8 + Math.random() * 18,
        speed: 6 + Math.random() * 14,
        opacity: 0.12 + Math.random() * 0.22,
        wind: 0.3 + Math.random() * 0.7,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < drops.length; i++) {
        var d = drops[i];
        var x2 = d.x + d.wind * d.length * 0.15;
        var y2 = d.y + d.length;

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(180,200,220," + d.opacity + ")";
        ctx.lineWidth = 0.8 + Math.random() * 0.5;
        ctx.lineCap = "round";
        ctx.stroke();

        d.y += d.speed;
        d.x += d.wind * 0.3;

        if (d.y > h + d.length) {
          drops[i] = resetDrop(false);
        }
        if (d.x > w + 100) {
          d.x = -100;
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createRain);
  } else {
    createRain();
  }
})();
