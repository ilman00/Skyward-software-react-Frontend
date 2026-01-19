import React, { useState } from "react";
import { User, Mail, Lock, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import apiClient from "../api/client"; // Adjust path as needed
import { useNavigate, Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      // API call using your axios client
      await apiClient.post("/auth/register", {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      // Redirect to login or dashboard on success
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      {/* Left Side: Branding/Visual */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="relative z-10 max-w-md">
          <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Manage your SMD <br /> 
            <span className="text-blue-500">Inventory effectively.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Join hundreds of marketers and staff managing deals, payouts, and client relationships in one unified platform.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex flex-col justify-center items-center p-8 lg:p-24 bg-slate-50/50">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
            <p className="text-slate-500 mt-2 font-medium">Start managing your dashboard today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                <div className="relative group">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none ring-4 ring-transparent focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none ring-4 ring-transparent focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none ring-4 ring-transparent focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none ring-4 ring-transparent focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;