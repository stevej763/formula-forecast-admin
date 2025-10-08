import type { TableColumn } from "../../../../shared/components/AdminTable";

export interface Constructor {
  constructorUid: string;
  teamName: string;
  base: string;
  // Add other constructor fields as needed
}

export const constructorColumns: TableColumn<Constructor>[] = [
  {
    key: 'teamName',
    header: 'Team Name',
    formatter: (constructor: Constructor) => (
      <div className="text-white font-medium">
        {constructor.teamName}
      </div>
    )
  },
  {
    key: 'base',
    header: 'Base Location',
    formatter: (constructor: Constructor) => (
      <span className="text-blue-200">
        {constructor.base}
      </span>
    )
  },
  {
    key: 'constructorUid',
    header: 'Constructor UID',
    formatter: (constructor: Constructor) => (
      <span className="text-gray-400 text-sm font-mono">{constructor.constructorUid}</span>
    )
  }
];