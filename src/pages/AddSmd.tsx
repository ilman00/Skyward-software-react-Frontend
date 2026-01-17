import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSmdForm from "../components/AddSmdForm";

/* -------------------- Types -------------------- */
interface CreateSmdPayload {
  smd_code: string;
  title?: string;
  purchase_price: number;
}

/* -------------------- Component -------------------- */
const AddSmdPage: React.FC = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  /* -------------------- API Call -------------------- */
  const createSmd = async (payload: CreateSmdPayload) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch("/api/smds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if using cookies/session
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create SMD");
      }

      // Success → redirect or update global state
      navigate("/dashboard");
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------------------- JSX -------------------- */
  return (
    <>
      {apiError && (
        <div className="max-w-4xl mx-auto mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {apiError}
        </div>
      )}

      <AddSmdForm
        onSubmit={createSmd}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default AddSmdPage;
