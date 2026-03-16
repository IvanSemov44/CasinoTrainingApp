import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

interface AccentModeCardBadge {
  label: string;
  color: string;
}

export interface AccentModeCardProps {
  title: string;
  description: string;
  accentColor: string;
  onPress: () => void;
  badge?: AccentModeCardBadge;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

/**
 * Shared mode selection card with left accent bar
 * Used in training mode selection screens (Position, Sector, PLO, etc.)
 * Supports optional badge in header for difficulty/mode indicators
 */
export function AccentModeCard({
  title,
  description,
  accentColor,
  onPress,
  badge,
  accessibilityLabel,
  style,
}: AccentModeCardProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {badge && (
            <View style={[styles.badge, { backgroundColor: badge.color + '22' }]}>
              <Text style={[styles.badgeText, { color: badge.color }]}>{badge.label}</Text>
            </View>
          )}
          <Text style={styles.arrow}>›</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

function makeStyles(colors: AppColors) {
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
      alignItems: 'center',
      gap: 8,
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.primary,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
    },
    arrow: {
      fontSize: 20,
      color: colors.text.muted,
      marginLeft: 'auto',
    },
    description: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
    },
  });
}
