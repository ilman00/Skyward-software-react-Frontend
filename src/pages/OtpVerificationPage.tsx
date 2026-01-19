import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Timer, ArrowLeft, Loader2 } from "lucide-react";
import apiClient from "../api/client";

const OTPVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ; // Retrieve email from registration state

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
  if (!email) {
    navigate("/register");
  }
}, [email, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle Input Changes
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalOtp = otp.join("");
    
    if (finalOtp.length < 6) {
      setError("Please enter the full 6-digit code");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiClient.post("/auth/verify-otp", { email, otp: finalOtp });
      navigate("/login", { state: { message: "Account verified! You can now login." } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiClient.post("/auth/resend-otp", { email });
      setTimeLeft(600);
      setOtp(new Array(6).fill(""));
      setError(null);
      alert("New code sent to your email!");
    } catch (err) {
      setError("Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 lg:p-12 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Verify your Email</h2>
          <p className="text-slate-500 text-sm">
            We've sent a 6-digit code to <br />
            <span className="font-bold text-slate-700">{email}</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => { inputRefs.current[index] = el; }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            ))}
          </div>

          {error && (
            <div className="text-center text-red-500 text-sm font-medium bg-red-50 py-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            disabled={loading || timeLeft === 0}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Verify Account"}
          </button>
        </form>

        {/* Footer / Timer */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
            <Timer size={16} className={timeLeft < 60 ? "text-red-500" : "text-blue-500"} />
            Code expires in: <span className="text-slate-900 font-bold font-mono">{formatTime(timeLeft)}</span>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Didn't receive the code?{" "}
              <button 
                onClick={handleResend}
                disabled={timeLeft > 540} // Prevent resending too quickly
                className="text-blue-600 font-bold hover:underline disabled:text-slate-300 transition-all"
              >
                Resend Code
              </button>
            </p>
          </div>

          <button 
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-all"
          >
            <ArrowLeft size={16} /> Back to Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;