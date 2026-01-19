import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddMarketerForm, { type  MarketerForm } from "../../components/MarketerForm";
import { MarketerAPIs } from "../../services/MarketerAPIs";

const AddMarketerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleApiSubmit = async (data: MarketerForm) => {
    try {
      await toast.promise(
        MarketerAPIs.addMarketer(data),
        {
          loading: 'Creating marketer...',
          success: 'Marketer created successfully!',
          error: (err) => err?.response?.data?.message || 'Failed to create marketer.',
        }
      );

      // Redirect after success
      setTimeout(() => navigate("/admin-dashboard"), 1500);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div>
      <AddMarketerForm onFormSubmit={handleApiSubmit} />
    </div>
  );
};

export default AddMarketerPage;