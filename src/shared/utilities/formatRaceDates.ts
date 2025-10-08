// src/app/home/formatRaceDates.ts
/**
 * Format two ISO date strings as "Month DD - DD"
 * Example: "2025-01-01", "2025-01-03" => "January 01 - 03"
 */
export function formatRaceDates(start: string, end: string): string {
  if (!start || !end) return "";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const endMonth = endDate.toLocaleString("default", { month: "short" });
  const startDay = String(startDate.getDate()).padStart(2, "0");
  const endDay = String(endDate.getDate()).padStart(2, "0");
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}
