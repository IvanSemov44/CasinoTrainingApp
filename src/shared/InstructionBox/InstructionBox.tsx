import { View, Text, StyleSheet } from 'react-native';
import { createTextStyles, createContainerStyles } from '@styles';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

export interface InstructionBoxProps {
  title?: string;
  instructions: string[];
}

/**
 * Shared info box for displaying numbered instructions
 */
export function InstructionBox({ title = 'How to Play:', instructions }: InstructionBoxProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {instructions.map((instruction, index) => (
        <Text key={`${instruction}-${index}`} style={styles.text}>
          {instruction}
        </Text>
      ))}
    </View>
  );
}

function makeStyles(colors: AppColors) {
  const textStyles = createTextStyles(colors);
  const containerStyles = createContainerStyles(colors);

  return StyleSheet.create({
    container: containerStyles.secondaryCard,
    title: textStyles.goldTitle,
    text: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 4,
    },
  });
}
