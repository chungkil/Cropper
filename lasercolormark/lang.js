(function () {
  var KEY = "lms.lang";
  var supported = ["ko", "en"];

  function pick() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* 프라이빗 모드 */ }
    if (supported.indexOf(saved) >= 0) return saved;
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("ko") === 0 ? "ko" : "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    }
    try { localStorage.setItem(KEY, lang); } catch (e) { /* 무시 */ }
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(pick());
    document.addEventListener("click", function (event) {
      var target = event.target.closest ? event.target.closest(".lang button") : null;
      if (target) apply(target.dataset.lang);
    });
  });
})();
