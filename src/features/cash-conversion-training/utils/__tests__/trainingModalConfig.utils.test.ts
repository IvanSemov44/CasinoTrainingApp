import {
  buildCashConversionNumberInput,
  buildCashConversionSteps,
  buildCashConversionSummary,
  canStartCashConversion,
} from '../trainingModalConfig.utils';

describe('trainingModalConfig.utils', () => {
  describe('buildCashConversionSteps', () => {
    it('returns only difficulty step when difficulty is not selected', () => {
      const steps = buildCashConversionSteps({
        selectedDifficulty: null,
        selectedSector: null,
        onDifficultySelect: jest.fn(),
        onSectorSelect: jest.fn(),
        onToggleDifficulty: jest.fn(),
        onToggleSector: jest.fn(),
        isDifficultyOpen: false,
        isSectorOpen: false,
      });

      expect(steps).toHaveLength(1);
      expect(steps[0].title).toBe('Difficulty');
    });

    it('adds sector step after difficulty selection', () => {
      const steps = buildCashConversionSteps({
        selectedDifficulty: 'easy',
        selectedSector: null,
        onDifficultySelect: jest.fn(),
        onSectorSelect: jest.fn(),
        onToggleDifficulty: jest.fn(),
        onToggleSector: jest.fn(),
        isDifficultyOpen: false,
        isSectorOpen: false,
      });

      expect(steps).toHaveLength(2);
      expect(steps[1].title).toBe('Sector');
    });
  });

  describe('buildCashConversionNumberInput', () => {
    it('returns undefined when sector is not selected', () => {
      const config = buildCashConversionNumberInput({
        selectedSector: null,
        exerciseCount: '10',
        onExerciseCountChange: jest.fn(),
        onToggleCount: jest.fn(),
        isCountOpen: false,
      });

      expect(config).toBeUndefined();
    });

    it('returns number input config when sector is selected', () => {
      const config = buildCashConversionNumberInput({
        selectedSector: 'tier',
        exerciseCount: '15',
        onExerciseCountChange: jest.fn(),
        onToggleCount: jest.fn(),
        isCountOpen: true,
      });

      expect(config).toBeDefined();
      expect(config?.title).toBe('Exercise Count');
      expect(config?.value).toBe('15');
      expect(config?.showDropdown).toBe(true);
    });
  });

  describe('buildCashConversionSummary', () => {
    it('returns empty summary when setup is incomplete', () => {
      expect(buildCashConversionSummary(null, 'tier', '10')).toEqual([]);
      expect(buildCashConversionSummary('easy', null, '10')).toEqual([]);
    });

    it('returns summary items when setup is complete', () => {
      const summary = buildCashConversionSummary('hard', 'voisins', '20');

      expect(summary).toHaveLength(3);
      expect(summary[0]).toEqual({ label: 'Difficulty', value: 'Hard' });
      expect(summary[1]).toEqual({ label: 'Sector', value: 'Voisins' });
      expect(summary[2]).toEqual({ label: 'Exercises', value: '20' });
    });
  });

  describe('canStartCashConversion', () => {
    it('returns true for valid setup', () => {
      expect(canStartCashConversion('medium', 'zero', '10')).toBe(true);
    });

    it('returns false for missing selections or invalid count', () => {
      expect(canStartCashConversion(null, 'zero', '10')).toBe(false);
      expect(canStartCashConversion('medium', null, '10')).toBe(false);
      expect(canStartCashConversion('medium', 'zero', '0')).toBe(false);
      expect(canStartCashConversion('medium', 'zero', '')).toBe(false);
      expect(canStartCashConversion('medium', 'zero', 'abc')).toBe(false);
    });
  });
});
