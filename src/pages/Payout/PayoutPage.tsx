import React, { useEffect, useState, useCallback } from "react";
import RentPayoutsList from "../../components/Payout/PayoutList";
import { PayoutAPIs } from "../../services/PayoutAPIs";
import { toast } from "react-hot-toast"; // Or your preferred toast library

const PayoutPage: React.FC = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayouts = useCallback(async () => {
    try {
      setLoading(true);
      // If your API returns pagination meta, you can handle it here
      const response = await PayoutAPIs.getRentPayouts(1);
      console.log("Fetched Payouts:", response);
      setPayouts(response.data); 
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load payouts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayouts();
  }, [loadPayouts]);

  const onDelete = async (id: string) => {
    try {
      await PayoutAPIs.deleteRentPayout(id);
      toast.success("Payout record deleted successfully");
      loadPayouts(); // Refresh the list
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete record");
    }
  };

  return (
    <div className="payout-page">
      <RentPayoutsList 
        data={payouts} 
        isLoading={loading} 
        refreshData={loadPayouts} 
        onDelete={onDelete}
      />
    </div>
  );
};

export default PayoutPage;