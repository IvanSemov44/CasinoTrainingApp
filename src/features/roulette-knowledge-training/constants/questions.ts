/**
 * Static question data for Roulette Knowledge Training
 * Organized by drill type to keep scenarioGenerator clean
 */

interface StaticQuestion {
  q: string;
  correct: string;
  options: string[];
  explanation: string;
}

interface AnnouncedMixedQuestion {
  q: string;
  correct: string;
  options: string[];
  explanation: string;
  winningNumber: number;
}

export const ANNOUNCED_COMPOSITION_QUESTIONS: StaticQuestion[] = [
  {
    q: 'Jeu Zéro includes a Straight Up on which number?',
    correct: '26',
    options: ['26', '0', '17', '32'],
    explanation: 'Jeu Zéro = Straight Up [26] + Split [0,3] + Split [12,15] + Split [32,35].\n26 is the only Straight Up in Jeu Zéro. All others are split bets.',
  },
  {
    q: 'Which announced bet uses a Corner bet on 25-26-28-29?',
    correct: 'Voisins du Zéro',
    options: ['Voisins du Zéro', 'Tiers du Cylindre', 'Orphelins', 'Jeu Zéro'],
    explanation: 'Voisins du Zéro includes 2 chips on the Corner [25,26,28,29] (plus 2 chips on Street [0,2,3] and 5 split bets).\nNo other announced bet uses a corner.',
  },
  {
    q: 'Orphelins includes a Straight Up on which number?',
    correct: '1',
    options: ['1', '17', '0', '6'],
    explanation: 'Orphelins = Straight Up [1] + Split [6,9] + Split [14,17] + Split [17,20] + Split [31,34].\n1 is the only Straight Up. Note that 17 appears in TWO splits (covered twice).',
  },
  {
    q: 'Tiers du Cylindre is composed entirely of which bet type?',
    correct: 'Split bets (6 splits covering 12 numbers)',
    options: [
      'Split bets (6 splits covering 12 numbers)',
      'Street bets (4 streets)',
      'Corner bets (3 corners)',
      'A mix of splits and straights',
    ],
    explanation: 'Tiers = 6 split bets: [5,8] [10,11] [13,16] [23,24] [27,30] [33,36].\nAll 6 components are splits. It is the simplest announced bet structurally — 6 chips, all splits.',
  },
  {
    q: 'Voisins du Zéro includes a Street bet. Which numbers does it cover?',
    correct: '0, 2, 3',
    options: ['0, 2, 3', '1, 2, 3', '32, 35', '25, 26, 28, 29'],
    explanation: 'Voisins du Zéro includes a Street (trio) on 0-2-3 (placed with 2 chips).\nThis is the top street of the table layout, covering 0, 2, and 3. It pays 11:1.',
  },
];

export const ANNOUNCED_MIXED_QUESTIONS: AnnouncedMixedQuestion[] = [
  {
    winningNumber: 26,
    q: 'Jeu Zéro placed at €2/chip (4 chips total). Number 26 wins.\nThe Straight Up on 26 pays 35:1. What is the NET WIN from Jeu Zéro?',
    correct: '€64',
    options: ['€64', '€70', '€60', '€62'],
    explanation: 'Jeu Zéro: Straight [26] + Split [0,3] + Split [12,15] + Split [32,35].\n26 wins → only Straight Up [26] wins.\nWin: 1 chip × €2 × 35 = €70. Lose: 3 chips × €2 = €6.\nNet win: €70 − €6 = €64.',
  },
  {
    winningNumber: 33,
    q: 'Tiers du Cylindre placed at €5/chip (6 chips = €30). Number 33 wins.\nSplit [33,36] within Tiers wins (pays 17:1). What is the NET WIN from Tiers?',
    correct: '€60',
    options: ['€60', '€85', '€55', '€30'],
    explanation: 'Tiers: 6 split bets including [33,36].\n33 wins → only split [33,36] hits.\nWin: 1 chip × €5 × 17 = €85. Lose: 5 chips × €5 = €25.\nNet win: €85 − €25 = €60.',
  },
  {
    winningNumber: 4,
    q: 'Neighbors of 19 placed at €1/chip (5 chips: 32, 15, 19, 4, 21). Number 4 wins.\nWhat is the NET WIN from this Neighbors bet?',
    correct: '€31',
    options: ['€31', '€35', '€30', '€4'],
    explanation: 'Neighbors: 5 Straight Up bets at €1 each covering 32, 15, 19, 4, 21.\n4 wins → Straight Up [4] wins.\nWin: 1 chip × €1 × 35 = €35. Lose: 4 chips × €1 = €4.\nNet win: €35 − €4 = €31.',
  },
  {
    winningNumber: 26,
    q: 'Jeu Zéro at €1/chip + extra €5 Straight Up on 26. Number 26 wins.\nWhat is the COMBINED NET WIN from both bets?',
    correct: '€207',
    options: ['€207', '€175', '€210', '€170'],
    explanation: 'Jeu Zéro (€1/chip): Straight [26] wins → €35 net. 3 losing chips = −€3. Jeu Zéro net: €32.\nExtra Straight Up €5 on 26: €5 × 35 = €175.\nCombined: €32 + €175 = €207.',
  },
];

export const BET_LIMITS_QUESTIONS: StaticQuestion[] = [
  {
    q: 'What is the maximum inside bet on the standard table?',
    correct: '€200',
    options: ['€200', '€500', '€100', '€1,000'],
    explanation: 'Standard table: inside bets min €2, max €200.\nThis maximum is the same on both standard and high tables.',
  },
  {
    q: 'What is the maximum inside bet on the high table?',
    correct: '€200 — same as the standard table',
    options: ['€200 — same as the standard table', '€500', '€300', '€1,000'],
    explanation: 'Inside bet maximum is €200 on BOTH standard and high tables.\nOnly the minimum changes: €2 (standard) vs €5 (high).',
  },
  {
    q: 'What is the maximum bet on Red/Black (even-money) on the standard table?',
    correct: '€1,000',
    options: ['€1,000', '€500', '€200', '€750'],
    explanation: 'Even-money bets (Red/Black, Even/Odd, Low/High): max €1,000 on standard table.\nDozen/Column: max €500. Inside bets: max €200.',
  },
  {
    q: 'Standard table — what is the minimum for a Dozen or Column bet?',
    correct: '€10',
    options: ['€10', '€2', '€5', '€25'],
    explanation: 'Standard table:\n• Inside bets: min €2\n• Dozen/Column: min €10\n• Even-money (Red/Black etc.): min €10',
  },
  {
    q: 'High table — what is the minimum for a Dozen or Column bet?',
    correct: '€25',
    options: ['€25', '€10', '€5', '€50'],
    explanation: 'High table:\n• Inside bets: min €5\n• Dozen/Column: min €25\n• Even-money: min €25\nMaximums are the same as the standard table.',
  },
  {
    q: 'What is the maximum for Dozen and Column bets on both tables?',
    correct: '€500',
    options: ['€500', '€200', '€1,000', '€300'],
    explanation: 'Dozen/Column max: €500 (same on both standard and high tables).\nEven-money max: €1,000. Inside max: €200.',
  },
];
