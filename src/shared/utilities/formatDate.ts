/** "19 Oct 2026" */
export function formatDay(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** "19–21 Oct 2026", or "31 Oct – 2 Nov 2026" across months. */
export function formatDayRange(startIso: string, endIso: string): string {
  if (!startIso || !endIso) return "";
  const start = new Date(startIso);
  const end = new Date(endIso);
  const endText = formatDay(endIso);
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${endText}`;
  }
  return `${start.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${endText}`;
}

/**
 * Session start in the admin's local time, always with the timezone shown,
 * because these times decide when players' picks lock. "Sun 19 Oct, 20:00 BST"
 */
export function formatSessionTime(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}
