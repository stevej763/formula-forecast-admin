import type { Driver } from "../config/DriverTableColumns";

interface DriverRowDetailProps {
  driver: Driver;
}

const DriverRowDetail = ({ driver }: DriverRowDetailProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-white font-medium mb-3">Driver Details</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-blue-300 text-sm font-medium">Full Name:</span>
          <p className="text-blue-100">{driver.firstName} {driver.lastName}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Nickname:</span>
          <p className="text-blue-100">{driver.nickname || 'N/A'}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Date of Birth:</span>
          <p className="text-blue-100">{new Date(driver.dateOfBirth).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        <div>
          <span className="text-blue-300 text-sm font-medium">Driver ID:</span>
          <p className="text-blue-100 font-mono text-sm">{driver.driverUid}</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-blue-700/30">
        <span className="text-blue-300 text-sm font-medium">Additional Information:</span>
        <p className="text-blue-100 text-sm mt-1">
          This driver can be managed through the admin panel. Click to expand/collapse details.
        </p>
      </div>
    </div>
  );
};

export default DriverRowDetail;