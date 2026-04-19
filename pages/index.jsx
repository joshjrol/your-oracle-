import { useState, useRef, useEffect } from 'react';

const figures = [
  { id: 'marcus', name: 'Marcus Aurelius', title: 'Emperor of Rome', color: '#C9A84C' },
  { id: 'achilles', name: 'Achilles', title: 'Hero of the Iliad', color: '#CC3333' },
  { id: 'churchill', name: 'Winston Churchill', title: 'Prime Minister of Britain', color: '#4477AA' },
  { id: 'socrates', name: 'Socrates', title: 'Father of Philosophy', color: '#E07B39' },
  { id: 'mao', name: 'Chairman Mao', title: 'Chairman of China', color: '#CC0000' },
  { id: 'napoleon', name: 'Napoleon Bonaparte', title: 'Emperor of France', color: '#003399' },
  { id: 'teresa', name: 'Mother Teresa', title: 'Saint of Calcutta', color: '#FFFFFF' },
  { id: 'partridge', name: 'Alan Partridge', title: 'Presenter, DJ, Author', color: '#FFD700' },
];

const quotes = {
  marcus: [
    "You have power over your mind, not outside events. Realize this, and you will find strength.",
    "The happiness of your life depends upon the quality of your thoughts.",
    "Never let the future disturb you. You will meet it with the same weapons of reason which today arm you against the present.",
    "It is not death that a man should fear, but he should fear never beginning to live.",
    "The first rule is to keep an untroubled spirit. The second is to look things in the face and know them for what they are.",
  ],
  churchill: [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "If you're going through hell, keep going.",
    "To improve is to change; to be perfect is to change often.",
    "The price of greatness is responsibility.",
    "I never worry about action, but only about inaction.",
  ],
  socrates: [
    "The unexamined life is not worth living.",
    "There is only one good, knowledge, and one evil, ignorance.",
    "The hour of departure has arrived, and we go our ways — I to die, and you to live. Which is better, God only knows.",
    "I know that I know nothing.",
    "Be as you wish to seem.",
  ],
  mao: [
    "Political power grows out of the barrel of a gun.",
    "A revolution is not a dinner party.",
    "Let a hundred flowers bloom, let a hundred schools of thought contend.",
    "The guerrilla must move amongst the people as a fish swims in the sea.",
    "We think too small, like the frog at the bottom of the well. If he surfaced, he would have an entirely different view.",
  ],
  napoleon: [
    "Never interrupt your enemy when he is making a mistake.",
    "Victory belongs to the most persevering.",
    "Impossible is a word to be found only in the dictionary of fools.",
    "Take time to deliberate, but when the time for action has arrived, stop thinking and go in.",
    "A leader is a dealer in hope.",
  ],
  teresa: [
    "Not all of us can do great things. But we can do small things with great love.",
    "If you judge people, you have no time to love them.",
    "The biggest disease today is not leprosy or tuberculosis, but rather the feeling of being unwanted.",
    "We ourselves feel that what we are doing is just a drop in the ocean. But if that drop were not there, the ocean would be missing something.",
    "It is not how much we do, but how much love we put into what we do.",
  ],
  achilles: [
    "I would rather die in battle than live without glory.",
  ],
  partridge: [
    "Jurassic Park. Surely the most thrilling 25 minutes in cinema history... and then it does go on a bit.",
    "Smell my cheese. You mother.",
    "Cash back!",
    "I'm having an affair with a woman called Lynn. She works for me. She's Lynn with an E. Which for a man in my position is the worst possible Lynn.",
    "A-ha!",
  ],
};

export default function OracleOfAges() {
  const [step, setStep] = useState(1);
  const [dilemma, setDilemma] = useState('');
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #0a0806; color: #e8dcc8; font-family: 'Crimson Text', serif; min-height: 100vh; }
      .grain { position: fixed; inset: 0; pointer-events: none; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); }
      .container { max-width: 720px; margin: 0 auto; padding: 2rem 1.5rem; }
      h1 { font-family: 'Cinzel', serif; font-size: 2.4rem; color: #C9A84C; text-align: center; letter-spacing: 0.05em; }
      .tagline { text-align: center; color: #a09070; font-style: italic; margin-bottom: 2.5rem; font-size: 1.1rem; }
      .steps { display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 2.5rem; }
      .dot { width: 10px; height: 10px; border-radius: 50%; background: #3a3020; transition: background 0.3s; }
      .dot.active { background: #C9A84C; }
      .card { background: #13110e; border: 1px solid #2a2418; border-radius: 12px; padding: 2rem; margin-bottom: 1.5rem; }
      label { font-family: 'Cinzel', serif; font-size: 0.85rem; color: #C9A84C; letter-spacing: 0.1em; display: block; margin-bottom: 0.75rem; }
      textarea { width: 100%; background: #0a0806; border: 1px solid #2a2418; border-radius: 8px; color: #e8dcc8; font-family: 'Crimson Text', serif; font-size: 1.1rem; padding: 1rem; resize: vertical; min-height: 120px; outline: none; transition: border-color 0.2s; }
      textarea:focus { border-color: #C9A84C; }
      .voice-btn { margin-top: 0.75rem; background: none; border: 1px solid #2a2418; border-radius: 8px; color: #a09070; padding: 0.5rem 1rem; cursor: pointer; font-family: 'Crimson Text', serif; font-size: 1rem; transition: all 0.2s; }
      .voice-btn:hover { border-color: #C9A84C; color: #C9A84C; }
      .voice-btn.active { border-color: #CC3333; color: #CC3333; }
      .figures-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
      .figure-card { background: #0a0806; border: 1px solid #2a2418; border-radius: 8px; padding: 0.85rem 1rem; cursor: pointer; transition: all 0.2s; }
      .figure-card:hover { border-color: #C9A84C44; }
      .figure-card.selected { border-color: var(--fig-color); background: #13110e; }
      .figure-name { font-family: 'Cinzel', serif; font-size: 0.9rem; color: #e8dcc8; }
      .figure-title { font-size: 0.8rem; color: #706050; margin-top: 0.2rem; }
      .btn { width: 100%; padding: 0.9rem; background: #C9A84C; color: #0a0806; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 600; cursor: pointer; letter-spacing: 0.05em; transition: opacity 0.2s; margin-top: 1rem; }
      .btn:hover { opacity: 0.9; }
      .btn:disabled { opacity: 0.4; cursor: not-allowed; }
      .btn-secondary { background: none; border: 1px solid #2a2418; color: #a09070; }
      .btn-secondary:hover { border-color: #C9A84C; color: #C9A84C; opacity: 1; }
      .pros-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
      .pros h3 { color: #4CAF50; font-family: 'Cinzel', serif; font-size: 0.85rem; margin-bottom: 0.75rem; }
      .cons h3 { color: #CC3333; font-family: 'Cinzel', serif; font-size: 0.85rem; margin-bottom: 0.75rem; }
      .pros li, .cons li { font-size: 0.95rem; margin-bottom: 0.4rem; list-style: none; padding-left: 1rem; position: relative; }
      .pros li::before { content: '+'; position: absolute; left: 0; color: #4CAF50; }
      .cons li::before { content: '−'; position: absolute; left: 0; color: #CC3333; }
      .verdict-card { border-left: 3px solid var(--fig-color); padding: 1rem 1.25rem; margin-bottom: 1rem; background: #0a0806; border-radius: 0 8px 8px 0; }
      .verdict-name { font-family: 'Cinzel', serif; font-size: 0.85rem; margin-bottom: 0.5rem; }
      .verdict-quote { font-size: 0.85rem; color: #a09070; font-style: italic; margin-bottom: 0.6rem; border-left: 2px solid #2a2418; padding-left: 0.75rem; }
      .verdict-text { font-size: 1.05rem; line-height: 1.65; font-style: italic; }
      .loading { text-align: center; padding: 3rem; color: #a09070; font-style: italic; }
      .limit-note { text-align: center; font-size: 0.85rem; color: #706050; margin-top: 0.5rem; }
      @media (max-width: 480px) { h1 { font-size: 1.8rem; } .pros-cons { grid-template-columns: 1fr; } .figures-grid { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleFigure = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Voice not supported in this browser. Try Chrome.');
    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.onresult = (e) => setDilemma(e.results[0][0].transcript);
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const getVerdict = async () => {
    setLoading(true);
    setStep(3);
    const chosenFigures = figures.filter(f => selected.includes(f.id));

    const figureInstructions = chosenFigures.map(f => {
      const figQuotes = quotes[f.id];
      const quotesText = figQuotes.length > 1
        ? `Choose the most relevant of these verified quotes to weave naturally into your verdict:\n${figQuotes.map((q, i) => `  ${i + 1}. "${q}"`).join('\n')}`
        : `Use this quote naturally in your verdict: "${figQuotes[0]}"`;

      const personas = {
        marcus: `Respond as Marcus Aurelius — stoic, duty-bound, measured. Reference virtue and reason. ${quotesText}`,
        achilles: `Respond as Achilles — passionate, glory-driven, fiery. Speak of honour and legacy. ${quotesText}`,
        churchill: `Respond as Winston Churchill — defiant, witty, bulldog resolve. Use powerful rhetoric. ${quotesText}`,
        socrates: `Respond as Socrates — never answer directly, only ask probing questions that illuminate the dilemma. ${quotesText}`,
        mao: `Respond as Chairman Mao — ideological, revolutionary, collective-minded. Frame everything as struggle and transformation. ${quotesText}`,
        napoleon: `Respond as Napoleon Bonaparte — bold, strategic, supremely self-confident. Think in terms of victory and opportunity. ${quotesText}`,
        teresa: `Respond as Mother Teresa — compassionate, humble, spiritually grounded. Focus on love, service and what truly matters. ${quotesText}`,
        partridge: `Respond as Alan Partridge — bumbling, self-important, accidentally profound. Use one of these authentic Alan Partridge quotes naturally and build a hilariously misguided verdict around it. ${quotesText}`,
      };
      return `${f.name}: ${personas[f.id]}`;
    }).join('\n\n');

    const systemPrompt = `You are the Oracle of Ages. A user brings you a dilemma. You will:
1. Provide exactly 4 pros and 4 cons as short phrases.
2. Then provide a verdict from each chosen figure. Each verdict must be 3-4 sentences long, written entirely in that figure's voice, and must naturally include one of their provided quotes. For historical figures, the quote should feel organic — not bolted on. For Alan Partridge, lean into the comedy.

${figureInstructions}

Format your response EXACTLY like this — do not add any other text or headers:
PROS:
- [pro 1]
- [pro 2]
- [pro 3]
- [pro 4]
CONS:
- [con 1]
- [con 2]
- [con 3]
- [con 4]
${chosenFigures.map(f => `VERDICT_${f.id.toUpperCase()}:\n[verdict text]`).join('\n')}`;

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt, userMessage: `The dilemma: ${dilemma}` }),
      });
      const data = await res.json();
      if (data.error) {
        setResult({ error: data.error });
      } else {
        parseResult(data.text, chosenFigures);
      }
    } catch {
      setResult({ error: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  };

  const parseResult = (text, chosenFigures) => {
    const pros = [], cons = [];
    const verdicts = {};
    const lines = text.split('\n');
    let mode = null;
    for (const line of lines) {
      const t = line.trim();
      if (t === 'PROS:') { mode = 'pros'; continue; }
      if (t === 'CONS:') { mode = 'cons'; continue; }
      const verdictMatch = chosenFigures.find(f => t === `VERDICT_${f.id.toUpperCase()}:`);
      if (verdictMatch) { mode = verdictMatch.id; verdicts[mode] = ''; continue; }
      if (mode === 'pros' && t.startsWith('- ')) pros.push(t.slice(2));
      else if (mode === 'cons' && t.startsWith('- ')) cons.push(t.slice(2));
      else if (mode && verdicts[mode] !== undefined && t) verdicts[mode] += (verdicts[mode] ? ' ' : '') + t;
    }
    setResult({ pros, cons, verdicts, figures: chosenFigures });
  };

  return (
    <div>
      <div className="grain" />
      <div className="container">
        <h1>Oracle of Ages</h1>
        <p className="tagline">Seek Counsel from the Ages</p>
        <div className="steps">
          {[1,2,3].map(n => <div key={n} className={`dot ${step >= n ? 'active' : ''}`} />)}
        </div>

        {step === 1 && (
          <div className="card">
            <label>SPEAK YOUR DILEMMA</label>
            <textarea
              value={dilemma}
              onChange={e => setDilemma(e.target.value)}
              placeholder="Describe the decision or dilemma you face..."
            />
            <button className={`voice-btn ${listening ? 'active' : ''}`} onClick={startVoice}>
              {listening ? '🔴 Listening...' : '🎙 Speak instead'}
            </button>
            <button className="btn" disabled={!dilemma.trim()} onClick={() => setStep(2)}>
              Proceed to the Council →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <label>CHOOSE YOUR COUNSEL (UP TO 3)</label>
            <div className="figures-grid">
              {figures.map(f => (
                <div
                  key={f.id}
                  className={`figure-card ${selected.includes(f.id) ? 'selected' : ''}`}
                  style={{ '--fig-color': f.color }}
                  onClick={() => toggleFigure(f.id)}
                >
                  <div className="figure-name">{f.name}</div>
                  <div className="figure-title">{f.title}</div>
                </div>
              ))}
            </div>
            <p className="limit-note">{selected.length}/3 chosen</p>
            <button className="btn" disabled={selected.length === 0} onClick={getVerdict}>
              Consult the Oracle →
            </button>
            <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
          </div>
        )}

        {step === 3 && loading && (
          <div className="card loading">
            <p>The Oracle consults the ages...</p>
          </div>
        )}

        {step === 3 && !loading && result && (
          <div>
            {result.error ? (
              <div className="card"><p>{result.error}</p></div>
            ) : (
              <>
                <div className="card">
                  <label>THE SCALES OF FATE</label>
                  <div className="pros-cons">
                    <div className="pros">
                      <h3>PATHS FORWARD</h3>
                      <ul>{result.pros.map((p,i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                    <div className="cons">
                      <h3>SHADOWS AHEAD</h3>
                      <ul>{result.cons.map((c,i) => <li key={i}>{c}</li>)}</ul>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <label>COUNSEL FROM THE AGES</label>
                  {result.figures.map(f => (
                    <div key={f.id} className="verdict-card" style={{ '--fig-color': f.color }}>
                      <div className="verdict-name" style={{ color: f.color }}>{f.name}</div>
                      <div className="verdict-text">{result.verdicts[f.id] || 'The oracle was silent.'}</div>
                    </div>
                  ))}
                </div>
                <button className="btn" onClick={() => { setStep(1); setDilemma(''); setSelected([]); setResult(null); }}>
                  Seek New Counsel
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
