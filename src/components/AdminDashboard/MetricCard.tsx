import React, { type FC } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant: "blue" | "success" | "warning" | "danger";
  trend?: number;
  change?: string;
}

export const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  icon,
  variant,
  trend,
  change,
}) => {
  const variants = {
    blue: "from-blue-50 to-blue-50 border-blue-200 text-blue-700 bg-blue-500/10",
    success: "from-emerald-50 to-emerald-50 border-emerald-200 text-emerald-700 bg-emerald-500/10",
    warning: "from-amber-50 to-amber-50 border-amber-200 text-amber-700 bg-amber-500/10",
    danger: "from-red-50 to-red-50 border-red-200 text-red-700 bg-red-500/10",
  };

  const iconColor = {
    blue: "text-blue-600",
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger: "text-red-600",
  };

  const trendColor = trend && trend >= 0 ? "text-emerald-600" : "text-red-600";
  const TrendIcon = trend && trend >= 0 ? TrendingUp : TrendingDown;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${variants[variant]} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default`}
      style={{
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none" />

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${iconColor[variant]} opacity-20`}>
            <div className={`${iconColor[variant]}`}>{icon}</div>
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
              <TrendIcon size={14} />
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
        </div>

        {/* Change indicator */}
        {change && (
          <p className="text-xs text-slate-500 mt-3 font-light">{change}</p>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
