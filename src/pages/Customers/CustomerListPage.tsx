import React, { useEffect, useState } from "react";
import CustomerList from "../../components/Customers/CustomerList";
import { CustomerAPIs as customerService} from "../../services/CustomerAPIs";
import { toast } from "react-hot-toast";

/* ALIGNED TYPES */
export interface SMD {
  smd_id: string;
  smd_code: string;
  title: string;
  city: string;
  area: string;
  monthly_payout: number;
  status: string;
}

export interface Customer {
  customer_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  city: string;
  address: string;
  created_by_name: string;
  smds: SMD[];
}

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCustomers = async (page: number) => {
    try {
      setLoading(true);
      const response = await customerService.getCustomers(page);
      console.log(response);
      // Accessing the 'data' and 'meta' from your specific JSON structure
      setCustomers(response.data); 
      setTotalPages(response.meta.totalPages);
      setCurrentPage(response.meta.page);
    } catch (error) {
      toast.error("Failed to fetch customer data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Confirm deletion of this customer?")) return;
    
    const tid = toast.loading("Deleting...");
    try {
      await customerService.deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
      toast.success("Customer removed", { id: tid });
    } catch (error) {
      toast.error("Delete failed", { id: tid });
    }
  };

  useEffect(() => {
    fetchCustomers(1);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 animate-pulse">Loading Directory...</p>
        </div>
      ) : (
        <CustomerList 
          customers={customers} 
          onDelete={handleDelete}
          pagination={{
            current: currentPage,
            total: totalPages,
            onPageChange: (p) => fetchCustomers(p)
          }}
        />
      )}
    </div>
  );
};

export default CustomerPage;