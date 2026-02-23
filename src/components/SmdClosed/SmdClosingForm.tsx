import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { User, Loader2 } from "lucide-react";
import { dealService } from "../../services/SmdAPIs";

/* TYPES */
export interface SelectOption {
  value: string;
  label: string;
}

interface CloseDealFormProps {
  onCloseDeal: (payload: any) => Promise<void>;
}

const CloseDealForm: React.FC<CloseDealFormProps> = ({ onCloseDeal }) => {
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: "",
    smds: [
      {
        smd_id: "",
        sell_price: "",
        monthly_rent: "",
        share_percentage: "",
      },
    ],
  });

  /* HELPERS */

  const addSmdRow = () => {
    setFormData((prev) => ({
      ...prev,
      smds: [
        ...prev.smds,
        { smd_id: "", sell_price: "", monthly_rent: "", share_percentage: "" },
      ],
    }));
  };

  const removeSmdRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      smds: prev.smds.filter((_, i) => i !== index),
    }));
  };

  const updateSmdField = (index: number, field: string, value: any) => {
    const updated = [...formData.smds];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, smds: updated });
  };

  /* SUBMIT */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await onCloseDeal({
        customer_id: formData.customer_id,
        smds: formData.smds.map((s) => ({
          smd_id: s.smd_id,
          sell_price: Number(s.sell_price),
          monthly_rent: Number(s.monthly_rent),
          share_percentage: Number(s.share_percentage),
        })),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 lg:p-12 space-y-8"
      >
        <div className="grid md:grid-cols-2 gap-8">

          {/* CUSTOMER */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> Customer
            </label>

            <AsyncSelect<SelectOption>
              cacheOptions
              defaultOptions
              loadOptions={(inputValue) =>
                dealService.searchCustomers(inputValue)
              }
              placeholder="Select or search customer..."
              onChange={(opt) =>
                setFormData({ ...formData, customer_id: opt?.value ?? "" })
              }
              classNamePrefix="react-select"
            />
          </div>

          {/* MULTIPLE SMD SECTION */}
          <div className="md:col-span-2 space-y-6">

            {formData.smds.map((smd, index) => (
              <div
                key={index}
                className="border rounded-2xl p-6 space-y-4 bg-slate-50"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-700">
                    SMD #{index + 1}
                  </h3>

                  {formData.smds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSmdRow(index)}
                      className="text-red-500 text-sm font-bold"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* SMD SELECT */}
                <AsyncSelect<SelectOption>
                  cacheOptions
                  defaultOptions
                  loadOptions={dealService.searchSmds}
                  placeholder="Select or search SMD..."
                  onChange={(opt) =>
                    updateSmdField(index, "smd_id", opt?.value ?? "")
                  }
                  classNamePrefix="react-select"
                />

                {/* SELL PRICE */}
                <input
                  required
                  type="number"
                  placeholder="Sell Price (PKR)"
                  value={smd.sell_price}
                  onChange={(e) =>
                    updateSmdField(index, "sell_price", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none
                             focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold"
                />

                {/* MONTHLY RENT */}
                <input
                  required
                  type="number"
                  placeholder="Monthly Rent (PKR)"
                  value={smd.monthly_rent}
                  onChange={(e) =>
                    updateSmdField(index, "monthly_rent", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none
                             focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold"
                />

                {/* SHARE PERCENTAGE */}
                <input
                  required
                  type="number"
                  placeholder="Share Percentage (%)"
                  value={smd.share_percentage}
                  onChange={(e) =>
                    updateSmdField(index, "share_percentage", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none
                             focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold"
                />
              </div>
            ))}

            {/* ADD BUTTON */}
            <button
              type="button"
              onClick={addSmdRow}
              className="bg-slate-100 hover:bg-slate-200 px-6 py-2 rounded-xl font-bold"
            >
              + Add Another SMD
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="pt-8 border-t border-slate-100 flex justify-end">
          <button
            disabled={
              submitting ||
              !formData.customer_id ||
              formData.smds.some(
                (s) =>
                  !s.smd_id ||
                  !s.sell_price ||
                  !s.monthly_rent ||
                  !s.share_percentage
              )
            }
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200
                       disabled:text-slate-400 text-white font-bold px-10 py-4 rounded-2xl
                       shadow-xl shadow-blue-200 transition-all active:scale-[0.98]"
          >
            {submitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Close Deal"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CloseDealForm;