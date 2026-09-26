(function () {
  'use strict';
  var board = document.getElementById('metro-board');
  if (!board) return;
  var desktop = window.matchMedia('(min-width: 900px) and (min-height: 640px)');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var frame = 0, last = 0, velocity = 0, target = board.scrollLeft;
  var position = board.scrollLeft;
  var tiles = Array.from(board.querySelectorAll('.metro-tile'));
  var visible = new WeakSet();
  var animations = new Map();

  function active() {
    return desktop.matches && document.documentElement.dataset.style === 'metro';
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    velocity = 0;
    last = 0;
    target = board.scrollLeft;
    position = board.scrollLeft;
  }
  function limit(value) {
    return Math.max(0, Math.min(board.scrollWidth - board.clientWidth, value));
  }
  function step(now) {
    var dt = Math.min((now - (last || now - 16)) / 1000, 0.032);
    last = now;
    var distance = target - position;
    // Critically damped spring: build speed smoothly, settle without overshoot.
    velocity += (distance * 180 - velocity * 27) * dt;
    var next = limit(position + velocity * dt);
    position = next;
    board.scrollLeft = next;
    if (!active() || reducedMotion.matches ||
        (Math.abs(target - next) < 0.7 && Math.abs(velocity) < 4)) {
      board.scrollLeft = target;
      stop();
      return;
    }
    frame = requestAnimationFrame(step);
  }
  function move(pixels) {
    if (!frame) { target = board.scrollLeft; position = board.scrollLeft; }
    target = limit(target + pixels);
    if (reducedMotion.matches) { board.scrollLeft = target; return; }
    if (!frame) frame = requestAnimationFrame(step);
  }
  board.addEventListener('wheel', function (event) {
    if (!active() || event.ctrlKey || event.metaKey) return;
    // Keep native trackpad horizontal gestures, scrollbar dragging and touch.
    if (event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) { stop(); return; }
    var node = event.target instanceof Element ? event.target : null;
    while (node && node !== board) {
      var overflow = getComputedStyle(node).overflowY;
      if (/(auto|scroll)/.test(overflow) && node.scrollHeight > node.clientHeight + 1 &&
          (event.deltaY < 0 ? node.scrollTop > 0 : node.scrollTop + node.clientHeight < node.scrollHeight - 1)) {
        stop();
        return;
      }
      node = node.parentElement;
    }
    if (board.scrollWidth <= board.clientWidth) return;
    event.preventDefault();
    var scale = event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? board.clientWidth : 1;
    // Bound individual wheel impulses so a burst does not skip several groups.
    move(Math.max(-board.clientWidth * 0.65, Math.min(board.clientWidth * 0.65, event.deltaY * scale)));
  }, {passive: false});
  board.addEventListener('keydown', function (event) {
    if (!active() || event.target !== board || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move((event.key === 'ArrowLeft' ? -1 : 1) * board.clientWidth * 0.65);
    }
  });
  board.addEventListener('pointerdown', stop);
  board.addEventListener('focusin', function (event) {
    stop();
    var tile = event.target.closest('.metro-tile');
    if (animations.has(tile)) animations.get(tile).cancel();
  });
  function reset() {
    stop();
    // Keep two reading rows as the archive grows, without reordering articles.
    var grid = board.querySelector('.metro-article-grid');
    var spans = Array.from(grid.children).map(function (tile) {
      return tile.classList.contains('metro-article-card--wide') ? 2 : 1;
    });
    var columns = Math.max(2, Math.ceil(spans.reduce(function (sum, n) { return sum + n; }, 0) / 2));
    var rows, used;
    do {
      rows = 1; used = 0;
      spans.forEach(function (span) {
        if (used + span > columns) { rows++; used = 0; }
        used += span;
      });
      if (rows > 2) columns++;
    } while (rows > 2);
    grid.style.setProperty('--article-columns', columns);
    animations.forEach(function (animation) { animation.cancel(); });
    animations.clear();
    visible = new WeakSet();
    var bounds = board.getBoundingClientRect();
    tiles.forEach(function (tile) {
      var rect = tile.getBoundingClientRect();
      if (rect.right > bounds.left && rect.left < bounds.right) visible.add(tile);
    });
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { visible.delete(entry.target); return; }
      if (visible.has(entry.target)) return;
      visible.add(entry.target);
      if (!active() || reducedMotion.matches || entry.target.contains(document.activeElement)) return;
      var bounds = board.getBoundingClientRect();
      // Only right-edge arrivals fade in; leftward backtracking stays immediate.
      if (entry.boundingClientRect.left < bounds.left + bounds.width * 0.55) return;
      if (animations.has(entry.target)) animations.get(entry.target).cancel();
      var animation = entry.target.animate([
        {opacity: 0.25, translate: '18px 0'},
        {opacity: 1, translate: '0 0'}
      ], {duration: 380, easing: 'cubic-bezier(.22,.61,.36,1)'});
      animations.set(entry.target, animation);
      animation.onfinish = function () { animations.delete(entry.target); };
    });
  }, {root: board, threshold: 0});
  tiles.forEach(function (tile) { observer.observe(tile); });
  new ResizeObserver(reset).observe(board);
  new MutationObserver(reset).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-style']
  });
  reducedMotion.addEventListener('change', reset);
  desktop.addEventListener('change', reset);
  document.addEventListener('visibilitychange', reset);
  reset();
})();
