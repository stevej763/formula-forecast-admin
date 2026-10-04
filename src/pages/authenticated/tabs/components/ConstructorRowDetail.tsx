import type { Constructor } from "../config/ConstructorTableColumns";
import { CopyId, DetailList } from "../../../../shared/components/DetailList";

interface ConstructorRowDetailProps {
  constructor: Constructor;
}

const ConstructorRowDetail = ({ constructor }: ConstructorRowDetailProps) => (
  <DetailList
    items={[
      { label: "Base", value: constructor.base },
      { label: "Constructor ID", value: <CopyId id={constructor.constructorUid} /> },
    ]}
  />
);

export default ConstructorRowDetail;
