// 간단한 EN/KO/ZH 토글. 기본 영어(앱 기본 언어). 선택은 localStorage에 저장.
(function () {
  var KEY = "narrate-lang";
  var LANGS = ["en", "ko", "zh"];
  // 브라우저 언어 → 지원 언어. zh-CN·zh-TW·zh-Hans 등 zh 계열은 모두 zh 로 본다.
  function detect() {
    var nav = (navigator.language || "").toLowerCase();
    if (nav.indexOf("ko") === 0) return "ko";
    if (nav.indexOf("zh") === 0) return "zh";
    return "en";
  }
  function apply(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "en";
    document.body.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-Hans" : lang);
    var btns = document.querySelectorAll(".langbar button");
    btns.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-set") === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  function init() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    apply(saved || detect());
    document.querySelectorAll(".langbar button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-set")); });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
