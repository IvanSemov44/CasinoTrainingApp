import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SkeletonLoader from '@components/SkeletonLoader';
import { menuStyles, type MenuTheme } from '../styles/menu.styles';
import { COLORS, SPACING } from '../constants/theme';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  onPress: () => void;
  extraInfo?: string;
}

interface MenuListScreenProps {
  title: string;
  subtitle?: string;
  items: MenuItem[];
  theme?: MenuTheme;
  isLoading?: boolean;
}

const getDifficultyColor = (difficulty: Difficulty): string => {
  return COLORS.difficulty[difficulty];
};

const SkeletonMenuItem: React.FC = () => (
  <View style={menuStyles.dark.exerciseCard}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm }}>
      <SkeletonLoader width="60%" height={20} borderRadius={4} />
      <SkeletonLoader width={60} height={20} borderRadius={4} />
    </View>
    <SkeletonLoader width="100%" height={14} borderRadius={4} style={{ marginBottom: SPACING.xs }} />
    <SkeletonLoader width="80%" height={14} borderRadius={4} />
  </View>
);

export default function MenuListScreen({ title, subtitle, items, theme = 'dark', isLoading = false }: MenuListScreenProps) {
  const styles = menuStyles[theme];

  const renderSkeletonItems = () => (
    <>
      {[1, 2, 3, 4].map((index) => (
        <SkeletonMenuItem key={index} />
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {isLoading ? renderSkeletonItems() : items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.exerciseCard}
            onPress={item.onPress}
            accessibilityLabel={`${item.title}, ${item.difficulty} difficulty`}
            accessibilityHint="Double tap to start exercise"
            accessibilityRole="button"
          >
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseTitle}>{item.title}</Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
                <Text style={styles.difficultyText}>{item.difficulty.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.exerciseDescription}>{item.description}</Text>
            {item.extraInfo && <Text style={styles.extraInfo}>{item.extraInfo}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
