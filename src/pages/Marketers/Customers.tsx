import { useEffect, useCallback, useState } from "react";
import CustomersTable from "../../components/Marketer/CustomersTable";
import { type Customer } from "../../components/Marketer/CustomersTable";
import { MarketerDashboardAPIs } from "../../services/MarketerAPIs";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = useCallback(async () => {
    try {
      const data = await MarketerDashboardAPIs.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-slate-400 font-medium">Loading Clients...</div>
    </div>
  );

  return (
    <div className="p-8 space-y-6 bg-slate-50/50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Clients</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your customer portfolio and track their unit investments.
        </p>
      </div>

      {customers.length > 0 ? (
        <CustomersTable
          customers={customers}
          onRowClick={(id) => console.log("View customer details:", id)}
        />
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-400">No customers found. Start by adding your first client.</p>
        </div>
      )}
    </div>
  );
};

export default Customers;