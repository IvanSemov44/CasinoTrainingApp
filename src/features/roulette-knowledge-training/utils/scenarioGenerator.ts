import type { RKScenario, RKDrillType } from '../types';
import { getRandomElement, shuffleArray } from '@utils/randomUtils';
import {
  ANNOUNCED_COMPOSITION_QUESTIONS,
  ANNOUNCED_MIXED_QUESTIONS,
  BET_LIMITS_QUESTIONS,
  DOZEN_VS_COLUMN_QUESTIONS,
  ZERO_RULE_QUESTIONS,
  RECOGNITION_QUESTIONS,
  CHIP_COUNT_QUESTIONS,
  ANNOUNCED_NUMBERS_QUESTIONS,
} from '../constants/questions';

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
