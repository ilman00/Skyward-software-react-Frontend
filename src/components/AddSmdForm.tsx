import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  DollarSign,
  Loader2,
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

/* -------------------- Reusable Field (DEFINED OUTSIDE) -------------------- */
// This must be outside the main component to prevent focus loss on re-render
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
}

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
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <div className="relative">
      {prefix && (
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          {prefix}
        </span>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-md border px-3 py-2.5 text-sm transition-all
          ${prefix ? "pl-10" : ""}
          ${error 
            ? "border-red-400 focus:ring-red-100 ring-1 ring-red-400" 
            : "border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          }
          disabled:bg-gray-50 disabled:text-gray-400`}
      />
    </div>

    {error && (
      <p className="text-sm text-red-600 flex gap-1 items-center mt-1">
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

  /* -------------------- Handlers -------------------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof SmdFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
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
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft />
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Site / Media Display
            </h1>
            <p className="text-gray-500">
              Record a new asset for inventory tracking
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField 
                label="SMD Code" 
                name="smd_code" 
                value={formData.smd_code}
                onChange={handleChange}
                error={errors.smd_code}
                disabled={isSubmitting}
              />
              <InputField
                label="Title (Optional)"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                required={false}
                disabled={isSubmitting}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Purchase Price"
                name="purchase_price"
                type="number"
                value={formData.purchase_price}
                onChange={handleChange}
                error={errors.purchase_price}
                disabled={isSubmitting}
                prefix={<DollarSign size={16} />}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 border-t pt-6">
              <Link
                to="/dashboard"
                className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center min-w-[140px] gap-2 px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
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
    </div>
  );
};

export default AddSmdForm;