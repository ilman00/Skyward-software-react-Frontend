import React, { useState, type FormEvent } from "react";
import AsyncSelect from "react-select/async";
import {
  AlertCircle,
  Loader2,
  DollarSign,
  Save,
  CreditCard,
} from "lucide-react";

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
  getRemainingBalance: (
    customerId: string,
    smdId: string
  ) => Promise<void>;
  smds: SMD[];
  remainingBalance: number;
  isLoadingSmds: boolean;
  isLoadingBalance: boolean;
}

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400";

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
    form.amount !== "" &&
    remainingBalance > 0 &&
    amountNum > remainingBalance;

  const amountIsInvalid =
    form.amount !== "" &&
    amountNum <= 0;

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: "46px",
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(59,130,246,0.2)"
        : "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#9ca3af",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.75rem",
      overflow: "hidden",
      zIndex: 9999,
    }),
  };

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

  return (<div className="min-h-screen bg-gray-50/50 p-6 md:p-12"> <div className="max-w-4xl mx-auto">


    {/* Header */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Record Balance Payment
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Record customer payments against outstanding balances
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Payment Details */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CreditCard
              size={20}
              className="text-blue-700"
            />
          </div>

          <h2 className="text-lg font-bold text-gray-800">
            Payment Details
          </h2>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Customer */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Customer *
              </label>

              <AsyncSelect
                cacheOptions
                defaultOptions
                isClearable
                loadOptions={loadCustomers}
                placeholder="Search customer..."
                styles={customSelectStyles}
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
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                SMD *
              </label>

              <select
                value={form.smd_id}
                disabled={
                  !selectedCustomerId ||
                  isLoadingSmds
                }
                onChange={(e) => {
                  const smdId = e.target.value;

                  setForm((prev) => ({
                    ...prev,
                    smd_id: smdId,
                    amount: "",
                  }));

                  if (
                    smdId &&
                    selectedCustomerId
                  ) {
                    getRemainingBalance(
                      selectedCustomerId,
                      smdId
                    );
                  }
                }}
                className={inputClass}
                required
              >
                <option value="">
                  {isLoadingSmds
                    ? "Loading SMDs..."
                    : "Select SMD"}
                </option>

                {smds.map((smd) => {
                  
                  return (
                    <option
                      key={smd.smd_id}
                      value={smd.smd_id}
                    >
                      {smd.smd_code}
                    </option>
                  );
                })}
              </select>

              {!isLoadingSmds &&
                selectedCustomerId &&
                smds.length === 0 && (
                  <p className="text-xs text-amber-600 flex items-center gap-1 font-medium">
                    <AlertCircle size={14} />
                    No SMDs found for this customer
                  </p>
                )}
            </div>

            {/* Remaining Balance */}
            {form.smd_id && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Remaining Balance
                </label>

                <div className="relative">
                  <input
                    readOnly
                    value={
                      isLoadingBalance
                        ? "Fetching..."
                        : `PKR ${remainingBalance.toLocaleString()}`
                    }
                    className={`${inputClass} bg-gray-50 font-semibold text-blue-700`}
                  />

                  {isLoadingBalance && (
                    <Loader2
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gray-400"
                    />
                  )}
                </div>
              </div>
            )}

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
                  value={form.amount}
                  disabled={
                    !form.smd_id ||
                    isLoadingBalance
                  }
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                  className={`${inputClass} pl-11 ${amountExceedsBalance ||
                      amountIsInvalid
                      ? "border-red-500 ring-1 ring-red-500/10"
                      : ""
                    }`}
                  required
                />
              </div>

              {amountExceedsBalance && (
                <p className="text-xs text-red-600 flex gap-1.5 items-center font-medium">
                  <AlertCircle size={14} />
                  Amount cannot exceed remaining
                  balance
                </p>
              )}

              {amountIsInvalid && (
                <p className="text-xs text-red-600 flex gap-1.5 items-center font-medium">
                  <AlertCircle size={14} />
                  Amount must be greater than 0
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Payment Method
              </label>

              <select
                value={form.payment_method}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    payment_method:
                      e.target.value,
                  }))
                }
                className={inputClass}
              >
                <option value="">
                  Select payment method
                </option>
                <option value="cash">
                  Cash
                </option>
                <option value="bank_transfer">
                  Bank Transfer
                </option>
                <option value="cheque">
                  Cheque
                </option>
              </select>
            </div>

            {/* Reference No */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Reference Number
              </label>

              <input
                type="text"
                value={form.reference_no}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    reference_no:
                      e.target.value,
                  }))
                }
                placeholder="Transaction reference"
                className={inputClass}
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Notes
              </label>

              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Additional information..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => {
            setForm({
              customer_id: "",
              smd_id: "",
              amount: "",
              payment_method: "",
              reference_no: "",
              notes: "",
            });

            setSelectedCustomerId("");
          }}
          className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>

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
          className="flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-all shadow-sm shadow-blue-200"
        >
          {isSubmitting ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Payment
            </>
          )}
        </button>
      </div>
    </form>
  </div>
  </div>

  );
};

export default BalancePaymentForm;
