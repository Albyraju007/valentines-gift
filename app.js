// Target: Feb 14, 12:00 AM IST (Asia/Kolkata)
const target = new Date("2026-02-14T00:00:00+05:30");
//const target = new Date(Date.now() + 1_000);
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

// -------------------- QUIZ --------------------
const PASS_SCORE = 4; // out of 6

const quiz = [
  {
    q: "നമ്മൾ ഇതുവരെ കണ്ടുമുട്ടിയ സമയങ്ങളിൽ ഏതാണ് എനിക്ക് ഏറ്റവും ഇഷ്ടപ്പെട്ടത്?",
    choices: ["Varkala.", "Mango Meadows.", "നീ ഉണ്ടായിരുന്നതുകൊണ്ട് എല്ലാ സമയവും സന്തോഷമായിരുന്നു."],
    correct: 0,
    hint: "Hint: ഉത്തരം നീ ചിന്തിക്കുന്നതല്ല."
  },
  {
    q: "നിന്നിൽ എനിക്ക് ഏറ്റവും ഇഷ്ടപ്പെട്ടത് എന്താണ്?",
    choices: ["നിന്റെ സ്നേഹമുള്ള ഹൃദയം", "നീ ഒരിക്കലും പല്ലു തെക്കുകില്ലന്ന് ഒള്ളത്", "Shuttu ന്റെ സ്നേഹം"],
    correct: 1,
    hint: "Hint: പരമമായ സത്യം."
  },
  {
    q: "ആദ്യമായി കണ്ടപ്പോ ഞാൻ ഇട്ട ഷർട്ട് ന്റെ കളർ എന്താ?",
    choices: ["തത്ത പച്ച", "മഞ്ഞ", "കടും നീലാ"],
    correct: 2,
    hint: "Hint: ഞാൻ നിന്നോട് പറയാൻ പോകുന്നില്ല."
  },
  {
    q: "ഭാവിയിൽ എത്ര പിള്ളേർ വേണം എന്നാണ് നിനക്ക്?",
    choices: ["1", "3", "5"],
    correct: 2,
    hint: "Hint: നീ എന്ത് പറഞ്ഞാലും, എനിക്ക് ഇത്രേം വേണം.."
  },
  {
    q: "നമ്മുടെ ഇടയിൽ കോഴി ശെരിക്കും ആരാണ്?",
    choices: ["നീ", "എന്താ സംശയം നീ തന്നേ ഉറപ്പിക്കാം", "ശെരിക്കും നീ"],
    correct: 1,
    hint: "Hint: പരമമായ സത്യം."
  },
  {
    q: "അവസാന മെയിൻ ചോദ്യം: മരിക്കുന്ന വരെ എന്റെ side ലെ എന്റെ പാതി ആയി, സങ്കടത്തിലും സന്തോഷത്തിലും, പരിഭവത്തിലും, ഇണക്കത്തിലും, പിണക്കത്തിലും നീ ഇണ്ടാക്കുമോ?",
    choices: ["ഉണ്ടാകും", "ഉണ്ടാകില്ല", "എന്താടാ പൊട്ടാ നിനക്ക് സംശയം? ഞാൻ അല്ലാണ്ട് പിന്നെ ആര് കാണാൻ ആണ്"],
    correct: 2,
    hint: "Hint: confidence."
  }
];

let qi = 0;
let score = 0;
let quizStarted = false;

const quizEls = {
  quizScreen: document.getElementById("quizScreen"),
  failScreen: document.getElementById("failScreen"),
  cardScreen: document.getElementById("cardScreen"),
  qProg: document.getElementById("qProg"),
  qScore: document.getElementById("qScore"),
  qText: document.getElementById("qText"),
  qChoices: document.getElementById("qChoices"),
  qHint: document.getElementById("qHint"),
  failText: document.getElementById("failText"),
  retryBtn: document.getElementById("retryBtn"),
  replayBtn: document.getElementById("replayBtn")
};

function show(screen){
  quizEls.quizScreen.style.display = (screen === "quiz") ? "block" : "none";
  quizEls.failScreen.style.display = (screen === "fail") ? "block" : "none";
  quizEls.cardScreen.style.display = (screen === "card") ? "block" : "none";
}

function setFailMessage(){
  const msg = "ഒന്നുടെ ട്രൈ ചെയ്യൂ... കിട്ടിയില്ലേ ഒന്നുടെ പ്രാർത്ഥിച്ചിട്ട് ചെയ്ത മതി. കിട്ടുംട്ടോ";
  quizEls.failText.textContent = msg;
}

function resetQuiz(){
  qi = 0;
  score = 0;
  show("quiz");
  renderQuestion();
}

function renderQuestion(){
  quizEls.qProg.textContent = `Q ${qi + 1} / ${quiz.length}`;
  quizEls.qScore.textContent = `Score: ${score}`;
  quizEls.qText.textContent = quiz[qi].q;
  quizEls.qHint.textContent = quiz[qi].hint || "";
  quizEls.qChoices.innerHTML = "";

  quiz[qi].choices.forEach((text, idx) => {
    const b = document.createElement("button");
    b.className = "choiceBtn";
    b.textContent = text;
    b.onclick = () => answer(idx);
    quizEls.qChoices.appendChild(b);
  });
}

function answer(choiceIdx){
  if (choiceIdx === quiz[qi].correct) score++;

  qi++;
  if (qi >= quiz.length){
    if (score >= PASS_SCORE){
      show("card");
    } else {
      setFailMessage();
      show("fail");
    }
    return;
  }
  renderQuestion();
}

quizEls.retryBtn?.addEventListener("click", resetQuiz);
quizEls.replayBtn?.addEventListener("click", resetQuiz);

function startMidnightExperience(){
  if (quizStarted) return;
  quizStarted = true;

  el.reveal.style.display = "block";
  el.headline.textContent = "സമയം ഇപ്പോൾ 12 കഴിഞ്ഞു...";
  el.sub.textContent = "അപ്പോൾ നമുക്ക് തുടങ്ങാം shuttu??";

  resetQuiz();
}
// ------------------ END QUIZ ------------------

function tick(){
  const now = new Date();
  let diff = target - now;

  if (diff <= 0){
    el.d.textContent = "00";
    el.h.textContent = "00";
    el.m.textContent = "00";
    el.s.textContent = "00";
    startMidnightExperience();
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