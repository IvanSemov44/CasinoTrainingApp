import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface AccentModeCardProps {
  title: string;
  description: string;
  accentColor: string;
  onPress: () => void;
  style?: ViewStyle;
}

/**
 * Shared mode selection card with left accent bar
 * Used in training mode selection screens (Position, Sector, etc.)
 */
export function AccentModeCard({
  title,
  description,
  accentColor,
  onPress,
  style,
}: AccentModeCardProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.background.secondary,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border.primary,
      overflow: 'hidden',
      marginBottom: 12,
    },
    accentBar: {
      width: 4,
    },
    body: {
      flex: 1,
      padding: 14,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.primary,
      flex: 1,
    },
    arrow: {
      fontSize: 20,
      color: colors.text.muted,
    },
    description: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
    },
  });
}
