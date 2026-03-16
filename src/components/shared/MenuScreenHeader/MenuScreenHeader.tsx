import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

export interface MenuScreenHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Shared menu screen header with title and subtitle
 * Used in training menu screens to display the screen heading
 */
export function MenuScreenHeader({ title, subtitle }: MenuScreenHeaderProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

function makeStyles(colors: AppColors) {
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
