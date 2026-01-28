import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { menuStyles, type MenuTheme } from '../styles/menu.styles';
import { COLORS } from '../constants/theme';

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
}

const getDifficultyColor = (difficulty: Difficulty): string => {
  return COLORS.difficulty[difficulty];
};

export default function MenuListScreen({ title, subtitle, items, theme = 'dark' }: MenuListScreenProps) {
  const styles = menuStyles[theme];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.exerciseCard}
            onPress={item.onPress}
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
