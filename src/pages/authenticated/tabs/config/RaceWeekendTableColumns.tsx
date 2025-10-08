import type { TableColumn } from "../../../../shared/components/AdminTable";
import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";

export const raceWeekendColumns: TableColumn<RaceWeekend>[] = [
  {
    key: 'raceName',
    header: 'Race Name',
    formatter: (raceWeekend: RaceWeekend) => (
      <div className="text-white font-medium">
        {raceWeekend.raceName}
      </div>
    )
  },
  {
    key: 'raceLocation',
    header: 'Location',
    formatter: (raceWeekend: RaceWeekend) => (
      <span className="text-blue-200">{raceWeekend.raceLocation}</span>
    )
  },
  {
    key: 'raceWeekendStartDate',
    header: 'Start Date',
    formatter: (raceWeekend: RaceWeekend) => (
      <span className="text-blue-200">
        {new Date(raceWeekend.raceWeekendStartDate).toLocaleDateString()}
      </span>
    )
  },
  {
    key: 'raceWeekendEndDate',
    header: 'End Date',
    formatter: (raceWeekend: RaceWeekend) => (
      <span className="text-blue-200">
        {new Date(raceWeekend.raceWeekendEndDate).toLocaleDateString()}
      </span>
    )
  },
  {
    key: 'raceWeekendStatus',
    header: 'Status',
    formatter: (raceWeekend: RaceWeekend) => {
      const statusColors = {
        UPCOMING: 'bg-blue-600/30 text-blue-200',
        RACE_WEEK: 'bg-yellow-600/30 text-yellow-200',
        LIVE: 'bg-green-600/30 text-green-200',
        COMPLETE: 'bg-gray-600/30 text-gray-200'
      };
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[raceWeekend.raceWeekendStatus]}`}>
          {raceWeekend.raceWeekendStatus.replace('_', ' ')}
        </span>
      );
    }
  },
  {
    key: 'raceWeekendUid',
    header: 'Weekend UID',
    formatter: (raceWeekend: RaceWeekend) => (
      <span className="text-gray-400 text-sm font-mono">{raceWeekend.raceWeekendUid}</span>
    )
  }
];