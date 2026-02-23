import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Loader2, User, Wallet } from "lucide-react";

const marketerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contact_number: z.string().optional(),
  cnic: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  commission_type: z.enum(["percentage", "fixed"]),
  commission_value: z.number().min(1, "Value must be greater than 0"),
});

export type MarketerForm = z.infer<typeof marketerSchema>;

interface Props {
  onFormSubmit: (data: MarketerForm) => Promise<void>;
}

const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-700";

const AddMarketerForm: React.FC<Props> = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MarketerForm>({
    resolver: zodResolver(marketerSchema),
    defaultValues: { 
        commission_type: "percentage",
        commission_value: 0
    },
  });

  const commissionType = watch("commission_type");

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-600 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Marketer</h1>
              <p className="text-sm text-gray-500">Create account and define commission rules.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          {/* Section 1: Personal Information */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User size={20} className="text-blue-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name *" error={errors.full_name?.message}>
                  <input {...register("full_name")} className={inputClass} placeholder="John Doe" />
                </Field>

                <Field label="Email Address *" error={errors.email?.message}>
                  <input {...register("email")} type="email" className={inputClass} placeholder="john@example.com" />
                </Field>

                <Field label="Password *" error={errors.password?.message} className="md:col-span-2">
                  <input {...register("password")} type="password" className={inputClass} placeholder="••••••••" />
                </Field>

                <Field label="Contact Number" error={errors.contact_number?.message}>
                  <input {...register("contact_number")} className={inputClass} placeholder="+92 ..." />
                </Field>

                <Field label="CNIC Number" error={errors.cnic?.message}>
                  <input {...register("cnic")} className={inputClass} placeholder="00000-0000000-0" />
                </Field>

                <Field label="City" error={errors.city?.message}>
                  <input {...register("city")} className={inputClass} />
                </Field>

                <Field label="Address" error={errors.address?.message}>
                  <input {...register("address")} className={inputClass} />
                </Field>
              </div>
            </div>
          </section>

          {/* Section 2: Commission Rules */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Wallet size={20} className="text-emerald-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Commission Rules</h2>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Commission Type *" error={errors.commission_type?.message}>
                  <select {...register("commission_type")} className={inputClass}>
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </Field>

                <Field
                  label={commissionType === "percentage" ? "Commission Percentage *" : "Commission Amount *"}
                  error={errors.commission_value?.message}
                >
                  <input 
                    {...register("commission_value", { valueAsNumber: true })} 
                    type="number" 
                    className={inputClass} 
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pb-12">
            <Link 
                to="/dashboard" 
                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
                Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-all shadow-sm shadow-blue-200"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={18} /> Processing...</>
              ) : (
                <><Save size={18} /> Save Marketer</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; error?: string; className?: string; children: React.ReactNode }> = 
({ label, error, className, children }) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
    {children}
    {error && (
        <p className="text-red-600 text-xs flex items-center gap-1.5 mt-1 ml-1 font-medium">
            <AlertCircle size={14} /> {error}
        </p>
    )}
  </div>
);

export default AddMarketerForm;