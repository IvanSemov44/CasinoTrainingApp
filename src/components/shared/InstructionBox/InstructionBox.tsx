import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { createTextStyles, createContainerStyles } from '@styles';

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
