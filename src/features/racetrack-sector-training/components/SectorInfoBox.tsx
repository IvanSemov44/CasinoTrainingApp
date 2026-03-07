import { InstructionBox } from '@components/shared';

/**
 * Info box explaining how to play sector training
 */
export function SectorInfoBox() {
  return (
    <InstructionBox
      instructions={[
        '1. A winning number is displayed at the top',
        '2. Tap the correct sector on the racetrack',
        '3. Get feedback and try the next number',
        '4. Build your score with each correct answer',
      ]}
    />
  );
}
