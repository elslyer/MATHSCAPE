import { downloadCertificate } from './certificate.js';
// ==========================================
// MATHSCAPE — MAIN APPLICATION CONTROLLER
// Navigation, World Map, Progress & Stages
// ==========================================

import * as progress from './progress.js';


// ==========================================
// CONFIGURATION
// ==========================================

const TOTAL_LEVELS = 5;


// ==========================================
// STAGE INFORMATION
// ==========================================

const levelMeta = [

  {
    num: 1,
    id: 'level-1',
    title: 'Pattern Finder',
    desc: 'Explore number patterns and discover arithmetic and geometric sequences.',
    icon: '🌲'
  },

  {
    num: 2,
    id: 'level-2',
    title: 'Formula Finder',
    desc: 'Unlock the mathematical rules and discover the formula for the nth term.',
    icon: '🏰'
  },

  {
    num: 3,
    id: 'level-3',
    title: 'Series Master',
    desc: 'Master arithmetic and geometric series and uncover the power of summation.',
    icon: '🌊'
  },

  {
    num: 4,
    id: 'level-4',
    title: 'Case Solver',
    desc: 'Apply sequences and series to solve real-world mathematical challenges.',
    icon: '🏔️'
  },

  {
    num: 5,
    id: 'level-5',
    title: 'The Mathscape Trial',
    desc: 'Face the final challenge and prove your mastery of sequences and series.',
    icon: '👑',
    final: true
  }

];


// ==========================================
// LEVEL LOADERS
//
// Untuk sementara kita masih memakai file
// level bawaan agar website tetap berjalan.
//
// NANTI kita akan mengganti isi masing-masing
// level menjadi materi LKPD MATHSCAPE.
// ==========================================

const levelLoaders = {

  1: () => import('./levels/level1-history.js'),

  2: () => import('./levels/level2-concepts.js'),

  3: () => import('./levels/level3-solutions.js'),

  4: () => import('./levels/level4-technical.js'),

  5: () => import('./levels/level5-sandbox.js')

};


// ==========================================
// SCREEN REGISTRATION
// ==========================================

const screens = {

  landing: document.getElementById('screen-landing'),

  map: document.getElementById('screen-map')

};


for (let i = 1; i <= TOTAL_LEVELS; i++) {

  screens[`level-${i}`] =
    document.getElementById(`screen-level-${i}`);

}


// ==========================================
// NAVIGATION
// ==========================================

function showScreen(name) {

  Object.values(screens).forEach(screen => {

    if (screen) {

      screen.classList.remove('active');

    }

  });


  if (screens[name]) {

    screens[name].classList.add('active');

  }


  const topbarStats =
    document.getElementById('topbar-stats');


  if (topbarStats) {

    topbarStats.hidden = name === 'landing';

  }


  window.scrollTo({

    top: 0,

    behavior: 'smooth'

  });

}


function navTo(name) {

  if (name === 'map') {

    renderMap();

  }


  showScreen(name);

}


// Navigation elements

document
  .querySelectorAll('[data-nav]')
  .forEach(element => {

    element.addEventListener('click', () => {

      navTo(element.dataset.nav);

    });

  });


// Start Journey button

const startButton =
  document.getElementById('btn-start');


if (startButton) {

  startButton.addEventListener('click', () => {

    // Play background music
    const backgroundMusic =
      document.getElementById('background-music');

    if (backgroundMusic) {

      backgroundMusic.volume = 0.5;

      backgroundMusic.play()
        .catch(error => {
          console.log(
            'Background music could not start:',
            error
          );
        });

    }

    navTo('map');

  });

}


// World Map button

const mapButton =
  document.getElementById('btn-map');


if (mapButton) {

  mapButton.addEventListener('click', () => {

    navTo('map');

  });

}


// Reset button

const resetButton =
  document.getElementById('btn-reset');


if (resetButton) {

  resetButton.addEventListener('click', () => {

    const confirmReset = confirm(

      'Reset all Mathscape progress? This cannot be undone.'

    );


    if (confirmReset) {

      progress.resetProgress();

      updateTopbar();

      renderMap();

      showToast(
        'Your Mathscape journey has been reset.'
      );

    }

  });

}


// ==========================================
// TOPBAR PROGRESS
// ==========================================

function updateTopbar() {

  const scoreElement =
    document.getElementById('stat-score');


  const badgeElement =
    document.getElementById('stat-badges');


  if (scoreElement) {

    scoreElement.textContent =
      progress.totalScore();

  }


  if (badgeElement) {

    badgeElement.textContent =
      progress.getBadges().length;

  }

}


// ==========================================
// WORLD MAP
// ==========================================

function renderMap() {

  const grid =
    document.getElementById('level-grid');


  if (!grid) return;


  grid.innerHTML = '';


  levelMeta.forEach((meta, index) => {

    const unlocked =
      progress.isUnlocked(meta.num);


    const completed =
      progress.isCompleted(meta.num);


    const score =
      progress.getScore(meta.num);


    const card =
      document.createElement('div');


    card.className =
      'level-card' +
      (unlocked ? '' : ' locked') +
      (meta.final ? ' final-stage' : '');


    card.style.animationDelay =
      `${index * 100}ms`;


    card.innerHTML = `

      <div class="stage-icon">

        ${meta.icon}

      </div>


      <span class="lv-num">

        ${meta.final
          ? 'FINAL CHALLENGE'
          : `STAGE ${meta.num}`
        }

      </span>


      <h3>

        ${meta.title}

      </h3>


      <p>

        ${meta.desc}

      </p>


      <div class="lv-status">

        <span>

          ${
            completed

              ? '✓ Completed'

              : unlocked

                ? 'Ready to explore'

                : '🔒 Locked'
          }

        </span>


        ${
          completed

            ? `<span class="lv-score">
                ${Math.round(score)}%
              </span>`

            : ''
        }

      </div>

    `;


    if (unlocked) {

      card.addEventListener('click', () => {

        openLevel(meta.num);

      });

    }


    grid.appendChild(card);

  });


  renderBadges();

  updateTopbar();

}


// ==========================================
// BADGES
// ==========================================

// ==========================================
// BADGES & CERTIFICATE
// ==========================================

function renderBadges() {

  const badgeShelf =
    document.getElementById('badge-shelf');


  if (!badgeShelf) return;


  const badges =
    progress.getBadges();


  // Jika belum ada badge
  if (badges.length === 0) {

    badgeShelf.innerHTML = `

      <div class="badge-empty">

        Your achievements will appear here.

      </div>

    `;

    return;

  }


  // Sembunyikan badge Formula Finder
  const visibleBadges =
    badges.filter(
      badge =>
        badge.name !== 'Formula Finder'
    );


  // Tampilkan badge lainnya
  const badgesHTML =
    visibleBadges.map(badge => `

      <span class="badge-chip">

        ${badge.icon || '🏅'}

        ${badge.name}

      </span>

    `).join('');


  // Tombol Download Certificate
  const certificateHTML = `

    <button
      class="btn btn-primary"
      id="btn-download-certificate"
    >

      DOWNLOAD CERTIFICATE

    </button>

  `;


// Gabungkan badge + tombol sertifikat
badgeShelf.innerHTML =
  badgesHTML + certificateHTML;


// ==========================================
// DOWNLOAD CERTIFICATE EVENT
// ==========================================

const certificateButton =
  document.getElementById(
    'btn-download-certificate'
  );


if (certificateButton) {

  certificateButton.addEventListener(
    'click',
    () => {

      downloadCertificate();

    }
  );

}
// ==========================================
// LEVEL MANAGEMENT
// ==========================================

const mountedLevels = new Set();

const mountedModules = {};


// ==========================================
// BUILD LEVEL API
// ==========================================

function buildApi(num) {

  return {

    complete: (score, meta = {}) => {

      progress.completeLevel(

        num,

        score,

        TOTAL_LEVELS

      );


      updateTopbar();


      showToast(

        `Stage ${num} completed! Score: ${Math.round(score)}/100`

      );


      showResults(

        num,

        score,

        meta

      );

    },


    badge: (

      id,

      name,

      icon = '🏅'

    ) => {

      const added =
        progress.addBadge(

          id,

          name,

          icon

        );


      if (added) {

        showToast(

          `Achievement unlocked: ${name}`

        );

      }


      updateTopbar();


      return added;

    }

  };

}


// ==========================================
// OPEN STAGE
// ==========================================

async function openLevel(num) {

  const body =
    document.getElementById(
      `level-${num}-body`
    );


  if (!body) return;


  showScreen(`level-${num}`);


  if (!mountedLevels.has(num)) {

    body.innerHTML = `

      <div class="loading-stage">

        ✦ Entering Mathscape...

      </div>

    `;


    try {

      const module =
        await levelLoaders[num]();


      body.innerHTML = '';


      module.mount(

        body,

        buildApi(num)

      );


      mountedLevels.add(num);


      mountedModules[num] =
        module;

    }


    catch (error) {

      console.error(

        'Failed to load stage:',

        num,

        error

      );


      body.innerHTML = `

        <div class="error-stage">

          <h3>⚠️ Unable to load this stage</h3>

          <p>
            Please refresh the page and try again.
          </p>

        </div>

      `;

    }

  }

}


// ==========================================
// REPLAY STAGE
// ==========================================

function replay(num) {

  const body =
    document.getElementById(
      `level-${num}-body`
    );


  const module =
    mountedModules[num];


  if (!body || !module) return;


  body.innerHTML = '';


  module.mount(

    body,

    buildApi(num)

  );


  window.scrollTo({

    top: 0,

    behavior: 'smooth'

  });

}


// ==========================================
// STAGE RESULTS
// ==========================================

function showResults(

  num,

  score,

  meta

) {

  const body =
    document.getElementById(
      `level-${num}-body`
    );


  if (!body) return;


  const isFinal =
    num === TOTAL_LEVELS;


  const nextStage =
    levelMeta.find(

      stage =>

        stage.num === num + 1

    );


  body.innerHTML = `

    <div class="results-panel">


      <div class="results-header">

        <div class="results-icon">

          ${
            score >= 90

              ? '🏆'

              : score >= 70

                ? '⭐'

                : '📘'
          }

        </div>


        <div>

          <span class="tag-label">

            ${
              isFinal

                ? 'FINAL CHALLENGE COMPLETE'

                : `STAGE ${num} COMPLETE`
            }

          </span>


          <h3>

            ${
              meta.heading ||

              (
                isFinal

                  ? 'You Restored Mathscape!'
                  : 'Mission Complete!'
              )
            }

          </h3>


          <p>

            ${
              meta.detail ||

              'You have completed this mathematical challenge.'
            }

          </p>

        </div>

      </div>


      <div class="results-score">

        ${Math.round(score)}

        <span>/100</span>

      </div>


      <div class="results-actions">


        <button
          class="btn btn-ghost"
          id="btn-replay"
        >

          ↺ Replay Stage

        </button>


        ${
          !isFinal && nextStage

            ? `

              <button
                class="btn btn-primary"
                id="btn-next-stage"
              >

                Continue to
                ${nextStage.title}
                →

              </button>

            `

            : `

              <button
                class="btn btn-primary"
                id="btn-finish-journey"
              >

                🏆 Finish Journey

              </button>

            `
        }


        <button
          class="btn btn-ghost"
          id="btn-goto-map"
        >

          🗺️ World Map

        </button>


      </div>

    </div>

  `;


  document
    .getElementById('btn-replay')
    ?.addEventListener('click', () => {

      replay(num);

    });


  document
    .getElementById('btn-next-stage')
    ?.addEventListener('click', () => {

      openLevel(num + 1);

    });


  document
    .getElementById('btn-finish-journey')
    ?.addEventListener('click', () => {

      navTo('map');

      showToast(
        'Congratulations! You have completed MATHSCAPE! 🎉'
      );

    });


  document
    .getElementById('btn-goto-map')
    ?.addEventListener('click', () => {

      navTo('map');

    });

}


// ==========================================
// TOAST NOTIFICATION
// ==========================================

let toastTimer = null;


function showToast(message) {

  const toast =
    document.getElementById('toast');


  if (!toast) return;


  toast.textContent = message;


  toast.classList.remove('show');


  void toast.offsetWidth;


  toast.classList.add('show');


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(() => {

      toast.classList.remove('show');

    }, 3200);

}


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

updateTopbar();

renderMap();
