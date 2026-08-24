// ==========================================
// MATHSCAPE — PROGRESS SYSTEM
// ==========================================
//
// Menyimpan progress pemain menggunakan
// browser localStorage.
//
// Data yang disimpan:
// - Stage yang sudah terbuka
// - Stage yang sudah selesai
// - Skor terbaik tiap stage
// - Achievement / badges
// - Data tambahan pembelajaran
// - Nama pemain untuk certificate (opsional)
// ==========================================


// Nama penyimpanan di browser

const STORAGE_KEY = 'mathscape.progress.v1';


// ==========================================
// DEFAULT GAME STATE
// ==========================================

const defaultState = () => ({

  // Stage tertinggi yang dapat dimainkan
  // Saat pertama kali membuka MATHSCAPE,
  // hanya Stage 1 yang terbuka.

  unlockedLevel: 1,


  // Menyimpan status stage yang sudah selesai

  completed: {
    // Contoh:
    // 1: true,
    // 2: true
  },


  // Menyimpan skor terbaik setiap stage
  //
  // Contoh:
  // 1: 85,
  // 2: 100

  scores: {},


  // Achievement yang berhasil diperoleh

  badges: [],


  // Data tambahan jika nanti diperlukan
  //
  // Bisa digunakan untuk:
  // - jawaban eksplorasi
  // - hasil aktivitas
  // - progress khusus

  sandbox: {},


  // Nama pemain untuk sertifikat
  // atau halaman completion

  certificateName: ''

});


// ==========================================
// LOAD PROGRESS
// ==========================================

let state = load();


function load() {

  try {

    const raw =
      localStorage.getItem(STORAGE_KEY);


    // Jika belum pernah bermain,
    // gunakan state awal

    if (!raw) {

      return defaultState();

    }


    const parsed =
      JSON.parse(raw);


    // Gabungkan data lama dengan
    // struktur default

    return {

      ...defaultState(),

      ...parsed

    };

  }


  catch (error) {

    console.warn(

      'Failed to load Mathscape progress. Resetting progress.',

      error

    );


    return defaultState();

  }

}


// ==========================================
// SAVE PROGRESS
// ==========================================

function save() {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(state)

  );

}


// ==========================================
// GET ENTIRE STATE
// ==========================================

export function getState() {

  return state;

}


// ==========================================
// CHECK IF STAGE IS UNLOCKED
// ==========================================

export function isUnlocked(levelNum) {

  return levelNum <= state.unlockedLevel;

}


// ==========================================
// CHECK IF STAGE IS COMPLETED
// ==========================================

export function isCompleted(levelNum) {

  return !!state.completed[levelNum];

}


// ==========================================
// GET STAGE SCORE
// ==========================================

export function getScore(levelNum) {

  return state.scores[levelNum] || 0;

}


// ==========================================
// GET TOTAL SCORE
// ==========================================

export function totalScore() {

  return Object
    .values(state.scores)

    .reduce(

      (total, score) => total + score,

      0

    );

}


// ==========================================
// COMPLETE STAGE
// ==========================================
//
// Ketika pemain menyelesaikan sebuah stage:
//
// 1. Stage ditandai selesai
// 2. Skor terbaik disimpan
// 3. Stage berikutnya dibuka
// 4. Progress disimpan
//

export function completeLevel(

  levelNum,

  score,

  totalLevels

) {

  // Pastikan skor antara 0–100

  const clampedScore =

    Math.max(

      0,

      Math.min(

        100,

        Math.round(score)

      )

    );


  // Tandai stage selesai

  state.completed[levelNum] = true;


  // Simpan hanya skor terbaik

  const previousScore =
    state.scores[levelNum] || 0;


  state.scores[levelNum] =

    Math.max(

      previousScore,

      clampedScore

    );


  // ========================================
  // UNLOCK NEXT STAGE
  // ========================================

  if (

    levelNum >= state.unlockedLevel &&

    levelNum < totalLevels

  ) {

    state.unlockedLevel =
      levelNum + 1;

  }


  // Jika Final Challenge selesai

  else if (

    levelNum === totalLevels

  ) {

    state.unlockedLevel =

      Math.max(

        state.unlockedLevel,

        totalLevels

      );

  }


  // Simpan perubahan

  save();

}


// ==========================================
// ADD ACHIEVEMENT / BADGE
// ==========================================

export function addBadge(

  id,

  name,

  icon = '🏅'

) {

  // Jangan tambahkan badge yang sama
  // lebih dari satu kali

  const alreadyExists =

    state.badges.some(

      badge => badge.id === id

    );


  if (alreadyExists) {

    return false;

  }


  // Tambahkan badge

  state.badges.push({

    id,

    name,

    icon

  });


  save();


  return true;

}


// ==========================================
// GET ALL BADGES
// ==========================================

export function getBadges() {

  return state.badges;

}


// ==========================================
// SAVE EXTRA LEARNING DATA
// ==========================================
//
// Fungsi ini bisa kita gunakan nanti
// untuk menyimpan:
//
// - jawaban pemain
// - hasil eksplorasi
// - pilihan dalam aktivitas
// - data GeoGebra / simulasi
//

export function saveSandbox(

  scenarioId,

  data

) {

  state.sandbox[scenarioId] = data;


  save();

}


// ==========================================
// LOAD EXTRA LEARNING DATA
// ==========================================

export function loadSandbox(

  scenarioId

) {

  return state.sandbox[scenarioId] || null;

}


// ==========================================
// RESET ALL PROGRESS
// ==========================================

export function resetProgress() {

  state =
    defaultState();


  save();

}


// ==========================================
// CERTIFICATE NAME
// ==========================================

export function getCertificateName() {

  return state.certificateName || '';

}


export function setCertificateName(name) {

  state.certificateName = name;


  save();

}
