const emoji = document.getElementById("emoji");
const emojiBox = document.getElementById("emojiBox");
const detectedWord = document.getElementById("detectedWord");
const moodText = document.getElementById("moodText");
const languageText = document.getElementById("languageText");
const speechOutput = document.getElementById("speechOutput");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let recognition;
let isListening = false;

const emojiGroups = [
  {
    emoji: "😄",
    mood: "Happy",
    color: "rgba(0, 255, 153, 0.18)",
    background: "linear-gradient(135deg, #17352f, #2d6b59)",
    words: ["mutlu", "happy", "joy", "sevincli", "sevinçli", "neseli", "neşeli"]
  },
  {
    emoji: "😢",
    mood: "Sad",
    color: "rgba(80, 160, 255, 0.20)",
    background: "linear-gradient(135deg, #1d2f4d, #3b5f94)",
    words: ["uzgun", "üzgün", "sad", "cry", "aglamak", "ağlamak", "mutsuz"]
  },
  {
    emoji: "😡",
    mood: "Angry",
    color: "rgba(255, 77, 77, 0.24)",
    background: "linear-gradient(135deg, #4a1f1f, #7b1f1f)",
    words: ["kizgin", "kızgın", "angry", "mad", "ofkeli", "öfkeli", "sinirli", "furious"]
  },
  {
    emoji: "😲",
    mood: "Surprised",
    color: "rgba(255, 160, 0, 0.22)",
    background: "linear-gradient(135deg, #4a2c16, #8a4f1d)",
    words: ["saskin", "şaşkın", "surprised", "shock", "sok", "şok", "wow", "inanilmaz", "inanılmaz"]
  },
  {
    emoji: "😨",
    mood: "Scared",
    color: "rgba(140, 180, 255, 0.22)",
    background: "linear-gradient(135deg, #233249, #425c85)",
    words: ["korkmus", "korkmuş", "korktum", "afraid", "scared", "fear", "terrified"]
  },
  {
    emoji: "😐",
    mood: "Normal",
    color: "rgba(255,255,255,0.12)",
    background: "linear-gradient(135deg, #1e1e2f, #2d4a6b)",
    words: ["normal", "okay", "ok", "tamam", "duz", "düz"]
  },
  {
    emoji: "😩",
    mood: "Tired",
    color: "rgba(190, 190, 255, 0.20)",
    background: "linear-gradient(135deg, #34314d, #58547c)",
    words: ["yorgun", "tired", "bitkin", "exhausted"]
  },
  {
    emoji: "😴",
    mood: "Sleepy",
    color: "rgba(130, 120, 255, 0.22)",
    background: "linear-gradient(135deg, #2d2850, #5448a7)",
    words: ["uykulu", "sleepy", "sleep", "uyku"]
  },
  {
    emoji: "😍",
    mood: "In Love",
    color: "rgba(255, 90, 170, 0.22)",
    background: "linear-gradient(135deg, #4d2036, #9f3f67)",
    words: ["asik", "aşık", "ask", "aşk", "love", "seviyorum"]
  },
  {
    emoji: "😊",
    mood: "Shy",
    color: "rgba(255, 190, 110, 0.22)",
    background: "linear-gradient(135deg, #4c3420, #91663e)",
    words: ["utangac", "utangaç", "shy", "mahcup"]
  },
  {
    emoji: "🤔",
    mood: "Thinking",
    color: "rgba(240, 210, 100, 0.22)",
    background: "linear-gradient(135deg, #4d4621, #7a6d23)",
    words: ["dusunceli", "düşünceli", "thinking", "think", "hmm"]
  },
  {
    emoji: "🤪",
    mood: "Crazy",
    color: "rgba(255, 120, 180, 0.22)",
    background: "linear-gradient(135deg, #4a2344, #913879)",
    words: ["cilgin", "çılgın", "crazy", "wild"]
  },
  {
    emoji: "😎",
    mood: "Cool",
    color: "rgba(0, 220, 255, 0.22)",
    background: "linear-gradient(135deg, #173949, #1d7087)",
    words: ["havali", "havalı", "cool", "awesome", "super", "süper"]
  },
  {
    emoji: "🤒",
    mood: "Sick",
    color: "rgba(130, 255, 180, 0.20)",
    background: "linear-gradient(135deg, #24453b, #3c7d6d)",
    words: ["hasta", "sick", "ill", "fever"]
  },
  {
    emoji: "😭",
    mood: "Crying",
    color: "rgba(80, 180, 255, 0.20)",
    background: "linear-gradient(135deg, #173249, #286391)",
    words: ["agliyorum", "ağlıyorum", "crying", "broken", "kirgin", "kırgın"]
  },
  {
    emoji: "😂",
    mood: "Laughing",
    color: "rgba(255, 215, 80, 0.24)",
    background: "linear-gradient(135deg, #5b4815, #a78920)",
    words: ["gulmek", "gülmek", "laugh", "funny", "komik"]
  },
  {
    emoji: "😵",
    mood: "Dizzy",
    color: "rgba(190, 190, 190, 0.22)",
    background: "linear-gradient(135deg, #3b3b45, #63636f)",
    words: ["baygin", "baygın", "dizzy", "fainted"]
  },
  {
    emoji: "🤯",
    mood: "Mind Blown",
    color: "rgba(255, 120, 80, 0.24)",
    background: "linear-gradient(135deg, #4d2318, #8b3c23)",
    words: ["patlama", "mindblown", "explosion", "boom"]
  },
  {
    emoji: "🤢",
    mood: "Disgusted",
    color: "rgba(140, 220, 100, 0.22)",
    background: "linear-gradient(135deg, #2c4921, #5d8630)",
    words: ["igrenc", "iğrenç", "disgusting", "gross"]
  },
  {
    emoji: "🤮",
    mood: "Vomiting",
    color: "rgba(120, 200, 100, 0.22)",
    background: "linear-gradient(135deg, #2d4720, #577d34)",
    words: ["kusmak", "vomit", "vomiting"]
  },
  {
    emoji: "😇",
    mood: "Angel",
    color: "rgba(255, 245, 150, 0.22)",
    background: "linear-gradient(135deg, #5a5421, #988d3a)",
    words: ["melek", "angel", "good"]
  },
  {
    emoji: "😈",
    mood: "Devil",
    color: "rgba(220, 90, 200, 0.22)",
    background: "linear-gradient(135deg, #4c2048, #8a3280)",
    words: ["seytan", "şeytan", "devil", "evil"]
  },
  {
    emoji: "🤑",
    mood: "Money",
    color: "rgba(100, 255, 140, 0.22)",
    background: "linear-gradient(135deg, #234923, #3a8a3a)",
    words: ["para", "money", "cash", "rich"]
  },
  {
    emoji: "🥰",
    mood: "Lovely",
    color: "rgba(255, 120, 180, 0.22)",
    background: "linear-gradient(135deg, #4f2237, #94446a)",
    words: ["sevgi", "love", "lovely", "sweet", "tatli", "tatlı"]
  },
  {
    emoji: "🏆",
    mood: "Successful",
    color: "rgba(255, 215, 0, 0.24)",
    background: "linear-gradient(135deg, #5a4313, #a47d13)",
    words: ["basarili", "başarılı", "success", "winner", "kazandim", "kazandım"]
  },
  {
    emoji: "👏",
    mood: "Clap",
    color: "rgba(255, 200, 120, 0.22)",
    background: "linear-gradient(135deg, #5a3412, #99631d)",
    words: ["alkis", "alkış", "clap", "bravo"]
  },
  {
    emoji: "💪",
    mood: "Strong",
    color: "rgba(120, 220, 255, 0.22)",
    background: "linear-gradient(135deg, #1e4356, #2a7896)",
    words: ["guclu", "güçlü", "strong", "powerful"]
  },
  {
    emoji: "👍",
    mood: "Approved",
    color: "rgba(90, 220, 140, 0.22)",
    background: "linear-gradient(135deg, #21492e, #368255)",
    words: ["evet", "yes", "tamam", "onay", "goodjob"]
  },
  {
    emoji: "👎",
    mood: "Rejected",
    color: "rgba(255, 120, 120, 0.22)",
    background: "linear-gradient(135deg, #4d2323, #873636)",
    words: ["hayir", "hayır", "no", "wrong", "yanlis", "yanlış"]
  }
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function triggerPulse() {
  emojiBox.classList.remove("pulse");
  void emojiBox.offsetWidth;
  emojiBox.classList.add("pulse");
}

function resetUI() {
  emoji.textContent = "😐";
  detectedWord.textContent = "-";
  moodText.textContent = "Waiting...";
  speechOutput.textContent = "No speech detected yet.";
  statusText.textContent = "Microphone is off.";
  emojiBox.style.background = "rgba(255,255,255,0.12)";
  document.body.style.background = "linear-gradient(135deg, #1e1e2f, #2d4a6b)";
}

function applyEmoji(group, matchedWord) {
  emoji.textContent = group.emoji;
  detectedWord.textContent = matchedWord;
  moodText.textContent = group.mood;
  emojiBox.style.background = group.color;
  document.body.style.background = group.background;
  triggerPulse();
}

function detectKeyword(text) {
  const normalizedText = normalizeText(text);
  const words = normalizedText.split(" ");

  for (const group of emojiGroups) {
    for (const word of group.words) {
      const normalizedWord = normalizeText(word);

      if (words.includes(normalizedWord) || normalizedText.includes(normalizedWord)) {
        applyEmoji(group, word);
        return;
      }
    }
  }

  emoji.textContent = "😐";
  detectedWord.textContent = "No matching keyword";
  moodText.textContent = "No emoji matched";
  emojiBox.style.background = "rgba(255,255,255,0.12)";
  document.body.style.background = "linear-gradient(135deg, #1e1e2f, #2d4a6b)";
}

function startRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    statusText.textContent = "Speech Recognition is not supported in this browser.";
    return;
  }

  if (isListening) {
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "tr-TR";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    isListening = true;
    statusText.textContent = "Listening...";
    languageText.textContent = "Turkish + English";
  };

  recognition.onresult = (event) => {
    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript + " ";
    }

    transcript = transcript.trim();

    if (transcript) {
      speechOutput.textContent = transcript;
      detectKeyword(transcript);
    }
  };

  recognition.onerror = (event) => {
    statusText.textContent = `Error: ${event.error}`;
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start();
    }
  };

  recognition.start();
}

function stopRecognition() {
  isListening = false;

  if (recognition) {
    recognition.onend = null;
    recognition.stop();
  }

  statusText.textContent = "Microphone is off.";
}

startBtn.addEventListener("click", startRecognition);
stopBtn.addEventListener("click", stopRecognition);
resetBtn.addEventListener("click", resetUI);