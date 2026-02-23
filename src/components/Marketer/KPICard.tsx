import { type ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  variant?: "blue" | "success" | "warning";
  change?: string;
}

const KPIcard = ({ title, value, icon, variant = "blue", change }: Props) => {
  const variantClasses = {
    blue: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    warning: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${variantClasses[variant]}`}>
          {icon}
        </div>
        {change && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default KPIcard;