// level2-concepts.js
// Core concepts + arithmetic sequence formula builder.

import {
  conceptSections,
  firstTerms,
  commonDifferences,
  positions,
  acceptedFormulas
} from '../data/concepts.js';


export function mount(container, api) {

  const sectionsOpened = new Set();

  container.innerHTML = `

    <!-- ===============================
         CORE CONCEPTS
    ================================ -->

    <div class="card">

      <h3>Core Concepts</h3>

      <p>
        Explore each concept to understand the structure
        of an arithmetic sequence.
      </p>

      <div id="accordion"></div>

    </div>


    <!-- ===============================
         FORMULA BUILDER
    ================================ -->

    <div class="card">

      <h3>Sequence Builder</h3>

      <p>
        Choose a first term and a common difference.
        Then build an arithmetic sequence.
      </p>


      <div class="sequence-builder">

        <div class="builder-group">

          <label for="sel-first-term">
            First Term (a₁)
          </label>

          <select id="sel-first-term"></select>

        </div>


        <div class="builder-group">

          <label for="sel-difference">
            Common Difference (d)
          </label>

          <select id="sel-difference"></select>

        </div>


        <button
          class="btn btn-secondary"
          id="btn-build-sequence"
        >
          Build Sequence
        </button>

      </div>


      <div
        id="sequence-preview"
        class="sequence-preview"
      ></div>


      <div
        class="formula-builder"
        style="margin-top:24px;"
      >

        <h4>
          Build the Formula
        </h4>

        <p>
          Select a first term and common difference
          to test your understanding.
        </p>


        <div class="formula-controls">

          <select id="formula-first"></select>

          <span>
            +
          </span>

          <select id="formula-difference"></select>

          <span>
            (n − 1)
          </span>

        </div>


        <button
          class="btn btn-primary"
          id="btn-validate-formula"
          style="margin-top:16px;"
        >
          Validate Formula
        </button>

      </div>


      <div
        id="builder-result"
        style="margin-top:18px;"
      ></div>

    </div>

  `;


  // =====================================
  // ACCORDION
  // =====================================

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

      });


    accordion.appendChild(item);

  });



  // =====================================
  // FIRST TERM SELECT
  // =====================================

  const selFirst =
    container.querySelector('#sel-first-term');


  firstTerms.forEach(term => {

    const option =
      document.createElement('option');

    option.value = term;

    option.textContent = term;

    selFirst.appendChild(option);

  });



  // =====================================
  // COMMON DIFFERENCE SELECT
  // =====================================

  const selDifference =
    container.querySelector('#sel-difference');


  commonDifferences.forEach(diff => {

    const option =
      document.createElement('option');

    option.value = diff;

    option.textContent =
      diff > 0 ? `+${diff}` : diff;

    selDifference.appendChild(option);

  });



  // =====================================
  // FORMULA SELECTS
  // =====================================

  const formulaFirst =
    container.querySelector('#formula-first');


  firstTerms.forEach(term => {

    const option =
      document.createElement('option');

    option.value = term;

    option.textContent = term;

    formulaFirst.appendChild(option);

  });



  const formulaDifference =
    container.querySelector('#formula-difference');


  commonDifferences.forEach(diff => {

    const option =
      document.createElement('option');

    option.value = diff;

    option.textContent =
      diff > 0 ? diff : diff;

    formulaDifference.appendChild(option);

  });



  // =====================================
  // BUILD SEQUENCE
  // =====================================

  const preview =
    container.querySelector('#sequence-preview');


  container
    .querySelector('#btn-build-sequence')
    .addEventListener('click', () => {

      const a =
        Number(selFirst.value);

      const d =
        Number(selDifference.value);


      const sequence = [];


      for (let i = 0; i < 6; i++) {

        sequence.push(
          a + i * d
        );

      }


      preview.innerHTML = `

        <div class="sequence-result">

          ${sequence
            .map((n, i) => `
              <div class="sequence-term">

                <span class="term-label">
                  a${i + 1}
                </span>

                <strong>
                  ${n}
                </strong>

              </div>
            `)
            .join('')}

        </div>


        <p class="sequence-formula">

          aₙ = ${a} + (${d})(n − 1)

        </p>

      `;

    });



  // =====================================
  // VALIDATE FORMULA
  // =====================================

  const resultEl =
    container.querySelector('#builder-result');


  container
    .querySelector('#btn-validate-formula')
    .addEventListener('click', () => {

      const a =
        Number(formulaFirst.value);

      const d =
        Number(formulaDifference.value);


      const key =
        `${a}|${d}`;


      const isCorrect =
        acceptedFormulas.has(key);


      if (isCorrect) {

        resultEl.innerHTML = `

          <div class="builder-success">

            <h4>
              Formula Validated
            </h4>

            <p>

              You successfully identified a valid
              arithmetic sequence pattern.

            </p>

          </div>

        `;


        const conceptScore =
          (sectionsOpened.size /
            conceptSections.length) * 60;


        const formulaScore = 40;


        const score =
          Math.round(
            conceptScore +
            formulaScore
          );


        let badge = null;


        if (
          sectionsOpened.size ===
          conceptSections.length
        ) {

          const added =
            api.badge(
              'sequence-master',
              'Sequence Master',
              ''
            );


          if (added) {

            badge = {

              name:
                'Sequence Master',

              icon: ''

            };

          }

        }


        api.complete(score, {

          heading:
            'Pattern Discovered',

          detail:
            `You explored ${sectionsOpened.size}/${conceptSections.length} concepts and successfully built a valid arithmetic sequence formula.`,

          badge

        });


      } else {

        resultEl.innerHTML = `

          <div class="builder-error">

            <h4>
              Pattern Not Recognized
            </h4>

            <p>

              Try another combination of first term
              and common difference.

            </p>

          </div>

        `;

      }

    });

}
