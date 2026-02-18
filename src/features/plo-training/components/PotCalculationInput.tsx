import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NumberPad from '../../roulette-training/components/NumberPad';

interface PotCalculationInputProps {
  onSubmit: (amount: number) => void;
  disabled?: boolean;
}

export default function PotCalculationInput({ onSubmit, disabled = false }: PotCalculationInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleNumberPress = (num: string) => {
    const newValue = inputValue + num;
    setInputValue(newValue);
    
    // Auto-submit when user enters a valid amount
    const amount = parseInt(newValue, 10);
    if (amount > 0) {
      onSubmit(amount);
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleBackspace = () => {
    const newValue = inputValue.slice(0, -1);
    setInputValue(newValue);
    
    if (newValue) {
      const amount = parseInt(newValue, 10);
      if (amount > 0) {
        onSubmit(amount);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Pot Amount:</Text>
      
      <View style={styles.displayContainer}>
        <Text style={styles.displayLabel}>Pot:</Text>
        <View style={styles.displayField}>
          <Text style={styles.displayText}>
            ${inputValue || '0'}
          </Text>
        </View>
      </View>

      <NumberPad
        onNumberPress={handleNumberPress}
        onClear={handleClear}
        onBackspace={handleBackspace}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  displayContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  displayLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    fontWeight: '500',
  },
  displayField: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  displayText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
