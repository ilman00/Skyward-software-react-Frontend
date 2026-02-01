import { type FC } from "react";
import {
  Users,
  UserSquare,
  UserCheck,
  Layers,
  Megaphone,
  Timer,
  DollarSign,
  AlertTriangle,
  FileWarning,
  UserX,
} from "lucide-react";

import MetricCard from "../../components/AdminDashboard/MetricCard";
import AlertCard from "../../components/AdminDashboard/AlertCard";

/**
 * Section header
 */
const SectionHeader: FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    {subtitle && (
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    )}
  </div>
);

const DashboardPage: FC = () => {
  return (
    <div className="space-y-12">

      {/* ------------------ PAGE HEADER ------------------ */}
      <SectionHeader
        title="Dashboard Overview"
        subtitle="Quick business insights and important alerts"
      />

      {/* ------------------ KPI METRICS ------------------ */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Customers"
            value="120"
            icon={<Users />}
            variant="blue"
          />

          <MetricCard
            title="Total Marketers"
            value="18"
            icon={<UserSquare />}
            variant="blue"
          />

          <MetricCard
            title="Total SMDs"
            value="62"
            icon={<UserCheck />}
            variant="success"
          />

          <MetricCard
            title="Active Advertisements"
            value="45"
            icon={<Megaphone />}
            variant="success"
          />
        </div>
      </section>

      {/* ------------------ SECONDARY STATS ------------------ */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Monthly Rent Liability"
            value="PKR 1,250,000"
            icon={<DollarSign />}
            variant="warning"
          />

          <MetricCard
            title="Rent Items"
            value="82"
            icon={<Layers />}
            variant="warning"
          />

          <MetricCard
            title="Expiring Ads"
            value="4"
            icon={<Timer />}
            variant="danger"
          />

          <MetricCard
            title="Inactive SMDs"
            value="3"
            icon={<UserX />}
            variant="danger"
          />
        </div>
      </section>

      {/* ------------------ ALERTS & NOTIFICATIONS ------------------ */}
      <section>
        <SectionHeader
          title="Alerts & Notifications"
          subtitle="Items that require your immediate attention"
        />

        <div className="space-y-4 max-w-5xl">
          <AlertCard
            title="Rent Payments Due"
            description="3 customers have pending rent payments this week."
            icon={<DollarSign size={20} />}
            severity="warning"
          />

          <AlertCard
            title="Contracts Expiring Soon"
            description="5 advertisement contracts will expire within 10 days."
            icon={<FileWarning size={20} />}
            severity="danger"
          />

          <AlertCard
            title="Pending Approvals"
            description="2 marketers and 1 SMD require admin approval."
            icon={<AlertTriangle size={20} />}
            severity="danger"
          />

          <AlertCard
            title="Inactive Resources"
            description="1 SMD and 2 marketers inactive for over 30 days."
            icon={<UserX size={20} />}
            severity="neutral"
          />
        </div>
      </section>

    </div>
  );
};

export default DashboardPage;
