import { ValidationResult } from '../../types';

export interface ResultFeedbackProps {
  result: ValidationResult;
  onNext: () => void;
  onClear: () => void;
}
