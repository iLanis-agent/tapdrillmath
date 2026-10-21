import json, random
from fractions import Fraction

def hu(num, den):
    return Fraction((2*num + den) - ((2*num + den) % (2*den)), 2*den)

def dec(v, places=2):
    if v < 0: return "-" + dec(-v, places)
    base = 10**places
    n = v.numerator // v.denominator
    s = str(n // base); f = str(n % base).zfill(places).rstrip("0")
    return s + "." + f if f else s

def dec3(v):
    return dec(v, 3)

def s100(n):
    w, f = divmod(n, 100)
    return f"{w}.{f:02d}".rstrip("0").rstrip(".")

def s1000(n):
    w, f = divmod(n, 1000)
    return f"{w}.{f:03d}".rstrip("0").rstrip(".")

def metric(d, p):
    return (f"The tap drill for an M{dec(Fraction(d))} x {dec(Fraction(p))} thread comes to {dec(Fraction(d-p))} mm "
            f"by the diameter-minus-pitch rule.")
def imperial(d, t):
    p = hu(100000, t)
    return (f"The tap drill for a {dec3(Fraction(d))}-{dec(Fraction(t))} thread comes to {dec3(Fraction(d-p))} in "
            f"by the diameter-minus-pitch rule.")
def pitch(t):
    p = hu(254000, t)
    return f"A thread at {dec(Fraction(t))} per inch has a {dec(p)} mm pitch."
def tpi(p):
    t = hu(254000, p)
    return f"A {dec(Fraction(p))} mm pitch works out to {dec(t)} threads per inch."

random.seed(738)
cases = [
  dict(fn="metric", args=["10","1.5"], expect=metric(1000,150)),
  dict(fn="imperial", args=["0.25","20"], expect=imperial(250,2000)),
  dict(fn="pitch", args=["20"], expect=pitch(2000)),
  dict(fn="tpi", args=["1.27"], expect=tpi(127)),
]
for _ in range(25):
    p = random.randint(1,10000); d = random.randint(p+1,100000)
    cases.append(dict(fn="metric", args=[s100(d),s100(p)], expect=metric(d,p)))
for _ in range(25):
    t = random.randint(1,100000)
    p = int(hu(100000, t)); d = random.randint(p+1,100000)
    cases.append(dict(fn="imperial", args=[s1000(d),s100(t)], expect=imperial(d,t)))
for _ in range(20):
    t = random.randint(1,100000)
    cases.append(dict(fn="pitch", args=[s100(t)], expect=pitch(t)))
for _ in range(20):
    p = random.randint(1,10000)
    cases.append(dict(fn="tpi", args=[s100(p)], expect=tpi(p)))
errcases = [
  ["metric", ["0","1.5"]], ["metric", ["10","0"]], ["metric", ["1","1.5"]],
  ["metric", ["10","100.01"]], ["metric", ["abc","1.5"]],
  ["imperial", ["0.25","0"]], ["imperial", ["0.0009","20"]], ["imperial", ["0.25","abc"]],
  ["pitch", ["0"]], ["pitch", ["1000.01"]],
  ["tpi", ["0"]], ["tpi", ["100.01"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
