import { getAllConstructors } from "../../../api/constructorsApiClient";
import ResourcePage from "../../../shared/components/ResourcePage";
import AddConstructorForm from "./components/AddConstructorForm";
import ConstructorRowDetail from "./components/ConstructorRowDetail";
import { constructorColumns, type Constructor } from "./config/ConstructorTableColumns";

const loadConstructors = async (): Promise<Constructor[]> => (await getAllConstructors()).constructors;

const ConstructorsTab = () => (
  <ResourcePage
    title="Constructors"
    description="The teams drivers race for."
    noun="constructors"
    addLabel="Add constructor"
    emptyMessage="No constructors yet. Add the teams before assigning drivers to them."
    load={loadConstructors}
    columns={constructorColumns}
    keyExtractor="constructorUid"
    renderDetail={(constructor) => <ConstructorRowDetail constructor={constructor} />}
    renderAddForm={(onSuccess, onCancel) => <AddConstructorForm onSuccess={onSuccess} onCancel={onCancel} />}
  />
);

export default ConstructorsTab;
