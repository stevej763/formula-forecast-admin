import { useState } from "react";
import TextField from "../../../../shared/components/TextField";
import FormActions, { FormError } from "../../../../shared/components/FormActions";
import { createRaceWeekend, type CreateRaceWeekendRequest } from "../../../../api/raceWeekendApiClient";

interface AddRaceWeekendFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  raceName: string;
  raceLocation: string;
  raceWeekendStartDate: string;
  raceWeekendEndDate: string;
}

interface FormErrors {
  raceName?: string;
  raceLocation?: string;
  raceWeekendStartDate?: string;
  raceWeekendEndDate?: string;
  general?: string;
}

const AddRaceWeekendForm = ({ onSuccess, onCancel }: AddRaceWeekendFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    raceName: "",
    raceLocation: "",
    raceWeekendStartDate: "",
    raceWeekendEndDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.raceName.trim()) {
      newErrors.raceName = "Race name is required";
    }

    if (!formData.raceLocation.trim()) {
      newErrors.raceLocation = "Race location is required";
    }

    if (!formData.raceWeekendStartDate) {
      newErrors.raceWeekendStartDate = "Start date is required";
    }

    if (!formData.raceWeekendEndDate) {
      newErrors.raceWeekendEndDate = "End date is required";
    }

    // Check if end date is after start date
    if (formData.raceWeekendStartDate && formData.raceWeekendEndDate) {
      const startDate = new Date(formData.raceWeekendStartDate);
      const endDate = new Date(formData.raceWeekendEndDate);
      if (endDate < startDate) {
        newErrors.raceWeekendEndDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const requestData: CreateRaceWeekendRequest = {
        raceName: formData.raceName.trim(),
        raceLocation: formData.raceLocation.trim(),
        raceWeekendStartDate: formData.raceWeekendStartDate,
        raceWeekendEndDate: formData.raceWeekendEndDate,
      };
      await createRaceWeekend(requestData);
      onSuccess();
    } catch (err) {
      console.error("Error creating race weekend:", err);
      setErrors({ general: "The race weekend wasn't saved. Try again, and check the API logs if it keeps failing." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormError message={errors.general} />
      <TextField
        id="raceName"
        label="Race name"
        placeholder="e.g. UNITED_STATES"
        value={formData.raceName}
        onChange={(e) => handleInputChange("raceName", e.target.value)}
        error={errors.raceName}
      />
      <TextField
        id="raceLocation"
        label="Race location"
        placeholder="Country code, e.g. US"
        value={formData.raceLocation}
        onChange={(e) => handleInputChange("raceLocation", e.target.value)}
        error={errors.raceLocation}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="raceWeekendStartDate"
          label="First day"
          type="date"
          value={formData.raceWeekendStartDate}
          onChange={(e) => handleInputChange("raceWeekendStartDate", e.target.value)}
          error={errors.raceWeekendStartDate}
        />
        <TextField
          id="raceWeekendEndDate"
          label="Last day"
          type="date"
          value={formData.raceWeekendEndDate}
          onChange={(e) => handleInputChange("raceWeekendEndDate", e.target.value)}
          error={errors.raceWeekendEndDate}
        />
      </div>
      <FormActions
        submitLabel="Add race weekend"
        submittingLabel="Adding race weekend…"
        submitting={loading}
        onCancel={onCancel}
      />
    </form>
  );
};

export default AddRaceWeekendForm;
