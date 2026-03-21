/**
 * Static question data for Roulette Knowledge Training
 * Organized by drill type to keep scenarioGenerator clean
 */

export interface StaticQuestion {
  q: string;
  correct: string;
  options: string[];
  explanation: string;
}

export interface AnnouncedMixedQuestion {
  q: string;
  correct: string;
  options: string[];
  explanation: string;
  winningNumber: number;
}

export const DOZEN_VS_COLUMN_QUESTIONS: StaticQuestion[] = [
  {
    q: 'Which bet covers exactly the numbers 1 to 12?',
    correct: 'Dozen 1',
    options: ['Dozen 1', 'Column 1', 'Low (1–18)', 'First Row'],
    explanation:
      'Dozen 1 covers numbers 1–12 (12 numbers). Pays 2:1.\nColumn 1 covers 1,4,7,10… (every 3rd number in the first column of the layout).',
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
    explanation:
      'Column 2: every number where n mod 3 = 2 → 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35.\nAll three columns cover 12 numbers each and pay 2:1.',
  },
  {
    q: 'How many numbers does a Dozen bet cover?',
    correct: '12',
    options: ['12', '18', '6', '9'],
    explanation:
      'Each of the three Dozens covers 12 numbers: Dozen 1 (1–12), Dozen 2 (13–24), Dozen 3 (25–36).\nPays 2:1. Zero (0) is not covered by any Dozen.',
  },
  {
    q: 'Dozen 3 and Column 3 both cover number 36. Which other bet also covers 36?',
    correct: 'High (19–36)',
    options: ['High (19–36)', 'Low (1–18)', 'Even', 'Odd'],
    explanation:
      'Number 36: Black, Even, High (19–36), Column 3, Dozen 3.\n36 is even → Even wins. 36 > 18 → High wins. 36 % 3 = 0 → Column 3. 36 is in 25–36 → Dozen 3.',
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
    explanation:
      'Dozens and Columns each cover exactly 12 numbers (out of 36 non-zero numbers) and both pay 2:1.\nThe difference is which 12 numbers: Dozens are horizontal rows (1–12, 13–24, 25–36), Columns are vertical (every 3rd number).',
  },
];

export const ZERO_RULE_QUESTIONS: StaticQuestion[] = [
  {
    q: 'Number 0 wins. Player has €30 on Even. What happens to the bet?',
    correct: 'Lost — 0 is neither even nor odd, all even-money bets lose',
    options: [
      'Lost — 0 is neither even nor odd, all even-money bets lose',
      'Returned (half) — La Partage rule',
      'Returned in full — En Prison applies',
      'Wins 1:1 — 0 is considered even',
    ],
    explanation:
      'At this casino: 0 wins → ALL outside bets lose.\nNo La Partage and no En Prison rules apply.\n0 is not red/black, even/odd, low/high — it belongs to no outside bet category.',
  },
  {
    q: 'Number 0 wins. Player has €50 on Column 2. What is the payout?',
    correct: '€0 — Column bet loses on 0',
    options: ['€0 — Column bet loses on 0', '€50 (1:1)', '€25 (half returned)', '€100 (2:1)'],
    explanation:
      'When 0 wins, all outside bets lose — including Dozens and Columns.\n0 is not in any column or dozen. Column bet pays nothing.',
  },
  {
    q: 'Number 0 wins. Player has a €5 Straight Up bet on 0. What is the payout?',
    correct: '€175 (35:1)',
    options: ['€175 (35:1)', '€0 — 0 is a special number', '€5 returned only', '€70 (14:1)'],
    explanation:
      '0 is a valid inside bet number. Straight Up on 0 pays 35:1 like any other number.\n€5 × 35 = €175.\nOnly outside bets lose when 0 wins.',
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
    explanation:
      '0 wins → Red loses, Dozen 1 loses.\nThis casino has no La Partage or En Prison — even-money bets are fully collected when 0 wins.\nTotal payout: €0.',
  },
];

export const RECOGNITION_QUESTIONS: StaticQuestion[] = [
  {
    q: 'A bet that pays 1:1 and covers any winning number from 19 to 36.',
    correct: 'High (19–36)',
    options: ['High (19–36)', 'Dozen 3 (25–36)', 'Low (1–18)', 'Column 3'],
    explanation:
      'High covers numbers 19–36 (18 numbers) and pays 1:1 (even money).\nDozen 3 covers 25–36 (12 numbers, pays 2:1) — a different bet.',
  },
  {
    q: 'A bet that covers 12 numbers arranged in a vertical column on the table layout and pays 2:1.',
    correct: 'Column',
    options: ['Column', 'Dozen', 'Six Line', 'Street'],
    explanation:
      'Column bets cover 12 numbers in a vertical column of the table (every 3rd number). Pays 2:1.\nDozen bets cover horizontal rows (12 consecutive numbers).',
  },
  {
    q: 'A bet that pays 1:1 but loses when 0 wins, covers 18 numbers, and includes number 1.',
    correct: 'Odd',
    options: ['Odd', 'Low (1–18)', 'Red', 'Column 1'],
    explanation:
      '1 is: Odd ✓, Low ✓, Red ✓. But only Odd specifically includes 1 and all other odd numbers (3,5,7…35).\nLow and Red also fit — but the unique identifier here is "odd" fits 1, which is red AND low AND odd.\nThe question has multiple valid answers; in the drill, Red/Odd/Low are all correct outside bets covering 1.',
  },
  {
    q: 'What payout does a winning Dozen or Column bet pay?',
    correct: '2:1',
    options: ['2:1', '1:1', '3:1', '35:1'],
    explanation:
      'Dozen and Column bets both pay 2:1.\nEven-money bets (Red/Black, Even/Odd, Low/High) pay 1:1.\nInside bets pay higher: Split=17:1, Street=11:1, Corner=8:1, Straight=35:1.',
  },
];

export const CHIP_COUNT_QUESTIONS: StaticQuestion[] = [
  {
    q: 'How many chips does Voisins du Zéro require?',
    correct: '9 chips',
    options: ['9 chips', '6 chips', '5 chips', '4 chips'],
    explanation:
      'Voisins du Zéro = 9 chips:\n2× Street [0,2,3] + Split [4,7] + Split [12,15] + Split [18,21] + Split [19,22] + 2× Corner [25,26,28,29] + Split [32,35]',
  },
  {
    q: 'How many chips does Tiers du Cylindre require?',
    correct: '6 chips',
    options: ['6 chips', '9 chips', '5 chips', '8 chips'],
    explanation:
      'Tiers du Cylindre = 6 chips:\n6 split bets: [5,8] [10,11] [13,16] [23,24] [27,30] [33,36]',
  },
  {
    q: 'How many chips does Orphelins require?',
    correct: '5 chips',
    options: ['5 chips', '6 chips', '8 chips', '4 chips'],
    explanation:
      'Orphelins = 5 chips:\nStraight Up [1] + Split [6,9] + Split [14,17] + Split [17,20] + Split [31,34]',
  },
  {
    q: 'How many chips does Jeu Zéro require?',
    correct: '4 chips',
    options: ['4 chips', '5 chips', '7 chips', '6 chips'],
    explanation:
      'Jeu Zéro = 4 chips:\nStraight Up [26] + Split [0,3] + Split [12,15] + Split [32,35]',
  },
  {
    q: 'How many chips does a Neighbors (Voisins du numéro) bet require?',
    correct: '5 chips',
    options: ['5 chips', '4 chips', '6 chips', '3 chips'],
    explanation:
      'Neighbors = 5 chips: one Straight Up bet on the called number plus its 2 neighbours on each side of the wheel (5 numbers total, 5 straight-up bets).',
  },
];

export const ANNOUNCED_NUMBERS_QUESTIONS: StaticQuestion[] = [
  {
    q: 'How many numbers does Voisins du Zéro cover?',
    correct: '17 numbers',
    options: ['17 numbers', '12 numbers', '8 numbers', '7 numbers'],
    explanation:
      'Voisins du Zéro covers 17 numbers: 0, 2, 3, 4, 7, 12, 15, 18, 19, 21, 22, 25, 26, 28, 29, 32, 35 — the 17 numbers closest to 0 on the wheel.',
  },
  {
    q: 'How many numbers does Tiers du Cylindre cover?',
    correct: '12 numbers',
    options: ['12 numbers', '17 numbers', '8 numbers', '6 numbers'],
    explanation:
      'Tiers du Cylindre covers 12 numbers: 5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36 — the 12 numbers opposite to 0 on the wheel.',
  },
  {
    q: 'How many numbers does Orphelins cover?',
    correct: '8 numbers',
    options: ['8 numbers', '5 numbers', '12 numbers', '9 numbers'],
    explanation:
      'Orphelins covers 8 numbers: 1, 6, 9, 14, 17, 20, 31, 34 — the 8 "orphan" numbers not covered by Voisins or Tiers.',
  },
  {
    q: 'How many numbers does Jeu Zéro cover?',
    correct: '7 numbers',
    options: ['7 numbers', '4 numbers', '9 numbers', '5 numbers'],
    explanation:
      'Jeu Zéro covers 7 numbers: 0, 3, 12, 15, 26, 32, 35 — the 7 numbers closest to 0 on one side of the wheel.',
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
    explanation:
      'Orphelins: Straight [1] + Split [6,9] + Split [14,17] + Split [17,20] + Split [31,34].\n17 appears in two splits: [14,17] and [17,20]. Both bets win if 17 is the result.',
  },
];

export const ANNOUNCED_COMPOSITION_QUESTIONS: StaticQuestion[] = [
  {
    q: 'Jeu Zéro includes a Straight Up on which number?',
    correct: '26',
    options: ['26', '0', '17', '32'],
    explanation:
      'Jeu Zéro = Straight Up [26] + Split [0,3] + Split [12,15] + Split [32,35].\n26 is the only Straight Up in Jeu Zéro. All others are split bets.',
  },
  {
    q: 'Which announced bet uses a Corner bet on 25-26-28-29?',
    correct: 'Voisins du Zéro',
    options: ['Voisins du Zéro', 'Tiers du Cylindre', 'Orphelins', 'Jeu Zéro'],
    explanation:
      'Voisins du Zéro includes 2 chips on the Corner [25,26,28,29] (plus 2 chips on Street [0,2,3] and 5 split bets).\nNo other announced bet uses a corner.',
  },
  {
    q: 'Orphelins includes a Straight Up on which number?',
    correct: '1',
    options: ['1', '17', '0', '6'],
    explanation:
      'Orphelins = Straight Up [1] + Split [6,9] + Split [14,17] + Split [17,20] + Split [31,34].\n1 is the only Straight Up. Note that 17 appears in TWO splits (covered twice).',
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
    explanation:
      'Tiers = 6 split bets: [5,8] [10,11] [13,16] [23,24] [27,30] [33,36].\nAll 6 components are splits. It is the simplest announced bet structurally — 6 chips, all splits.',
  },
  {
    q: 'Voisins du Zéro includes a Street bet. Which numbers does it cover?',
    correct: '0, 2, 3',
    options: ['0, 2, 3', '1, 2, 3', '32, 35', '25, 26, 28, 29'],
    explanation:
      'Voisins du Zéro includes a Street (trio) on 0-2-3 (placed with 2 chips).\nThis is the top street of the table layout, covering 0, 2, and 3. It pays 11:1.',
  },
];

export const ANNOUNCED_MIXED_QUESTIONS: AnnouncedMixedQuestion[] = [
  {
    winningNumber: 26,
    q: 'Jeu Zéro placed at €2/chip (4 chips total). Number 26 wins.\nThe Straight Up on 26 pays 35:1. What is the NET WIN from Jeu Zéro?',
    correct: '€64',
    options: ['€64', '€70', '€60', '€62'],
    explanation:
      'Jeu Zéro: Straight [26] + Split [0,3] + Split [12,15] + Split [32,35].\n26 wins → only Straight Up [26] wins.\nWin: 1 chip × €2 × 35 = €70. Lose: 3 chips × €2 = €6.\nNet win: €70 − €6 = €64.',
  },
  {
    winningNumber: 33,
    q: 'Tiers du Cylindre placed at €5/chip (6 chips = €30). Number 33 wins.\nSplit [33,36] within Tiers wins (pays 17:1). What is the NET WIN from Tiers?',
    correct: '€60',
    options: ['€60', '€85', '€55', '€30'],
    explanation:
      'Tiers: 6 split bets including [33,36].\n33 wins → only split [33,36] hits.\nWin: 1 chip × €5 × 17 = €85. Lose: 5 chips × €5 = €25.\nNet win: €85 − €25 = €60.',
  },
  {
    winningNumber: 4,
    q: 'Neighbors of 19 placed at €1/chip (5 chips: 32, 15, 19, 4, 21). Number 4 wins.\nWhat is the NET WIN from this Neighbors bet?',
    correct: '€31',
    options: ['€31', '€35', '€30', '€4'],
    explanation:
      'Neighbors: 5 Straight Up bets at €1 each covering 32, 15, 19, 4, 21.\n4 wins → Straight Up [4] wins.\nWin: 1 chip × €1 × 35 = €35. Lose: 4 chips × €1 = €4.\nNet win: €35 − €4 = €31.',
  },
  {
    winningNumber: 26,
    q: 'Jeu Zéro at €1/chip + extra €5 Straight Up on 26. Number 26 wins.\nWhat is the COMBINED NET WIN from both bets?',
    correct: '€207',
    options: ['€207', '€175', '€210', '€170'],
    explanation:
      'Jeu Zéro (€1/chip): Straight [26] wins → €35 net. 3 losing chips = −€3. Jeu Zéro net: €32.\nExtra Straight Up €5 on 26: €5 × 35 = €175.\nCombined: €32 + €175 = €207.',
  },
];

export const BET_LIMITS_QUESTIONS: StaticQuestion[] = [
  {
    q: 'What is the maximum inside bet on the standard table?',
    correct: '€200',
    options: ['€200', '€500', '€100', '€1,000'],
    explanation:
      'Standard table: inside bets min €2, max €200.\nThis maximum is the same on both standard and high tables.',
  },
  {
    q: 'What is the maximum inside bet on the high table?',
    correct: '€200 — same as the standard table',
    options: ['€200 — same as the standard table', '€500', '€300', '€1,000'],
    explanation:
      'Inside bet maximum is €200 on BOTH standard and high tables.\nOnly the minimum changes: €2 (standard) vs €5 (high).',
  },
  {
    q: 'What is the maximum bet on Red/Black (even-money) on the standard table?',
    correct: '€1,000',
    options: ['€1,000', '€500', '€200', '€750'],
    explanation:
      'Even-money bets (Red/Black, Even/Odd, Low/High): max €1,000 on standard table.\nDozen/Column: max €500. Inside bets: max €200.',
  },
  {
    q: 'Standard table — what is the minimum for a Dozen or Column bet?',
    correct: '€10',
    options: ['€10', '€2', '€5', '€25'],
    explanation:
      'Standard table:\n• Inside bets: min €2\n• Dozen/Column: min €10\n• Even-money (Red/Black etc.): min €10',
  },
  {
    q: 'High table — what is the minimum for a Dozen or Column bet?',
    correct: '€25',
    options: ['€25', '€10', '€5', '€50'],
    explanation:
      'High table:\n• Inside bets: min €5\n• Dozen/Column: min €25\n• Even-money: min €25\nMaximums are the same as the standard table.',
  },
  {
    q: 'What is the maximum for Dozen and Column bets on both tables?',
    correct: '€500',
    options: ['€500', '€200', '€1,000', '€300'],
    explanation:
      'Dozen/Column max: €500 (same on both standard and high tables).\nEven-money max: €1,000. Inside max: €200.',
  },
];
