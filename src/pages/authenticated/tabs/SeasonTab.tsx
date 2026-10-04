import { getAllSeasons, type Season } from "../../../api/seasonApiClient";
import ResourcePage from "../../../shared/components/ResourcePage";
import AddSeasonForm from "./components/AddSeasonForm";
import SeasonRowDetail from "./components/SeasonRowDetail";
import { seasonColumns } from "./config/SeasonTableColumns";

const loadSeasons = async (): Promise<Season[]> => (await getAllSeasons()).seasons;

const SeasonTab = () => (
  <ResourcePage
    title="Seasons"
    description="Each championship year players can join."
    noun="seasons"
    addLabel="Add season"
    emptyMessage="No seasons yet. Add one to start setting up the championship."
    load={loadSeasons}
    columns={seasonColumns}
    keyExtractor="championshipSeasonUid"
    renderDetail={(season) => <SeasonRowDetail season={season} />}
    renderAddForm={(onSuccess, onCancel) => <AddSeasonForm onSuccess={onSuccess} onCancel={onCancel} />}
  />
);

export default SeasonTab;
