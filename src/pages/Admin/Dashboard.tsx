import { type FC, type ReactNode } from "react";
import {
    Users,
    UserSquare,
    UserCheck,
    Layers,
    Megaphone,
    Timer,
    AlertTriangle,
    DollarSign,
    FileWarning,
    UserX,
    Eye,
    PlusCircle,
    CheckCircle2,
} from "lucide-react";

import MetricCard from "../../components/AdminDashboard/MetricCard";
import AlertCard from "../../components/AdminDashboard/AlertCard";
import ActionButton from "../../components/AdminDashboard/ActionButton";

/**
 * Reusable section header
 */
interface SectionHeaderProps {
    children: ReactNode;
}

const SectionHeader: FC<SectionHeaderProps> = ({ children }) => (
    <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {children}
    </h1>
);

const DashboardPage: FC = () => {
    return (
        <div className="space-y-10 bg-gray-50 min-h-screen p-8">

            {/* ------------------ QUICK ACTIONS ------------------ */}
            <section>
                <SectionHeader>Quick Actions</SectionHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    <ActionButton
                        href="/add-customer"
                        label="New Customer"
                        icon={<PlusCircle size={20} />}
                    />

                    <ActionButton
                        href="/add-marketer"
                        label="New Marketer"
                        icon={<PlusCircle size={20} />}
                    />
                    <ActionButton
                        href="/add-smd"
                        label="New SMD"
                        icon={<PlusCircle size={20} />}
                    />
                    <ActionButton
                        href="/add-rent-payout"
                        label="Add Rent Record"
                        icon={<PlusCircle size={20} />}
                    />
                    <ActionButton
                        href="/smds-sell"
                        label="SMD Sell"
                        icon={<Eye size={20} />}
                    />
                </div>
            </section>

            {/* ------------------ MANAGEMENT & RECORDS ------------------ */}
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
                <SectionHeader>Dashboard Overview</SectionHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MetricCard
                        title="Total Customers"
                        value="120"
                        icon={<Users />}
                        variant="blue"
                    />
                    <MetricCard
                        title="Total Investers"
                        value="18"
                        icon={<UserSquare />}
                        variant="blue"
                    />

                    <MetricCard
                        title="Total SMDs"
                        value="6"
                        icon={<UserCheck />}
                        variant="success"
                    />
                    <MetricCard
                        title="Rent Items"
                        value="82"
                        icon={<Layers />}
                        variant="success"
                    />

                    <MetricCard
                        title="Active Advertisements"
                        value="45"
                        icon={<Megaphone />}
                        variant="warning"
                    />
                    <MetricCard
                        title="Expiring Ads"
                        value="4"
                        icon={<Timer />}
                        variant="warning"
                    />
                </div>
            </section>

            {/* ------------------ ALERTS ------------------ */}
            <section>
                <SectionHeader>Alerts & Notifications</SectionHeader>

                <div className="space-y-4 max-w-4xl">
                    <AlertCard
                        title="Rent Payments Due"
                        description="3 customers have pending rent payments this week."
                        icon={<DollarSign size={20} />}
                        severity="warning"
                    />

                    <AlertCard
                        title="Customer Contracts Expiring"
                        description="5 contracts will expire within the next 10 days."
                        icon={<FileWarning size={20} />}
                        severity="danger"
                    />

                    <AlertCard
                        title="Pending Approvals"
                        description="2 new brokers and 1 SMD require approval."
                        icon={<AlertTriangle size={20} />}
                        severity="danger"
                    />

                    <AlertCard
                        title="Inactive SMDs/Brokers"
                        description="1 SMD and 2 brokers have been inactive for over 30 days."
                        icon={<UserX size={20} />}
                        severity="neutral"
                    />

                    <AlertCard
                        title="Board Availability Alerts"
                        description="4 boards will become available next week."
                        icon={<Layers size={20} />}
                        severity="info"
                    />
                </div>
            </section>

        </div>
    );
};

export default DashboardPage;
