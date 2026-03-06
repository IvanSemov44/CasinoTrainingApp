import { CallBetMode } from '../../types';

export interface ChallengeDisplayProps {
  mode: Exclude<CallBetMode, 'random'>;
  totalBets: number;
}
