import { useState } from "react";
import TextField from "../../../../shared/components/TextField";
import FormActions, { FormError } from "../../../../shared/components/FormActions";
import { createDriver } from "../../../../api/driversApiClient";
import { countries } from "../../../../shared/utilities/countryCodes";
import FilterableSelect from "../../../../shared/components/FilterableSelect";

interface AddDriverFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  nickname: string;
  nationality: string;
  dateOfBirth: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  nationality?: string;
  dateOfBirth?: string;
  general?: string;
}

const AddDriverForm = ({ onSuccess, onCancel }: AddDriverFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    nickname: "",
    nationality: "",
    dateOfBirth: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prepare country options for the filterable select
  const countryOptions = countries.map(country => ({
    value: country.code,
    label: `${country.name} (${country.code})`
  }));

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Nickname is required";
    }

    if (!formData.nationality.trim()) {
      newErrors.nationality = "Nationality is required";
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (birthDate >= today) {
        newErrors.dateOfBirth = "Date of birth must be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await createDriver(formData);
      onSuccess();
    } catch (error: unknown) {
      console.error("Failed to create driver:", error);
      setErrors({ general: "The driver wasn't saved. Try again, and check the API logs if it keeps failing." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormError message={errors.general} />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="firstName"
          label="First name"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          error={errors.firstName}
        />
        <TextField
          id="lastName"
          label="Last name"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          error={errors.lastName}
        />
      </div>
      <TextField
        id="nickname"
        label="Nickname"
        value={formData.nickname}
        onChange={(e) => handleInputChange("nickname", e.target.value)}
        error={errors.nickname}
      />
      <div>
        <label htmlFor="nationality" className="mb-1.5 block text-sm font-medium">
          Nationality
        </label>
        <FilterableSelect
          id="nationality"
          options={countryOptions}
          value={formData.nationality}
          onChange={(value) => handleInputChange("nationality", value)}
          placeholder="Search countries"
          emptyMessage="No matching countries"
          error={!!errors.nationality}
        />
        {errors.nationality && <p className="mt-1.5 text-sm text-signal">{errors.nationality}</p>}
      </div>
      <TextField
        id="dateOfBirth"
        label="Date of birth"
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
        error={errors.dateOfBirth}
      />
      <FormActions
        submitLabel="Add driver"
        submittingLabel="Adding driver…"
        submitting={isSubmitting}
        onCancel={onCancel}
      />
    </form>
  );
};

export default AddDriverForm;
