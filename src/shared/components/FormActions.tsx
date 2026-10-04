import Button from "./Button";

interface FormActionsProps {
  submitLabel: string;
  submittingLabel: string;
  submitting: boolean;
  onCancel: () => void;
  disabled?: boolean;
}

export default function FormActions({ submitLabel, submittingLabel, submitting, onCancel, disabled }: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-3">
      <Button type="submit" disabled={submitting || disabled}>
        {submitting ? submittingLabel : submitLabel}
      </Button>
      <Button variant="quiet" onClick={onCancel} disabled={submitting}>
        Cancel
      </Button>
    </div>
  );
}

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="border-l-2 border-signal pl-3 text-sm">
      {message}
    </p>
  );
}
