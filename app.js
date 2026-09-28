const lessons = [
  {
    words: [
      ["model", "/ˈmɑːdəl/", "模型", "This model can summarize long documents.", "重音在第一个音节：MAH-dl"],
      ["prompt", "/prɑːmpt/", "提示词；指令", "Write a clear prompt for the assistant.", "末尾 /pt/ 要收紧，不要读成 promp-te"],
      ["token", "/ˈtoʊkən/", "词元；模型处理文本的单位", "A long prompt uses more tokens.", "第一音节像 toe，重音在前"],
      ["context", "/ˈkɑːntekst/", "上下文", "The model needs enough context.", "CON-text，重音在前"],
      ["generate", "/ˈdʒenəreɪt/", "生成", "The system generates a useful answer.", "GEN-er-ate，开头是 /dʒ/"],
    ],
    sentence: "The model uses the prompt and context to generate an answer.",
    translation: "模型利用提示词和上下文生成答案。"
  },
  {
    words: [
      ["embedding", "/ɪmˈbedɪŋ/", "嵌入向量", "We store each document as an embedding.", "重音在 BED，不是开头"],
      ["retrieve", "/rɪˈtriːv/", "检索；取回", "The app retrieves relevant passages.", "重音在 tree，长音 /iː/"],
      ["vector", "/ˈvektər/", "向量", "The database stores vectors.", "VEC-tor，重音在前"],
      ["relevant", "/ˈreləvənt/", "相关的", "Return only relevant results.", "REL-uh-vuhnt，不读 re-LAY"],
      ["query", "/ˈkwɪri/", "查询；问题", "The user sends a query.", "美式常读 KWEER-ee"],
    ],
    sentence: "The system retrieves relevant documents for the user's query.",
    translation: "系统针对用户查询检索相关文档。"
  },
  {
    words: [
      ["agent", "/ˈeɪdʒənt/", "智能体", "The agent can call external tools.", "A-gent，开头 /eɪ/"],
      ["workflow", "/ˈwɜːrkfloʊ/", "工作流", "This workflow has three steps.", "WORK-flow，重音在前"],
      ["function", "/ˈfʌŋkʃən/", "函数；功能", "The model selects the right function.", "中间是 /ŋkʃ/，不是 fan-shen"],
      ["response", "/rɪˈspɑːns/", "响应；回答", "Return a structured response.", "重音在 SPONSE"],
      ["execute", "/ˈeksɪkjuːt/", "执行", "The server executes the task.", "EX-ih-cute，重音在前"],
    ],
    sentence: "The agent selects a tool and executes the next step.",
    translation: "智能体选择工具并执行下一步。"
  },
  {
    words: [
      ["endpoint", "/ˈendpɔɪnt/", "API 端点", "Send the request to this endpoint.", "END-point，两个词连读"],
      ["request", "/rɪˈkwest/", "请求", "The client sends an HTTP request.", "名词和动词都重读第二音节"],
      ["parameter", "/pəˈræmɪtər/", "参数", "This parameter is optional.", "重音在 RAM"],
      ["validate", "/ˈvælɪdeɪt/", "验证", "Validate the input before processing.", "VAL-ih-date，重音在前"],
      ["latency", "/ˈleɪtənsi/", "延迟", "Caching can reduce latency.", "LAY-tuhn-see"],
    ],
    sentence: "The API validates each request before returning a response.",
    translation: "API 在返回响应前验证每个请求。"
  }
];

let state;
try { state = JSON.parse(localStorage.getItem("aiEnglishState") || "{}"); }
catch { state = {}; }
if (!state || typeof state !== "object") state = {};
state.day = Number.isInteger(state.day) && state.day >= 1 && state.day <= lessons.length ? state.day : 1;
state.completed = Array.isArray(state.completed) ? state.completed.filter(n => Number.isInteger(n) && n >= 1 && n <= lessons.length) : [];
state.quizCorrect ??= 0; state.quizTotal ??= 0;
let rate = .72, mediaRecorder, chunks = [], recordingUrl;
const lesson = () => lessons[(state.day - 1) % lessons.length];
const $ = s => document.querySelector(s);
const save = () => localStorage.setItem("aiEnglishState", JSON.stringify(state));

function speak(text, chosenRate = rate) {
  if (!("speechSynthesis" in window)) { toast("此浏览器不支持语音播放"); return; }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; utterance.rate = chosenRate;
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(v => v.lang === "en-US" && /Samantha|Ava|Google US English/i.test(v.name)) || voices.find(v => v.lang === "en-US") || null;
  speechSynthesis.speak(utterance);
}

function render() {
  const current = lesson();
  $("#dayNumber").textContent = state.day;
  $("#wordDeck").innerHTML = current.words.map((w, i) => `
    <article class="word-card">
      <div class="word-top"><div><h3 class="word">${w[0]}</h3><p class="ipa">${w[1]}</p></div><button class="speak-btn" data-word="${w[0]}" aria-label="播放 ${w[0]}">▶</button></div>
      <p class="meaning">${w[2]}</p><p class="example">${w[3]}</p><div class="pron-note">${w[4]}</div>
    </article>`).join("");
  $("#practiceSentence").textContent = current.sentence;
  $("#practiceTranslation").textContent = current.translation;
  const done = state.completed.includes(state.day) ? 5 : 0;
  $("#progressText").textContent = `${done} / 5`;
  $("#progressBar").style.width = `${done * 20}%`;
  $("#learnedCount").textContent = state.completed.length * 5;
  $("#streakCount").textContent = state.completed.length;
  $("#quizAccuracy").textContent = state.quizTotal ? `${Math.round(state.quizCorrect/state.quizTotal*100)}%` : "—";
  renderQuiz();
}

function renderQuiz() {
  const words = lesson().words;
  const answer = words[Math.floor(Math.random()*words.length)];
  const options = [answer, ...words.filter(w => w !== answer).sort(() => Math.random()-.5).slice(0,2)].sort(() => Math.random()-.5);
  $("#quizCard").innerHTML = `<p class="question">请选择正确含义</p><h3 class="quiz-word">${answer[0]}</h3><div class="choices">${options.map(w => `<button class="choice" data-correct="${w===answer}">${w[2]}</button>`).join("")}</div>`;
  document.querySelectorAll(".choice").forEach(btn => btn.onclick = () => {
    if (document.querySelector(".choice.correct,.choice.wrong")) return;
    const correct = btn.dataset.correct === "true";
    btn.classList.add(correct ? "correct" : "wrong");
    document.querySelector('.choice[data-correct="true"]').classList.add("correct");
    state.quizTotal++; if (correct) state.quizCorrect++; save();
    toast(correct ? "答对了，很稳。" : "记住后再听一次发音。");
    setTimeout(() => { renderQuiz(); renderStats(); }, 1100);
  });
}
function renderStats(){ $("#quizAccuracy").textContent = state.quizTotal ? `${Math.round(state.quizCorrect/state.quizTotal*100)}%` : "—"; }
function toast(msg){ const el=$("#toast"); el.textContent=msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),1800); }
function similarity(a,b){ const aw=a.toLowerCase().replace(/[^a-z ]/g,"").split(/\s+/), bw=b.toLowerCase().replace(/[^a-z ]/g,"").split(/\s+/); return Math.round(aw.filter(x=>bw.includes(x)).length/Math.max(aw.length,1)*100); }

document.querySelectorAll(".tab").forEach(t => t.onclick = () => {
  document.querySelectorAll(".tab,.view").forEach(x=>x.classList.remove("active")); t.classList.add("active"); $("#"+t.dataset.view).classList.add("active");
});
document.addEventListener("click", e => { const b=e.target.closest(".speak-btn"); if(b) speak(b.dataset.word,.65); });
$("#playAll").onclick = () => speak(lesson().words.map(w => `${w[0]}. ${w[3]}`).join(" "), .72);
$("#listenSentence").onclick = () => speak(lesson().sentence);
document.querySelectorAll(".speed").forEach(b=>b.onclick=()=>{ document.querySelectorAll(".speed").forEach(x=>x.classList.remove("active")); b.classList.add("active"); rate=Number(b.dataset.rate); });
$("#recordSentence").onclick = async () => {
  if(mediaRecorder?.state === "recording"){ mediaRecorder.stop(); return; }
  if (!navigator.mediaDevices?.getUserMedia || !("MediaRecorder" in window)) { toast("当前浏览器不支持录音，请在 Safari 中打开"); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio:true}); chunks=[]; mediaRecorder=new MediaRecorder(stream);
    mediaRecorder.ondataavailable=e=>chunks.push(e.data);
    mediaRecorder.onstop=()=>{ if (recordingUrl) URL.revokeObjectURL(recordingUrl); recordingUrl=URL.createObjectURL(new Blob(chunks,{type:mediaRecorder.mimeType})); $("#playRecording").disabled=false; $("#recordLabel").textContent="开始跟读"; stream.getTracks().forEach(t=>t.stop()); };
    mediaRecorder.start(); $("#recordLabel").textContent="停止录音"; toast("正在录音…");
  } catch { toast("请允许 Safari 使用麦克风"); }
};
$("#playRecording").onclick=()=>recordingUrl && new Audio(recordingUrl).play();
$("#recognizeSentence").onclick=()=>{
  const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!Recognition){ toast("当前 Safari 不支持语音识别，可使用录音回放"); return; }
  window.speechSynthesis?.cancel();
  const rec=new Recognition(); rec.lang="en-US"; rec.interimResults=false;
  const out=$("#speechResult"); out.hidden=false; out.textContent="正在听，请开始朗读…";
  const button=$("#recognizeSentence"); button.disabled=true;
  let settled=false;
  const timer=setTimeout(()=>{ if(!settled){ settled=true; out.textContent="等待识别超时。请检查网络与麦克风权限后重试。"; rec.abort(); } },15000);
  rec.onresult=e=>{ settled=true; const heard=e.results[0][0].transcript; const score=similarity(lesson().sentence,heard); out.textContent=`识别结果：${heard}。关键词匹配：${score}%${score>=75?" · 表达清楚！":" · 再放慢一点试试。"}`; };
  rec.onerror=()=>{ if(!settled) out.textContent="没有识别成功。请确认麦克风权限和网络后重试。"; settled=true; };
  rec.onend=()=>{ clearTimeout(timer); button.disabled=false; if(!settled && !out.textContent.includes("超时")) out.textContent="没有听到清晰的语音，请重试。"; };
  try { rec.start(); } catch { clearTimeout(timer); button.disabled=false; out.textContent="语音识别无法启动，请尝试在 Safari 中打开。"; }
};
$("#nextLesson").onclick=()=>{ if(!state.completed.includes(state.day)) state.completed.push(state.day); state.day = state.day % lessons.length + 1; save(); render(); window.scrollTo({top:0,behavior:"smooth"}); toast("本课学习已记录"); };
$("#resetProgress").onclick=()=>{ if(confirm("确定清空本机上的学习记录吗？")){ localStorage.removeItem("aiEnglishState"); location.reload(); } };
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
render();
