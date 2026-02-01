import  { type FC, type ReactNode } from "react";

export type MetricVariant =
  | "blue"
  | "success"
  | "warning"
  | "neutral"
  | "danger";


interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  variant?: MetricVariant;
}

const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  icon,
  variant = "blue",
}) => {
  const variantStyles: Record<
  MetricVariant,
  {
    accentColor: string;
    iconColor: string;
    bgColor: string;
  }
> = {
  blue: {
    accentColor: "border-blue-600",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  success: {
    accentColor: "border-green-600",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  warning: {
    accentColor: "border-orange-600",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  neutral: {
    accentColor: "border-gray-400",
    iconColor: "text-gray-500",
    bgColor: "bg-gray-100",
  },
  danger: {
    accentColor: "border-red-600",
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
};

  const styles = variantStyles[variant];

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${styles.accentColor}
                  transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                  flex items-center gap-4`}
    >
      <div className={`p-3 rounded-lg ${styles.bgColor} ${styles.iconColor}`}>
        {icon}
      </div>

      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </h2>
      </div>
    </div>
  );
};

export default MetricCard;
