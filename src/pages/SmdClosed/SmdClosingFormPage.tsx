import React from "react";
import SmdClosingForm from "../../components/SmdClosed/SmdClosingForm";
import { dealService } from "../../services/SmdAPIs";
import toast from "react-hot-toast";

const SmdClosingFormPage: React.FC = () => {
  const handleDealSubmit = async (payload: any) => {
    try {
      await dealService.closeDeal(payload);
      toast.success("SMD deal closed successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to close SMD deal"
      );
    }
  };

  return <SmdClosingForm onCloseDeal={handleDealSubmit} />;
};

export default SmdClosingFormPage;
