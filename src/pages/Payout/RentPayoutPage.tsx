import React, { useState } from "react";
import toast from "react-hot-toast";
import RentPayoutForm from "../../components/Payout/RentPayoutForm";
import { CustomerAPIs } from "../../services/CustomerAPIs";
import { PayoutAPIs } from "../../services/PayoutAPIs";
import { SmdAPIs } from "../../services/SmdAPIs";

const RentPayoutPage: React.FC = () => {
  const [smds, setSmds] = useState([]);
  const [isLoadingSmds, setIsLoadingSmds] = useState(false);

  // 🔹 Async customer search
  const loadCustomers = async (inputValue: string) => {
    const res = await CustomerAPIs.searchCustomers(inputValue);
    return res.data.map((c: any) => ({
      label: c.full_name,
      value: c.customer_id,
    }));
  };

  // 🔹 Fetch SMDs by customer_id
  const getSmdByCustomer = async (customerId: string) => {
    try {
      setIsLoadingSmds(true);
      const res = await SmdAPIs.getsmdByCustomer(customerId);
      setSmds(res.data);
    } catch (error) {
      toast.error("Failed to load SMDs");
      console.error(error);
      setSmds([]);
    } finally {
      setIsLoadingSmds(false);
    }
  };

  const handleCreatePayout = async (formData: any) => {
  try {
    await toast.promise(
      PayoutAPIs.createRentPayout(formData),
      {
        loading: "Saving payout...",
        success: "Rent payout saved successfully!",
        error: (err) => {
          // DEBUG: Log the error to see why the toast might be stuck
          console.error("Payout Error:", err);
          return err?.response?.data?.message || "Failed to save payout";
        },
      }
    );
  } catch (error) {
    // This catches errors that toast.promise might not display
    console.error("Catch block error:", error);
  }
};

  return (
    <div className="p-4">
      <RentPayoutForm
        onSubmit={handleCreatePayout}
        loadCustomers={loadCustomers}
        getSmdByCustomer={getSmdByCustomer}
        smds={smds}
        isLoadingSmds={isLoadingSmds}
      />
    </div>
  );
};

export default RentPayoutPage;
