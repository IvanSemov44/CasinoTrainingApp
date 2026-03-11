/**
 * Chip utility functions for breaking down amounts into chip denominations
 */

import { CHIP_DENOMINATIONS } from '../features/cash-conversion-training/constants/denominations';

export interface ChipBreakdown {
  value: number;
  count: number;
  color: string;
}

/**
 * Break down a total amount into chip denominations
 * Uses a greedy algorithm to maximize larger denomination chips first
 *
 * @param total - The total amount to break down into chips
 * @returns Array of chip objects with value, count, and color
 */
export function getChips(total: number): ChipBreakdown[] {
  const chips: ChipBreakdown[] = [];
  let remaining = total;

  for (const denom of CHIP_DENOMINATIONS) {
    if (remaining >= denom.value) {
      const count = Math.floor(remaining / denom.value);
      chips.push({ value: denom.value, count, color: denom.color });
      remaining -= count * denom.value;
    }
  }

  return chips;
}
