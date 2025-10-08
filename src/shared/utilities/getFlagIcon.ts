// src/app/home/getFlagIcon.ts
/**
 * Returns a country flag emoji for a given race location string.
 * Example: "Australia" => "🇦🇺"
 */
const flagMap: Record<string, string> = {
  AUSTRALIA: "🇦🇺",
  BAHRAIN: "🇧🇭",
  SAUDI_ARABIA: "🇸🇦",
  EMILIA_ROMAGNA: "🇮🇹",
  MONACO: "🇲🇨",
  SPAIN: "🇪🇸",
  CANADA: "🇨🇦",
  AUSTRIA: "🇦🇹",
  GREAT_BRITAIN: "🇬🇧",
  HUNGARY: "🇭🇺",
  BELGIUM: "🇧🇪",
  NETHERLANDS: "🇳🇱",
  ITALY: "🇮🇹",
  SINGAPORE: "🇸🇬",
  JAPAN: "🇯🇵",
  QATAR: "🇶🇦",
  UNITED_STATES: "🇺🇸",
  MEXICO: "🇲🇽",
  BRAZIL: "🇧🇷",
  ABU_DHABI: "🇦🇪",
  CHINA: "🇨🇳",
  AZERBAIJAN: "🇦🇿",
  LAS_VEGAS: "🇺🇸",
  MIAMI: "🇺🇸",
};

export function getFlagIcon(enumLocation: string): string {
  if (!enumLocation) return "";
  // Try exact match, then case-insensitive
  return (
    flagMap[enumLocation] ||
    flagMap[
      Object.keys(flagMap).find((key) => key.toLowerCase() === enumLocation.toLowerCase()) || ""
    ] ||
    ""
  );
}
