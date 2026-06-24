// Renewly 사이트 — KO/EN 언어 토글 (정적, 의존성 없음)
(function () {
  var KEY = "renewly.lang";
  var root = document.documentElement;

  function apply(lang) {
    lang = lang === "en" ? "en" : "ko";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var btns = document.querySelectorAll(".lang button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("on", btns[i].dataset.set === lang);
      btns[i].setAttribute("aria-pressed", String(btns[i].dataset.set === lang));
    }
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  // 초기 언어: 저장값 → 브라우저 언어 → 기본 ko
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var initial = saved || ((navigator.language || "ko").toLowerCase().indexOf("ko") === 0 ? "ko" : "en");
  apply(initial);

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".lang button");
    if (b) apply(b.dataset.set);
  });
})();
