// level2-concepts.js
// Level 2 — Understanding Arithmetic Sequences

export function mount(container, api) {

  const sectionsOpened = new Set();
  let sequenceBuilt = false;

  container.innerHTML = `

    <div class="card">

      <h3>Understanding the Pattern</h3>

      <p>
        Before repairing the Pattern Core, you need to understand
        how arithmetic sequences work.
      </p>

      <div id="accordion">

        <div class="accordion-item">

          <div class="accordion-head">
            <span>What Is an Arithmetic Sequence?</span>
            <span class="chev">▾</span>
          </div>

          <div class="accordion-body">
            <p>
              An arithmetic sequence is a sequence of numbers in which
              the difference between consecutive terms is always the same.
            </p>
          </div>

        </div>


        <div class="accordion-item">

          <div class="accordion-head">
            <span>The First Term</span>
            <span class="chev">▾</span>
          </div>

          <div class="accordion-body">
            <p>
              The first term is the starting number of a sequence.
              It is usually represented by a₁.
            </p>
          </div>

        </div>


        <div class="accordion-item">

          <div class="accordion-head">
            <span>The Common Difference</span>
            <span class="chev">▾</span>
          </div>

          <div class="accordion-body">
            <p>
              The common difference is the constant number added
              or subtracted to move from one term to the next.
            </p>
          </div>

        </div>


        <div class="accordion-item">

          <div class="accordion-head">
            <span>Finding the n-th Term</span>
            <span class="chev">▾</span>
          </div>

          <div class="accordion-body">
            <p>
              The general formula of an arithmetic sequence is:
            </p>

            <p>
              <strong>aₙ = a₁ + (n − 1)d</strong>
            </p>

            <p>
              This formula allows us to find any term without
              calculating every previous term.
            </p>
          </div>

        </div>

      </div>

    </div>



    <div class="card">

      <h3>Pattern Explorer</h3>

      <p>
        Choose a starting number and a common difference.
        Then generate the sequence.
      </p>


      <div class="sequence-builder">

        <div class="builder-group">

          <label for="sel-first-term">
            First Term (a₁)
          </label>

          <select id="sel-first-term">

            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="12">12</option>

          </select>

        </div>


        <div class="builder-group">

          <label for="sel-difference">
            Common Difference (d)
          </label>

          <select id="sel-difference">

            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="4">+4</option>
            <option value="5">+5</option>
            <option value="-2">-2</option>

          </select>

        </div>


        <button
          class="btn btn-primary"
          id="btn-build-sequence"
        >
          BUILD PATTERN
        </button>

      </div>


      <div
        id="sequence-preview"
        class="sequence-preview"
      ></div>

    </div>

  `;


  // =====================================
  // ACCORDION
  // =====================================

  const accordionItems =
    container.querySelectorAll('.accordion-item');


  accordionItems.forEach((item, index) => {

    const head =
      item.querySelector('.accordion-head');


    head.addEventListener('click', () => {

      item.classList.toggle('open');

      sectionsOpened.add(index);

    });

  });


  // =====================================
  // SEQUENCE BUILDER
  // =====================================

  const firstTerm =
    container.querySelector('#sel-first-term');

  const difference =
    container.querySelector('#sel-difference');

  const preview =
    container.querySelector('#sequence-preview');


  container
    .querySelector('#btn-build-sequence')
    .addEventListener('click', () => {

      const a =
        Number(firstTerm.value);

      const d =
        Number(difference.value);


      const sequence = [];


      for (let i = 0; i < 6; i++) {

        sequence.push(
          a + i * d
        );

      }


      preview.innerHTML = `

        <div class="sequence-result">

          ${sequence.map((number, index) => `

            <div class="sequence-term">

              <span>
                a${index + 1}
              </span>

              <strong>
                ${number}
              </strong>

            </div>

          `).join('')}

        </div>


        <div class="sequence-formula">

          aₙ = ${a} + (${d})(n − 1)

        </div>

      `;


      sequenceBuilt = true;


      checkComplete();

    });


  // =====================================
  // LEVEL COMPLETION
  // =====================================

  function checkComplete() {

    if (
      sectionsOpened.size === 4 &&
      sequenceBuilt
    ) {

      const added =
        api.badge(
          'pattern-explorer',
          'Pattern Explorer',
          ''
        );


      let badge = null;


      if (added) {

        badge = {
          name: 'Pattern Explorer',
          icon: ''
        };

      }


      api.complete(100, {

        heading: 'Pattern Restored',

        detail:
          'You explored every concept and successfully generated an arithmetic sequence.',

        badge

      });

    }

  }

}
