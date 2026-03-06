import React, { useState, type FormEvent } from "react";
import AsyncSelect from "react-select/async";
import { AlertCircle, Loader2 } from "lucide-react";

interface SMD {
  smd_id: string;
  smd_code: string;
}

export interface BalancePaymentFormData {
  customer_id: string;
  smd_id: string;
  amount: string;
  payment_method?: string;
  reference_no?: string;
  notes?: string;
}

interface CustomerOption {
  label: string;
  value: string;
}

interface Props {
  onSubmit: (data: BalancePaymentFormData) => Promise<void>;
  loadCustomers: (input: string) => Promise<CustomerOption[]>;
  getSmdByCustomer: (customerId: string) => Promise<void>;
  getRemainingBalance: (customerId: string, smdId: string) => Promise<void>;
  smds: SMD[];
  remainingBalance: number;
  isLoadingSmds: boolean;
  isLoadingBalance: boolean;
}

const BalancePaymentForm: React.FC<Props> = ({
  onSubmit,
  loadCustomers,
  getSmdByCustomer,
  getRemainingBalance,
  smds,
  remainingBalance,
  isLoadingSmds,
  isLoadingBalance,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const [form, setForm] = useState<BalancePaymentFormData>({
    customer_id: "",
    smd_id: "",
    amount: "",
    payment_method: "",
    reference_no: "",
    notes: "",
  });

  const amountNum = Number(form.amount);

  const amountExceedsBalance =
    form.amount !== "" && remainingBalance > 0 && amountNum > remainingBalance;

  const amountIsInvalid = form.amount !== "" && amountNum <= 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (amountExceedsBalance || amountIsInvalid) return;

    setIsSubmitting(true);

    try {
      await onSubmit(form);

      setForm({
        customer_id: "",
        smd_id: "",
        amount: "",
        payment_method: "",
        reference_no: "",
        notes: "",
      });

      setSelectedCustomerId("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-6 border-b pb-3">Balance Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Customer */}
        <div>
          <label className="block text-sm font-medium mb-1">Customer</label>

          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadCustomers}
            placeholder="Search customer..."
            isClearable
            onChange={(opt) => {
              const customerId = opt?.value || "";

              setSelectedCustomerId(customerId);

              setForm({
                customer_id: customerId,
                smd_id: "",
                amount: "",
                payment_method: "",
                reference_no: "",
                notes: "",
              });

              if (customerId) {
                getSmdByCustomer(customerId);
              }
            }}
          />
        </div>

        {/* SMD */}
        <div>
          <label className="block text-sm font-medium mb-1">SMD</label>

          <select
            value={form.smd_id}
            onChange={(e) => {
              const smdId = e.target.value;

              setForm((prev) => ({
                ...prev,
                smd_id: smdId,
                amount: "",
              }));

              if (smdId && selectedCustomerId) {
                getRemainingBalance(selectedCustomerId, smdId);
              }
            }}
            className="w-full border px-3 py-2 rounded-md"
            disabled={!selectedCustomerId || isLoadingSmds}
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

          {!isLoadingSmds && selectedCustomerId && smds.length === 0 && (
            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              No SMDs found for this customer
            </p>
          )}
        </div>

        {/* Remaining Balance */}
        {form.smd_id && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Remaining Balance
            </label>

            <div className="relative">
              <input
                type="text"
                readOnly
                value={
                  isLoadingBalance
                    ? "Fetching..."
                    : `PKR ${remainingBalance.toLocaleString()}`
                }
                className="w-full border px-3 py-2 rounded-md bg-gray-50"
              />

              {isLoadingBalance && (
                <Loader2
                  size={14}
                  className="absolute right-3 top-3 animate-spin text-gray-400"
                />
              )}
            </div>
          </div>
        )}

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
            className={`w-full border px-3 py-2 rounded-md ${
              amountExceedsBalance || amountIsInvalid
                ? "border-red-400 bg-red-50"
                : "border-gray-300"
            }`}
            placeholder="Enter payment amount"
            disabled={!form.smd_id || isLoadingBalance}
            required
          />

          {amountExceedsBalance && (
            <p className="text-xs text-red-500 mt-1">
              Amount cannot exceed remaining balance
            </p>
          )}

          {amountIsInvalid && (
            <p className="text-xs text-red-500 mt-1">
              Amount must be greater than 0
            </p>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Payment Method
          </label>

          <select
            value={form.payment_method}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                payment_method: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select method (optional)</option>
            <option value="cash">Cash</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="cheque">Cheque</option>
          </select>
        </div>

        {/* Reference */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Reference No
          </label>

          <input
            type="text"
            value={form.reference_no}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                reference_no: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Optional reference"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>

          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Optional notes"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={
            !form.smd_id ||
            !form.amount ||
            isSubmitting ||
            isLoadingBalance ||
            amountExceedsBalance ||
            amountIsInvalid
          }
          className="w-full bg-blue-800 text-white py-2 rounded-md flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? "Saving..." : "Save Payment"}
        </button>
      </form>
    </div>
  );
};

export default BalancePaymentForm;