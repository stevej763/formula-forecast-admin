import type { TableColumn } from "../../../../shared/components/AdminTable";
import { getCountryNameByCode } from "../../../../shared/utilities/countryCodes";

export interface Constructor {
  constructorUid: string;
  name: string;
  nationality: string;
  // Add other constructor fields as needed
}

export const constructorColumns: TableColumn<Constructor>[] = [
  {
    key: 'name',
    header: 'Team Name',
    formatter: (constructor: Constructor) => (
      <div className="text-white font-medium">
        {constructor.name}
      </div>
    )
  },
  {
    key: 'nationality',
    header: 'Nationality',
    formatter: (constructor: Constructor) => (
      <span className="text-blue-200" title={constructor.nationality}>
        {getCountryNameByCode(constructor.nationality)}
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