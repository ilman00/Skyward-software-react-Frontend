import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { UserPlus, AlertCircle, Loader2 } from "lucide-react";
import { type CheckInPayload } from "../../services/ReceptionAPIs";

interface FormData {
    full_name: string;
    host_name: string;
    checked_in_at: string;
    checked_out_at: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

interface CheckInFormProps {
    onSubmit: (payload: CheckInPayload) => Promise<void>;
    isSubmitting: boolean;
}

const inputClass =
    "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 text-sm";

const getNow = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
};

const CheckInForm: React.FC<CheckInFormProps> = ({ onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState<FormData>({
        full_name: "",
        host_name: "",
        checked_in_at: getNow(),
        checked_out_at: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.full_name.trim()) newErrors.full_name = "Visitor name is required.";
        if (!formData.checked_in_at) newErrors.checked_in_at = "Check-in time is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const payload: CheckInPayload = {
            full_name: formData.full_name.trim(),
            host_name: formData.host_name.trim() || undefined,
            checked_in_at: new Date(formData.checked_in_at).toISOString(),
            checked_out_at: formData.checked_out_at
                ? new Date(formData.checked_out_at).toISOString()
                : undefined,
        };

        await onSubmit(payload);

        // Reset form on success
        setFormData({ full_name: "", host_name: "", checked_in_at: getNow(), checked_out_at: "" });
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" >
            {/* Header */}
            < div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3" >
                <div className="p-2 bg-blue-100 rounded-lg" >
                    <UserPlus size={18} className="text-blue-700" />
                </div>
                < div >
                    <h2 className="text-base font-bold text-slate-800" > Log Visitor </h2>
                    < p className="text-xs text-slate-500" > Record a new walk -in visitor </p>
                </div>
            </div>

            < form onSubmit={handleSubmit} className="p-6" >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" >
                    {/* Full Name */}
                    < div className="space-y-1.5" >
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide" >
                            Visitor Name < span className="text-red-500" >* </span>
                        </label>
                        < input
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="e.g. John Doe"
                            className={`${inputClass} ${errors.full_name ? "border-red-400 ring-1 ring-red-400/20" : ""}`
                            }
                        />
                        {
                            errors.full_name && (
                                <p className="text-xs text-red-600 flex items-center gap-1 font-medium" >
                                    <AlertCircle size={12} /> {errors.full_name}
                                </p>
                            )
                        }
                    </div>

                    {/* Host Name */}
                    <div className="space-y-1.5" >
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide" >
                            Host Name
                        </label>
                        < input
                            name="host_name"
                            value={formData.host_name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="e.g. Mr. Ahmed"
                            className={inputClass}
                        />
                    </div>

                    {/* Check In */}
                    <div className="space-y-1.5" >
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide" >
                            Check In < span className="text-red-500" >* </span>
                        </label>
                        < input
                            type="datetime-local"
                            name="checked_in_at"
                            value={formData.checked_in_at}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`${inputClass} ${errors.checked_in_at ? "border-red-400 ring-1 ring-red-400/20" : ""}`}
                        />
                        {
                            errors.checked_in_at && (
                                <p className="text-xs text-red-600 flex items-center gap-1 font-medium" >
                                    <AlertCircle size={12} /> {errors.checked_in_at}
                                </p>
                            )
                        }
                    </div>

                    {/* Check Out */}
                    <div className="space-y-1.5" >
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide" >
                            Check Out
                        </label>
                        < input
                            type="datetime-local"
                            name="checked_out_at"
                            value={formData.checked_out_at}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={inputClass}
                        />
                    </div>
                </div>

                < div className="mt-5 flex justify-end" >
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-all shadow-sm shadow-blue-200"
                    >
                        {
                            isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={16} />
                                    Check In
                                </>
                            )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckInForm;