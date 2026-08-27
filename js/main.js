// ==========================================
// MATHSCAPE — LEVEL 2
// FORMULA FINDER
// ==========================================
// Topic:
// Finding the nth term of arithmetic
// and geometric sequences.
// ==========================================

export function mount(container, api) {

  // ==========================================
  // STATE
  // ==========================================
  const state = {
    mission1Done: false,
    mission2Done: false,
    mission3Done: false,
    mission4_1Done: false,
    mission4_2Done: false, 
    score: 0
  };

  // ==========================================
  // MAIN LAYOUT & CSS
  // ==========================================
  container.innerHTML = `
    <style>
      /* --- FORMULA FINDER SPECIFIC STYLES --- */
      
      /* Insight Box (Educational Notes) */
      .insight-box {
        background: rgba(32, 191, 178, 0.08);
        border-left: 4px solid var(--accent);
        padding: 16px 20px;
        border-radius: 0 var(--radius) var(--radius) 0;
        margin: 20px 0;
        font-size: 0.95rem;
      }
      .insight-box strong {
        color: var(--accent);
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
        margin-bottom: 8px;
        letter-spacing: 0.05em;
      }

      /* Formula Vault Visual */
      .formula-vault {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin: 32px 0;
        flex-wrap: wrap;
      }
      .vault-symbol {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-0);
        border: 2px solid var(--border-bright);
        border-radius: 12px;
        font-family: var(--font-mono);
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--accent-3);
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        animation: floatSymbol 3s infinite alternate;
      }
      .vault-symbol:nth-child(even) { animation-delay: 1s; color: var(--accent-2); }
      
      .vault-core {
        background: var(--text-0);
        color: var(--bg-0);
        padding: 16px 24px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 0 20px rgba(32, 191, 178, 0.4);
        border: 2px solid var(--accent);
      }
      .vault-core span { display: block; font-size: 0.75rem; letter-spacing: 0.1em; opacity: 0.8; }
      .vault-core strong { font-family: var(--font-mono); font-size: 1.2rem; }

      /* Variable Info Grid */
      .formula-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin: 24px 0;
      }
      .formula-info-card {
        background: var(--bg-1);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 20px;
        text-align: center;
        transition: transform 0.2s;
      }
      .formula-info-card:hover { transform: translateY(-4px); border-color: var(--accent); }
      .formula-symbol {
        width: 48px;
        height: 48px;
        margin: 0 auto 12px;
        background: var(--bg-0);
        border: 2px solid var(--accent);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-mono);
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--text-0);
      }

      /* Formula Display Panel */
      .formula-panel {
        background: #0f172a;
        border-radius: var(--radius);
        padding: 24px;
        margin: 24px 0;
        color: #f8fafc;
        text-align: center;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        border: 1px solid var(--accent-3);
      }
      .formula-label {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--accent);
        letter-spacing: 0.1em;
      }
      .main-formula {
        font-family: var(--font-mono);
        font-size: 2.5rem;
        font-weight: bold;
        margin: 16px 0;
        color: #fff;
        text-shadow: 0 0 15px rgba(255,255,255,0.4);
      }
      .formula-breakdown {
        display: flex;
        justify-content: center;
        gap: 24px;
        flex-wrap: wrap;
        border-top: 1px dashed rgba(255,255,255,0.2);
        padding-top: 16px;
      }
      .formula-breakdown div { display: flex; flex-direction: column; }
      .formula-breakdown strong { color: var(--accent-2); font-size: 1.2rem; font-family: var(--font-mono); }
      .formula-breakdown span { font-size: 0.8rem; opacity: 0.8; }

      /* Inputs and Workspaces */
      .formula-workspace {
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: var(--bg-1);
        padding: 20px;
        border-radius: var(--radius);
        border: 1px solid var(--border);
        margin: 20px 0;
        max-width: 300px;
      }
      .workspace-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-mono);
        font-size: 1.2rem;
        font-weight: bold;
      }
      .workspace-row input {
        width: 100px;
        padding: 8px 12px;
        font-size: 1.1rem;
        font-weight: bold;
        text-align: center;
        border: 2px solid var(--border-bright);
        border-radius: var(--radius-sm);
        outline: none;
      }
      .workspace-row input:focus { border-color: var(--accent); box-shadow: 0 0 8px var(--accent-soft); }
      .workspace-row input:disabled { background: var(--bg-0); opacity: 0.7; cursor: not-allowed; }
      
      .sequence-display {
        font-family: var(--font-mono);
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--accent-3);
        text-align: center;
        margin: 16px 0;
        background: var(--bg-1);
        padding: 16px;
        border-radius: var(--radius);
        border: 1px dashed var(--border-bright);
      }

      /* Options & Feedbacks */
      .formula-options { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
      .formula-option {
        background: var(--bg-0); border: 2px solid var(--border); border-radius: var(--radius-sm);
        padding: 16px; font-family: var(--font-mono); font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: all 0.2s;
      }
      .formula-option:hover:not(:disabled) { border-color: var(--accent); background: var(--bg-1); }
      .formula-option.correct { background: #dcfce7; border-color: #22c55e; color: #15803d; }
      .formula-option.wrong { background: #fee2e2; border-color: #ef4444; color: #b91c1c; }

      .feedback-success { background: #dcfce7; color: #15803d; padding: 16px; border-radius: var(--radius-sm); border-left: 4px solid #22c55e; margin-top: 16px; }
      .feedback-error { background: #fee2e2; color: #b91c1c; padding: 16px; border-radius: var(--radius-sm); border-left: 4px solid #ef4444; margin-top: 16px; }
    </style>

    <div class="mathscape-stage formula-stage">

      <!-- =====================================
           STAGE HERO
      ====================================== -->
      <section class="card stage-hero">
        <div class="mission-number">STAGE 02</div>
        <h1 class="hero-title">FORMULA FINDER</h1>
        <p class="stage-subtitle">Patterns have returned. Now you must unlock the rules that control every position.</p>

        <div class="story-card" style="text-align: left; margin-bottom: 24px;">
          <p>The Pattern Core is stable again. Across Mathscape, sequences are beginning to return to their original form.</p>
          <p>But a new problem has appeared. The patterns can only reveal their first few terms. The deeper positions remain hidden.</p>
          <p>Somewhere inside the Formula Vault lies the <strong>Formula Engine</strong> — a system capable of revealing any term in a sequence. Unfortunately, its mathematical symbols have been scattered. The values of <strong>a</strong>, <strong>b</strong>, <strong>r</strong>, and <strong>n</strong> must be decoded before the engine can function again.</p>
        </div>

        <div class="formula-vault">
          <div class="vault-symbol">a</div>
          <div class="vault-symbol">b</div>
          <div class="vault-core">
            <span>FORMULA</span>
            <strong>ENGINE</strong>
          </div>
          <div class="vault-symbol">r</div>
          <div class="vault-symbol">n</div>
        </div>

        <button class="btn btn-primary btn-large" id="begin-stage">
          ENTER THE FORMULA VAULT →
        </button>
      </section>

      <!-- =====================================
           MISSION 1
      ====================================== -->
      <section class="card mission-section" id="mission-1" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 01</span>
          <h2>DECODE THE VARIABLES</h2>
        </div>

        <p>Before the Formula Engine can be restored, you must understand the symbols that control every sequence.</p>

        <div class="formula-info-grid">
          <div class="formula-info-card">
            <div class="formula-symbol">a</div>
            <h3>First Term</h3>
            <p>The value of the very first number in a sequence.</p>
          </div>
          <div class="formula-info-card">
            <div class="formula-symbol">b</div>
            <h3>Common Difference</h3>
            <p>The constant value added or subtracted in an arithmetic sequence.</p>
          </div>
          <div class="formula-info-card">
            <div class="formula-symbol">r</div>
            <h3>Common Ratio</h3>
            <p>The constant factor multiplied or divided in a geometric sequence.</p>
          </div>
          <div class="formula-info-card">
            <div class="formula-symbol">n</div>
            <h3>Position</h3>
            <p>The specific position/index of the term you want to find.</p>
          </div>
        </div>

        <div class="insight-box">
          <strong>💡 SYSTEM INSIGHT: The Role of 'n'</strong>
          <p>Think of <strong>'n'</strong> like a house address. If a sequence is a street of numbers, <strong>n = 1</strong> is the first house (which holds the value <strong>a</strong>), <strong>n = 2</strong> is the second house, and so on. We use 'n' to ask the Formula Engine: <em>"What number lives at this exact address?"</em></p>
        </div>

        <div class="mission-card">
          <h3>🔍 VARIABLE CHECK</h3>
          <p>In the arithmetic sequence below:</p>
          <div class="sequence-display">5 &nbsp; → &nbsp; 9 &nbsp; → &nbsp; 13 &nbsp; → &nbsp; 17 &nbsp; → &nbsp; ...</div>
          <p style="text-align:center;">What is the common difference (b)?</p>

          <div class="answer-grid" id="difference-options">
            <button class="quiz-opt" data-answer="2">+ 2</button>
            <button class="quiz-opt" data-answer="4">+ 4</button>
            <button class="quiz-opt" data-answer="5">+ 5</button>
          </div>
          <div id="difference-feedback"></div>
        </div>
      </section>

      <!-- =====================================
           MISSION 2
      ====================================== -->
      <section class="card mission-section" id="mission-2" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 02</span>
          <h2>RESTORE THE ARITHMETIC FORMULA</h2>
        </div>

        <p>The first chamber of the Formula Vault contains arithmetic sequences. Each term changes by the same amount. Reconstruct the formula to reveal any position.</p>

        <div class="formula-panel">
          <span class="formula-label">ARITHMETIC ENGINE</span>
          <div class="main-formula">Uₙ = a + (n − 1)b</div>
          <div class="formula-breakdown">
            <div><strong>a</strong><span>first term</span></div>
            <div><strong>n</strong><span>position</span></div>
            <div><strong>b</strong><span>difference</span></div>
          </div>
        </div>

        <div class="insight-box">
          <strong>💡 SYSTEM INSIGHT: Why (n - 1)?</strong>
          <p>Why don't we just multiply the difference by <strong>n</strong>? Because the first term (<strong>a</strong>) is already there! To get to the 2nd term, we add the difference <strong>1 time</strong>. To get to the 10th term, we only need to jump <strong>9 times</strong>. Hence, we always multiply the difference by <strong>(n - 1)</strong>.</p>
        </div>

        <div class="mission-card">
          <h3>🎯 FORMULA CHALLENGE</h3>
          <p>Consider the sequence:</p>
          <div class="sequence-display">4 &nbsp; → &nbsp; 9 &nbsp; → &nbsp; 14 &nbsp; → &nbsp; 19 &nbsp; → &nbsp; ...</div>
          <p>Find the value of the 10th term (<strong>U₁₀</strong>).</p>

          <div style="display:flex; justify-content:center;">
            <div class="formula-workspace">
              <div class="workspace-row"><span>a =</span><input type="number" id="arith-a" placeholder="?"></div>
              <div class="workspace-row"><span>b =</span><input type="number" id="arith-b" placeholder="?"></div>
              <div class="workspace-row"><span>U₁₀ =</span><input type="number" id="arith-answer" placeholder="?"></div>
            </div>
          </div>

          <button class="btn btn-primary btn-large" id="check-arithmetic">VALIDATE FORMULA →</button>
          <div id="arithmetic-feedback"></div>
        </div>
      </section>

      <!-- =====================================
           MISSION 3
      ====================================== -->
      <section class="card mission-section" id="mission-3" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 03</span>
          <h2>UNLOCK THE GEOMETRIC FORMULA</h2>
        </div>

        <p>The second chamber operates differently. Instead of adding the same value, each term is multiplied by a constant ratio.</p>

        <div class="formula-panel" style="border-color: var(--accent-2);">
          <span class="formula-label" style="color: var(--accent-2);">GEOMETRIC ENGINE</span>
          <div class="main-formula">Uₙ = a × r⁽ⁿ⁻¹⁾</div>
          <div class="formula-breakdown">
            <div><strong style="color:var(--accent);">a</strong><span>first term</span></div>
            <div><strong style="color:var(--accent);">r</strong><span>ratio</span></div>
            <div><strong style="color:var(--accent);">n</strong><span>position</span></div>
          </div>
        </div>

        <div class="insight-box" style="border-color: var(--accent-2);">
          <strong style="color: var(--accent-2);">💡 SYSTEM INSIGHT: Exponential Power</strong>
          <p>Geometric sequences grow incredibly fast because they use <strong>exponents</strong> (pangkat). Just like the previous chamber, we use <strong>(n - 1)</strong> because we don't multiply the first term by the ratio to get itself. To find the 6th term, we multiply <strong>'a'</strong> by the ratio <strong>5 times</strong> (r⁵).</p>
        </div>

        <div class="mission-card">
          <h3>🚀 RATIO CHALLENGE</h3>
          <p>Consider the sequence:</p>
          <div class="sequence-display">3 &nbsp; → &nbsp; 6 &nbsp; → &nbsp; 12 &nbsp; → &nbsp; 24 &nbsp; → &nbsp; ...</div>
          <p>Find the value of the 6th term (<strong>U₆</strong>).</p>

          <div style="display:flex; justify-content:center;">
            <div class="formula-workspace">
              <div class="workspace-row"><span>a =</span><input type="number" id="geo-a" placeholder="?"></div>
              <div class="workspace-row"><span>r =</span><input type="number" id="geo-r" placeholder="?"></div>
              <div class="workspace-row"><span>U₆ =</span><input type="number" id="geo-answer" placeholder="?"></div>
            </div>
          </div>

          <button class="btn btn-primary btn-large" id="check-geometric">UNLOCK THE RATIO →</button>
          <div id="geometric-feedback"></div>
        </div>
      </section>

      <!-- =====================================
           MISSION 4
      ====================================== -->
      <section class="card mission-section" id="mission-4" hidden>
        <div class="mission-header">
          <span class="mission-number">FINAL MISSION</span>
          <h2>FORMULA VAULT CHALLENGE</h2>
        </div>

        <p>One final sequence remains locked behind the central vault. You must simplify the formula and reveal the hidden distant term.</p>

        <div class="insight-box" style="border-color: var(--accent-3);">
          <strong style="color: var(--accent-3);">💡 SYSTEM INSIGHT: Simplifying Formulas</strong>
          <p>Did you know you can simplify <strong>Uₙ = a + (n - 1)b</strong> into a much shorter form? <br>
          If a = 3 and b = 2, then:<br>
          Uₙ = 3 + (n - 1)2 <br>
          Uₙ = 3 + 2n - 2 <br>
          <strong>Uₙ = 2n + 1</strong>. This makes calculating huge positions much faster!</p>
        </div>

        <div class="mission-card">
          <span class="formula-label">SEQUENCE DATA</span>
          <div class="sequence-display">5 &nbsp; → &nbsp; 9 &nbsp; → &nbsp; 13 &nbsp; → &nbsp; 17 &nbsp; → &nbsp; ...</div>
          <p style="text-align:center;">Which simplified formula represents this sequence?</p>

          <div class="formula-options" id="final-formula-options">
            <button class="formula-option" data-formula="wrong1">Uₙ = 4n - 1</button>
            <button class="formula-option" data-formula="correct">Uₙ = 4n + 1</button>
            <button class="formula-option" data-formula="wrong2">Uₙ = 5n - 1</button>
          </div>
          <div id="final-formula-feedback"></div>
        </div>

        <div id="final-question" class="mission-card" style="margin-top:24px;" hidden>
          <span class="formula-label">FINAL CALCULATION</span>
          <p style="text-align:center; margin-top:10px;">Using the correct formula (<strong>Uₙ = 4n + 1</strong>), determine <strong>U₂₀</strong>.</p>
          
          <div style="display:flex; justify-content:center; margin: 16px 0;">
            <input type="number" id="final-answer" placeholder="Enter U₂₀" style="padding:12px; font-size:1.2rem; font-weight:bold; text-align:center; width:200px; border:2px solid var(--border-bright); border-radius:var(--radius-sm);">
          </div>

          <button class="btn btn-primary btn-large" id="check-final-answer">ACTIVATE FORMULA ENGINE ⚙️</button>
          <div id="final-answer-feedback"></div>
        </div>
      </section>

      <!-- =====================================
           COMPLETION
      ====================================== -->
      <section class="card mission-section" id="completion-section" style="text-align:center;" hidden>
        <div class="mission-number">FORMULA ENGINE RESTORED</div>
        <h2 style="margin-top:10px;">THE VAULT IS OPEN</h2>
        <p>You have restored the mathematical rules that allow Mathscape to predict any position in a sequence.</p>

        <div class="formula-info-grid" style="justify-content:center;">
          <div class="formula-info-card" style="border-color:var(--accent);">
            <span class="formula-label">ARITHMETIC</span>
            <div class="main-formula" style="color:var(--text-0); text-shadow:none; font-size:1.5rem; margin-top:8px;">Uₙ = a + (n − 1)b</div>
          </div>
          <div class="formula-info-card" style="border-color:var(--accent-2);">
            <span class="formula-label" style="color:var(--accent-2);">GEOMETRIC</span>
            <div class="main-formula" style="color:var(--text-0); text-shadow:none; font-size:1.5rem; margin-top:8px;">Uₙ = a × r⁽ⁿ⁻¹⁾</div>
          </div>
        </div>

        <p>The Formula Engine is now operational. But deeper inside Mathscape, the sequences are beginning to combine into something even more powerful.</p>

        <button class="btn btn-primary btn-large" id="complete-level" style="margin-top:20px;">
          COMPLETE STAGE 02 ✦
        </button>
      </section>

    </div>
  `;

  // ==========================================
  // ELEMENTS & EVENT LISTENERS
  // ==========================================
  const beginStage = container.querySelector('#begin-stage');
  const mission1 = container.querySelector('#mission-1');
  const mission2 = container.querySelector('#mission-2');
  const mission3 = container.querySelector('#mission-3');
  const mission4 = container.querySelector('#mission-4');
  const completionSection = container.querySelector('#completion-section');

  // START STAGE
  beginStage.addEventListener('click', () => {
    mission1.hidden = false;
    mission1.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // MISSION 1: COMMON DIFFERENCE
  const differenceButtons = container.querySelectorAll('#difference-options .quiz-opt');
  differenceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = Number(button.dataset.answer);
      const feedback = container.querySelector('#difference-feedback');

      // Kunci semua opsi saat dipilih
      differenceButtons.forEach(btn => btn.disabled = true);

      if (answer === 4) {
        button.classList.add('correct');
        feedback.innerHTML = `<div class="feedback-success"><strong>✅ Correct.</strong> The sequence increases by 4 each time. Therefore: <strong>b = 4</strong></div>`;
        state.mission1Done = true;
      } else {
        button.classList.add('wrong');
        container.querySelector('[data-answer="4"]').classList.add('correct'); // Tunjukkan yang benar
        feedback.innerHTML = `<div class="feedback-error"><strong>❌ Incorrect.</strong> The correct answer is <strong>+ 4</strong> (since 9 - 5 = 4). Let's move on.</div>`;
      }
      
      // Auto Next Mission
      setTimeout(() => {
        mission2.hidden = false;
        mission2.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 2000);
    });
  });

  // MISSION 2: ARITHMETIC FORMULA
  const btnArith = container.querySelector('#check-arithmetic');
  btnArith.addEventListener('click', () => {
    const a = Number(container.querySelector('#arith-a').value);
    const b = Number(container.querySelector('#arith-b').value);
    const ans = Number(container.querySelector('#arith-answer').value);
    const feedback = container.querySelector('#arithmetic-feedback');

    // Kunci tombol & input agar tidak bisa diubah-ubah (Auto move on)
    btnArith.disabled = true;
    container.querySelector('#arith-a').disabled = true;
    container.querySelector('#arith-b').disabled = true;
    container.querySelector('#arith-answer').disabled = true;

    if (a === 4 && b === 5 && ans === 49) {
      feedback.innerHTML = `<div class="feedback-success"><strong>✅ Formula Restored.</strong><br> U₁₀ = 4 + (10 − 1)(5) = 49</div>`;
      state.mission2Done = true;
    } else {
      // Tampilkan jawaban yang benar kalau salah
      feedback.innerHTML = `<div class="feedback-error"><strong>❌ Incorrect.</strong><br>The correct values are: <strong>a = 4</strong>, <strong>b = 5</strong>, and <strong>U₁₀ = 49</strong>. Moving on...</div>`;
    }

    // Auto Next Mission
    setTimeout(() => {
      mission3.hidden = false;
      mission3.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2500);
  });

  // MISSION 3: GEOMETRIC FORMULA
  const btnGeo = container.querySelector('#check-geometric');
  btnGeo.addEventListener('click', () => {
    const a = Number(container.querySelector('#geo-a').value);
    const r = Number(container.querySelector('#geo-r').value);
    const ans = Number(container.querySelector('#geo-answer').value);
    const feedback = container.querySelector('#geometric-feedback');

    // Kunci tombol & input (Auto move on)
    btnGeo.disabled = true;
    container.querySelector('#geo-a').disabled = true;
    container.querySelector('#geo-r').disabled = true;
    container.querySelector('#geo-answer').disabled = true;

    if (a === 3 && r === 2 && ans === 96) {
      feedback.innerHTML = `<div class="feedback-success"><strong>✅ Ratio Unlocked.</strong><br> U₆ = 3 × 2⁵ = 96</div>`;
      state.mission3Done = true;
    } else {
      // Tampilkan jawaban yang benar kalau salah
      feedback.innerHTML = `<div class="feedback-error"><strong>❌ Incorrect.</strong><br>The correct values are: <strong>a = 3</strong>, <strong>r = 2</strong>, and <strong>U₆ = 96</strong>. Moving on...</div>`;
    }

    // Auto Next Mission
    setTimeout(() => {
      mission4.hidden = false;
      mission4.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2500);
  });

  // MISSION 4 (Part 1): FORMULA SELECTION
  const formulaOptions = container.querySelectorAll('#final-formula-options .formula-option');
  formulaOptions.forEach(button => {
    button.addEventListener('click', () => {
      const feedback = container.querySelector('#final-formula-feedback');
      
      // Kunci opsi
      formulaOptions.forEach(btn => btn.disabled = true);

      if (button.dataset.formula === 'correct') {
        button.classList.add('correct');
        feedback.innerHTML = `<div class="feedback-success"><strong>✅ Correct.</strong><br> Uₙ = 5 + (n − 1)(4)  ➔  <strong>Uₙ = 4n + 1</strong></div>`;
        state.mission4_1Done = true;
      } else {
        button.classList.add('wrong');
        container.querySelector('[data-formula="correct"]').classList.add('correct');
        // Kasih tau yang benar
        feedback.innerHTML = `<div class="feedback-error"><strong>❌ Incorrect.</strong> The correct formula is <strong>Uₙ = 4n + 1</strong>. (Since 5 + 4n - 4 = 4n + 1).</div>`;
      }
      
      // Buka pertanyaan final (Part 2) 
      setTimeout(() => {
        container.querySelector('#final-question').hidden = false;
        container.querySelector('#final-question').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1500);
    });
  });

  // MISSION 4 (Part 2): FINAL ANSWER
  const btnFinal = container.querySelector('#check-final-answer');
  btnFinal.addEventListener('click', () => {
    const ans = Number(container.querySelector('#final-answer').value);
    const feedback = container.querySelector('#final-answer-feedback');

    // Kunci tombol & input (Auto move on)
    btnFinal.disabled = true;
    container.querySelector('#final-answer').disabled = true;

    if (ans === 81) {
      feedback.innerHTML = `<div class="feedback-success"><strong>🎉 Formula Engine Activated!</strong><br> U₂₀ = 4(20) + 1 = 81</div>`;
      state.mission4_2Done = true;
    } else {
      // Kasih jawaban benar jika salah
      feedback.innerHTML = `<div class="feedback-error"><strong>❌ Incorrect.</strong><br>Using Uₙ = 4n + 1, U₂₀ is 4(20) + 1 = <strong>81</strong>.</div>`;
    }

    // Auto move to Completion Section
    setTimeout(() => {
      completionSection.hidden = false;
      completionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2500);
  });

  // ==========================================
  // COMPLETE LEVEL (Trigger Transition)
  // ==========================================
  container.querySelector('#complete-level').addEventListener('click', (e) => {
    // FIX EXPLOIT: Disable tombol agar tak terklik 2x
    e.target.disabled = true;

    // Kalkulasi Skor (Total 100)
    let score = 0;
    if (state.mission1Done) score += 20;
    if (state.mission2Done) score += 25;
    if (state.mission3Done) score += 25;
    if (state.mission4_1Done) score += 10;
    if (state.mission4_2Done) score += 20;

    state.score = score;
    let badge = null;

    // Dapat badge jika skor 80 ke atas
    if (score >= 80) { 
      const added = api.badge('formula-finder', 'Formula Finder', '⚙️');
      if (added) {
        badge = { name: 'Formula Finder', icon: '⚙️' };
      }
    }

    // Menyelesaikan level dan membuka Results Panel di main.js
    api.complete(score, {
      heading: 'Formula Engine Restored',
      detail: `You completed the Formula Vault and restored the rules for finding the nth term of arithmetic and geometric sequences.`,
      badge
    });
  });
}
