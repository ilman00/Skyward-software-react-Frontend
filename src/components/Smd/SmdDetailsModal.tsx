import React, { useState, useEffect } from "react";
import { X, Save, Info, CreditCard, User, Loader2 } from "lucide-react";
import { SmdAPIs as smdService } from "../../services/SmdAPIs";
import { toast } from "react-hot-toast";

interface Props {
  smdId: string;
  onClose: () => void;
}

const SmdDetailsModal: React.FC<Props> = ({ smdId, onClose }) => {
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        console.log(smdId)
        const response = await smdService.getBySmdId(smdId);
        // Data mapping from your specific API response
        const apiData = response.data;
        console.log("Fetched SMD Data:", apiData);
        setFormData({
          smd_id: apiData.smd_id,
          smd_code: apiData.smd_code || "",
          address: apiData.address || "", // Mapping 'address' to 'title'
          purchase_price: apiData.purchase_price || "",
          sell_price: apiData.sell_price || "",
          monthly_rent: apiData.monthly_payout || "", // Mapping 'payout' to 'rent'
          installed_at: apiData.installed_at || "", // Formatting "2025-01-10T..." to "2025-01-10"
          owner_name: apiData.owner_name || "",
          sold_by: apiData.added_by_name || "", // Mapping 'added_by_name' to 'sold_by'
          marketer_name: apiData.marketer_name || "",
        });
      } catch (err) {
        setError("Could not load device details.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [smdId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p: any) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    // 1. Initialize a toast ID for a loading state (optional but recommended)
    const toastId = toast.loading("Updating device...");

    try {
      setIsSaving(true);

      const payload = {
        smd_code: formData.smd_code,
        address: formData.address,
        installed_at: formData.installed_at || null,
        purchase_price: Number(formData.purchase_price),
        sell_price: Number(formData.sell_price),
        monthly_payout: Number(formData.monthly_rent),
      };

      await smdService.update(smdId, payload);
      
      // 2. Success Toast
      toast.success("Device updated successfully!", { id: toastId });
      
      onClose();
    } catch (err) {
      console.error(err);
      
      // 3. Error Toast
      toast.error("Failed to save changes. Please try again.", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Edit Device Details</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">
              Ref: {formData?.smd_code || "Loading..."}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-blue-500" size={32} />
              <p className="text-slate-500">Fetching data...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-red-500">{error}</div>
          ) : (
            <div className="space-y-8">

              {/* General Info */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-blue-600">
                  <Info size={18} />
                  <h3 className="font-semibold text-slate-800">General Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="SMD Code" name="smd_code" value={formData.smd_code} onChange={handleChange} />
                  <Input label="Installation Date" name="installed_at" type="date" value={formData.installed_at} onChange={handleChange} />
                  <div className="md:col-span-2">
                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </section>

              {/* Financials */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-emerald-600">
                  <CreditCard size={18} />
                  <h3 className="font-semibold text-slate-800">Financial Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input label="Purchase Price" name="purchase_price" type="number" value={formData.purchase_price} onChange={handleChange} prefix="PKR" />
                  <Input label="Sell Price" name="sell_price" type="number" value={formData.sell_price} onChange={handleChange} prefix="PKR" />
                  <Input label="Monthly Payout" name="monthly_rent" type="number" value={formData.monthly_rent} onChange={handleChange} prefix="PKR" />
                </div>
              </section>

              {/* Read Only Assignments */}
              <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-4 text-slate-500">
                  <User size={18} />
                  <h3 className="font-semibold text-slate-700">Assignment Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ReadOnly label="Owner" value={formData.owner_name} />
                  <ReadOnly label="Added By" value={formData.sold_by} />
                  <ReadOnly label="Marketer" value={formData.marketer_name} />
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/30">
          <button onClick={onClose} disabled={isSaving} className="px-5 py-2 text-sm font-semibold text-slate-600">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-md disabled:bg-slate-400"
          >
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- Styled Sub-components --- */

const Input = ({ label, prefix, ...props }: any) => (
  <div className="group">
    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1 group-focus-within:text-blue-600">
      {label}
    </label>
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">{prefix}</span>}
      <input
        {...props}
        className={`w-full border border-slate-200 rounded-lg ${prefix ? 'pl-11' : 'px-3'} py-2.5 text-sm text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all`}
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

export default SmdDetailsModal;