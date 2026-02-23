import { type FC, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Home,
} from "lucide-react";
import useAuth from "../../auth/useAuth"; // Ensure this path is correct

const MarketerSidebar: FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-blue-100 hover:bg-blue-700 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-blue-600 text-white shadow-lg"
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
              <p className="text-xs text-blue-200">Marketer Portal</p>
            </div>
          </div>

          {/* User Card */}
          <div className="mt-4 p-3 rounded-lg bg-blue-700 bg-opacity-50 border border-blue-600">
            <p className="text-sm font-semibold text-white truncate">{user?.full_name || "Marketer"}</p>
            <p className="text-xs text-blue-200">Official Marketer</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <NavLink to="/marketer-dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/marketer/customers" className={linkClass}>
            <Users size={18} />
            <span>My Clients</span>
          </NavLink>

          <NavLink to="/marketer/earnings" className={linkClass}>
            <DollarSign size={18} />
            <span>Earnings</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-blue-700 bg-blue-900">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default MarketerSidebar;