import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Save, Loader2 } from "lucide-react";

/* ------------------ TYPES ------------------ */
interface Customer {
  id: string;
  name: string;
}

interface SMD {
  id: string;
  name: string;
  customer_id: string;
}

/* ------------------ MOCK DATA ------------------ */
const CUSTOMERS: Customer[] = [
  { id: "c1", name: "Ali Traders" },
  { id: "c2", name: "Khan Electronics" },
];

const SMDS: SMD[] = [
  { id: "smd1", name: "SMD DHA Phase 1", customer_id: "c1" },
  { id: "smd2", name: "SMD Gulberg", customer_id: "c1" },
  { id: "smd3", name: "SMD Blue Area", customer_id: "c2" },
];

/* ------------------ FORM DATA ------------------ */
export interface RentPayoutFormData {
  customer_id: string;
  smd_closing_id: string;
  payout_month: string;
  amount: string;
}

interface RentPayoutFormProps {
  onSubmit?: (data: RentPayoutFormData) => Promise<void> | void;
}

const RentPayoutForm: React.FC<RentPayoutFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<RentPayoutFormData>({
    customer_id: "",
    smd_closing_id: "",
    payout_month: "",
    amount: "",
  });

  /* ------------------ HANDLERS ------------------ */
  const handleCustomerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const customer_id = e.target.value;
    setForm({
      ...form,
      customer_id,
      smd_closing_id: "", // reset SMD
    });
  };

  const handleSmdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const smdId = e.target.value;
    const smd = SMDS.find((s) => s.id === smdId);

    setForm({
      ...form,
      smd_closing_id: smdId,
      customer_id: smd ? smd.customer_id : "",
    });
  };

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

  /* ------------------ FILTERED DATA ------------------ */
  const filteredSMDs = form.customer_id
    ? SMDS.filter((s) => s.customer_id === form.customer_id)
    : SMDS;

  /* ------------------ UI ------------------ */
  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border mt-8 ">
      <h2 className="text-xl font-bold mb-4">Rent Payout</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Customer */}
        <div>
          <label className={label}>Customer</label>
          <select
            value={form.customer_id}
            onChange={handleCustomerChange}
            className={input}
          >
            <option value="">-- Select Customer --</option>
            {CUSTOMERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* SMD */}
        <div>
          <label className={label}>SMD</label>
          <select
            value={form.smd_closing_id}
            onChange={handleSmdChange}
            className={input}
          >
            <option value="">-- Select SMD --</option>
            {filteredSMDs.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div>
          <label className={label}>Payout Month</label>
          <input
            type="month"
            name="payout_month"
            value={form.payout_month}
            onChange={handleChange}
            className={input}
          />
        </div>

        {/* Amount */}
        <div>
          <label className={label}>Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className={input}
            placeholder="PKR"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-blue-800 text-white rounded-md disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Processing
              </>
            ) : (
              <>
                <Save size={16} /> Save Payout
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentPayoutForm;
