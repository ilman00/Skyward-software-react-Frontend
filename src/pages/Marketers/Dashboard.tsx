import { useEffect, useState } from "react";
import KPIcard from "../../components/Marketer/KPICard";
// import { getDashboardSummary } from "../../services/marketerService";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // getDashboardSummary().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Marketer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPIcard title="Total Clients" value={data.totalClients} />
        <KPIcard title="Total SMDs" value={data.totalSmds} />
        <KPIcard title="Total Earnings" value={`PKR ${data.totalEarnings}`} />
        <KPIcard title="Pending Commission" value={`PKR ${data.pending}`} />
        <KPIcard title="This Month" value={`PKR ${data.thisMonth}`} />
      </div>
    </div>
  );
};

export default Dashboard;