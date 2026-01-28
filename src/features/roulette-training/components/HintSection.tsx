import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../constants/theme';

interface HintSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function HintSection({ isOpen, onToggle, children }: HintSectionProps) {
  return (
    <>
      <TouchableOpacity 
        style={styles.hintButton}
        onPress={onToggle}
      >
        <Text style={styles.hintButtonText}>
          {isOpen ? '▼' : '▶'} Hint
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.hintCard}>
          <Text style={styles.hintText}>
            {children}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  hintButton: {
    margin: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.background.hint,
    borderRadius: BORDERS.radius.md,
    borderWidth: BORDERS.width.thin,
    borderColor: COLORS.border.hint,
    alignItems: 'center',
  },
  hintButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: 'bold',
    color: COLORS.text.gold,
  },
  hintCard: {
    margin: SPACING.md,
    marginTop: 0,
    padding: SPACING.md,
    backgroundColor: COLORS.background.hint,
    borderRadius: BORDERS.radius.md,
    borderWidth: BORDERS.width.thin,
    borderColor: COLORS.border.hint,
  },
  hintText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.primary,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
});
