import { useEffect, useState } from "react";
import CustomersTable from "../../components/Marketer/CustomersTable";
import { type Customer } from "../../components/Marketer/CustomersTable";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Simulating an API fetch with dummy data
    const dummyData = [
      {
        id: "1",
        full_name: "Zeeshan Ahmed",
        phone: "+92 300 1234567",
        total_smds: 3,
        total_investment: 450000,
        total_commission: 22500,
      },
      {
        id: "2",
        full_name: "Sara Khan",
        phone: "+92 321 7654321",
        total_smds: 1,
        total_investment: 150000,
        total_commission: 7500,
      },
      {
        id: "3",
        full_name: "Bilal Mansoor",
        phone: "+92 333 9876543",
        total_smds: 5,
        total_investment: 750000,
        total_commission: 37500,
      },
      {
        id: "4",
        full_name: "Hamza Yusuf",
        phone: "+92 345 5551234",
        total_smds: 2,
        total_investment: 300000,
        total_commission: 15000,
      }
    ];

    setCustomers(dummyData);
  }, []);

  return (
    <div className="p-8 space-y-6 bg-slate-50/50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Clients</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your customer portfolio and track their unit investments.
        </p>
      </div>

      {customers.length > 0 ? (
        <CustomersTable 
          customers={customers} 
          onDelete={(id) => console.log("Delete customer:", id)}
          onRowClick={(id) => console.log("View customer details:", id)}
        />
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-400">No customers found. Start by adding your first client.</p>
        </div>
      )}
    </div>
  );
};

export default Customers;