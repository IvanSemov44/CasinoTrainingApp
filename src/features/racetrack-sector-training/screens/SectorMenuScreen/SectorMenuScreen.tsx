import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { AccentModeCard, MenuScreenHeader, InstructionBox } from '@components/shared';
import { SectorMode } from '../../types';
import { getSectorOptions } from '../../utils/validation';
import { SectorReferenceCard } from '../../components/SectorReferenceCard';
import { SECTOR_ACCENT_COLORS, SECTOR_MODE_OPTIONS } from '../../constants';
import type { SectorMenuScreenProps } from './SectorMenuScreen.types';

export default function SectorMenuScreen({ navigation }: SectorMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const handleModeSelect = (mode: SectorMode) => {
    navigation.navigate('SectorTraining', { mode });
  };

  const sectorOptions = getSectorOptions();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <MenuScreenHeader
        title="Racetrack Sectors"
        subtitle="Learn which sector contains each winning number"
      />

      <SectorReferenceCard sectorOptions={sectorOptions} sectorColors={SECTOR_ACCENT_COLORS} />

      <View style={styles.modesContainer}>
        <Text style={styles.sectionTitle}>Select Training Mode:</Text>
        {SECTOR_MODE_OPTIONS.map(option => (
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
          '2. Tap the correct sector on the racetrack',
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
