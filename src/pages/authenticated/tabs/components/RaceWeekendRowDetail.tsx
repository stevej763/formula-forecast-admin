import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";

interface RaceWeekendRowDetailProps {
  raceWeekend: RaceWeekend;
}

const RaceWeekendRowDetail = ({ raceWeekend }: RaceWeekendRowDetailProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-white font-medium mb-3">Race Weekend Details</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-blue-300 text-sm font-medium">Event Name:</span>
          <p className="text-blue-100">{raceWeekend.raceName}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Circuit Location:</span>
          <p className="text-blue-100">{raceWeekend.raceLocation}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Weekend Duration:</span>
          <p className="text-blue-100">
            {new Date(raceWeekend.raceWeekendStartDate).toLocaleDateString()} - {new Date(raceWeekend.raceWeekendEndDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Current Status:</span>
          <p className="text-blue-100">{raceWeekend.raceWeekendStatus.replace('_', ' ')}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Practice Sessions:</span>
          <p className="text-blue-100">{raceWeekend.practiceSessions.length} sessions</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Has Sprint:</span>
          <p className="text-blue-100">{raceWeekend.sprintResponse ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-blue-700/30">
        <span className="text-blue-300 text-sm font-medium">Session Schedule:</span>
        <div className="text-blue-100 text-sm mt-1 space-y-1">
          <div>• Qualifying: {new Date(raceWeekend.qualifying.sessionDate).toLocaleString()}</div>
          <div>• Race: {new Date(raceWeekend.raceResponse.sessionDate).toLocaleString()}</div>
          {raceWeekend.sprintResponse && (
            <div>• Sprint: {new Date(raceWeekend.sprintResponse.sessionDate).toLocaleString()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceWeekendRowDetail;