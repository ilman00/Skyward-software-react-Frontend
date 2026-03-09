import { useEffect, useCallback, useState } from "react";
import EarningsTable from "../../components/Marketer/EarningTable";
import { MarketerDashboardAPIs } from "../../services/MarketerAPIs";

const Earnings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEarnings = useCallback(async () => {
    try {
      const earnings = await MarketerDashboardAPIs.getEarnings();
      setData(earnings);
    } catch (error) {
      console.error("Failed to fetch earnings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-slate-400 font-medium">Loading Earnings...</div>
    </div>
  );

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-bold">My Earnings</h1>
      <EarningsTable data={data} />
    </div>
  );
};

export default Earnings;