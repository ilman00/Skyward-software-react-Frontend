import { useState } from "react";
import EarningsTable from "../../components/Marketer/EarningTable";

const Earnings = () => {
  const [data] = useState([
    {
      id: "1",
      customer_name: "Ali Khan",
      smd_code: "SMD001",
      commission_amount: 5000,
      status: "Pending",
      created_at: "2024-06-01"
    },
    {
      id: "2",
      customer_name: "Ahmed Raza",
      smd_code: "SMD002",
      commission_amount: 7500,
      status: "Completed",
      created_at: "2024-06-05"
    },
    {
      id: "3",
      customer_name: "Sara Ahmed",
      smd_code: "SMD003",
      commission_amount: 6200,
      status: "Pending",
      created_at: "2024-06-10"
    },
    {
      id: "4",
      customer_name: "Bilal Hussain",
      smd_code: "SMD004",
      commission_amount: 8800,
      status: "Completed",
      created_at: "2024-06-12"
    },
    {
      id: "5",
      customer_name: "Usman Tariq",
      smd_code: "SMD005",
      commission_amount: 4300,
      status: "Pending",
      created_at: "2024-06-15"
    },
    {
      id: "6",
      customer_name: "Hassan Ali",
      smd_code: "SMD006",
      commission_amount: 9100,
      status: "Completed",
      created_at: "2024-06-18"
    }
  ]);

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-bold">My Earnings</h1>
      <EarningsTable data={data} />
    </div>
  );
};

export default Earnings;