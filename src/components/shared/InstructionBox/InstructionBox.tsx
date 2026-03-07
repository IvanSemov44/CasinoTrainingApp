import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface InstructionBoxProps {
  title?: string;
  instructions: string[];
}

/**
 * Shared info box for displaying numbered instructions
 */
export function InstructionBox({ title = 'How to Play:', instructions }: InstructionBoxProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {instructions.map((instruction, index) => (
        <Text key={index} style={styles.text}>
          {instruction}
        </Text>
      ))}
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.gold,
      marginBottom: 8,
    },
    text: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 4,
    },
  });
}
