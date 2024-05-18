const langTitle = {
  title: {
    en: "Calculation Resource, Acceleration Evony",
    vi: "T\xednh T\xe0i Nguy\xean, Tăng Tốc Evony",
  },
  langOption: {
    en: { optionVI: "Vietnamese", optionEN: "English" },
    vi: { optionVI: "Tiếng Việt", optionEN: "Tiếng Anh" },
  },
};
function Rerender(n) {
  $("title").text(langTitle.title[n]),
    $("#type_lang option").each(function () {
      let t = $(this).val();
      $(this).text(langTitle.langOption[n][`option${t.toUpperCase()}`]);
    });
}
$(function () {
  let n = localStorage.getItem("Lang") || "vi";
  $("#type_lang").val(n), Rerender(n);
}),
  $("#type_lang").on("change", function () {
    let n = $(this).val();
    localStorage.setItem("Lang", n),
      $("#RSS")[0].contentWindow.location.reload(),
      $("#TT")[0].contentWindow.location.reload(),
      Rerender(n);
  });
