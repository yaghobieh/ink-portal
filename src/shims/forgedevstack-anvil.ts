export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function titleCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(capitalize)
    .join(' ');
}

export function sentenceCase(str: string): string {
  const result = str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .toLowerCase();
  return capitalize(result);
}
