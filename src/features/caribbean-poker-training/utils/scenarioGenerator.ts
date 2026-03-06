import { dealCards, SUITS, type Card } from '@utils/cardUtils';
import {
  evaluateFiveCardHand,
  fiveCardHandName,
  caribbeanDealerQualifies,
  compareFiveCardHands,
  type FiveCardRank,
} from '@utils/fiveCardEvaluator';
import { getRandomElement, shuffleArray, getRandomInt } from '@utils/randomUtils';
import {
  callBetMultiplier,
  callBetPayout,
  bonusFixedPayout,
  bonusQualifies,
} from './payouts';
import type { CPScenario, CPDrillType } from '../types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function pick<T>(arr: readonly T[]): T {
  return getRandomElement([...arr]);
}

function suitLabel(suit: string): string {
  const s: Record<string, string> = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
  return s[suit] ?? suit;
}

function cardLabel(c: Card): string { return `${c.rank}${suitLabel(c.suit)}`; }
function handLabel(cards: Card[]): string { return cards.map(cardLabel).join(' '); }

// ── hand-recognition ──────────────────────────────────────────────────────────

const ALL_FIVE_RANKS: FiveCardRank[] = [
  'royal-flush', 'straight-flush', 'four-of-a-kind', 'full-house',
  'flush', 'straight', 'three-of-a-kind', 'two-pair', 'one-pair', 'high-card',
];

function nearbyFiveWrong(correct: FiveCardRank): string[] {
  const idx = ALL_FIVE_RANKS.indexOf(correct);
  return ALL_FIVE_RANKS
    .filter(r => r !== correct)
    .sort((a, b) => Math.abs(ALL_FIVE_RANKS.indexOf(a) - idx) - Math.abs(ALL_FIVE_RANKS.indexOf(b) - idx))
    .slice(0, 3)
    .map(fiveCardHandName);
}

function generateHandRecognition(): CPScenario {
  const cards = dealCards(5);
  const rank = evaluateFiveCardHand(cards);
  const correct = fiveCardHandName(rank);
  const options = shuffleArray([correct, ...nearbyFiveWrong(rank)]);

  return {
    drillType: 'hand-recognition',
    playerCards: cards,
    question: 'What hand is this?',
    answerType: 'multiple-choice',
    options,
    correctOption: correct,
    explanation: `${handLabel(cards)} = ${correct}.`,
  };
}

// ── dealer-qualification ──────────────────────────────────────────────────────

function generateDealerQualification(): CPScenario {
  // ~40% chance: generate a non-qualifying hand (high-card without A+K)
  let cards = dealCards(5);
  if (getRandomInt(0, 99) < 40) {
    let attempts = 0;
    while (caribbeanDealerQualifies(cards) && attempts < 20) {
      cards = dealCards(5);
      attempts++;
    }
  }

  const qualifies = caribbeanDealerQualifies(cards);
  const rank = evaluateFiveCardHand(cards);
  const correct = qualifies ? 'Yes' : 'No';

  let explanation: string;
  if (rank !== 'high-card') {
    explanation = `${handLabel(cards)} = ${fiveCardHandName(rank)}. Any made hand always qualifies.`;
  } else {
    const hasAce = cards.some(c => c.rank === 'A');
    const hasKing = cards.some(c => c.rank === 'K');
    if (qualifies) {
      explanation = `${handLabel(cards)} = High Card with Ace and King. A-K or better → qualifies. ✓`;
    } else if (hasAce && !hasKing) {
      explanation = `${handLabel(cards)} = High Card with Ace but no King. Needs both Ace AND King to qualify. ✗`;
    } else if (!hasAce && hasKing) {
      explanation = `${handLabel(cards)} = High Card with King but no Ace. Needs both Ace AND King to qualify. ✗`;
    } else {
      explanation = `${handLabel(cards)} = High Card (no Ace, no King). Needs at least A-K high to qualify. ✗`;
    }
  }

  return {
    drillType: 'dealer-qualification',
    dealerCards: cards,
    question: 'Does the dealer qualify? (Ace-King or better required)',
    answerType: 'multiple-choice',
    options: ['Yes', 'No'],
    correctOption: correct,
    explanation,
  };
}

// ── basic-outcome ─────────────────────────────────────────────────────────────

const BASIC_OUTCOMES = [
  'Dealer does not qualify — Ante pays 1:1, Call returned',
  'Player wins — Ante 1:1, Call pays by hand table',
  'Dealer wins — Ante and Call collected',
  'Tie — Ante and Call pushed',
];

function generateBasicOutcome(): CPScenario {
  const all = dealCards(10);
  const playerCards = all.slice(0, 5);
  const dealerCards = all.slice(5, 10);

  const qualifies = caribbeanDealerQualifies(dealerCards);
  const cmp = compareFiveCardHands(playerCards, dealerCards);

  let correctOption: string;
  let explanation: string;

  if (!qualifies) {
    correctOption = BASIC_OUTCOMES[0];
    explanation = [
      `Dealer: ${handLabel(dealerCards)} = ${fiveCardHandName(evaluateFiveCardHand(dealerCards))}`,
      `Dealer does not qualify (needs A-K or better).`,
      `Ante pays 1:1. Call bet returned to player.`,
    ].join('\n');
  } else if (cmp === 1) {
    correctOption = BASIC_OUTCOMES[1];
    explanation = [
      `Player: ${handLabel(playerCards)} = ${fiveCardHandName(evaluateFiveCardHand(playerCards))}`,
      `Dealer: ${handLabel(dealerCards)} = ${fiveCardHandName(evaluateFiveCardHand(dealerCards))} (qualifies)`,
      `Player wins. Ante 1:1. Call bet pays ${callBetMultiplier(evaluateFiveCardHand(playerCards))}:1.`,
    ].join('\n');
  } else if (cmp === -1) {
    correctOption = BASIC_OUTCOMES[2];
    explanation = [
      `Player: ${handLabel(playerCards)} = ${fiveCardHandName(evaluateFiveCardHand(playerCards))}`,
      `Dealer: ${handLabel(dealerCards)} = ${fiveCardHandName(evaluateFiveCardHand(dealerCards))} (qualifies)`,
      `Dealer wins. Ante and Call collected.`,
    ].join('\n');
  } else {
    correctOption = BASIC_OUTCOMES[3];
    explanation = `Both hands are equal rank — Tie. Ante and Call pushed.`;
  }

  const options = shuffleArray([...BASIC_OUTCOMES]);

  return {
    drillType: 'basic-outcome',
    playerCards,
    dealerCards,
    question: 'What is the outcome?',
    answerType: 'multiple-choice',
    options,
    correctOption,
    explanation,
  };
}

// ── call-bet-payout ───────────────────────────────────────────────────────────

const ANTE_AMOUNTS = [15, 20, 25] as const;

function generateCallBetPayout(): CPScenario {
  // Generate player hand (pair or better so it clearly beats dealer)
  let playerCards = dealCards(5);
  let playerRank = evaluateFiveCardHand(playerCards);
  let attempts = 0;
  while (playerRank === 'high-card' && attempts < 20) {
    playerCards = dealCards(5);
    playerRank = evaluateFiveCardHand(playerCards);
    attempts++;
  }

  const ante = pick(ANTE_AMOUNTS);
  const payout = callBetPayout(playerRank, ante);
  const mult = callBetMultiplier(playerRank);

  return {
    drillType: 'call-bet-payout',
    playerCards,
    betAmount: ante,
    question: `Ante: €${ante} · Call bet: €${ante * 2}\nPlayer wins with ${fiveCardHandName(playerRank)} (dealer qualifies).\nWhat is the Call bet payout?`,
    answerType: 'numeric',
    correctAnswer: payout,
    explanation: `${fiveCardHandName(playerRank)} pays ${mult}:1 on the Call bet.\nCall bet = €${ante} × 2 = €${ante * 2}\n€${ante * 2} × ${mult} = €${payout}`,
  };
}

// ── bonus-payout ──────────────────────────────────────────────────────────────

const BONUS_RANKS: FiveCardRank[] = ['royal-flush', 'straight-flush', 'four-of-a-kind', 'full-house', 'flush'];

function bonusOption(rank: FiveCardRank, swapped: boolean): string {
  const amt = bonusFixedPayout(rank, swapped);
  return amt > 0 ? `€${amt}` : '€0 — hand does not qualify';
}

function generateBonusPayout(): CPScenario {
  const giveBonusHand = getRandomInt(0, 99) < 60;
  let cards = dealCards(5);
  let rank = evaluateFiveCardHand(cards);

  if (giveBonusHand) {
    let att = 0;
    while (!BONUS_RANKS.includes(rank) && att < 30) {
      cards = dealCards(5);
      rank = evaluateFiveCardHand(cards);
      att++;
    }
  }

  const payout = bonusFixedPayout(rank, false);
  const correct = bonusOption(rank, false);

  // Build 3 plausible wrong options
  const wrongAmounts = bonusQualifies(rank)
    ? BONUS_RANKS.filter(r => r !== rank).map(r => `€${bonusFixedPayout(r, false)}`)
    : BONUS_RANKS.slice(0, 3).map(r => `€${bonusFixedPayout(r, false)}`);
  const uniqueWrongs = [...new Set(wrongAmounts)].filter(o => o !== correct).slice(0, 3);

  const options = shuffleArray([correct, ...uniqueWrongs]);

  const payNote = 'Bonus pays regardless of dealer result and regardless of whether player folded.';
  const explanation = payout > 0
    ? `${handLabel(cards)} = ${fiveCardHandName(rank)}. Bonus payout: €${payout}. ${payNote}`
    : `${handLabel(cards)} = ${fiveCardHandName(rank)}. Only Royal Flush, Straight Flush, Four of a Kind, Full House, and Flush trigger the Bonus. Payout: €0.`;

  return {
    drillType: 'bonus-payout',
    playerCards: cards,
    question: 'Player has a €1 Bonus bet. What is the Bonus payout?',
    answerType: 'multiple-choice',
    options,
    correctOption: correct,
    explanation,
  };
}

// ── bonus-after-swap ──────────────────────────────────────────────────────────

function generateBonusAfterSwap(): CPScenario {
  // Always generate a qualifying Bonus hand
  let cards = dealCards(5);
  let rank = evaluateFiveCardHand(cards);
  let att = 0;
  while (!BONUS_RANKS.includes(rank) && att < 30) {
    cards = dealCards(5);
    rank = evaluateFiveCardHand(cards);
    att++;
  }

  const normalPayout = bonusFixedPayout(rank, false);
  const swapPayout = bonusFixedPayout(rank, true);
  const correct = `€${swapPayout}`;

  const wrongOptions = [
    `€${normalPayout} (same as normal)`,
    `€0 — swap cancels Bonus`,
    `€${Math.round(normalPayout * 0.75)} (¾ of normal)`,
  ].filter(o => o !== correct).slice(0, 3);

  const options = shuffleArray([correct, ...wrongOptions]);

  return {
    drillType: 'bonus-after-swap',
    playerCards: cards,
    swapped: true,
    question: `Player swapped a card. Final hand: ${fiveCardHandName(rank)}.\nPlayer has a €1 Bonus bet. What is the Bonus payout?`,
    answerType: 'multiple-choice',
    options,
    correctOption: correct,
    explanation: `${fiveCardHandName(rank)} standard Bonus = €${normalPayout}. After swap → ALL Bonus payouts are halved. €${normalPayout} ÷ 2 = €${swapPayout}.`,
  };
}

// ── no-qualify-outcome ────────────────────────────────────────────────────────

const NO_QUALIFY_OPTIONS = [
  'Ante pays 1:1, Call returned to player',
  'Ante and Call both collected by dealer',
  'Ante and Call both pay 1:1',
  'Ante and Call both pushed',
];

function generateNoQualifyOutcome(): CPScenario {
  // Generate a dealer hand that does NOT qualify
  let dealerCards = dealCards(5);
  let att = 0;
  while (caribbeanDealerQualifies(dealerCards) && att < 30) {
    dealerCards = dealCards(5);
    att++;
  }

  const playerCards = dealCards(5);
  const ante = pick(ANTE_AMOUNTS);
  const correct = NO_QUALIFY_OPTIONS[0];

  return {
    drillType: 'no-qualify-outcome',
    playerCards,
    dealerCards,
    betAmount: ante,
    question: `Dealer has: ${handLabel(dealerCards)} = ${fiveCardHandName(evaluateFiveCardHand(dealerCards))}\nAnte: €${ante} · Call: €${ante * 2}\nDealer does not qualify. Player played. What happens?`,
    answerType: 'multiple-choice',
    options: shuffleArray([...NO_QUALIFY_OPTIONS]),
    correctOption: correct,
    explanation: `Dealer does not have A-K or better → does not qualify.\nAnte pays 1:1 (€${ante} → player wins €${ante}).\nCall bet is returned to the player (pushed) — it does NOT pay the hand table.\nBonus is resolved separately.`,
  };
}

// ── bonus-on-fold ─────────────────────────────────────────────────────────────

function generateBonusOnFold(): CPScenario {
  // Generate a bonus-qualifying hand for a player who "folded"
  let cards = dealCards(5);
  let rank = evaluateFiveCardHand(cards);
  let att = 0;
  while (!BONUS_RANKS.includes(rank) && att < 30) {
    cards = dealCards(5);
    rank = evaluateFiveCardHand(cards);
    att++;
  }

  const payout = bonusFixedPayout(rank, false);
  const correct = `€${payout} — Bonus pays regardless`;

  const options = shuffleArray([
    correct,
    '€0 — player folded, Bonus forfeited',
    `€${Math.round(payout / 2)} — half because player folded`,
    '€0 — Bonus only pays if player played',
  ]);

  return {
    drillType: 'bonus-on-fold',
    playerCards: cards,
    question: `Player FOLDED their Ante.\nThey have a €1 Bonus bet and a ${fiveCardHandName(rank)} in their hand.\nWhat is the Bonus payout?`,
    answerType: 'multiple-choice',
    options,
    correctOption: correct,
    explanation: `${fiveCardHandName(rank)} → Bonus payout: €${payout}.\nKey rule: Bonus is FULLY INDEPENDENT — it pays based on the player's hand only.\nBonus pays even if the player folded their Ante. This is the most commonly forgotten rule.`,
  };
}

// ── swap-procedure ────────────────────────────────────────────────────────────

interface SwapQuestion { q: string; correct: string; options: string[]; explanation: string }

const SWAP_QUESTIONS: SwapQuestion[] = [
  {
    q: 'Player wants to swap one card. What is the swap fee?',
    correct: '1× Ante',
    options: ['1× Ante', '2× Ante', '€1 fixed', 'Free — no cost'],
    explanation: 'Swap fee = exactly 1× Ante. The player pays the swap fee when handing over their card in Phase 2.',
  },
  {
    q: 'Player swapped a card and then decides to fold. Does the Bonus pay?',
    correct: 'Yes — Bonus pays regardless of folding or swapping',
    options: [
      'Yes — Bonus pays regardless of folding or swapping',
      'No — forfeited when player folds after swap',
      'Only if the hand qualified before the swap',
      'Half — because they both swapped and folded',
    ],
    explanation: 'Bonus is completely independent. It pays based on the FINAL hand only, regardless of fold/play decision and regardless of whether the player swapped.',
  },
  {
    q: 'Dealer is in Phase 2. All folds have been processed and all Call bets verified. What does the dealer do next?',
    correct: 'Process each swap: collect card + fee, deal replacement card',
    options: [
      'Process each swap: collect card + fee, deal replacement card',
      'Reveal the dealer hand immediately',
      'Ask swap players if they want to fold or play first',
      'Collect all antes from swap players',
    ],
    explanation: 'Phase 2 order: (1) Collect folds, (2) Verify Call bets, (3) Process swaps — collect swapped card + fee, deal new card. THEN (4) swap players make their final Fold/Play decision.',
  },
];

function generateSwapProcedure(): CPScenario {
  const q = pick(SWAP_QUESTIONS);
  return {
    drillType: 'swap-procedure',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function generateCPScenario(drillType: CPDrillType): CPScenario {
  switch (drillType) {
    case 'hand-recognition':     return generateHandRecognition();
    case 'dealer-qualification': return generateDealerQualification();
    case 'basic-outcome':        return generateBasicOutcome();
    case 'call-bet-payout':      return generateCallBetPayout();
    case 'bonus-payout':         return generateBonusPayout();
    case 'bonus-after-swap':     return generateBonusAfterSwap();
    case 'no-qualify-outcome':   return generateNoQualifyOutcome();
    case 'bonus-on-fold':        return generateBonusOnFold();
    case 'swap-procedure':       return generateSwapProcedure();
  }
}
