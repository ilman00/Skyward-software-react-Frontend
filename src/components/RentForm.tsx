import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

/* =======================
   Types
======================= */

interface RentFormData {
  smd_code: string;
  title?: string;
  purchase_price: string;
}

type RentFormKeys = keyof RentFormData;

/* =======================
   Component
======================= */

const RentForm: React.FC = () => {
  const [formData, setFormData] = useState<RentFormData>({
    smd_code: "",
    title: "",
    purchase_price: "",
  });

  const [errors, setErrors] = useState<Partial<Record<RentFormKeys, string>>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /* =======================
     Handlers
  ======================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name as RentFormKeys]: value,
    }));

    if (errors[name as RentFormKeys]) {
      setErrors((prev) => ({
        ...prev,
        [name as RentFormKeys]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<RentFormKeys, string>> = {};
    let isValid = true;

    if (!formData.smd_code) {
      newErrors.smd_code = "SMD Code is required";
      isValid = false;
    }

    if (!formData.purchase_price) {
      newErrors.purchase_price = "Purchase price is required";
      isValid = false;
    } else if (Number(formData.purchase_price) <= 0) {
      newErrors.purchase_price = "Must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (!validate()) return;

    // Placeholder API call
    await new Promise((r) => setTimeout(r, 1000));

    setSuccessMessage("Record saved successfully");

    setFormData({
      smd_code: "",
      title: "",
      purchase_price: "",
    });
  };

  /* =======================
     Reusable Input
  ======================= */

  const Input = ({
    label,
    name,
    type = "text",
    required = true,
  }: {
    label: string;
    name: RentFormKeys;
    type?: string;
    required?: boolean;
  }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] ?? ""}
        onChange={handleChange}
        className={`w-full rounded-md py-2.5 px-3 border shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
          errors[name] ? "border-red-300" : "border-gray-300"
        }`}
      />
      {errors[name] && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} /> {errors[name]}
        </p>
      )}
    </div>
  );

  /* =======================
     JSX
  ======================= */

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/dashboard"
            className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
          >
            <ArrowLeft size={24} />
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Add SMD Record
            </h1>
            <p className="text-gray-500">
              Enter SMD purchase details.
            </p>
          </div>
        </div>

        {/* Success */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3 text-green-800">
            <CheckCircle2 />
            <p>{successMessage}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-8">

            <Input label="SMD Code" name="smd_code" />
            <Input label="Title" name="title" required={false} />
            <Input
              label="Purchase Price"
              name="purchase_price"
              type="number"
            />

            <div className="pt-4 flex justify-end gap-4 border-t">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 text-sm bg-blue-800 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default RentForm;
