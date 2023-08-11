const langTitle = {
  title: {
    en: "Calculating Resources Evony",
    vi: "Tính Tài Nguyên Evony",
  },
  rssOption: {
    en: {
      optionLUONGTHUC: "Food",
      optionGO: "Wood",
      optionDA: "Stone",
      optionQUANG: "Ore",
    },
    vi: {
      optionLUONGTHUC: "Lương Thực",
      optionGO: "Gỗ",
      optionDA: "Đá",
      optionQUANG: "Quặng",
    },
  },
  buttonCLR: {
    en: "Clear",
    vi: "Xoá",
  },
  typeItem: {
    en: {
      Item_Type: "Item Type",
      Quantity: "Quantity",
      Total: "Total",
    },
    vi: {
      Item_Type: "Loại Item",
      Quantity: "Số Lượng",
      Total: "Tổng",
    },
  },
  cs: {
    en: "Available",
    vi: "Có sẵn",
  },
  total: {
    en: "Total:",
    vi: "Tổng:",
  },
  totalbytext: {
    en: "Total in words:",
    vi: "Tổng bằng chữ:",
  },
  totalWithComma: { en: "Total With Comma", vi: "Tổng với dấu phẩy" },
};

var data = {
  luongthuc: { total: 0, item_price: {} },
  go: { total: 0, item_price: {} },
  da: { total: 0, item_price: {} },
  quang: { total: 0, item_price: {} },
};

const OneK = 1000;
const OneMillion = 1000000;

const unit_price = {
  item_1k: 1 * OneK,
  item_5k: 5 * OneK,
  item_10k: 10 * OneK,
  item_50k: 50 * OneK,
  item_100k: 100 * OneK,
  item_500k: 500 * OneK,
  item_1m: 1 * OneMillion,
  item_5m: 5 * OneMillion,
  item_20m: 20 * OneMillion,
  item_50m: 50 * OneMillion,
};

function Rerender(lang) {
  document.title = langTitle.title[lang];

  $("#type_rss option").each(function () {
    var optionValue = $(this).val();
    $(this).text(
      langTitle.rssOption[lang]["option" + optionValue.toUpperCase()]
    );
  });

  $("#RSS_CLR").text(langTitle.buttonCLR[lang]);
  $("#Item_Type").text(langTitle.typeItem[lang].Item_Type);
  $("#Quantity").text(langTitle.typeItem[lang].Quantity);
  $("#Total").text(langTitle.typeItem[lang].Total);
  $("#cs_text").text(langTitle.cs[lang]);
  $("#total_text").text(langTitle.total[lang]);
  $("#Total-with-comma").text(langTitle.totalWithComma[lang]);
  $("#totalbytext").text(langTitle.totalbytext[lang]);
}

function CapitalizeTheFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function numberWithCommas(x, comma_flag = true) {
  return comma_flag
    ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : x.toString();
}

function calculateTotal() {
  const item_price = {};

  ["1k", "5k", "10k", "50k", "100k", "500k", "1m", "5m", "20m", "50m"].forEach(
    (size) => {
      const qty = $(`#qty_${size}`).val();
      const price = qty * unit_price[`item_${size}`];
      $(`#price_${size}`).val(numberWithCommas(price, false));
      $(`#price_${size}_with_comma`).val(numberWithCommas(price));
      item_price[`item_${size}`] = price;
    }
  );

  const qtyCs = $("#qty_cs").val();
  const priceCs = $("#price_cs").val();
  item_price.item_cs = qtyCs * priceCs;
  $("#price_cs_with_comma").val(numberWithCommas(item_price.item_cs));

  let total = 0;
  Object.values(item_price).forEach((price) => (total += price));

  const selectedOptionText = $("#type_rss option:selected").text();

  $("#total_value").text(numberWithCommas(total) + " " + selectedOptionText);
  let Lang = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    (Lang === "vi"
      ? total === 0
        ? "Không"
        : CapitalizeTheFirstLetter(to_vietnamese(total))
      : CapitalizeTheFirstLetter(to_english(total))) +
      " " +
      selectedOptionText
  );
  data[$("#type_rss").val()].total = total;
  data[$("#type_rss").val()].item_price = item_price;
  localStorage.setItem("Data", JSON.stringify(data));
}

function sortSelectOptions(selectElement) {
  var options = $(selectElement + " option");

  options.sort(function (a, b) {
    if (a.text.toUpperCase() > b.text.toUpperCase()) return 1;
    else if (a.text.toUpperCase() < b.text.toUpperCase()) return -1;
    else return 0;
  });

  $(selectElement).empty().append(options);
}

$(function () {
  $(".qty, .price").on("change keyup", calculateTotal);

  $("#type_rss").on("change", function () {
    Clear(false);
    LoadOldData();
  });

  const Lang = localStorage.getItem("Lang") || "vi";
  $("#type_lang").val(Lang);
  Rerender(Lang);

  const localData = JSON.parse(localStorage.getItem("Data"));
  if (localData) {
    data = localData;
    LoadOldData();
  } else {
    const sel = document.getElementById("type_rss");
    $("#total_value").text("0 " + sel.options[sel.selectedIndex].text);

    let Lang = localStorage.getItem("Lang") || "vi";
    $("#totalbytext_value").text(
      (Lang === "vi" ? "Không" : "Zero") +
        " " +
        sel.options[sel.selectedIndex].text
    );
  }

  sortSelectOptions("#type_rss");
});

function Clear(remove = true) {
  const item_price = {};

  [
    "1k",
    "5k",
    "10k",
    "50k",
    "100k",
    "500k",
    "1m",
    "5m",
    "20m",
    "50m",
    "cs",
  ].forEach((size) => {
    $(`#qty_${size}`).val(0);
    $(`#price_${size}`).val(0);
    $(`#price_${size}_with_comma`).val(0);
    item_price[`item_${size}`] = 0;
  });

  const sel = document.getElementById("type_rss");
  $("#total_value").text("0 " + sel.options[sel.selectedIndex].text);

  if (remove) {
    data[$("#type_rss").val()].total = 0;
    data[$("#type_rss").val()].item_price = item_price;
    localStorage.setItem("Data", JSON.stringify(data));
  }
}

function LoadOldData() {
  const sel = document.getElementById("type_rss");
  $("#total_value").text("0 " + sel.options[sel.selectedIndex].text);

  let Lang = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    (Lang === "vi" ? "Không" : "Zero") +
      " " +
      sel.options[sel.selectedIndex].text
  );
  const oldData = data[$("#type_rss").val()];
  const total = oldData.total;
  const item_price = oldData.item_price;

  ["1k", "5k", "10k", "50k", "100k", "500k", "1m", "5m", "20m", "50m"].forEach(
    (size) => {
      const qty = item_price[`item_${size}`] / unit_price[`item_${size}`];
      $(`#qty_${size}`).val(qty);
      $(`#price_${size}`).val(
        numberWithCommas(item_price[`item_${size}`], false)
      );
      $(`#price_${size}_with_comma`).val(
        numberWithCommas(item_price[`item_${size}`])
      );
    }
  );

  $("#qty_cs").val(1);
  $("#price_cs").val(item_price.item_cs);
  $("#price_cs_with_comma").val(numberWithCommas(item_price.item_cs));

  $("#total_value").text(
    numberWithCommas(total) + " " + sel.options[sel.selectedIndex].text
  );

  $("#totalbytext_value").text(
    (Lang === "vi"
      ? total === 0
        ? "Không"
        : CapitalizeTheFirstLetter(to_vietnamese(total))
      : CapitalizeTheFirstLetter(to_english(total))) +
      " " +
      sel.options[sel.selectedIndex].text
  );
}

function ClearAll() {
  Clear();
  localStorage.removeItem("Data");
}

function removeTrailingZeros(input) {
  return input.replace(
    /(^|\D)0*(\d+\.\d*|\d+)/g,
    (_, p1, p2) => p1 + (p2 || "")
  );
}

function cleanInput(inputElement) {
  inputElement.value = removeTrailingZeros(inputElement.value);
}
