import { useState } from "react";
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
      setErrors({ general: "Failed to create driver. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
          <p className="text-red-300 text-sm">{errors.general}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-blue-200 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.firstName 
                ? "border-red-500 focus:ring-red-400" 
                : "border-blue-400/30 focus:ring-blue-400"
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-red-300 text-xs">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-blue-200 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.lastName 
                ? "border-red-500 focus:ring-red-400" 
                : "border-blue-400/30 focus:ring-blue-400"
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-red-300 text-xs">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="nickname" className="block text-sm font-medium text-blue-200 mb-2">
          Nickname
        </label>
        <input
          type="text"
          id="nickname"
          value={formData.nickname}
          onChange={(e) => handleInputChange("nickname", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.nickname 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
          placeholder="Enter nickname"
        />
        {errors.nickname && (
          <p className="mt-1 text-red-300 text-xs">{errors.nickname}</p>
        )}
      </div>

      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-blue-200 mb-2">
          Nationality
        </label>
        <FilterableSelect
          id="nationality"
          options={countryOptions}
          value={formData.nationality}
          onChange={(value) => handleInputChange("nationality", value)}
          placeholder="Search for a country..."
          error={!!errors.nationality}
        />
        {errors.nationality && (
          <p className="mt-1 text-red-300 text-xs">{errors.nationality}</p>
        )}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-blue-200 mb-2">
          Date of Birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.dateOfBirth 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-red-300 text-xs">{errors.dateOfBirth}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-blue-200 hover:text-white transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-150"
        >
          {isSubmitting ? "Creating..." : "Create Driver"}
        </button>
      </div>
    </form>
  );
};

export default AddDriverForm;