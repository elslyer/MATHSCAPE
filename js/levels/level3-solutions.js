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
  // MAIN STAGE
  // ==========================================================

  container.innerHTML = `

    <div class="series-stage">


      <!-- =====================================
           STORY / HERO
      ====================================== -->

      <section
        class="series-hero"
        id="series-hero"
      >

        <div class="stage-label">
          STAGE 03
        </div>


        <h1>
          SERIES MASTER
        </h1>


        <p class="stage-subtitle">
          The patterns have been restored.
          But Mathscape still cannot calculate what they become together.
        </p>


        <div class="story-card">

          <p>
            You have already discovered hidden patterns
            and uncovered the formulas that control them.
          </p>

          <p>
            But a new problem has appeared.
          </p>

          <p>
            Across Mathscape, individual numbers are no longer
            enough. Stadiums cannot calculate their total seats.
            Savings records have become incomplete.
            Forests have lost track of the trees planted across
            every row.
          </p>

          <p>
            The Pattern Core has revealed its next secret:
            numbers become more powerful when they are combined.
          </p>

          <p>
            To restore this part of Mathscape, you must master
            the concept of a <strong>series</strong> —
            the sum of the terms in a sequence.
          </p>

        </div>


        <div class="series-concept">

          <div class="concept-sequence">

            3 + 6 + 9 + 12 + ...

          </div>

          <div class="concept-arrow">

            ↓

          </div>

          <div class="concept-result">

            A SERIES

          </div>

        </div>


        <button
          class="btn btn-primary btn-large"
          id="begin-series"
        >
          ENTER THE ENDLESS VALLEY →
        </button>

      </section>



      <!-- =====================================
           MISSION 1
      ====================================== -->

      <section
        class="mission-section"
        id="mission-1"
        hidden
      >

        <div class="mission-header">

          <span class="mission-number">
            MISSION 01
          </span>

          <h2>
            THE STADIUM SUM
          </h2>

        </div>


        <div class="story-card">

          <p>
            You arrive at the abandoned Mathscape Stadium.
          </p>

          <p>
            The seats are arranged in a pattern, but the
            stadium system can no longer calculate the total.
          </p>

          <p>
            The first row contains 12 seats.
            Each following row adds 4 more seats.
          </p>

        </div>


        <div class="stadium-pattern">

          <div class="stadium-row">
            <span>ROW 1</span>
            <strong>12</strong>
          </div>

          <div class="stadium-row">
            <span>ROW 2</span>
            <strong>16</strong>
          </div>

          <div class="stadium-row">
            <span>ROW 3</span>
            <strong>20</strong>
          </div>

          <div class="stadium-row">
            <span>ROW 4</span>
            <strong>?</strong>
          </div>

        </div>


        <div class="mission-question">

          <h3>
            How many seats are in the fourth row?
          </h3>

          <div class="answer-options">

            <button class="answer-btn" data-answer="20">
              20
            </button>

            <button class="answer-btn" data-answer="24">
              24
            </button>

            <button class="answer-btn" data-answer="28">
              28
            </button>

          </div>

        </div>


        <div
          class="mission-feedback"
          id="mission-1-feedback"
        ></div>

      </section>



      <!-- =====================================
           MISSION 2
      ====================================== -->

      <section
        class="mission-section"
        id="mission-2"
        hidden
      >

        <div class="mission-header">

          <span class="mission-number">
            MISSION 02
          </span>

          <h2>
            THE ARITHMETIC ARCHIVE
          </h2>

        </div>


        <div class="story-card">

          <p>
            Inside the Arithmetic Archive, several records
            have been damaged.
          </p>

          <p>
            Each sequence follows a constant difference.
            Your task is to restore the missing total.
          </p>

        </div>


        <div class="formula-panel">

          <h3>
            Arithmetic Series Formula
          </h3>

          <div class="formula-display">

            Sₙ = n/2 [2a + (n − 1)d]

          </div>

          <p>
            Where a is the first term, d is the common
            difference, and n is the number of terms.
          </p>

        </div>


        <div class="series-challenges">


          <div class="series-question">

            <h4>
              3, 6, 9, 12, ...
            </h4>

            <p>
              Find S₅
            </p>

            <input
              type="number"
              id="arith-1"
              placeholder="Answer"
            >

          </div>


          <div class="series-question">

            <h4>
              8, 12, 16, ...
            </h4>

            <p>
              Find S₁₀
            </p>

            <input
              type="number"
              id="arith-2"
              placeholder="Answer"
            >

          </div>


          <div class="series-question">

            <h4>
              15, 20, 25, ...
            </h4>

            <p>
              Find S₈
            </p>

            <input
              type="number"
              id="arith-3"
              placeholder="Answer"
            >

          </div>


          <div class="series-question">

            <h4>
              2, 4, 6, ...
            </h4>

            <p>
              Find S₂₀
            </p>

            <input
              type="number"
              id="arith-4"
              placeholder="Answer"
            >

          </div>

        </div>


        <button
          class="btn btn-primary"
          id="check-arithmetic"
        >
          RESTORE THE ARCHIVE
        </button>


        <div
          class="mission-feedback"
          id="arith-feedback"
        ></div>

      </section>



      <!-- =====================================
           MISSION 3
      ====================================== -->

      <section
        class="mission-section"
        id="mission-3"
        hidden
      >

        <div class="mission-header">

          <span class="mission-number">
            MISSION 03
          </span>

          <h2>
            THE GEOMETRIC PORTAL
          </h2>

        </div>


        <div class="story-card">

          <p>
            Beyond the Arithmetic Archive stands a portal
            powered by multiplication.
          </p>

          <p>
            Unlike arithmetic patterns, these numbers do not
            grow by adding the same value.
          </p>

          <p>
            Each term is created by multiplying by the same
            ratio.
          </p>

        </div>


        <div class="formula-panel">

          <h3>
            Geometric Series Formula
          </h3>

          <div class="formula-display">

            Sₙ = a(rⁿ − 1)/(r − 1)

          </div>

          <p>
            Where a is the first term and r is the common ratio.
          </p>

        </div>


        <div class="series-challenges">


          <div class="series-question">

            <h4>
              2, 4, 8, 16, ...
            </h4>

            <p>
              Find S₆
            </p>

            <input
              type="number"
              id="geo-1"
              placeholder="Answer"
            >

          </div>


          <div class="series-question">

            <h4>
              3, 6, 12, ...
            </h4>

            <p>
              Find S₅
            </p>

            <input
              type="number"
              id="geo-2"
              placeholder="Answer"
            >

          </div>


          <div class="series-question">

            <h4>
              5, 10, 20, ...
            </h4>

            <p>
              Find S₇
            </p>

            <input
              type="number"
              id="geo-3"
              placeholder="Answer"
            >

          </div>

        </div>


        <button
          class="btn btn-primary"
          id="check-geometric"
        >
          ACTIVATE THE PORTAL
        </button>


        <div
          class="mission-feedback"
          id="geo-feedback"
        ></div>

      </section>



      <!-- =====================================
           MISSION 4
      ====================================== -->

      <section
        class="mission-section"
        id="mission-4"
        hidden
      >

        <div class="mission-header">

          <span class="mission-number">
            MISSION 04
          </span>

          <h2>
            THE SAVINGS VAULT
          </h2>

        </div>


        <div class="story-card">

          <p>
            The Mathscape Treasury has lost its savings record.
          </p>

          <p>
            Rina saved Rp100,000 during the first month.
            Every following month, she increased her savings
            by Rp50,000.
          </p>

          <p>
            Can you reconstruct the total amount?
          </p>

        </div>


        <div class="context-card">

          <h3>
            Rina's Savings Pattern
          </h3>

          <div class="savings-pattern">

            Rp100,000
            →
            Rp150,000
            →
            Rp200,000
            →
            ...

          </div>

        </div>


        <div class="series-question">

          <h3>
            What is the total savings after 12 months?
          </h3>

          <input
            type="number"
            id="saving-12"
            placeholder="Enter amount"
          >

        </div>


        <div class="series-question">

          <h3>
            What is the total savings after 24 months?
          </h3>

          <input
            type="number"
            id="saving-24"
            placeholder="Enter amount"
          >

        </div>


        <button
          class="btn btn-primary"
          id="check-savings"
        >
          UNLOCK THE VAULT
        </button>


        <div
          class="mission-feedback"
          id="saving-feedback"
        ></div>

      </section>



      <!-- =====================================
           MISSION 5
      ====================================== -->

      <section
        class="mission-section"
        id="mission-5"
        hidden
      >

        <div class="mission-header">

          <span class="mission-number">
            FINAL MISSION
          </span>

          <h2>
            THE FOREST RESTORATION
          </h2>

        </div>


        <div class="story-card">

          <p>
            One final region remains incomplete.
          </p>

          <p>
            A farmer is restoring the Mathscape Forest.
            The first row contains 15 trees, and every new
            row contains 5 more trees than the previous one.
          </p>

          <p>
            There are 20 rows in total.
          </p>

        </div>


        <div class="context-card">

          <h3>
            The Tree Pattern
          </h3>

          <div class="tree-pattern">

            15 → 20 → 25 → 30 → ...

          </div>

        </div>


        <div class="mission-question">

          <h3>
            What is the total number of trees?
          </h3>

          <input
            type="number"
            id="forest-answer"
            placeholder="Enter total"
          >

        </div>


        <button
          class="btn btn-primary btn-large"
          id="restore-forest"
        >
          RESTORE MATHSCAPE
        </button>


        <div
          class="mission-feedback"
          id="forest-feedback"
        ></div>

      </section>


      <!-- =====================================
           FINAL SUMMARY
      ====================================== -->

      <section
        class="mission-section"
        id="series-complete"
        hidden
      >

        <div class="completion-panel">

          <div class="stage-label">
            STAGE COMPLETE
          </div>

          <h2>
            SERIES MASTER
          </h2>

          <p>
            You have restored the ability of Mathscape
            to calculate not only individual patterns,
            but the total created by every term together.
          </p>


          <div class="summary-grid">

            <div class="summary-card">

              <h3>
                Arithmetic Series
              </h3>

              <p>
                A series formed from a sequence with a
                constant difference between consecutive terms.
              </p>

              <strong>
                Sₙ = n/2 [2a + (n − 1)d]
              </strong>

            </div>


            <div class="summary-card">

              <h3>
                Geometric Series
              </h3>

              <p>
                A series formed from a sequence with a
                constant ratio between consecutive terms.
              </p>

              <strong>
                Sₙ = a(rⁿ − 1)/(r − 1)
              </strong>

            </div>

          </div>


          <button
            class="btn btn-primary btn-large"
            id="finish-level"
          >
            COMPLETE STAGE 03 →
          </button>

        </div>

      </section>


    </div>

  `;


  // ==========================================================
  // START LEVEL
  // ==========================================================

  container
    .querySelector('#begin-series')
    .addEventListener('click', () => {

      document
        .querySelector('#series-hero')
        .hidden = true;

      showMission(1);

    });



  // ==========================================================
  // SHOW MISSION
  // ==========================================================

  function showMission(number) {

    currentMission = number;

    const missions =
      container.querySelectorAll('.mission-section');

    missions.forEach(m => {

      m.hidden = true;

    });


    const mission =
      container.querySelector(
        `#mission-${number}`
      );

    if (mission) {

      mission.hidden = false;

      mission.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }

  }



  // ==========================================================
  // MISSION 1
  // ==========================================================

  container
    .querySelectorAll(
      '#mission-1 .answer-btn'
    )
    .forEach(btn => {

      btn.addEventListener('click', () => {

        const feedback =
          container.querySelector(
            '#mission-1-feedback'
          );


        if (btn.dataset.answer === '24') {

          state.mission1Done = true;

          feedback.innerHTML = `

            <div class="builder-success">

              <h3>
                Pattern Restored
              </h3>

              <p>
                Correct. The pattern increases by 4:
                12, 16, 20, 24.
              </p>

              <p>
                This sequence is arithmetic because the
                difference between consecutive terms is constant.
              </p>

              <button
                class="btn btn-primary next-mission"
                data-next="2"
              >
                CONTINUE →
              </button>

            </div>

          `;

          bindNextMission();

        }

        else {

          feedback.innerHTML = `

            <div class="builder-error">

              <h3>
                Pattern Unstable
              </h3>

              <p>
                Look at the difference between each row.
                Every row adds 4 seats.
              </p>

            </div>

          `;

        }

      });

    });



  // ==========================================================
  // MISSION 2 — ARITHMETIC
  // ==========================================================

  container
    .querySelector('#check-arithmetic')
    .addEventListener('click', () => {

      const answers = [

        Number(container.querySelector('#arith-1').value),
        Number(container.querySelector('#arith-2').value),
        Number(container.querySelector('#arith-3').value),
        Number(container.querySelector('#arith-4').value)

      ];


      const correct = [
        45,
        260,
        260,
        420
      ];


      const isCorrect =
        answers.every(
          (answer, index) =>
            answer === correct[index]
        );


      const feedback =
        container.querySelector(
          '#arith-feedback'
        );


      if (isCorrect) {

        state.mission2Done = true;

        feedback.innerHTML = `

          <div class="builder-success">

            <h3>
              Arithmetic Archive Restored
            </h3>

            <p>
              Excellent. You successfully calculated
              the sum of multiple arithmetic series.
            </p>

            <button
              class="btn btn-primary next-mission"
              data-next="3"
            >
              ENTER THE GEOMETRIC PORTAL →
            </button>

          </div>

        `;

        bindNextMission();

      }

      else {

        feedback.innerHTML = `

          <div class="builder-error">

            <h3>
              Some Records Are Still Missing
            </h3>

            <p>
              Remember to identify a, d, and n before
              applying the arithmetic series formula.
            </p>

          </div>

        `;

      }

    });



  // ==========================================================
  // MISSION 3 — GEOMETRIC
  // ==========================================================

  container
    .querySelector('#check-geometric')
    .addEventListener('click', () => {

      const answers = [

        Number(container.querySelector('#geo-1').value),
        Number(container.querySelector('#geo-2').value),
        Number(container.querySelector('#geo-3').value)

      ];


      const correct = [
        126,
        93,
        635
      ];


      const isCorrect =
        answers.every(
          (answer, index) =>
            answer === correct[index]
        );


      const feedback =
        container.querySelector(
          '#geo-feedback'
        );


      if (isCorrect) {

        state.mission3Done = true;

        feedback.innerHTML = `

          <div class="builder-success">

            <h3>
              Portal Activated
            </h3>

            <p>
              You discovered the difference between
              arithmetic and geometric growth.
            </p>

            <button
              class="btn btn-primary next-mission"
              data-next="4"
            >
              CONTINUE →
            </button>

          </div>

        `;

        bindNextMission();

      }

      else {

        feedback.innerHTML = `

          <div class="builder-error">

            <h3>
              The Portal Remains Closed
            </h3>

            <p>
              Look for the constant ratio between
              consecutive terms.
            </p>

          </div>

        `;

      }

    });



  // ==========================================================
  // MISSION 4 — SAVINGS
  // ==========================================================

  container
    .querySelector('#check-savings')
    .addEventListener('click', () => {

      const saving12 =
        Number(
          container
            .querySelector('#saving-12')
            .value
        );


      const saving24 =
        Number(
          container
            .querySelector('#saving-24')
            .value
        );


      const feedback =
        container.querySelector(
          '#saving-feedback'
        );


      if (
        saving12 === 4500000 &&
        saving24 === 16200000
      ) {

        state.mission4Done = true;

        feedback.innerHTML = `

          <div class="builder-success">

            <h3>
              Savings Vault Unlocked
            </h3>

            <p>
              Correct. The savings follow an arithmetic series
              with a = 100,000 and d = 50,000.
            </p>

            <button
              class="btn btn-primary next-mission"
              data-next="5"
            >
              CONTINUE TO FINAL MISSION →
            </button>

          </div>

        `;

        bindNextMission();

      }

      else {

        feedback.innerHTML = `

          <div class="builder-error">

            <h3>
              The Vault Remains Locked
            </h3>

            <p>
              Use the arithmetic series formula with
              a = 100,000 and d = 50,000.
            </p>

          </div>

        `;

      }

    });



  // ==========================================================
  // MISSION 5 — FOREST
  // ==========================================================

  container
    .querySelector('#restore-forest')
    .addEventListener('click', () => {

      const answer =
        Number(
          container
            .querySelector('#forest-answer')
            .value
        );


      const feedback =
        container.querySelector(
          '#forest-feedback'
        );


      if (answer === 1250) {

        state.mission5Done = true;


        feedback.innerHTML = `

          <div class="builder-success">

            <h3>
              Mathscape Restored
            </h3>

            <p>
              Correct.
            </p>

            <p>
              a = 15,
              d = 5,
              and n = 20.
            </p>

            <p>
              S₂₀ = 20/2 [2(15) + 19(5)]
            </p>

            <p>
              S₂₀ = 1,250 trees.
            </p>

            <button
              class="btn btn-primary"
              id="show-series-summary"
            >
              VIEW YOUR ACHIEVEMENT →
            </button>

          </div>

        `;


        container
          .querySelector(
            '#show-series-summary'
          )
          .addEventListener('click', () => {

            container
              .querySelector('#mission-5')
              .hidden = true;


            container
              .querySelector('#series-complete')
              .hidden = false;


            container
              .querySelector('#series-complete')
              .scrollIntoView({
                behavior: 'smooth'
              });

          });

      }

      else {

        feedback.innerHTML = `

          <div class="builder-error">

            <h3>
              The Forest Is Not Complete
            </h3>

            <p>
              Try identifying a, d, and n first.
              Then calculate the sum of the first
              20 terms.
            </p>

          </div>

        `;

      }

    });



  // ==========================================================
  // NEXT MISSION BUTTON
  // ==========================================================

  function bindNextMission() {

    container
      .querySelectorAll('.next-mission')
      .forEach(btn => {

        btn.addEventListener('click', () => {

          const next =
            Number(
              btn.dataset.next
            );

          showMission(next);

        });

      });

  }



  // ==========================================================
  // COMPLETE LEVEL
  // ==========================================================

  container
    .querySelector('#finish-level')
    .addEventListener('click', () => {

      const score = 100;

      api.complete(score, {

        heading:
          'Series Master Complete',

        detail:
          'You mastered arithmetic and geometric series and successfully applied them to contextual problems.',

        badge: {
          name:
            'Series Master',

          icon:
            '∑'
        }

      });

    });

}
