import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

/**
 * Information and guide sections for roulette layout practice
 * Shows practice tips and table layout reference
 */
export function LayoutPracticeGuides() {
  const styles = useThemedStyles(makeStyles);

  return (
    <>
      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>💡 How to Practice:</Text>
        <Text style={styles.infoText}>
          • Tap any number to see its color and position{'\n'}• Select different chip values to
          practice betting{'\n'}• Numbers turn yellow when selected{'\n'}• Red numbers: 1, 3, 5, 7,
          9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36{'\n'}• Black numbers: All other
          numbers except 0{'\n'}• Green: 0 (zero)
        </Text>
      </View>

      {/* Layout Guide */}
      <View style={styles.guideSection}>
        <Text style={styles.guideTitle}>📋 Table Layout Guide:</Text>
        <View style={styles.guideContent}>
          <Text style={styles.guideText}>
            <Text style={styles.guideBold}>Top Row:</Text> 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33,
            36{'\n'}
            <Text style={styles.guideBold}>Middle Row:</Text> 2, 5, 8, 11, 14, 17, 20, 23, 26, 29,
            32, 35{'\n'}
            <Text style={styles.guideBold}>Bottom Row:</Text> 1, 4, 7, 10, 13, 16, 19, 22, 25, 28,
            31, 34{'\n\n'}
            <Text style={styles.guideBold}>Outside Bets:</Text>
            {'\n'}• Dozens: 1-12, 13-24, 25-36 (Pays 2:1){'\n'}• Columns: Top, Middle, Bottom rows
            (Pays 2:1){'\n'}• Even Money: Red/Black, Even/Odd, 1-18/19-36 (Pays 1:1)
          </Text>
        </View>
      </View>
    </>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    infoSection: {
      backgroundColor: colors.background.secondary,
      padding: 16,
      borderRadius: 10,
      marginTop: 16,
      borderWidth: 2,
      borderColor: colors.border.gold,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.gold,
      marginBottom: 8,
    },
    infoText: {
      fontSize: 14,
      color: colors.text.primary,
      lineHeight: 22,
    },
    guideSection: {
      backgroundColor: colors.background.secondary,
      padding: 16,
      borderRadius: 10,
      marginTop: 16,
      borderWidth: 2,
      borderColor: colors.border.primary,
    },
    guideTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.gold,
      marginBottom: 8,
    },
    guideContent: {
      backgroundColor: colors.background.dark,
      padding: 12,
      borderRadius: 8,
    },
    guideText: {
      fontSize: 13,
      color: colors.text.primary,
      lineHeight: 20,
    },
    guideBold: {
      fontWeight: 'bold',
      color: colors.text.gold,
    },
  });
}
