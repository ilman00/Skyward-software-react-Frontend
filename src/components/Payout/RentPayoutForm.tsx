import React, { useState, type FormEvent } from "react";
import AsyncSelect from "react-select/async";
import {
  DollarSign,
  Calendar,
  Save,
  Loader2,
  AlertCircle,
  Wallet,
} from "lucide-react";

/* ------------------ TYPES ------------------ */

interface SMD {
  smd_id: string;
  smd_code: string;
}

interface CustomerOption {
  label: string;
  value: string;
}

export interface RentPayoutFormData {
  customer_id: string;
  smd_id: string;
  payout_month: string;
  amount: string;
}

interface Props {
  onSubmit: (data: RentPayoutFormData) => Promise<void>;
  loadCustomers: (input: string) => Promise<CustomerOption[]>;
  getSmdByCustomer: (customerId: string) => Promise<void>;
  smds: SMD[];
  isLoadingSmds: boolean;
}

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400";

const RentPayoutForm: React.FC<Props> = ({
  onSubmit,
  loadCustomers,
  getSmdByCustomer,
  smds,
  isLoadingSmds,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<RentPayoutFormData>({
    customer_id: "",
    smd_id: "",
    payout_month: "",
    amount: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(form);

      setForm({
        customer_id: "",
        smd_id: "",
        payout_month: "",
        amount: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Rent Payout
          </h1>
          <p className="text-sm text-gray-500">
            Record rent payout for a customer SMD
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Card */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Section Header */}
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet size={20} className="text-blue-700" />
              </div>

              <h2 className="text-lg font-bold text-gray-800">
                Payout Details
              </h2>
            </div>

            {/* Form Fields */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Customer */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Customer *
                </label>

                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={loadCustomers}
                  placeholder="Search customer..."
                  onChange={(opt) => {
                    const customerId = opt?.value || "";

                    setForm((prev) => ({
                      ...prev,
                      customer_id: customerId,
                      smd_id: "",
                    }));

                    if (customerId) {
                      getSmdByCustomer(customerId);
                    }
                  }}
                  menuPortalTarget={document.body}
                />
              </div>

              {/* SMD */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  SMD *
                </label>

                <select
                  value={form.smd_id}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      smd_id: e.target.value,
                    }))
                  }
                  className={inputClass}
                  disabled={!form.customer_id || isLoadingSmds}
                  required
                >
                  <option value="">
                    {isLoadingSmds ? "Loading SMDs..." : "Select SMD"}
                  </option>

                  {smds.map((s) => (
                    <option key={s.smd_id} value={s.smd_id}>
                      {s.smd_code}
                    </option>
                  ))}
                </select>

                {!isLoadingSmds &&
                  form.customer_id &&
                  smds.length === 0 && (
                    <p className="text-xs text-amber-600 flex gap-1 items-center">
                      <AlertCircle size={12} />
                      No SMDs found for this customer
                    </p>
                  )}
              </div>

              {/* Payout Month */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Payout Month *
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                    <Calendar size={18} />
                  </span>

                  <input
                    type="month"
                    value={form.payout_month}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        payout_month: e.target.value,
                      }))
                    }
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Amount *
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                    <DollarSign size={18} />
                  </span>

                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              disabled={!form.smd_id || isSubmitting}
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
                  Save Payout
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentPayoutForm;