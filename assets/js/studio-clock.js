// Use the visitor's local timezone; refresh on minute boundaries and tab return.
(function () {
  'use strict';
  var time = document.getElementById('studio-time');
  var date = document.getElementById('studio-date');
  var weekday = document.getElementById('studio-weekday');
  if (!time || !date || !weekday) return;
  var timer;
  var dateFormat = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  var dayFormat = new Intl.DateTimeFormat('zh-CN', { weekday: 'long' });
  var timeFormat = new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  function update() {
    clearTimeout(timer);
    var now = new Date();
    date.textContent = dateFormat.format(now);
    weekday.textContent = dayFormat.format(now);
    time.textContent = timeFormat.format(now);
    time.dateTime = now.toISOString();
    if (!document.hidden) timer = setTimeout(update, 60000 - (Date.now() % 60000) + 50);
  }
  document.addEventListener('visibilitychange', update);
  update();
})();
