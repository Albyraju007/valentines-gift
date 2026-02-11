// Target: Feb 14, 12:00 AM IST (Asia/Kolkata)
// This uses an absolute timestamp with +05:30 offset so it works globally.
const target = new Date("2026-02-14T00:00:00+05:30");

const el = {
  d: document.getElementById("d"),
  h: document.getElementById("h"),
  m: document.getElementById("m"),
  s: document.getElementById("s"),
  targetText: document.getElementById("targetText"),
  reveal: document.getElementById("reveal"),
  headline: document.getElementById("headline"),
  sub: document.getElementById("sub")
};

el.targetText.textContent = "Target: 14 Feb 2026, 12:00 AM IST";

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  let diff = target - now;

  if (diff <= 0){
    el.d.textContent = "00";
    el.h.textContent = "00";
    el.m.textContent = "00";
    el.s.textContent = "00";

    el.reveal.style.display = "block";
    el.headline.textContent = "Happy Valentine’s Day";
    el.sub.textContent = "Unlocked.";

    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  el.d.textContent = pad(days);
  el.h.textContent = pad(hours);
  el.m.textContent = pad(mins);
  el.s.textContent = pad(secs);

  requestAnimationFrame(() => setTimeout(tick, 250));
}

tick();
