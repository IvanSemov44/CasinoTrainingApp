// PLO Training types
export type PLODifficulty = 'easy' | 'medium' | 'advanced';

export type Position = 'SB' | 'BB' | 'UTG' | 'MP' | 'CO' | 'D';

export type PlayerActionType = 'bet' | 'fold' | 'call' | 'raise' | 'pot';

export interface PlayerAction {
  position: Position;
  action: PlayerActionType;
  amount?: number;
}

export interface PotRequest {
  requestingPosition: Position;
  previousActions: PlayerAction[];
  smallBlind: number;
  bigBlind: number;
}

export interface PotAnswer {
  potAmount: number;
}

export interface PotValidationResult {
  isCorrect: boolean;
  userAnswer: number;
  correctAnswer: number;
  explanation: string;
}

export interface PLOGameState {
  smallBlind: number;
  bigBlind: number;
  actions: PlayerAction[];
  currentPlayer: Position;
}

// ─── Hand simulator types ─────────────────────────────────────────────────────

/** State of one player at an ask moment */
export interface HandPlayerState {
  name: string;
  position: number;      // 1–6 table slot (matches PokerTable layout)
  isDealer: boolean;
  isFolded: boolean;
  isRequesting: boolean;
  betAmount?: number;    // chips in front on the current street
  chipAmount: number;    // stack size
}

/** One "ask pot" moment the trainee must answer */
export interface AskMoment {
  street: 'preflop' | 'flop' | 'turn' | 'river';
  communityCards: number;   // 0, 3, 4, or 5
  centerPot: number;        // chips collected in center from previous streets
  players: HandPlayerState[];
  actionLog: string[];      // narrative lines shown above the table
  requesterName: string;
  correctAnswer: number;
  explanation: string;      // step-by-step breakdown shown after answering
}

/** A full generated hand with 1–3 embedded ask moments */
export interface GeneratedHand {
  blindLevel: number;
  askMoments: AskMoment[];
}
