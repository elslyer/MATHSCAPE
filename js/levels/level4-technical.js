// ==========================================================
// MATHSCAPE — LEVEL 4
// CASE SOLVER
// Applications of Sequences and Series
// ==========================================================

export function mount(container, api) {
  let currentCase = 1;
  const caseProgress = { 1: false, 2: false, 3: false };

  // ==========================================================
  // MAIN LAYOUT & CSS
  // ==========================================================
  container.innerHTML = `
    <style>
      /* --- CASE SOLVER STYLES --- */
      .case-solver-stage {
        font-family: var(--font-sans);
        color: var(--text-0);
      }

      /* Case Navigation Tabs */
      .case-navigation {
        background: var(--bg-1);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 16px;
        margin-bottom: 24px;
        box-shadow: var(--shadow);
      }
      .case-nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        font-family: var(--font-mono);
        font-size: 0.85rem;
        color: var(--text-2);
        letter-spacing: 0.05em;
      }
      .case-tabs {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      .case-tab {
        flex: 1;
        min-width: 120px;
        background: var(--bg-0);
        border: 2px solid var(--border-bright);
        padding: 12px;
        border-radius: var(--radius-sm);
        font-family: var(--font-mono);
        font-weight: bold;
        color: var(--text-1);
        cursor: pointer;
        transition: all 0.2s;
        text-align: center;
      }
      .case-tab:hover { border-color: var(--accent); background: var(--bg-2); }
      .case-tab.active { background: var(--accent); color: #04241a; border-color: var(--accent); box-shadow: 0 4px 12px rgba(32,191,178,0.3); }
      .case-tab.completed { background: var(--success); border-color: var(--success); color: #fff; }
      .case-tab.completed::after { content: " ✓"; }

      /* Investigation Panels (Steps) */
      .case-card {
        background: var(--bg-0);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 32px;
        box-shadow: var(--shadow);
        animation: fadeIn 0.4s ease;
      }
      .case-story {
        background: var(--bg-1);
        border-left: 4px solid var(--accent-3);
        padding: 20px;
        margin: 20px 0;
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        font-size: 1.05rem;
        line-height: 1.6;
      }
      
      .investigation-panel {
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px dashed var(--border-bright);
      }
      .investigation-panel h3 {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--accent-3);
        font-family: var(--font-mono);
        font-size: 1.1rem;
      }
      .investigation-panel h3::before {
        content: "■";
        font-size: 0.8rem;
      }

      /* Insight / Logic Boxes */
      .logic-box {
        background: rgba(32,191,178,0.08);
        border: 1px solid rgba(32,191,178,0.3);
        padding: 16px;
        border-radius: var(--radius-sm);
        margin: 16px 0;
        font-size: 0.9rem;
      }
      .logic-box strong { color: var(--accent); font-family: var(--font-mono); display: block; margin-bottom: 8px; }

      /* Inputs & Options */
      .answer-input {
        width: 100%;
        max-width: 300px;
        padding: 12px 16px;
        font-size: 1.1rem;
        font-family: var(--font-mono);
        border: 2px solid var(--border-bright);
        border-radius: var(--radius-sm);
        margin-bottom: 12px;
        outline: none;
        transition: all 0.2s;
      }
      .answer-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
      
      .choice-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        margin: 16px 0;
      }
      .choice-btn {
        background: var(--bg-1);
        border: 2px solid var(--border);
        padding: 16px;
        border-radius: var(--radius-sm);
        font-family: var(--font-mono);
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
      }
      .choice-btn:hover { border-color: var(--accent); background: var(--bg-2); }
      .choice-btn.correct { background: #dcfce7; border-color: #22c55e; color: #15803d; }
      .choice-btn.wrong { background: #fee2e2; border-color: #ef4444; color: #b91c1c; }

      /* Solution Box (Classified Report) */
      .solution-box {
        background: #0f172a;
        color: #f8fafc;
        padding: 24px;
        border-radius: var(--radius);
        margin-top: 32px;
        border-left: 4px solid var(--success);
        font-family: var(--font-mono);
        animation: fadeIn 0.5s ease;
      }
      .solution-box h3 { color: var(--success); margin-bottom: 16px; }
      .solution-box p { color: #cbd5e1; font-size: 0.95rem; margin-bottom: 8px; }

      /* Feedback Messages */
      .feedback-success { background: #dcfce7; color: #15803d; padding: 12px 16px; border-radius: var(--radius-sm); border-left: 4px solid #22c55e; margin-top: 12px; font-weight: bold; }
      .feedback-error { background: #fee2e2; color: #b91c1c; padding: 12px 16px; border-radius: var(--radius-sm); border-left: 4px solid #ef4444; margin-top: 12px; font-weight: bold; }
    </style>

    <div class="case-solver-stage">

      <!-- =====================================
           HERO / STORY
      ====================================== -->
      <section class="card case-hero" id="case-hero">
        <div class="mission-number">STAGE 04</div>
        <h1 class="hero-title">CASE SOLVER</h1>
        <p class="stage-subtitle">Mathematics is no longer just a pattern. It is now your tool for solving real problems.</p>

        <div class="story-card">
          <p>The Pattern Core has been partially restored. But Mathscape is still unstable.</p>
          <p>Across the world, mathematical structures are appearing inside real situations. Seating systems, object arrangements, and geometric constructions are beginning to collapse because the wrong mathematical model is being used.</p>
          <p>Your task is no longer simply to recognize a pattern or memorize a formula. You must <strong>analyze the evidence, build a mathematical model, and defend your conclusion.</strong></p>
          <p style="color:var(--accent); font-weight:bold;">Welcome, Lead Investigator.</p>
        </div>

        <button class="btn btn-primary btn-large" id="begin-case-solving">
          OPEN INVESTIGATION FILES 📁
        </button>
      </section>

      <!-- =====================================
           CASE NAVIGATION
      ====================================== -->
      <section class="case-navigation" id="case-navigation" hidden>
        <div class="case-nav-header">
          <span>ACTIVE INVESTIGATIONS</span>
          <span id="case-progress-text">CASE 1 OF 3</span>
        </div>
        <div class="case-tabs">
          <button class="case-tab active" data-case="1">CASE 01</button>
          <button class="case-tab" data-case="2">CASE 02</button>
          <button class="case-tab" data-case="3">CASE 03</button>
        </div>
      </section>

      <!-- =====================================
           CASE CONTENT WORKSPACE
      ====================================== -->
      <section class="case-workspace" id="case-workspace" hidden></section>

      <!-- =====================================
           FINAL RESULT
      ====================================== -->
      <section class="card case-final" id="case-final" hidden style="text-align:center; border-color:var(--success);">
        <div class="mission-number" style="background:var(--success); color:#fff;">INVESTIGATION COMPLETE</div>
        <h2 style="margin-top:16px;">Mathscape Stabilized</h2>
        <p>You have analyzed the available evidence, selected mathematical models, and solved contextual problems using sequences and series.</p>
        
        <div id="final-score" style="margin: 24px 0; font-family:var(--font-mono); font-size:1.2rem; color:var(--accent);"></div>

        <button class="btn btn-primary btn-large" id="complete-level" style="background:var(--success); border-color:var(--success);">
          COMPLETE CASE SOLVER 🏆
        </button>
      </section>

    </div>
  `;

  // ==========================================================
  // ELEMENTS & EVENT LISTENERS
  // ==========================================================
  const hero = container.querySelector('#case-hero');
  const navigation = container.querySelector('#case-navigation');
  const workspace = container.querySelector('#case-workspace');
  const finalSection = container.querySelector('#case-final');

  container.querySelector('#begin-case-solving').addEventListener('click', () => {
    hero.hidden = true;
    navigation.hidden = false;
    workspace.hidden = false;
    renderCase(1);
  });

  container.querySelectorAll('.case-tab').forEach(button => {
    button.addEventListener('click', () => {
      renderCase(Number(button.dataset.case));
    });
  });

  // ==========================================================
  // RENDER CASE FUNCTION
  // ==========================================================
  function renderCase(caseNumber) {
    currentCase = caseNumber;
    container.querySelectorAll('.case-tab').forEach(tab => {
      tab.classList.toggle('active', Number(tab.dataset.case) === caseNumber);
    });
    container.querySelector('#case-progress-text').textContent = `CASE 0${caseNumber} OF 3`;

    if (caseNumber === 1) renderCaseOne();
    else if (caseNumber === 2) renderCaseTwo();
    else renderCaseThree();

    window.scrollTo({ top: navigation.offsetTop - 20, behavior: 'smooth' });
  }

  // ==========================================================
  // CASE 1: SEATING CAPACITY
  // ==========================================================
  function renderCaseOne() {
    workspace.innerHTML = `
      <div class="case-card">
        <h2>🏛️ The Seating Capacity Investigation</h2>
        
        <div class="case-story">
          <p>Event organizers are arranging the seating layout inside a venue. To avoid a financial loss, <strong>at least 80% of the total seating capacity</strong> must be filled.</p>
          <ul style="margin-top:10px;">
            <li>First row contains <strong>20 seats</strong>.</li>
            <li>Each subsequent row contains <strong>4 more seats</strong>.</li>
            <li>The venue has a total of <strong>25 rows</strong>.</li>
            <li>On the day of the event, <strong>1,350 spectators</strong> attended.</li>
          </ul>
        </div>

<div class="investigator-log">

  <div class="log-title">
    INVESTIGATOR'S LOG
  </div>

  <p>
    To find out if <strong>1,350 people</strong> is enough,
    we first need to determine the <em>maximum capacity</em>
    of the building.
  </p>

  <p>
    We are not simply looking for the number of seats in the
    <strong>25<sup>th</sup> row</strong>, represented by
    <strong>U<sub>25</sub></strong>.
  </p>

  <p>
    Instead, we need to calculate the
    <strong>total number of seats across all 25 rows</strong>,
    represented by:
  </p>

  <div class="formula-highlight">
    S<sub>25</sub> =
    U<sub>1</sub> + U<sub>2</sub> + U<sub>3</sub>
    + ... + U<sub>25</sub>
  </div>

  <p>
    In other words, the challenge requires us to find
    <strong>the total sum of seats across all 25 rows</strong>,
    or <strong>S<sub>25</sub></strong>.
  </p>

</div>
          <p>What mathematical formula is required to calculate the total capacity?</p>
          <div class="choice-grid">
            <button class="choice-btn concept-choice" data-answer="wrong">Arithmetic Sequence (Un)</button>
            <button class="choice-btn concept-choice" data-answer="correct">Arithmetic Series (Sn)</button>
            <button class="choice-btn concept-choice" data-answer="wrong">Geometric Series (Sn)</button>
          </div>
          <div id="case1-concept-feedback"></div>
        </div>

        <div class="investigation-panel" id="case1-step2" hidden>
          <h3>Step 2: Execute Calculation</h3>
          <p>Using the formula <strong>Sₙ = n/2 [2a + (n − 1)d]</strong>, calculate the TOTAL capacity of the venue.</p>
          <div style="display:flex; gap:12px; margin-bottom:12px;">
            <input type="number" id="case1-total" class="answer-input" placeholder="Total Max Capacity">
            <button class="btn btn-secondary" id="check-case1-total">VERIFY</button>
          </div>
          <div id="case1-total-feedback"></div>
        </div>

        <div class="investigation-panel" id="case1-step3" hidden>
          <h3>Step 3: Final Decision</h3>
          <div class="logic-box">
            <strong>💡 SYSTEM INSIGHT</strong>
            Max Capacity = 1,700 seats. The target is <strong>80% of 1,700</strong>. Actual attendance is <strong>1,350</strong>. 
          </div>
          <p>Based on your evidence, did the organizers reach the minimum target?</p>
          <div class="choice-grid">
            <button class="choice-btn final-choice" data-result="profit">Yes, Target Reached</button>
            <button class="choice-btn final-choice" data-result="loss">No, Target Not Reached</button>
          </div>
          <div id="case1-final-feedback"></div>
        </div>

        <div class="solution-box" id="case1-solution" hidden>
          <h3>FILE CLOSED: CASE 01</h3>
          <p>► Data Model: a = 20, d = 4, n = 25.</p>
          <p>► Total Capacity ($S_{25}$): 12.5 × [40 + 96] = <strong>1,700 seats</strong>.</p>
          <p>► Minimum Target: 80% × 1,700 = <strong>1,360 spectators</strong>.</p>
          <p>► Actual Attendance: 1,350 spectators.</p>
          <p><strong>CONCLUSION:</strong> The event fell short by 10 spectators. Loss incurred.</p>
        </div>
      </div>
    `;

    // Step 1
    workspace.querySelectorAll('.concept-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const feedback = workspace.querySelector('#case1-concept-feedback');
        if (btn.dataset.answer === 'correct') {
          btn.classList.add('correct');
          feedback.innerHTML = `<div class="feedback-success">Correct. We need the sum (Series), and the seats grow by a constant addition (+4), meaning it is Arithmetic.</div>`;
          workspace.querySelector('#case1-step2').hidden = false;
        } else {
          btn.classList.add('wrong');
          feedback.innerHTML = `<div class="feedback-error">Incorrect. Read the Investigator's Log. Are we looking for one specific row, or the sum of all rows?</div>`;
        }
      });
    });

    // Step 2
    workspace.querySelector('#check-case1-total').addEventListener('click', () => {
      const ans = Number(workspace.querySelector('#case1-total').value);
      const feedback = workspace.querySelector('#case1-total-feedback');
      if (ans === 1700) {
        feedback.innerHTML = `<div class="feedback-success">Calculation verified. Maximum capacity is 1,700 seats.</div>`;
        workspace.querySelector('#case1-step3').hidden = false;
      } else {
        feedback.innerHTML = `<div class="feedback-error">Error. Substitute a=20, d=4, n=25 into the formula.</div>`;
      }
    });

    // Step 3
    workspace.querySelectorAll('.final-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const feedback = workspace.querySelector('#case1-final-feedback');
        if (btn.dataset.result === 'loss') {
          btn.classList.add('correct');
          feedback.innerHTML = `<div class="feedback-success">Investigation successful. Conclusion defended.</div>`;
          workspace.querySelector('#case1-solution').hidden = false;
          caseProgress[1] = true;
          checkAllCases();
        } else {
          btn.classList.add('wrong');
          feedback.innerHTML = `<div class="feedback-error">Check your math. What is 80% of 1700? Is 1350 greater than that number?</div>`;
        }
      });
    });
  }

  // ==========================================================
  // CASE 2: GLASS ARRANGEMENT
  // ==========================================================
  function renderCaseTwo() {
    workspace.innerHTML = `
      <div class="case-card">
        <h2>🥂 The Glass Arrangement Problem</h2>
        
        <div class="case-story">
          <p>A graduation committee brought exactly <strong>450 glasses</strong> for a tower arrangement.</p>
          <ul style="margin-top:10px;">
            <li>First row has <strong>12 glasses</strong>. Each following row adds <strong>3 more glasses</strong>.</li>
            <li>The construction was stopped exactly after the <strong>10th row</strong>.</li>
            <li>The remaining glasses in the box must be moved to the VIP table.</li>
            <li>The VIP table requires exactly <strong>200 glasses</strong>.</li>
          </ul>
        </div>

        <div class="investigation-panel">
          <h3>Step 1: Analyze Resource Consumption</h3>
          <div class="logic-box">
            <strong>💡 INVESTIGATOR'S LOG</strong>
            To find out if we have enough glasses for the VIP table, we must calculate the "leftovers". <br>
            <em>Leftovers = Total Brought (450) - Glasses Actually Built.</em><br>
            Since they only built up to the 10th row, we need to calculate the sum of the first 10 rows ($S_{10}$).
          </div>
          <p>Calculate the amount of glasses <strong>used</strong> in the first 10 rows.</p>
          <div style="display:flex; gap:12px; margin-bottom:12px;">
            <input type="number" id="case2-used" class="answer-input" placeholder="Glasses Used (S₁₀)">
            <button class="btn btn-secondary" id="check-case2-used">VERIFY</button>
          </div>
          <div id="case2-used-feedback"></div>
        </div>

        <div class="investigation-panel" id="case2-step2" hidden>
          <h3>Step 2: Resource Allocation Decision</h3>
          <p>Now that you know how many glasses were used, determine how many are remaining. Are they sufficient for the VIP table's demand of 200?</p>
          <div class="choice-grid">
            <button class="choice-btn vip-choice" data-answer="enough">Yes, sufficient glasses left.</button>
            <button class="choice-btn vip-choice" data-answer="short">No, we need 5 more glasses.</button>
            <button class="choice-btn vip-choice" data-answer="wrong">No, we need 15 more glasses.</button>
          </div>
          <div id="case2-vip-feedback"></div>
        </div>

        <div class="solution-box" id="case2-solution" hidden>
          <h3>FILE CLOSED: CASE 02</h3>
          <p>► Used glasses ($S_{10}$): a = 12, d = 3. Sum = 5 × [24 + 27] = <strong>255 glasses</strong>.</p>
          <p>► Remaining in box: 450 - 255 = <strong>195 glasses</strong>.</p>
          <p>► VIP Demand: 200 glasses.</p>
          <p><strong>CONCLUSION:</strong> 195 < 200. The committee is short by 5 glasses.</p>
        </div>
      </div>
    `;

    workspace.querySelector('#check-case2-used').addEventListener('click', () => {
      const ans = Number(workspace.querySelector('#case2-used').value);
      const feedback = workspace.querySelector('#case2-used-feedback');
      if (ans === 255) {
        feedback.innerHTML = `<div class="feedback-success">Verified. The tower consumed 255 glasses.</div>`;
        workspace.querySelector('#case2-step2').hidden = false;
      } else {
        feedback.innerHTML = `<div class="feedback-error">Error. Calculate $S_{10}$ with a=12, d=3.</div>`;
      }
    });

    workspace.querySelectorAll('.vip-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const feedback = workspace.querySelector('#case2-vip-feedback');
        if (btn.dataset.answer === 'short') {
          btn.classList.add('correct');
          feedback.innerHTML = `<div class="feedback-success">Conclusion defended. They are exactly 5 glasses short.</div>`;
          workspace.querySelector('#case2-solution').hidden = false;
          caseProgress[2] = true;
          checkAllCases();
        } else {
          btn.classList.add('wrong');
          feedback.innerHTML = `<div class="feedback-error">Incorrect deduction. 450 - 255 = 195 remaining. How does 195 compare to 200?</div>`;
        }
      });
    });
  }

  // ==========================================================
  // CASE 3: INFINITE SQUARE
  // ==========================================================
  function renderCaseThree() {
    workspace.innerHTML = `
      <div class="case-card">
        <h2>🔳 The Infinite Square Investigation</h2>
        
        <div class="case-story">
          <p>A geometric anomaly has appeared in Mathscape: an infinitely generating square.</p>
          <ul style="margin-top:10px;">
            <li>The original Square A has a diagonal length of <strong>16√2 units</strong>.</li>
            <li>A new Square B is spawned inside it, then Square C inside B, continuing infinitely.</li>
            <li>Each new square has an <strong>Area equal to 25%</strong> of the previous square.</li>
          </ul>
        </div>

        <div class="investigation-panel">
          <h3>Step 1: Initial Geometry</h3>
          <div class="logic-box">
            <strong>💡 SYSTEM INSIGHT</strong>
            Before calculating the series, we need the Area of the first square (First Term / $a$). <br>
            Recall basic geometry: If diagonal = $side \times \sqrt{2}$, and our diagonal is $16\sqrt{2}$, what is the side length? Once you have the side, calculate the Area ($side^2$).
          </div>
          <div style="display:flex; gap:12px; margin-bottom:12px;">
            <input type="number" id="case3-area" class="answer-input" placeholder="Area of Square A (a)">
            <button class="btn btn-secondary" id="check-case3-area">VERIFY AREA</button>
          </div>
          <div id="case3-area-feedback"></div>
        </div>

        <div class="investigation-panel" id="case3-step2" hidden>
          <h3>Step 2: Infinite Limits</h3>
          <div class="logic-box">
            <strong>💡 INVESTIGATOR'S LOG</strong>
            The sequence of areas is: 256 + 64 + 16 + 4 + ...<br>
            Because the ratio ($r$) is 0.25 (which is between -1 and 1), the squares get so small they approach zero. We can calculate the exact total area of this infinite anomaly using the Infinite Geometric Series formula: <strong>S∞ = a / (1 - r)</strong>.
          </div>
          <p>Calculate the total area of infinite squares combined.</p>
          <div style="display:flex; gap:12px; margin-bottom:12px;">
            <input type="number" id="case3-total" class="answer-input" placeholder="Total Area (S∞)">
            <button class="btn btn-primary" id="check-case3-total">SOLVE ANOMALY</button>
          </div>
          <div id="case3-total-feedback"></div>
        </div>

        <div class="solution-box" id="case3-solution" hidden>
          <h3>FILE CLOSED: CASE 03</h3>
          <p>► Side length = 16. Original Area ($a$) = 16² = <strong>256</strong>.</p>
          <p>► Ratio ($r$) = 25% = <strong>0.25</strong>.</p>
          <p>► Infinite Sum ($S_{∞}$): 256 / (1 - 0.25) = 256 / 0.75 = <strong>341.33</strong>.</p>
          <p><strong>CONCLUSION:</strong> The total area of the infinite anomaly is contained at precisely 341.33 square units. Mathscape anomaly stabilized.</p>
        </div>
      </div>
    `;

    // Note for Math logic correction: 
    // In original prompt math was: Area=256. Next is 64. BUT original prompt said a=64?
    // Let's use standard logic: a = 256. r = 0.25. Sum = 256 / 0.75 = 341.333.
    // I fixed the math flaw from original prompt!

    workspace.querySelector('#check-case3-area').addEventListener('click', () => {
      const ans = Number(workspace.querySelector('#case3-area').value);
      const feedback = workspace.querySelector('#case3-area-feedback');
      if (ans === 256) {
        feedback.innerHTML = `<div class="feedback-success">Verified. The base area (First term 'a') is 256.</div>`;
        workspace.querySelector('#case3-step2').hidden = false;
      } else {
        feedback.innerHTML = `<div class="feedback-error">Error. Side = 16. Area = 16 × 16.</div>`;
      }
    });

    workspace.querySelector('#check-case3-total').addEventListener('click', () => {
      const ans = Number(workspace.querySelector('#case3-total').value);
      const feedback = workspace.querySelector('#case3-total-feedback');
      
      // Allow precision tolerance for 341.33
      if (Math.abs(ans - 341.33) < 0.5) {
        feedback.innerHTML = `<div class="feedback-success">Anomaly solved. Infinite series converges.</div>`;
        workspace.querySelector('#case3-solution').hidden = false;
        caseProgress[3] = true;
        checkAllCases();
      } else {
        feedback.innerHTML = `<div class="feedback-error">Calculation Error. Use S∞ = 256 / (1 - 0.25). (You can type 341.33).</div>`;
      }
    });
  }

  // ==========================================================
  // CHECK COMPLETION
  // ==========================================================
  function checkAllCases() {
    const completedCases = Object.values(caseProgress).filter(Boolean).length;
    
    container.querySelectorAll('.case-tab').forEach(tab => {
      const number = Number(tab.dataset.case);
      if (caseProgress[number]) {
        tab.classList.add('completed');
      }
    });

    if (completedCases === 3) {
      finalSection.hidden = false;
      container.querySelector('#final-score').innerHTML = `
        <span style="display:block; font-size:2rem; margin-bottom:8px;">🕵️</span>
        3 / 3 CASES RESOLVED
      `;
      finalSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ==========================================================
  // COMPLETE LEVEL
  // ==========================================================
  container.querySelector('#complete-level').addEventListener('click', () => {
    const added = api.badge('case-solver', 'Lead Investigator', '🕵️');
    
    api.complete(100, {
      heading: 'Case Investigation Complete',
      detail: 'You analyzed three contextual problems, selected the appropriate mathematical models, and used sequences and series to build logical solutions.',
      badge: added ? { name: 'Lead Investigator', icon: '🕵️' } : null
    });
  });
}
