import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { CashConversionTrainingModal } from '../components';
import { SECTOR_POSITIONS, DIFFICULTY_MAX_BET } from '../constants/sectors';

export default function CashConversionMenuScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Cash Conversion Training</Text>
        <Text style={styles.subtitle}>Master sector bet calculations</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleOpenModal}
          accessibilityLabel="Start Training"
          accessibilityRole="button"
        >
          <Text style={styles.startButtonIcon}>💰</Text>
          <Text style={styles.startButtonText}>Start Training</Text>
          <Text style={styles.startButtonHint}>Configure and start your training</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How It Works</Text>
          <Text style={styles.infoDescription}>
            Practice converting cash into sector bets. You&apos;ll learn to calculate:
          </Text>
          <View style={styles.trainingTypesList}>
            <Text style={styles.trainingTypeItem}>• Total bet amount per sector</Text>
            <Text style={styles.trainingTypeItem}>• Bet per position</Text>
            <Text style={styles.trainingTypeItem}>• Change/rest to return</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Available Sectors</Text>
          <View style={styles.sectorList}>
            <Text style={styles.sectorItem}>🎯 Tier - {SECTOR_POSITIONS.tier} positions</Text>
            <Text style={styles.sectorItem}>🎪 Orphelins - {SECTOR_POSITIONS.orphelins} positions</Text>
            <Text style={styles.sectorItem}>🎭 Voisins - {SECTOR_POSITIONS.voisins} positions</Text>
            <Text style={styles.sectorItem}>⭕ Zero - {SECTOR_POSITIONS.zero} positions</Text>
            <Text style={styles.sectorItem}>👥 Neighbors - {SECTOR_POSITIONS.neighbors} positions</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Difficulty Levels</Text>
          <View style={styles.difficultyList}>
            <Text style={styles.difficultyItem}>🟢 Easy - Max ${DIFFICULTY_MAX_BET.easy} per position</Text>
            <Text style={styles.difficultyItem}>🟡 Medium - Max ${DIFFICULTY_MAX_BET.medium} per position</Text>
            <Text style={styles.difficultyItem}>🔴 Hard - Max ${DIFFICULTY_MAX_BET.hard} per position</Text>
          </View>
        </View>
      </View>

      <CashConversionTrainingModal
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      paddingBottom: 40,
    },
    header: {
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
    content: {
      padding: 20,
      alignItems: 'center',
    },
    startButton: {
      backgroundColor: colors.background.secondary,
      borderRadius: 16,
      padding: 30,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.gold,
      marginTop: 20,
      marginBottom: 24,
    },
    startButtonIcon: {
      fontSize: 48,
      marginBottom: 12,
    },
    startButtonText: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 8,
    },
    startButtonHint: {
      fontSize: 14,
      color: colors.text.muted,
    },
    infoSection: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      width: '100%',
      maxWidth: 400,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.gold,
      marginBottom: 12,
    },
    infoDescription: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 8,
    },
    trainingTypesList: {
      marginTop: 4,
    },
    trainingTypeItem: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 6,
    },
    sectorList: {
      marginTop: 4,
    },
    sectorItem: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 8,
    },
    difficultyList: {
      marginTop: 4,
    },
    difficultyItem: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 8,
    },
  });
}
