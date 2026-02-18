import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { DollarSign, Monitor, User, Briefcase, Calendar, Loader2 } from "lucide-react";
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
    smd_id: "",
    marketer_id: "",
    sell_price: "",
    monthly_rent: "",
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onCloseDeal({
        ...formData,
        sell_price: Number(formData.sell_price),
        monthly_rent: Number(formData.monthly_rent),
        marketer_uuid: formData.marketer_id || null,
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
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> Customer
            </label>
            <AsyncSelect<SelectOption>
              cacheOptions
              defaultOptions // 👈 This tells React-Select to load the list immediately
              loadOptions={(inputValue) => dealService.searchCustomers(inputValue)}
              placeholder="Select or search customer..."
              onChange={(opt) =>
                setFormData({ ...formData, customer_id: opt?.value ?? "" })
              }
              classNamePrefix="react-select"
            />
          </div>

          {/* SMD CODE */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Monitor size={14} /> SMD Code
            </label>
            <AsyncSelect<SelectOption>
              cacheOptions
              defaultOptions // 👈 Loads SMD list on mount
              loadOptions={(inputValue) => dealService.searchSmds(inputValue)}
              placeholder="Select or search SMD..."
              onChange={(opt) =>
                setFormData({ ...formData, smd_id: opt?.value ?? "" })
              }
              classNamePrefix="react-select"
            />
          </div>

          {/* MARKETER */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={14} /> Marketer (Optional)
            </label>
            <AsyncSelect<SelectOption>
              isClearable
              cacheOptions
              defaultOptions
              loadOptions={dealService.searchMarketers}
              placeholder="Search marketer..."
              onChange={(opt) =>
                setFormData({ ...formData, marketer_id: opt?.value ?? "" })
              }
              classNamePrefix="react-select"
            />
          </div>

          <div className="hidden md:block" />

          {/* SELL PRICE */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <DollarSign size={14} /> Sell Price (PKR)
            </label>
            <input
              required
              type="number"
              value={formData.sell_price}
              onChange={(e) =>
                setFormData({ ...formData, sell_price: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none
                         focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold"
            />
          </div>

          {/* MONTHLY RENT */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Calendar size={14} /> Monthly Rent (PKR)
            </label>
            <input
              required
              type="number"
              value={formData.monthly_rent}
              onChange={(e) =>
                setFormData({ ...formData, monthly_rent: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none
                         focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-blue-600"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <div className="pt-8 border-t border-slate-100 flex justify-end">
          <button
            disabled={submitting || !formData.customer_id || !formData.smd_id}
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
