// Tap Drill Math engine: tap drill size from diameter minus pitch (metric and imperial), and pitch between mm and threads per inch. Exact integers (hundredths of a mm, thousandths of an inch, hundredths of a mm pitch, hundredths of a TPI), BigInt for the large cross-products, half-up on display only. The diameter-minus-pitch rule is a named shop rule of thumb for roughly three-quarter thread engagement; 25.4 mm per inch is the exact conversion.
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _MM = "the diameter must be from 0.01 to 1000 mm with at most two decimal places";
var _P = "the pitch must be from 0.01 to 100 mm with at most two decimal places";
var _IN = "the diameter must be from 0.001 to 100 in with at most three decimal places";
var _TPI = "the thread count must be from 0.01 to 1000 per inch with at most two decimal places";
var _SMALL = "the pitch must be smaller than the diameter";
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _huB(n, d) { return Number((2n * n + d) / (2n * d)); }
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _mm(t) { return _p(t, _MM, 4, 2, 1, 100000); }
function _pitch(t) { return _p(t, _P, 3, 2, 1, 10000); }
function _inch(t) { return _p(t, _IN, 3, 3, 1, 100000); }
function _tpi(t) { return _p(t, _TPI, 4, 2, 1, 100000); }

function metricTruth(dia, pitch) {
  var d = _mm(dia), p = _pitch(pitch);
  if (p >= d) throw new Error(_SMALL);
  return "The tap drill for an M" + _dec(d, 2) + " x " + _dec(p, 2) + " thread comes to " + _dec(d - p, 2) + " mm by the diameter-minus-pitch rule.";
}
function imperialTruth(dia, tpi) {
  var d = _inch(dia), t = _tpi(tpi);
  var p = _huB(100000n, BigInt(t)); // pitch in thousandths of an inch: 1000 / t(in TPI*100)
  if (p >= d) throw new Error(_SMALL);
  return "The tap drill for a " + _dec(d, 3) + "-" + _dec(t, 2) + " thread comes to " + _dec(d - p, 3) + " in by the diameter-minus-pitch rule.";
}
function pitchTruth(tpi) {
  var t = _tpi(tpi);
  var p = _huB(254000n, BigInt(t)); // mm*100 = 25.4*100*100 / t
  return "A thread at " + _dec(t, 2) + " per inch has a " + _dec(p, 2) + " mm pitch.";
}
function tpiTruth(pitch) {
  var p = _pitch(pitch);
  var t = _huB(254000n, BigInt(p)); // TPI*100 = 25.4*100*100 / p
  return "A " + _dec(p, 2) + " mm pitch works out to " + _dec(t, 2) + " threads per inch.";
}
