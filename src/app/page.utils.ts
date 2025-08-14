/**
 * Get years of experience since the start
 * @param startYear - The year when experience started
 * @returns Number of years of experience
 */
export function calculateYearsOfExperience(startYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}
