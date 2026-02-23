import { type FC, useState, useEffect } from "react";
import {
  Users,
  UserSquare,
  UserCheck,
  Layers,
  Timer,
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

/**
 * SectionHeader - Professional section divider
 */
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

const AdminDashboard: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-10 w-40 bg-slate-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <PageHeader />

      {/* Primary KPIs */}


      <section>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          My Actions
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <ActionButton
            href="/add-customer"
            label="Add Customer"
            icon={<PlusCircle size={20} />}
          />

          <ActionButton
            href="/add-smd"
            label="Add SMD"
            icon={<PlusCircle size={20} />}
          />

          <ActionButton
            href="/add-marketer"
            label="Add Marketer"
            icon={<PlusCircle size={20} />}
          />

          <ActionButton
            href="/add-rent-payout"
            label="Add Rent Payout"
            icon={<PlusCircle size={20} />}
          />

          <ActionButton
            href="/my-activity"
            label="My Activity"
            icon={<Eye size={20} />}
          />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

          <ActionButton
            href="/staff"
            label="All Staff"
            icon={<Users size={18} className="text-gray-600" />}
            variant="neutral"
          />

          <ActionButton
            href="/marketers"
            label="All Marketers"
            icon={<UserSquare size={18} className="text-gray-600" />}
            variant="neutral"
          />

          <ActionButton
            href="/customers-list"
            label="All Customers"
            icon={<Users size={18} className="text-gray-600" />}
            variant="neutral"
          />

          <ActionButton
            href="/closed-deals"
            label="Closed Deals"
            icon={<CheckCircle2 size={18} className="text-gray-600" />}
            variant="neutral"
          />

          <ActionButton
            href="/smds"
            label="All SMDs"
            icon={<UserCheck size={18} className="text-gray-600" />}
            variant="neutral"
          />

          <ActionButton
            href="/rent-payouts"
            label="Rent Payouts"
            icon={<DollarSign size={18} className="text-gray-600" />}
            variant="neutral"
          />
        </div>
      </section>
      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Total Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Total Customers"
            value="1,240"
            icon={<Users size={24} />}
            variant="blue"
            trend={12}
            change="↑ 120 from last month"
          />

          <MetricCard
            title="Active Marketers"
            value="48"
            icon={<UserSquare size={24} />}
            variant="blue"
            trend={8}
            change="↑ 4 new this month"
          />

          <MetricCard
            title="Total SMDs"
            value="320"
            icon={<UserCheck size={24} />}
            variant="success"
            trend={15}
            change="↑ 45 from last month"
          />

          <MetricCard
            title="Monthly Rent Liability"
            value="PKR 2.5M"
            icon={<DollarSign size={24} />}
            variant="warning"
            change="Due by month end"
          />

          <MetricCard
            title="Inventory Items"
            value="523"
            icon={<Layers size={24} />}
            variant="warning"
            trend={-5}
            change="↓ 28 items used"
          />

          <MetricCard
            title="Expiring Ads (7 days)"
            value="12"
            icon={<Timer size={24} />}
            variant="danger"
            change="Action required"
          />

        </div>
      </section>

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
            action={{ label: "View Details", onClick: () => { } }}
            timestamp="2 hours ago"
          />

          <AlertCard
            title="Contracts Expiring Soon"
            description="8 advertisement contracts will expire within 7 days. Review and renewal needed."
            icon={<FileWarning size={20} />}
            severity="warning"
            action={{ label: "Manage Contracts", onClick: () => { } }}
            timestamp="4 hours ago"
          />

          <AlertCard
            title="Pending Approvals"
            description="3 marketers and 2 SMDs are waiting for admin approval to activate their accounts."
            icon={<AlertTriangle size={20} />}
            severity="danger"
            action={{ label: "Review Requests", onClick: () => { } }}
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

      {/* Quick Actions Footer */}
      <section className="pt-4 border-t border-slate-200">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            View All Reports
          </button>
          <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
            Settings
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;