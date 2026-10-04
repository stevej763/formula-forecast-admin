import type { TableColumn } from "../../../../shared/components/AdminTable";
import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";
import StatusTag from "../../../../shared/components/StatusTag";
import { formatEnumText } from "../../../../shared/utilities/formatEnumText";
import { getCountryNameByCode } from "../../../../shared/utilities/countryCodes";
import { formatDayRange } from "../../../../shared/utilities/formatDate";

export const raceWeekendColumns: TableColumn<RaceWeekend>[] = [
  {
    key: "raceName",
    header: "Race",
    formatter: (raceWeekend: RaceWeekend) => (
      <span className="font-display text-lg">{formatEnumText(raceWeekend.raceName)}</span>
    ),
  },
  {
    key: "raceWeekendStartDate",
    header: "Dates",
    formatter: (raceWeekend: RaceWeekend) => (
      <span>{formatDayRange(raceWeekend.raceWeekendStartDate, raceWeekend.raceWeekendEndDate)}</span>
    ),
  },
  {
    key: "raceLocation",
    header: "Country",
    formatter: (raceWeekend: RaceWeekend) => (
      <span className="text-ash">{getCountryNameByCode(raceWeekend.raceLocation)}</span>
    ),
  },
  {
    key: "raceWeekendStatus",
    header: "Status",
    formatter: (raceWeekend: RaceWeekend) => <StatusTag status={raceWeekend.raceWeekendStatus} />,
  },
];
