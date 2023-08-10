const langTitle = {
  title: {
    en: "Calculation Resource, Acceleration Evony",
    vi: "Tính Tài Nguyên, Tăng Tốc Evony",
  },
  langOption: {
    en: { optionVI: "Vietnamese", optionEN: "English" },
    vi: { optionVI: "Tiếng Việt", optionEN: "Tiếng Anh" },
  },
};

function Rerender(lang) {
  $("title").text(langTitle.title[lang]);
  $("#type_lang option").each(function () {
    const optionValue = $(this).val();
    $(this).text(
      langTitle.langOption[lang][`option${optionValue.toUpperCase()}`]
    );
  });
}

$(function () {
  const Lang = localStorage.getItem("Lang") || "vi";
  $("#type_lang").val(Lang);
  Rerender(Lang);
});

$("#type_lang").on("change", function () {
  const valueSelected = $(this).val();
  localStorage.setItem("Lang", valueSelected);
  $("#RSS")[0].contentWindow.location.reload();
  $("#TT")[0].contentWindow.location.reload();
  Rerender(valueSelected);
});
