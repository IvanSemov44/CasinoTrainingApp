import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { useModalState } from '@hooks/useModalState';
import { InfoSection } from '@components/shared';
import type { AppColors } from '@styles/themes';
import { CashConversionTrainingModal } from '../../components';
import { SECTOR_POSITIONS, DIFFICULTY_MAX_BET } from '../../constants/sectors';

export default function CashConversionMenuScreen() {
  const styles = useThemedStyles(makeStyles);
  const modal = useModalState();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Cash Conversion Training</Text>
        <Text style={styles.subtitle}>Master sector bet calculations</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={modal.open}
          accessibilityLabel="Start Training"
          accessibilityRole="button"
        >
          <Text style={styles.startButtonIcon}>💰</Text>
          <Text style={styles.startButtonText}>Start Training</Text>
          <Text style={styles.startButtonHint}>Configure and start your training</Text>
        </TouchableOpacity>

        <InfoSection title="How It Works" style={{ width: '100%', maxWidth: 400 }}>
          <Text style={styles.infoDescription}>
            Practice converting cash into sector bets. You&apos;ll learn to calculate:
          </Text>
          <View style={styles.trainingTypesList}>
            <Text style={styles.trainingTypeItem}>• Total bet amount per sector</Text>
            <Text style={styles.trainingTypeItem}>• Bet per position</Text>
            <Text style={styles.trainingTypeItem}>• Change/rest to return</Text>
          </View>
        </InfoSection>

        <InfoSection title="Available Sectors" style={{ width: '100%', maxWidth: 400 }}>
          <View style={styles.sectorList}>
            <Text style={styles.sectorItem}>🎯 Tier - {SECTOR_POSITIONS.tier} positions</Text>
            <Text style={styles.sectorItem}>
              🎪 Orphelins - {SECTOR_POSITIONS.orphelins} positions
            </Text>
            <Text style={styles.sectorItem}>🎭 Voisins - {SECTOR_POSITIONS.voisins} positions</Text>
            <Text style={styles.sectorItem}>⭕ Zero - {SECTOR_POSITIONS.zero} positions</Text>
            <Text style={styles.sectorItem}>
              👥 Neighbors - {SECTOR_POSITIONS.neighbors} positions
            </Text>
          </View>
        </InfoSection>

        <InfoSection title="Difficulty Levels" style={{ width: '100%', maxWidth: 400 }}>
          <View style={styles.difficultyList}>
            <Text style={styles.difficultyItem}>
              🟢 Easy - Max ${DIFFICULTY_MAX_BET.easy} per position
            </Text>
            <Text style={styles.difficultyItem}>
              🟡 Medium - Max ${DIFFICULTY_MAX_BET.medium} per position
            </Text>
            <Text style={styles.difficultyItem}>
              🔴 Hard - Max ${DIFFICULTY_MAX_BET.hard} per position
            </Text>
          </View>
        </InfoSection>
      </View>

      <CashConversionTrainingModal visible={modal.isVisible} onClose={modal.close} />
    </ScrollView>
  );
}

function makeStyles(colors: AppColors) {
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
