(function () {
  'use strict';
  var board = document.getElementById('metro-board');
  if (!board) return;
  var desktop = window.matchMedia('(min-width: 900px) and (min-height: 640px)');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var buttons = document.querySelectorAll('[data-board-direction]');

  function active() {
    return desktop.matches && document.documentElement.dataset.style === 'metro';
  }
  function update() {
    var end = board.scrollWidth - board.clientWidth;
    buttons.forEach(function (button) {
      button.disabled = Number(button.dataset.boardDirection) < 0
        ? board.scrollLeft <= 1 : board.scrollLeft >= end - 1;
    });
  }
  function move(direction) {
    board.scrollBy({left: direction * board.clientWidth * 0.8,
      behavior: reducedMotion.matches ? 'auto' : 'smooth'});
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () { move(Number(button.dataset.boardDirection)); });
  });
  board.addEventListener('wheel', function (event) {
    if (!active() || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    // Allow a long tile's own scroll area to consume vertical input first.
    var target = event.target instanceof Element ? event.target : null;
    while (target && target !== board) {
      var overflow = getComputedStyle(target).overflowY;
      if (/(auto|scroll)/.test(overflow) && target.scrollHeight > target.clientHeight + 1 &&
          (event.deltaY < 0 ? target.scrollTop > 0 : target.scrollTop + target.clientHeight < target.scrollHeight - 1)) return;
      target = target.parentElement;
    }
    var scale = event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? board.clientWidth : 1;
    if (board.scrollWidth > board.clientWidth) {
      event.preventDefault();
      board.scrollLeft += event.deltaY * scale;
    }
  }, {passive: false});
  board.addEventListener('keydown', function (event) {
    if (!active() || event.target !== board || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  board.addEventListener('scroll', update, {passive: true});
  window.addEventListener('resize', update);
  new ResizeObserver(update).observe(board);
  update();
})();
