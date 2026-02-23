import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { User, Loader2, Monitor, Plus, Trash2, Briefcase, DollarSign, Percent } from "lucide-react";
import { dealService } from "../../services/SmdAPIs";

/* TYPES */
export interface SelectOption {
  value: string;
  label: string;
}

interface CloseDealFormProps {
  onCloseDeal: (payload: any) => Promise<void>;
}

/* STYLING CONSTANTS */
const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium placeholder:text-gray-400";

const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    padding: "2px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 131, 246, 0.2)" : "none",
    "&:hover": { borderColor: "#3b82f6" },
  }),
};

const CloseDealForm: React.FC<CloseDealFormProps> = ({ onCloseDeal }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: "",
    smds: [{ smd_id: "", sell_price: "", monthly_rent: "", share_percentage: "" }],
  });

  /* HELPERS */
  const addSmdRow = () => {
    setFormData((prev) => ({
      ...prev,
      smds: [...prev.smds, { smd_id: "", sell_price: "", monthly_rent: "", share_percentage: "" }],
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
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Close New Deal</h1>
          <p className="text-sm text-gray-500">Assign media displays to a customer and finalize rates.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION: CUSTOMER SELECTION */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User size={20} className="text-blue-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Customer Selection</h2>
            </div>

            <div className="p-8">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Select Customer *</label>
                <AsyncSelect<SelectOption>
                  cacheOptions
                  defaultOptions
                  styles={customSelectStyles}
                  loadOptions={(inputValue) => dealService.searchCustomers(inputValue)}
                  placeholder="Search by name or company..."
                  onChange={(opt) => setFormData({ ...formData, customer_id: opt?.value ?? "" })}
                />
              </div>
            </div>
          </section>

          {/* SECTION: SMD ASSETS */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Monitor size={20} className="text-emerald-700" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Media Displays (SMDs)</h2>
              </div>
              <button
                type="button"
                onClick={addSmdRow}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <Plus size={18} /> Add Asset
              </button>
            </div>

            <div className="p-8 space-y-8">
              {formData.smds.map((smd, index) => (
                <div key={index} className="relative p-6 rounded-2xl border border-gray-100 bg-gray-50/30 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-wider shadow-sm">
                      Item #{index + 1}
                    </span>
                    {formData.smds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSmdRow(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Select SMD *</label>
                      <AsyncSelect<SelectOption>
                        cacheOptions
                        defaultOptions
                        styles={customSelectStyles}
                        loadOptions={dealService.searchSmds}
                        placeholder="Search SMD code or location..."
                        onChange={(opt) => updateSmdField(index, "smd_id", opt?.value ?? "")}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Sell Price (PKR)</label>
                      <div className="relative">
                        <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          placeholder="0.00"
                          value={smd.sell_price}
                          onChange={(e) => updateSmdField(index, "sell_price", e.target.value)}
                          className={`${inputClass} pl-10`}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Monthly Rent</label>
                      <div className="relative">
                        <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          placeholder="0.00"
                          value={smd.monthly_rent}
                          onChange={(e) => updateSmdField(index, "monthly_rent", e.target.value)}
                          className={`${inputClass} pl-10`}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Share Percentage (%)</label>
                      <div className="relative">
                        <Percent size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          placeholder="e.g. 10"
                          value={smd.share_percentage}
                          onChange={(e) => updateSmdField(index, "share_percentage", e.target.value)}
                          className={`${inputClass} pl-10`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end pt-4">
            <button
              disabled={
                submitting ||
                !formData.customer_id ||
                formData.smds.some((s) => !s.smd_id || !s.sell_price || !s.monthly_rent || !s.share_percentage)
              }
              type="submit"
              className="flex items-center gap-2 px-10 py-3.5 text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-200 disabled:text-gray-400 font-bold rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              {submitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Finalize & Close Deal"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CloseDealForm;