// 간단한 EN/KO 토글. 기본 영어(앱 기본 언어). 선택은 localStorage에 저장.
(function () {
  var KEY = "narrate-lang";
  function apply(lang) {
    document.body.setAttribute("data-lang", lang);
    var btns = document.querySelectorAll(".langbar button");
    btns.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-set") === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  function init() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    var lang = saved || (navigator.language && navigator.language.indexOf("ko") === 0 ? "ko" : "en");
    apply(lang);
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
