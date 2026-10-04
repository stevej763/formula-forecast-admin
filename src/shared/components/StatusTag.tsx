import type { RaceWeekendStatus } from "../../api/raceWeekendApiClient";

const statusStyles: Record<RaceWeekendStatus, { label: string; className: string }> = {
  UPCOMING: { label: "Upcoming", className: "text-ash" },
  RACE_WEEK: { label: "Race week", className: "text-chalk" },
  LIVE: { label: "Live", className: "text-signal" },
  COMPLETE: { label: "Complete", className: "text-ash" },
};

export default function StatusTag({ status }: { status: RaceWeekendStatus }) {
  const style = statusStyles[status] ?? { label: "Unknown", className: "text-ash" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${style.className}`}>
      {status === "LIVE" && <span aria-hidden className="h-2 w-2 rounded-full bg-signal" />}
      {style.label}
    </span>
  );
}
