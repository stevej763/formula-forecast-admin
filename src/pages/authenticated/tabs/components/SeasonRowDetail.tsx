import type { Season } from "../../../../api/seasonApiClient";

interface SeasonRowDetailProps {
  season: Season;
}

const SeasonRowDetail = ({ season }: SeasonRowDetailProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-white font-medium mb-3">Season Details</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-blue-300 text-sm font-medium">Championship Year:</span>
          <p className="text-blue-100 font-semibold">{season.championshipYear}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Official Name:</span>
          <p className="text-blue-100">{season.championshipName}</p>
        </div>
      </div>
    </div>
  );
};

export default SeasonRowDetail;