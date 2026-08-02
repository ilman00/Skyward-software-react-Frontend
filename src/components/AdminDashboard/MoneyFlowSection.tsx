// src/components/AdminDashboard/MoneyFlowSection.tsx
import { type FC, useState, useEffect } from "react";
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, Home, Users2 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { MetricCard } from "./MetricCard";
import { formatPKR } from "../../utils/formate";
import { getTransactionSummary, type TransactionSummary, type PeriodSummary } from "../../services/transactionsAPIs";

const PERIOD_LABELS = {
  today: "Today",
  this_week: "This Week",
  this_month: "This Month",
} as const;

type PeriodKey = keyof typeof PERIOD_LABELS;

const MoneyFlowSkeleton: FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />
    ))}
  </div>
);

const MoneyFlowSection: FC = () => {
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [period, setPeriod] = useState<PeriodKey>("today");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTransactionSummary();
        if (!cancelled) setSummary(data);
      } catch (err) {
        if (!cancelled) setError("Failed to load money flow data.");
        console.error(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchSummary();
    return () => { cancelled = true; };
  }, []);

  const active: PeriodSummary | undefined = summary?.[period];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Money Flow</h1>

        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {(Object.keys(PERIOD_LABELS) as PeriodKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                period === key ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {PERIOD_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <MoneyFlowSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <MetricCard
              title="Money In"
              value={active ? formatPKR(active.total_in) : "—"}
              icon={<ArrowUpCircle size={24} />}
              variant="success"
            />
            <MetricCard
              title="Money Out"
              value={active ? formatPKR(active.total_out) : "—"}
              icon={<ArrowDownCircle size={24} />}
              variant="warning"
            />
            <MetricCard
              title="Revenue (Sales)"
              value={active ? formatPKR(active.revenue) : "—"}
              icon={<TrendingUp size={24} />}
              variant="blue"
            />
            <MetricCard
              title="Rent Paid Out"
              value={active ? formatPKR(active.rent_paid_out) : "—"}
              icon={<Home size={24} />}
              variant="warning"
            />
            <MetricCard
              title="Commission Paid Out"
              value={active ? formatPKR(active.commission_paid_out) : "—"}
              icon={<Users2 size={24} />}
              variant="warning"
            />
          </div>

          {summary?.trend && summary.trend.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Last 30 Days</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={summary.trend}>
                  <defs>
                    <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatPKR(v)} />
                  <Tooltip formatter={(value) => formatPKR(Number(value ?? 0))} />
                  <Area type="monotone" dataKey="total_in" stroke="#16a34a" fill="url(#colorIn)" name="Money In" />
                  <Area type="monotone" dataKey="total_out" stroke="#dc2626" fill="url(#colorOut)" name="Money Out" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MoneyFlowSection;