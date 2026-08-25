// ==========================================================
// MATHSCAPE — LEVEL 5: FINAL CHALLENGE
// The Mathscape Trial (Sequences and Series)
// ==========================================================

export function mount(container, api) {
  let finalScore = 100;
  let currentQuestion = 1;
  const totalQuestions = 11;

  function deductScore(points) {
    finalScore = Math.max(0, finalScore - points);
  }

  // =====================================================
  // QUESTION DATA (English Version)
  // =====================================================
  const mcQuestions = [
    {
      id: 1,
      question: `Observe the following number sequence:<br><br><strong style="font-size:1.3rem; color:var(--accent-3);">3, 8, 13, 18, 23, ...</strong><br><br>The pattern of change from one term to the next is ...`,
      options: ['Multiplied by 5', 'Added by 5', 'Subtracted by 5', 'Divided by 5'],
      answer: 1,
      explanation: `The difference between each consecutive term is constant (8 - 3 = 5; 13 - 8 = 5). Therefore, the pattern is <strong>added by 5</strong>.`
    },
    {
      id: 2,
      question: `Given the following four number sequences:<br><br>
        (1) 2, 4, 8, 16, ...<br>
        (2) 5, 10, 15, 20, ...<br>
        (3) 100, 50, 25, 12.5, ...<br>
        (4) 10, 7, 4, 1, ...<br><br>
        Which of the sequences above are <strong>geometric sequences</strong>?`,
      options: ['(1) and (2)', '(2) and (4)', '(1) and (3)', '(3) and (4)'],
      answer: 2,
      explanation: `Sequence (1) has a common ratio of 2 (multiplied by 2). Sequence (3) has a common ratio of 1/2 (divided by 2 or multiplied by 0.5). Both are Geometric sequences.`
    },
    {
      id: 3,
      question: `Given the following arithmetic sequence:<br><br><strong style="font-size:1.3rem; color:var(--accent-3);">45, 38, 31, 24, ...</strong><br><br>The common difference (<strong>d</strong>) of this sequence is ...`,
      options: ['7', '6', '−6', '−7'],
      answer: 3,
      explanation: `The common difference (d) is obtained by subtracting the first term from the second term: d = 38 - 45 = <strong>-7</strong>.`
    },
    {
      id: 4,
      question: `A geometric sequence has the following terms:<br><br><strong style="font-size:1.3rem; color:var(--accent-3);">3, −6, 12, −24, 48, ...</strong><br><br>The common ratio (<strong>r</strong>) of this sequence is ...`,
      options: ['2', '−2', '3', '−3'],
      answer: 1,
      explanation: `The common ratio (r) = -6 ÷ 3 = <strong>-2</strong>. Because the ratio is negative, the signs alternate (positive, negative, positive, ...).`
    },
    {
      id: 5,
      question: `Given the following second-order (quadratic) sequence:<br><br><strong style="font-size:1.3rem; color:var(--accent-3);">2, 3, 5, 8, 12, ...</strong><br><br>The next two terms to continue the sequence are ...`,
      options: ['16 and 20', '17 and 23', '17 and 22', '16 and 21'],
      answer: 1,
      explanation: `The differences increase sequentially: +1, +2, +3, +4. Therefore, the next differences are +5 and +6.<br>12 + 5 = <strong>17</strong>, and then 17 + 6 = <strong>23</strong>.`
    },
    {
      id: 6,
      question: `The most accurate n-th term formula to represent the arithmetic sequence:<br><br><strong style="font-size:1.3rem; color:var(--accent-3);">5, 9, 13, 17, 21, ...</strong><br><br>is ...`,
      options: ['U<sub>n</sub> = 4n + 1', 'U<sub>n</sub> = 4n − 1', 'U<sub>n</sub> = 5n − 1', 'U<sub>n</sub> = 5n + 1'],
      answer: 0,
      explanation: `Given a = 5, d = 4.<br>U<sub>n</sub> = a + (n - 1)d<br>U<sub>n</sub> = 5 + (n - 1)4<br>U<sub>n</sub> = 5 + 4n - 4<br><strong>U<sub>n</sub> = 4n + 1</strong>.`
    },
    {
      id: 7,
      question: `Given the n-th term formula of a geometric sequence:<br><br><strong style="font-size:1.3rem; color:var(--accent-3);">U<sub>n</sub> = 2 &times; 3<sup>(n−1)</sup></strong><br><br>The value of the 6th term (<strong>U<sub>6</sub></strong>) is ...`,
      options: ['243', '486', '729', '1458'],
      answer: 1,
      explanation: `U<sub>6</sub> = 2 &times; 3<sup>(6-1)</sup><br>U<sub>6</sub> = 2 &times; 3<sup>5</sup><br>U<sub>6</sub> = 2 &times; 243 = <strong>486</strong>.`
    },
    {
      id: 8,
      question: `Calculate the sum of the first 15 terms (<strong>S<sub>15</sub></strong>) of the following arithmetic series:<br><br><strong style="font-size:1.3rem; color:var(--accent-3);">4 + 7 + 10 + 13 + ...</strong>`,
      options: ['375', '385', '360', '400'],
      answer: 0,
      explanation: `a = 4, d = 3, n = 15.<br>S<sub>15</sub> = 15/2 &times; [2(4) + 14(3)]<br>S<sub>15</sub> = 15/2 &times; [8 + 42]<br>S<sub>15</sub> = 15/2 &times; 50 = <strong>375</strong>.`
    }
  ];

  const essayQuestions = [
    {
      id: 9,
      type: 'essay',
      question: `Andi wants to calculate the 50th term of the arithmetic sequence: <strong>2, 5, 8, 11, ...</strong><br><br>
        <strong>Method A:</strong> Manually counting and listing one by one until the 50th term.<br>
        <strong>Method B:</strong> Using the formula <strong>U<sub>n</sub> = a + (n - 1)d</strong>.<br><br>
        Compare the effectiveness of both methods and state the final result for U<sub>50</sub>.`,
      keywords: ['efficient', 'fast', 'formula', '149'],
      modelAnswer: `Method B is much more efficient and faster. Method A is prone to human error due to lengthy manual calculations. Using Method B (Formula):<br>a = 2, d = 3, n = 50.<br>U<sub>50</sub> = 2 + 49(3) = 2 + 147 = <strong>149</strong>.`
    },
    {
      id: 10,
      type: 'essay',
      question: `A cable is cut into <strong>6 pieces</strong> whose lengths form a geometric sequence. <br><br>If the shortest piece is <strong>5 cm</strong> and the longest piece is <strong>160 cm</strong>, calculate the original total length of the cable before it was cut (<strong>S<sub>6</sub></strong>).`,
      keywords: ['315', 'ratio', '2'],
      modelAnswer: `a = 5, U<sub>6</sub> = 160.<br>U<sub>6</sub> = a &times; r<sup>5</sup><br>160 = 5 &times; r<sup>5</sup><br>32 = r<sup>5</sup> &rarr; r = 2.<br><br>S<sub>6</sub> = 5(2<sup>6</sup> - 1) / (2 - 1) = 5(64 - 1) = 5 &times; 63 = <strong>315 cm</strong>.`
    },
    {
      id: 11,
      type: 'essay',
      question: `Budi saves money every month. In the first month, he saves <strong>$100</strong>. As his income grows, he decides to increase his savings by <strong>$15</strong> more than the previous month for each subsequent month.<br><br>Calculate Budi's total savings after exactly <strong>2 years</strong> (24 months).`,
      keywords: ['6540', '6,540', 'arithmetic'],
      modelAnswer: `n = 24, a = 100, d = 15.<br>S<sub>24</sub> = 24/2 &times; [2(100) + 23(15)]<br>S<sub>24</sub> = 12 &times; [200 + 345]<br>S<sub>24</sub> = 12 &times; 545 = <strong>$6,540</strong>.`
    }
  ];

  // =====================================================
  // CSS & LAYOUT
  // =====================================================
  container.innerHTML = `
    <style>
      .final-trial-stage { font-family: var(--font-sans); color: var(--text-0); padding-bottom: 60px; }
      
      /* Header Tracker */
      .trial-header { position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); padding: 16px 24px; border-bottom: 2px solid var(--accent); z-index: 100; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 15px rgba(32,191,178,0.1); border-radius: 0 0 12px 12px; margin-bottom: 30px;}
      .trial-header strong { font-family: var(--font-mono); color: var(--accent-3); font-size: 1.1rem; }
      .trial-header span { font-weight: bold; color: var(--text-1); }

      /* Hero Section */
      .hero-box { text-align: center; margin-bottom: 40px; }
      .hero-box h1 { font-family: var(--font-mono); font-size: 2.5rem; color: var(--text-0); margin-bottom: 12px; }
      .hero-box p { color: var(--text-1); font-size: 1.1rem; max-width: 600px; margin: 0 auto; }

      /* Question Cards */
      .q-card { background: var(--bg-0); border: 2px solid var(--border); border-top: 5px solid var(--accent-3); border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: var(--shadow); animation: slideUp 0.5s ease; transition: all 0.3s; }
      .q-card.essay-mode { border-top-color: var(--accent-2); }
      .q-card.disabled { opacity: 0.6; pointer-events: none; border-color: var(--border-bright); }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

      .q-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 20px; }
      .q-num { background: var(--accent-3); color: #fff; font-family: var(--font-mono); font-weight: bold; font-size: 1.2rem; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; flex-shrink: 0; }
      .essay-mode .q-num { background: var(--accent-2); }
      .q-text { font-size: 1.1rem; line-height: 1.6; }

      /* MCQ Options */
      .mc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
      @media(max-width: 600px){ .mc-grid { grid-template-columns: 1fr; } }
      .mc-btn { background: var(--bg-1); border: 2px solid var(--border-bright); padding: 16px; border-radius: 8px; font-family: var(--font-mono); font-size: 1rem; text-align: left; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 12px; }
      .mc-btn:hover:not(:disabled) { border-color: var(--accent); background: var(--bg-2); }
      .mc-btn .letter { background: var(--border); width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-weight: bold; }
      .mc-btn.correct { background: #dcfce7; border-color: #22c55e; color: #15803d; }
      .mc-btn.correct .letter { background: #22c55e; color: #fff; }
      .mc-btn.wrong { background: #fee2e2; border-color: #ef4444; color: #b91c1c; }
      .mc-btn.wrong .letter { background: #ef4444; color: #fff; }

      /* Essay Area */
      .essay-textarea { width: 100%; height: 120px; padding: 16px; font-family: var(--font-sans); font-size: 1rem; border: 2px solid var(--border-bright); border-radius: 8px; resize: vertical; margin-top: 16px; outline: none; transition: border 0.3s; }
      .essay-textarea:focus { border-color: var(--accent-2); }

      /* Feedback & Explanation Box */
      .explanation-box { background: #f8fafc; border-left: 4px solid var(--accent); padding: 20px; border-radius: 0 8px 8px 0; margin-top: 24px; font-size: 0.95rem; animation: fadeIn 0.4s ease; display: none; }
      .explanation-box.success { border-color: #22c55e; background: #f0fdf4; }
      .explanation-box.error { border-color: #ef4444; background: #fef2f2; }
      .explanation-title { font-family: var(--font-mono); font-weight: bold; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; }
      
      .next-action-btn { width: 100%; margin-top: 20px; display: none; }

      /* Final Score Board */
      .final-board { text-align: center; padding: 40px; background: var(--bg-0); border: 2px solid var(--success); border-radius: 12px; box-shadow: 0 10px 30px rgba(39,174,114,0.15); display: none; animation: slideUp 0.8s ease; }
    </style>

    <div class="final-trial-stage">
      
      <div class="trial-header">
        <strong>THE MATHSCAPE TRIAL</strong>
        <span id="progress-tracker">Question 1 / 11</span>
      </div>

      <div class="hero-box" id="trial-hero">
        <h1>FINAL ASSESSMENT</h1>
        <p>This is the ultimate test. Answer the questions to stabilize the mathematical core. <strong>Warning:</strong> Incorrect analysis will destabilize the core and deduct your score.</p>
      </div>

      <div id="questions-container"></div>
      
      <div class="final-board" id="final-board"></div>

    </div>
  `;

  const qContainer = container.querySelector('#questions-container');
  const allQuestions = [...mcQuestions, ...essayQuestions];

  // =====================================================
  // RENDER QUESTIONS LOGIC
  // =====================================================
  allQuestions.forEach((q, index) => {
    const qNum = index + 1;
    const isEssay = q.type === 'essay';
    const wrapper = document.createElement('div');
    wrapper.className = `q-card ${isEssay ? 'essay-mode' : ''}`;
    wrapper.id = `q-card-${qNum}`;
    wrapper.style.display = qNum === 1 ? 'block' : 'none'; // Only show first

    let contentHTML = `
      <div class="q-header">
        <div class="q-num">${qNum}</div>
        <div class="q-text">${q.question}</div>
      </div>
    `;

    if (!isEssay) {
      // Multiple Choice
      const letters = ['A', 'B', 'C', 'D'];
      contentHTML += `<div class="mc-grid">`;
      q.options.forEach((opt, i) => {
        contentHTML += `
          <button class="mc-btn" data-index="${i}">
            <span class="letter">${letters[i]}</span>
            <span class="text">${opt}</span>
          </button>
        `;
      });
      contentHTML += `</div>`;
    } else {
      // Essay
      contentHTML += `
        <textarea class="essay-textarea" id="essay-input-${qNum}" placeholder="Write your calculation process and final answer here..."></textarea>
        <button class="btn btn-primary" id="submit-essay-${qNum}" style="margin-top:16px; background:var(--accent-2);">SUBMIT ANALYSIS</button>
      `;
    }

    // Explanation Box
    contentHTML += `
      <div class="explanation-box" id="expl-${qNum}">
        <div class="explanation-title" id="expl-title-${qNum}"></div>
        <div class="explanation-text">${isEssay ? q.modelAnswer : q.explanation}</div>
      </div>
      <button class="btn btn-primary btn-large next-action-btn" id="next-btn-${qNum}">
        ${qNum === totalQuestions ? 'FINISH TRIAL 🏆' : 'PROCEED TO NEXT QUESTION &darr;'}
      </button>
    `;

    wrapper.innerHTML = contentHTML;
    qContainer.appendChild(wrapper);

    // =====================================================
    // EVENT LISTENERS PER QUESTION
    // =====================================================
    if (!isEssay) {
      const btns = wrapper.querySelectorAll('.mc-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Disable all
          btns.forEach(b => b.disabled = true);
          const selected = Number(btn.dataset.index);
          const explBox = wrapper.querySelector(`#expl-${qNum}`);
          const explTitle = wrapper.querySelector(`#expl-title-${qNum}`);
          const nextBtn = wrapper.querySelector(`#next-btn-${qNum}`);

          explBox.style.display = 'block';
          nextBtn.style.display = 'block';

          if (selected === q.answer) {
            btn.classList.add('correct');
            explBox.classList.add('success');
            explTitle.innerHTML = `<span style="color:#15803d;">✅ CORRECT ANALYSIS</span>`;
          } else {
            deductScore(5); // Penalty for MCQ
            btn.classList.add('wrong');
            btns[q.answer].classList.add('correct'); // Show correct
            explBox.classList.add('error');
            explTitle.innerHTML = `<span style="color:#b91c1c;">❌ SYSTEM ERROR (-5 Pts)</span> <span style="font-size:0.8rem; color:#64748b;">Correction Applied</span>`;
          }
        });
      });
    } else {
      const submitBtn = wrapper.querySelector(`#submit-essay-${qNum}`);
      submitBtn.addEventListener('click', () => {
        const inputEl = wrapper.querySelector(`#essay-input-${qNum}`);
        const text = inputEl.value.toLowerCase();
        if (text.trim() === '') return; // Prevent empty submission

        inputEl.disabled = true;
        submitBtn.style.display = 'none';

        const explBox = wrapper.querySelector(`#expl-${qNum}`);
        const explTitle = wrapper.querySelector(`#expl-title-${qNum}`);
        const nextBtn = wrapper.querySelector(`#next-btn-${qNum}`);

        // Basic Keyword Check
        let matches = 0;
        q.keywords.forEach(kw => { if (text.includes(kw)) matches++; });
        const ratio = matches / q.keywords.length;

        explBox.style.display = 'block';
        nextBtn.style.display = 'block';

        if (ratio >= 0.5) {
          inputEl.style.borderColor = '#22c55e';
          inputEl.style.backgroundColor = '#f0fdf4';
          explBox.classList.add('success');
          explTitle.innerHTML = `<span style="color:#15803d;">✅ LOGIC ACCEPTED</span> <span style="font-size:0.8rem; color:#64748b;">System Model Answer Below:</span>`;
        } else {
          deductScore(10); // Penalty for Essay
          inputEl.style.borderColor = '#ef4444';
          inputEl.style.backgroundColor = '#fef2f2';
          explBox.classList.add('error');
          explTitle.innerHTML = `<span style="color:#b91c1c;">⚠️ INCOMPLETE LOGIC (-10 Pts)</span> <span style="font-size:0.8rem; color:#64748b;">Review System Model Answer:</span>`;
        }
      });
    }

    // NEXT BUTTON LOGIC
    wrapper.querySelector(`#next-btn-${qNum}`).addEventListener('click', () => {
      wrapper.classList.add('disabled'); // Dim current
      wrapper.querySelector(`#next-btn-${qNum}`).style.display = 'none'; // Hide next btn

      if (qNum < totalQuestions) {
        currentQuestion++;
        container.querySelector('#progress-tracker').textContent = `Question ${currentQuestion} / 11`;
        const nextCard = container.querySelector(`#q-card-${currentQuestion}`);
        nextCard.style.display = 'block';
        
        // Scroll to new question smoothly
        setTimeout(() => {
          nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        showFinalResults();
      }
    });
  });

  // =====================================================
  // FINAL SCORE REVEAL
  // =====================================================
  function showFinalResults() {
    container.querySelector('#trial-hero').style.display = 'none'; // Hide hero to save space
    const board = container.querySelector('#final-board');
    board.style.display = 'block';

    const gradeColor = finalScore >= 80 ? '#15803d' : (finalScore >= 60 ? '#e59a2e' : '#b91c1c');
    let title = finalScore >= 80 ? 'MATHSCAPE CHAMPION' : 'TRIAL COMPLETED';
    let msg = finalScore >= 80 
      ? 'Outstanding work! You have proven your mastery over mathematical patterns, sequences, and series. The core is completely stable.' 
      : 'You survived the trial, but the system recorded several anomalies. Review the explanations to strengthen your logic.';

    board.innerHTML = `
      <div style="font-size: 4rem; margin-bottom: 10px;">${finalScore >= 80 ? '🏆' : '🧩'}</div>
      <h2 style="font-family:var(--font-mono); color:var(--text-0); margin-bottom: 8px;">${title}</h2>
      <p style="color:var(--text-1); margin-bottom: 24px; max-width:500px; margin-left:auto; margin-right:auto;">${msg}</p>
      
      <div style="background: #f8fafc; border: 2px dashed #cbd5e1; padding: 20px; border-radius: 12px; display:inline-block; margin-bottom: 30px;">
        <div style="font-size: 0.9rem; color: var(--text-2); font-weight: bold; letter-spacing: 2px;">FINAL SYSTEM SCORE</div>
        <div style="font-size: 4rem; font-weight: 900; color: ${gradeColor}; line-height: 1;">${finalScore}<span style="font-size:1.5rem; color:var(--text-2);">/100</span></div>
      </div>

      <div>
        <button class="btn btn-primary btn-large" id="claim-victory" style="background:var(--success); border-color:var(--success);">RESTORE MATHSCAPE</button>
      </div>
    `;

    setTimeout(() => {
      board.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);

    board.querySelector('#claim-victory').addEventListener('click', () => {
      let badge = null;
      if (finalScore >= 80) {
        const added = api.badge('mathscape-champion', 'Mathscape Champion', '🏆');
        if (added) badge = { name: 'Mathscape Champion', icon: '🏆' };
      }
      
      api.complete(finalScore, {
        heading: title,
        detail: `You finished the final assessment with a score of ${finalScore}/100.`,
        badge: badge
      });
    });
  }
}
