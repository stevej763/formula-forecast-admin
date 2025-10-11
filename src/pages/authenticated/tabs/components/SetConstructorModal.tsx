import { useState, useEffect } from 'react';
import { getAllConstructors } from '../../../../api/constructorsApiClient';
import { setDriverConstructor } from '../../../../api/driversApiClient';
import Modal from '../../../../shared/components/Modal';
import LoaderSpinner from '../../../../shared/components/LoaderSpinner';
import type { Constructor } from '../config/ConstructorTableColumns';
import type { Driver } from '../config/DriverTableColumns';

interface SetConstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
  onSuccess: () => void;
}

const SetConstructorModal = ({ isOpen, onClose, driver, onSuccess }: SetConstructorModalProps) => {
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [selectedConstructorUid, setSelectedConstructorUid] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchConstructors();
    }
  }, [isOpen]);

  const fetchConstructors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllConstructors();
      setConstructors(response.constructors);
    } catch (err) {
      setError('Failed to load constructors');
      console.error('Error fetching constructors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedConstructorUid) {
      setError('Please select a constructor');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await setDriverConstructor({
        driverUid: driver.driverUid,
        constructorUid: selectedConstructorUid
      });

      onSuccess();
      onClose();
      setSelectedConstructorUid('');
    } catch (err) {
      setError('Failed to set constructor team');
      console.error('Error setting constructor:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedConstructorUid('');
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Set Constructor Team" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <p className="text-blue-200 text-sm mb-2">
            Select which constructor team <span className="font-medium text-white">{driver.firstName} {driver.lastName}</span> races for:
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <LoaderSpinner />
          </div>
        ) : (
          <div>
            <label htmlFor="constructor" className="block text-sm font-medium text-blue-200 mb-2">
              Constructor Team
            </label>
            <select
              id="constructor"
              value={selectedConstructorUid}
              onChange={(e) => setSelectedConstructorUid(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            >
              <option value="" className="bg-gray-800 text-gray-300">Select a constructor...</option>
              {constructors.map((constructor) => (
                <option key={constructor.constructorUid} value={constructor.constructorUid} className="bg-gray-800 text-white">
                  {constructor.teamName} ({constructor.base})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting || loading || !selectedConstructorUid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {submitting && (
              <div className="animate-spin inline-block h-4 w-4 border-2 border-t-white border-white/30 rounded-full"></div>
            )}
            {submitting ? 'Setting Team...' : 'Set Constructor Team'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SetConstructorModal;