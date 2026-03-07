import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface MenuScreenHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Shared menu screen header with title and subtitle
 * Used in training menu screens to display the screen heading
 */
export function MenuScreenHeader({ title, subtitle }: MenuScreenHeaderProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text.gold,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
    },
  });
}
