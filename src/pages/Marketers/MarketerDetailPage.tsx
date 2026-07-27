import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader,
  Mail,
  Percent,
  DollarSign,
  Home,
  User,
  Wallet,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { MarketerAPIs } from "../../services/MarketerAPIs";
import { type MarketerDetail } from "../../types/marketer.types"; // adjust path if inline elsewhere
import RentHistoryModal from "../../components/Marketer/RentHistoryModal";

const MarketerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [marketer, setMarketer] = useState<MarketerDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSmd, setSelectedSmd] = useState<{ id: string, code: string } | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const res = await MarketerAPIs.getMarketerDetails(id);
      setMarketer(res.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load marketer details";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader className="w-5 h-5 animate-spin" />
          Loading marketer details...
        </div>
      </div>
    );
  }

  if (error || !marketer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">
            {error || "Marketer not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Marketers
        </button>

        {/* Header card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {marketer.full_name}
              </h1>
              <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                <Mail size={14} />
                {marketer.email}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${marketer.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-600"
                }`}
            >
              {marketer.status}
            </span>
          </div>

          {/* Commission + totals row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <StatCard
              icon={
                marketer.commission_type === "percentage" ? (
                  <Percent size={18} className="text-blue-600" />
                ) : (
                  <DollarSign size={18} className="text-blue-600" />
                )
              }
              label="Commission"
              value={
                marketer.commission_type === "percentage"
                  ? `${marketer.commission_value}%`
                  : `Rs. ${marketer.commission_value.toLocaleString()}`
              }
              bg="bg-blue-50"
            />
            <StatCard
              icon={<TrendingUp size={18} className="text-emerald-600" />}
              label="Total Revenue"
              value={`Rs. ${marketer.total_revenue.toLocaleString()}`}
              bg="bg-emerald-50"
            />
            <StatCard
              icon={<Wallet size={18} className="text-amber-600" />}
              label="Total Rent Paid"
              value={`Rs. ${marketer.total_rent_paid.toLocaleString()}`}
              bg="bg-amber-50"
            />
            <StatCard
              icon={<User size={18} className="text-purple-600" />}
              label="Customers"
              value={String(marketer.customers.length)}
              bg="bg-purple-50"
            />
            <StatCard
              icon={<Wallet size={18} className="text-green-600" />}
              label="Commission Paid"
              value={`Rs. ${marketer.total_commission_paid.toLocaleString()}`}
              bg="bg-green-50"
            />
            <StatCard
              icon={<Wallet size={18} className="text-orange-600" />}
              label="Commission Pending"
              value={`Rs. ${marketer.total_commission_pending.toLocaleString()}`}
              bg="bg-orange-50"
            />
          </div>
        </div>

        {/* Customers list */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800">Customers & SMDs</h2>

          {marketer.customers.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              No customers linked to this marketer yet.
            </div>
          ) : (
            marketer.customers.map((customer) => (
              <div
                key={customer.customer_id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                  <User size={16} className="text-slate-500" />
                  <span className="font-semibold text-slate-800">
                    {customer.full_name}
                  </span>
                </div>

                {customer.smds.length === 0 ? (
                  <div className="px-6 py-6 text-sm text-slate-400">
                    No SMDs purchased yet.
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-semibold text-slate-500 border-b border-slate-100">
                        <th className="px-6 py-3">SMD Code</th>
                        <th className="px-6 py-3">Sell Price</th>
                        <th className="px-6 py-3">Monthly Rent</th>
                        <th className="px-6 py-3">Total Rent Paid</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer.smds.map((smd) => (
                        <tr
                          key={smd.smd_closing_id}
                          onClick={() => setSelectedSmd({ id: smd.smd_closing_id, code: smd.smd_code })}
                          className="border-b border-slate-100 last:border-0 cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-3 text-sm text-slate-800 flex items-center gap-1.5">
                            <Home size={14} className="text-slate-400" />
                            {smd.smd_code}
                          </td>
                          <td className="px-6 py-3 text-sm text-slate-700">
                            Rs. {smd.sell_price.toLocaleString()}
                          </td>
                          <td className="px-6 py-3 text-sm text-slate-700">
                            Rs. {smd.monthly_rent.toLocaleString()}
                          </td>
                          <td className="px-6 py-3 text-sm text-slate-700">
                            Rs. {smd.total_paid_to_customer.toLocaleString()}
                          </td>
                          <td className="px-6 py-3">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${smd.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                                }`}
                            >
                              {smd.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {selectedSmd && (
        <RentHistoryModal
          smdClosingId={selectedSmd.id}
          smdCode={selectedSmd.code}
          onClose={() => setSelectedSmd(null)}
        />
      )}
    </div>
  );
};

/* Small reusable stat card */
const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
}> = ({ icon, label, value, bg }) => (
  <div className={`rounded-xl p-4 ${bg}`}>
    <div className="flex items-center gap-2 mb-1">{icon}</div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
  </div>
);

export default MarketerDetailPage;