import { useState, useEffect } from 'react';
import { getAllConstructors } from '../../../../api/constructorsApiClient';
import { setDriverConstructor } from '../../../../api/driversApiClient';
import Modal from '../../../../shared/components/Modal';
import LoaderSpinner from '../../../../shared/components/LoaderSpinner';
import FormActions, { FormError } from '../../../../shared/components/FormActions';
import type { Constructor } from '../config/ConstructorTableColumns';
import type { Driver } from '../../../../api/driversApiClient';

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
      setError("Couldn't load the constructor list. Close this panel and try again.");
      console.error('Error fetching constructors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedConstructorUid) {
      setError('Choose a team.');
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
      setError("The team wasn't saved. Try again, and check the API logs if it keeps failing.");
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Set team for ${driver.firstName} ${driver.lastName}`}
      description="Players' points for this driver count towards the team you choose."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormError message={error} />

        {loading ? (
          <LoaderSpinner />
        ) : (
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Team</legend>
            <div className="divide-y divide-graphite border-y border-graphite">
              {constructors.map((constructor) => (
                <label
                  key={constructor.constructorUid}
                  className="flex cursor-pointer items-center gap-3 py-3 has-[:checked]:text-chalk"
                >
                  <input
                    type="radio"
                    name="constructor"
                    value={constructor.constructorUid}
                    checked={selectedConstructorUid === constructor.constructorUid}
                    onChange={(e) => setSelectedConstructorUid(e.target.value)}
                    className="h-4 w-4 accent-signal"
                  />
                  <span className="flex-1 font-medium">{constructor.teamName}</span>
                  <span className="text-sm text-ash">{constructor.base}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <FormActions
          submitLabel="Set team"
          submittingLabel="Setting team…"
          submitting={submitting}
          disabled={loading || !selectedConstructorUid}
          onCancel={handleClose}
        />
      </form>
    </Modal>
  );
};

export default SetConstructorModal;
