// ==========================================================
// MATHSCAPE — STAGE 1: PATTERN FINDER
// Interactive learning journey for mathematical sequences
// ==========================================================

export function mount(container, api) {
  let currentMission = 0;
  
  // Sistem Dynamic Scoring
  let finalScore = 100;
  function deductScore(points) {
    finalScore = Math.max(0, finalScore - points);
  }

  const state = {
    mission1Done: false,
    mission2Done: false,
    mission3Done: false,
    mission4Done: false
  };

  // ==========================================================
  // MAIN STAGE LAYOUT & CSS STYLES
  // ==========================================================

  container.innerHTML = `
    <style>
      /* --- GLOBAL STYLES --- */
      .mathscape-stage {
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: #334155;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
      }

      h1, h2, h3 { color: #0f172a; margin-top: 0; }
      
      /* --- BUTTONS --- */
      .btn {
        display: inline-block;
        padding: 12px 24px;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
      }
      .btn-primary {
        background-color: #4f46e5;
        color: white;
        box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
      }
      .btn-primary:hover:not(:disabled) { background-color: #4338ca; transform: translateY(-2px); }
      .btn-large { font-size: 1.2rem; padding: 16px 32px; width: 100%; margin-top: 20px; }
      .btn:disabled, .quiz-opt:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }

      /* --- CARDS & SECTIONS --- */
      .story-card, .challenge-card, .lab-question {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        animation: fadeIn 0.4s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .mission-section {
        margin-top: 60px;
        padding-top: 40px;
        border-top: 2px dashed #cbd5e1;
      }
      .mission-header {
        text-align: center;
        margin-bottom: 30px;
      }
      .mission-number {
        display: inline-block;
        background: #e0e7ff;
        color: #4f46e5;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: bold;
        margin-bottom: 12px;
        letter-spacing: 1px;
      }

      /* --- HERO & ILLUSTRATIONS --- */
      .stage-hero { text-align: center; }
      .stage-subtitle { font-size: 1.2rem; color: #64748b; margin-bottom: 30px; }
      .stage-illustration { margin: 30px 0; border-radius: 12px; overflow: hidden; display: flex; justify-content: center; }
      .stage-illustration-image { max-width: 80%; height: auto; display: block; border-radius: 12px; }

      /* --- VIDEO WRAPPER (Responsive) --- */
      .learning-video { margin: 30px 0; }
      .video-wrapper {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        height: 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      }
      .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      /* --- QUIZ OPTIONS (Buttons) --- */
      .answer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
        margin-top: 16px;
      }
      .quiz-opt {
        padding: 16px;
        font-size: 1.1rem;
        font-weight: bold;
        background: #f8fafc;
        border: 2px solid #cbd5e1;
        border-radius: 8px;
        color: #334155;
        cursor: pointer;
        transition: all 0.2s;
      }
      .quiz-opt:hover:not(:disabled) { border-color: #4f46e5; background: #e0e7ff; color: #4f46e5; }
      .quiz-opt.correct { background: #dcfce7 !important; border-color: #22c55e !important; color: #15803d !important; opacity: 1; }
      .quiz-opt.wrong { background: #fee2e2 !important; border-color: #ef4444 !important; color: #b91c1c !important; }

      /* --- FEEDBACK MESSAGES --- */
      .mission-feedback {
        margin-top: 16px;
        padding: 16px;
        border-radius: 8px;
        font-weight: 500;
        animation: fadeIn 0.3s ease;
      }
      .mission-feedback.success { background-color: #dcfce7; color: #15803d; border-left: 4px solid #22c55e; }
      .mission-feedback.error { background-color: #fee2e2; color: #b91c1c; border-left: 4px solid #ef4444; }
      .mission-feedback strong { display: block; font-size: 1.1rem; margin-bottom: 4px; }
      .mission-feedback p { margin: 0; }

      /* --- STADIUM PATTERN (Visual Bars) --- */
      .stadium-pattern {
        background: #f8fafc;
        padding: 24px;
        border-radius: 12px;
        margin-bottom: 24px;
        text-align: center;
      }
      .stadium-pattern-image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }

      /* --- INPUT FIELDS & AUTOFILL --- */
      .answer-input {
        width: 100%;
        padding: 12px;
        font-size: 1.1rem;
        font-weight: bold;
        text-align: center;
        border: 2px solid #cbd5e1;
        border-radius: 8px;
        margin-bottom: 16px;
        box-sizing: border-box;
        transition: all 0.3s;
      }
      .answer-input:focus { border-color: #4f46e5; outline: none; box-shadow: 0 0 0 3px #e0e7ff; }
      .answer-input:disabled { opacity: 0.9; cursor: not-allowed; }
      .answer-input.correct-autofill { border-color: #22c55e; background: #dcfce7; color: #15803d; }
      .answer-input.wrong-autofill { border-color: #ef4444; background: #fee2e2; color: #b91c1c; }

      .sequence-display {
        font-size: 1.5rem;
        font-weight: bold;
        color: #4f46e5;
        text-align: center;
        margin: 20px 0;
        background: #e0e7ff;
        padding: 16px;
        border-radius: 8px;
        border: 1px dashed #a5b4fc;
      }

      /* --- FLORA DATA --- */
      .flora-data {
        display: flex;
        justify-content: space-between;
        background: #f0fdf4;
        border: 2px solid #bbf7d0;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 24px;
      }
      .flora-data div { text-align: center; }
      .flora-data span { display: block; font-size: 0.8rem; color: #166534; font-weight: bold; }
      .flora-data strong { display: block; font-size: 1.2rem; color: #15803d; }
    </style>

    <div class="mathscape-stage">

      <!-- =====================================
           STAGE HERO
      ====================================== -->
      <section class="stage-hero">
        <h1>PATTERN FINDER</h1>
        <p class="stage-subtitle">The patterns of Mathscape are beginning to disappear.</p>

        <div class="story-card" style="text-align: left;">
          <p>Deep within Mathscape, numbers once followed perfect and predictable rules.</p>
          <p>But something has disturbed the Pattern Core. Sequences are breaking apart, and mathematical order is slowly fading away.</p>
          <p>Your mission is to explore the hidden patterns, uncover their rules, and restore the first piece of mathematical order.</p>
        </div>

        <div class="stage-illustration">
          <img src="./assets/Bunga-Angka.png" alt="Mathematical Pattern" class="stage-illustration-image">
        </div>

        <button class="btn btn-primary btn-large" id="begin-stage">
          BEGIN THE QUEST →
        </button>
      </section>

      <!-- =====================================
           LEARNING SECTION
      ====================================== -->
      <section class="mission-section" id="learning-section" hidden>
        <div class="mission-header">
          <span class="mission-number">DISCOVER</span>
          <h2>Before the Investigation</h2>
        </div>

        <p style="text-align: center;">
          Every mathematical sequence follows a rule.<br>
          Some grow by adding the same value, while others grow by multiplying by the same factor.
        </p>

        <div class="learning-video">
          <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/Tj89FA-d0f8" title="Mathematical Sequences Learning Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>

        <div style="text-align: center;">
          <button class="btn btn-primary btn-large" id="start-mission-1">
            START MISSION 01 →
          </button>
        </div>
      </section>

      <!-- =====================================
           MISSION 1
      ====================================== -->
      <section class="mission-section" id="mission-1" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 01</span>
          <h2>The Stadium Mystery</h2>
        </div>

        <div class="story-card">
          <p class="mission-story">
            A newly built stadium follows a mysterious seating pattern.<br><br>
            The first row contains <strong>12 seats</strong>.
            Your task is to uncover the hidden rule.
          </p>
        </div>

        <div class="stadium-pattern">
          <img src="assets/Sofa-Angka.png" alt="Arithmetic Sequence Stadium" class="stadium-pattern-image">
        </div>

        <!-- Question 1 -->
        <div class="challenge-card">
          <h3>🔍 FIND THE RULE</h3>
          <p>What changes from one row to the next?</p>
          <div class="answer-grid" id="stadium-rule-options">
            <button class="quiz-opt" data-answer="2">+2</button>
            <button class="quiz-opt" data-answer="4">+4</button>
            <button class="quiz-opt" data-answer="multiply2">×2</button>
            <button class="quiz-opt" data-answer="multiply4">×4</button>
          </div>
          <div class="mission-feedback" id="stadium-feedback" style="display:none;"></div>
        </div>

        <!-- Question 2 -->
        <div class="challenge-card" id="stadium-question-2" hidden>
          <h3>🎯 COMPLETE THE PATTERN</h3>
          <div class="sequence-display">12 → 16 → 20 → 24 → ?</div>
          <p style="text-align:center;">What is the next number in this arithmetic sequence?</p>
          <div class="answer-grid" id="stadium-next-options">
            <button class="quiz-opt" data-answer="26">26</button>
            <button class="quiz-opt" data-answer="28">28</button>
            <button class="quiz-opt" data-answer="32">32</button>
          </div>
          <div class="mission-feedback" id="stadium-next-feedback" style="display:none;"></div>
        </div>

        <button class="btn btn-primary btn-large" id="continue-mission-2" hidden>
          CONTINUE TO MISSION 02 →
        </button>
      </section>


      <!-- =====================================
           MISSION 2
      ====================================== -->
      <section class="mission-section" id="mission-2" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 02</span>
          <h2>Sequence Scanner</h2>
        </div>

        <div class="story-card">
          <p>
            The Pattern Scanner can identify different mathematical sequences.<br>
            Analyze each sequence and determine its type.
          </p>
        </div>

        <div id="sequence-scanner"></div>

        <button class="btn btn-primary btn-large" id="continue-mission-3" hidden>
          CONTINUE TO MISSION 03 →
        </button>
      </section>


      <!-- =====================================
           MISSION 3
      ====================================== -->
      <section class="mission-section" id="mission-3" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 03</span>
          <h2>Pattern Laboratory</h2>
        </div>

        <div class="story-card">
          <p>
            Enter the Pattern Laboratory.<br>
            Your task is to identify the hidden mathematical rule behind each sequence.
          </p>
        </div>

        <div class="pattern-lab">
          <div class="lab-question challenge-card">
            <h3>🔬 EXPERIMENT A</h3>
            <div class="sequence-display">5 → 10 → 15 → 20 → ?</div>
            <p style="text-align:center;">What is the common difference?</p>
            <input type="number" id="lab-answer-1" class="answer-input" placeholder="Enter your answer (e.g., 5)" />
            <button class="btn btn-primary" style="width:100%;" id="check-lab-1">CHECK ANSWER</button>
            <div class="mission-feedback" id="lab-feedback-1" style="display:none;"></div>
          </div>

          <div class="lab-question challenge-card" id="lab-question-2" hidden>
            <h3>🔬 EXPERIMENT B</h3>
            <div class="sequence-display">2 → 6 → 18 → 54 → ?</div>
            <p style="text-align:center;">What is the common ratio?</p>
            <input type="number" id="lab-answer-2" class="answer-input" placeholder="Enter your answer" />
            <button class="btn btn-primary" style="width:100%;" id="check-lab-2">CHECK ANSWER</button>
            <div class="mission-feedback" id="lab-feedback-2" style="display:none;"></div>
          </div>
        </div>

        <button class="btn btn-primary btn-large" id="continue-mission-4" hidden>
          CONTINUE TO MISSION 04 →
        </button>
      </section>


      <!-- =====================================
           MISSION 4
      ====================================== -->
      <section class="mission-section" id="mission-4" hidden>
        <div class="mission-header">
          <span class="mission-number">MISSION 04</span>
          <h2>Flora's Growth</h2>
        </div>

        <div class="story-card flora-story">
          <p>
            🌱 Rara has been observing her plant, Flora.<br>
            Each week, she records the number of new leaves.
          </p>
        </div>

        <div class="flora-data">
          <div>
            <span>WEEK 1</span>
            <strong>3 LEAVES</strong>
          </div>
          <div>
            <span>WEEK 2</span>
            <strong>7 LEAVES</strong>
          </div>
          <div>
            <span>WEEK 3</span>
            <strong>11 LEAVES</strong>
          </div>
          <div>
            <span>WEEK 4</span>
            <strong>15 LEAVES</strong>
          </div>
        </div>

        <div class="challenge-card">
          <h3>🌿 ANALYZE THE GROWTH</h3>
          <p>What type of sequence does Flora's growth follow?</p>
          <div class="answer-grid" id="flora-type-options">
            <button class="quiz-opt" data-answer="arithmetic">ARITHMETIC</button>
            <button class="quiz-opt" data-answer="geometric">GEOMETRIC</button>
            <button class="quiz-opt" data-answer="neither">NEITHER</button>
          </div>
          <div class="mission-feedback" id="flora-feedback" style="display:none;"></div>
        </div>

        <div class="challenge-card" id="flora-question-2" hidden>
          <h3>🔍 FIND THE DIFFERENCE</h3>
          <p>What is the common difference in Flora's leaves?</p>
          <div class="answer-grid" id="flora-difference-options">
            <button class="quiz-opt" data-answer="2">+2</button>
            <button class="quiz-opt" data-answer="4">+4</button>
            <button class="quiz-opt" data-answer="8">+8</button>
          </div>
          <div class="mission-feedback" id="flora-difference-feedback" style="display:none;"></div>
        </div>

        <!-- Score Display -->
        <div id="final-score-display" style="text-align:center; margin: 40px 0; display:none;"></div>

        <button class="btn btn-primary btn-large" id="complete-stage" hidden>
          RESTORE THE PATTERN CORE 🏆
        </button>
      </section>

    </div>
  `;

  // ==========================================================
  // ELEMENTS
  // ==========================================================
  const beginStage = container.querySelector('#begin-stage');
  const learningSection = container.querySelector('#learning-section');
  const mission1 = container.querySelector('#mission-1');
  const mission2 = container.querySelector('#mission-2');
  const mission3 = container.querySelector('#mission-3');
  const mission4 = container.querySelector('#mission-4');

  // ==========================================================
  // START STAGE
  // ==========================================================
  beginStage.addEventListener('click', () => {
    learningSection.hidden = false;
    learningSection.scrollIntoView({ behavior: 'smooth' });
  });

  // ==========================================================
  // START MISSION 1
  // ==========================================================
  container.querySelector('#start-mission-1').addEventListener('click', () => {
    mission1.hidden = false;
    mission1.scrollIntoView({ behavior: 'smooth' });
  });

  // ==========================================================
  // MISSION 1 — STADIUM RULE
  // ==========================================================
  const stadiumRuleButtons = container.querySelectorAll('#stadium-rule-options .quiz-opt');

  stadiumRuleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feedback = container.querySelector('#stadium-feedback');
      stadiumRuleButtons.forEach(btn => { btn.disabled = true; });
      feedback.style.display = 'block';

      if (button.dataset.answer === '4') {
        button.classList.add('correct');
        feedback.className = 'mission-feedback success';
        feedback.innerHTML = `<strong>🎉 CLUE DISCOVERED!</strong><p>Each row increases consistently by 4 seats.</p>`;
      } else {
        deductScore(10);
        button.classList.add('wrong');
        container.querySelector('[data-answer="4"]').classList.add('correct');
        feedback.className = 'mission-feedback error';
        feedback.innerHTML = `<strong>❌ NOT QUITE (-10 pts).</strong><p>Compare two consecutive rows (e.g., 16 − 12 = 4). The rule is +4.</p>`;
      }
      container.querySelector('#stadium-question-2').hidden = false;
    });
  });

  // ==========================================================
  // MISSION 1 — NEXT TERM
  // ==========================================================
  const stadiumNextButtons = container.querySelectorAll('#stadium-next-options .quiz-opt');

  stadiumNextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feedback = container.querySelector('#stadium-next-feedback');
      stadiumNextButtons.forEach(btn => { btn.disabled = true; });
      feedback.style.display = 'block';

      if (button.dataset.answer === '28') {
        button.classList.add('correct');
        feedback.className = 'mission-feedback success';
        feedback.innerHTML = `<strong>✅ PATTERN RESTORED!</strong><p>The sequence continues: 12, 16, 20, 24, 28.</p>`;
      } else {
        deductScore(10);
        button.classList.add('wrong');
        container.querySelector('#stadium-next-options [data-answer="28"]').classList.add('correct');
        feedback.className = 'mission-feedback error';
        feedback.innerHTML = `<strong>❌ KEEP INVESTIGATING (-10 pts).</strong><p>The rule is +4, so 24 + 4 = 28.</p>`;
      }

      state.mission1Done = true;
      container.querySelector('#continue-mission-2').hidden = false;
    });
  });

  // ==========================================================
  // START MISSION 2
  // ==========================================================
  container.querySelector('#continue-mission-2').addEventListener('click', () => {
    mission2.hidden = false;
    mission2.scrollIntoView({ behavior: 'smooth' });
    renderSequenceScanner();
  });

  // ==========================================================
  // MISSION 2 — SEQUENCE SCANNER
  // ==========================================================
  function renderSequenceScanner() {
    const scanner = container.querySelector('#sequence-scanner');
    if(scanner.innerHTML !== "") return; 

    const questions = [
      { sequence: '3, 6, 9, 12, ...', answer: 'arithmetic' },
      { sequence: '2, 4, 8, 16, ...', answer: 'geometric' },
      { sequence: '5, 10, 15, 20, ...', answer: 'arithmetic' }
    ];

    let answered = 0;

    questions.forEach((question, index) => {
      const card = document.createElement('div');
      card.className = 'challenge-card';

      card.innerHTML = `
        <div class="sequence-display" style="background:#f8fafc; color:#0f172a;">
          ${question.sequence}
        </div>
        <p style="text-align:center;">Identify the sequence type.</p>
        <div class="answer-grid">
          <button class="quiz-opt q${index}" data-answer="arithmetic">ARITHMETIC</button>
          <button class="quiz-opt q${index}" data-answer="geometric">GEOMETRIC</button>
          <button class="quiz-opt q${index}" data-answer="neither">NEITHER</button>
        </div>
        <div class="mission-feedback" style="display:none;"></div>
      `;

      const buttons = card.querySelectorAll(`.q${index}`);

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          buttons.forEach(btn => { btn.disabled = true; });
          const feedback = card.querySelector('.mission-feedback');
          feedback.style.display = 'block';

          if (button.dataset.answer === question.answer) {
            button.classList.add('correct');
            feedback.className = 'mission-feedback success';
            feedback.innerHTML = '<strong>✅ Correct!</strong> Pattern identified successfully.';
          } else {
            deductScore(5);
            button.classList.add('wrong');
            card.querySelector(`[data-answer="${question.answer}"]`).classList.add('correct');
            feedback.className = 'mission-feedback error';
            feedback.innerHTML = `<strong>❌ Incorrect (-5 pts).</strong> The correct pattern is <strong>${question.answer.toUpperCase()}</strong>.`;
          }

          answered++;
          if (answered === questions.length) {
            state.mission2Done = true;
            container.querySelector('#continue-mission-3').hidden = false;
          }
        });
      });
      scanner.appendChild(card);
    });
  }

  // ==========================================================
  // START MISSION 3
  // ==========================================================
  container.querySelector('#continue-mission-3').addEventListener('click', () => {
    mission3.hidden = false;
    mission3.scrollIntoView({ behavior: 'smooth' });
  });

  // ==========================================================
  // LAB QUESTION 1
  // ==========================================================
  container.querySelector('#check-lab-1').addEventListener('click', (e) => {
    const input = container.querySelector('#lab-answer-1');
    const answer = Number(input.value);
    const feedback = container.querySelector('#lab-feedback-1');

    if (input.value === "") return;

    input.disabled = true;
    e.target.disabled = true;
    feedback.style.display = 'block';

    if (answer === 5) {
      input.classList.add('correct-autofill');
      feedback.className = 'mission-feedback success';
      feedback.innerHTML = `<strong>✅ EXPERIMENT SUCCESSFUL!</strong><p>The common difference is +5.</p>`;
    } else {
      deductScore(10);
      input.value = 5;
      input.classList.add('wrong-autofill');
      feedback.className = 'mission-feedback error';
      feedback.innerHTML = `<strong>❌ TRY AGAIN (-10 pts).</strong><p>Compare two consecutive terms (e.g., 10 − 5). The difference is 5.</p>`;
    }
    container.querySelector('#lab-question-2').hidden = false;
  });

  // ==========================================================
  // LAB QUESTION 2
  // ==========================================================
  container.querySelector('#check-lab-2').addEventListener('click', (e) => {
    const input = container.querySelector('#lab-answer-2');
    const answer = Number(input.value);
    const feedback = container.querySelector('#lab-feedback-2');
    
    if (input.value === "") return;

    input.disabled = true;
    e.target.disabled = true;
    feedback.style.display = 'block';

    if (answer === 3) {
      input.classList.add('correct-autofill');
      feedback.className = 'mission-feedback success';
      feedback.innerHTML = `<strong>✅ EXPERIMENT COMPLETE!</strong><p>The common ratio is 3.</p>`;
    } else {
      deductScore(10);
      input.value = 3;
      input.classList.add('wrong-autofill');
      feedback.className = 'mission-feedback error';
      feedback.innerHTML = `<strong>❌ ANALYZE PATTERN (-10 pts).</strong><p>How do we move from 2 to 6? We multiply by 3.</p>`;
    }
    
    state.mission3Done = true;
    container.querySelector('#continue-mission-4').hidden = false;
  });

  // ==========================================================
  // START MISSION 4
  // ==========================================================
  container.querySelector('#continue-mission-4').addEventListener('click', () => {
    mission4.hidden = false;
    mission4.scrollIntoView({ behavior: 'smooth' });
  });

  // ==========================================================
  // FLORA QUESTION 1
  // ==========================================================
  const floraTypeButtons = container.querySelectorAll('#flora-type-options .quiz-opt');

  floraTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feedback = container.querySelector('#flora-feedback');
      floraTypeButtons.forEach(btn => { btn.disabled = true; });
      feedback.style.display = 'block';

      if (button.dataset.answer === 'arithmetic') {
        button.classList.add('correct');
        feedback.className = 'mission-feedback success';
        feedback.innerHTML = `<strong>✅ CORRECT!</strong><p>Flora's leaves increase by the same amount each week.</p>`;
      } else {
        deductScore(10);
        button.classList.add('wrong');
        container.querySelector('#flora-type-options [data-answer="arithmetic"]').classList.add('correct');
        feedback.className = 'mission-feedback error';
        feedback.innerHTML = `<strong>❌ NOT QUITE (-10 pts).</strong><p>Notice how it increases by addition, not multiplication. It is Arithmetic.</p>`;
      }
      container.querySelector('#flora-question-2').hidden = false;
    });
  });

  // ==========================================================
  // FLORA QUESTION 2
  // ==========================================================
  const floraDifferenceButtons = container.querySelectorAll('#flora-difference-options .quiz-opt');

  floraDifferenceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feedback = container.querySelector('#flora-difference-feedback');
      floraDifferenceButtons.forEach(btn => { btn.disabled = true; });
      feedback.style.display = 'block';

      if (button.dataset.answer === '4') {
        button.classList.add('correct');
        feedback.className = 'mission-feedback success';
        feedback.innerHTML = `<strong>🎉 PATTERN SOLVED!</strong><p>The number of leaves increases by 4 each week.</p>`;
      } else {
        deductScore(10);
        button.classList.add('wrong');
        container.querySelector('#flora-difference-options [data-answer="4"]').classList.add('correct');
        feedback.className = 'mission-feedback error';
        feedback.innerHTML = `<strong>❌ LOOK CLOSER (-10 pts).</strong><p>7 − 3 = 4.</p>`;
      }

      state.mission4Done = true;
      showFinalScore();
    });
  });

  // ==========================================================
  // SHOW FINAL SCORE & COMPLETE STAGE
  // ==========================================================
  function showFinalScore() {
    const scoreDisplay = container.querySelector('#final-score-display');
    const completeBtn = container.querySelector('#complete-stage');
    
    scoreDisplay.style.display = 'block';
    const gradeColor = finalScore >= 80 ? '#15803d' : (finalScore >= 50 ? '#e59a2e' : '#b91c1c');
    
    scoreDisplay.innerHTML = `
      <div style="font-size: 1rem; color: #64748b; margin-bottom: 8px; font-weight:bold;">FINAL INVESTIGATION SCORE</div>
      <div style="font-size: 3rem; font-weight: bold; color: ${gradeColor};">${finalScore} / 100</div>
    `;

    completeBtn.hidden = false;
    completeBtn.scrollIntoView({ behavior: 'smooth' });
  }

  container.querySelector('#complete-stage').addEventListener('click', () => {
    let badge = null;
    if (finalScore >= 80) {
      const added = api.badge('pattern-finder', 'Pattern Finder', '🔍');
      if (added) {
        badge = { name: 'Pattern Finder', icon: '🔍' };
      }
    }

    api.complete(finalScore, {
      heading: 'PATTERN CORE RESTORED!',
      detail: `You have uncovered the hidden rules behind arithmetic and geometric sequences. You achieved a score of ${finalScore}.`,
      badge
    });
  });
}
