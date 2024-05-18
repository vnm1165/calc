function to_english(e, i) {
  let n = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ],
    l = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ],
    t = [
      "",
      "thousand",
      "million",
      "billion",
      "trillion",
      "quadrillion",
      "quintillion",
      "sextillion",
      "septillion",
      "octillion",
      "nonillion",
      "decillion",
      "undecillion",
      "duodecillion",
      "tredecillion",
      "quatttuor-decillion",
      "quindecillion",
      "sexdecillion",
      "septen-decillion",
      "octodecillion",
      "novemdecillion",
      "vigintillion",
      "centillion",
    ],
    o = i || "and";
  if (0 === parseInt(e)) return "zero";
  let r = [],
    s = e.toString().length;
  for (; s > 0; ) {
    let u = s;
    r.push(e.toString().slice((s = Math.max(0, s - 3)), u));
  }
  let h = [],
    d = r.length;
  for (let c = 0; c < d; c++) {
    let f = parseInt(r[c]);
    if (f) {
      let p = r[c].split("").reverse().map(parseFloat);
      1 === p[1] && (p[0] += 10),
        t[c] && h.push(t[c]),
        n[p[0]] && h.push(n[p[0]]),
        l[p[1]] && h.push(l[p[1]]),
        (p[0] || p[1]) && (p[2] || (!c && d)) && h.push(o),
        n[p[2]] && h.push(n[p[2]] + " hundred");
    }
  }
  return h.reverse().join(" ");
}
