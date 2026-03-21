import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { AccentModeCard, MenuScreenHeader, InstructionBox } from '@shared';
import { PositionMode } from '../../types';
import { getWheelOrder } from '../../utils/validation';
import { PositionWheelOrderCard } from '../../components/PositionWheelOrderCard';
import { POSITION_ACCENT_COLORS, POSITION_MODE_OPTIONS } from '../../constants';
import type { PositionMenuScreenProps } from './PositionMenuScreen.types';

export default function PositionMenuScreen({ navigation }: PositionMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const handleModeSelect = (mode: PositionMode) => {
    navigation.navigate('PositionTraining', { mode });
  };

  const wheelOrder = getWheelOrder();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <MenuScreenHeader
        title="Number → Position"
        subtitle="Find the winning number on the racetrack"
      />

      <PositionWheelOrderCard wheelOrder={wheelOrder} />

      <View style={styles.modesContainer}>
        <Text style={styles.sectionTitle}>Select Training Mode:</Text>
        {POSITION_MODE_OPTIONS.map(option => (
          <AccentModeCard
            key={option.mode}
            title={option.title}
            description={option.description}
            accentColor={option.color}
            onPress={() => handleModeSelect(option.mode)}
          />
        ))}
      </View>

      <InstructionBox
        instructions={[
          '1. A winning number is displayed at the top',
          '2. Tap the exact number location on the racetrack',
          '3. Get feedback and try the next number',
          '4. Build your score with each correct answer',
        ]}
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
      padding: 24,
      paddingBottom: 32,
    },
    modesContainer: {
      gap: 16,
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 8,
    },
  });
}
