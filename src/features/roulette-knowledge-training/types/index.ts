export type RKDrillType =
  | 'outside-bet-payout'      // Easy — calculate 1:1 or 2:1 outside bet payout
  | 'dozen-vs-column'         // Easy — which bet covers which numbers
  | 'zero-rule'               // Easy — 0 hits, all outside bets lose
  | 'outside-bet-recognition' // Easy — identify the bet type from description
  | 'announced-chip-count'    // Medium — how many chips for each announced bet
  | 'announced-numbers'       // Medium — how many numbers each announced bet covers
  | 'announced-composition'   // Medium — individual bets that make up an announced bet
  | 'mixed-outside-payout'    // Medium — two outside bets win, calculate total
  | 'announced-inside-mixed'  // Advanced — net win from announced bet + inside bet
  | 'bet-limits';             // Easy — standard/high table bet limits

export interface RKScenario {
  drillType: RKDrillType;
  winningNumber?: number;  // 0–36; renders a coloured number chip on screen
  bets?: string[];         // list of placed bets to display (e.g. "€30 on Red")
  question: string;
  answerType: 'multiple-choice' | 'numeric';
  options?: string[];
  correctOption?: string;
  correctAnswer?: number;
  explanation: string;
}
