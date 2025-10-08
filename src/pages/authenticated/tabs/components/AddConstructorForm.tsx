import { useState } from "react";
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
      setErrors({ teamName: "Failed to create constructor. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="teamName" className="block text-sm font-medium text-blue-200 mb-2">
          Team Name
        </label>
        <input
          type="text"
          id="teamName"
          value={formData.teamName}
          onChange={(e) => handleInputChange("teamName", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.teamName 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
          placeholder="Enter team name..."
        />
        {errors.teamName && (
          <p className="mt-1 text-red-300 text-xs">{errors.teamName}</p>
        )}
      </div>

      <div>
        <label htmlFor="base" className="block text-sm font-medium text-blue-200 mb-2">
          Base Location
        </label>
        <input
          type="text"
          id="base"
          value={formData.base}
          onChange={(e) => handleInputChange("base", e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.base 
              ? "border-red-500 focus:ring-red-400" 
              : "border-blue-400/30 focus:ring-blue-400"
          }`}
          placeholder="Enter base location..."
        />
        {errors.base && (
          <p className="mt-1 text-red-300 text-xs">{errors.base}</p>
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