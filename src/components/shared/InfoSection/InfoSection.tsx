import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { createTextStyles, createContainerStyles } from '@styles';

export interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Shared info section component with title and flexible content
 * Used in menu screens to display training information blocks
 */
export function InfoSection({ title, children, style }: InfoSectionProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  const textStyles = createTextStyles(colors);
  const containerStyles = createContainerStyles(colors);

  return StyleSheet.create({
    container: {
      ...containerStyles.secondaryCard,
      marginBottom: 16,
    },
    title: textStyles.goldTitle,
  });
}
