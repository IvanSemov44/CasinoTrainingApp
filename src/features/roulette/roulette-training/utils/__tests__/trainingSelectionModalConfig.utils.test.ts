import {
  buildTrainingSelectionNumberInput,
  buildTrainingSelectionSteps,
  buildTrainingSelectionSummary,
} from '../trainingSelectionModalConfig.utils';

describe('trainingSelectionModalConfig.utils', () => {
  describe('buildTrainingSelectionSteps', () => {
    it('returns only training type step when type is not selected', () => {
      const steps = buildTrainingSelectionSteps({
        selectedTrainingType: null,
        selectedDenomination: null,
        onTrainingTypeSelect: jest.fn(),
        onDenominationSelect: jest.fn(),
        onToggleTrainingType: jest.fn(),
        onToggleDenomination: jest.fn(),
        isTrainingTypeOpen: false,
        isDenominationOpen: false,
      });

      expect(steps).toHaveLength(1);
      expect(steps[0].title).toBe('Training Type');
    });

    it('adds denomination step when training type is selected', () => {
      const steps = buildTrainingSelectionSteps({
        selectedTrainingType: 'STRAIGHT_UP',
        selectedDenomination: null,
        onTrainingTypeSelect: jest.fn(),
        onDenominationSelect: jest.fn(),
        onToggleTrainingType: jest.fn(),
        onToggleDenomination: jest.fn(),
        isTrainingTypeOpen: false,
        isDenominationOpen: false,
      });

      expect(steps).toHaveLength(2);
      expect(steps[1].title).toBe('Chip Denomination');
      expect(steps[1].optional).toBe(true);
    });
  });

  describe('buildTrainingSelectionNumberInput', () => {
    it('returns undefined when training type is not selected', () => {
      const config = buildTrainingSelectionNumberInput({
        selectedTrainingType: null,
        selectedDenomination: null,
        chipCount: '3',
        onChipCountChange: jest.fn(),
        onToggleChipCount: jest.fn(),
        isChipCountOpen: false,
      });

      expect(config).toBeUndefined();
    });

    it('returns config with step number 2 without denomination', () => {
      const config = buildTrainingSelectionNumberInput({
        selectedTrainingType: 'SPLIT',
        selectedDenomination: null,
        chipCount: '5',
        onChipCountChange: jest.fn(),
        onToggleChipCount: jest.fn(),
        isChipCountOpen: true,
      });

      expect(config).toBeDefined();
      expect(config?.number).toBe(2);
      expect(config?.value).toBe('5');
    });

    it('returns config with step number 3 when denomination is selected', () => {
      const config = buildTrainingSelectionNumberInput({
        selectedTrainingType: 'SPLIT',
        selectedDenomination: 'FIVE_DOLLAR',
        chipCount: '10',
        onChipCountChange: jest.fn(),
        onToggleChipCount: jest.fn(),
        isChipCountOpen: false,
      });

      expect(config?.number).toBe(3);
      expect(config?.title).toBe('Chip Count');
    });
  });

  describe('buildTrainingSelectionSummary', () => {
    it('returns empty summary when training type is missing', () => {
      expect(buildTrainingSelectionSummary(null, null, '3')).toEqual([]);
    });

    it('returns summary with type and chips by default', () => {
      const summary = buildTrainingSelectionSummary('STRAIGHT_UP', null, '3');
      expect(summary).toHaveLength(2);
      expect(summary[0].label).toBe('Type');
      expect(summary[1]).toEqual({ label: 'Chips', value: '3' });
    });

    it('includes denomination when selected', () => {
      const summary = buildTrainingSelectionSummary('SPLIT', 'FIVE_DOLLAR', '8');
      expect(summary).toHaveLength(3);
      expect(summary[1].label).toBe('Denomination');
      expect(summary[2]).toEqual({ label: 'Chips', value: '8' });
    });
  });
});
