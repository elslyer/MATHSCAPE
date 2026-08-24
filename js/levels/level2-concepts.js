// ==========================================================
// MATHSCAPE — LEVEL 2: CONCEPTS & PATTERN EXPLORER
// Understanding Arithmetic Sequences
// ==========================================================

export function mount(container, api) {
  const sectionsOpened = new Set();
  let sequenceBuilt = false;

  container.innerHTML = `
    <style>
      /* --- LEVEL 2 SPECIFIC STYLES --- */
      .level-card {
        margin-bottom: 24px;
      }
      
      /* Accordion Adjustments */
      .accordion-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: var(--bg-1);
        font-weight: 600;
        font-family: var(--font-mono);
        font-size: 0.95rem;
        color: var(--text-0);
        cursor: pointer;
        transition: background 0.2s;
      }
      .accordion-head:hover { background: var(--bg-2); }
      .accordion-item.open .accordion-head { color: var(--accent); }
      .accordion-item.open .chev { transform: rotate(180deg); color: var(--accent); }
      .chev { transition: transform 0.3s ease; font-size: 1.2rem; }
      
      /* Builder UI */
      .sequence-builder {
        background: var(--bg-1);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 20px;
        margin-top: 20px;
      }
      .builder-row {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }
      .builder-group {
        flex: 1;
        min-width: 180px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .builder-group label {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        color: var(--text-1);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .builder-group select {
        padding: 12px 16px;
        border-radius: var(--radius-sm);
        border: 2px solid var(--border);
        background: var(--bg-0);
        color: var(--text-0);
        font-family: var(--font-mono);
        font-size: 1rem;
        font-weight: 600;
        outline: none;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .builder-group select:focus, .builder-group select:hover {
        border-color: var(--accent);
        box-shadow: 0 0 0 4px var(--accent-soft);
      }
      
      /* Preview Area */
      .sequence-preview {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 2px dashed var(--border-bright);
        min-height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .sequence-result {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      /* Individual Number Blocks */
      .sequence-term {
        background: var(--bg-0);
        border: 2px solid var(--accent);
        border-radius: var(--radius);
        padding: 12px 16px;
        text-align: center;
        min-width: 80px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        box-shadow: 0 4px 12px rgba(32, 191, 178, 0.15);
        /* Animation properties assigned dynamically */
        opacity: 0;
        transform: translateY(10px) scale(0.9);
      }
      .sequence-term span {
        font-size: 0.75rem;
        color: var(--text-2);
        font-family: var(--font-mono);
        text-transform: uppercase;
      }
      .sequence-term strong {
        font-size: 1.6rem;
        color: var(--text-0);
        font-family: var(--font-mono);
      }
      
      @keyframes popTerm {
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      /* Formula Highlight */
      .sequence-formula {
        margin-top: 24px;
        display: inline-block;
        background: var(--bg-1);
        padding: 12px 24px;
        border-radius: var(--radius);
        font-family: var(--font-mono);
        font-weight: 700;
        color: var(--text-0);
        border-left: 4px solid var(--accent-2);
        box-shadow: var(--shadow);
        opacity: 0;
        animation: popTerm 0.5s forwards;
      }
      .sequence-formula span.var { color: var(--accent); }
      
      /* Empty State */
      .preview-empty {
        color: var(--text-2);
        font-family: var(--font-mono);
        font-size: 0.9rem;
        text-align: center;
        animation: pulseStar 2s infinite alternate;
      }
    </style>

    <div class="card level-card">
      <h3>🧩 Understanding the Pattern</h3>
      <p>Before repairing the Pattern Core, you need to understand how arithmetic sequences work. Expand the data logs below to learn.</p>

      <div id="accordion">
        <div class="accordion-item">
          <div class="accordion-head">
            <span>What Is an Arithmetic Sequence?</span>
            <span class="chev">▾</span>
          </div>
          <div class="accordion-body">
            <p>An arithmetic sequence is a sequence of numbers in which the difference between consecutive terms is always the same.</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-head">
            <span>The First Term (a₁)</span>
            <span class="chev">▾</span>
          </div>
          <div class="accordion-body">
            <p>The first term is the starting number of a sequence. It acts as the anchor point of the pattern and is usually represented by <strong>a₁</strong>.</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-head">
            <span>The Common Difference (d)</span>
            <span class="chev">▾</span>
          </div>
          <div class="accordion-body">
            <p>The common difference is the constant number added or subtracted to move from one term to the next. It dictates the direction and speed of the sequence.</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-head">
            <span>Finding the n-th Term</span>
            <span class="chev">▾</span>
          </div>
          <div class="accordion-body">
            <p>The general formula of an arithmetic sequence is:</p>
            <p style="text-align: center; font-size: 1.2rem; margin: 16px 0;">
              <strong>aₙ = a₁ + (n − 1)d</strong>
            </p>
            <p>This powerful formula allows us to find any term in the sequence without having to calculate every single previous term.</p>
          </div>
        </div>
      </div>
    </div>


    <div class="card level-card">
      <h3>⚙️ Pattern Explorer</h3>
      <p>Choose a starting number and a common difference. Then command the system to generate the sequence.</p>

      <div class="sequence-builder">
        <div class="builder-row">
          <div class="builder-group">
            <label for="sel-first-term">First Term (a₁)</label>
            <select id="sel-first-term">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>

          <div class="builder-group">
            <label for="sel-difference">Common Difference (d)</label>
            <select id="sel-difference">
              <option value="1">+ 1</option>
              <option value="2">+ 2</option>
              <option value="3">+ 3</option>
              <option value="4">+ 4</option>
              <option value="5">+ 5</option>
              <option value="-2">- 2</option>
            </select>
          </div>
        </div>

        <button class="btn btn-primary" id="btn-build-sequence" style="width: 100%;">
          BUILD PATTERN ✦
        </button>
      </div>

      <div id="sequence-preview" class="sequence-preview">
        <div class="preview-empty">Awaiting variables to synthesize pattern...</div>
      </div>
    </div>
  `;

  // =====================================
  // ACCORDION LOGIC
  // =====================================
  const accordionItems = container.querySelectorAll('.accordion-item');

  accordionItems.forEach((item, index) => {
    const head = item.querySelector('.accordion-head');

    head.addEventListener('click', () => {
      // Toggle class for CSS animation
      item.classList.toggle('open');
      
      // If opened, record it in the Set
      if (item.classList.contains('open')) {
        sectionsOpened.add(index);
      }
      
      // Check completion every time an action is made
      checkComplete();
    });
  });

  // =====================================
  // SEQUENCE BUILDER LOGIC
  // =====================================
  const firstTerm = container.querySelector('#sel-first-term');
  const difference = container.querySelector('#sel-difference');
  const preview = container.querySelector('#sequence-preview');
  const btnBuild = container.querySelector('#btn-build-sequence');

  btnBuild.addEventListener('click', () => {
    const a = Number(firstTerm.value);
    const d = Number(difference.value);
    const sequence = [];

    // Calculate first 6 terms
    for (let i = 0; i < 6; i++) {
      sequence.push(a + i * d);
    }

    // Generate HTML for blocks with Staggered Animation Delay
    const sequenceHTML = sequence.map((number, index) => `
      <div class="sequence-term" style="animation: popTerm 0.4s ease forwards ${index * 0.15}s;">
        <span>Term ${index + 1}</span>
        <strong>${number}</strong>
      </div>
    `).join('');

    const operator = d < 0 ? '-' : '+';
    const absD = Math.abs(d);

    // Update UI
    preview.innerHTML = `
      <div class="sequence-result">
        ${sequenceHTML}
        <div class="sequence-term" style="animation: popTerm 0.4s ease forwards 0.9s; border-style: dashed;">
          <span>...</span>
          <strong>∞</strong>
        </div>
      </div>

      <div class="sequence-formula" style="animation-delay: 1.1s;">
        Formula: aₙ = <span class="var">${a}</span> ${operator} <span class="var">${absD}</span>(n − 1)
      </div>
    `;

    // Visual feedback on button
    btnBuild.innerText = "PATTERN GENERATED ✓";
    btnBuild.style.background = "var(--success)";
    btnBuild.style.borderColor = "var(--success)";
    
    setTimeout(() => {
      btnBuild.innerText = "BUILD PATTERN ✦";
      btnBuild.style.background = "";
      btnBuild.style.borderColor = "";
    }, 1500);

    sequenceBuilt = true;
    checkComplete();
  });

  // =====================================
  // LEVEL COMPLETION
  // =====================================
  function checkComplete() {
    // Requires ALL 4 accordion sections opened AND the sequence built
    if (sectionsOpened.size === 4 && sequenceBuilt) {
      
      // Fixed badge icon (was empty, now it's 🔬)
      const added = api.badge('pattern-explorer', 'Pattern Explorer', '🔬');
      let badge = null;

      if (added) {
        badge = {
          name: 'Pattern Explorer',
          icon: '🔬'
        };
      }

      // Finish level using Mathscape API
      api.complete(100, {
        heading: 'Pattern Restored',
        detail: 'You have explored the theoretical concepts and successfully synthesized an arithmetic sequence. The Pattern Core stabilizes further.',
        badge
      });
    }
  }
}
