import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, CheckCircle2 } from "lucide-react";

// ------------------ ZOD SCHEMA ------------------
const marketerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  commission_type: z.enum(["percentage", "fixed"])
  .refine(val => val === "percentage" || val === "fixed", {
    message: "Invalid commission type",
  }),
  commission_value: z
    .number()
    .min(1, "Commission value must be greater than 0"),
});

export type MarketerForm = z.infer<typeof marketerSchema>;

const AddMarketerForm: React.FC = () => {
  const [success, setSuccess] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MarketerForm>({
    resolver: zodResolver(marketerSchema),
    defaultValues: {
      commission_type: "percentage",
    },
  });

  const commissionType = watch("commission_type");

  // ------------------ SUBMIT ------------------
  const onSubmit = async (data: MarketerForm) => {
    setSuccess(null);

    try {
      await new Promise((r) => setTimeout(r, 1200));
      console.log("Submitted:", data);

      setSuccess("Marketer added successfully!");
      reset();
    } catch {
      console.error("Failed to submit");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/dashboard"
            className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Marketer
            </h1>
            <p className="text-gray-500">
              Create a marketer account and define commission rules.
            </p>
          </div>
        </div>

        {/* Success */}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3 text-green-800">
            <CheckCircle2 /> {success}
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b px-6 py-4 bg-gray-50/50">
            <h3 className="text-lg font-medium text-gray-900">
              Marketer Information
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Full Name *" error={errors.full_name?.message}>
                <input
                  {...register("full_name")}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </Field>

              <Field label="Email *" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </Field>

              <Field
                label="Password *"
                error={errors.password?.message}
                className="md:col-span-2"
              >
                <input
                  {...register("password")}
                  type="password"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </Field>
            </div>

            <hr />

            {/* Commission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                label="Commission Type *"
                error={errors.commission_type?.message}
              >
                <select
                  {...register("commission_type")}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </Field>

              <Field
                label={
                  commissionType === "percentage"
                    ? "Commission Percentage *"
                    : "Commission Amount *"
                }
                error={errors.commission_value?.message}
              >
                <input
                  {...register("commission_value", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </Field>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 border-t pt-4">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm bg-white border rounded-md"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 text-white bg-blue-800 rounded-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <Save size={18} /> Save Marketer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMarketerForm;

// ------------------ REUSABLE FIELD ------------------
const Field: React.FC<{
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ label, error, className, children }) => (
  <div className={className}>
    <label className="text-sm font-medium">{label}</label>
    {children}
    {error && (
      <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
        <AlertCircle size={14} /> {error}
      </p>
    )}
  </div>
);
