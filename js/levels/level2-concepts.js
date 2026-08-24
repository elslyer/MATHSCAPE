// level2-concepts.js
// Core concepts accordion + formula builder mini-game.

import {
  conceptSections,
  firstTerms,
  commonDifferences,
  positions,
  acceptedFormulas
} from '../data/concepts.js';


export function mount(container, api) {

  let sectionsOpened = new Set();

  const formulas = [];

  container.innerHTML = `

    <!-- ==============================
         CORE CONCEPTS
    =============================== -->

    <div class="card">

      <h3>
        Understanding the Formula
      </h3>

      <p>
        Expand each concept to understand how a sequence
        can be transformed into a mathematical formula.
      </p>

      <div id="accordion"></div>

    </div>


    <!-- ==============================
         FORMULA BUILDER
    =============================== -->

    <div class="card">

      <h3>
        Formula Builder
      </h3>

      <p>
        Use the information from a sequence to construct
        its general formula. Identify the first term,
        the common difference, and the position of the term.
      </p>


      <div class="formula-builder">

        <div class="formula-input-group">

          <label>
            First Term
          </label>

          <select id="sel-first-term"></select>

        </div>


        <div class="formula-input-group">

          <label>
            Common Difference
          </label>

          <select id="sel-difference"></select>

        </div>


        <div class="formula-input-group">

          <label>
            Term Position
          </label>

          <select id="sel-position"></select>

        </div>


        <button
          class="btn btn-secondary"
          id="btn-build-formula"
        >
          BUILD FORMULA
        </button>

      </div>


      <div
        class="formula-list"
        id="formula-list"
      ></div>


      <div
        style="
          margin-top:16px;
          display:flex;
          gap:10px;
          align-items:center;
        "
      >

        <button
          class="btn btn-primary"
          id="btn-validate-formulas"
        >
          VALIDATE MY FORMULA
        </button>

        <span
          id="builder-hint"
          style="
            color:var(--text-2);
            font-size:0.85rem;
          "
        ></span>

      </div>


      <div
        id="builder-result"
        style="margin-top:14px;"
      ></div>

    </div>

  `;


  // ==========================================================
  // ACCORDION
  // ==========================================================

  const accordion =
    container.querySelector('#accordion');


  conceptSections.forEach(sec => {

    const item =
      document.createElement('div');


    item.className =
      'accordion-item';


    item.innerHTML = `

      <div class="accordion-head">

        <span>
          ${sec.title}
        </span>

        <span class="chev">
          ▾
        </span>

      </div>


      <div class="accordion-body">

        <p>
          ${sec.body}
        </p>

      </div>

    `;


    item
      .querySelector('.accordion-head')
      .addEventListener('click', () => {

        item.classList.toggle('open');

        sectionsOpened.add(sec.id);

        updateHint();

      });


    accordion.appendChild(item);

  });



  // ==========================================================
  // FORMULA BUILDER
  // ==========================================================

  const selFirstTerm =
    container.querySelector('#sel-first-term');


  const selDifference =
    container.querySelector('#sel-difference');


  const selPosition =
    container.querySelector('#sel-position');


  // First term options

  firstTerms.forEach(value => {

    const opt =
      document.createElement('option');

    opt.value = value;

    opt.textContent = value;

    selFirstTerm.appendChild(opt);

  });


  // Common difference options

  commonDifferences.forEach(value => {

    const opt =
      document.createElement('option');

    opt.value = value;

    opt.textContent = value;

    selDifference.appendChild(opt);

  });


  // Position options

  positions.forEach(value => {

    const opt =
      document.createElement('option');

    opt.value = value;

    opt.textContent = value;

    selPosition.appendChild(opt);

  });



  const formulaListEl =
    container.querySelector('#formula-list');


  const hintEl =
    container.querySelector('#builder-hint');


  const resultEl =
    container.querySelector('#builder-result');


  const validateBtn =
    container.querySelector(
      '#btn-validate-formulas'
    );



  // ==========================================================
  // BUILD FORMULA
  // ==========================================================

  container
    .querySelector('#btn-build-formula')
    .addEventListener('click', () => {


      const firstTerm =
        Number(selFirstTerm.value);


      const difference =
        Number(selDifference.value);


      const position =
        Number(selPosition.value);


      const formula = {

        firstTerm,

        difference,

        position,

        expression:
          difference === 0
            ? `Uₙ = ${firstTerm}`
            : `Uₙ = ${firstTerm} + (${position} - 1)(${difference})`

      };


      formulas.push(formula);


      renderFormulas();

      updateHint();

    });




  // ==========================================================
  // RENDER FORMULAS
  // ==========================================================

  function renderFormulas() {

    formulaListEl.innerHTML = '';


    formulas.forEach((formula, i) => {

      const chip =
        document.createElement('div');


      chip.className =
        'formula-chip';


      chip.innerHTML = `

        <div class="formula-expression">

          ${formula.expression}

        </div>


        <div class="formula-detail">

          First term: ${formula.firstTerm}

          &nbsp; |

          Common difference: ${formula.difference}

          &nbsp; |

          Position: ${formula.position}

        </div>


        <button
          class="remove-btn"
          title="Remove"
        >
          ✕
        </button>

      `;


      chip
        .querySelector('.remove-btn')
        .addEventListener('click', () => {

          formulas.splice(i, 1);

          renderFormulas();

          updateHint();

        });


      formulaListEl.appendChild(chip);

    });

  }




  // ==========================================================
  // UPDATE HINT
  // ==========================================================

  function updateHint() {

    hintEl.textContent =
      `${sectionsOpened.size}/${conceptSections.length} concepts explored · ${formulas.length} formula(s) built.`;

  }




  // ==========================================================
  // FLASH MESSAGE
  // ==========================================================

  function flashHint(msg) {

    hintEl.textContent = msg;

    hintEl.style.color =
      'var(--danger)';


    setTimeout(() => {

      hintEl.style.color =
        'var(--text-2)';

      updateHint();

    }, 1800);

  }




  // ==========================================================
  // VALIDATE FORMULA
  // ==========================================================

  validateBtn.addEventListener('click', () => {


    if (sectionsOpened.size < conceptSections.length) {

      resultEl.innerHTML = `

        <p style="color:var(--danger)">

          Explore all core concepts before validating
          your formula.

        </p>

      `;

      return;

    }



    if (formulas.length < 1) {

      resultEl.innerHTML = `

        <p style="color:var(--danger)">

          Build at least one formula before validating.

        </p>

      `;

      return;

    }



    let correctCount = 0;


    formulas.forEach(formula => {

      const key =
        `${formula.firstTerm}|${formula.difference}`;


      formula.valid =
        acceptedFormulas.has(key);


      if (formula.valid) {

        correctCount++;

      }

    });



    renderFormulasWithValidity();



    // ========================================================
    // SCORING
    // ========================================================

    const conceptsScore =
      Math.min(
        50,
        sectionsOpened.size *
        (50 / conceptSections.length)
      );


    const formulaScore =
      Math.min(
        50,
        correctCount * 25
      );


    const score =
      Math.round(
        conceptsScore +
        formulaScore
      );



    let badge = null;


    if (
      correctCount > 0 &&
      sectionsOpened.size === conceptSections.length
    ) {

      const added =
        api.badge(
          'formula-finder',
          'Formula Finder',
          ''
        );


      if (added) {

        badge = {

          name:
            'Formula Finder',

          icon:
            ''

        };

      }

    }



    api.complete(score, {

      heading:

        correctCount > 0
          ? 'Formula discovered'
          : 'Formula needs revision',


      detail:

        `Concepts explored ${sectionsOpened.size}/${conceptSections.length} · ` +
        `Valid formulas ${correctCount}/${formulas.length}. ` +
        `You are learning how patterns can be transformed into general formulas.`,

      badge

    });

  });




  // ==========================================================
  // VALIDITY DISPLAY
  // ==========================================================

  function renderFormulasWithValidity() {

    [
      ...formulaListEl.children
    ]
    .forEach((chip, i) => {

      chip.classList.toggle(
        'valid',
        formulas[i].valid
      );


      chip.classList.toggle(
        'invalid',
        !formulas[i].valid
      );

    });

  }

}
