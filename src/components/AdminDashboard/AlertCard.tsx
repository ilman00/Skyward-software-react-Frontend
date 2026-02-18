import  { type FC } from "react";
import { ArrowRight, MoreVertical } from "lucide-react";

export type AlertSeverity = "warning" | "danger" | "info" | "neutral";

interface AlertCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  severity: "warning" | "danger" | "neutral" | "success";
  action?: { label: string; onClick: () => void };
  timestamp?: string;
}

export const AlertCard: FC<AlertCardProps> = ({
  title,
  description,
  icon,
  severity,
  action,
  timestamp,
}) => {
  const severityStyles = {
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    danger: "bg-red-50 border-red-200 text-red-800",
    neutral: "bg-slate-50 border-slate-200 text-slate-700",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };

  const iconColors = {
    warning: "text-amber-600",
    danger: "text-red-600",
    neutral: "text-slate-600",
    success: "text-emerald-600",
  };

  const borderAccent = {
    warning: "left-0 top-0 h-full w-1 bg-amber-400",
    danger: "left-0 top-0 h-full w-1 bg-red-400",
    neutral: "left-0 top-0 h-full w-1 bg-slate-400",
    success: "left-0 top-0 h-full w-1 bg-emerald-400",
  };

  return (
    <div
      className={`relative border rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:border-opacity-100 group`}
      style={{
        ...severityStyles[severity].split(" ").reduce((acc, cls) => {
          if (cls.startsWith("bg-")) acc.backgroundColor = cls;
          if (cls.startsWith("text-")) acc.color = cls;
          return acc;
        }, {} as any),
        borderColor: `var(--tw-border-opacity: 1)`,
      }}
    >
      {/* Left accent bar */}
      <div className={`absolute ${borderAccent[severity]}`} />

      <div className="flex gap-4 pl-2">
        {/* Icon */}
        <div className={`flex-shrink-0 pt-1 ${iconColors[severity]}`}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-sm mt-1 opacity-85 font-light">{description}</p>
            </div>
            {timestamp && (
              <span className="text-xs opacity-60 ml-2 whitespace-nowrap">{timestamp}</span>
            )}
          </div>

          {/* Action button */}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-3 text-sm font-medium inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              {action.label}
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* Menu */}
        <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
};
