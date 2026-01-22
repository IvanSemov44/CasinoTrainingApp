import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    backgroundColor: '#2a4f3f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3a6f5f',
    alignItems: 'center',
  },
  hintButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  hintCard: {
    margin: 15,
    marginTop: 0,
    padding: 15,
    backgroundColor: '#2a4f3f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3a6f5f',
  },
  hintText: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 22,
  },
});
