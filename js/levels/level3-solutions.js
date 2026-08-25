// ==========================================================
// LEVEL 3 — SERIES MASTER
// Arithmetic & Geometric Series
// ==========================================================

export function mount(container, api) {
  let currentMission = 0;

  const state = {
    mission1Done: false,
    mission2Done: false,
    mission3Done: false,
    mission4Done: false,
    mission5Done: false,
    score: 0
  };

  // ==========================================================
  // MAIN STAGE & CSS
  // ==========================================================

  container.innerHTML = `
    <style>
      /* --- SERIES MASTER SPECIFIC STYLES --- */
      
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

      /* Concept Visualization */
      .series-concept {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--bg-1);
        border: 1px dashed var(--border-bright);
        border-radius: var(--radius);
        padding: 24px;
        margin: 24px 0;
      }
      .concept-sequence {
        font-family: var(--font-mono);
        font-size: 1.6rem;
        font-weight: bold;
        color: var(--text-0);
        letter-spacing: 0.1em;
      }
      .concept-arrow {
        font-size: 1.5rem;
        color: var(--accent);
        margin: 12px 0;
        animation: floatSymbol 2s infinite ease-in-out;
      }
      .concept-result {
        background: var(--accent);
        color: #05201b;
        font-family: var(--font-mono);
        font-weight: bold;
        padding: 8px 24px;
        border-radius: 20px;
        letter-spacing: 0.1em;
        box-shadow: 0 4px 15px rgba(32, 191, 178, 0.4);
      }

      /* Formula Panel */
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
      .formula-panel h3 { color: var(--accent); font-family: var(--font-mono); margin-bottom: 16px; font-size: 1rem; letter-spacing: 0.05em; }
      .formula-panel .formula-display {
        font-family: var(--font-mono);
        font-size: 2rem;
        font-weight: bold;
        margin: 16px 0;
        color: #fff;
        text-shadow: 0 0 15px rgba(255,255,255,0.4);
      }
      .formula-panel p { color: #cbd5e1; font-size: 0.85rem; margin-top: 12px; }

      /* Stadium Pattern */
      .stadium-pattern {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin: 24px 0;
      }
      .stadium-row {
        display: flex;
        justify-content: space-between;
        background: var(--bg-1);
        padding: 12px 20px;
        border-radius: var(--radius-sm);
        border-left: 4px solid var(--accent-3);
        font-family: var(--font-mono);
      }
      .stadium-row span { color: var(--text-2); font-weight: bold; }
      .stadium-row strong { color: var(--text-0); font-size: 1.2rem; }

      /* Input Challenges */
      .series-challenges {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin: 24px 0;
      }
      .series-question {
        background: var(--bg-1);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: 20px;
        text-align: center;
        transition: all 0.3s;
      }
      .series-question:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
      .series-question h4 { font-family: var(--font-mono); font-size: 1.2rem; color: var(--text-0); margin: 0 0 8px 0; }
      .series-question p { font-size: 0.9rem; color: var(--accent-2); font-weight: bold; margin-bottom: 16px; }
      .series-question input {
        width: 100%;
        padding: 12px;
        font-size: 1.1rem;
        text-align: center;
        border: 2px solid var(--border-bright);
        border-radius: var(--radius-sm);
        outline: none;
        font-family: var(--font-mono);
        transition: all 0.3s;
      }
      .series-question input.is-correct { border-color: var(--success); background: #dcfce7; color: var(--success); }
      .series-question input.is-wrong { border-color: var(--danger); background: #fee2e2; color: var(--danger); }

      /* Summary Grid */
      .summary-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 24px 0;
      }
      .summary-card {
        background: var(--bg-1);
        padding: 20px;
        border-radius: var(--radius);
        border: 1px solid var(--border);
        text-align: center;
      }
      .summary-card h3 { font-size: 1.1rem; margin-bottom: 12px; }
      .summary-card strong {
        display: block;
        margin-top: 16px;
        font-family: var(--font-mono);
        color: var(--accent);
        font-size: 1.2rem;
      }
      @media (max-width: 640px) { .summary-grid { grid-template-columns: 1fr; } }

      /* Feedback Classes */
      .feedback-success { background: #dcfce7; color: #15803d; padding: 16px; border-radius: var(--radius-sm); border-left: 4px solid #22c55e; margin-top: 16px; animation: fadeIn 0.3s; }
      .feedback-error { background: #fee2e2; color: #b91c1c; padding: 16px; border-radius: var(--radius-sm); border-left: 4px solid #ef4444; margin-top: 16px; animation: fadeIn 0.3s; }
      
      .fade-in { animation: fadeIn 0.5s ease forwards; }
    </style>

    <div class="mathscape-stage series-stage">

      <!-- =====================================
           STORY / HERO
      ====================================== -->
      <section class="card stage-hero" id="series-hero">
        <div class="mission-number">STAGE 03</div>
        <h1 class="hero-title">SERIES MASTER</h1>
        <p class="stage-subtitle">The patterns have been restored. But Mathscape still cannot calculate what they become together.</p>

        <div class="story-card" style="text-align: left;">
          <p>You have already discovered hidden patterns and uncovered the formulas that control them.</p>
          <p>Across Mathscape, individual numbers are no longer enough. Stadiums cannot calculate their total seats. Savings records have become incomplete. Forests have lost track of the trees planted across every row.</p>
          <p>The Pattern Core has revealed its next secret: numbers become more powerful when they are combined.</p>
          <p>To restore this part of Mathscape, you must master the concept of a <strong>series</strong> — the total sum of the terms in a sequence.</p>
        </div>

        <div class="series-concept">
          <div class="concept-sequence">3 + 6 + 9 + 12 + ...</div>
          <div class="concept-arrow">↓</div>
          <div class="concept-result">A SERIES</div>
        </div>

        <button class="btn btn-primary btn-large" id="begin-series">
          ENTER THE ENDLESS VALLEY →
        </button>
      </section>

      <!-- =====================================
           MISSION 1
      ====================================== -->
      <section class="card mission-section fade-in" id="mission-1" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 01</span>
          <h2>THE STADIUM SUM</h2>
        </div>

        <div class="story-card">
          <p>You arrive at the abandoned Mathscape Stadium. The seats are arranged in a pattern, but the stadium system can no longer calculate the total.</p>
          <p>The first row contains 12 seats. Each following row adds 4 more seats.</p>
        </div>

        <div class="stadium-pattern">
          <div class="stadium-row"><span>ROW 1</span><strong>12</strong></div>
          <div class="stadium-row"><span>ROW 2</span><strong>16</strong></div>
          <div class="stadium-row"><span>ROW 3</span><strong>20</strong></div>
          <div class="stadium-row"><span>ROW 4</span><strong>?</strong></div>
        </div>

        <div class="mission-card" style="text-align:center;">
          <h3>How many seats are in the fourth row?</h3>
          <div class="answer-grid">
            <button class="quiz-opt answer-btn" data-answer="20">20</button>
            <button class="quiz-opt answer-btn" data-answer="24">24</button>
            <button class="quiz-opt answer-btn" data-answer="28">28</button>
          </div>
        </div>
        <div id="mission-1-feedback"></div>
      </section>

      <!-- =====================================
           MISSION 2
      ====================================== -->
      <section class="card mission-section fade-in" id="mission-2" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 02</span>
          <h2>THE ARITHMETIC ARCHIVE</h2>
        </div>

        <p>Inside the Arithmetic Archive, several records have been damaged. Each sequence follows a constant difference. Restore the missing totals.</p>

        <div class="formula-panel">
          <h3>ARITHMETIC SERIES FORMULA</h3>
          <div class="formula-display">Sₙ = <span style="color:var(--accent-2);">n/2</span> [ 2a + (n − 1)d ]</div>
          <p>Where <strong>a</strong> is the first term, <strong>d</strong> is the common difference, and <strong>n</strong> is the number of terms.</p>
        </div>

        <div class="insight-box">
          <strong>💡 SYSTEM INSIGHT: The Gauss Trick</strong>
          <p>A series (Sₙ) is just adding up the sequence (U₁, U₂, U₃...). Carl Friedrich Gauss discovered that if you pair the first and last number, the second and second-to-last number, they all sum to the same amount! That's why we multiply the pair's sum by half the total numbers (<strong>n/2</strong>).</p>
        </div>

        <div class="series-challenges">
          <div class="series-question">
            <h4>3, 6, 9, 12, ...</h4>
            <p>Find S₅</p>
            <input type="number" id="arith-1" placeholder="?">
          </div>
          <div class="series-question">
            <h4>8, 12, 16, ...</h4>
            <p>Find S₁₀</p>
            <input type="number" id="arith-2" placeholder="?">
          </div>
          <div class="series-question">
            <h4>15, 20, 25, ...</h4>
            <p>Find S₈</p>
            <input type="number" id="arith-3" placeholder="?">
          </div>
          <div class="series-question">
            <h4>2, 4, 6, ...</h4>
            <p>Find S₂₀</p>
            <input type="number" id="arith-4" placeholder="?">
          </div>
        </div>

        <button class="btn btn-primary btn-large" id="check-arithmetic">RESTORE THE ARCHIVE ✦</button>
        <div id="arith-feedback"></div>
      </section>

      <!-- =====================================
           MISSION 3
      ====================================== -->
      <section class="card mission-section fade-in" id="mission-3" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 03</span>
          <h2>THE GEOMETRIC PORTAL</h2>
        </div>

        <p>Beyond the Arithmetic Archive stands a portal powered by multiplication. These numbers grow extremely fast by a constant ratio.</p>

        <div class="formula-panel" style="border-color:var(--accent-2);">
          <h3 style="color:var(--accent-2);">GEOMETRIC SERIES FORMULA</h3>
          <div class="formula-display">Sₙ = <span style="color:var(--accent);">a(rⁿ − 1)</span> / (r − 1)</div>
          <p>Where <strong>a</strong> is the first term and <strong>r</strong> is the common ratio (for r > 1).</p>
        </div>

        <div class="series-challenges">
          <div class="series-question">
            <h4>2, 4, 8, 16, ...</h4>
            <p>Find S₆</p>
            <input type="number" id="geo-1" placeholder="?">
          </div>
          <div class="series-question">
            <h4>3, 6, 12, ...</h4>
            <p>Find S₅</p>
            <input type="number" id="geo-2" placeholder="?">
          </div>
          <div class="series-question">
            <h4>5, 10, 20, ...</h4>
            <p>Find S₇</p>
            <input type="number" id="geo-3" placeholder="?">
          </div>
        </div>

        <button class="btn btn-primary btn-large" id="check-geometric">ACTIVATE THE PORTAL ✦</button>
        <div id="geo-feedback"></div>
      </section>

      <!-- =====================================
           MISSION 4
      ====================================== -->
      <section class="card mission-section fade-in" id="mission-4" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 04</span>
          <h2>THE SAVINGS VAULT</h2>
        </div>

        <div class="story-card">
          <p>The Mathscape Treasury has lost its savings record.</p>
          <p>Rina saved <strong>100,000</strong> during the first month. Every following month, she increased her savings by <strong>50,000</strong>.</p>
        </div>

        <div class="insight-box" style="border-color: var(--accent-3);">
          <strong style="color:var(--accent-3);">💡 SYSTEM INSIGHT: Real World Application</strong>
          <p>Because Rina adds a fixed amount (+50,000) every month, her savings represent an <strong>Arithmetic Series</strong>. The total money she has is the <em>Sum</em> of all those months combined!</p>
        </div>

        <div class="series-challenges">
          <div class="series-question">
            <h3 style="font-size:1.1rem; margin-bottom:10px;">Total savings after 12 months?</h3>
            <p>Calculate S₁₂</p>
            <input type="number" id="saving-12" placeholder="Enter number only">
          </div>
          <div class="series-question">
            <h3 style="font-size:1.1rem; margin-bottom:10px;">Total savings after 24 months?</h3>
            <p>Calculate S₂₄</p>
            <input type="number" id="saving-24" placeholder="Enter number only">
          </div>
        </div>

        <button class="btn btn-primary btn-large" id="check-savings">UNLOCK THE VAULT ✦</button>
        <div id="saving-feedback"></div>
      </section>

      <!-- =====================================
           MISSION 5
      ====================================== -->
      <section class="card mission-section fade-in" id="mission-5" hidden>
        <div class="mission-header">
          <span class="mission-number">FINAL MISSION</span>
          <h2>THE FOREST RESTORATION</h2>
        </div>

        <div class="story-card">
          <p>A farmer is restoring the Mathscape Forest. The first row contains <strong>15 trees</strong>, and every new row contains <strong>5 more trees</strong> than the previous one.</p>
          <p>There are <strong>20 rows</strong> in total.</p>
        </div>

        <div class="stadium-pattern" style="align-items:center; background:var(--bg-1); padding:20px; border:1px dashed var(--border-bright); border-radius:var(--radius);">
          <div style="font-family:var(--font-mono); font-size:1.4rem; color:var(--success); font-weight:bold;">
            15 &nbsp;→&nbsp; 20 &nbsp;→&nbsp; 25 &nbsp;→&nbsp; 30 &nbsp;→&nbsp; ...
          </div>
        </div>

        <div class="series-question" style="max-width:400px; margin: 0 auto 24px;">
          <h3>What is the total number of trees planted?</h3>
          <p>Find S₂₀</p>
          <input type="number" id="forest-answer" placeholder="Enter total trees">
        </div>

        <div style="text-align:center;">
          <button class="btn btn-primary btn-large" id="restore-forest">RESTORE MATHSCAPE 🌲</button>
        </div>
        <div id="forest-feedback"></div>
      </section>

      <!-- =====================================
           FINAL SUMMARY
      ====================================== -->
      <section class="card mission-section fade-in" id="series-complete" style="text-align:center;" hidden>
        <div class="mission-number">STAGE COMPLETE</div>
        <h2 style="margin-top:10px;">SERIES MASTER</h2>
        <p>You have restored the ability of Mathscape to calculate not only individual patterns, but the total created by every term combined.</p>

        <div class="summary-grid">
          <div class="summary-card" style="border-color:var(--accent);">
            <h3>Arithmetic Series</h3>
            <p>A series formed from a sequence with a constant difference.</p>
            <strong>Sₙ = n/2 [2a + (n − 1)d]</strong>
          </div>
          <div class="summary-card" style="border-color:var(--accent-2);">
            <h3>Geometric Series</h3>
            <p>A series formed from a sequence with a constant ratio.</p>
            <strong style="color:var(--accent-2);">Sₙ = a(rⁿ − 1)/(r − 1)</strong>
          </div>
        </div>

        <button class="btn btn-primary btn-large" id="finish-level">
          CLAIM YOUR REWARD 🏆
        </button>
      </section>

    </div>
  `;

  // ==========================================================
  // START LEVEL
  // ==========================================================
  container.querySelector('#begin-series').addEventListener('click', () => {
    container.querySelector('#series-hero').hidden = true;
    showMission(1);
  });

  function showMission(number) {
    currentMission = number;
    const missions = container.querySelectorAll('.mission-section');
    missions.forEach(m => m.hidden = true);

    const mission = container.querySelector(`#mission-${number}`);
    if (mission) {
      mission.hidden = false;
      mission.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ==========================================================
  // MISSION 1: STADIUM SUM
  // ==========================================================
  const m1Btns = container.querySelectorAll('#mission-1 .answer-btn');
  m1Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const feedback = container.querySelector('#mission-1-feedback');
      m1Btns.forEach(b => b.disabled = true);

      if (btn.dataset.answer === '24') {
        btn.classList.add('correct');
        state.mission1Done = true;
        feedback.innerHTML = `
          <div class="feedback-success">
            <strong>✅ Pattern Restored</strong>
            <p>Correct. The 4th row has 24 seats (12, 16, 20, 24). <br><br>But what if the system needs to know the <strong>TOTAL</strong> seats in the entire stadium? We can't just find one row, we need to add them all up. This is what we call a <strong>Series</strong>!</p>
            <button class="btn btn-primary next-mission" data-next="2" style="margin-top:12px;">ENTER ARITHMETIC ARCHIVE →</button>
          </div>
        `;
        bindNextMission();
      } else {
        btn.classList.add('wrong');
        container.querySelector('[data-answer="24"]').classList.add('correct');
        feedback.innerHTML = `
          <div class="feedback-error">
            <strong>❌ Pattern Unstable</strong>
            <p>Look at the difference. Every row adds 4 seats. 20 + 4 = 24.</p>
            <button class="btn btn-primary next-mission" data-next="2" style="margin-top:12px;">PROCEED ANYWAY →</button>
          </div>
        `;
        bindNextMission();
      }
    });
  });

  // ==========================================================
  // HELPER: MULTI-INPUT VALIDATOR
  // ==========================================================
  function validateInputs(inputs, correctAnswers) {
    let allCorrect = true;
    inputs.forEach((input, index) => {
      const val = Number(input.value);
      if (val === correctAnswers[index]) {
        input.classList.remove('is-wrong');
        input.classList.add('is-correct');
        input.disabled = true;
      } else {
        input.classList.remove('is-correct');
        input.classList.add('is-wrong');
        allCorrect = false;
      }
    });
    return allCorrect;
  }

  // ==========================================================
  // MISSION 2: ARITHMETIC
  // ==========================================================
  container.querySelector('#check-arithmetic').addEventListener('click', (e) => {
    const inputs = [
      container.querySelector('#arith-1'),
      container.querySelector('#arith-2'),
      container.querySelector('#arith-3'),
      container.querySelector('#arith-4')
    ];
    const correct = [45, 260, 260, 420];
    const feedback = container.querySelector('#arith-feedback');
    const isCorrect = validateInputs(inputs, correct);

    if (isCorrect) {
      state.mission2Done = true;
      e.target.disabled = true;
      feedback.innerHTML = `
        <div class="feedback-success">
          <strong>✅ Archive Restored!</strong>
          <p>Excellent. You successfully calculated the sum of multiple arithmetic series.</p>
          <button class="btn btn-primary next-mission" data-next="3" style="margin-top:12px;">ENTER THE GEOMETRIC PORTAL →</button>
        </div>
      `;
      bindNextMission();
    } else {
      feedback.innerHTML = `<div class="feedback-error"><strong>❌ Incomplete Data.</strong> The records highlighted in red are incorrect. Check your 'a', 'd', and 'n' values.</div>`;
    }
  });

  // ==========================================================
  // MISSION 3: GEOMETRIC
  // ==========================================================
  container.querySelector('#check-geometric').addEventListener('click', (e) => {
    const inputs = [
      container.querySelector('#geo-1'),
      container.querySelector('#geo-2'),
      container.querySelector('#geo-3')
    ];
    const correct = [126, 93, 635];
    const feedback = container.querySelector('#geo-feedback');
    const isCorrect = validateInputs(inputs, correct);

    if (isCorrect) {
      state.mission3Done = true;
      e.target.disabled = true;
      feedback.innerHTML = `
        <div class="feedback-success">
          <strong>✅ Portal Activated!</strong>
          <p>You have mastered geometric sum expansion.</p>
          <button class="btn btn-primary next-mission" data-next="4" style="margin-top:12px;">CONTINUE TO SAVINGS VAULT →</button>
        </div>
      `;
      bindNextMission();
    } else {
      feedback.innerHTML = `<div class="feedback-error"><strong>❌ Connection Failed.</strong> Red highlighted fields are incorrect. Ensure you're multiplying by the correct common ratio (r).</div>`;
    }
  });

  // ==========================================================
  // MISSION 4: SAVINGS
  // ==========================================================
  container.querySelector('#check-savings').addEventListener('click', (e) => {
    const inputs = [
      container.querySelector('#saving-12'),
      container.querySelector('#saving-24')
    ];
    // a=100000, d=50000
    // S12 = 6*(200000 + 550000) = 4500000
    // S24 = 12*(200000 + 1150000) = 16200000
    const correct = [4500000, 16200000];
    const feedback = container.querySelector('#saving-feedback');
    const isCorrect = validateInputs(inputs, correct);

    if (isCorrect) {
      state.mission4Done = true;
      e.target.disabled = true;
      feedback.innerHTML = `
        <div class="feedback-success">
          <strong>✅ Savings Vault Unlocked!</strong>
          <p>Perfect calculation. The real-world data has been restored.</p>
          <button class="btn btn-primary next-mission" data-next="5" style="margin-top:12px;">CONTINUE TO FINAL MISSION →</button>
        </div>
      `;
      bindNextMission();
    } else {
      feedback.innerHTML = `<div class="feedback-error"><strong>❌ Vault Remains Locked.</strong> Use a = 100000 and d = 50000. Do not use dots/commas in your answer.</div>`;
    }
  });

  // ==========================================================
  // MISSION 5: FOREST
  // ==========================================================
  container.querySelector('#restore-forest').addEventListener('click', (e) => {
    const input = container.querySelector('#forest-answer');
    const answer = Number(input.value);
    const feedback = container.querySelector('#forest-feedback');

    // a=15, d=5, n=20 => S20 = 10*(30 + 95) = 1250
    if (answer === 1250) {
      input.classList.remove('is-wrong');
      input.classList.add('is-correct');
      input.disabled = true;
      e.target.disabled = true;
      state.mission5Done = true;

      feedback.innerHTML = `
        <div class="feedback-success">
          <strong>🌿 Mathscape Forest Restored!</strong>
          <p>a = 15, d = 5, n = 20. <br>S₂₀ = 1,250 trees total.</p>
          <button class="btn btn-primary next-mission" data-next="complete" style="margin-top:12px;">VIEW YOUR ACHIEVEMENT →</button>
        </div>
      `;
      
      container.querySelector('.next-mission[data-next="complete"]').addEventListener('click', () => {
        container.querySelector('#mission-5').hidden = true;
        container.querySelector('#series-complete').hidden = false;
        container.querySelector('#series-complete').scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      input.classList.remove('is-correct');
      input.classList.add('is-wrong');
      feedback.innerHTML = `<div class="feedback-error"><strong>❌ The Forest Is Incomplete.</strong> Try identifying a, d, and n first, then plug them into the Arithmetic Series formula.</div>`;
    }
  });

  function bindNextMission() {
    container.querySelectorAll('.next-mission').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.next;
        if (next !== 'complete') showMission(Number(next));
      });
    });
  }

  // ==========================================================
  // COMPLETE LEVEL
  // ==========================================================
  container.querySelector('#finish-level').addEventListener('click', () => {
    let score = 0;
    if (state.mission1Done) score += 10;
    if (state.mission2Done) score += 25;
    if (state.mission3Done) score += 25;
    if (state.mission4Done) score += 20;
    if (state.mission5Done) score += 20;

    api.complete(score, {
      heading: 'Series Master Complete',
      detail: 'You mastered arithmetic and geometric series and successfully applied them to contextual problems.',
      badge: score >= 80 ? { name: 'Series Master', icon: '∑' } : null
    });
  });
}
