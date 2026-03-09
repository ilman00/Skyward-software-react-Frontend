import { useEffect, useCallback, useState } from "react";
import { MetricCard } from "../../components/AdminDashboard/MetricCard"; 
import { Users, Layers, DollarSign, Wallet, CalendarClock } from "lucide-react";
import { MarketerDashboardAPIs } from "../../services/MarketerAPIs";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  const fetchSummary = useCallback(async () => {
  try {
    const summary = await MarketerDashboardAPIs.getSummary();
    console.log("Summary:", summary);
    setData({
      totalClients:  summary.data.total_customers,
      totalSmds:     summary.data.total_smds_bought,
      totalEarnings: summary.data.total_commission_earned,
      pending:       summary.data.unpaid_commission,
      thisMonth:     0, // Not yet available from API — placeholder until endpoint supports it
    });
  } catch (error) {
    console.error("Failed to fetch summary:", error);
  }
}, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);


  if (!data) return (
    <div className="p-8 flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-slate-400 font-medium">Loading Dashboard...</div>
    </div>
  );

  return (
    <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Marketer Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Real-time performance overview and earnings.
        </p>
      </div>

      {/* Stats Grid - Matching the 3-column desktop layout of your "Overview" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Clients"
          value={data.totalClients}
          icon={<Users size={24} />}
          variant="blue"
          trend={12}
          change="↑ 8 new clients this week"
        />

        <MetricCard
          title="Total SMDs"
          value={data.totalSmds}
          icon={<Layers size={24} />}
          variant="blue"
          trend={5}
          change="Managed service deployments"
        />

        <MetricCard
          title="Total Earnings"
          value={`PKR ${data.totalEarnings}`}
          icon={<DollarSign size={24} />}
          variant="success"
          trend={18}
          change="Lifetime accumulated revenue"
        />

        <MetricCard
          title="Pending Commission"
          value={`PKR ${data.pending}`}
          icon={<Wallet size={24} />}
          variant="warning"
          change="Processing for next payout"
        />

        <MetricCard
          title="This Month"
          value={`PKR ${data.thisMonth}`}
          icon={<CalendarClock size={24} />}
          variant="success"
          trend={24}
          change="Performance vs last month"
        />
      </div>
    </div>
  );
};

export default Dashboard;