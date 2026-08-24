export const conceptSections = [

  {
    id: 'sequence',
    title: 'What Is a Sequence?',
    body: `
      A sequence is an ordered list of numbers that follows
      a specific mathematical rule.
    `
  },

  {
    id: 'first-term',
    title: 'The First Term',
    body: `
      The first term is the starting value of a sequence.
      It is usually represented by a₁.
    `
  },

  {
    id: 'common-difference',
    title: 'The Common Difference',
    body: `
      In an arithmetic sequence, the common difference is
      the constant value added or subtracted between
      consecutive terms.
    `
  },

  {
    id: 'nth-term',
    title: 'Finding the n-th Term',
    body: `
      The n-th term allows us to find any position in a
      sequence without calculating every previous term.
    `
  }

];


export const firstTerms = [
  2,
  3,
  5,
  10,
  12
];


export const commonDifferences = [
  1,
  2,
  3,
  4,
  5,
  -2
];


export const positions = [
  'n',
  2,
  3,
  5,
  10
];


export const acceptedFormulas = new Set([
  '2|3',
  '3|2',
  '5|5',
  '10|4',
  '12|-2'
]);
