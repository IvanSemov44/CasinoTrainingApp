/**
 * Dropdown item configuration
 */
export interface DropdownItem {
  key: string;
  label: string;
  icon?: string;
  extraInfo?: string;
}

/**
 * Props for DropdownSelector component
 */
export interface DropdownSelectorProps {
  /** Placeholder text when no item is selected */
  placeholder: string;
  /** List of items to display in dropdown */
  items: DropdownItem[];
  /** Currently selected item key */
  selectedKey: string | null;
  /** Callback when an item is selected */
  onSelect: (key: string) => void;
  /** Whether the dropdown is currently open */
  showDropdown: boolean;
  /** Callback to toggle dropdown visibility */
  onToggleDropdown: () => void;
  /** Optional label for the dropdown */
  label?: string;
}
