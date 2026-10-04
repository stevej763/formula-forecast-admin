import { useState } from "react";
import type { Driver } from "../../../../api/driversApiClient";
import Button from "../../../../shared/components/Button";
import { CopyId, DetailList } from "../../../../shared/components/DetailList";
import SetConstructorModal from "./SetConstructorModal";

interface DriverRowDetailProps {
  driver: Driver;
  onUpdate?: () => void;
}

const DriverRowDetail = ({ driver, onUpdate }: DriverRowDetailProps) => {
  const [isSetConstructorModalOpen, setIsSetConstructorModalOpen] = useState(false);
  const hasTeam = !!(driver.constructorUid && driver.teamName);

  return (
    <div className="flex flex-wrap items-start gap-x-10 gap-y-4">
      <DetailList
        items={[
          { label: "Nickname", value: driver.nickname || <span className="text-ash">None</span> },
          { label: "Driver ID", value: <CopyId id={driver.driverUid} /> },
        ]}
      />
      <Button
        variant={hasTeam ? "secondary" : "primary"}
        className="ml-auto"
        onClick={() => setIsSetConstructorModalOpen(true)}
      >
        {hasTeam ? "Change team" : "Set team"}
      </Button>

      <SetConstructorModal
        isOpen={isSetConstructorModalOpen}
        onClose={() => setIsSetConstructorModalOpen(false)}
        driver={driver}
        onSuccess={() => onUpdate?.()}
      />
    </div>
  );
};

export default DriverRowDetail;
