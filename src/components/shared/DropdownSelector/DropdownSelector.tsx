import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { DropdownSelectorProps } from './DropdownSelector.types';
import { makeStyles } from './DropdownSelector.styles';

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
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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
