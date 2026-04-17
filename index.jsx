import { useState, useRef, useEffect } from "react";

const FIGURES = [
  {
    id: "aurelius",
    name: "Marcus Aurelius",
    title: "Emperor of Rome",
    emoji: "⚜️",
    color: "#C9A84C",
    prompt: `You are Marcus Aurelius, Roman Emperor and Stoic philosopher. Speak in first person as Marcus Aurelius giving a verdict on a dilemma. Be stoic, inward, duty-focused. Reference the Meditations, virtue, the logos, what is within our control. Be measured, wise, slightly melancholic. 2-3 sentences max. Start with a short stoic observation.`,
  },
  {
    id: "achilles",
    name: "Achilles",
    title: "Hero of the Iliad",
    emoji: "⚔️",
    color: "#C0392B",
    prompt: `You are Achilles, greatest warrior of the Greeks, hero of Troy. Speak with passion, pride, and glory. You care about honour, legacy, and whether this decision will be remembered. You are impulsive but brilliant. Reference glory, kleos (eternal fame), what will be sung of in ages to come. Be dramatic and fiery. 2-3 sentences max.`,
  },
  {
    id: "churchill",
    name: "Winston Churchill",
    title: "Prime Minister of Britain",
    emoji: "🎩",
    color: "#2E86AB",
    prompt: `You are Winston Churchill, British Prime Minister. Be defiant, witty, bulldog-resolute. Use rhetorical flair, humour, and gravitas. Reference resilience, the long game, British resolve. You may be sardonic. 2-3 sentences max. Possibly include a quip or sharp turn of phrase.`,
  },
  {
    id: "odysseus",
    name: "Odysseus",
    title: "King of Ithaca",
    emoji: "🌊",
    color: "#1ABC9C",
    prompt: `You are Odysseus, cunning king of Ithaca, hero of ten thousand tricks. You always look for the clever angle, the hidden path, the strategic play others miss. Think long-game. Be wry and intelligent. Reference craft, cunning, patience. 2-3 sentences max.`,
  },
  {
    id: "athena",
    name: "Athena",
    title: "Goddess of Wisdom",
    emoji: "🦉",
    color: "#8E44AD",
    prompt: `You are Athena, goddess of wisdom and strategic warfare. Be clear-eyed, authoritative, no-nonsense. You see the full picture. Cut through emotion to the strategic truth. Be slightly cool and divine in tone. 2-3 sentences max.`,
  },
  {
    id: "socrates",
    name: "Socrates",
    title: "Father of Philosophy",
    emoji: "🏺",
    color: "#E67E22",
    prompt: `You are Socrates. You never give a straight answer. Instead, answer the dilemma with penetrating questions that expose the assumptions behind it. Be playfully maddening. End with something that makes the person question whether they even understood their own dilemma. 2-3 sentences of questions max.`,
  },
  {
    id: "leonidas",
    name: "Leonidas",
    title: "King of Sparta",
    emoji: "🛡️",
    color: "#E74C3C",
    prompt: `You are Leonidas, King of Sparta, commander at Thermopylae. Be brutally simple, blunt, and honourable. You value sacrifice, duty, and courage above all else. Short. Hard. No wasted words. A Spartan verdict. 1-2 sentences max.`,
  },
  {
    id: "cassandra",
    name: "Cassandra",
    title: "Prophetess of Troy",
    emoji: "🔮",
    color: "#6C3483",
    prompt: `You are Cassandra of Troy, cursed to see the future but never be believed. Give your verdict with tragic foresight — you can see how this ends and it is not good. Be darkly poetic and slightly resigned. You may be playfully ominous. 2-3 sentences max.`,
  },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0806;
    font-family: 'Crimson Text', Georgia, serif;
    color: #e8dcc8;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at 50% 0%, #1a1208 0%, #0a0806 60%);
    position: relative;
    overflow: hidden;
  }

  .app::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(201,168,76,0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .grain {
    position: fixed;
    inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 100;
  }

  .container {
    max-width: 780px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header { text-align: center; margin-bottom: 56px; }

  .header-ornament {
    color: #C9A84C;
    font-size: 11px;
    letter-spacing: 6px;
    text-transform: uppercase;
    opacity: 0.7;
    margin-bottom: 20px;
    font-family: 'Cinzel', serif;
  }

  .header h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(32px, 6vw, 52px);
    font-weight: 700;
    color: #C9A84C;
    letter-spacing: 3px;
    line-height: 1.1;
    text-shadow: 0 0 60px rgba(201,168,76,0.3);
    margin-bottom: 16px;
  }

  .header-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: center;
    margin: 20px 0;
  }

  .divider-line {
    height: 1px;
    width: 80px;
    background: linear-gradient(90deg, transparent, #C9A84C55, transparent);
  }

  .divider-diamond {
    width: 6px; height: 6px;
    background: #C9A84C;
    transform: rotate(45deg);
    opacity: 0.7;
  }

  .header p {
    font-size: 18px;
    color: #b8a882;
    font-style: italic;
    line-height: 1.6;
  }

  .steps {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 48px;
  }

  .step-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #2a2218;
    border: 1px solid #3a3020;
    transition: all 0.4s ease;
  }

  .step-dot.active {
    background: #C9A84C;
    border-color: #C9A84C;
    box-shadow: 0 0 12px rgba(201,168,76,0.5);
  }

  .step-dot.done { background: #7a6830; border-color: #7a6830; }

  .card {
    background: linear-gradient(135deg, #12100a 0%, #0e0c08 100%);
    border: 1px solid #2a2218;
    border-radius: 2px;
    padding: 40px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #C9A84C44, transparent);
  }

  .card-title {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #C9A84C;
    opacity: 0.8;
    margin-bottom: 24px;
  }

  .dilemma-area {
    width: 100%;
    background: #080604;
    border: 1px solid #2a2218;
    border-radius: 1px;
    color: #e8dcc8;
    font-family: 'Crimson Text', Georgia, serif;
    font-size: 19px;
    line-height: 1.7;
    padding: 20px 24px;
    resize: none;
    min-height: 140px;
    transition: border-color 0.3s;
    outline: none;
  }

  .dilemma-area:focus { border-color: #C9A84C55; }
  .dilemma-area::placeholder { color: #3a3020; font-style: italic; }

  .voice-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
  }

  .voice-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    border: 1px solid #2a2218;
    color: #b8a882;
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 1px;
  }

  .voice-btn:hover { border-color: #C9A84C55; color: #C9A84C; }

  .voice-btn.recording {
    border-color: #C0392B;
    color: #C0392B;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(192,57,43,0.3); }
    50% { box-shadow: 0 0 0 8px rgba(192,57,43,0); }
  }

  .char-count { font-size: 13px; color: #3a3020; margin-left: auto; }

  .figures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
    margin-top: 8px;
  }

  .figure-card {
    background: #080604;
    border: 1px solid #2a2218;
    border-radius: 1px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.25s;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .figure-card:hover { border-color: #3a3020; transform: translateY(-1px); }

  .figure-card.selected {
    border-color: var(--fig-color);
    background: color-mix(in srgb, var(--fig-color) 6%, #080604);
  }

  .figure-card.selected::before {
    content: '✓';
    position: absolute;
    top: 8px; right: 10px;
    font-size: 11px;
    color: var(--fig-color);
    font-family: 'Cinzel', serif;
  }

  .figure-emoji { font-size: 26px; margin-bottom: 8px; display: block; }

  .figure-name {
    font-family: 'Cinzel', serif;
    font-size: 12px;
    color: #e8dcc8;
    letter-spacing: 0.5px;
    margin-bottom: 3px;
  }

  .figure-title { font-size: 11px; color: #5a4e35; font-style: italic; }

  .selection-hint {
    font-size: 13px;
    color: #5a4e35;
    margin-top: 16px;
    font-style: italic;
    text-align: center;
  }

  .primary-btn {
    width: 100%;
    background: linear-gradient(135deg, #1a1508 0%, #120f06 100%);
    border: 1px solid #C9A84C55;
    color: #C9A84C;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    letter-spacing: 5px;
    text-transform: uppercase;
    padding: 18px 32px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 1px;
    margin-top: 8px;
  }

  .primary-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #221c0a 0%, #1a1508 100%);
    border-color: #C9A84C88;
    box-shadow: 0 0 30px rgba(201,168,76,0.1);
  }

  .primary-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 8px;
  }

  @media (max-width: 560px) { .pros-cons { grid-template-columns: 1fr; } }

  .pro-con-col h3 {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #2a2218;
  }

  .pro-con-col.pros h3 { color: #27AE60; }
  .pro-con-col.cons h3 { color: #C0392B; }

  .pro-con-item {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 1.5;
    color: #c8bca0;
    animation: fadeUp 0.4s ease both;
  }

  .pro-con-item .bullet { flex-shrink: 0; margin-top: 3px; font-size: 10px; }
  .pros .bullet { color: #27AE60; }
  .cons .bullet { color: #C0392B; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .verdict-card {
    background: #080604;
    border: 1px solid #2a2218;
    border-radius: 1px;
    padding: 28px 32px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
  }

  .verdict-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: var(--fig-color);
    opacity: 0.6;
  }

  .verdict-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
  }

  .verdict-emoji { font-size: 28px; flex-shrink: 0; }

  .verdict-name {
    font-family: 'Cinzel', serif;
    font-size: 14px;
    color: var(--fig-color);
    letter-spacing: 1px;
  }

  .verdict-title { font-size: 13px; color: #5a4e35; font-style: italic; }
  .verdict-text { font-size: 18px; line-height: 1.75; color: #c8bca0; font-style: italic; }

  .dilemma-summary {
    font-size: 15px;
    color: #5a4e35;
    font-style: italic;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid #1a1610;
    line-height: 1.6;
  }

  .dilemma-summary span { color: #7a6830; }

  .restart-btn {
    background: transparent;
    border: 1px solid #2a2218;
    color: #5a4e35;
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    padding: 14px 28px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 1px;
    display: block;
    margin: 32px auto 0;
  }

  .restart-btn:hover { border-color: #3a3020; color: #b8a882; }

  .error-msg {
    color: #C0392B;
    font-size: 14px;
    margin-top: 12px;
    font-style: italic;
  }
`;

async function callOracle(systemPrompt, userMessage) {
  const response = await fetch("/api/oracle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, userMessage }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error || "Oracle unreachable");
  }
  const data = await response.json();
  return data.text || "The oracle is silent.";
}

async function getProsConsAndVerdicts(dilemma, selectedFigures) {
  const prosConsPrompt = `You are an analytical advisor. Given a dilemma, produce a balanced pros and cons list.
Respond ONLY with valid JSON in exactly this format, no markdown, no preamble:
{"pros": ["pro1", "pro2", "pro3", "pro4"], "cons": ["con1", "con2", "con3", "con4"]}
Keep each item concise — one sentence max.`;

  const prosConsRaw = await callOracle(prosConsPrompt, `My dilemma: ${dilemma}`);

  let prosConsData = { pros: [], cons: [] };
  try {
    const clean = prosConsRaw.replace(/```json|```/g, "").trim();
    prosConsData = JSON.parse(clean);
  } catch {
    prosConsData = {
      pros: ["Consider the potential benefits carefully"],
      cons: ["Weigh the risks seriously before deciding"],
    };
  }

  const verdictPromises = selectedFigures.map(async (fig) => {
    const text = await callOracle(fig.prompt, `The dilemma presented to you: "${dilemma}"`);
    return { ...fig, verdict: text };
  });

  const verdicts = await Promise.all(verdictPromises);
  return { prosConsData, verdicts };
}

export default function OracleOfAges() {
  const [step, setStep] = useState(0);
  const [dilemma, setDilemma] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleFigure = (fig) => {
    setSelected((prev) => {
      const exists = prev.find((f) => f.id === fig.id);
      if (exists) return prev.filter((f) => f.id !== fig.id);
      if (prev.length >= 3) return prev;
      return [...prev, fig];
    });
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Voice input not supported in this browser. Please type your dilemma.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setDilemma((prev) => (prev ? prev + " " + transcript : transcript));
      setRecording(false);
    };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  };

  const stopVoice = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const { prosConsData, verdicts } = await getProsConsAndVerdicts(dilemma, selected);
      setResults({ prosConsData, verdicts, dilemma });
      setStep(2);
    } catch (e) {
      setError(`The oracle could not be reached: ${e.message}. Please try again.`);
    }
    setLoading(false);
  };

  const restart = () => {
    setStep(0);
    setDilemma("");
    setSelected([]);
    setResults(null);
    setError("");
  };

  return (
    <div className="app">
      <div className="grain" />
      <div className="container">
        <div className="header">
          <div className="header-ornament">∴ Seek Counsel from the Ages ∴</div>
          <h1>ORACLE<br />OF AGES</h1>
          <div className="header-divider">
            <div className="divider-line" />
            <div className="divider-diamond" />
            <div className="divider-line" />
          </div>
          <p>Speak your dilemma. Let history's greatest minds<br />illuminate the path before you.</p>
        </div>

        <div className="steps">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`step-dot ${step === s ? "active" : step > s ? "done" : ""}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="card">
            <div className="card-title">∴ State Your Dilemma</div>
            <textarea
              className="dilemma-area"
              placeholder="Speak plainly. The oracle requires honesty above all else..."
              value={dilemma}
              onChange={(e) => setDilemma(e.target.value)}
              rows={5}
            />
            <div className="voice-row">
              <button
                className={`voice-btn ${recording ? "recording" : ""}`}
                onClick={recording ? stopVoice : startVoice}
              >
                <span>{recording ? "⏹" : "🎙"}</span>
                {recording ? "Stop" : "Speak"}
              </button>
              <span className="char-count">{dilemma.length} chars</span>
            </div>
            {error && <div className="error-msg">{error}</div>}
            <button
              className="primary-btn"
              disabled={dilemma.trim().length < 10}
              onClick={() => { setError(""); setStep(1); }}
              style={{ marginTop: 24 }}
            >
              Proceed to the Council →
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="card">
            <div className="card-title">∴ Choose Your Council</div>
            <div className="figures-grid">
              {FIGURES.map((fig) => {
                const isSel = selected.find((f) => f.id === fig.id);
                return (
                  <div
                    key={fig.id}
                    className={`figure-card ${isSel ? "selected" : ""}`}
                    style={{ "--fig-color": fig.color }}
                    onClick={() => toggleFigure(fig)}
                  >
                    <span className="figure-emoji">{fig.emoji}</span>
                    <div className="figure-name">{fig.name}</div>
                    <div className="figure-title">{fig.title}</div>
                  </div>
                );
              })}
            </div>
            <div className="selection-hint">
              {selected.length === 0 && "Choose up to 3 advisors"}
              {selected.length === 1 && `${selected[0].name} awaits 2 more`}
              {selected.length === 2 && `${selected.map((f) => f.name).join(" & ")} — choose one more, or proceed`}
              {selected.length === 3 && `Council assembled: ${selected.map((f) => f.name).join(", ")}`}
            </div>
            {error && <div className="error-msg">{error}</div>}
            <button
              className="primary-btn"
              disabled={selected.length === 0 || loading}
              onClick={handleSubmit}
              style={{ marginTop: 24 }}
            >
              {loading ? "Consulting the Oracle..." : "Summon the Council →"}
            </button>
          </div>
        )}

        {step === 2 && results && (
          <>
            <div className="card">
              <div className="card-title">∴ The Matter at Hand</div>
              <div className="dilemma-summary">
                <span>"</span>{results.dilemma}<span>"</span>
              </div>
              <div className="card-title">∴ The Balance of Counsel</div>
              <div className="pros-cons">
                <div className="pro-con-col pros">
                  <h3>In Favour</h3>
                  {results.prosConsData.pros.map((p, i) => (
                    <div key={i} className="pro-con-item" style={{ animationDelay: `${i * 0.1}s` }}>
                      <span className="bullet">▲</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="pro-con-col cons">
                  <h3>Against</h3>
                  {results.prosConsData.cons.map((c, i) => (
                    <div key={i} className="pro-con-item" style={{ animationDelay: `${i * 0.1}s` }}>
                      <span className="bullet">▼</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">∴ The Verdicts of Your Council</div>
              {results.verdicts.map((fig, i) => (
                <div
                  key={fig.id}
                  className="verdict-card"
                  style={{ "--fig-color": fig.color, animationDelay: `${i * 0.15}s` }}
                >
                  <div className="verdict-header">
                    <span className="verdict-emoji">{fig.emoji}</span>
                    <div>
                      <div className="verdict-name">{fig.name}</div>
                      <div className="verdict-title">{fig.title}</div>
                    </div>
                  </div>
                  <div className="verdict-text">"{fig.verdict}"</div>
                </div>
              ))}
            </div>

            <button className="restart-btn" onClick={restart}>
              ∴ Seek New Counsel ∴
            </button>
          </>
        )}
      </div>
    </div>
  );
}
