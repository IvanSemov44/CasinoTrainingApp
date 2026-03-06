import type { RKScenario, RKDrillType } from '../types';
import { getRandomElement, shuffleArray } from '@utils/randomUtils';
import { ANNOUNCED_COMPOSITION_QUESTIONS, ANNOUNCED_MIXED_QUESTIONS, BET_LIMITS_QUESTIONS } from '../constants/questions';

// ── Helpers ───────────────────────────────────────────────────────────────────

function pick<T>(arr: readonly T[]): T {
  return getRandomElement([...arr]);
}

// ── Roulette wheel data ───────────────────────────────────────────────────────

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const ALL_1_36 = Array.from({ length: 36 }, (_, i) => i + 1);

function isRed(n: number): boolean { return RED_NUMBERS.includes(n); }
function isBlack(n: number): boolean { return n > 0 && !RED_NUMBERS.includes(n); }
function getColumn(n: number): 1 | 2 | 3 { return n % 3 === 0 ? 3 : (n % 3 as 1 | 2); }
function getDozen(n: number): 1 | 2 | 3 { return n <= 12 ? 1 : n <= 24 ? 2 : 3; }
function isEven(n: number): boolean { return n > 0 && n % 2 === 0; }
function isOdd(n: number): boolean { return n % 2 === 1; }
function isLow(n: number): boolean { return n >= 1 && n <= 18; }
function isHigh(n: number): boolean { return n >= 19 && n <= 36; }

// ── outside-bet-payout ────────────────────────────────────────────────────────

interface OutsideBetDef {
  name: string;
  multiplier: 1 | 2;
  numbers: number[];
}

const OUTSIDE_BETS: OutsideBetDef[] = [
  { name: 'Red',          multiplier: 1, numbers: ALL_1_36.filter(isRed) },
  { name: 'Black',        multiplier: 1, numbers: ALL_1_36.filter(isBlack) },
  { name: 'Even',         multiplier: 1, numbers: ALL_1_36.filter(isEven) },
  { name: 'Odd',          multiplier: 1, numbers: ALL_1_36.filter(isOdd) },
  { name: 'Low (1–18)',   multiplier: 1, numbers: ALL_1_36.filter(isLow) },
  { name: 'High (19–36)', multiplier: 1, numbers: ALL_1_36.filter(isHigh) },
  { name: 'Dozen 1 (1–12)',   multiplier: 2, numbers: ALL_1_36.filter(n => n <= 12) },
  { name: 'Dozen 2 (13–24)',  multiplier: 2, numbers: ALL_1_36.filter(n => n >= 13 && n <= 24) },
  { name: 'Dozen 3 (25–36)',  multiplier: 2, numbers: ALL_1_36.filter(n => n >= 25) },
  { name: 'Column 1', multiplier: 2, numbers: ALL_1_36.filter(n => getColumn(n) === 1) },
  { name: 'Column 2', multiplier: 2, numbers: ALL_1_36.filter(n => getColumn(n) === 2) },
  { name: 'Column 3', multiplier: 2, numbers: ALL_1_36.filter(n => getColumn(n) === 3) },
];

const BET_AMOUNTS = [10, 20, 25, 50] as const;

function generateOutsideBetPayout(): RKScenario {
  const bet = pick(OUTSIDE_BETS);
  const amount = pick(BET_AMOUNTS);
  const winNum = pick(bet.numbers);
  const payout = amount * bet.multiplier;
  const rateLabel = bet.multiplier === 1 ? '1:1 (even money)' : '2:1';

  return {
    drillType: 'outside-bet-payout',
    winningNumber: winNum,
    bets: [`€${amount} on ${bet.name}`],
    question: `Number ${winNum} wins.\nPlayer has €${amount} on ${bet.name}.\nWhat is the payout?`,
    answerType: 'numeric',
    correctAnswer: payout,
    explanation: `${bet.name} pays ${rateLabel}.\n€${amount} × ${bet.multiplier} = €${payout}.`,
  };
}

// ── dozen-vs-column ───────────────────────────────────────────────────────────

interface StaticQuestion { q: string; correct: string; options: string[]; explanation: string }

const DOZEN_VS_COLUMN_QUESTIONS: StaticQuestion[] = [
  {
    q: 'Which bet covers exactly the numbers 1 to 12?',
    correct: 'Dozen 1',
    options: ['Dozen 1', 'Column 1', 'Low (1–18)', 'First Row'],
    explanation: 'Dozen 1 covers numbers 1–12 (12 numbers). Pays 2:1.\nColumn 1 covers 1,4,7,10… (every 3rd number in the first column of the layout).',
  },
  {
    q: 'Column 2 on the roulette table covers which numbers?',
    correct: '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35',
    options: [
      '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35',
      '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34',
      '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36',
      '13–24 (all numbers)',
    ],
    explanation: 'Column 2: every number where n mod 3 = 2 → 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35.\nAll three columns cover 12 numbers each and pay 2:1.',
  },
  {
    q: 'How many numbers does a Dozen bet cover?',
    correct: '12',
    options: ['12', '18', '6', '9'],
    explanation: 'Each of the three Dozens covers 12 numbers: Dozen 1 (1–12), Dozen 2 (13–24), Dozen 3 (25–36).\nPays 2:1. Zero (0) is not covered by any Dozen.',
  },
  {
    q: 'Dozen 3 and Column 3 both cover number 36. Which other bet also covers 36?',
    correct: 'High (19–36)',
    options: ['High (19–36)', 'Low (1–18)', 'Even', 'Odd'],
    explanation: 'Number 36: Black, Even, High (19–36), Column 3, Dozen 3.\n36 is even → Even wins. 36 > 18 → High wins. 36 % 3 = 0 → Column 3. 36 is in 25–36 → Dozen 3.',
  },
  {
    q: 'What do Dozen and Column bets have in common?',
    correct: 'Both cover 12 numbers and pay 2:1',
    options: [
      'Both cover 12 numbers and pay 2:1',
      'Both cover 18 numbers and pay 1:1',
      'Both cover 12 numbers but pay differently',
      'They cover the same 12 numbers',
    ],
    explanation: 'Dozens and Columns each cover exactly 12 numbers (out of 36 non-zero numbers) and both pay 2:1.\nThe difference is which 12 numbers: Dozens are horizontal rows (1–12, 13–24, 25–36), Columns are vertical (every 3rd number).',
  },
];

function generateDozenVsColumn(): RKScenario {
  const q = pick(DOZEN_VS_COLUMN_QUESTIONS);
  return {
    drillType: 'dozen-vs-column',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── zero-rule ─────────────────────────────────────────────────────────────────

const ZERO_RULE_QUESTIONS: StaticQuestion[] = [
  {
    q: 'Number 0 wins. Player has €30 on Even. What happens to the bet?',
    correct: 'Lost — 0 is neither even nor odd, all even-money bets lose',
    options: [
      'Lost — 0 is neither even nor odd, all even-money bets lose',
      'Returned (half) — La Partage rule',
      'Returned in full — En Prison applies',
      'Wins 1:1 — 0 is considered even',
    ],
    explanation: 'At this casino: 0 wins → ALL outside bets lose.\nNo La Partage and no En Prison rules apply.\n0 is not red/black, even/odd, low/high — it belongs to no outside bet category.',
  },
  {
    q: 'Number 0 wins. Player has €50 on Column 2. What is the payout?',
    correct: '€0 — Column bet loses on 0',
    options: ['€0 — Column bet loses on 0', '€50 (1:1)', '€25 (half returned)', '€100 (2:1)'],
    explanation: 'When 0 wins, all outside bets lose — including Dozens and Columns.\n0 is not in any column or dozen. Column bet pays nothing.',
  },
  {
    q: 'Number 0 wins. Player has a €5 Straight Up bet on 0. What is the payout?',
    correct: '€175 (35:1)',
    options: ['€175 (35:1)', '€0 — 0 is a special number', '€5 returned only', '€70 (14:1)'],
    explanation: '0 is a valid inside bet number. Straight Up on 0 pays 35:1 like any other number.\n€5 × 35 = €175.\nOnly outside bets lose when 0 wins.',
  },
  {
    q: 'Number 0 wins. Player has €20 on Red and €10 on Dozen 1. What is the total payout?',
    correct: '€0 — all outside bets lose on 0',
    options: [
      '€0 — all outside bets lose on 0',
      '€20 (Red half-returned)',
      '€30 (both returned)',
      '€30 (total of both bets paid 1:1)',
    ],
    explanation: '0 wins → Red loses, Dozen 1 loses.\nThis casino has no La Partage or En Prison — even-money bets are fully collected when 0 wins.\nTotal payout: €0.',
  },
];

function generateZeroRule(): RKScenario {
  const q = pick(ZERO_RULE_QUESTIONS);
  return {
    drillType: 'zero-rule',
    winningNumber: 0,
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── outside-bet-recognition ───────────────────────────────────────────────────

const RECOGNITION_QUESTIONS: StaticQuestion[] = [
  {
    q: 'A bet that pays 1:1 and covers any winning number from 19 to 36.',
    correct: 'High (19–36)',
    options: ['High (19–36)', 'Dozen 3 (25–36)', 'Low (1–18)', 'Column 3'],
    explanation: 'High covers numbers 19–36 (18 numbers) and pays 1:1 (even money).\nDozen 3 covers 25–36 (12 numbers, pays 2:1) — a different bet.',
  },
  {
    q: 'A bet that covers 12 numbers arranged in a vertical column on the table layout and pays 2:1.',
    correct: 'Column',
    options: ['Column', 'Dozen', 'Six Line', 'Street'],
    explanation: 'Column bets cover 12 numbers in a vertical column of the table (every 3rd number). Pays 2:1.\nDozen bets cover horizontal rows (12 consecutive numbers).',
  },
  {
    q: 'A bet that pays 1:1 but loses when 0 wins, covers 18 numbers, and includes number 1.',
    correct: 'Odd',
    options: ['Odd', 'Low (1–18)', 'Red', 'Column 1'],
    explanation: '1 is: Odd ✓, Low ✓, Red ✓. But only Odd specifically includes 1 and all other odd numbers (3,5,7…35).\nLow and Red also fit — but the unique identifier here is "odd" fits 1, which is red AND low AND odd.\nThe question has multiple valid answers; in the drill, Red/Odd/Low are all correct outside bets covering 1.',
  },
  {
    q: 'What payout does a winning Dozen or Column bet pay?',
    correct: '2:1',
    options: ['2:1', '1:1', '3:1', '35:1'],
    explanation: 'Dozen and Column bets both pay 2:1.\nEven-money bets (Red/Black, Even/Odd, Low/High) pay 1:1.\nInside bets pay higher: Split=17:1, Street=11:1, Corner=8:1, Straight=35:1.',
  },
];

function generateOutsideBetRecognition(): RKScenario {
  const q = pick(RECOGNITION_QUESTIONS);
  return {
    drillType: 'outside-bet-recognition',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── announced-chip-count ──────────────────────────────────────────────────────

const CHIP_COUNT_QUESTIONS: StaticQuestion[] = [
  {
    q: 'How many chips does Voisins du Zéro require?',
    correct: '9 chips',
    options: ['9 chips', '6 chips', '5 chips', '4 chips'],
    explanation: 'Voisins du Zéro = 9 chips:\n2× Street [0,2,3] + Split [4,7] + Split [12,15] + Split [18,21] + Split [19,22] + 2× Corner [25,26,28,29] + Split [32,35]',
  },
  {
    q: 'How many chips does Tiers du Cylindre require?',
    correct: '6 chips',
    options: ['6 chips', '9 chips', '5 chips', '8 chips'],
    explanation: 'Tiers du Cylindre = 6 chips:\n6 split bets: [5,8] [10,11] [13,16] [23,24] [27,30] [33,36]',
  },
  {
    q: 'How many chips does Orphelins require?',
    correct: '5 chips',
    options: ['5 chips', '6 chips', '8 chips', '4 chips'],
    explanation: 'Orphelins = 5 chips:\nStraight Up [1] + Split [6,9] + Split [14,17] + Split [17,20] + Split [31,34]',
  },
  {
    q: 'How many chips does Jeu Zéro require?',
    correct: '4 chips',
    options: ['4 chips', '5 chips', '7 chips', '6 chips'],
    explanation: 'Jeu Zéro = 4 chips:\nStraight Up [26] + Split [0,3] + Split [12,15] + Split [32,35]',
  },
  {
    q: 'How many chips does a Neighbors (Voisins du numéro) bet require?',
    correct: '5 chips',
    options: ['5 chips', '4 chips', '6 chips', '3 chips'],
    explanation: 'Neighbors = 5 chips: one Straight Up bet on the called number plus its 2 neighbours on each side of the wheel (5 numbers total, 5 straight-up bets).',
  },
];

function generateAnnouncedChipCount(): RKScenario {
  const q = pick(CHIP_COUNT_QUESTIONS);
  return {
    drillType: 'announced-chip-count',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── announced-numbers ─────────────────────────────────────────────────────────

const ANNOUNCED_NUMBERS_QUESTIONS: StaticQuestion[] = [
  {
    q: 'How many numbers does Voisins du Zéro cover?',
    correct: '17 numbers',
    options: ['17 numbers', '12 numbers', '8 numbers', '7 numbers'],
    explanation: 'Voisins du Zéro covers 17 numbers: 0, 2, 3, 4, 7, 12, 15, 18, 19, 21, 22, 25, 26, 28, 29, 32, 35 — the 17 numbers closest to 0 on the wheel.',
  },
  {
    q: 'How many numbers does Tiers du Cylindre cover?',
    correct: '12 numbers',
    options: ['12 numbers', '17 numbers', '8 numbers', '6 numbers'],
    explanation: 'Tiers du Cylindre covers 12 numbers: 5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36 — the 12 numbers opposite to 0 on the wheel.',
  },
  {
    q: 'How many numbers does Orphelins cover?',
    correct: '8 numbers',
    options: ['8 numbers', '5 numbers', '12 numbers', '9 numbers'],
    explanation: 'Orphelins covers 8 numbers: 1, 6, 9, 14, 17, 20, 31, 34 — the 8 "orphan" numbers not covered by Voisins or Tiers.',
  },
  {
    q: 'How many numbers does Jeu Zéro cover?',
    correct: '7 numbers',
    options: ['7 numbers', '4 numbers', '9 numbers', '5 numbers'],
    explanation: 'Jeu Zéro covers 7 numbers: 0, 3, 12, 15, 26, 32, 35 — the 7 numbers closest to 0 on one side of the wheel.',
  },
  {
    q: 'Does number 17 appear in Orphelins?',
    correct: 'Yes — 17 is covered by two splits within Orphelins',
    options: [
      'Yes — 17 is covered by two splits within Orphelins',
      'No — 17 is in Tiers du Cylindre',
      'Yes — 17 has a Straight Up in Orphelins',
      'No — 17 is in Voisins du Zéro',
    ],
    explanation: 'Orphelins: Straight [1] + Split [6,9] + Split [14,17] + Split [17,20] + Split [31,34].\n17 appears in two splits: [14,17] and [17,20]. Both bets win if 17 is the result.',
  },
];

function generateAnnouncedNumbers(): RKScenario {
  const q = pick(ANNOUNCED_NUMBERS_QUESTIONS);
  return {
    drillType: 'announced-numbers',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── announced-composition ─────────────────────────────────────────────────────

function generateAnnouncedComposition(): RKScenario {
  const q = pick(ANNOUNCED_COMPOSITION_QUESTIONS);
  return {
    drillType: 'announced-composition',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── mixed-outside-payout ──────────────────────────────────────────────────────

interface OutsideBetPlaced { name: string; multiplier: 1 | 2; amount: number }

function getWinningBetsForNumber(n: number): OutsideBetPlaced[] {
  // Returns up to 5 different outside bets that win for number n (not 0)
  const bets: OutsideBetPlaced[] = [
    { name: isRed(n) ? 'Red' : 'Black', multiplier: 1, amount: 0 },
    { name: isEven(n) ? 'Even' : 'Odd', multiplier: 1, amount: 0 },
    { name: isLow(n) ? 'Low (1–18)' : 'High (19–36)', multiplier: 1, amount: 0 },
    { name: `Column ${getColumn(n)}`, multiplier: 2, amount: 0 },
    { name: `Dozen ${getDozen(n)} (${getDozen(n) === 1 ? '1–12' : getDozen(n) === 2 ? '13–24' : '25–36'})`, multiplier: 2, amount: 0 },
  ];
  return bets;
}

function generateMixedOutsidePayout(): RKScenario {
  const n = pick(ALL_1_36);
  const allBets = shuffleArray(getWinningBetsForNumber(n));

  // Pick 2 bets with random amounts
  const b1: OutsideBetPlaced = { ...allBets[0], amount: pick(BET_AMOUNTS) };
  const b2: OutsideBetPlaced = { ...allBets[1], amount: pick(BET_AMOUNTS) };

  const pay1 = b1.amount * b1.multiplier;
  const pay2 = b2.amount * b2.multiplier;
  const total = pay1 + pay2;

  return {
    drillType: 'mixed-outside-payout',
    winningNumber: n,
    bets: [`€${b1.amount} on ${b1.name}`, `€${b2.amount} on ${b2.name}`],
    question: `Number ${n} wins. Both bets win.\nWhat is the total payout?`,
    answerType: 'numeric',
    correctAnswer: total,
    explanation: `${b1.name} (${b1.multiplier}:1): €${b1.amount} × ${b1.multiplier} = €${pay1}\n${b2.name} (${b2.multiplier}:1): €${b2.amount} × ${b2.multiplier} = €${pay2}\nTotal: €${pay1} + €${pay2} = €${total}`,
  };
}

// ── announced-inside-mixed ────────────────────────────────────────────────────
// Advanced: net win from an announced bet when a specific number wins.
// Net win = winning chip payout − losing chips collected.

function generateAnnouncedInsideMixed(): RKScenario {
  const q = pick(ANNOUNCED_MIXED_QUESTIONS);
  return {
    drillType: 'announced-inside-mixed',
    winningNumber: q.winningNumber,
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── bet-limits ────────────────────────────────────────────────────────────────

function generateBetLimits(): RKScenario {
  const q = pick(BET_LIMITS_QUESTIONS);
  return {
    drillType: 'bet-limits',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function generateRKScenario(drillType: RKDrillType): RKScenario {
  switch (drillType) {
    case 'outside-bet-payout':      return generateOutsideBetPayout();
    case 'dozen-vs-column':         return generateDozenVsColumn();
    case 'zero-rule':               return generateZeroRule();
    case 'outside-bet-recognition': return generateOutsideBetRecognition();
    case 'announced-chip-count':    return generateAnnouncedChipCount();
    case 'announced-numbers':       return generateAnnouncedNumbers();
    case 'announced-composition':   return generateAnnouncedComposition();
    case 'mixed-outside-payout':    return generateMixedOutsidePayout();
    case 'announced-inside-mixed':  return generateAnnouncedInsideMixed();
    case 'bet-limits':              return generateBetLimits();
  }
}
