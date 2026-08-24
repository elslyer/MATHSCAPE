// ==========================================================
// MATHSCAPE — STAGE 1: PATTERN FINDER
// Interactive learning journey for mathematical sequences
// ==========================================================

export function mount(container, api) {

  let currentMission = 0;

  const state = {
    mission1Done: false,
    mission2Done: false,
    mission3Done: false,
    mission4Done: false,

    score: 0
  };


  // ==========================================================
  // MAIN STAGE LAYOUT
  // ==========================================================

  container.innerHTML = `

    <div class="mathscape-stage">

      <!-- =====================================
           STAGE HERO
      ====================================== -->

      <section class="stage-hero">

        <div class="stage-label">
          STAGE 01
        </div>

        <h1>
          PATTERN FINDER
        </h1>

        <p class="stage-subtitle">
          The patterns of Mathscape are beginning to disappear.
        </p>

        <div class="story-card">

          <p>
            Deep within Mathscape, numbers once followed
            perfect and predictable rules.
          </p>

          <p>
            But something has disturbed the Pattern Core.
            Sequences are breaking apart, and mathematical
            order is slowly fading away.
          </p>

          <p>
            Your mission is to explore the hidden patterns,
            uncover their rules, and restore the first
            piece of mathematical order.
          </p>

        </div>

        <!-- Illustration placeholder -->

        <div class="stage-illustration">

          <div class="floating-number n1">3</div>
          <div class="floating-number n2">6</div>
          <div class="floating-number n3">9</div>
          <div class="floating-number n4">12</div>

          <div class="illustration-placeholder">

            <span>🌲</span>

            <p>
              THE PATTERN FOREST
            </p>

          </div>

        </div>

        <button
          class="btn btn-primary btn-large"
          id="begin-stage"
        >
          BEGIN THE QUEST →
        </button>

      </section>


     <!-- =====================================
     LEARNING VIDEO
====================================== -->

<section
  class="mission-section"
  id="learning-section"
  hidden
>

  <div class="mission-header">

    <span class="mission-number">
      DISCOVER
    </span>

    <h2>
      Before the Investigation
    </h2>

  </div>

<p>
  Every mathematical sequence follows a rule.
  Some grow by adding the same value, while others
  grow by multiplying by the same factor.
</p>


<!-- =====================================
     LEARNING VIDEO
====================================== -->

<div class="learning-video">

  <div class="video-wrapper">

    <iframe
      src="https://www.youtube.com/embed/Tj89FA-d0f8"
      title="Mathematical Sequences Learning Video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>

  </div>

</div>


<!-- =====================================
     QR LEARNING ACCESS
====================================== -->
<div class="learn-anywhere">

  <div class="qr-content">
    <span class="section-label">QR ACCESS</span>

    <h3>Learn Anywhere</h3>

    <p>
      Scan the QR code to access the learning video
      on another device.
    </p>
  </div>

  <div class="qr-code">
    <img 
      src="assets/LEVEL%201%20QR%20(VIDEO).png"
      alt="QR Code for Level 1 Learning Video"
    >
  </div>

</div>

<!-- =====================================
     START MISSION
====================================== -->

<button
  class="btn btn-primary"
  id="start-mission-1"
>
  START MISSION 1 →
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
            The Stadium Mystery
          </h2>

        </div>

        <p class="mission-story">

          A newly built stadium follows a mysterious
          seating pattern.

          The first row contains <strong>12 seats</strong>.
          Each new row contains
          <strong>4 more seats</strong>
          than the previous row.

          Your task is to uncover the hidden rule.

        </p>


        <!-- Stadium illustration -->

        <div class="stadium-pattern">

          <div class="stadium-row">

            <span>
              ROW 1
            </span>

            <div class="seat-bar">

              <div style="width: 48%">
                12 SEATS
              </div>

            </div>

          </div>


          <div class="stadium-row">

            <span>
              ROW 2
            </span>

            <div class="seat-bar">

              <div style="width: 64%">
                16 SEATS
              </div>

            </div>

          </div>


          <div class="stadium-row">

            <span>
              ROW 3
            </span>

            <div class="seat-bar">

              <div style="width: 80%">
                20 SEATS
              </div>

            </div>

          </div>


          <div class="stadium-row">

            <span>
              ROW 4
            </span>

            <div class="seat-bar">

              <div style="width: 96%">
                24 SEATS
              </div>

            </div>

          </div>

        </div>


        <!-- Question 1 -->

        <div class="challenge-card">

          <h3>
            🔍 FIND THE RULE
          </h3>

          <p>
            What changes from one row to the next?
          </p>

          <div
            class="answer-grid"
            id="stadium-rule-options"
          >

            <button
              class="quiz-opt"
              data-answer="2"
            >
              +2
            </button>

            <button
              class="quiz-opt"
              data-answer="4"
            >
              +4
            </button>

            <button
              class="quiz-opt"
              data-answer="multiply2"
            >
              ×2
            </button>

            <button
              class="quiz-opt"
              data-answer="multiply4"
            >
              ×4
            </button>

          </div>

          <div
            class="mission-feedback"
            id="stadium-feedback"
          ></div>

        </div>


        <!-- Question 2 -->

        <div
          class="challenge-card"
          id="stadium-question-2"
          hidden
        >

          <h3>
            🧩 COMPLETE THE PATTERN
          </h3>

          <p>

            12 → 16 → 20 → 24 → ?

          </p>

          <div
            class="answer-grid"
            id="stadium-next-options"
          >

            <button
              class="quiz-opt"
              data-answer="26"
            >
              26
            </button>

            <button
              class="quiz-opt"
              data-answer="28"
            >
              28
            </button>

            <button
              class="quiz-opt"
              data-answer="32"
            >
              32
            </button>

          </div>

          <div
            class="mission-feedback"
            id="stadium-next-feedback"
          ></div>

        </div>


        <button
          class="btn btn-primary"
          id="continue-mission-2"
          hidden
        >
          CONTINUE TO MISSION 2 →
        </button>

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
            Sequence Scanner
          </h2>

        </div>

        <p>

          The Pattern Scanner can identify different
          mathematical sequences.

          Analyze each sequence and determine its type.

        </p>


        <div id="sequence-scanner"></div>


        <button
          class="btn btn-primary"
          id="continue-mission-3"
          hidden
        >
          CONTINUE TO MISSION 3 →
        </button>

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
            Pattern Laboratory
          </h2>

        </div>

        <p>

          Enter the Pattern Laboratory.

          Your task is to identify the hidden mathematical
          rule behind each sequence.

        </p>


        <div class="pattern-lab">

          <div class="lab-question">

            <h3>
              EXPERIMENT A
            </h3>

            <div class="sequence-display">

              5 → 10 → 15 → 20 → ?

            </div>

            <p>
              What is the common difference?
            </p>

            <input
              type="number"
              id="lab-answer-1"
              placeholder="Enter your answer"
            />

            <button
              class="btn btn-primary"
              id="check-lab-1"
            >
              CHECK
            </button>

            <div
              class="mission-feedback"
              id="lab-feedback-1"
            ></div>

          </div>


          <div
            class="lab-question"
            id="lab-question-2"
            hidden
          >

            <h3>
              EXPERIMENT B
            </h3>

            <div class="sequence-display">

              2 → 6 → 18 → 54 → ?

            </div>

            <p>
              What is the common ratio?
            </p>

            <input
              type="number"
              id="lab-answer-2"
              placeholder="Enter your answer"
            />

            <button
              class="btn btn-primary"
              id="check-lab-2"
            >
              CHECK
            </button>

            <div
              class="mission-feedback"
              id="lab-feedback-2"
            ></div>

          </div>

        </div>


        <button
          class="btn btn-primary"
          id="continue-mission-4"
          hidden
        >
          CONTINUE TO MISSION 4 →
        </button>

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
            Flora's Growth
          </h2>

        </div>


        <div class="flora-story">

          <div class="flora-icon">
            🌱
          </div>

          <div>

            <p>

              Rara has been observing her plant,
              Flora.

              Each week, she records the number of
              new leaves.

            </p>

          </div>

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

          <h3>
            🌿 ANALYZE THE GROWTH
          </h3>

          <p>
            What type of sequence does Flora's growth follow?
          </p>

          <div
            class="answer-grid"
            id="flora-type-options"
          >

            <button
              class="quiz-opt"
              data-answer="arithmetic"
            >
              ARITHMETIC
            </button>

            <button
              class="quiz-opt"
              data-answer="geometric"
            >
              GEOMETRIC
            </button>

            <button
              class="quiz-opt"
              data-answer="neither"
            >
              NEITHER
            </button>

          </div>

          <div
            class="mission-feedback"
            id="flora-feedback"
          ></div>

        </div>


        <div
          class="challenge-card"
          id="flora-question-2"
          hidden
        >

          <h3>
            🔍 FIND THE DIFFERENCE
          </h3>

          <p>
            What is the common difference?
          </p>

          <div
            class="answer-grid"
            id="flora-difference-options"
          >

            <button
              class="quiz-opt"
              data-answer="2"
            >
              +2
            </button>

            <button
              class="quiz-opt"
              data-answer="4"
            >
              +4
            </button>

            <button
              class="quiz-opt"
              data-answer="8"
            >
              +8
            </button>

          </div>

          <div
            class="mission-feedback"
            id="flora-difference-feedback"
          ></div>

        </div>


        <button
          class="btn btn-primary btn-large"
          id="complete-stage"
          hidden
        >
          RESTORE THE PATTERN CORE →
        </button>

      </section>

    </div>

  `;


  // ==========================================================
  // ELEMENTS
  // ==========================================================

  const beginStage =
    container.querySelector('#begin-stage');

  const learningSection =
    container.querySelector('#learning-section');

  const mission1 =
    container.querySelector('#mission-1');

  const mission2 =
    container.querySelector('#mission-2');

  const mission3 =
    container.querySelector('#mission-3');

  const mission4 =
    container.querySelector('#mission-4');


  // ==========================================================
  // START STAGE
  // ==========================================================

  beginStage.addEventListener('click', () => {

    learningSection.hidden = false;

    learningSection.scrollIntoView({

      behavior: 'smooth'

    });

  });


  // ==========================================================
  // START MISSION 1
  // ==========================================================

  container
    .querySelector('#start-mission-1')
    .addEventListener('click', () => {

      mission1.hidden = false;

      mission1.scrollIntoView({

        behavior: 'smooth'

      });

    });


  // ==========================================================
  // MISSION 1 — STADIUM RULE
  // ==========================================================

  const stadiumRuleButtons =
    container.querySelectorAll(
      '#stadium-rule-options .quiz-opt'
    );

  stadiumRuleButtons.forEach(button => {

    button.addEventListener('click', () => {

      const feedback =
        container.querySelector(
          '#stadium-feedback'
        );

      stadiumRuleButtons.forEach(btn => {

        btn.disabled = true;

      });


      if (button.dataset.answer === '4') {

        button.classList.add('correct');

        feedback.innerHTML = `

          <strong>
            CLUE DISCOVERED!
          </strong>

          <p>
            Each row increases by 4 seats.
          </p>

        `;

        container
          .querySelector(
            '#stadium-question-2'
          )
          .hidden = false;

      }

      else {

        button.classList.add('wrong');

        container
          .querySelector(
            '[data-answer="4"]'
          )
          .classList.add('correct');

        feedback.innerHTML = `

          <strong>
            NOT QUITE.
          </strong>

          <p>
            Compare two consecutive rows:
            16 − 12 = 4.
          </p>

        `;

        container
          .querySelector(
            '#stadium-question-2'
          )
          .hidden = false;

      }

    });

  });


  // ==========================================================
  // MISSION 1 — NEXT TERM
  // ==========================================================

  const stadiumNextButtons =
    container.querySelectorAll(
      '#stadium-next-options .quiz-opt'
    );

  stadiumNextButtons.forEach(button => {

    button.addEventListener('click', () => {

      const feedback =
        container.querySelector(
          '#stadium-next-feedback'
        );

      stadiumNextButtons.forEach(btn => {

        btn.disabled = true;

      });


      if (button.dataset.answer === '28') {

        button.classList.add('correct');

        feedback.innerHTML = `

          <strong>
            PATTERN RESTORED!
          </strong>

          <p>
            The sequence continues:
            12, 16, 20, 24, 28.
          </p>

        `;

        state.score += 20;

      }

      else {

        button.classList.add('wrong');

        container
          .querySelector(
            '#stadium-next-options [data-answer="28"]'
          )
          .classList.add('correct');

        feedback.innerHTML = `

          <strong>
            KEEP INVESTIGATING.
          </strong>

          <p>
            The rule is +4, so
            24 + 4 = 28.
          </p>

        `;

        state.score += 10;

      }


      state.mission1Done = true;

      container
        .querySelector(
          '#continue-mission-2'
        )
        .hidden = false;

    });

  });


  // ==========================================================
  // START MISSION 2
  // ==========================================================

  container
    .querySelector('#continue-mission-2')
    .addEventListener('click', () => {

      mission2.hidden = false;

      mission2.scrollIntoView({

        behavior: 'smooth'

      });

      renderSequenceScanner();

    });


  // ==========================================================
  // MISSION 2 — SEQUENCE SCANNER
  // ==========================================================

  function renderSequenceScanner() {

    const scanner =
      container.querySelector(
        '#sequence-scanner'
      );


    const questions = [

      {
        sequence: '3, 6, 9, 12',
        answer: 'arithmetic'
      },

      {
        sequence: '2, 4, 8, 16',
        answer: 'geometric'
      },

      {
        sequence: '5, 10, 15, 20',
        answer: 'arithmetic'
      }

    ];


    let answered = 0;
    let correct = 0;


    questions.forEach((question, index) => {

      const card =
        document.createElement('div');

      card.className =
        'scanner-question';


      card.innerHTML = `

        <div class="scanner-sequence">

          ${question.sequence}

        </div>

        <p>
          Identify the sequence.
        </p>

        <div class="answer-grid">

          <button
            class="quiz-opt"
            data-answer="arithmetic"
          >
            ARITHMETIC
          </button>

          <button
            class="quiz-opt"
            data-answer="geometric"
          >
            GEOMETRIC
          </button>

          <button
            class="quiz-opt"
            data-answer="neither"
          >
            NEITHER
          </button>

        </div>

        <div
          class="mission-feedback"
        ></div>

      `;


      const buttons =
        card.querySelectorAll(
          '.quiz-opt'
        );


      buttons.forEach(button => {

        button.addEventListener('click', () => {

          buttons.forEach(btn => {

            btn.disabled = true;

          });


          const feedback =
            card.querySelector(
              '.mission-feedback'
            );


          if (
            button.dataset.answer ===
            question.answer
          ) {

            button.classList.add(
              'correct'
            );

            feedback.textContent =
              'Correct! Pattern identified.';

            correct++;

          }

          else {

            button.classList.add(
              'wrong'
            );

            card
              .querySelector(
                `[data-answer="${question.answer}"]`
              )
              .classList.add(
                'correct'
              );

            feedback.textContent =
              'The scanner has revealed the correct pattern.';

          }


          answered++;


          if (
            answered === questions.length
          ) {

            state.mission2Done = true;

            state.score +=
              Math.round(
                (correct / questions.length) * 20
              );

            container
              .querySelector(
                '#continue-mission-3'
              )
              .hidden = false;

          }

        });

      });


      scanner.appendChild(card);

    });

  }


  // ==========================================================
  // START MISSION 3
  // ==========================================================

  container
    .querySelector('#continue-mission-3')
    .addEventListener('click', () => {

      mission3.hidden = false;

      mission3.scrollIntoView({

        behavior: 'smooth'

      });

    });


  // ==========================================================
  // LAB QUESTION 1
  // ==========================================================

  container
    .querySelector('#check-lab-1')
    .addEventListener('click', () => {

      const answer =
        Number(
          container
            .querySelector('#lab-answer-1')
            .value
        );

      const feedback =
        container.querySelector(
          '#lab-feedback-1'
        );


      if (answer === 5) {

        feedback.innerHTML = `

          <strong>
            EXPERIMENT SUCCESSFUL!
          </strong>

          <p>
            The common difference is +5.
          </p>

        `;

        state.score += 15;

      }

      else {

        feedback.innerHTML = `

          <strong>
            TRY AGAIN.
          </strong>

          <p>
            Compare two consecutive terms:
            10 − 5.
          </p>

        `;

        return;

      }


      container
        .querySelector(
          '#lab-question-2'
        )
        .hidden = false;

    });


  // ==========================================================
  // LAB QUESTION 2
  // ==========================================================

  container
    .querySelector('#check-lab-2')
    .addEventListener('click', () => {

      const answer =
        Number(
          container
            .querySelector('#lab-answer-2')
            .value
        );

      const feedback =
        container.querySelector(
          '#lab-feedback-2'
        );


      if (answer === 3) {

        feedback.innerHTML = `

          <strong>
            EXPERIMENT COMPLETE!
          </strong>

          <p>
            The common ratio is 3.
          </p>

        `;

        state.score += 15;

        state.mission3Done = true;


        container
          .querySelector(
            '#continue-mission-4'
          )
          .hidden = false;

      }

      else {

        feedback.innerHTML = `

          <strong>
            ANALYZE THE PATTERN AGAIN.
          </strong>

          <p>
            How do we move from 2 to 6?
          </p>

        `;

      }

    });


  // ==========================================================
  // START MISSION 4
  // ==========================================================

  container
    .querySelector('#continue-mission-4')
    .addEventListener('click', () => {

      mission4.hidden = false;

      mission4.scrollIntoView({

        behavior: 'smooth'

      });

    });


  // ==========================================================
  // FLORA QUESTION 1
  // ==========================================================

  const floraTypeButtons =
    container.querySelectorAll(
      '#flora-type-options .quiz-opt'
    );


  floraTypeButtons.forEach(button => {

    button.addEventListener('click', () => {

      const feedback =
        container.querySelector(
          '#flora-feedback'
        );


      floraTypeButtons.forEach(btn => {

        btn.disabled = true;

      });


      if (
        button.dataset.answer ===
        'arithmetic'
      ) {

        button.classList.add(
          'correct'
        );

        feedback.innerHTML = `

          <strong>
            CORRECT!
          </strong>

          <p>
            Flora's leaves increase by the same
            amount each week.
          </p>

        `;

        state.score += 10;

      }

      else {

        button.classList.add(
          'wrong'
        );

        container
          .querySelector(
            '#flora-type-options [data-answer="arithmetic"]'
          )
          .classList.add(
            'correct'
          );

        feedback.innerHTML = `

          <strong>
            NOT QUITE.
          </strong>

          <p>
            Compare the difference between
            consecutive weeks.
          </p>

        `;

      }


      container
        .querySelector(
          '#flora-question-2'
        )
        .hidden = false;

    });

  });


  // ==========================================================
  // FLORA QUESTION 2
  // ==========================================================

  const floraDifferenceButtons =
    container.querySelectorAll(
      '#flora-difference-options .quiz-opt'
    );


  floraDifferenceButtons.forEach(button => {

    button.addEventListener('click', () => {

      const feedback =
        container.querySelector(
          '#flora-difference-feedback'
        );


      floraDifferenceButtons.forEach(btn => {

        btn.disabled = true;

      });


      if (
        button.dataset.answer === '4'
      ) {

        button.classList.add(
          'correct'
        );

        feedback.innerHTML = `

          <strong>
            PATTERN SOLVED!
          </strong>

          <p>
            The number of leaves increases
            by 4 each week.
          </p>

        `;

        state.score += 10;

      }

      else {

        button.classList.add(
          'wrong'
        );

        container
          .querySelector(
            '#flora-difference-options [data-answer="4"]'
          )
          .classList.add(
            'correct'
          );

        feedback.innerHTML = `

          <strong>
            LOOK CLOSER.
          </strong>

          <p>
            7 − 3 = 4.
          </p>

        `;

      }


      state.mission4Done = true;


      container
        .querySelector(
          '#complete-stage'
        )
        .hidden = false;

    });

  });


  // ==========================================================
  // COMPLETE STAGE
  // ==========================================================

  container
    .querySelector('#complete-stage')
    .addEventListener('click', () => {

      const finalScore =
        Math.min(
          100,
          state.score
        );


      let badge = null;


      if (finalScore >= 80) {

        const added =
          api.badge(
            'pattern-finder',
            'Pattern Finder',
            '🔍'
          );


        if (added) {

          badge = {

            name:
              'Pattern Finder',

            icon:
              '🔍'

          };

        }

      }


      api.complete(
        finalScore,
        {

          heading:
            'PATTERN CORE RESTORED!',

          detail: `
            You have uncovered the hidden rules behind
            arithmetic and geometric sequences.
            The first piece of mathematical order has
            returned to Mathscape.
          `,

          badge

        }
      );

    });

}
