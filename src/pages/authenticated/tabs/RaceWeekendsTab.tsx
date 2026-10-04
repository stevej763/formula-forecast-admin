import { fetchAllRaceWeekends, type RaceWeekend } from "../../../api/raceWeekendApiClient";
import ResourcePage from "../../../shared/components/ResourcePage";
import AddRaceWeekendForm from "./components/AddRaceWeekendForm";
import RaceWeekendRowDetail from "./components/RaceWeekendRowDetail";
import { raceWeekendColumns } from "./config/RaceWeekendTableColumns";

// Calendar order, so the next weekend to check is always near the top.
const loadRaceWeekends = async (): Promise<RaceWeekend[]> =>
  [...(await fetchAllRaceWeekends()).raceWeekendResponses].sort(
    (a, b) => new Date(a.raceWeekendStartDate).getTime() - new Date(b.raceWeekendStartDate).getTime(),
  );

const RaceWeekendsTab = () => (
  <ResourcePage
    title="Race weekends"
    description="The calendar, with session times that decide when picks lock."
    noun="race weekends"
    addLabel="Add race weekend"
    emptyMessage="No race weekends yet. Add the calendar so players have something to predict."
    load={loadRaceWeekends}
    columns={raceWeekendColumns}
    keyExtractor="raceWeekendUid"
    renderDetail={(raceWeekend) => <RaceWeekendRowDetail raceWeekend={raceWeekend} />}
    renderAddForm={(onSuccess, onCancel) => <AddRaceWeekendForm onSuccess={onSuccess} onCancel={onCancel} />}
  />
);

export default RaceWeekendsTab;
