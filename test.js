const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { metric: metricTruth, imperial: imperialTruth, pitch: pitchTruth, tpi: tpiTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the diameter must be from 0.01 to 1000 mm with at most two decimal places",
  "the pitch must be from 0.01 to 100 mm with at most two decimal places",
  "the diameter must be from 0.001 to 100 in with at most three decimal places",
  "the thread count must be from 0.01 to 1000 per inch with at most two decimal places",
  "the pitch must be smaller than the diameter"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
