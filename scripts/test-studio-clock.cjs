// Isolated weather/cache tests; no network requests or browser storage changes.
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/js/studio-clock.js'), 'utf8');
async function run(cache, fail, blockedStorage) {
  const clock = {};
  const fields = Object.fromEntries(['summary', 'status', 'icon'].map(k => [k, {}]));
  const box = {querySelector: s => fields[s.includes('summary') ? 'summary' : s.includes('status') ? 'status' : 'icon']};
  let calls = 0;
  const context = {
    Intl, Date, Object, Number, Math, JSON, AbortController,
    setTimeout: () => 1, clearTimeout: () => {},
    document: {hidden: false, addEventListener: () => {}, querySelectorAll: s => s === '.local-weather' ? [box] : s.includes('time') ? [clock] : []},
    localStorage: {
      getItem: () => { if (blockedStorage) throw Error('blocked'); return JSON.stringify(cache); },
      setItem: () => { if (blockedStorage) throw Error('blocked'); }
    },
    fetch: async () => {
      calls++;
      if (fail) throw Error('offline');
      return {ok: true, json: async () => ({current: {temperature_2m: 24.3, weather_code: 3, is_day: 1}})};
    }
  };
  vm.runInNewContext(source, context);
  await new Promise(resolve => setImmediate(resolve));
  assert.match(clock.textContent, /^\d{2}:\d{2}$/);
  return {fields, calls};
}
(async () => {
  let result = await run(null, false, false);
  assert.match(result.fields.summary.textContent, /24°C.*阴/);
  assert.equal(result.calls, 1);
  result = await run(null, true, false);
  assert.match(result.fields.summary.textContent, /暂不可用/);
  const cache = {temperature: 20, code: 0, day: true, saved: Date.now()};
  result = await run(cache, true, false);
  assert.equal(result.calls, 0);
  result = await run({...cache, saved: Date.now() - 3600000}, true, false);
  assert.match(result.fields.status.textContent, /缓存/);
  result = await run(null, false, true);
  assert.match(result.fields.summary.textContent, /24°C/);
  console.log('PASS: weather success, offline fallback, fresh/stale cache, blocked storage; clock remains available.');
})().catch(error => { console.error(error); process.exitCode = 1; });
