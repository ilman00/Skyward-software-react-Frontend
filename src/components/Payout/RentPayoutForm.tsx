import React, { useState, type FormEvent } from "react";
import AsyncSelect from "react-select/async";
import { AlertCircle } from "lucide-react";

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
  smd_closing_id: string;
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
    smd_closing_id: "",
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
        smd_closing_id: "",
        payout_month: "",
        amount: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-6 border-b pb-3">
        Rent Payout
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Customer */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer
          </label>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadCustomers}
            placeholder="Search customer..."
            onChange={(opt) => {
              const customerId = opt?.value || "";
              setForm(prev => ({
                ...prev,
                customer_id: customerId,
                smd_closing_id: "",
              }));

              if (customerId) {
                getSmdByCustomer(customerId);
              }
            }}
          />
        </div>

        {/* SMD */}
        <div>
          <label className="block text-sm font-medium mb-1">
            SMD
          </label>
          <select
            value={form.smd_closing_id}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                smd_closing_id: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded-md"
            disabled={!form.customer_id || isLoadingSmds}
            required
          >
            <option value="">
              {isLoadingSmds
                ? "Loading SMDs..."
                : "Select SMD"}
            </option>

            {smds.map(s => (
              <option key={s.smd_id} value={s.smd_id}>
                {s.smd_code}
              </option>
            ))}
          </select>

          {!isLoadingSmds &&
            form.customer_id &&
            smds.length === 0 && (
              <p className="text-xs text-amber-600 mt-1 flex gap-1">
                <AlertCircle size={12} />
                No SMDs found for this customer
              </p>
            )}
        </div>

        {/* Month & Amount */}
        <div className="grid grid-cols-2 gap-4">
          {/* Month Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payout Month
            </label>
            <input
              type="month"
              name="payout_month"
              value={form.payout_month}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  payout_month: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              placeholder="PKR"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>


        <button
          disabled={!form.smd_closing_id || isSubmitting}
          className="bg-blue-800 text-white px-6 py-2 rounded-md"
        >
          {isSubmitting ? "Saving..." : "Save Payout"}
        </button>
      </form>
    </div>
  );
};

export default RentPayoutForm;
