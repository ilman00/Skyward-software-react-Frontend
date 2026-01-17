import React, { useState } from "react";
import { X, Save, Info, CreditCard, User } from "lucide-react";
import type { SmdDetails } from "../../types/smd.types";

/* TEMP MOCK DATA */
const MOCK_DETAILS: SmdDetails = {
  smd_id: "",
  smd_code: "SMD-1",
  title: "Main Road Board",
  owner_name: "ABC Holdings",
  sold_by: "Ali Khan",
  sell_price: 650000,
  purchase_price: 500000,
  monthly_rent: 45000,
  marketer_name: "John Doe",
  installed_at: "2025-01-10",
};

interface Props {
  smdId: string;
  onClose: () => void;
}

const SmdDetailsModal: React.FC<Props> = ({ smdId, onClose }) => {
  const [formData, setFormData] = useState<SmdDetails>({
    ...MOCK_DETAILS,
    smd_id: smdId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    alert("Update API later");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Edit Device Details</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">ID: {smdId.slice(0,8)}...</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            
            {/* Section 1: General Info */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <Info size={18} />
                <h3 className="font-semibold text-slate-800">General Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="SMD Code" name="smd_code" value={formData.smd_code} onChange={handleChange} />
                <Input label="Installation Date" name="installed_at" type="date" value={formData.installed_at} onChange={handleChange} />
                <div className="md:col-span-2">
                  <Input label="Location Title" name="title" value={formData.title || ""} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Section 2: Financials */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-emerald-600">
                <CreditCard size={18} />
                <h3 className="font-semibold text-slate-800">Financial Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="Purchase Price" name="purchase_price" value={formData.purchase_price} onChange={handleChange} prefix="PKR" />
                <Input label="Sell Price" name="sell_price" value={formData.sell_price} onChange={handleChange} prefix="PKR" />
                <Input label="Monthly Rent" name="monthly_rent" value={formData.monthly_rent} onChange={handleChange} prefix="PKR" />
              </div>
            </section>

            {/* Section 3: Personnel (Read-only) */}
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 mb-4 text-slate-500">
                <User size={18} />
                <h3 className="font-semibold text-slate-700">Assignment Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ReadOnly label="Owner" value={formData.owner_name} />
                <ReadOnly label="Sold By" value={formData.sold_by} />
                <ReadOnly label="Marketer" value={formData.marketer_name} />
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/30">
          <button 
            onClick={onClose} 
            className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-md shadow-blue-200 transition-all active:scale-95"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmdDetailsModal;

/* -------------------- Sub-components -------------------- */

const Input = ({ label, prefix, ...props }: any) => (
  <div className="group">
    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1 transition-colors group-focus-within:text-blue-600">
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
          {prefix}
        </span>
      )}
      <input 
        {...props} 
        className={`w-full border border-slate-200 rounded-lg ${prefix ? 'pl-11' : 'px-3'} py-2.5 text-sm text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300`}
      />
    </div>
  </div>
);

const ReadOnly = ({ label, value }: any) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">{label}</label>
    <div className="w-full bg-white/50 border border-slate-200/60 rounded-lg px-3 py-2 text-sm text-slate-500 font-medium italic">
      {value || "Not Assigned"}
    </div>
  </div>
);