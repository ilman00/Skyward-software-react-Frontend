import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

/* -------------------- Types -------------------- */
interface SmdFormData {
  smd_code: string;
  title: string;
  purchase_price: string;
}

type FormErrors = Partial<Record<keyof SmdFormData, string>>;

interface AddSmdPageProps {
  onSubmit: (data: {
    smd_code: string;
    title?: string;
    purchase_price: number;
  }) => void;
  isSubmitting: boolean;
}


/* -------------------- Component -------------------- */
const AddSmdForm: React.FC<AddSmdPageProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<SmdFormData>({
    smd_code: "",
    title: "",
    purchase_price: "",
  });


  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /* -------------------- Handlers -------------------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof SmdFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    let valid = true;

    if (!formData.smd_code) {
      newErrors.smd_code = "SMD code is required.";
      valid = false;
    }

    if (!formData.purchase_price) {
      newErrors.purchase_price = "Purchase price is required.";
      valid = false;
    } else if (Number(formData.purchase_price) <= 0) {
      newErrors.purchase_price =
        "Purchase price must be greater than 0.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (!validate()) return;

    onSubmit({
      smd_code: formData.smd_code,
      title: formData.title || undefined,
      purchase_price: Number(formData.purchase_price),
    });

    setSuccessMessage(`SMD '${formData.smd_code}' added successfully!`);

    setFormData({
      smd_code: "",
      title: "",
      purchase_price: "",
    });
  };

  /* -------------------- Reusable Fields -------------------- */
  const InputField = ({
    label,
    name,
    type = "text",
    prefix,
    required = true,
  }: {
    label: string;
    name: keyof SmdFormData;
    type?: string;
    prefix?: React.ReactNode;
    required?: boolean;
  }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
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
          value={formData[name]}
          onChange={handleChange}
          className={`w-full rounded-md border px-3 py-2.5 text-sm
            ${prefix ? "pl-10" : ""}
            ${errors[name]
              ? "border-red-400 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-500"
            }`}
        />
      </div>

      {errors[name] && (
        <p className="text-sm text-red-600 flex gap-1 items-center">
          <AlertCircle size={14} /> {errors[name]}
        </p>
      )}
    </div>
  );

  /* -------------------- JSX -------------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-gray-200 rounded-full">
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

        {successMessage && (
          <div className="mb-6 flex gap-3 items-center bg-green-50 border border-green-200 p-4 rounded-lg text-green-700">
            <CheckCircle2 /> {successMessage}
          </div>
        )}

        <div className="bg-white rounded-xl shadow border p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="SMD Code" name="smd_code" />
              <InputField
                label="Title (Optional)"
                name="title"
                required={false}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Purchase Price"
                name="purchase_price"
                type="number"
                prefix={<DollarSign size={16} />}
              />
            </div>

            <div className="flex justify-end gap-4 border-t pt-4">
              <Link
                to="/dashboard"
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-blue-800 text-white rounded-md
             hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={18} />
                {isSubmitting ? "Saving..." : "Save SMD"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSmdForm;
