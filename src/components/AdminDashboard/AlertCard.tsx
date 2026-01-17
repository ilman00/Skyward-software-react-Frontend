import  { type FC, type  ReactNode } from "react";

export type AlertSeverity = "warning" | "danger" | "info" | "neutral";

interface AlertCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  severity?: AlertSeverity;
}

const AlertCard: FC<AlertCardProps> = ({
  title,
  description,
  icon,
  severity = "info",
}) => {
  const accentStyles: Record<AlertSeverity, string> = {
    warning: "bg-gradient-to-br from-yellow-100 to-orange-100 text-orange-600",
    danger: "bg-gradient-to-br from-red-100 to-rose-100 text-red-600",
    info: "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600",
    neutral: "bg-gradient-to-br from-gray-100 to-slate-200 text-gray-600",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]
                    flex gap-4 items-start border border-gray-100/50">
      <div className={`p-3 rounded-full ${accentStyles[severity]}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default AlertCard;
