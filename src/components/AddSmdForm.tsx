import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  DollarSign,
  Loader2,
  Monitor,
} from "lucide-react";

/* -------------------- Types -------------------- */
interface SmdFormData {
  smd_code: string;
  title: string;
  purchase_price: string;
}

type FormErrors = Partial<Record<keyof SmdFormData, string>>;

interface AddSmdFormProps {
  onSubmit: (data: {
    smd_code: string;
    title?: string;
    purchase_price: number;
  }) => Promise<void>;
  isSubmitting: boolean;
}

/* -------------------- Reusable Field -------------------- */
interface InputFieldProps {
  label: string;
  name: keyof SmdFormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  prefix?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400";

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  prefix,
  required = true,
  disabled = false,
  placeholder,
}) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-gray-700 ml-1">
      {label} {required && "*"}
    </label>

    <div className="relative">
      {prefix && (
        <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
          {prefix}
        </span>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`${inputClass} ${prefix ? "pl-11" : ""} ${
          error ? "border-red-500 ring-1 ring-red-500/10" : ""
        }`}
      />
    </div>

    {error && (
      <p className="text-xs text-red-600 flex gap-1.5 items-center mt-1 ml-1 font-medium">
        <AlertCircle size={14} /> {error}
      </p>
    )}
  </div>
);

/* -------------------- Main Component -------------------- */
const AddSmdForm: React.FC<AddSmdFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<SmdFormData>({
    smd_code: "",
    title: "",
    purchase_price: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SmdFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.smd_code) newErrors.smd_code = "SMD code is required.";
    if (!formData.purchase_price) {
      newErrors.purchase_price = "Purchase price is required.";
    } else if (Number(formData.purchase_price) <= 0) {
      newErrors.purchase_price = "Price must be greater than 0.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      smd_code: formData.smd_code,
      title: formData.title || undefined,
      purchase_price: Number(formData.purchase_price),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Add New Site / Media Display
              </h1>
              <p className="text-sm text-gray-500">
                Record a new asset for inventory tracking
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Content Section */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Monitor size={20} className="text-blue-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Display Details</h2>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField
                  label="SMD Code"
                  name="smd_code"
                  placeholder="e.g. SMD-001"
                  value={formData.smd_code}
                  onChange={handleChange}
                  error={errors.smd_code}
                  disabled={isSubmitting}
                />
                
                <InputField
                  label="Title (Optional)"
                  name="title"
                  placeholder="e.g. Main Mall Entrance"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  required={false}
                  disabled={isSubmitting}
                />

                <InputField
                  label="Purchase Price"
                  name="purchase_price"
                  type="number"
                  placeholder="0.00"
                  value={formData.purchase_price}
                  onChange={handleChange}
                  error={errors.purchase_price}
                  disabled={isSubmitting}
                  prefix={<DollarSign size={18} />}
                />
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-all shadow-sm shadow-blue-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save SMD
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSmdForm;