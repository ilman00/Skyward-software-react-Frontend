import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, KeyRound, Loader2, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { ForgotPasswordAPIs } from "../../services/forgotPasswordAPIs";

type Step = "email" | "otp" | "password" | "done";

const RESEND_COOLDOWN = 60; // seconds

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // --- Step 1: send OTP ---
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await ForgotPasswordAPIs.sendOtp(email.toLowerCase().trim());
      setStep("otp");
      startCooldown();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    setError("");
    setLoading(true);
    try {
      await ForgotPasswordAPIs.sendOtp(email.toLowerCase().trim());
      startCooldown();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: verify OTP ---
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await ForgotPasswordAPIs.verifyOtp(email.toLowerCase().trim(), otp.trim());
      setResetToken(data.resetToken);
      setStep("password");
      if (timerRef.current) clearInterval(timerRef.current);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: reset password ---
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await ForgotPasswordAPIs.resetPassword(resetToken, newPassword);
      setStep("done");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not reset password. Please request a new OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      {/* Left Side: Branding (matches Login/Register) */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="relative z-10 max-w-md">
          <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Reset your <br />
            <span className="text-blue-500">SMD Manager</span> password.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We'll send a one-time code to your email to verify it's you before resetting your password.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex flex-col justify-center items-center p-8 lg:p-24 bg-slate-50/50">
        <div className="w-full max-w-sm space-y-8">

          {step !== "done" && (
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-900">
                {step === "email" && "Forgot Password"}
                {step === "otp" && "Verify Code"}
                {step === "password" && "Set New Password"}
              </h2>
              <p className="text-slate-500 mt-2 font-medium">
                {step === "email" && "Enter your email to receive a reset code"}
                {step === "otp" && `Enter the 6-digit code sent to ${email}`}
                {step === "password" && "Choose a new password for your account"}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    type="email"
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none ring-4 ring-transparent focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Send Code <ArrowRight size={18} /></>}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">6-Digit Code</label>
                <div className="relative group">
                  <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    disabled={loading}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none ring-4 ring-transparent focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm tracking-widest"
                  />
                </div>
              </div>

              <button
                disabled={loading || otp.length !== 6}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Verify Code <ArrowRight size={18} /></>}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-700 font-medium"
                >
                  <ArrowLeft size={14} /> Change email
                </button>
                <button
                  type="button"
                  disabled={cooldown > 0 || loading}
                  onClick={handleResendOtp}
                  className="font-bold text-blue-600 hover:text-blue-700 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === "password" && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">New Password</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    type="password"
                    disabled={loading}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none ring-4 ring-transparent focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    type="password"
                    disabled={loading}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none ring-4 ring-transparent focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Reset Password <ArrowRight size={18} /></>}
              </button>
            </form>
          )}

          {/* Step 4: Done */}
          {step === "done" && (
            <div className="text-center space-y-5">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-6 rounded-xl">
                <ShieldCheck size={32} className="mx-auto mb-2" />
                <p className="font-bold">Password reset successful</p>
                <p className="text-sm text-green-600 mt-1">You can now sign in with your new password.</p>
              </div>
              <button
                onClick={() => navigate("/login", { replace: true })}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              >
                Go to Login <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step !== "done" && (
            <p className="text-center text-sm text-slate-500 font-medium">
              Remembered your password?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4">
                Back to Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;