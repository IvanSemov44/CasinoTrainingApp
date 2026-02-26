import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@styles/colors';

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

/**
 * Reusable dropdown selector component with cascading support.
 * 
 * @example
 * <DropdownSelector
 *   placeholder="Select difficulty..."
 *   items={[
 *     { key: 'easy', label: 'Easy', icon: '🟢', extraInfo: 'Max $50' },
 *     { key: 'hard', label: 'Hard', icon: '🔴', extraInfo: 'Max $200' },
 *   ]}
 *   selectedKey={selectedDifficulty}
 *   onSelect={setSelectedDifficulty}
 *   showDropdown={showDropdown}
 *   onToggleDropdown={() => setShowDropdown(!showDropdown)}
 * />
 */
export function DropdownSelector({
  placeholder,
  items,
  selectedKey,
  onSelect,
  showDropdown,
  onToggleDropdown,
}: DropdownSelectorProps) {
  const selectedItem = items.find(item => item.key === selectedKey);

  const handleSelect = (key: string) => {
    if (onSelect) {
      onSelect(key);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.trigger, selectedKey && styles.triggerSelected]}
        onPress={onToggleDropdown}
        accessibilityLabel={placeholder}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: showDropdown }}
      >
        {selectedItem ? (
          <View style={styles.triggerContent}>
            {selectedItem.icon && (
              <Text style={styles.triggerIcon}>{selectedItem.icon}</Text>
            )}
            <View style={styles.triggerTextContainer}>
              <Text style={styles.triggerText}>{selectedItem.label}</Text>
              {selectedItem.extraInfo && (
                <Text style={styles.triggerSubtext}>{selectedItem.extraInfo}</Text>
              )}
            </View>
          </View>
        ) : (
          <Text style={styles.triggerPlaceholder}>{placeholder}</Text>
        )}
        <Text style={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownList}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.dropdownItem, selectedKey === item.key && styles.dropdownItemSelected]}
              onPress={() => handleSelect(item.key)}
              accessibilityLabel={item.label}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedKey === item.key }}
            >
              {item.icon && <Text style={styles.dropdownItemIcon}>{item.icon}</Text>}
              <View style={styles.dropdownItemContent}>
                <Text style={[styles.dropdownItemText, selectedKey === item.key && styles.dropdownItemTextSelected]}>
                  {item.label}
                </Text>
                {item.extraInfo && (
                  <Text style={styles.dropdownItemExtra}>{item.extraInfo}</Text>
                )}
              </View>
              {selectedKey === item.key && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },
  triggerSelected: {
    borderColor: COLORS.border.gold,
    backgroundColor: COLORS.background.tertiaryLight,
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  triggerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  triggerTextContainer: {
    flex: 1,
  },
  triggerText: {
    fontSize: 15,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  triggerSubtext: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  triggerPlaceholder: {
    fontSize: 15,
    color: COLORS.text.placeholder,
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: COLORS.text.gold,
    marginLeft: 10,
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.primaryDark,
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },
  dropdownItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  dropdownItemContent: {
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  dropdownItemTextSelected: {
    color: COLORS.text.gold,
    fontWeight: '600',
  },
  dropdownItemExtra: {
    fontSize: 12,
    color: COLORS.text.muted,
    marginTop: 2,
  },
  checkmark: {
    fontSize: 16,
    color: COLORS.text.gold,
    fontWeight: 'bold',
  },
});
