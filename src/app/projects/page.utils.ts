export function truncateDescription(description: string, maxLength = 120): string {
  if (description.length <= maxLength) return description;
  return `${description.slice(0, maxLength).trim()}...`;
}
