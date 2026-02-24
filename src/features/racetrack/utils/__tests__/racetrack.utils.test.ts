import {
  getNeighbors,
  getTopNumberCenterX,
  getBottomNumberCenterX,
  svgToComponent,
  svgDimensionToComponent,
} from '../racetrack.utils';
import { WHEEL_ORDER, TOP_NUMBERS, BOTTOM_NUMBERS, VIEWBOX } from '../../constants/racetrack.constants';

describe('racetrack.utils', () => {
  describe('getNeighbors', () => {
    it('should return empty array for invalid number', () => {
      expect(getNeighbors(37)).toEqual([]);
      expect(getNeighbors(-1)).toEqual([]);
    });

    it('should return correct neighbors for valid number with default count', () => {
      // Number 0 is at index 0 in WHEEL_ORDER
      // Neighbors should wrap around the wheel
      const neighbors = getNeighbors(0);
      expect(neighbors).toHaveLength(5); // 2 on each side + center
      expect(neighbors).toContain(0);
    });

    it('should return correct neighbors with custom count', () => {
      const neighbors = getNeighbors(0, 1);
      expect(neighbors).toHaveLength(3); // 1 on each side + center
    });

    it('should wrap around the wheel correctly', () => {
      // Test wrapping at the end of the wheel
      const lastIndex = WHEEL_ORDER.length - 1;
      const lastNumber = WHEEL_ORDER[lastIndex];
      const neighbors = getNeighbors(lastNumber, 2);
      
      expect(neighbors).toHaveLength(5);
      expect(neighbors).toContain(lastNumber);
    });

    it('should return the center number in the middle of the array', () => {
      const neighbors = getNeighbors(17, 2); // 17 is a common roulette number
      const middleIndex = Math.floor(neighbors.length / 2);
      expect(neighbors[middleIndex]).toBe(17);
    });
  });

  describe('getTopNumberCenterX', () => {
    it('should return correct X for first top number (index 0)', () => {
      const x = getTopNumberCenterX(0);
      expect(x).toBe(260);
    });

    it('should return correct X for last top number', () => {
      const lastIndex = TOP_NUMBERS.length - 1;
      const x = getTopNumberCenterX(lastIndex);
      expect(x).toBe(888);
    });

    it('should return increasing X values for increasing indices', () => {
      const x0 = getTopNumberCenterX(1);
      const x1 = getTopNumberCenterX(2);
      expect(x1).toBeGreaterThan(x0);
    });
  });

  describe('getBottomNumberCenterX', () => {
    it('should return correct X for first bottom number (index 0)', () => {
      const x = getBottomNumberCenterX(0);
      expect(x).toBe(250);
    });

    it('should return correct X for last bottom number', () => {
      const lastIndex = BOTTOM_NUMBERS.length - 1;
      const x = getBottomNumberCenterX(lastIndex);
      expect(x).toBe(885);
    });

    it('should return increasing X values for increasing indices', () => {
      const x0 = getBottomNumberCenterX(1);
      const x1 = getBottomNumberCenterX(2);
      expect(x1).toBeGreaterThan(x0);
    });
  });

  describe('svgToComponent', () => {
    it('should convert SVG coordinates to component coordinates', () => {
      const componentWidth = 300;
      const componentHeight = 150;
      
      // Convert top-left corner
      const result = svgToComponent(VIEWBOX.x, VIEWBOX.y, componentWidth, componentHeight);
      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });

    it('should convert bottom-right corner correctly', () => {
      const componentWidth = 300;
      const componentHeight = 150;
      
      const result = svgToComponent(
        VIEWBOX.x + VIEWBOX.width,
        VIEWBOX.y + VIEWBOX.height,
        componentWidth,
        componentHeight
      );
      expect(result.x).toBeCloseTo(componentWidth, 1);
      expect(result.y).toBeCloseTo(componentHeight, 1);
    });

    it('should convert center point correctly', () => {
      const componentWidth = 300;
      const componentHeight = 150;
      
      const centerX = VIEWBOX.x + VIEWBOX.width / 2;
      const centerY = VIEWBOX.y + VIEWBOX.height / 2;
      
      const result = svgToComponent(centerX, centerY, componentWidth, componentHeight);
      expect(result.x).toBeCloseTo(componentWidth / 2, 1);
      expect(result.y).toBeCloseTo(componentHeight / 2, 1);
    });
  });

  describe('svgDimensionToComponent', () => {
    it('should convert width dimension correctly', () => {
      const componentWidth = 300;
      const svgWidth = VIEWBOX.width / 2; // Half of SVG width
      
      const result = svgDimensionToComponent(svgWidth, componentWidth, true);
      expect(result).toBeCloseTo(componentWidth / 2, 1);
    });

    it('should convert height dimension correctly', () => {
      const componentHeight = 150;
      const svgHeight = VIEWBOX.height / 2; // Half of SVG height
      
      const result = svgDimensionToComponent(svgHeight, componentHeight, false);
      expect(result).toBeCloseTo(componentHeight / 2, 1);
    });

    it('should convert full width correctly', () => {
      const componentWidth = 300;
      
      const result = svgDimensionToComponent(VIEWBOX.width, componentWidth, true);
      expect(result).toBeCloseTo(componentWidth, 1);
    });

    it('should convert full height correctly', () => {
      const componentHeight = 150;
      
      const result = svgDimensionToComponent(VIEWBOX.height, componentHeight, false);
      expect(result).toBeCloseTo(componentHeight, 1);
    });
  });
});