// src/app/home/formatEnumText.ts
/**
 * Format a Java enum string (e.g. RACE_WEEKEND) to capitalized text (e.g. "Race Weekend")
 */
export function formatEnumText(enumText: string): string {
  if (!enumText) return "";
  return enumText
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
