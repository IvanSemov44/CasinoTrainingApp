import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface HintSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function HintSection({ isOpen, onToggle, children }: HintSectionProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
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
  /* eslint-enable react-native/no-unused-styles */
}
