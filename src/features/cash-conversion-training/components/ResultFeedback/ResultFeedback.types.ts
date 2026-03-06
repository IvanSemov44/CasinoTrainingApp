import { ValidationResult } from '../../types';

export interface ResultFeedbackProps {
  result: ValidationResult;
  onNext: () => void;
  sectorName: string;
}
