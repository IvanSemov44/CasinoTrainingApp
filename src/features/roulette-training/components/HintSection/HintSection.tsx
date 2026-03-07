import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { HintSectionProps } from './HintSection.types';

/**
 * HintSection component for collapsible hint display
 * Shows a toggle button that expands/collapses hint content
 */
const HintSection: React.FC<HintSectionProps> = React.memo(({ isOpen, onToggle, children }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <>
      <TouchableOpacity
        style={styles.hintButton}
        onPress={onToggle}
        accessibilityLabel="Toggle hint"
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text style={styles.hintButtonText}>{isOpen ? '▼' : '▶'} Hint</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.hintCard} accessibilityLiveRegion="polite">
          <Text style={styles.hintText}>{children}</Text>
        </View>
      )}
    </>
  );
});

HintSection.displayName = 'HintSection';

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    hintButton: {
      margin: 16,
      padding: 16,
      backgroundColor: colors.background.hint,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border.hint,
      alignItems: 'center',
    },
    hintButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text.gold,
    },
    hintCard: {
      margin: 16,
      marginTop: 0,
      padding: 16,
      backgroundColor: colors.background.hint,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border.hint,
    },
    hintText: {
      fontSize: 14,
      color: colors.text.primary,
      lineHeight: 22,
    },
  });
}

export default HintSection;
