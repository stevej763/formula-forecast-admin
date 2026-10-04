import { useState } from "react";
import TextField from "../../../../shared/components/TextField";
import FormActions, { FormError } from "../../../../shared/components/FormActions";
import { createConstructor } from "../../../../api/constructorsApiClient";

interface AddConstructorFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  teamName: string;
  base: string;
}

interface FormErrors {
  teamName?: string;
  base?: string;
  general?: string;
}

const AddConstructorForm = ({ onSuccess, onCancel }: AddConstructorFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    base: "",
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

    if (!formData.teamName.trim()) {
      newErrors.teamName = "Team name is required";
    }

    if (!formData.base.trim()) {
      newErrors.base = "Base location is required";
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
      await createConstructor({
        teamName: formData.teamName.trim(),
        base: formData.base.trim(),
      });
      onSuccess();
    } catch (err) {
      console.error("Error creating constructor:", err);
      // You might want to show a more specific error message
      setErrors({ general: "The constructor wasn't saved. Try again, and check the API logs if it keeps failing." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormError message={errors.general} />
      <TextField
        id="teamName"
        label="Team name"
        placeholder="McLaren"
        value={formData.teamName}
        onChange={(e) => handleInputChange("teamName", e.target.value)}
        error={errors.teamName}
      />
      <TextField
        id="base"
        label="Base"
        placeholder="Woking, United Kingdom"
        value={formData.base}
        onChange={(e) => handleInputChange("base", e.target.value)}
        error={errors.base}
      />
      <FormActions
        submitLabel="Add constructor"
        submittingLabel="Adding constructor…"
        submitting={loading}
        onCancel={onCancel}
      />
    </form>
  );
};

export default AddConstructorForm;
