import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";
import { CopyId, DetailList } from "../../../../shared/components/DetailList";
import { formatSessionTime } from "../../../../shared/utilities/formatDate";

interface RaceWeekendRowDetailProps {
  raceWeekend: RaceWeekend;
}

const RaceWeekendRowDetail = ({ raceWeekend }: RaceWeekendRowDetailProps) => {
  // Sorted by start time, so this reads as the weekend's schedule.
  const sessions = [
    ...raceWeekend.practiceSessions.map((p) => ({ label: `Practice ${p.sessionNumber}`, date: p.sessionDate })),
    ...(raceWeekend.sprintResponse ? [{ label: "Sprint", date: raceWeekend.sprintResponse.sessionDate }] : []),
    { label: "Qualifying", date: raceWeekend.qualifying.sessionDate },
    { label: "Race", date: raceWeekend.raceResponse.sessionDate },
  ]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((session) => ({ label: session.label, value: formatSessionTime(session.date) }));

  return (
    <DetailList items={[...sessions, { label: "Weekend ID", value: <CopyId id={raceWeekend.raceWeekendUid} /> }]} />
  );
};

export default RaceWeekendRowDetail;
