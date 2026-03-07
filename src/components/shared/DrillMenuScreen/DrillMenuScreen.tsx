import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { colorWithOpacity } from '@styles';
import type { DrillMenuScreenProps, DrillMenuItem } from './DrillMenuScreen.types';
import { makeStyles } from './DrillMenuScreen.styles';

export default function DrillMenuScreen<T extends DrillMenuItem = DrillMenuItem>({
  title,
  drills,
  onPress,
}: DrillMenuScreenProps<T>) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const difficultyColors: Record<'easy' | 'medium' | 'advanced', string> = {
    easy: colors.difficulty.easy,
    medium: colors.difficulty.medium,
    advanced: colors.difficulty.hard,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Select a drill type</Text>
      </View>

      {drills.map(drill => (
        <TouchableOpacity
          key={drill.drillType}
          style={styles.card}
          onPress={() => onPress(drill.drillType)}
          activeOpacity={0.75}
        >
          <View
            style={[styles.accentBar, { backgroundColor: difficultyColors[drill.difficulty] }]}
          />
          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{drill.label}</Text>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: colorWithOpacity(difficultyColors[drill.difficulty], 0.13) },
                ]}
              >
                <Text style={[styles.badgeText, { color: difficultyColors[drill.difficulty] }]}>
                  {drill.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.cardDesc}>{drill.description}</Text>
            <Text style={styles.cardArrow}>›</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
