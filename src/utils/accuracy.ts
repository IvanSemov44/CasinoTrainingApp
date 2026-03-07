/**
 * Calculate accuracy percentage from correct/total counts
 * @param correct - Number of correct answers
 * @param total - Total number of attempts
 * @returns Accuracy percentage (0-100), rounded to nearest integer
 */
export function calculateAccuracy(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

/**
 * Get color for accuracy percentage
 * @param percentage - Accuracy percentage (0-100)
 * @param colors - Theme colors object
 * @returns Color string for the given accuracy level
 */
export function getAccuracyColor(
  percentage: number,
  colors: { status: { success: string; warning: string; error: string } }
): string {
  if (percentage >= 80) return colors.status.success;
  if (percentage >= 60) return colors.status.warning;
  return colors.status.error;
}
