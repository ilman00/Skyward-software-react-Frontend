import { type FC, useState, useEffect } from "react";
import {
  Users,
  UserSquare,
  UserCheck,
  DollarSign,
  AlertTriangle,
  FileWarning,
  Bell,
  Settings,
  CheckCircle2,
  Clock,
  PlusCircle,
  Eye,
} from "lucide-react";
import { MetricCard } from "../../components/AdminDashboard/MetricCard";
import { AlertCard } from "../../components/AdminDashboard/AlertCard";
import ActionButton from "../../components/AdminDashboard/ActionButton";
import { getDashboardStats, type DashboardStats } from "../../services/adminDashboardAPIs";

/**
 * Formats a number as PKR currency string
 * e.g. 2500000 → "PKR 2.5M", 850000 → "PKR 850K"
 */
const formatPKR = (amount: number): string => {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `PKR ${millions % 1 === 0 ? millions : millions.toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    return `PKR ${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}K`;
  }
  return `PKR ${amount.toLocaleString()}`;
};

const SectionHeader: FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-8 border-b border-slate-200 pb-6">
    <h2 className="text-xl font-semibold text-slate-900 tracking-tight">{title}</h2>
    {subtitle && (
      <p className="text-sm text-slate-500 mt-2 font-light">{subtitle}</p>
    )}
  </div>
);

const PageHeader: FC = () => (
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
        Dashboard
      </h1>
      <p className="text-slate-600 text-sm mt-2 font-light">
        Real-time business overview and performance metrics
      </p>
    </div>
    <div className="flex items-center gap-3">
      <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
        <Bell size={20} />
      </button>
      <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
        <Settings size={20} />
      </button>
    </div>
  </div>
);

/** Skeleton shimmer for metric cards while loading */
const MetricCardSkeleton: FC = () => (
  <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
);

const AdminDashboard: FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDashboardStats();
        if (!cancelled) setStats(data);
      } catch (err) {
        if (!cancelled) setError("Failed to load dashboard stats.");
        console.error(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-10">
      <PageHeader />

      {/* Quick Actions */}
      <section>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Actions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <ActionButton href="/add-customer" label="Add Customer" icon={<PlusCircle size={20} />} />
          <ActionButton href="/add-smd" label="Add SMD" icon={<PlusCircle size={20} />} />
          <ActionButton href="/add-marketer" label="Add Marketer" icon={<PlusCircle size={20} />} />
          <ActionButton href="/add-rent-payout" label="Add Rent Payout" icon={<PlusCircle size={20} />} />
          <ActionButton href="/my-activity" label="My Activity" icon={<Eye size={20} />} />
        </div>
      </section>

      {/* Navigation shortcuts */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <ActionButton href="/staff" label="All Staff" icon={<Users size={18} className="text-gray-600" />} variant="neutral" />
          <ActionButton href="/marketers" label="All Marketers" icon={<UserSquare size={18} className="text-gray-600" />} variant="neutral" />
          <ActionButton href="/customers-list" label="All Customers" icon={<Users size={18} className="text-gray-600" />} variant="neutral" />
          <ActionButton href="/closed-deals" label="Closed Deals" icon={<CheckCircle2 size={18} className="text-gray-600" />} variant="neutral" />
          <ActionButton href="/smds" label="All SMDs" icon={<UserCheck size={18} className="text-gray-600" />} variant="neutral" />
          <ActionButton href="/rent-payouts" label="Rent Payouts" icon={<DollarSign size={18} className="text-gray-600" />} variant="neutral" />
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Total Overview</h1>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton placeholders
            [...Array(4)].map((_, i) => <MetricCardSkeleton key={i} />)
          ) : (
            <>
              <MetricCard
                title="Total Customers"
                value={stats?.total_customers?.toLocaleString() ?? "—"}
                icon={<Users size={24} />}
                variant="blue"
                trend={stats?.customer_trend ?? undefined}
                change={
                  stats?.customers_this_month != null
                    ? `↑ ${stats.customers_this_month} added this month`
                    : undefined
                }
              />

              <MetricCard
                title="Active Marketers"
                value={stats?.active_marketers?.toLocaleString() ?? "—"}
                icon={<UserSquare size={24} />}
                variant="blue"
                change={
                  stats?.marketers_this_month != null
                    ? `↑ ${stats.marketers_this_month} new this month`
                    : undefined
                }
              />

              <MetricCard
                title="Total SMDs"
                value={stats?.total_smds?.toLocaleString() ?? "—"}
                icon={<UserCheck size={24} />}
                variant="success"
                trend={stats?.smd_trend ?? undefined}
                change={
                  stats?.smds_this_month != null
                    ? `↑ ${stats.smds_this_month} added this month`
                    : undefined
                }
              />

              <MetricCard
                title="Monthly Rent Liability"
                value={
                  stats?.monthly_rent_liability != null
                    ? formatPKR(stats.monthly_rent_liability)
                    : "—"
                }
                icon={<DollarSign size={24} />}
                variant="warning"
                change={
                  stats?.pending_rent_payouts_this_month != null
                    ? `${stats.pending_rent_payouts_this_month} payouts pending this month`
                    : "Due by month end"
                }
              />

              
            </>
          )}
        </div>
      </section>

      {/* Alerts */}
      <section>
        <SectionHeader
          title="Critical Alerts"
          subtitle="Priority items requiring immediate attention"
        />

        <div className="space-y-3 max-w-4xl">
          <AlertCard
            title="Rent Payments Overdue"
            description="5 customers have overdue rent payments totaling PKR 850,000. Immediate collection action required."
            icon={<DollarSign size={20} />}
            severity="danger"
            action={{ label: "View Details", onClick: () => {} }}
            timestamp="2 hours ago"
          />

          <AlertCard
            title="Contracts Expiring Soon"
            description="8 advertisement contracts will expire within 7 days. Review and renewal needed."
            icon={<FileWarning size={20} />}
            severity="warning"
            action={{ label: "Manage Contracts", onClick: () => {} }}
            timestamp="4 hours ago"
          />

          <AlertCard
            title="Pending Approvals"
            description="3 marketers and 2 SMDs are waiting for admin approval to activate their accounts."
            icon={<AlertTriangle size={20} />}
            severity="danger"
            action={{ label: "Review Requests", onClick: () => {} }}
            timestamp="1 day ago"
          />

          <AlertCard
            title="System Health Check Complete"
            description="All systems operational. Database backup completed successfully at 2:00 AM."
            icon={<CheckCircle2 size={20} />}
            severity="success"
            timestamp="6 hours ago"
          />

          <AlertCard
            title="Scheduled Maintenance"
            description="Database optimization scheduled for Sunday 2:00 AM - 4:00 AM. Minimal impact expected."
            icon={<Clock size={20} />}
            severity="neutral"
            timestamp="Upcoming"
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;