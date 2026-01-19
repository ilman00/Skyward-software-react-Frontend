import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddSmdForm from "../components/AddSmdForm";
import { SmdAPIs,type CreateSmdPayload } from "../services/SmdAPIs";

const AddSmdPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSmd = async (payload: CreateSmdPayload) => {
    setIsSubmitting(true);

    try {
      await toast.promise(
        SmdAPIs.addSmd(payload),
        {
          loading: 'Saving SMD record...',
          success: 'SMD created successfully!',
          error: (err) => err?.response?.data?.message || 'Failed to create SMD.',
        }
      );

      // Redirect after success
      setTimeout(() => navigate("/admin-dashboard"), 1500);
    } catch (err) {
      console.error("Submission Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AddSmdForm 
        onSubmit={handleCreateSmd} 
        isSubmitting={isSubmitting} 
      />
    </>
  );
};

export default AddSmdPage;