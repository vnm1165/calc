const langTitle = {
  title: {
    en: "Calculating Resources Evony",
    vi: "T\xednh T\xe0i Nguy\xean Evony",
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
      optionDA: "Đ\xe1",
      optionQUANG: "Quặng",
    },
  },
  buttonCLR: { en: "Clear", vi: "Xo\xe1" },
  typeItem: {
    en: { Item_Type: "Item Type", Quantity: "Quantity", Total: "Total" },
    vi: { Item_Type: "Loại Item", Quantity: "Số Lượng", Total: "Tổng" },
  },
  cs: { en: "Available", vi: "C\xf3 sẵn" },
  total: { en: "Total:", vi: "Tổng:" },
  totalbytext: { en: "Total in words:", vi: "Tổng bằng chữ:" },
  totalWithComma: { en: "Total With Comma", vi: "Tổng với dấu phẩy" },
};
var data = {
  luongthuc: { total: 0, item_price: {} },
  go: { total: 0, item_price: {} },
  da: { total: 0, item_price: {} },
  quang: { total: 0, item_price: {} },
};
const OneK = 1e3,
  OneMillion = 1e6,
  unit_price = {
    item_1k: 1e3,
    item_5k: 5e3,
    item_10k: 1e4,
    item_50k: 5e4,
    item_100k: 1e5,
    item_500k: 5e5,
    item_1m: 1e6,
    item_5m: 5e6,
    item_20m: 2e7,
    item_50m: 5e7,
  };
function Rerender(t) {
  (document.title = langTitle.title[t]),
    $("#type_rss option").each(function () {
      var e = $(this).val();
      $(this).text(langTitle.rssOption[t]["option" + e.toUpperCase()]);
    }),
    $("#RSS_CLR").text(langTitle.buttonCLR[t]),
    $("#Item_Type").text(langTitle.typeItem[t].Item_Type),
    $("#Quantity").text(langTitle.typeItem[t].Quantity),
    $("#Total").text(langTitle.typeItem[t].Total),
    $("#cs_text").text(langTitle.cs[t]),
    $("#total_text").text(langTitle.total[t]),
    $("#Total-with-comma").text(langTitle.totalWithComma[t]),
    $("#totalbytext").text(langTitle.totalbytext[t]);
}
function CapitalizeTheFirstLetter(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function numberWithCommas(t, e = !0) {
  return e ? t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : t.toString();
}
function calculateTotal() {
  let t = {};
  ["1k", "5k", "10k", "50k", "100k", "500k", "1m", "5m", "20m", "50m"].forEach(
    (e) => {
      let a = $(`#qty_${e}`).val(),
        i = a * unit_price[`item_${e}`];
      $(`#price_${e}`).val(numberWithCommas(i, !1)),
        $(`#price_${e}_with_comma`).val(numberWithCommas(i)),
        (t[`item_${e}`] = i);
    }
  );
  let e = $("#qty_cs").val(),
    a = $("#price_cs").val();
  (t.item_cs = e * a),
    $("#price_cs_with_comma").val(numberWithCommas(t.item_cs));
  let i = 0;
  Object.values(t).forEach((t) => (i += t));
  let l = $("#type_rss option:selected").text();
  $("#total_value").text(numberWithCommas(i) + " " + l);
  let o = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    ("vi" === o
      ? CapitalizeTheFirstLetter(to_vietnamese(i))
      : CapitalizeTheFirstLetter(to_english(i))) +
      " " +
      l
  ),
    (data[$("#type_rss").val()].total = i),
    (data[$("#type_rss").val()].item_price = t),
    localStorage.setItem("Data", JSON.stringify(data));
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
function Clear(t = !0) {
  let e = {};
  ["1k", "5k", "10k", "50k", "100k", "500k", "1m", "5m", "20m", "50m"].forEach(
    (t) => {
      $(`#qty_${t}`).val(0),
        $(`#price_${t}`).val(0),
        $(`#price_${t}_with_comma`).val(0),
        (e[`item_${t}`] = 0);
    }
  );
  let a = document.getElementById("type_rss");
  $("#total_value").text(
    numberWithCommas(0) + " " + a.options[a.selectedIndex].text
  );
  let i = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    ("vi" === i
      ? CapitalizeTheFirstLetter(to_vietnamese(0))
      : CapitalizeTheFirstLetter(to_english(0))) +
      " " +
      a.options[a.selectedIndex].text
  ),
    t &&
      ((data[$("#type_rss").val()].total = 0),
      (data[$("#type_rss").val()].item_price = e),
      localStorage.setItem("Data", JSON.stringify(data)));
}
function LoadOldData() {
  let t = document.getElementById("type_rss");
  $("#total_value").text(
    numberWithCommas(0) + " " + t.options[t.selectedIndex].text
  );
  let e = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    ("vi" === e
      ? CapitalizeTheFirstLetter(to_vietnamese(0))
      : CapitalizeTheFirstLetter(to_english(0))) +
      " " +
      t.options[t.selectedIndex].text
  );
  let a = data[$("#type_rss").val()],
    i = a.total,
    l = a.item_price;
  ["1k", "5k", "10k", "50k", "100k", "500k", "1m", "5m", "20m", "50m"].forEach(
    (t) => {
      let e = l[`item_${t}`] / unit_price[`item_${t}`];
      $(`#qty_${t}`).val(e),
        $(`#price_${t}`).val(numberWithCommas(l[`item_${t}`], !1)),
        $(`#price_${t}_with_comma`).val(numberWithCommas(l[`item_${t}`]));
    }
  ),
    $("#qty_cs").val(1),
    $("#price_cs").val(l.item_cs),
    $("#price_cs_with_comma").val(numberWithCommas(l.item_cs)),
    $("#total_value").text(
      numberWithCommas(i) + " " + t.options[t.selectedIndex].text
    ),
    $("#totalbytext_value").text(
      ("vi" === e
        ? CapitalizeTheFirstLetter(to_vietnamese(i))
        : CapitalizeTheFirstLetter(to_english(i))) +
        " " +
        t.options[t.selectedIndex].text
    );
}
function ClearAll() {
  Clear(), localStorage.removeItem("Data");
}
function removeTrailingZeros(t) {
  return t.replace(/(^|\D)0*(\d+\.\d*|\d+)/g, (t, e, a) => e + (a || ""));
}
function cleanInput(t) {
  t.value = removeTrailingZeros(t.value);
}
function Rerender(t) {
  (document.title = langTitle.title[t]),
    $("#type_rss option").each(function () {
      var e = $(this).val();
      $(this).text(langTitle.rssOption[t]["option" + e.toUpperCase()]);
    }),
    $("#RSS_CLR").text(langTitle.buttonCLR[t]),
    $("#Item_Type").text(langTitle.typeItem[t].Item_Type),
    $("#Quantity").text(langTitle.typeItem[t].Quantity),
    $("#Total").text(langTitle.typeItem[t].Total),
    $("#cs_text").text(langTitle.cs[t]),
    $("#total_text").text(langTitle.total[t]),
    $("#Total-with-comma").text(langTitle.totalWithComma[t]),
    $("#totalbytext").text(langTitle.totalbytext[t]);
}
function CapitalizeTheFirstLetter(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function numberWithCommas(t, e = !0) {
  return e ? t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : t.toString();
}
function calculateTotal() {
  let t = {};
  ["1k", "5k", "10k", "50k", "100k", "500k", "1m", "5m", "20m", "50m"].forEach(
    (e) => {
      let a = $(`#qty_${e}`).val(),
        i = a * unit_price[`item_${e}`];
      $(`#price_${e}`).val(numberWithCommas(i, !1)),
        $(`#price_${e}_with_comma`).val(numberWithCommas(i)),
        (t[`item_${e}`] = i);
    }
  );
  let e = $("#qty_cs").val(),
    a = $("#price_cs").val();
  (t.item_cs = e * a),
    $("#price_cs_with_comma").val(numberWithCommas(t.item_cs));
  let i = 0;
  Object.values(t).forEach((t) => (i += t));
  let l = $("#type_rss option:selected").text();
  $("#total_value").text(numberWithCommas(i) + " " + l);
  let o = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    ("vi" === o
      ? CapitalizeTheFirstLetter(to_vietnamese(i))
      : CapitalizeTheFirstLetter(to_english(i))) +
      " " +
      l
  ),
    (data[$("#type_rss").val()].total = i),
    (data[$("#type_rss").val()].item_price = t),
    localStorage.setItem("Data", JSON.stringify(data));
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
function Clear(t = !0) {
  let e = {};
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
  ].forEach((t) => {
    $(`#qty_${t}`).val(0),
      $(`#price_${t}`).val(0),
      $(`#price_${t}_with_comma`).val(0),
      (e[`item_${t}`] = 0);
  });
  let a = document.getElementById("type_rss");
  $("#total_value").text(
    numberWithCommas(0) + " " + a.options[a.selectedIndex].text
  );
  let i = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    ("vi" === i
      ? CapitalizeTheFirstLetter(to_vietnamese(0))
      : CapitalizeTheFirstLetter(to_english(0))) +
      " " +
      a.options[a.selectedIndex].text
  ),
    t &&
      ((data[$("#type_rss").val()].total = 0),
      (data[$("#type_rss").val()].item_price = e),
      localStorage.setItem("Data", JSON.stringify(data)));
}
function LoadOldData() {
  let t = document.getElementById("type_rss");
  $("#total_value").text(
    numberWithCommas(0) + " " + t.options[t.selectedIndex].text
  );
  let e = localStorage.getItem("Lang") || "vi";
  $("#totalbytext_value").text(
    ("vi" === e
      ? CapitalizeTheFirstLetter(to_vietnamese(0))
      : CapitalizeTheFirstLetter(to_english(0))) +
      " " +
      t.options[t.selectedIndex].text
  );
  let a = data[$("#type_rss").val()],
    i = a.total,
    l = a.item_price;
  ["1k", "5k", "10k", "50k", "100k", "500k", "1m", "5m", "20m", "50m"].forEach(
    (t) => {
      let e = l[`item_${t}`] / unit_price[`item_${t}`];
      $(`#qty_${t}`).val(e || 0),
        $(`#price_${t}`).val(numberWithCommas(l[`item_${t}`] || 0, !1)),
        $(`#price_${t}_with_comma`).val(numberWithCommas(l[`item_${t}`] || 0));
    }
  ),
    $("#qty_cs").val(1),
    $("#price_cs").val(l.item_cs || 0),
    $("#price_cs_with_comma").val(numberWithCommas(l.item_cs || 0)),
    $("#total_value").text(
      numberWithCommas(i) + " " + t.options[t.selectedIndex].text
    ),
    $("#totalbytext_value").text(
      ("vi" === e
        ? CapitalizeTheFirstLetter(to_vietnamese(i))
        : CapitalizeTheFirstLetter(to_english(i))) +
        " " +
        t.options[t.selectedIndex].text
    );
}
function ClearAll() {
  Clear(), localStorage.removeItem("Data");
}
function removeTrailingZeros(t) {
  return t.replace(/(^|\D)0*(\d+\.\d*|\d+)/g, (t, e, a) => e + (a || "")) || 0;
}
function cleanInput(t) {
  t.value = removeTrailingZeros(t.value);
}
$(function () {
  $(".qty, .price").on("change keyup", calculateTotal),
    $("#type_rss").on("change", function () {
      Clear(!1), LoadOldData();
    });
  let t = localStorage.getItem("Lang") || "vi";
  $("#type_lang").val(t), Rerender(t);
  let e = JSON.parse(localStorage.getItem("Data"));
  if (e) (data = e), LoadOldData();
  else {
    let a = document.getElementById("type_rss");
    $("#total_value").text(
      numberWithCommas(0) + " " + a.options[a.selectedIndex].text
    );
    let i = localStorage.getItem("Lang") || "vi";
    $("#totalbytext_value").text(
      ("vi" === i
        ? CapitalizeTheFirstLetter(to_vietnamese(0))
        : CapitalizeTheFirstLetter(to_english(0))) +
        " " +
        a.options[a.selectedIndex].text
    );
  }
  sortSelectOptions("#type_rss");
}),
  $(function () {
    $(".qty, .price").on("change keyup", calculateTotal),
      $("#type_rss").on("change", function () {
        Clear(!1), LoadOldData();
      });
    let t = localStorage.getItem("Lang") || "vi";
    $("#type_lang").val(t), Rerender(t);
    let e = JSON.parse(localStorage.getItem("Data"));
    if (e) (data = e), LoadOldData();
    else {
      let a = document.getElementById("type_rss");
      $("#total_value").text(
        numberWithCommas(0) + " " + a.options[a.selectedIndex].text
      );
      let i = localStorage.getItem("Lang") || "vi";
      $("#totalbytext_value").text(
        ("vi" === i
          ? CapitalizeTheFirstLetter(to_vietnamese(0))
          : CapitalizeTheFirstLetter(to_english(0))) +
          " " +
          a.options[a.selectedIndex].text
      );
    }
    sortSelectOptions("#type_rss");
  });
