import type { Season } from "../../../../api/seasonApiClient";
import { CopyId, DetailList } from "../../../../shared/components/DetailList";

interface SeasonRowDetailProps {
  season: Season;
}

const SeasonRowDetail = ({ season }: SeasonRowDetailProps) => (
  <DetailList
    items={[
      { label: "Official name", value: season.championshipName },
      { label: "Season ID", value: <CopyId id={season.championshipSeasonUid} /> },
    ]}
  />
);

export default SeasonRowDetail;
