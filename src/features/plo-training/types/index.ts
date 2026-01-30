// PLO Training types
export type PLOTrainingMode = 'basic' | 'advanced' | 'pot-calculation';

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
