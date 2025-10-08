import { useState } from "react";
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
      setErrors({ raceName: "Failed to create race weekend. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="raceName" className="block text-sm font-medium text-blue-200 mb-2">
          Race Name
        </label>
        <input
          type="text"
          id="raceName"
          value={formData.raceName}
          onChange={(e) => handleInputChange("raceName", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.raceName 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
          placeholder="Enter race name..."
        />
        {errors.raceName && (
          <p className="mt-1 text-red-300 text-xs">{errors.raceName}</p>
        )}
      </div>

      <div>
        <label htmlFor="raceLocation" className="block text-sm font-medium text-blue-200 mb-2">
          Race Location
        </label>
        <input
          type="text"
          id="raceLocation"
          value={formData.raceLocation}
          onChange={(e) => handleInputChange("raceLocation", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.raceLocation 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
          placeholder="Enter race location..."
        />
        {errors.raceLocation && (
          <p className="mt-1 text-red-300 text-xs">{errors.raceLocation}</p>
        )}
      </div>

      <div>
        <label htmlFor="raceWeekendStartDate" className="block text-sm font-medium text-blue-200 mb-2">
          Start Date
        </label>
        <input
          type="date"
          id="raceWeekendStartDate"
          value={formData.raceWeekendStartDate}
          onChange={(e) => handleInputChange("raceWeekendStartDate", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.raceWeekendStartDate 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
        />
        {errors.raceWeekendStartDate && (
          <p className="mt-1 text-red-300 text-xs">{errors.raceWeekendStartDate}</p>
        )}
      </div>

      <div>
        <label htmlFor="raceWeekendEndDate" className="block text-sm font-medium text-blue-200 mb-2">
          End Date
        </label>
        <input
          type="date"
          id="raceWeekendEndDate"
          value={formData.raceWeekendEndDate}
          onChange={(e) => handleInputChange("raceWeekendEndDate", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.raceWeekendEndDate 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
        />
        {errors.raceWeekendEndDate && (
          <p className="mt-1 text-red-300 text-xs">{errors.raceWeekendEndDate}</p>
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
          {loading ? "Creating..." : "Create Race Weekend"}
        </button>
      </div>
    </form>
  );
};

export default AddRaceWeekendForm;