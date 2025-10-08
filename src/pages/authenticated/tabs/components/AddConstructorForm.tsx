import { useState } from "react";
import { createConstructor } from "../../../../api/constructorsApiClient";
import FilterableSelect from "../../../../shared/components/FilterableSelect";
import { countries } from "../../../../shared/utilities/countryCodes";

interface AddConstructorFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  nationality: string;
}

interface FormErrors {
  name?: string;
  nationality?: string;
}

const AddConstructorForm = ({ onSuccess, onCancel }: AddConstructorFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    nationality: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // Prepare country options for FilterableSelect
  const countryOptions = countries.map(country => ({
    value: country.code,
    label: `${country.name} (${country.code})`
  }));

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Team name is required";
    }

    if (!formData.nationality) {
      newErrors.nationality = "Nationality is required";
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
        name: formData.name.trim(),
        nationality: formData.nationality,
      });
      onSuccess();
    } catch (err) {
      console.error("Error creating constructor:", err);
      // You might want to show a more specific error message
      setErrors({ name: "Failed to create constructor. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">
          Team Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.name 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
          placeholder="Enter team name..."
        />
        {errors.name && (
          <p className="mt-1 text-red-300 text-xs">{errors.name}</p>
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

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors duration-150 flex items-center gap-2"
        >
          {loading && (
            <div className="animate-spin inline-block h-4 w-4 border-2 border-t-white border-white/30 rounded-full"></div>
          )}
          {loading ? "Creating..." : "Create Constructor"}
        </button>
      </div>
    </form>
  );
};

export default AddConstructorForm;