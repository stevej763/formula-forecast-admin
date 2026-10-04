import type { TableColumn } from "../../../../shared/components/AdminTable";

export interface Constructor {
  constructorUid: string;
  teamName: string;
  base: string;
}

export const constructorColumns: TableColumn<Constructor>[] = [
  {
    key: "teamName",
    header: "Team",
    formatter: (constructor: Constructor) => <span className="font-medium">{constructor.teamName}</span>,
  },
  {
    key: "base",
    header: "Base",
    formatter: (constructor: Constructor) => <span className="text-ash">{constructor.base}</span>,
  },
];
