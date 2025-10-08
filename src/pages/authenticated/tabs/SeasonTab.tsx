import { useEffect, useState } from "react";
import { getAllSeasons, type Season } from "../../../api/seasonApiClient";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import AdminTable from "../../../shared/components/AdminTable";
import Modal from "../../../shared/components/Modal";
import AddSeasonForm from "./components/AddSeasonForm";
import SeasonRowDetail from "./components/SeasonRowDetail";
import { seasonColumns } from "./config/SeasonTableColumns";

const SeasonTab = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchSeasons = async () => {
    try {
      setLoading(true);
      const response = await getAllSeasons();
      setSeasons(response.seasons);
      setError(null);
    } catch (err) {
      setError("Failed to load seasons");
      console.error("Error fetching seasons:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonCreated = () => {
    setShowAddModal(false);
    fetchSeasons(); // Refresh the list
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Season Management</h2>
        <div className="bg-white/5 rounded-lg p-8 border border-blue-500/20 flex justify-center">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Season Management</h2>
        <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/50">
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Season Management</h2>
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm">{seasons.length} seasons</span>
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
            Add Season
          </button>
        </div>
      </div>
      
      <AdminTable 
        data={seasons}
        columns={seasonColumns}
        emptyMessage="No seasons found"
        keyExtractor="championshipSeasonUid"
        expandableContent={(season) => (
          <SeasonRowDetail season={season} />
        )}
      />

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Season"
        size="md"
      >
        <AddSeasonForm
          onSuccess={handleSeasonCreated}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default SeasonTab;