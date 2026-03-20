// Re-export components that remain in src/components/
// (Shared components moved to src/shared/)

// Re-export Racetrack from feature location for backwards compatibility
export { default as Racetrack } from '@features/roulette-training/components/Racetrack';

// Re-export PLO components (moved to features/plo-training/components)
// (exported from feature's own components index)
export { default as ActionLog } from '@features/plo-training/components/ActionLog';
export { default as PotCalculationInput } from '@features/plo-training/components/PotCalculationInput';

// Re-export roulette components (moved to features/roulette-training/components/roulette-ui)
// Re-export for cross-feature access
export { default as RouletteLayout } from '@features/roulette-training/components/roulette-ui/RouletteLayout';
export { default as RouletteNumberCell } from '@features/roulette-training/components/roulette-ui/RouletteNumberCell';
export { default as RouletteChip } from '@features/roulette-training/components/roulette-ui/RouletteChip';
export { default as TrainingSelectionModal } from '@features/roulette-training/components/roulette-ui/TrainingSelectionModal';
