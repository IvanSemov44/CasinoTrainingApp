import {
  getTrainingBetConfig,
  getTrainingBetTypes,
  getTrainingScreen,
} from '../trainingSelection.utils';

describe('trainingSelection.utils', () => {
  describe('getTrainingScreen', () => {
    it('returns Calculation for single bet training types', () => {
      expect(getTrainingScreen('STRAIGHT_UP')).toBe('Calculation');
      expect(getTrainingScreen('SPLIT')).toBe('Calculation');
      expect(getTrainingScreen('STREET')).toBe('Calculation');
      expect(getTrainingScreen('CORNER')).toBe('Calculation');
      expect(getTrainingScreen('SIX_LINE')).toBe('Calculation');
    });

    it('returns specific screens for mixed training types', () => {
      expect(getTrainingScreen('MIXED_CALCULATION')).toBe('MixedCalculation');
      expect(getTrainingScreen('TRIPLE_MIXED_CALCULATION')).toBe('TripleMixedCalculation');
      expect(getTrainingScreen('ALL_POSITIONS_CALCULATION')).toBe('AllPositionsCalculation');
    });
  });

  describe('getTrainingBetConfig', () => {
    it('returns bet config for supported single bet types', () => {
      expect(getTrainingBetConfig('STRAIGHT_UP')).toBe('STRAIGHT_UP');
      expect(getTrainingBetConfig('SPLIT')).toBe('SPLIT');
      expect(getTrainingBetConfig('STREET')).toBe('STREET');
      expect(getTrainingBetConfig('CORNER')).toBe('CORNER');
      expect(getTrainingBetConfig('SIX_LINE')).toBe('SIX_LINE');
    });

    it('returns undefined for mixed training types', () => {
      expect(getTrainingBetConfig('MIXED_CALCULATION')).toBeUndefined();
      expect(getTrainingBetConfig('TRIPLE_MIXED_CALCULATION')).toBeUndefined();
      expect(getTrainingBetConfig('ALL_POSITIONS_CALCULATION')).toBeUndefined();
    });
  });

  describe('getTrainingBetTypes', () => {
    it('returns undefined for single bet types', () => {
      expect(getTrainingBetTypes('STRAIGHT_UP')).toBeUndefined();
      expect(getTrainingBetTypes('SPLIT')).toBeUndefined();
    });

    it('returns expected bet type arrays for mixed modes', () => {
      expect(getTrainingBetTypes('MIXED_CALCULATION')).toEqual(['STRAIGHT', 'SPLIT']);
      expect(getTrainingBetTypes('TRIPLE_MIXED_CALCULATION')).toEqual([
        'STRAIGHT',
        'SPLIT',
        'CORNER',
      ]);
      expect(getTrainingBetTypes('ALL_POSITIONS_CALCULATION')).toEqual([
        'STRAIGHT',
        'SPLIT',
        'CORNER',
        'STREET',
        'SIX_LINE',
      ]);
    });
  });
});
