import { DropdownItem } from '../DropdownSelector';

export interface StepConfig {
  number: number;
  title: string;
  optional?: boolean;
  items: DropdownItem[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  placeholder: string;
}

export interface NumberInputConfig {
  number: number;
  title: string;
  value: string;
  onChange: (value: string) => void;
  presets: number[];
  presetLabel: string;
  showDropdown: boolean;
  onToggleDropdown: () => void;
}

export interface SummaryItem {
  label: string;
  value: string;
}

export interface BaseTrainingModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  steps: StepConfig[];
  numberInput?: NumberInputConfig;
  summaryItems: SummaryItem[];
  canStart: boolean;
  onStart: () => void;
}
