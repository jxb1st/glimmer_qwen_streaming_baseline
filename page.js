(function () {
  var toc = document.querySelector("[data-toc]");
  var heads = document.querySelectorAll(".exp-section > h2[id]");
  if (toc && heads.length > 1) {
    var ol = document.createElement("ol");
    Array.prototype.forEach.call(heads, function (h) {
      var li = document.createElement("li"), a = document.createElement("a");
      a.href = "#" + h.id; a.textContent = h.textContent; li.appendChild(a); ol.appendChild(li);
      a.addEventListener("click", function () { setOpen(h, true); });
    });
    toc.appendChild(ol);
  }
  var OPEN = ["glance", "results", "latency", "visualization"];   // result sections start open
  // Every other section starts collapsed; its heading toggles it. Without JavaScript all sections stay open.
  function setOpen(h, open) {
    var sec = h.parentNode, body = sec.querySelector(".sec-body");
    body.hidden = !open; sec.classList.toggle("collapsed", !open); h.setAttribute("aria-expanded", String(open));
    if (!open) Array.prototype.forEach.call(body.querySelectorAll("video"), function (v) { if (!v.paused) v.pause(); });
  }
  Array.prototype.forEach.call(heads, function (h) {
    var body = document.createElement("div");
    body.className = "sec-body"; body.id = "sec-" + h.id;
    while (h.nextSibling) body.appendChild(h.nextSibling);
    h.parentNode.appendChild(body);
    var chev = document.createElement("span");
    chev.className = "chev"; chev.setAttribute("aria-hidden", "true"); chev.textContent = "▶";
    h.insertBefore(chev, h.firstChild);
    h.classList.add("sec-toggle"); h.setAttribute("role", "button"); h.tabIndex = 0;
    h.setAttribute("aria-controls", body.id);
    setOpen(h, OPEN.indexOf(h.id) >= 0);
    h.addEventListener("click", function () { setOpen(h, h.getAttribute("aria-expanded") !== "true"); });
    h.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); h.click(); }
    });
  });
  function openHash() {   // a TOC link or a #section URL opens its section
    var h = location.hash && document.getElementById(location.hash.slice(1));
    if (h && h.classList.contains("sec-toggle")) setOpen(h, true);
  }
  window.addEventListener("hashchange", openHash); openHash();
})();
