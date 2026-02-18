import { type FC } from "react";
import { type ReactNode } from "react";
import {
  Users,
  UserSquare,
  UserCheck,
  Layers,
  Timer,
  DollarSign,
  FileWarning,
  Eye,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";

import { MetricCard } from "../../components/AdminDashboard/MetricCard";
import { AlertCard } from "../../components/AdminDashboard/AlertCard";
import ActionButton from "../../components/AdminDashboard/ActionButton";

interface SectionHeaderProps {
  children: ReactNode;
}

const SectionHeader: FC<SectionHeaderProps> = ({ children }) => (
  <h1 className="text-2xl font-bold mb-6 text-gray-800">
    {children}
  </h1>
);

const StaffDashboard: FC = () => {
  return (
    <div className="space-y-10 bg-gray-50 min-h-screen p-8">

      {/* ------------------ QUICK ACTIONS ------------------ */}
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
        <SectionHeader>Management & Records</SectionHeader>

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
      {/* ------------------ METRICS ------------------ */}
      <section>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          My Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="My Customers"
            value="--"
            icon={<Users />}
            variant="blue"
          />

          <MetricCard
            title="My SMDs"
            value="--"
            icon={<Layers />}
            variant="blue"
          />

          <MetricCard
            title="Rent Paid"
            value="--"
            icon={<DollarSign />}
            variant="success"
          />

          <MetricCard
            title="Contracts Closed"
            value="--"
            icon={<FileWarning />}
            variant="success"
          />

          <MetricCard
            title="Active Ads"
            value="--"
            icon={<Layers />}
            variant="warning"
          />

          <MetricCard
            title="Expiring Contracts"
            value="--"
            icon={<Timer />}
            variant="warning"
          />
        </div>
      </section>

      {/* ------------------ ALERTS ------------------ */}
      <section>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          My Alerts
        </h1>

        <div className="space-y-4 max-w-4xl">
          <AlertCard
            title="Rent Payments Due"
            description="You have rent payouts pending this week."
            icon={<DollarSign size={20} />}
            severity="warning"
          />

          <AlertCard
            title="Contracts Expiring Soon"
            description="Some contracts you closed are expiring soon."
            icon={<Timer size={20} />}
            severity="danger"
          />
        </div>
      </section>

    </div>
  );
};

export default StaffDashboard;
