import React, { useState, type  ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export interface CustomerFormData {
  full_name: string;
  email: string;
  password: string;
  contact_number?: string;
  cnic?: string;
  address?: string;
  city?: string;
}

interface CustomerFormProps {
  onSubmit?: (data: CustomerFormData) => Promise<void> | void;
  initialData?: Partial<CustomerFormData>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<CustomerFormData>({
    full_name: initialData?.full_name || "",
    email: initialData?.email || "",
    password: "",
    contact_number: initialData?.contact_number || "",
    cnic: initialData?.cnic || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="p-2 rounded hover:bg-gray-100">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Add Customer</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Password *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          <hr />

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Contact Number</label>
              <input
                name="contact_number"
                value={form.contact_number}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>CNIC</label>
              <input
                name="cnic"
                value={form.cnic}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border rounded-md"
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-800 text-white rounded-md disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
