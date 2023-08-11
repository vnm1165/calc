const langTitle = {
  title: {
    en: "Calculation Acceleration Evony",
    vi: "Tính Tăng Tốc Evony",
  },
  ttOption: {
    en: {
      optionTHUONG: "Normal Speed ​​Up",
      optionQUAN: "Military Training Speed ​​Up",
      optionNGHIENCUU: "Research Speed ​​Up",
      optionBAY: "Trap Build Speed ​​Up",
      optionCHETAC: "Crafting Speed ​​Up ",
      optionXAYDUNG: "Construction Speed ​​Up",
      optionMAU: "Heal Speed ​​Up",
    },
    vi: {
      optionTHUONG: "Tăng Tốc Thường",
      optionQUAN: "Tăng Tốc Luyện Quân",
      optionNGHIENCUU: "Tăng Tốc Nghiên Cứu",
      optionBAY: "Tăng Tốc Xây Bẫy",
      optionCHETAC: "Tăng Tốc Chế Tác",
      optionXAYDUNG: "Tăng Tốc Xây Dựng",
      optionMAU: "Tăng Tốc Hồi Máu",
    },
  },
  unitOption: {
    en: {
      optionPHUT: "Minutes",
      optionGIO: "Hours",
      optionNGAY: "Days",
    },
    vi: {
      optionPHUT: "Phút",
      optionGIO: "Giờ",
      optionNGAY: "Ngày",
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
  total: {
    en: "Total:",
    vi: "Tổng:",
  },
  totalbytext: {
    en: "Total in words:",
    vi: "Tổng bằng chữ:",
  },
  totalWithComma: { en: "Total With Comma", vi: "Tổng với dấu phẩy" },
  item: {
    en: {
      "5_Phut": "5 Minutes",
      "10_Phut": "10 Minutes",
      "15_Phut": "15 Minutes",
      "30_Phut": "30 Minutes",
      "60_Phut": "60 Minutes",
      "3_Gio": "3 Hours",
      "8_Gio": "8 Hours",
      "12_Gio": "12 Hours",
      "24_Gio": "24 Hours",
      "3_Ngay": "3 Days",
      "7_Ngay": "7 Days",
      "30_Ngay": "30 Days",
    },
    vi: {
      "5_Phut": "5 Phút",
      "10_Phut": "10 Phút",
      "15_Phut": "15 Phút",
      "30_Phut": "30 Phút",
      "60_Phut": "60 Phút",
      "3_Gio": "3 Giờ",
      "8_Gio": "8 Giờ",
      "12_Gio": "12 Giờ",
      "24_Gio": "24 Giờ",
      "3_Ngay": "3 Ngày",
      "7_Ngay": "7 Ngày",
      "30_Ngay": "30 Ngày",
    },
  },
};

function Rerender(lang) {
  document.title = langTitle.title[lang];

  $("#type_tt option").each(function () {
    var optionValue = $(this).val();
    $(this).text(
      langTitle.ttOption[lang]["option" + optionValue.toUpperCase()]
    );
  });

  $("#type_unit option").each(function () {
    var optionValue = $(this).val();
    $(this).text(
      langTitle.unitOption[lang]["option" + optionValue.toUpperCase()]
    );
  });

  $("#TT_CLR").text(langTitle.buttonCLR[lang]);

  $("#Item_Type").text(langTitle.typeItem[lang].Item_Type);
  $("#Quantity").text(langTitle.typeItem[lang].Quantity);
  $("#total_text").text(langTitle.total[lang]);
  $("#Total-with-comma").text(langTitle.totalWithComma[lang]);
  $("#Total").text(langTitle.typeItem[lang].Total);
  $("#totalbytext").text(langTitle.totalbytext[lang]);

  Object.keys(langTitle.item[lang]).forEach(function (key) {
    $("#" + key).text(langTitle.item[lang][key]);
  });
}

var data = {
  thuong: { total: 0, item_price: {} },
  quan: { total: 0, item_price: {} },
  nghiencuu: { total: 0, item_price: {} },
  chetac: { total: 0, item_price: {} },
  xaydung: { total: 0, item_price: {} },
  bay: { total: 0, item_price: {} },
  mau: { total: 0, item_price: {} },
};

const OneHourToMinute = 60;
const OneDayToHour = 24;

const unit_price = {
  item_5p: 5,
  item_10p: 10,
  item_15p: 15,
  item_30p: 30,
  item_60p: 60,
  item_3g: 3 * OneHourToMinute,
  item_8g: 8 * OneHourToMinute,
  item_12g: 12 * OneHourToMinute,
  item_24g: 24 * OneHourToMinute,
  item_3d: 3 * OneDayToHour * OneHourToMinute,
  item_7d: 7 * OneDayToHour * OneHourToMinute,
  item_30d: 30 * OneDayToHour * OneHourToMinute,
};

function RenderWithUnit() {
  let sel_unit = document.getElementById("type_unit");
  return sel_unit.options[sel_unit.selectedIndex].text;
}

function numberWithCommas(x, comma_flag = true) {
  return comma_flag
    ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : x.toString();
}

function ConvertMinutesToHoursWithFloat(minutes) {
  let hours = minutes / OneHourToMinute;
  return hours.toFixed(2);
}

function ConvertMinutesToDaysWithFloat(minutes) {
  let days = minutes / (OneDayToHour * OneHourToMinute);
  return days.toFixed(2);
}

function numberConvert(x) {
  let unit_val = RenderWithUnit();
  if (unit_val === "Giờ" || unit_val === "Hours") {
    return numberWithCommas(ConvertMinutesToHoursWithFloat(x));
  } else if (unit_val === "Ngày" || unit_val === "Days") {
    return numberWithCommas(ConvertMinutesToDaysWithFloat(x));
  }

  return numberWithCommas(x);
}

function numberWithCommasWithUnit(x) {
  let unit_val = RenderWithUnit();
  return numberConvert(x) + " " + unit_val;
}
function calculateTotal() {
  let item_price = {};
  let total = 0;

  const units = [
    "5p",
    "10p",
    "15p",
    "30p",
    "60p",
    "3g",
    "8g",
    "12g",
    "24g",
    "3d",
    "7d",
    "30d",
  ];

  units.forEach(function (unit) {
    const qty = parseFloat($("#qty_" + unit).val());
    const price = qty * unit_price["item_" + unit];

    $("#price_" + unit).val(numberWithCommasWithUnit(price, false));
    $("#price_" + unit + "_with_comma").val(numberWithCommasWithUnit(price));

    item_price["item_" + unit] = price;
    total += price;
  });

  let sel = $("#type_tt");
  $("#total_value").text(
    numberWithCommasWithUnit(total) + " " + sel.find(":selected").text()
  );

  let Lang = localStorage.getItem("Lang") || "vi";
  let unit_val = RenderWithUnit();
  $("#totalbytext_value").text(
    (Lang === "vi"
      ? total === 0
        ? "Không"
        : CapitalizeTheFirstLetter(to_vietnamese(numberConvert(total)))
      : CapitalizeTheFirstLetter(to_english(numberConvert(total)))) +
      " " +
      unit_val +
      " " +
      sel.find(":selected").text()
  );

  data[sel.val()].total = total;
  data[sel.val()].item_price = item_price;
  localStorage.setItem("Data_TT", JSON.stringify(data));
}

$(function () {
  $(".qty").on("change keyup", calculateTotal);
});

function CapitalizeTheFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Clear(remove = true) {
  const item_price = {};

  [
    "5p",
    "10p",
    "15p",
    "30p",
    "60p",
    "3g",
    "8g",
    "12g",
    "24g",
    "3d",
    "7d",
    "30d",
  ].forEach((size) => {
    $(`#qty_${size}`).val(0);
    $(`#price_${size}`).val(0);
    $(`#price_${size}_with_comma`).val(0);
    item_price[`item_${size}`] = 0;
  });

  let sel = document.getElementById("type_tt");
  let unit_val = RenderWithUnit();
  $("#total_value").text(
    "0 " + unit_val + " " + sel.options[sel.selectedIndex].text
  );
  let Lang = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    (Lang === "vi" ? "Không" : "Zero") +
      " " +
      unit_val +
      " " +
      sel.options[sel.selectedIndex].text
  );

  if (remove) {
    data[$("#type_tt").val()].total = 0;
    data[$("#type_tt").val()].item_price = item_price;
    localStorage.setItem("Data_TT", JSON.stringify(data));
  }
}

function LoadOldData() {
  let sel = $("#type_tt");
  let selectedText = sel.find(":selected").text();
  let totalValue = $("#total_value");
  totalValue.text(numberWithCommasWithUnit(0) + " " + selectedText);
  let Lang = localStorage.getItem("Lang") || "vi";

  let unit_val = RenderWithUnit();
  $("#totalbytext_value").text(
    (Lang === "vi" ? "Không" : "Zero") + " " + unit_val + " " + selectedText
  );
  let old_data = data[sel.val()];
  let total = old_data.total;
  let item_price = old_data.item_price;

  if (total > 0) {
    const units = [
      "5p",
      "10p",
      "15p",
      "30p",
      "60p",
      "3g",
      "8g",
      "12g",
      "24g",
      "3d",
      "7d",
      "30d",
    ];

    units.forEach(function (unit) {
      let qtyInput = $("#qty_" + unit);
      let priceInput = $("#price_" + unit);
      let priceWithCommaInput = $("#price_" + unit + "_with_comma");

      qtyInput.val(item_price["item_" + unit] / unit_price["item_" + unit]);
      priceInput.val(
        numberWithCommasWithUnit(item_price["item_" + unit], false)
      );
      priceWithCommaInput.val(
        numberWithCommasWithUnit(item_price["item_" + unit])
      );
    });

    totalValue.text(numberWithCommasWithUnit(total) + " " + selectedText);
    let unit_val = RenderWithUnit();
    $("#totalbytext_value").text(
      (Lang === "vi"
        ? total === 0
          ? "Không"
          : CapitalizeTheFirstLetter(to_vietnamese(numberConvert(total)))
        : CapitalizeTheFirstLetter(to_english(numberConvert(total)))) +
        " " +
        unit_val +
        " " +
        sel.find(":selected").text()
    );
  }
}

$("#type_tt").on("change", function (e) {
  Clear(false);
  LoadOldData();
});

$("#type_unit").on("change", function (e) {
  Clear(false);
  LoadOldData();
});

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
  let Lang = localStorage.getItem("Lang") || "vi";
  $("#type_lang").val(Lang);

  Rerender(Lang);
  let local_data = JSON.parse(localStorage.getItem("Data_TT"));
  if (local_data) {
    data = local_data;
    LoadOldData();
  } else {
    let sel = document.getElementById("type_tt");
    $("#total_value").text(
      numberWithCommasWithUnit(0) + " " + sel.options[sel.selectedIndex].text
    );
    let Lang = localStorage.getItem("Lang") || "vi";
    let unit_val = RenderWithUnit();
    $("#totalbytext_value").text(
      (Lang === "vi"
        ? total === 0
          ? "Không"
          : CapitalizeTheFirstLetter(to_vietnamese(numberConvert(total)))
        : CapitalizeTheFirstLetter(to_english(numberConvert(total)))) +
        " " +
        unit_val +
        " " +
        sel.find(":selected").text()
    );
  }
  sortSelectOptions("#type_tt");
  calculateTotal();
});

function ClearAll() {
  Clear();
  localStorage.removeItem("Data_TT");
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
