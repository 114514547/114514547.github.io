// Both themes share a Beijing clock and one fixed-city weather request/cache.
(function () {
  'use strict';
  var timer, retryAt = 0, pending = false, cached = null;
  var cacheKey = 'zhengzhou-weather-v1', ttl = 30 * 60 * 1000;
  var options = {timeZone: 'Asia/Shanghai'};
  var formats = {
    date: new Intl.DateTimeFormat('zh-CN', Object.assign({}, options, {year: 'numeric', month: 'long', day: 'numeric'})),
    weekday: new Intl.DateTimeFormat('zh-CN', Object.assign({}, options, {weekday: 'long'})),
    time: new Intl.DateTimeFormat('zh-CN', Object.assign({}, options, {hour: '2-digit', minute: '2-digit', hourCycle: 'h23'}))
  };
  function valid(data) {
    return data && Number.isFinite(data.temperature) && Number.isInteger(data.code) &&
      Number.isFinite(data.saved) && data.saved <= Date.now() && Date.now() - data.saved < 24 * 60 * 60 * 1000;
  }
  try { cached = JSON.parse(localStorage.getItem(cacheKey)); } catch (_) {}
  if (!valid(cached)) cached = null;
  function condition(code, day) {
    if (code === 0) return ['晴', day ? 'sun' : 'moon'];
    if (code <= 2) return ['多云', 'cloud-sun'];
    if (code === 3) return ['阴', 'cloud'];
    if (code === 45 || code === 48) return ['雾', 'smog'];
    if (code >= 95) return ['雷雨', 'bolt'];
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return ['雪', 'snowflake'];
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return ['雨', 'cloud-rain'];
    return ['天气更新', 'cloud'];
  }
  function renderWeather(failed) {
    if (!valid(cached)) cached = null;
    document.querySelectorAll('.local-weather').forEach(function (box) {
      var summary = box.querySelector('[data-weather-summary]');
      var status = box.querySelector('[data-weather-status]');
      if (!cached) {
        summary.textContent = '郑州 · 天气暂不可用';
        status.textContent = '稍后自动重试';
        return;
      }
      var info = condition(cached.code, cached.day);
      summary.textContent = '郑州 · ' + Math.round(cached.temperature) + '°C · ' + info[0];
      box.querySelector('[data-weather-icon]').className = 'fas fa-' + info[1];
      var stale = failed || Date.now() - cached.saved >= ttl;
      status.textContent = (stale ? '缓存 · ' : '更新于 ') + formats.time.format(new Date(cached.saved));
    });
  }
  async function weather() {
    if (pending || document.hidden || Date.now() < retryAt) return;
    if (cached && valid(cached) && Date.now() - cached.saved < ttl) { renderWeather(false); return; }
    pending = true;
    retryAt = Date.now() + 5 * 60 * 1000;
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 8000);
    try {
      var response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=34.75&longitude=113.63&current=temperature_2m,weather_code,is_day&timezone=Asia%2FShanghai&forecast_days=1', {signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer'});
      if (!response.ok) throw new Error('Weather request failed');
      var body = await response.json(), current = body.current;
      if (!current || !Number.isFinite(current.temperature_2m) || !Number.isInteger(current.weather_code)) throw new Error('Invalid weather response');
      cached = {temperature: current.temperature_2m, code: current.weather_code, day: current.is_day === 1, saved: Date.now()};
      try { localStorage.setItem(cacheKey, JSON.stringify(cached)); } catch (_) {}
      renderWeather(false);
    } catch (_) { renderWeather(true); }
    finally { clearTimeout(timeout); pending = false; }
  }
  function update() {
    clearTimeout(timer);
    var now = new Date();
    Object.keys(formats).forEach(function (part) {
      document.querySelectorAll('[data-clock="' + part + '"], #studio-' + part).forEach(function (node) {
        node.textContent = formats[part].format(now);
        if (part === 'time') node.dateTime = now.toISOString();
      });
    });
    if (!document.hidden) {
      weather();
      timer = setTimeout(update, 60000 - Date.now() % 60000 + 50);
    }
  }
  if (cached) renderWeather(false);
  document.addEventListener('visibilitychange', update);
  update();
})();
