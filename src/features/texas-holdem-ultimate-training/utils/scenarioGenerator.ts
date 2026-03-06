import { dealCards } from '@utils/cardUtils';
import {
  fiveCardHandName,
  type FiveCardRank,
} from '@utils/fiveCardEvaluator';
import { getRandomElement, shuffleArray, getRandomInt } from '@utils/randomUtils';
import {
  bestFiveFromSeven,
  thuDealerQualifies,
} from '@utils/sevenCardBestHand';
import {
  blindPayout,
  blindMultiplier,
  tripsPayout,
  tripsPlusMultiplier,
} from './payouts';
import type { THUScenario, THUDrillType } from '../types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function pick<T>(arr: readonly T[]): T {
  return getRandomElement([...arr]);
}

const RANK_ORDER: FiveCardRank[] = [
  'royal-flush', 'straight-flush', 'four-of-a-kind', 'full-house',
  'flush', 'straight', 'three-of-a-kind', 'two-pair', 'one-pair', 'high-card',
];

function rankIndex(rank: FiveCardRank): number {
  return RANK_ORDER.indexOf(rank);
}

const ALL_FIVE_RANKS: FiveCardRank[] = RANK_ORDER;

function nearbyFiveWrong(correct: FiveCardRank): string[] {
  const idx = ALL_FIVE_RANKS.indexOf(correct);
  return ALL_FIVE_RANKS
    .filter(r => r !== correct)
    .sort((a, b) => Math.abs(ALL_FIVE_RANKS.indexOf(a) - idx) - Math.abs(ALL_FIVE_RANKS.indexOf(b) - idx))
    .slice(0, 3)
    .map(fiveCardHandName);
}

// ── hand-recognition ──────────────────────────────────────────────────────────

function generateHandRecognition(): THUScenario {
  const all7 = dealCards(7);
  const playerHole = all7.slice(0, 2);
  const community  = all7.slice(2, 7);
  const rank = bestFiveFromSeven(all7);
  const correct = fiveCardHandName(rank);
  const options = shuffleArray([correct, ...nearbyFiveWrong(rank)]);

  return {
    drillType: 'hand-recognition',
    playerHoleCards: playerHole,
    communityCards: community,
    question: "What is the player's best 5-card hand from their 2 hole cards + 5 community cards?",
    answerType: 'multiple-choice',
    options,
    correctOption: correct,
    explanation: `Best 5-card hand from 7 cards = ${correct}.`,
  };
}

// ── dealer-qualification ──────────────────────────────────────────────────────

function generateDealerQualification(): THUScenario {
  // ~40% force non-qualifying (high-card)
  let all7 = dealCards(7);
  if (getRandomInt(0, 99) < 40) {
    let att = 0;
    while (thuDealerQualifies(all7) && att < 20) {
      all7 = dealCards(7);
      att++;
    }
  }
  const qualifies = thuDealerQualifies(all7);
  const rank = bestFiveFromSeven(all7);

  return {
    drillType: 'dealer-qualification',
    dealerHoleCards: all7.slice(0, 2),
    communityCards: all7.slice(2, 7),
    question: 'Does the dealer qualify? (Pair or better required)',
    answerType: 'multiple-choice',
    options: ['Yes', 'No'],
    correctOption: qualifies ? 'Yes' : 'No',
    explanation: `Dealer's best hand: ${fiveCardHandName(rank)}. ${qualifies ? 'One Pair or better → qualifies.' : 'High Card — needs at least One Pair to qualify → does NOT qualify.'}`,
  };
}

// ── basic-outcome ─────────────────────────────────────────────────────────────

const BASIC_OUTCOMES = [
  'Dealer does not qualify — Ante returned, other bets still resolved',
  'Player wins (dealer qualifies) — Ante 1:1, Blind pays by table, Play 1:1',
  'Dealer wins — Ante, Blind, Play all collected',
  'Tie — Ante, Blind, Play all pushed',
];

function generateBasicOutcome(): THUScenario {
  const all9 = dealCards(9);
  const playerHole = all9.slice(0, 2);
  const dealerHole = all9.slice(2, 4);
  const community  = all9.slice(4, 9);

  const playerAll7 = [...playerHole, ...community];
  const dealerAll7 = [...dealerHole, ...community];

  const playerRank = bestFiveFromSeven(playerAll7);
  const dealerRank = bestFiveFromSeven(dealerAll7);
  const qualifies  = thuDealerQualifies(dealerAll7);

  const pi = rankIndex(playerRank);
  const di = rankIndex(dealerRank);

  let correctOption: string;
  let explanation: string;

  if (!qualifies) {
    correctOption = BASIC_OUTCOMES[0];
    const comparison = pi <= di
      ? `Player wins comparison (${fiveCardHandName(playerRank)} beats ${fiveCardHandName(dealerRank)}): Blind pays, Play pays 1:1.`
      : `Dealer wins comparison despite not qualifying: Blind and Play collected — but Ante still returned.`;
    explanation = `Dealer's best hand: ${fiveCardHandName(dealerRank)} — does not qualify.\nKey rule: Ante is ALWAYS returned when dealer doesn't qualify.\n${comparison}`;
  } else if (pi < di) {
    correctOption = BASIC_OUTCOMES[1];
    explanation = `Player: ${fiveCardHandName(playerRank)}\nDealer: ${fiveCardHandName(dealerRank)} (qualifies)\nPlayer wins. Ante 1:1. Blind pays by table. Play 1:1.`;
  } else if (pi > di) {
    correctOption = BASIC_OUTCOMES[2];
    explanation = `Player: ${fiveCardHandName(playerRank)}\nDealer: ${fiveCardHandName(dealerRank)} (qualifies)\nDealer wins. Ante, Blind, and Play all collected.`;
  } else {
    correctOption = BASIC_OUTCOMES[3];
    explanation = `Both hands are ${fiveCardHandName(playerRank)}. Tie — all bets pushed.`;
  }

  return {
    drillType: 'basic-outcome',
    playerHoleCards: playerHole,
    dealerHoleCards: dealerHole,
    communityCards: community,
    question: 'Dealer has revealed their cards. What is the outcome?',
    answerType: 'multiple-choice',
    options: shuffleArray([...BASIC_OUTCOMES]),
    correctOption,
    explanation,
  };
}

// ── raise-sizing ──────────────────────────────────────────────────────────────
// Tests raise rules and Play bet calculation across all three decision points.

interface RaiseQuestion {
  type: 'numeric' | 'mc';
  q: string;
  ante?: number;
  answer?: number;
  correct?: string;
  options?: string[];
  explanation: string;
}

const ANTE_AMOUNTS = [10, 15, 20, 25] as const;

function buildRaisePool(): RaiseQuestion[] {
  const ante = pick(ANTE_AMOUNTS);
  return [
    // Numeric calculations
    {
      type: 'numeric',
      q: `Ante is €${ante}. Player raises 3× pre-flop. What is the Play bet?`,
      ante,
      answer: ante * 3,
      explanation: `Pre-flop raise 3×: €${ante} × 3 = €${ante * 3}.\nPre-flop: player may raise 3× or 4× Ante (their choice), or Check.`,
    },
    {
      type: 'numeric',
      q: `Ante is €${ante}. Player raises 4× pre-flop. What is the Play bet?`,
      ante,
      answer: ante * 4,
      explanation: `Pre-flop raise 4×: €${ante} × 4 = €${ante * 4}.\nPre-flop: 3× or 4× Ante are both valid. 4× is the maximum raise.`,
    },
    {
      type: 'numeric',
      q: `Ante is €${ante}. Player checked pre-flop. On the flop, they raise 2×. What is the Play bet?`,
      ante,
      answer: ante * 2,
      explanation: `Flop raise 2×: €${ante} × 2 = €${ante * 2}.\nFlop raise: always 2× Ante — the only valid size at this stage.`,
    },
    {
      type: 'numeric',
      q: `Ante is €${ante}. Player checked pre-flop and flop. On the Turn+River, they raise 1×. What is the Play bet?`,
      ante,
      answer: ante,
      explanation: `Turn+River raise 1×: €${ante} × 1 = €${ante}.\nTurn+River: 1× Ante is the only raise size allowed. Player must raise or fold — cannot check.`,
    },
    // Rule Q&As
    {
      type: 'mc',
      q: 'Player checked pre-flop and flop. At the Turn+River, can they check again?',
      correct: 'No — must raise 1× Ante or Fold',
      options: ['No — must raise 1× Ante or Fold', 'Yes — they can check one more time', 'Yes — they can check up to 3 times', 'No — must fold if checked twice'],
      explanation: 'The Turn+River is the final decision point. Checking is not allowed here — player must raise 1× Ante or fold. Folding loses both Ante and Blind.',
    },
    {
      type: 'mc',
      q: 'Player raised 4× pre-flop. Can they raise again on the flop?',
      correct: 'No — once player raises, all later decision points are skipped',
      options: ['No — once player raises, all later decision points are skipped', 'Yes — 2× Ante on the flop is still allowed', 'Yes — 1× Ante on the flop', 'No — they must check on the flop'],
      explanation: 'Player gets exactly ONE chance to raise their Play bet across the whole hand. Once raised at any stage, all remaining decision points are skipped.',
    },
  ];
}

function generateRaiseSizing(): THUScenario {
  const pool = buildRaisePool();
  const q = pick(pool);

  if (q.type === 'numeric') {
    return {
      drillType: 'raise-sizing',
      anteAmount: q.ante,
      question: q.q,
      answerType: 'numeric',
      correctAnswer: q.answer,
      explanation: q.explanation,
    };
  }
  return {
    drillType: 'raise-sizing',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...(q.options ?? [])]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── blind-payout ──────────────────────────────────────────────────────────────

// Use even Blind amounts for Flush so 3:2 result is always an integer (10→15, 20→30, 30→45)
const FLUSH_BLIND_AMOUNTS = [10, 20, 30] as const;
const STD_BLIND_AMOUNTS   = [10, 15, 20, 25] as const;

const BLIND_PAYING_RANKS: FiveCardRank[] = [
  'royal-flush', 'straight-flush', 'four-of-a-kind', 'full-house', 'flush', 'straight',
];

function generateBlindPayout(): THUScenario {
  let all7 = dealCards(7);
  let rank = bestFiveFromSeven(all7);
  let att = 0;
  while (!BLIND_PAYING_RANKS.includes(rank) && att < 30) {
    all7 = dealCards(7);
    rank = bestFiveFromSeven(all7);
    att++;
  }

  const blind = rank === 'flush' ? pick(FLUSH_BLIND_AMOUNTS) : pick(STD_BLIND_AMOUNTS);
  const payout = blindPayout(rank, blind);
  const mult = blindMultiplier(rank)!;

  return {
    drillType: 'blind-payout',
    playerHoleCards: all7.slice(0, 2),
    communityCards: all7.slice(2, 7),
    blindAmount: blind,
    question: `Player wins with ${fiveCardHandName(rank)}. Blind is €${blind}.\nWhat does the Blind pay? (Net payout, not including returning the bet)`,
    answerType: 'numeric',
    correctAnswer: payout,
    explanation: rank === 'flush'
      ? `Flush pays 3:2 on the Blind (= ×1.5).\n€${blind} × 1.5 = €${payout}.`
      : `${fiveCardHandName(rank)} → Blind pays ${mult}:1.\n€${blind} × ${mult} = €${payout}.`,
  };
}

// ── trips-plus-payout ─────────────────────────────────────────────────────────

const TRIPS_AMOUNTS = [1, 5] as const;

function generateTripsPlusPayout(): THUScenario {
  const giveTrips = getRandomInt(0, 99) < 70;
  const tripsRanks: FiveCardRank[] = [
    'royal-flush', 'straight-flush', 'four-of-a-kind', 'full-house',
    'flush', 'straight', 'three-of-a-kind',
  ];

  let all7 = dealCards(7);
  let rank = bestFiveFromSeven(all7);

  if (giveTrips) {
    let att = 0;
    while (!tripsRanks.includes(rank) && att < 30) {
      all7 = dealCards(7);
      rank = bestFiveFromSeven(all7);
      att++;
    }
  }

  const trips = pick(TRIPS_AMOUNTS);
  const mult  = tripsPlusMultiplier(rank);
  const payout = tripsPayout(rank, trips);

  return {
    drillType: 'trips-plus-payout',
    playerHoleCards: all7.slice(0, 2),
    communityCards: all7.slice(2, 7),
    tripsAmount: trips,
    question: `Player's final best hand: ${fiveCardHandName(rank)}.\nTrips Plus bet: €${trips}.\nWhat is the Trips Plus payout?`,
    answerType: 'numeric',
    correctAnswer: payout,
    explanation: mult > 0
      ? `${fiveCardHandName(rank)} pays ${mult}:1 on Trips Plus.\n€${trips} × ${mult} = €${payout}.\nTrips Plus pays regardless of dealer qualification or hand comparison result.`
      : `${fiveCardHandName(rank)} does not qualify for Trips Plus.\nMinimum: Three of a Kind (3:1). Payout: €0.`,
  };
}

// ── no-qualify-scenario ───────────────────────────────────────────────────────
// Key rule: Ante is ALWAYS returned when dealer doesn't qualify —
// even if dealer wins the hand comparison.

interface NoQualifyQuestion { q: string; correct: string; options: string[]; explanation: string }

const NO_QUALIFY_QUESTIONS: NoQualifyQuestion[] = [
  {
    q: 'Dealer does not qualify (High Card). Dealer wins the hand comparison. What happens to the Ante?',
    correct: 'Ante is returned — dealer never collects Ante when they do not qualify',
    options: [
      'Ante is returned — dealer never collects Ante when they do not qualify',
      'Ante is collected — dealer won the comparison',
      'Ante pays 1:1 to player',
      'Ante stays in play for next round',
    ],
    explanation: 'THU key rule: Ante is ALWAYS returned (pushed) when dealer does not qualify — regardless of who wins the hand comparison.\nBlind and Play are still resolved by normal hand comparison.',
  },
  {
    q: 'Dealer does not qualify. Player wins the comparison. What happens to the Play bet?',
    correct: 'Play pays 1:1',
    options: [
      'Play pays 1:1',
      'Play is returned (pushed)',
      'Play pays 2:1 as bonus for no-qualify',
      'Play is collected — dealer doesn\'t qualify so nothing pays',
    ],
    explanation: 'When dealer doesn\'t qualify: Ante is returned (push), but Play is still resolved by hand comparison.\nPlayer wins comparison → Play pays 1:1 normally.',
  },
  {
    q: 'Dealer does not qualify. Dealer wins the hand comparison. What happens to the Blind?',
    correct: 'Blind is collected — player lost the comparison',
    options: [
      'Blind is collected — player lost the comparison',
      'Blind is returned — dealer doesn\'t qualify so nothing is collected',
      'Blind pays 1:1 (no-qualify bonus)',
      'Blind pushes always when dealer doesn\'t qualify',
    ],
    explanation: 'Blind is resolved by hand comparison, NOT dealer qualification.\nDealer wins comparison → Blind is collected.\nOnly the Ante is automatically returned when dealer doesn\'t qualify.',
  },
];

function generateNoQualifyScenario(): THUScenario {
  const q = pick(NO_QUALIFY_QUESTIONS);
  return {
    drillType: 'no-qualify-scenario',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── blind-push ────────────────────────────────────────────────────────────────
// Player wins with less than a Straight → Blind PUSHES (returned, no extra payment).

const PUSH_RANKS: FiveCardRank[] = ['two-pair', 'one-pair', 'high-card'];

function generateBlindPush(): THUScenario {
  let all7 = dealCards(7);
  let rank = bestFiveFromSeven(all7);
  let att = 0;
  while (!PUSH_RANKS.includes(rank) && att < 30) {
    all7 = dealCards(7);
    rank = bestFiveFromSeven(all7);
    att++;
  }
  // Ensure dealer doesn't have a better hand (simple: use different 7 cards)
  const blind = pick(STD_BLIND_AMOUNTS);

  return {
    drillType: 'blind-push',
    playerHoleCards: all7.slice(0, 2),
    communityCards: all7.slice(2, 7),
    blindAmount: blind,
    question: `Player wins with ${fiveCardHandName(rank)}. Blind is €${blind}.\nWhat does the Blind pay?`,
    answerType: 'multiple-choice',
    options: shuffleArray([
      'Push — Blind returned to player',
      `€${blind} (1:1)`,
      `€${blind * 2} (2:1)`,
      'Blind is collected — player must have Straight or better',
    ]),
    correctOption: 'Push — Blind returned to player',
    explanation: `${fiveCardHandName(rank)} is below a Straight → Blind PUSHES (returned to player).\nBlind only pays (by table) when player wins with a Straight or better.\nStraight=1:1, Flush=3:2, Full House=3:1, Four of a Kind=10:1, SF=50:1, RF=500:1.`,
  };
}

// ── blind-no-qualify ──────────────────────────────────────────────────────────
// Advanced: dealer doesn't qualify, player wins with Straight — Blind pays 1:1.
// Tests the combo of no-qualify + Blind pay table.

interface BlindNoQualifyQuestion { q: string; blind: number; correct: string; options: string[]; explanation: string }

function buildBlindNoQualifyPool(): BlindNoQualifyQuestion[] {
  const blind = pick(STD_BLIND_AMOUNTS);
  return [
    {
      q: `Dealer does not qualify. Player wins with a Straight. Blind is €${blind}.\nWhat does the Blind pay?`,
      blind,
      correct: `€${blind} (1:1)`,
      options: [
        `€${blind} (1:1)`,
        '€0 — Blind pushes when dealer doesn\'t qualify',
        `€${blind} returned (push)`,
        `€${blind * 3} (3:1) — Full House rate`,
      ],
      explanation: `Straight pays 1:1 on the Blind.\n€${blind} × 1 = €${blind}.\nKey: Blind resolution depends on HAND RANK and player winning — not on dealer qualification.\nDealer no-qualify only affects the Ante (returned).`,
    },
    {
      q: `Dealer does not qualify. Player wins with a Full House. Blind is €${blind}.\nWhat does the Blind pay?`,
      blind,
      correct: `€${blind * 3} (3:1)`,
      options: [
        `€${blind * 3} (3:1)`,
        '€0 — Blind only pays when dealer qualifies',
        `€${blind} (1:1)`,
        `€${blind} returned (push)`,
      ],
      explanation: `Full House pays 3:1 on the Blind.\n€${blind} × 3 = €${blind * 3}.\nBlind pays by table whenever player wins the hand comparison — dealer qualification does not affect the Blind.`,
    },
  ];
}

function generateBlindNoQualify(): THUScenario {
  const pool = buildBlindNoQualifyPool();
  const q = pick(pool);
  return {
    drillType: 'blind-no-qualify',
    blindAmount: q.blind,
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── full-outcome ──────────────────────────────────────────────────────────────
// Advanced: multi-bet resolution scenarios testing the most commonly confused rules.

interface FullOutcomeQuestion { q: string; correct: string; options: string[]; explanation: string }

const FULL_OUTCOME_QUESTIONS: FullOutcomeQuestion[] = [
  {
    q: 'Ante €20, Blind €20, Play €40 (raised 2× on flop). Dealer does NOT qualify. Dealer wins comparison.\nWhich outcome is correct?',
    correct: 'Ante returned, Blind collected, Play collected',
    options: [
      'Ante returned, Blind collected, Play collected',
      'All bets returned — dealer doesn\'t qualify',
      'Ante returned, Blind returned, Play collected',
      'All bets collected — dealer wins comparison',
    ],
    explanation: 'Dealer does not qualify → Ante returned (push).\nDealer wins comparison → Blind collected, Play collected.\nKey: Only Ante is automatically returned. Blind and Play are still resolved by hand comparison.',
  },
  {
    q: 'Ante €20, Blind €20, Play €80 (raised 4× pre-flop). Dealer does NOT qualify. Player wins with Full House.\nWhat is the Blind payout?',
    correct: '€60 (Full House 3:1)',
    options: [
      '€60 (Full House 3:1)',
      '€0 — Blind only pays when dealer qualifies',
      '€20 (1:1)',
      '€20 returned (push)',
    ],
    explanation: 'Dealer does not qualify → Ante returned.\nPlayer wins → Blind pays by table. Full House = 3:1: €20 × 3 = €60.\nPlay pays 1:1: €80.\nBlind pays whenever player wins — dealer qualification does not affect the Blind.',
  },
  {
    q: 'Ante €15, Blind €15, Play €45 (raised 3× pre-flop), Trips Plus €5. Dealer qualifies. Player wins with Three of a Kind.\nWhat is the Trips Plus payout?',
    correct: '€15 (Three of a Kind 3:1)',
    options: [
      '€15 (Three of a Kind 3:1)',
      '€5 (1:1)',
      '€0 — Trips Plus needs better than Three of a Kind',
      '€20 (4:1 — Straight rate)',
    ],
    explanation: 'Three of a Kind pays 3:1 on Trips Plus.\n€5 × 3 = €15.\nTrips Plus is fully independent — pays based on player\'s final best 5-card hand, regardless of dealer qualification or hand comparison.',
  },
];

function generateFullOutcome(): THUScenario {
  const q = pick(FULL_OUTCOME_QUESTIONS);
  return {
    drillType: 'full-outcome',
    question: q.q,
    answerType: 'multiple-choice',
    options: shuffleArray([...q.options]),
    correctOption: q.correct,
    explanation: q.explanation,
  };
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function generateTHUScenario(drillType: THUDrillType): THUScenario {
  switch (drillType) {
    case 'hand-recognition':     return generateHandRecognition();
    case 'dealer-qualification': return generateDealerQualification();
    case 'basic-outcome':        return generateBasicOutcome();
    case 'raise-sizing':         return generateRaiseSizing();
    case 'blind-payout':         return generateBlindPayout();
    case 'trips-plus-payout':    return generateTripsPlusPayout();
    case 'no-qualify-scenario':  return generateNoQualifyScenario();
    case 'blind-push':           return generateBlindPush();
    case 'blind-no-qualify':     return generateBlindNoQualify();
    case 'full-outcome':         return generateFullOutcome();
  }
}
