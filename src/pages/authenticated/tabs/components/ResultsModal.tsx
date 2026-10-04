import { useEffect, useState } from "react";
import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";
import { fetchPredictionTypes, type PredictionType } from "../../../../api/predictionsApiClient";
import { getActiveDrivers, type Driver } from "../../../../api/driversApiClient";
import { fetchResults, submitResult, type ResultDriver } from "../../../../api/resultsApiClient";
import Modal from "../../../../shared/components/Modal";
import Button from "../../../../shared/components/Button";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import { FormError } from "../../../../shared/components/FormActions";
import { formatEnumText } from "../../../../shared/utilities/formatEnumText";
import { formatSessionTime } from "../../../../shared/utilities/formatDate";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  raceWeekend: RaceWeekend;
}

interface ResultsData {
  predictionTypes: PredictionType[];
  drivers: Driver[];
  results: Record<string, ResultDriver[]>;
}

const ResultsModal = ({ isOpen, onClose, raceWeekend }: ResultsModalProps) => {
  const [data, setData] = useState<ResultsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsOpen = new Date(raceWeekend.predictionsLockAt).getTime() <= Date.now();

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setData(null);
    setError(null);
    Promise.all([fetchPredictionTypes(), getActiveDrivers(), fetchResults(raceWeekend.raceWeekendUid)])
      .then(([types, drivers, results]) => {
        if (cancelled) return;
        setData({
          predictionTypes: types.predictionTypes,
          drivers: [...drivers.drivers].sort((a, b) => a.lastName.localeCompare(b.lastName)),
          results: Object.fromEntries(results.results.map((result) => [result.predictionTypeUid, result.drivers])),
        });
      })
      .catch((err) => {
        console.error("Error loading results:", err);
        if (!cancelled) setError("Couldn't load the results. Close this panel and try again.");
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, raceWeekend.raceWeekendUid]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Results for ${formatEnumText(raceWeekend.raceName)}`}
      description="Saving a result scores every team's pick for it. Save again to correct a mistake and re-score."
    >
      <FormError message={error} />
      {!resultsOpen ? (
        <p className="text-ash">
          Results open when picks lock, at {formatSessionTime(raceWeekend.predictionsLockAt)}.
        </p>
      ) : !data ? (
        !error && <LoaderSpinner />
      ) : (
        <div className="space-y-8">
          {data.predictionTypes.map((predictionType) => (
            <ResultEditor
              key={predictionType.predictionTypeUid}
              raceWeekendUid={raceWeekend.raceWeekendUid}
              predictionType={predictionType}
              drivers={data.drivers}
              savedResult={data.results[predictionType.predictionTypeUid] ?? []}
            />
          ))}
        </div>
      )}
    </Modal>
  );
};

interface ResultEditorProps {
  raceWeekendUid: string;
  predictionType: PredictionType;
  drivers: Driver[];
  savedResult: ResultDriver[];
}

/**
 * A ranked type (e.g. a top three) takes one driver per position. A single driver type takes one
 * driver, or several tied drivers who all count as correct.
 */
const ResultEditor = ({ raceWeekendUid, predictionType, drivers, savedResult }: ResultEditorProps) => {
  const ranked = predictionType.selectionCount > 1;
  const [selected, setSelected] = useState<string[]>(() => initialSelection(savedResult, predictionType.selectionCount));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const label = formatEnumText(predictionType.predictionType);
  const complete = selected.every((driverUid) => driverUid !== "");
  const duplicates = new Set(selected.filter(Boolean)).size !== selected.filter(Boolean).length;

  const choose = (index: number, driverUid: string) => {
    setSelected((prev) => prev.map((current, i) => (i === index ? driverUid : current)));
    setMessage(null);
  };

  const save = async () => {
    try {
      setSaving(true);
      setError(null);
      const result = selected.map((driverUid, i) => ({ driverUid, rank: ranked ? i + 1 : 1 }));
      const { predictionsScored } = await submitResult(raceWeekendUid, predictionType.predictionTypeUid, result);
      setMessage(`Saved. Scored ${predictionsScored} ${predictionsScored === 1 ? "prediction" : "predictions"}.`);
    } catch (err) {
      console.error("Error saving result:", err);
      setError("The result wasn't saved. Try again, and check the API logs if it keeps failing.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <fieldset className="space-y-3">
      <legend className="font-heading text-base">
        {label}
        <span className="ml-2 text-sm font-normal text-ash">{savedResult.length > 0 || message ? "Entered" : "Not entered"}</span>
      </legend>
      <FormError message={error} />
      {selected.map((driverUid, index) => {
        const id = `${predictionType.predictionTypeUid}-${index}`;
        const fieldLabel = ranked ? `P${index + 1}` : index === 0 ? "Driver" : `Tied driver ${index}`;
        return (
          <div key={id} className="flex items-center gap-3">
            <label htmlFor={id} className="w-24 shrink-0 text-sm text-ash">
              {fieldLabel}
            </label>
            <select
              id={id}
              value={driverUid}
              onChange={(e) => choose(index, e.target.value)}
              className="h-10 min-w-0 flex-1 rounded-md border border-graphite bg-carbon px-3 text-chalk focus:border-chalk focus:outline-none"
            >
              <option value="">Choose a driver</option>
              {drivers.map((driver) => (
                <option key={driver.driverUid} value={driver.driverUid}>
                  {driver.firstName} {driver.lastName}
                  {driver.teamName ? `, ${driver.teamName}` : ""}
                </option>
              ))}
            </select>
            {!ranked && index > 0 && (
              <Button
                variant="quiet"
                aria-label={`Remove ${fieldLabel.toLowerCase()}`}
                onClick={() => setSelected((prev) => prev.filter((_, i) => i !== index))}
              >
                Remove
              </Button>
            )}
          </div>
        );
      })}
      {duplicates && <p className="text-sm text-signal">Each driver can only appear once.</p>}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={save} disabled={saving || !complete || duplicates}>
          {saving ? "Saving…" : `Save ${label.toLowerCase()}`}
        </Button>
        {!ranked && (
          <Button variant="quiet" onClick={() => setSelected((prev) => [...prev, ""])}>
            Add tied driver
          </Button>
        )}
        <p role="status" className="text-sm text-ash">
          {message}
        </p>
      </div>
    </fieldset>
  );
};

function initialSelection(savedResult: ResultDriver[], selectionCount: number): string[] {
  if (savedResult.length > 0) {
    return [...savedResult].sort((a, b) => a.rank - b.rank).map((driver) => driver.driverUid);
  }
  return Array(selectionCount).fill("");
}

export default ResultsModal;
