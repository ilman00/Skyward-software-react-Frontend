import { type FC, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "../auth/useAuth";

const Navbar: FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/admin-dashboard" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Company Logo"
            width={40}
            height={40}
            className="rounded-full ring-2 ring-white/70"
          />
          <span className="font-bold text-xl">Skyward</span>
        </Link>

        {/* DESKTOP MENU (AUTH ONLY) */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-8">
            <Link to="/admin/investers" className="hover:text-blue-200">Investors</Link>
            <Link to="/admin/smds" className="hover:text-blue-200">SMDs</Link>
            <Link to="/customers" className="hover:text-blue-200">Customers</Link>
            <Link to="/rent" className="hover:text-blue-200">Rent</Link>
          </div>
        )}

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md border border-white/50 hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md shadow"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm opacity-80">
                {user?.full_name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white text-gray-800 px-4 py-4 space-y-3">
          {isAuthenticated ? (
            <>
              <Link to="/admin/investers" onClick={() => setIsOpen(false)}>Investors</Link>
              <Link to="/admin/smds" onClick={() => setIsOpen(false)}>SMDs</Link>
              <Link to="/customers" onClick={() => setIsOpen(false)}>Customers</Link>
              <Link to="/rent" onClick={() => setIsOpen(false)}>Rent</Link>

              <hr />

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
