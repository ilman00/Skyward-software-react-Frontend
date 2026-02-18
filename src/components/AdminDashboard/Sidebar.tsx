import { type FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserSquare,
  UserCheck,
  DollarSign,
  PlusCircle,
  CheckCircle2,
  LogOut,
  Menu,
  X,
  TrendingUp,
  HandCoins,
  Home,
  ChevronDown,
} from "lucide-react";
import useAuth from "../../auth/useAuth";

const Sidebar: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("dashboard");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close mobile menu after navigation
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-blue-100 hover:bg-blue-700 hover:text-white"
    }`;

  const sectionClass =
    "px-4 py-2 text-xs font-semibold text-blue-200 uppercase tracking-wider opacity-75";

  const NavSection: FC<{
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    id?: string;
    collapsible?: boolean;
  }> = ({ title, icon, children, id, collapsible = false }) => (
    <div className="space-y-2">
      {collapsible ? (
        <button
          onClick={() => id && toggleSection(id)}
          className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-blue-200 uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity duration-200 group"
        >
          {icon}
          {title}
          <ChevronDown
            size={14}
            className={`ml-auto transition-transform duration-200 ${
              expandedSection === id ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <div className={sectionClass}>
          <div className="flex items-center gap-3">
            {icon}
            {title}
          </div>
        </div>
      )}
      {(!collapsible || expandedSection === id) && children}
    </div>
  );

  const NavItem: FC<{
    to: string;
    icon: React.ReactNode;
    label: string;
  }> = ({ to, icon, label }) => (
    <NavLink to={to} className={linkClass}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );

  const QuickActionButton: FC<{
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }> = ({ onClick, icon, label }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-100 bg-blue-700 hover:bg-green-600 hover:text-white transition-all duration-200 hover:shadow-md"
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 md:shadow-lg overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-800 to-blue-900 p-6 border-b border-blue-700 z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <Home size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Skyward Vision</h1>
              <p className="text-xs text-blue-200">Admin Panel</p>
            </div>
          </div>

          {/* User Card */}
          <div className="mt-4 p-3 rounded-lg bg-blue-700 bg-opacity-50 border border-blue-600 hover:bg-opacity-70 transition-all duration-200">
            <p className="text-sm font-semibold text-white truncate">{user?.full_name || "User"}</p>
            <p className="text-xs text-blue-200">Administrator</p>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="p-4 space-y-6">
          {/* Dashboard Section */}
          <NavSection title="Dashboard" icon={<LayoutDashboard size={16} />} id="dashboard">
            <div className="space-y-1 ml-2">
              <NavItem to="/admin-dashboard" icon={<TrendingUp size={18} />} label="Overview" />
            </div>
          </NavSection>

          {/* Management Section */}
          <NavSection
            title="Management"
            icon={<Users size={16} />}
            id="management"
            collapsible={true}
          >
            <div className="space-y-1 ml-2">
              <NavItem to="/customers-list" icon={<Users size={18} />} label="Customers" />
              <NavItem to="/marketers" icon={<UserSquare size={18} />} label="Marketers" />
              <NavItem to="/staff" icon={<UserCheck size={18} />} label="Staff" />
              <NavItem to="/smds" icon={<CheckCircle2 size={18} />} label="SMDs" />
              <NavItem to="/closed-deals" icon={<DollarSign size={18} />} label="Closed Deals" />
            </div>
          </NavSection>

          {/* Finance Section */}
          <NavSection
            title="Finance"
            icon={<DollarSign size={16} />}
            id="finance"
            collapsible={true}
          >
            <div className="space-y-1 ml-2">
              <NavItem to="/add-rent-payout" icon={<Home size={18} />} label="Add Rent" />
              <NavItem to="/rent-payouts" icon={<HandCoins size={18} />} label="Payouts" />
            </div>
          </NavSection>

          {/* Quick Actions Section */}
          <NavSection
            title="Quick Actions"
            icon={<PlusCircle size={16} />}
            id="quick-actions"
            collapsible={false}
          >
            <div className="space-y-1 ml-2">
              <QuickActionButton
                onClick={() => handleNavigation("/add-customer")}
                icon={<PlusCircle size={18} />}
                label="Add Customer"
              />
              <QuickActionButton
                onClick={() => handleNavigation("/add-marketer")}
                icon={<PlusCircle size={18} />}
                label="Add Marketer"
              />
              <QuickActionButton
                onClick={() => handleNavigation("/add-smd")}
                icon={<PlusCircle size={18} />}
                label="Add SMD"
              />
              <QuickActionButton
                onClick={() => handleNavigation("/smds-sell")}
                icon={<PlusCircle size={18} />}
                label="Sell SMD"
              />
            </div>
          </NavSection>
        </nav>

        {/* Logout Button - Sticky Footer */}
        <div className="sticky bottom-0 p-4 border-t border-blue-700 bg-gradient-to-t from-blue-900 to-transparent">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;