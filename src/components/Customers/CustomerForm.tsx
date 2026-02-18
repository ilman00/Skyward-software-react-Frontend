import React, { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { MarketerAPIs } from "../../services/MarketerAPIs";
import { User, CreditCard, Users, Briefcase} from "lucide-react";


// We export this so the Parent Page can use it for Type Safety
export interface HeirData {
  full_name: string;
  cnic: string;
  phone_number: string;
}

export interface CustomerFormData {
  full_name: string;
  email: string;
  password: string;
  contact_number?: string;
  cnic?: string;
  address?: string;
  city?: string;

  // ✅ Bank
  bank_name?: string;
  account_name?: string;
  account_number?: string;

  // ✅ Heir
  heir?: HeirData;

  // ✅ Marketer
  marketer_id?: string;
}


interface CustomerFormProps {
  // onSubmit returns a promise so the child can await it to stop the spinner
  onSubmit: (data: CustomerFormData) => Promise<void>;
  initialData?: Partial<CustomerFormData>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [marketers, setMarketers] = useState<any[]>([]);

  const [form, setForm] = useState<CustomerFormData>({
    full_name: initialData?.full_name || "",
    email: initialData?.email || "",
    password: "",
    contact_number: initialData?.contact_number || "",
    cnic: initialData?.cnic || "",
    address: initialData?.address || "",
    city: initialData?.city || "",

    bank_name: "",
    account_name: "",
    account_number: "",

    heir: {
      full_name: "",
      cnic: "",
      phone_number: "",
    },

    marketer_id: "",
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This waits for the Parent's API call to finish
      await onSubmit(form);
    } catch (error) {
      // Parent handles the toast, child just catches error to stop spinner
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHeirChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      heir: {
        ...prev.heir!,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    const fetchMarketers = async () => {
      try {
        const res = await MarketerAPIs.getMarketers();
        console.log("Marketers:" ,res.data);
        setMarketers(res.data);
      } catch (err) {
        console.error("Failed to fetch marketers");
      }
    };

    fetchMarketers();
  }, []);


  // const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="group p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all shadow-sm"
          >
            <ArrowLeft size={20} className="text-gray-500 group-hover:text-blue-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add New Customer</h1>
            <p className="text-gray-500">Register a new client profile and financial details.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* 1. PERSONAL DETAILS */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User size={20} className="text-blue-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Full Name *</label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className={`${inputClass} focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`${inputClass} focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`${inputClass} focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Contact Number</label>
                <input name="contact_number" value={form.contact_number} onChange={handleChange} className={inputClass} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">CNIC Number</label>
                <input name="cnic" value={form.cnic} onChange={handleChange} className={inputClass} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">City</label>
                <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Address</label>
                <input name="address" value={form.address} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. BANK DETAILS */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CreditCard size={20} className="text-emerald-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Bank Details</h2>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Bank Name</label>
              <input name="bank_name" value={form.bank_name} onChange={handleChange} className={inputClass} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Account Name</label>
              <input name="account_name" value={form.account_name} onChange={handleChange} className={inputClass} />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Account Number / IBAN</label>
              <input name="account_number" value={form.account_number} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </section>

        {/* 3. HEIR DETAILS */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Users size={20} className="text-amber-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Heir (Nominee) Details</h2>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Heir Full Name</label>
              <input name="full_name" value={form.heir?.full_name} onChange={handleHeirChange} className={inputClass} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Heir CNIC</label>
              <input name="cnic" value={form.heir?.cnic} onChange={handleHeirChange} className={inputClass} />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Heir Phone Number</label>
              <input name="phone_number" value={form.heir?.phone_number} onChange={handleHeirChange} className={inputClass} />
            </div>
          </div>
        </section>

        {/* 4. REFERENCE / MARKETER */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase size={20} className="text-purple-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Reference (Marketer)</h2>
          </div>

          <div className="p-8">
            <label className="text-sm font-semibold text-gray-700 ml-1 block mb-2">Assigned Marketer</label>
            <select
              name="marketer_id"
              value={form.marketer_id}
              onChange={(e) => setForm((prev) => ({ ...prev, marketer_id: e.target.value }))}
              className={`${inputClass} bg-white cursor-pointer`}
            >
              <option value="">Select Marketer</option>
              {marketers.map((m) => (
                <option key={m.marketer_id} value={m.marketer_id}>{m.full_name} - {m.email}</option>
              ))}
            </select>
          </div>
        </section>

        {/* FORM ACTIONS */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2.5 rounded-xl border border-gray-300 font-medium text-gray-600 hover:bg-gray-50 transition-all"
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-10 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Customer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;