# Tap Drill Math

Tap drill and thread pitch arithmetic. The tap drill for an M10 x 1.5 thread comes to 8.5 mm by the diameter-minus-pitch rule.

## What it computes

- **The metric tap truth** - the tap drill for a metric thread (diameter 0.01 to 1000 mm, pitch 0.01 to 100 mm, pitch below diameter): the diameter minus the pitch, the named shop rule of thumb for roughly three-quarter engagement.
- **The imperial tap truth** - the tap drill for an inch thread (diameter 0.001 to 100 in, 0.01 to 1000 threads per inch): the diameter minus one over the thread count.
- **The pitch truth** - threads per inch to mm pitch and back, through the exact 25.4 mm per inch conversion.

## Boundary

Arithmetic only. It has not seen any fastener and does not know the material, the thread form, the fit class or the drill you actually have, and it gives no verdict that a drilled hole will tap well or hold. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, BigInt cross-products, half-up on display).
- `oracle.py` - the Python mirror (Fractions) that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/tapdrillmath/
Repo: https://github.com/iLanis-agent/tapdrillmath
