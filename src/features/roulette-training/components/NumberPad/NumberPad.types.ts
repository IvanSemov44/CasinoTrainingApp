export interface NumberPadProps {
  onNumberPress: (num: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  disabled?: boolean;
}

export interface ButtonConfig {
  value: string;
  action?: () => void;
}
