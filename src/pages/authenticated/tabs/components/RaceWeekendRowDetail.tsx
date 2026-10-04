import { useState } from "react";
import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";
import { CopyId, DetailList } from "../../../../shared/components/DetailList";
import Button from "../../../../shared/components/Button";
import { formatSessionTime } from "../../../../shared/utilities/formatDate";
import ResultsModal from "./ResultsModal";

interface RaceWeekendRowDetailProps {
  raceWeekend: RaceWeekend;
}

const RaceWeekendRowDetail = ({ raceWeekend }: RaceWeekendRowDetailProps) => {
  const [resultsOpen, setResultsOpen] = useState(false);

  // Sorted by start time, so this reads as the weekend's schedule.
  const sessions = [
    ...raceWeekend.practiceSessions.map((p) => ({ label: `Practice ${p.sessionNumber}`, startsAt: p.startsAt })),
    ...(raceWeekend.sprintResponse ? [{ label: "Sprint", startsAt: raceWeekend.sprintResponse.startsAt }] : []),
    { label: "Qualifying", startsAt: raceWeekend.qualifying.startsAt },
    { label: "Race", startsAt: raceWeekend.raceResponse.startsAt },
  ]
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .map((session) => ({ label: session.label, value: formatSessionTime(session.startsAt) }));

  return (
    <>
      <DetailList
        items={[
          { label: "Round", value: raceWeekend.roundNumber },
          ...sessions,
          { label: "Picks lock", value: formatSessionTime(raceWeekend.predictionsLockAt) },
          {
            label: "Results",
            value: (
              <Button variant="secondary" className="-my-1.5" onClick={() => setResultsOpen(true)}>
                Enter results
              </Button>
            ),
          },
          { label: "Weekend ID", value: <CopyId id={raceWeekend.raceWeekendUid} /> },
        ]}
      />
      <ResultsModal isOpen={resultsOpen} onClose={() => setResultsOpen(false)} raceWeekend={raceWeekend} />
    </>
  );
};

export default RaceWeekendRowDetail;
