import { useEffect, useState } from "react";
import { getAllConstructors } from "../../../api/constructorsApiClient";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import AdminTable from "../../../shared/components/AdminTable";
import Modal from "../../../shared/components/Modal";
import AddConstructorForm from "./components/AddConstructorForm";
import ConstructorRowDetail from "./components/ConstructorRowDetail";
import { constructorColumns, type Constructor } from "./config/ConstructorTableColumns";

const ConstructorsTab = () => {
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchConstructors = async () => {
    try {
      setLoading(true);
      const response = await getAllConstructors();
      setConstructors(response.constructors);
      setError(null);
    } catch (err) {
      setError("Failed to load constructors");
      console.error("Error fetching constructors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConstructorCreated = () => {
    setShowAddModal(false);
    fetchConstructors(); // Refresh the list
  };

  useEffect(() => {
    fetchConstructors();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Constructor Management</h2>
        <div className="bg-white/5 rounded-lg p-8 border border-blue-500/20 flex justify-center">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Constructor Management</h2>
        <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/50">
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Constructor Management</h2>
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm">{constructors.length} constructors</span>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors duration-150 flex items-center gap-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Constructor
          </button>
        </div>
      </div>
      
      <AdminTable 
        data={constructors}
        columns={constructorColumns}
        emptyMessage="No constructors found"
        keyExtractor="constructorUid"
        expandableContent={(constructor) => (
          <ConstructorRowDetail constructor={constructor} />
        )}
      />

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Constructor"
        size="md"
      >
        <AddConstructorForm
          onSuccess={handleConstructorCreated}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ConstructorsTab;