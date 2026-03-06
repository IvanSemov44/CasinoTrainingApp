import { RequestType } from '../../types';

export interface AnswerInputProps {
  totalBet: string;
  betPerPosition: string;
  change: string;
  onTotalBetChange: (value: string) => void;
  onBetPerPositionChange: (value: string) => void;
  onChangeChange: (value: string) => void;
  sectorName: string;
  activeInput: 'totalBet' | 'betPerPosition' | 'change';
  onInputFocus: (input: 'totalBet' | 'betPerPosition' | 'change') => void;
  requestType: RequestType;
}
