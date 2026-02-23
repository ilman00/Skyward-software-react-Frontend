// import { Link } from "react-router-dom";
import MarketerSidebar from "../components/Marketer/MarketerSidebar";

const MarketerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <MarketerSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default MarketerLayout;