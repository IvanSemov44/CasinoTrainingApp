import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

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
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.gold,
      marginBottom: 8,
    },
  });
}
