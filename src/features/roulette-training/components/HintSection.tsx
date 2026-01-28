import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

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
    margin: 15,
    padding: 15,
    backgroundColor: COLORS.background.hint,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border.hint,
    alignItems: 'center',
  },
  hintButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.gold,
  },
  hintCard: {
    margin: 15,
    marginTop: 0,
    padding: 15,
    backgroundColor: COLORS.background.hint,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border.hint,
  },
  hintText: {
    fontSize: 14,
    color: COLORS.text.primary,
    lineHeight: 22,
  },
});
