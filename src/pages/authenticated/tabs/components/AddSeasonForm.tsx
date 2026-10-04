import { useState } from "react";
import TextField from "../../../../shared/components/TextField";
import FormActions, { FormError } from "../../../../shared/components/FormActions";
import { createSeason } from "../../../../api/seasonApiClient";

interface AddSeasonFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  year: string;
  name: string;
}

interface FormErrors {
  year?: string;
  name?: string;
  general?: string;
}

const AddSeasonForm = ({ onSuccess, onCancel }: AddSeasonFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    year: "",
    name: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const yearNum = parseInt(formData.year);
    if (!formData.year || isNaN(yearNum) || yearNum < 1950 || yearNum > 2100) {
      newErrors.year = "Please enter a valid year between 1950 and 2100";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Season name is required";
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
      await createSeason({
        year: parseInt(formData.year),
        name: formData.name.trim()
      });
      onSuccess();
    } catch (err) {
      console.error("Error creating season:", err);
      setErrors({ general: "The season wasn't saved. Check a season for that year doesn't already exist, then try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormError message={errors.general} />
      <TextField
        id="year"
        label="Year"
        type="number"
        min="1950"
        max="2100"
        placeholder="2027"
        value={formData.year}
        onChange={(e) => handleInputChange("year", e.target.value)}
        error={errors.year}
      />
      <TextField
        id="name"
        label="Season name"
        placeholder="Formula 1 World Championship 2027"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        error={errors.name}
      />
      <FormActions submitLabel="Add season" submittingLabel="Adding season…" submitting={loading} onCancel={onCancel} />
    </form>
  );
};

export default AddSeasonForm;
