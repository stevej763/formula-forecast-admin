import type { TableColumn } from "../../../../shared/components/AdminTable";
import type { Season } from "../../../../api/seasonApiClient";

export const seasonColumns: TableColumn<Season>[] = [
  {
    key: "championshipYear",
    header: "Year",
    formatter: (season: Season) => <span className="font-display text-xl">{season.championshipYear}</span>,
  },
  {
    key: "championshipName",
    header: "Name",
    formatter: (season: Season) => <span>{season.championshipName}</span>,
  },
];
