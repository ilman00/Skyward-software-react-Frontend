import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Loader2 } from "lucide-react";

const marketerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  commission_type: z.enum(["percentage", "fixed"]),
  commission_value: z.number().min(1, "Value must be greater than 0"),
});

export type MarketerForm = z.infer<typeof marketerSchema>;

interface Props {
  onFormSubmit: (data: MarketerForm) => Promise<void>;
}

const AddMarketerForm: React.FC<Props> = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MarketerForm>({
    resolver: zodResolver(marketerSchema),
    defaultValues: { commission_type: "percentage" },
  });

  const commissionType = watch("commission_type");

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-gray-200 text-gray-600">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Marketer</h1>
            <p className="text-gray-500">Create account and define commission rules.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Full Name *" error={errors.full_name?.message}>
                <input {...register("full_name")} className="w-full mt-1 px-3 py-2 border rounded-md" />
              </Field>

              <Field label="Email *" error={errors.email?.message}>
                <input {...register("email")} type="email" className="w-full mt-1 px-3 py-2 border rounded-md" />
              </Field>

              <Field label="Password *" error={errors.password?.message} className="md:col-span-2">
                <input {...register("password")} type="password" className="w-full mt-1 px-3 py-2 border rounded-md" />
              </Field>
            </div>

            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Commission Type *" error={errors.commission_type?.message}>
                <select {...register("commission_type")} className="w-full mt-1 px-3 py-2 border rounded-md">
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
                  className="w-full mt-1 px-3 py-2 border rounded-md" 
                />
              </Field>
            </div>

            <div className="flex justify-end gap-4 border-t pt-4">
              <Link to="/dashboard" className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 text-white bg-blue-800 rounded-md disabled:opacity-50"
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
    </div>
  );
};

// Reusable Field stays the same
const Field: React.FC<{ label: string; error?: string; className?: string; children: React.ReactNode }> = 
({ label, error, className, children }) => (
  <div className={className}>
    <label className="text-sm font-medium">{label}</label>
    {children}
    {error && <p className="text-red-600 text-sm flex items-center gap-1 mt-1"><AlertCircle size={14} /> {error}</p>}
  </div>
);

export default AddMarketerForm;