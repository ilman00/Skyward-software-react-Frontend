import { type FC, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface ActionButtonProps {
  href: string;
  label: string;
  icon?: ReactNode;
  variant?: "primary" | "success" | "neutral" | "warning"; // new variant prop
}

const ActionButton: FC<ActionButtonProps> = ({ href, label, icon, variant = "primary" }) => {
  const variantClasses: Record<string, string> = {
    primary:
      "bg-blue-800 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
    success:
      "bg-green-600 text-white hover:bg-green-500 shadow-md hover:shadow-lg",
    warning:
      "bg-yellow-500 text-white hover:bg-yellow-400 shadow-md hover:shadow-lg",
    neutral: "bg-teal-50 text-teal-900 hover:bg-teal-100 shadow-md hover:shadow-lg",

  };

  return (
    <Link
      to={href}
      className={`px-6 py-4 rounded-xl flex justify-center items-center gap-3 font-semibold transition duration-200 ${variantClasses[variant]}`}
    >
      {icon}
      {label}
    </Link>
  );
};

export default ActionButton;
