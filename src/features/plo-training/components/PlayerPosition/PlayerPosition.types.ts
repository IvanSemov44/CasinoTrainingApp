import { PlayerActionType } from '../../types';

export interface PlayerPositionProps {
  position: number;
  chipAmount?: number;
  name?: string;
  isDealer?: boolean;
  action?: PlayerActionType;
  betAmount?: number;
  isFolded?: boolean;
  isRequesting?: boolean;
}
