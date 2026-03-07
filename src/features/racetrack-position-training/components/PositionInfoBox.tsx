import { InstructionBox } from '@components/shared';

/**
 * Info box explaining how to play position training
 */
export function PositionInfoBox() {
  return (
    <InstructionBox
      instructions={[
        '1. A winning number is displayed at the top',
        '2. Tap the exact number location on the racetrack',
        '3. Get feedback and try the next number',
        '4. Build your score with each correct answer',
      ]}
    />
  );
}
