import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import SkeletonLoader from '@components/SkeletonLoader';
import { useTheme } from '@contexts/ThemeContext';
import type { MenuListScreenProps } from './MenuListScreen.types';

/**
 * Menu component that displays a list of exercises/items
 * with difficulty badges and optional loading skeleton
 */
const SkeletonMenuItem: React.FC = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.exerciseCard}>
      <View style={[styles.accentBar, { backgroundColor: colors.border.primary }]} />
      <View style={styles.cardBody}>
        <View style={styles.exerciseHeader}>
          <SkeletonLoader width="60%" height={20} borderRadius={4} />
          <SkeletonLoader width={60} height={20} borderRadius={4} />
        </View>
        <SkeletonLoader width="100%" height={14} borderRadius={4} style={{ marginBottom: 4 }} />
        <SkeletonLoader width="80%" height={14} borderRadius={4} />
      </View>
    </View>
  );
};

export default function MenuListScreen({
  title,
  subtitle,
  items,
  isLoading = false,
}: MenuListScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const renderSkeletonItems = () => (
    <>
      {[1, 2, 3, 4].map(index => (
        <SkeletonMenuItem key={`skeleton-${index}`} />
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {isLoading
          ? renderSkeletonItems()
          : items.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.exerciseCard}
                onPress={item.onPress}
                accessibilityLabel={`${item.title}, ${item.difficulty} difficulty`}
                accessibilityHint="Double tap to start exercise"
                accessibilityRole="button"
              >
                <View
                  style={[
                    styles.accentBar,
                    { backgroundColor: colors.difficulty[item.difficulty] },
                  ]}
                />
                <View style={styles.cardBody}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseTitle}>{item.title}</Text>
                    <View
                      style={[
                        styles.difficultyBadge,
                        { backgroundColor: colors.difficulty[item.difficulty] + '22' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.difficultyText,
                          { color: colors.difficulty[item.difficulty] },
                        ]}
                      >
                        {item.difficulty.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.exerciseDescription}>{item.description}</Text>
                  {item.extraInfo && <Text style={styles.extraInfo}>{item.extraInfo}</Text>}
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
      padding: 24,
    },
    title: {
      fontSize: 26,
      fontWeight: '800',
      color: colors.text.gold,
      marginBottom: 4,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 20,
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 24,
    },
    exerciseCard: {
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
    cardBody: {
      flex: 1,
      padding: 14,
    },
    exerciseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    exerciseTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text.primary,
      flex: 1,
    },
    difficultyBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
    },
    difficultyText: {
      fontSize: 11,
      fontWeight: '700',
    },
    exerciseDescription: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
    },
    extraInfo: {
      fontSize: 12,
      color: colors.text.gold,
      marginTop: 4,
      fontStyle: 'italic',
    },
  });
}
