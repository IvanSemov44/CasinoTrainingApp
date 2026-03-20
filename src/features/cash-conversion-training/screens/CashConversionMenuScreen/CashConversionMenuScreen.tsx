import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { useModalState } from '@hooks/useModalState';
import { InfoSection, StartTrainingButton, MenuScreenHeader } from '@shared';
import type { AppColors } from '@styles/themes';
import { CashConversionTrainingModal } from '../../components';
import { SECTOR_POSITIONS, DIFFICULTY_MAX_BET } from '../../constants/sectors';

export default function CashConversionMenuScreen() {
  const styles = useThemedStyles(makeStyles);
  const modal = useModalState();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <MenuScreenHeader
        title="Cash Conversion Training"
        subtitle="Master sector bet calculations"
      />

      <View style={styles.content}>
        <StartTrainingButton
          icon="💰"
          hint="Configure and start your training"
          onPress={modal.open}
          style={{ marginBottom: 24 }}
        />

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
    content: {
      padding: 20,
      alignItems: 'center',
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
