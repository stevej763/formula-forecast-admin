import type { TableColumn } from "../../../../shared/components/AdminTable";
import type { Season } from "../../../../api/seasonApiClient";

export const seasonColumns: TableColumn<Season>[] = [
  {
    key: 'championshipYear',
    header: 'Year',
    formatter: (season: Season) => (
      <div className="text-white font-medium">
        {season.championshipYear}
      </div>
    )
  },
  {
    key: 'championshipName',
    header: 'Season Name',
    formatter: (season: Season) => (
      <span className="text-blue-200">{season.championshipName}</span>
    )
  },
  {
    key: 'championshipSeasonUid',
    header: 'Season UID',
    formatter: (season: Season) => (
      <span className="text-gray-400 text-sm font-mono">{season.championshipSeasonUid}</span>
    )
  }
];