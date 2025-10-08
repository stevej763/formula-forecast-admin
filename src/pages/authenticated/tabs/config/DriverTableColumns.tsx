import type { TableColumn } from "../../../../shared/components/AdminTable";
import { getCountryNameByCode } from "../../../../shared/utilities/countryCodes";

export interface Driver {
  driverUid: string;
  firstName: string;
  lastName: string;
  nickname: string;
  nationality: string;
  dateOfBirth: string;
}

export const driverColumns: TableColumn<Driver>[] = [
  {
    key: 'firstName',
    header: 'Name',
    formatter: (driver: Driver) => (
      <div className="text-white font-medium">
        {driver.firstName} {driver.lastName}
      </div>
    )
  },
  {
    key: 'nickname',
    header: 'Nickname',
    formatter: (driver: Driver) => (
      <span className="text-blue-200">{driver.nickname}</span>
    )
  },
  {
    key: 'nationality',
    header: 'Nationality',
    formatter: (driver: Driver) => (
      <span className="text-blue-200" title={driver.nationality}>
        {getCountryNameByCode(driver.nationality)}
      </span>
    )
  },
  {
    key: 'dateOfBirth',
    header: 'Date of Birth',
    formatter: (driver: Driver) => (
      <span className="text-blue-200">{new Date(driver.dateOfBirth).toLocaleDateString()}</span>
    )
  },
  {
    key: 'driverUid',
    header: 'Driver UID',
    formatter: (driver: Driver) => (
      <span className="text-gray-400 text-sm font-mono">{driver.driverUid}</span>
    )
  }
];