function to_english(n, customJoinCharacter) {
  const units = [
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
  ];

  const tens = [
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
  ];

  const scales = [
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
  ];

  const and = customJoinCharacter || "and";

  if (parseInt(n) === 0) {
    return "zero";
  }

  const chunks = [];
  let start = n.toString().length;
  while (start > 0) {
    const end = start;
    chunks.push(n.toString().slice((start = Math.max(0, start - 3)), end));
  }

  const words = [];
  const chunksLen = chunks.length;
  for (let i = 0; i < chunksLen; i++) {
    const chunk = parseInt(chunks[i]);

    if (chunk) {
      const ints = chunks[i].split("").reverse().map(parseFloat);

      if (ints[1] === 1) {
        ints[0] += 10;
      }

      if (scales[i]) {
        words.push(scales[i]);
      }

      if (units[ints[0]]) {
        words.push(units[ints[0]]);
      }

      if (tens[ints[1]]) {
        words.push(tens[ints[1]]);
      }

      if (ints[0] || ints[1]) {
        if (ints[2] || (!i && chunksLen)) {
          words.push(and);
        }
      }

      if (units[ints[2]]) {
        words.push(units[ints[2]] + " hundred");
      }
    }
  }

  return words.reverse().join(" ");
}
