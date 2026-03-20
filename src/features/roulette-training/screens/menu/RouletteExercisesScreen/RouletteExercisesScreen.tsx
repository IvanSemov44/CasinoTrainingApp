import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TrainingSelectionModal } from '@features/roulette-training/components/roulette-ui';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { useModalState } from '@hooks/useModalState';
import { InfoSection, StartTrainingButton, MenuScreenHeader } from '@shared';
import type { AppColors } from '@styles/themes';
import type { RouletteTrainingStackParamList } from '../../../navigation';

type RouletteExercisesScreenProps = StackScreenProps<
  RouletteTrainingStackParamList,
  'RouletteExercises'
>;

export default function RouletteExercisesScreen(_props: RouletteExercisesScreenProps) {
  const modal = useModalState();
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.container}>
      <MenuScreenHeader
        title="Roulette Training"
        subtitle="Master payout calculations for all bet types"
      />

      <View style={styles.content}>
        <StartTrainingButton
          icon="🎯"
          hint="Select from all available exercises"
          onPress={modal.open}
        />

        <InfoSection title="Available Training Types">
          <View style={styles.trainingTypesList}>
            <Text style={styles.trainingTypeItem}>• Straight Up (35:1)</Text>
            <Text style={styles.trainingTypeItem}>• Split (17:1)</Text>
            <Text style={styles.trainingTypeItem}>• Street (11:1)</Text>
            <Text style={styles.trainingTypeItem}>• Corner (8:1)</Text>
            <Text style={styles.trainingTypeItem}>• Six Line (5:1)</Text>
            <Text style={styles.trainingTypeItem}>• Mixed Bets</Text>
            <Text style={styles.trainingTypeItem}>• Cash Handling</Text>
          </View>
        </InfoSection>
      </View>

      <TrainingSelectionModal visible={modal.isVisible} onClose={modal.close} />
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    content: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
    },
    trainingTypesList: {
      gap: 6,
    },
    trainingTypeItem: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
    },
  });
}
