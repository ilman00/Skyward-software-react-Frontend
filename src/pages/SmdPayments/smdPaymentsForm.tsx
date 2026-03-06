import React, { useState } from "react";
import toast from "react-hot-toast";
import BalancePaymentForm, {
  type BalancePaymentFormData,
} from "../../components/SmdPayments/BalancePaymentForm";
import { CustomerAPIs } from "../../services/CustomerAPIs";
import { SmdAPIs, BalancePaymentAPIs } from "../../services/SmdAPIs";

const BalancePaymentPage: React.FC = () => {
  const [smds, setSmds] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [isLoadingSmds, setIsLoadingSmds] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  /* ── Search Customers ── */
  const loadCustomers = async (inputValue: string) => {
    try {
      const res = await CustomerAPIs.searchCustomers(inputValue);

      return res.data.map((c: any) => ({
        label: c.full_name,
        value: c.customer_id,
      }));
    } catch (error) {
      toast.error("Failed to search customers");
      return [];
    }
  };

  /* ── Get SMDs by Customer ── */
  const getSmdByCustomer = async (customerId: string) => {
    try {
      setIsLoadingSmds(true);
      setRemainingBalance(0);

      const res = await SmdAPIs.getsmdByCustomer(customerId);

      setSmds(res.data);
    } catch (error) {
      toast.error("Failed to load SMDs");
      setSmds([]);
    } finally {
      setIsLoadingSmds(false);
    }
  };

  /* ── Get Remaining Balance ── */
  const getRemainingBalance = async (customerId: string, smdId: string) => {
  try {
    setIsLoadingBalance(true);
    setRemainingBalance(0);

    const res = await BalancePaymentAPIs.getRemainingBalance(customerId, smdId);
    console.log("API Response for Remaining Balance:", res);
    setRemainingBalance(res.summary.total_remaining_balance); // ✅ removed .data
    console.log("Remaining Balance:", res.summary.total_remaining_balance);
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to fetch remaining balance");
    setRemainingBalance(0);
  } finally {
    setIsLoadingBalance(false);
  }
};

  /* ── Submit Payment ── */
  const handleCreatePayment = async (formData: BalancePaymentFormData) => {
    await toast.promise(
      BalancePaymentAPIs.createPayment({
        customer_id: formData.customer_id,
        smd_id: formData.smd_id,
        amount: Number(formData.amount),
        payment_method: formData.payment_method,
        reference_no: formData.reference_no,
        notes: formData.notes,
      }),
      {
        loading: "Saving payment...",
        success: () => {
          getRemainingBalance(formData.customer_id, formData.smd_id);

          return `Payment of PKR ${Number(formData.amount).toLocaleString()} recorded successfully!`;
        },
        error: (err) =>
          err?.response?.data?.message || "Failed to save payment",
      }
    );
  };

  return (
    <div className="p-4">
      <BalancePaymentForm
        onSubmit={handleCreatePayment}
        loadCustomers={loadCustomers}
        getSmdByCustomer={getSmdByCustomer}
        getRemainingBalance={getRemainingBalance}
        smds={smds}
        remainingBalance={remainingBalance}
        isLoadingSmds={isLoadingSmds}
        isLoadingBalance={isLoadingBalance}
      />
    </div>
  );
};

export default BalancePaymentPage;