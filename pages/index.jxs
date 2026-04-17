import { useState, useRef, useEffect } from 'react';

const figures = [
  { id: 'marcus', name: 'Marcus Aurelius', title: 'Emperor of Rome', color: '#C9A84C' },
  { id: 'achilles', name: 'Achilles', title: 'Hero of the Iliad', color: '#CC3333' },
  { id: 'churchill', name: 'Winston Churchill', title: 'Prime Minister of Britain', color: '#4477AA' },
  { id: 'odysseus', name: 'Odysseus', title: 'King of Ithaca', color: '#2A9D8F' },
  { id: 'athena', name: 'Athena', title: 'Goddess of Wisdom', color: '#7B5EA7' },
  { id: 'socrates', name: 'Socrates', title: 'Father of Philosophy', color: '#E07B39' },
  { id: 'leonidas', name: 'Leonidas', title: 'King of Sparta', color: '#AA2222' },
  { id: 'cassandra', name: 'Cassandra', title: 'Prophetess of Troy', color: '#4A2060' },
];

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
      const personas = {
        marcus: 'Respond as Marcus Aurelius — stoic, duty-bound, measured. Reference virtue and reason.',
        achilles: 'Respond as Achilles — passionate, glory-driven, fiery. Speak of honour and legacy.',
        churchill: 'Respond as Winston Churchill — defiant, witty, bulldog resolve. Use powerful rhetoric.',
        odysseus: 'Respond as Odysseus — cunning, long-game thinker, wry. Think of strategy and patience.',
        athena: 'Respond as Athena — clear-eyed, strategic, authoritative. Cut to the heart of the matter.',
        socrates: 'Respond as Socrates — never answer directly, only ask probing questions that illuminate.',
        leonidas: 'Respond as Leonidas — brutally blunt, one or two sentences maximum. No elaboration.',
        cassandra: 'Respond as Cassandra — darkly prophetic, doom-tinged. Warn of what others refuse to see.',
      };
      return `${f.name}: ${personas[f.id]}`;
    }).join('\n');

    const systemPrompt = `You are the Oracle of Ages. A user brings you a dilemma. You will:
1. Provide exactly 4 pros and 4 cons as short phrases.
2. Then provide a verdict from each of these figures in their distinct voice:
${figureInstructions}

Format your response EXACTLY like this:
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
      parseResult(data.text, chosenFigures);
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
