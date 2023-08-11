(function () {
  const numberWords = {
    units: ["?", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"],
    tens: [
      "lẻ",
      "mười",
      "hai mươi",
      "ba mươi",
      "bốn mươi",
      "năm mươi",
      "sáu mươi",
      "bảy mươi",
      "tám mươi",
      "chín mươi",
    ],
    hundreds: [
      "không trăm",
      "một trăm",
      "hai trăm",
      "ba trăm",
      "bốn trăm",
      "năm trăm",
      "sáu trăm",
      "bảy trăm",
      "tám trăm",
      "chín trăm",
    ],
  };

  const scales = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];
  const hundred = "trăm";

  function getUnitsInWords(n) {
    return numberWords.units[n];
  }

  function getTensInWords(n) {
    return numberWords.tens[n];
  }

  function getHundredsInWords(n) {
    return numberWords.hundreds[n];
  }

  function convertChunk(chunk, scaleIdx) {
    if (chunk === "000") {
      return "";
    }

    const [hundreds, tens, units] = chunk.split("").map(Number);
    const words = [];

    if (hundreds !== 0) {
      words.push(getHundredsInWords(hundreds));
    }

    if (tens !== 0 || units !== 0) {
      if (tens === 0) {
        words.push(getUnitsInWords(units));
      } else if (tens === 1) {
        words.push("mười", getUnitsInWords(units));
      } else {
        words.push(getTensInWords(tens), getUnitsInWords(units));
      }
    }

    if (scaleIdx > 0) {
      words.push(scales[scaleIdx]);
    }

    return words.join(" ");
  }

  function convertToVietnameseNumber(n) {
    if (parseInt(n) === 0) {
      return "không";
    }
    const numStr = parseInt(n).toString();
    const chunks = [];
    let chunk = "";

    for (let i = numStr.length - 1, j = 0; i >= 0; i--, j++) {
      chunk = numStr[i] + chunk;
      if (j % 3 === 2 || i === 0) {
        chunks.unshift(chunk);
        chunk = "";
      }
    }

    const words = chunks.map((chunk, idx) =>
      convertChunk(chunk, chunks.length - 1 - idx)
    );
    return words.join(" ");
  }

  if (typeof module !== "undefined" && module.exports !== undefined) {
    module.exports = convertToVietnameseNumber;
  } else {
    window.to_vietnamese = convertToVietnameseNumber;
  }
})();
