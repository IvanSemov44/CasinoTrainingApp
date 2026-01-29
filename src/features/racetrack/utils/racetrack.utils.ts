import { 
  WHEEL_ORDER, 
  TOP_NUMBERS, 
  BOTTOM_NUMBERS, 
  BOTTOM_CELL_BOUNDARIES,
  VIEWBOX 
} from '../constants/racetrack.constants';

/**
 * Get neighbors of a number on the wheel
 * @param number - The center number
 * @param count - Number of neighbors on each side (default: 2)
 * @returns Array of numbers including the center and neighbors
 */
export function getNeighbors(number: number, count: number = 2): number[] {
  const index = WHEEL_ORDER.indexOf(number);
  if (index === -1) return [];
  
  const neighbors: number[] = [];
  for (let i = -count; i <= count; i++) {
    const neighborIndex = (index + i + WHEEL_ORDER.length) % WHEEL_ORDER.length;
    neighbors.push(WHEEL_ORDER[neighborIndex]);
  }
  return neighbors;
}

/**
 * Calculate the X center position for a top row number
 */
export function getTopNumberCenterX(index: number): number {
  if (index === 0) return 260; // 5 - leftmost on curve
  if (index === TOP_NUMBERS.length - 1) return 888; // 35 - rightmost on curve
  
  const cellStart = 284 + ((index - 1) * 40.8);
  const cellEnd = 284 + (index * 40.8);
  return (cellStart + cellEnd) / 2;
}

/**
 * Calculate the X center position for a bottom row number
 */
export function getBottomNumberCenterX(index: number): number {
  if (index === 0) return 250; // 30 - leftmost on curve
  if (index === BOTTOM_NUMBERS.length - 1) return 885; // 32 - rightmost on curve
  
  const cellStart = BOTTOM_CELL_BOUNDARIES[index];
  const cellEnd = BOTTOM_CELL_BOUNDARIES[index + 1];
  return (cellStart + cellEnd) / 2;
}

/**
 * Convert SVG coordinates to component coordinates
 */
export function svgToComponent(
  svgX: number, 
  svgY: number, 
  componentWidth: number, 
  componentHeight: number
): { x: number; y: number } {
  return {
    x: ((svgX - VIEWBOX.x) / VIEWBOX.width) * componentWidth,
    y: ((svgY - VIEWBOX.y) / VIEWBOX.height) * componentHeight,
  };
}

/**
 * Convert SVG dimensions to component dimensions
 */
export function svgDimensionToComponent(
  svgDimension: number,
  componentSize: number,
  isWidth: boolean
): number {
  const viewBoxSize = isWidth ? VIEWBOX.width : VIEWBOX.height;
  return (svgDimension / viewBoxSize) * componentSize;
}
