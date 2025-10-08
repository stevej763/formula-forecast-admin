import { useState } from "react";
import { createSeason } from "../../../../api/seasonApiClient";

interface AddSeasonFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  year: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

interface FormErrors {
  year?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
}

const AddSeasonForm = ({ onSuccess, onCancel }: AddSeasonFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    year: "",
    name: "",
    startDate: "",
    endDate: "",
    active: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field !== 'active' && errors[field as keyof FormErrors]) {
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

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    // Check if end date is after start date
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate < startDate) {
        newErrors.endDate = "End date must be after start date";
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
      await createSeason({
        year: parseInt(formData.year),
        name: formData.name.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        active: formData.active,
      });
      onSuccess();
    } catch (err) {
      console.error("Error creating season:", err);
      setErrors({ name: "Failed to create season. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-blue-200 mb-2">
          Year
        </label>
        <input
          type="number"
          id="year"
          value={formData.year}
          onChange={(e) => handleInputChange("year", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.year 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
          placeholder="2024"
          min="1950"
          max="2100"
        />
        {errors.year && (
          <p className="mt-1 text-red-300 text-xs">{errors.year}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">
          Season Name
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
          placeholder="Formula 1 World Championship 2024"
        />
        {errors.name && (
          <p className="mt-1 text-red-300 text-xs">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-blue-200 mb-2">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={formData.startDate}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.startDate 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
        />
        {errors.startDate && (
          <p className="mt-1 text-red-300 text-xs">{errors.startDate}</p>
        )}
      </div>

      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-blue-200 mb-2">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={formData.endDate}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.endDate 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
        />
        {errors.endDate && (
          <p className="mt-1 text-red-300 text-xs">{errors.endDate}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="active"
          checked={formData.active}
          onChange={(e) => handleInputChange("active", e.target.checked)}
          className="h-4 w-4 text-blue-600 bg-white/10 border-blue-400/30 rounded focus:ring-blue-400 focus:ring-2"
        />
        <label htmlFor="active" className="ml-2 block text-sm text-blue-200">
          Set as active season
        </label>
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
          {loading ? "Creating..." : "Create Season"}
        </button>
      </div>
    </form>
  );
};

export default AddSeasonForm;