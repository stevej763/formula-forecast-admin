import type { TableColumn } from "../../../../shared/components/AdminTable";
import { getCountryNameByCode } from "../../../../shared/utilities/countryCodes";
import { formatDay } from "../../../../shared/utilities/formatDate";
import type { Driver } from "../../../../api/driversApiClient";

export const driverColumns: TableColumn<Driver>[] = [
  {
    key: "lastName",
    header: "Driver",
    formatter: (driver: Driver) => (
      <span className="flex items-baseline gap-2">
        <span className="font-display text-lg">{driver.lastName}</span>
        <span className="text-ash">{driver.firstName}</span>
      </span>
    ),
  },
  {
    key: "constructor",
    header: "Team",
    // A driver without a team can't score, so it's the one thing flagged in red.
    formatter: (driver: Driver) =>
      driver.constructorUid && driver.teamName ? (
        <span>{driver.teamName}</span>
      ) : (
        <span className="font-medium text-signal">No team</span>
      ),
  },
  {
    key: "nationality",
    header: "Nationality",
    formatter: (driver: Driver) => (
      <span className="text-ash" title={driver.nationality}>
        {getCountryNameByCode(driver.nationality)}
      </span>
    ),
  },
  {
    key: "dateOfBirth",
    header: "Born",
    formatter: (driver: Driver) => <span className="text-ash">{formatDay(driver.dateOfBirth)}</span>,
  },
];
