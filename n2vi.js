!(function () {
  var n = " hai ba bốn năm s\xe1u bảy t\xe1m ch\xedn",
    t = {
      units: ("? một" + n).split(" "),
      tens: ("lẻ mười" + n).split(" "),
      hundreds: ("kh\xf4ng một" + n).split(" "),
    },
    r = "x ngh\xecn triệu tỉ ngh\xecn".split(" ");
  function e(n) {
    var r = t.units[n[1]],
      e = [t.tens[n[0]]];
    return (
      n[0] > 0 && 5 == n[1] && (r = "lăm"),
      n[0] > 1 && (e.push("mươi"), 1 == n[1] && (r = "mốt")),
      "?" != r && e.push(r),
      e.join(" ")
    );
  }
  function s(n) {
    switch (n.length) {
      case 1:
        return t.units[n];
      case 2:
        return e(n);
      case 3:
        var r = [t.hundreds[n[0]], "trăm"];
        if ("00" != n.slice(1, 3)) {
          var s = e(n.slice(1, 3));
          r.push(s);
        }
        return r.join(" ");
    }
    return "";
  }
  function u(n) {
    for (
      var t = (n += "").split("."),
        r = t[0],
        e = t.length > 1 ? "." + t[1] : "",
        s = /(\d+)(\d{3})/;
      s.test(r);

    )
      r = r.replace(s, "$1,$2");
    return r + e;
  }
  function i(n, t) {
    return r[n];
  }
  function h(n, t) {
    var e,
      u,
      i,
      h,
      $,
      a = parseInt(n) + "",
      o = a.length;
    if (0 == o || "NaN" == a) return "";
    var p = 0,
      c = [],
      f = [];
    if ("0" === a) return "Kh\xf4ng";
    for (; o >= 0; ) c.push(a.substring(o, Math.max(o - 3, 0))), (o -= 3);
    var l = 0;
    for (p = c.length - 1; p >= 0; p--) {
      "000" == c[p]
        ? ((l += 1), 2 == p && 2 == l && f.push(((e = p + 1), (u = l), r[e])))
        : "" != c[p] &&
          ((l = 0),
          f.push(s(c[p])),
          ($ = ((i = p), (h = l), r[i])) && "x" != $ && f.push($));
    }
    return t && f.push(t), f.join(" ");
  }
  "undefined" != typeof module && void 0 !== module.exports
    ? (module.exports = h)
    : (window.to_vietnamese = h);
})();
