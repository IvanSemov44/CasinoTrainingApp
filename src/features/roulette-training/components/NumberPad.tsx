import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface NumberPadProps {
  onNumberPress: (num: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  disabled?: boolean;
}

export default function NumberPad({ onNumberPress, onClear, onBackspace, disabled = false }: NumberPadProps) {
  const handlePress = (value: string, callback?: () => void) => {
    if (!disabled) {
      if (callback) {
        callback();
      } else {
        onNumberPress(value);
      }
    }
  };

  return (
    <View style={styles.numberPad}>
      <View style={styles.numberPadRow}>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('1')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('2')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('3')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.numberPadRow}>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('4')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('5')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('6')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.numberPadRow}>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('7')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('8')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('9')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.numberPadRow}>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('C', onClear)}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('0')}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.numberButton} 
          onPress={() => handlePress('⌫', onBackspace)}
          disabled={disabled}
        >
          <Text style={styles.numberButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numberPad: {
    marginBottom: SPACING.md,
  },
  numberPadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  numberButton: {
    flex: 1,
    backgroundColor: COLORS.background.mediumGray,
    padding: 12,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDERS.radius.sm,
    borderWidth: BORDERS.width.thin,
    borderColor: COLORS.border.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    color: COLORS.text.gold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
  },
});
