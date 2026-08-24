// timeline.js
// ============================================
// MATHSCAPE — LEVEL 1 DATA
// The Lost Pattern
// Introduction to Mathematical Sequences
// ============================================

export const timelineEvents = [
  {
    id: "arrival",
    year: "01",
    title: "The Silent Valley",
    text: `
      You have entered the first region of Mathscape: 
      <strong>The Silent Valley</strong>.
      <br><br>
      Once, everything in this land followed a perfect mathematical order.
      Trees grew in patterns. Bridges were built using numerical rules.
      Even the stars above the valley moved according to hidden sequences.
      <br><br>
      But something has changed.
      <br><br>
      The patterns are beginning to disappear.
    `
  },

  {
    id: "signal",
    year: "02",
    title: "A Strange Signal",
    text: `
      As you explore deeper into the valley, you discover mysterious symbols:
      <br><br>
      <strong>2, 4, 6, 8, ...</strong>
      <br><br>
      At first, they seem like ordinary numbers.
      But every number follows a rule.
      <br><br>
      The difference between each term is always <strong>2</strong>.
      <br><br>
      You have discovered your first mathematical sequence.
    `
  },

  {
    id: "pattern",
    year: "03",
    title: "The Hidden Rule",
    text: `
      A sequence is not simply a collection of random numbers.
      <br><br>
      Every sequence follows a specific pattern or rule.
      <br><br>
      For example:
      <br><br>
      <strong>3, 6, 9, 12, 15, ...</strong>
      <br><br>
      Each term increases by <strong>3</strong>.
      <br><br>
      The rule is the key to predicting what comes next.
    `
  },

  {
    id: "challenge",
    year: "04",
    title: "The Broken Path",
    text: `
      Suddenly, the path ahead begins to collapse.
      Strange symbols appear on the ground:
      <br><br>
      <strong>5, 10, 15, ?, 25</strong>
      <br><br>
      One number is missing.
      <br><br>
      To restore the path, you must identify the hidden pattern.
      <br><br>
      Look carefully.
      Each term increases by <strong>5</strong>.
      <br><br>
      The missing number is <strong>20</strong>.
    `
  },

  {
    id: "discovery",
    year: "05",
    title: "The First Pattern Restored",
    text: `
      The moment you solve the pattern, the valley begins to change.
      <br><br>
      The broken path is restored.
      Light returns to the surrounding landscape.
      <br><br>
      You now understand an important principle:
      <br><br>
      <strong>Mathematics is full of patterns.</strong>
      <br><br>
      A sequence allows us to describe, predict, and understand those patterns.
      <br><br>
      But this is only the beginning of your journey.
    `
  }
];


// ============================================
// LEVEL 1 — QUICK CHECK
// ============================================

export const historyQuiz = [
  {
    q: "Which number completes the sequence 2, 4, 6, 8, ... ?",
    options: [
      "9",
      "10",
      "12",
      "16"
    ],
    answer: 1,
    hint: "Look at the difference between consecutive terms."
  },

  {
    q: "What is the common difference in the sequence 3, 6, 9, 12, ... ?",
    options: [
      "2",
      "3",
      "4",
      "6"
    ],
    answer: 1,
    hint: "Subtract one term from the next: 6 − 3."
  },

  {
    q: "Which statement best describes a mathematical sequence?",
    options: [
      "A random collection of numbers",
      "A list of numbers arranged according to a specific rule",
      "A collection of equations",
      "A graph with no numerical pattern"
    ],
    answer: 1,
    hint: "Think about the hidden rule connecting the terms."
  },

  {
    q: "What number is missing in the sequence 5, 10, 15, ?, 25?",
    options: [
      "18",
      "20",
      "22",
      "30"
    ],
    answer: 1,
    hint: "Each term increases by the same amount."
  }
];
