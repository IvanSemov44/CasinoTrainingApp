// Unified roulette feature exports
// Re-exports all roulette-related features under one namespace

// ====================
// Roulette Game
// ====================
export { RouletteGameRoutes, type RouletteGameStackParamList } from './roulette-game';

// ====================
// Roulette Training
// ====================
export {
  RouletteTrainingRoutes,
  type RouletteTrainingStackParamList,
  // Screens
  RouletteExercisesScreen,
  CalculationScreen,
  RouletteLayoutViewScreen,
  RouletteLayoutPracticeScreen,
  RouletteTrainingScreen,
  // Components
  ExerciseLayout,
  type ExerciseLayoutProps,
  ExerciseStats,
  type ExerciseStatsProps,
  FeedbackCard,
  HintSection,
  type HintSectionProps,
  MenuListScreen,
  type MenuItem,
  type Difficulty,
  type MenuListScreenProps,
  Racetrack,
  // Roulette UI Components
  RouletteLayout,
  RouletteChip,
  RouletteNumberCell,
  RouletteZeroColumn,
  RouletteNumberGrid,
  RouletteOutsideBets,
  RouletteColumnBets,
  TrainingSelectionModal,
  // Hooks
  useRouletteBets,
  useExerciseState,
  useLayoutPracticeSession,
  // Types
  type BetType,
  type Bet,
  // Constants
  BET_PAYOUTS,
} from './roulette-training';

// ====================
// Racetrack
// ====================
export {
  RacetrackRoutes,
  type RacetrackStackParamList,
  RacetrackLayout,
  RacetrackTrackSvg,
  RacetrackOverlays,
  RacetrackScreen,
  useAnnouncedBets,
} from './racetrack';

// ====================
// Racetrack Position Training
// ====================
export {
  RacetrackPositionRoutes,
  type RacetrackPositionStackParamList,
  type PositionMode,
  type PositionValidationResult,
  type TrainingStats,
  usePositionTrainingSession,
  PositionTrainingScreen,
  PositionMenuScreen,
  PositionSidebarHeader,
  PositionSidebarFeedback,
  PositionWheelOrderCard,
  PositionTrainingSidebar,
} from './racetrack-position-training';

// ====================
// Racetrack Sector Training
// ====================
export {
  RacetrackSectorRoutes,
  type RacetrackSectorStackParamList,
  type SectorType,
  type SectorMode,
  type SectorValidationResult,
  type TrainingStats as SectorTrainingStats,
  useSectorTrainingSession,
  SectorTrainingScreen,
  SectorMenuScreen,
  SectorTrainingHeader,
  SectorReferenceCard,
} from './racetrack-sector-training';

// ====================
// Roulette Knowledge Training
// ====================
export {
  RKRoutes,
  type RKStackParamList,
  RKDrillScreen,
  RKMenuScreen,
} from './roulette-knowledge-training';

// ====================
// Shared Types
// ====================
export type { RouletteNumber, PlacedBet } from '@app-types/roulette.types';
