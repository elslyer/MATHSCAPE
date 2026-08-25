// ==========================================================
// MATHSCAPE — LEVEL 4
// CASE SOLVER
// Applications of Sequences and Series
// ==========================================================

export function mount(container, api) {
  let currentCase = 1;
  let finalScore = 100; // Initial max score
  const caseProgress = { 1: false, 2: false, 3: false };

  // Helper to deduct score for wrong answers
  function deductScore(points) {
    finalScore = Math.max(0, finalScore - points);
  }

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
        font-size: 0.95rem;
        line-height: 1.5;
      }
      .logic-box strong { color: var(--accent); font-family: var(--font-mono); display: block; margin-bottom: 8px; }
      .formula-highlight {
        background: var(--bg-2);
        padding: 12px;
        border-radius: var(--radius-sm);
        text-align: center;
        font-family: var(--font-mono);
        font-size: 1.1rem;
        font-weight: bold;
        color: var(--accent-3);
        border: 1px dashed var(--border-bright);
        margin: 12px 0;
      }

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
        transition: all 0.3s;
      }
      .answer-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
      .answer-input:disabled { opacity: 0.9; cursor: not-allowed; }
      .answer-input.correct-autofill { border-color: var(--success); background: #dcfce7; color: var(--success); }
      .answer-input.wrong-autofill { border-color: var(--danger); background: #fee2e2; color: var(--danger); font-weight:bold; }
      
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
      .choice-btn:hover:not(:disabled) { border-color: var(--accent); background: var(--bg-2); }
      .choice-btn:disabled { opacity: 0.7; cursor: not-allowed; }
      .choice-btn.correct { background: #dcfce7 !important; border-color: #22c55e !important; color: #15803d !important; opacity: 1; }
      .choice-btn.wrong { background: #fee2e2 !important; border-color: #ef4444 !important; color: #b91c1c !important; }

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
      .feedback-success { background: #dcfce7; color: #15803d; padding: 12px 16px; border-radius: var(--radius-sm); border-left: 4px solid #22c55e; margin-top: 12px; font-weight: bold; animation: fadeIn 0.3s; }
      .feedback-error { background: #fee2e2; color: #b91c1c; padding: 12px 16px; border-radius: var(--radius-sm); border-left: 4px solid #ef4444; margin-top: 12px; font-weight: bold; animation: fadeIn 0.3s; }
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
        
        <div id="final-score-display" style="margin: 24px 0; font-family:var(--font-mono); font-size:1.2rem; color:var(--accent);"></div>

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
      // Allow switching only if we want them to browse freely.
      // However, their answers in other tabs will reset if they haven't finished.
      // That's fine for this interactive module.
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

        <div class="investigation-panel">
          <h3>Step 1: Formulate a Strategy</h3>
          <div class="logic-box">
            <strong>💡 INVESTIGATOR'S LOG</strong>
            To find out if 1,350 people is enough, we first need to determine the <em>maximum capacity</em> of the building.<br><br>
            We are not simply looking for the number of seats in the 25<sup>th</sup> row (<strong>U<sub>25</sub></strong>). We need to calculate the <strong>total number of seats across all 25 rows</strong>:
            <div class="formula-highlight">
              S<sub>25</sub> = U<sub>1</sub> + U<sub>2</sub> + U<sub>3</sub> + ... + U<sub>25</sub>
            </div>
          </div>
          <p>What mathematical formula is required to calculate the total capacity?</p>
          <div class="choice-grid">
            <button class="choice-btn concept-choice" data-answer="wrong">Arithmetic Sequence (U<sub>n</sub>)</button>
            <button class="choice-btn concept-choice" data-answer="correct">Arithmetic Series (S<sub>n</sub>)</button>
            <button class="choice-btn concept-choice" data-answer="wrong">Geometric Series (S<sub>n</sub>)</button>
          </div>
          <div id="case1-concept-feedback"></div>
        </div>

        <div class="investigation-panel" id="case1-step2" hidden>
          <h3>Step 2: Execute Calculation</h3>
          <p>Using the formula <strong>S<sub>n</sub> = n/2 [2a + (n − 1)d]</strong>, calculate the TOTAL capacity of the venue.</p>
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
          <p>► Total Capacity (S<sub>25</sub>): 12.5 × [40 + 96] = <strong>1,700 seats</strong>.</p>
          <p>► Minimum Target: 80% × 1,700 = <strong>1,360 spectators</strong>.</p>
          <p>► Actual Attendance: 1,350 spectators.</p>
          <p><strong>CONCLUSION:</strong> The event fell short by 10 spectators. Loss incurred.</p>
        </div>
      </div>
    `;

    // Step 1
    const conceptBtns = workspace.querySelectorAll('.concept-choice');
    conceptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        conceptBtns.forEach(b => b.disabled = true); // Lock all buttons
        
        const feedback = workspace.querySelector('#case1-concept-feedback');
        if (btn.dataset.answer === 'correct') {
          btn.classList.add('correct');
          feedback.innerHTML = `<div class="feedback-success">Correct. We need the sum (Series), and the seats grow by a constant addition (+4), meaning it is Arithmetic.</div>`;
        } else {
          deductScore(10);
          btn.classList.add('wrong');
          workspace.querySelector('[data-answer="correct"]').classList.add('correct');
          feedback.innerHTML = `<div class="feedback-error">Incorrect analysis. (-10 pts)<br>The correct answer is <strong>Arithmetic Series (S<sub>n</sub>)</strong> because we are looking for the total sum of all rows.</div>`;
        }
        workspace.querySelector('#case1-step2').hidden = false;
      });
    });

    // Step 2
    const checkTotalBtn = workspace.querySelector('#check-case1-total');
    checkTotalBtn.addEventListener('click', () => {
      const input = workspace.querySelector('#case1-total');
      const ans = Number(input.value);
      const feedback = workspace.querySelector('#case1-total-feedback');
      
      input.disabled = true;
      checkTotalBtn.disabled = true;

      if (ans === 1700) {
        input.classList.add('correct-autofill');
        feedback.innerHTML = `<div class="feedback-success">Calculation verified. Maximum capacity is 1,700 seats.</div>`;
      } else {
        deductScore(10);
        input.value = 1700; // Autofill with correct answer
        input.classList.add('wrong-autofill');
        feedback.innerHTML = `<div class="feedback-error">Calculation Error. (-10 pts)<br>Substituting a=20, d=4, n=25 yields S<sub>25</sub> = 1,700 seats.</div>`;
      }
      workspace.querySelector('#case1-step3').hidden = false;
    });

    // Step 3
    const finalBtns = workspace.querySelectorAll('.final-choice');
    finalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        finalBtns.forEach(b => b.disabled = true);
        
        const feedback = workspace.querySelector('#case1-final-feedback');
        if (btn.dataset.result === 'loss') {
          btn.classList.add('correct');
          feedback.innerHTML = `<div class="feedback-success">Investigation successful. Conclusion defended.</div>`;
        } else {
          deductScore(10);
          btn.classList.add('wrong');
          workspace.querySelector('[data-result="loss"]').classList.add('correct');
          feedback.innerHTML = `<div class="feedback-error">Incorrect deduction. (-10 pts)<br>80% of 1700 is 1360. Since 1350 is less than 1360, the target was NOT reached.</div>`;
        }
        
        workspace.querySelector('#case1-solution').hidden = false;
        caseProgress[1] = true;
        checkAllCases();
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
            <li>The construction was stopped exactly after the <strong>10<sup>th</sup> row</strong>.</li>
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
            Since they only built up to the 10<sup>th</sup> row, we need to calculate the sum of the first 10 rows (<strong>S<sub>10</sub></strong>).
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
          <p>► Used glasses (S<sub>10</sub>): a = 12, d = 3. Sum = 5 × [24 + 27] = <strong>255 glasses</strong>.</p>
          <p>► Remaining in box: 450 - 255 = <strong>195 glasses</strong>.</p>
          <p>► VIP Demand: 200 glasses.</p>
          <p><strong>CONCLUSION:</strong> 195 < 200. The committee is short by 5 glasses.</p>
        </div>
      </div>
    `;

    // Step 1
    const checkUsedBtn = workspace.querySelector('#check-case2-used');
    checkUsedBtn.addEventListener('click', () => {
      const input = workspace.querySelector('#case2-used');
      const ans = Number(input.value);
      const feedback = workspace.querySelector('#case2-used-feedback');
      
      input.disabled = true;
      checkUsedBtn.disabled = true;

      if (ans === 255) {
        input.classList.add('correct-autofill');
        feedback.innerHTML = `<div class="feedback-success">Verified. The tower consumed 255 glasses.</div>`;
      } else {
        deductScore(10);
        input.value = 255;
        input.classList.add('wrong-autofill');
        feedback.innerHTML = `<div class="feedback-error">Error (-10 pts).<br> Calculating S<sub>10</sub> with a=12 and d=3 results in 255 glasses used.</div>`;
      }
      workspace.querySelector('#case2-step2').hidden = false;
    });

    // Step 2
    const vipBtns = workspace.querySelectorAll('.vip-choice');
    vipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        vipBtns.forEach(b => b.disabled = true);
        
        const feedback = workspace.querySelector('#case2-vip-feedback');
        if (btn.dataset.answer === 'short') {
          btn.classList.add('correct');
          feedback.innerHTML = `<div class="feedback-success">Conclusion defended. They are exactly 5 glasses short.</div>`;
        } else {
          deductScore(10);
          btn.classList.add('wrong');
          workspace.querySelector('[data-answer="short"]').classList.add('correct');
          feedback.innerHTML = `<div class="feedback-error">Incorrect deduction (-10 pts).<br> 450 brought - 255 used = 195 remaining. 195 is exactly 5 short of 200.</div>`;
        }
        
        workspace.querySelector('#case2-solution').hidden = false;
        caseProgress[2] = true;
        checkAllCases();
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
        <div class="case-image-container">
  <img
    src="assets/Case-03.png"
    alt="The Infinite Square Investigation"
    class="case-image"
  >
</div>
        <div class="case-story">
          <p>A geometric anomaly has appeared in Mathscape: an infinitely generating square.</p>
          <ul style="margin-top:10px;">
            <li>The original Square ABCD has a diagonal length of <strong>16&radic;2 units</strong>.</li>
            <li>A new Square EFGH is spawned inside it, then Square HIJD inside EFGH, continuing infinitely.</li>
            <li>Each new square has an <strong>Area equal to 25%</strong> of the previous square.</li>
          </ul>
        </div>

        <div class="investigation-panel">
          <h3>Step 1: Initial Geometry</h3>
          <div class="logic-box">
            <strong>💡 SYSTEM INSIGHT</strong>
            Before calculating the series, we need the Area of the first square (First Term / <strong>a</strong>). <br>
            Recall basic geometry: If diagonal = side &times; &radic;2, and our diagonal is 16&radic;2, what is the side length? Once you have the side, calculate the Area (side<sup>2</sup>).
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
            Because the ratio (<strong>r</strong>) is 0.25 (which is between -1 and 1), the squares get so small they approach zero. We can calculate the exact total area of this infinite anomaly using the Infinite Geometric Series formula: 
            <div class="formula-highlight">
              S<sub>&infin;</sub> = a / (1 - r)
            </div>
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
          <p>► Side length = 16. Original Area (a) = 16<sup>2</sup> = <strong>256</strong>.</p>
          <p>► Ratio (r) = 25% = <strong>0.25</strong>.</p>
          <p>► Infinite Sum (S<sub>&infin;</sub>): 256 / (1 - 0.25) = 256 / 0.75 = <strong>341.33</strong>.</p>
          <p><strong>CONCLUSION:</strong> The total area of the infinite anomaly is contained at precisely 341.33 square units. Mathscape anomaly stabilized.</p>
        </div>
      </div>
    `;

    // Step 1
    const checkAreaBtn = workspace.querySelector('#check-case3-area');
    checkAreaBtn.addEventListener('click', () => {
      const input = workspace.querySelector('#case3-area');
      const ans = Number(input.value);
      const feedback = workspace.querySelector('#case3-area-feedback');
      
      input.disabled = true;
      checkAreaBtn.disabled = true;

      if (ans === 256) {
        input.classList.add('correct-autofill');
        feedback.innerHTML = `<div class="feedback-success">Verified. The base area (First term 'a') is 256.</div>`;
      } else {
        deductScore(10);
        input.value = 256;
        input.classList.add('wrong-autofill');
        feedback.innerHTML = `<div class="feedback-error">Error (-10 pts).<br> Side = 16. Area = 16 &times; 16 = 256.</div>`;
      }
      workspace.querySelector('#case3-step2').hidden = false;
    });

    // Step 2
    const checkTotalBtn = workspace.querySelector('#check-case3-total');
    checkTotalBtn.addEventListener('click', () => {
      const input = workspace.querySelector('#case3-total');
      const ans = Number(input.value);
      const feedback = workspace.querySelector('#case3-total-feedback');
      
      input.disabled = true;
      checkTotalBtn.disabled = true;
      
      // Allow precision tolerance for 341.33
      if (Math.abs(ans - 341.33) < 0.5) {
        input.classList.add('correct-autofill');
        feedback.innerHTML = `<div class="feedback-success">Anomaly solved. Infinite series converges.</div>`;
      } else {
        deductScore(10);
        input.value = 341.33;
        input.classList.add('wrong-autofill');
        feedback.innerHTML = `<div class="feedback-error">Calculation Error (-10 pts).<br> S<sub>&infin;</sub> = 256 / 0.75 = 341.33.</div>`;
      }
      
      workspace.querySelector('#case3-solution').hidden = false;
      caseProgress[3] = true;
      checkAllCases();
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
      
      // Show Final Score
      const gradeColor = finalScore >= 80 ? 'var(--success)' : (finalScore >= 50 ? 'var(--accent-2)' : 'var(--danger)');
      container.querySelector('#final-score-display').innerHTML = `
        <span style="display:block; font-size:2.5rem; margin-bottom:8px;">🕵️</span>
        <div style="font-size: 1rem; color: var(--text-1); margin-bottom: 8px;">FINAL INVESTIGATION SCORE</div>
        <div style="font-size: 3rem; font-weight: bold; color: ${gradeColor};">${finalScore} / 100</div>
      `;
      finalSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ==========================================================
  // COMPLETE LEVEL
  // ==========================================================
  container.querySelector('#complete-level').addEventListener('click', () => {
    // Berikan badge hanya jika skor akhir memuaskan (misal >= 80)
    let badge = null;
    if (finalScore >= 80) {
      const added = api.badge('case-solver', 'Lead Investigator', '🕵️');
      if (added) badge = { name: 'Lead Investigator', icon: '🕵️' };
    }
    
    api.complete(finalScore, {
      heading: 'Case Investigation Complete',
      detail: `You analyzed three contextual problems and used mathematical models to build logical solutions. You achieved a score of ${finalScore}.`,
      badge: badge
    });
  });
}
