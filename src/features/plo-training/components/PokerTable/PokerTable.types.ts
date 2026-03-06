import { PlayerActionType } from '../../types';

export interface Player {
  position: number;
  name?: string;
  chipAmount?: number;
  isDealer?: boolean;
  action?: PlayerActionType;
  betAmount?: number;
  isFolded?: boolean;
  isRequesting?: boolean;
}

export interface PokerTableProps {
  players: Player[];
  potAmount?: number;
  communityCards?: number;
}
