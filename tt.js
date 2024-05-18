const langTitle = {
  title: { en: "Calculation Acceleration Evony", vi: "T\xednh Tăng Tốc Evony" },
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
      optionQUAN: "Tăng Tốc Luyện Qu\xe2n",
      optionNGHIENCUU: "Tăng Tốc Nghi\xean Cứu",
      optionBAY: "Tăng Tốc X\xe2y Bẫy",
      optionCHETAC: "Tăng Tốc Chế T\xe1c",
      optionXAYDUNG: "Tăng Tốc X\xe2y Dựng",
      optionMAU: "Tăng Tốc Hồi M\xe1u",
    },
  },
  unitOption: {
    en: { optionPHUT: "Minutes", optionGIO: "Hours", optionNGAY: "Days" },
    vi: { optionPHUT: "Ph\xfat", optionGIO: "Giờ", optionNGAY: "Ng\xe0y" },
  },
  buttonCLR: { en: "Clear", vi: "Xo\xe1" },
  typeItem: {
    en: { Item_Type: "Item Type", Quantity: "Quantity", Total: "Total" },
    vi: { Item_Type: "Loại Item", Quantity: "Số Lượng", Total: "Tổng" },
  },
  total: { en: "Total:", vi: "Tổng:" },
  totalbytext: { en: "Total in words:", vi: "Tổng bằng chữ:" },
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
      "5_Phut": "5 Ph\xfat",
      "10_Phut": "10 Ph\xfat",
      "15_Phut": "15 Ph\xfat",
      "30_Phut": "30 Ph\xfat",
      "60_Phut": "60 Ph\xfat",
      "3_Gio": "3 Giờ",
      "8_Gio": "8 Giờ",
      "12_Gio": "12 Giờ",
      "24_Gio": "24 Giờ",
      "3_Ngay": "3 Ng\xe0y",
      "7_Ngay": "7 Ng\xe0y",
      "30_Ngay": "30 Ng\xe0y",
    },
  },
};
function Rerender(t) {
  (document.title = langTitle.title[t]),
    $("#type_tt option").each(function () {
      var e = $(this).val();
      $(this).text(langTitle.ttOption[t]["option" + e.toUpperCase()]);
    }),
    $("#type_unit option").each(function () {
      var e = $(this).val();
      $(this).text(langTitle.unitOption[t]["option" + e.toUpperCase()]);
    }),
    $("#TT_CLR").text(langTitle.buttonCLR[t]),
    $("#Item_Type").text(langTitle.typeItem[t].Item_Type),
    $("#Quantity").text(langTitle.typeItem[t].Quantity),
    $("#total_text").text(langTitle.total[t]),
    $("#Total-with-comma").text(langTitle.totalWithComma[t]),
    $("#Total").text(langTitle.typeItem[t].Total),
    $("#totalbytext").text(langTitle.totalbytext[t]),
    Object.keys(langTitle.item[t]).forEach(function (e) {
      $("#" + e).text(langTitle.item[t][e]);
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
const OneHourToMinute = 60,
  OneDayToHour = 24,
  unit_price = {
    item_5p: 5,
    item_10p: 10,
    item_15p: 15,
    item_30p: 30,
    item_60p: 60,
    item_3g: 180,
    item_8g: 480,
    item_12g: 720,
    item_24g: 1440,
    item_3d: 4320,
    item_7d: 10080,
    item_30d: 43200,
  };
function RenderWithUnit() {
  let t = document.getElementById("type_unit");
  return t.options[t.selectedIndex].text;
}
function numberWithCommas(t, e = !0) {
  return e ? t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : t.toString();
}
function ConvertMinutesToHoursWithFloat(t) {
  return (t / 60).toFixed(2);
}
function ConvertMinutesToDaysWithFloat(t) {
  return (t / 1440).toFixed(2);
}
function numberConvert(t) {
  let e = RenderWithUnit();
  return "Giờ" === e || "Hours" === e
    ? numberWithCommas(ConvertMinutesToHoursWithFloat(t))
    : "Ng\xe0y" === e || "Days" === e
    ? numberWithCommas(ConvertMinutesToDaysWithFloat(t))
    : numberWithCommas(t);
}
function numberWithCommasWithUnit(t) {
  let e = RenderWithUnit();
  return numberConvert(t) + " " + e;
}
function calculateTotal() {
  let t = {},
    e = 0;
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
  ].forEach(function (i) {
    let n = parseFloat($("#qty_" + i).val()),
      a = n * unit_price["item_" + i];
    $("#price_" + i).val(numberWithCommasWithUnit(a, !1)),
      $("#price_" + i + "_with_comma").val(numberWithCommasWithUnit(a)),
      (t["item_" + i] = a),
      (e += a);
  });
  let i = $("#type_tt");
  $("#total_value").text(
    numberWithCommasWithUnit(e) + " " + i.find(":selected").text()
  );
  let n = localStorage.getItem("Lang") || "vi",
    a = RenderWithUnit();
  $("#totalbytext_value").text(
    ("vi" === n
      ? CapitalizeTheFirstLetter(to_vietnamese(numberConvert(e)))
      : CapitalizeTheFirstLetter(to_english(numberConvert(e)))) +
      " " +
      a +
      " " +
      i.find(":selected").text()
  ),
    (data[i.val()].total = e),
    (data[i.val()].item_price = t),
    localStorage.setItem("Data_TT", JSON.stringify(data));
}
function CapitalizeTheFirstLetter(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Clear(t = !0) {
  let e = {};
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
  ].forEach((t) => {
    $(`#qty_${t}`).val(0),
      $(`#price_${t}`).val(0),
      $(`#price_${t}_with_comma`).val(0),
      (e[`item_${t}`] = 0);
  });
  let i = document.getElementById("type_tt"),
    n = RenderWithUnit();
  $("#total_value").text(
    numberWithCommasWithUnit(0) + i.options[i.selectedIndex].text
  );
  let a = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    ("vi" === a
      ? CapitalizeTheFirstLetter(to_vietnamese(numberConvert(0)))
      : CapitalizeTheFirstLetter(to_english(numberConvert(0)))) +
      " " +
      n +
      " " +
      i.options[i.selectedIndex].text
  ),
    t &&
      ((data[$("#type_tt").val()].total = 0),
      (data[$("#type_tt").val()].item_price = e),
      localStorage.setItem("Data_TT", JSON.stringify(data)));
}
function LoadOldData() {
  let t = $("#type_tt"),
    e = t.find(":selected").text(),
    i = $("#total_value");
  i.text(numberWithCommasWithUnit(0) + " " + e);
  let n = localStorage.getItem("Lang") || "vi",
    a = RenderWithUnit();
  $("#totalbytext_value").text(
    ("vi" === n
      ? CapitalizeTheFirstLetter(to_vietnamese(numberConvert(0)))
      : CapitalizeTheFirstLetter(to_english(numberConvert(0)))) +
      " " +
      a +
      " " +
      e
  );
  let o = data[t.val()],
    l = o.total,
    r = o.item_price;
  if (l > 0) {
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
    ].forEach(function (t) {
      let e = $("#qty_" + t),
        i = $("#price_" + t),
        n = $("#price_" + t + "_with_comma");
      e.val(r["item_" + t] / unit_price["item_" + t]),
        i.val(numberWithCommasWithUnit(r["item_" + t], !1)),
        n.val(numberWithCommasWithUnit(r["item_" + t]));
    }),
      i.text(numberWithCommasWithUnit(l) + " " + e);
    let p = RenderWithUnit();
    $("#totalbytext_value").text(
      ("vi" === n
        ? CapitalizeTheFirstLetter(to_vietnamese(numberConvert(l)))
        : CapitalizeTheFirstLetter(to_english(numberConvert(l)))) +
        " " +
        p +
        " " +
        e
    );
  }
}
function sortSelectOptions(t) {
  var e = $(t + " option");
  e.sort(function (t, e) {
    return t.text.toUpperCase() > e.text.toUpperCase()
      ? 1
      : t.text.toUpperCase() < e.text.toUpperCase()
      ? -1
      : 0;
  }),
    $(t).empty().append(e);
}
function ClearAll() {
  Clear(), localStorage.removeItem("Data_TT");
}
function removeTrailingZeros(t) {
  return t.replace(/(^|\D)0*(\d+\.\d*|\d+)/g, (t, e, i) => e + (i || "")) || 0;
}
function cleanInput(t) {
  t.value = removeTrailingZeros(t.value);
}
$(function () {
  $(".qty").on("change keyup", calculateTotal);
}),
  $("#type_tt").on("change", function (t) {
    Clear(!1), LoadOldData();
  }),
  $("#type_unit").on("change", function (t) {
    Clear(!1), LoadOldData();
  }),
  $(function () {
    let t = localStorage.getItem("Lang") || "vi";
    $("#type_lang").val(t), Rerender(t);
    let e = JSON.parse(localStorage.getItem("Data_TT"));
    if (e) (data = e), LoadOldData();
    else {
      let i = document.getElementById("type_tt");
      $("#total_value").text(
        numberWithCommasWithUnit(0) + " " + i.options[i.selectedIndex].text
      );
      let n = localStorage.getItem("Lang") || "vi",
        a = RenderWithUnit();
      $("#totalbytext_value").text(
        ("vi" === n
          ? CapitalizeTheFirstLetter(to_vietnamese(numberConvert(0)))
          : CapitalizeTheFirstLetter(to_english(numberConvert(0)))) +
          " " +
          a +
          " " +
          i.options[i.selectedIndex].text
      );
    }
    sortSelectOptions("#type_tt"), calculateTotal();
  });
