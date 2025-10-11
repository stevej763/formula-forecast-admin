import { useState } from 'react';
import type { Driver } from "../config/DriverTableColumns";
import SetConstructorModal from './SetConstructorModal';

interface DriverRowDetailProps {
  driver: Driver;
  onUpdate?: () => void;
}

const DriverRowDetail = ({ driver, onUpdate }: DriverRowDetailProps) => {
  const [isSetConstructorModalOpen, setIsSetConstructorModalOpen] = useState(false);

  const handleConstructorSet = () => {
    onUpdate?.();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h4 className="text-white font-medium">Driver Details</h4>
        <button
          onClick={() => setIsSetConstructorModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
        >
          Set Constructor Team
        </button>
      </div>
      
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

      <SetConstructorModal
        isOpen={isSetConstructorModalOpen}
        onClose={() => setIsSetConstructorModalOpen(false)}
        driver={driver}
        onSuccess={handleConstructorSet}
      />
    </div>
  );
};

export default DriverRowDetail;