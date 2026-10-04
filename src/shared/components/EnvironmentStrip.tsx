import { environmentName, isProduction } from "../utilities/environment";

/**
 * Always-visible marker of which database the admin is editing.
 * Production is the one place red is used as a standing warning.
 */
export default function EnvironmentStrip() {
  return (
    <div
      className={`flex h-8 shrink-0 items-center gap-3 px-6 text-sm ${
        isProduction ? "bg-signal text-white" : "border-b border-graphite bg-carbon text-ash"
      }`}
    >
      <span className="font-semibold">{environmentName}</span>
      <span className={isProduction ? "text-white/85" : ""}>
        {isProduction ? "Changes go live to players immediately" : "Changes don't affect live players"}
      </span>
    </div>
  );
}
