import { ShieldCheck } from "lucide-react";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-[9999] overflow-hidden">
      {/* 1. Background Aurora Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[50px] animate-bounce duration-[3000ms]"></div>

      {/* 2. Central Animation Hub */}
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Ring (Dashed) */}
        <div className="absolute h-24 w-24 border-t-2 border-b-2 border-blue-500/30 rounded-full animate-spin"></div>
        
        {/* Inner High-Speed Spinner */}
        <div className="absolute h-16 w-16 border-r-2 border-indigo-400 rounded-full animate-spin duration-700"></div>

        {/* The Icon (Static or subtly pulsing) */}
        <div className="relative z-10 p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          <ShieldCheck className="h-8 w-8 text-blue-400 animate-pulse" />
        </div>
      </div>

      {/* 3. Text & Progress Feedback */}
      <div className="mt-10 text-center space-y-2">
        <h2 className="text-xl font-medium tracking-tight text-white/90">
          Initializing Secure Session
        </h2>
        
        {/* Faux Progress Bar */}
        <div className="w-48 h-[2px] bg-slate-800 mx-auto rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 animate-progress-fill"></div>
        </div>
        
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
          Synchronizing Permissions
        </p>
      </div>

      {/* Custom Keyframe for the progress bar */}
      <style>{`
        @keyframes progress-fill {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 70%; transform: translateX(20%); }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-progress-fill {
          animation: progress-fill 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FullPageLoader;