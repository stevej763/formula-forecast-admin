import type { Constructor } from "../config/ConstructorTableColumns";

interface ConstructorRowDetailProps {
  constructor: Constructor;
}

const ConstructorRowDetail = ({ constructor }: ConstructorRowDetailProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-white font-medium mb-3">Constructor Details</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-blue-300 text-sm font-medium">Team Name:</span>
          <p className="text-blue-100">{constructor.name}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Base Location:</span>
          <p className="text-blue-100">{constructor.nationality}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Constructor ID:</span>
          <p className="text-blue-100 font-mono text-sm">{constructor.constructorUid}</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-blue-700/30">
        <span className="text-blue-300 text-sm font-medium">Team Information:</span>
        <p className="text-blue-100 text-sm mt-1">
          This constructor represents a Formula 1 team. Manage team details, drivers, and technical specifications through the admin panel.
        </p>
      </div>
    </div>
  );
};

export default ConstructorRowDetail;