import { getAllDrivers, type Driver } from "../../../api/driversApiClient";
import ResourcePage from "../../../shared/components/ResourcePage";
import AddDriverForm from "./components/AddDriverForm";
import DriverRowDetail from "./components/DriverRowDetail";
import { driverColumns } from "./config/DriverTableColumns";

const loadDrivers = async (): Promise<Driver[]> => (await getAllDrivers()).drivers;

const DriversTab = () => (
  <ResourcePage
    title="Drivers"
    description="Everyone players can pick from, and the team each one drives for."
    noun="drivers"
    addLabel="Add driver"
    emptyMessage="No drivers yet. Add the grid so players have someone to pick."
    load={loadDrivers}
    columns={driverColumns}
    keyExtractor="driverUid"
    renderDetail={(driver, reload) => <DriverRowDetail driver={driver} onUpdate={reload} />}
    renderAddForm={(onSuccess, onCancel) => <AddDriverForm onSuccess={onSuccess} onCancel={onCancel} />}
  />
);

export default DriversTab;
