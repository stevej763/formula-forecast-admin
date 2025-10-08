import { useEffect, useState } from "react";
import { fetchAllRaceWeekends, type RaceWeekend } from "../../../api/raceWeekendApiClient";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import AdminTable from "../../../shared/components/AdminTable";
import Modal from "../../../shared/components/Modal";
import AddRaceWeekendForm from "./components/AddRaceWeekendForm";
import RaceWeekendRowDetail from "./components/RaceWeekendRowDetail";
import { raceWeekendColumns } from "./config/RaceWeekendTableColumns";

const RaceWeekendsTab = () => {
  const [raceWeekends, setRaceWeekends] = useState<RaceWeekend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchRaceWeekends = async () => {
    try {
      setLoading(true);
      const response = await fetchAllRaceWeekends();
      setRaceWeekends(response.raceWeekendResponses);
      setError(null);
    } catch (err) {
      setError("Failed to load race weekends");
      console.error("Error fetching race weekends:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRaceWeekendCreated = () => {
    setShowAddModal(false);
    fetchRaceWeekends(); // Refresh the list
  };

  useEffect(() => {
    fetchRaceWeekends();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Race Weekends Management</h2>
        <div className="bg-white/5 rounded-lg p-8 border border-blue-500/20 flex justify-center">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Race Weekends Management</h2>
        <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/50">
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Race Weekends Management</h2>
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm">{raceWeekends.length} race weekends</span>
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
            Add Race Weekend
          </button>
        </div>
      </div>
      
      <AdminTable 
        data={raceWeekends}
        columns={raceWeekendColumns}
        emptyMessage="No race weekends found"
        keyExtractor="raceWeekendUid"
        expandableContent={(raceWeekend) => (
          <RaceWeekendRowDetail raceWeekend={raceWeekend} />
        )}
      />

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Race Weekend"
        size="md"
      >
        <AddRaceWeekendForm
          onSuccess={handleRaceWeekendCreated}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default RaceWeekendsTab;