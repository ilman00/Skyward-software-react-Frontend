import React, { useEffect, useState } from "react";
import CustomerList from "../../components/Customers/CustomerList";
import { CustomerAPIs as customerService } from "../../services/CustomerAPIs";
import { toast } from "react-hot-toast";
import CustomerDetailModal from "../../components/Customers/CustomerDetailModel";

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
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  // 1. Add search state
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Update fetch function to accept search


  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCustomers = async (page: number, search: string = "") => {
    try {
      setLoading(true);
      // Assuming your API service is updated to accept a search param
      const response = await customerService.getCustomers(page, search);

      setCustomers(response.data);
      setTotalPages(response.meta.totalPages);
      setCurrentPage(response.meta.page);
    } catch (error) {
      toast.error("Failed to fetch customer data");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers(1, searchTerm); // Reset to page 1 on search
  };

  const handleRowClick = async (customerId: string) => {
    try {
      const res = await customerService.getCustomerById(customerId);

      console.log("API Response:", res);

      setSelectedCustomer(res.data); // ✅ FIX

      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to load customer details");
      console.error(error);
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
    <div className="min-h-screen bg-slate-50 w-full px-2 sm:px-4 lg:px-6 py-8">

      <div className="p-4 bg-white border-b flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-slate-800">Customer Directory</h1>

        <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
          <input
            type="text"
            placeholder="Search name, email, phone, CNIC or SMD ID..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={() => { setSearchTerm(""); fetchCustomers(1, ""); }}
              className="text-slate-500 hover:text-slate-700 text-sm"
            >
              Clear
            </button>
          )}
        </form>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 animate-pulse">Loading Directory...</p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-[1600px] mx-auto">
            <CustomerList
              customers={customers}
              onDelete={handleDelete}
              onRowClick={handleRowClick}
              pagination={{
                current: currentPage,
                total: totalPages,
                onPageChange: (p) => fetchCustomers(p)
              }}
            />
          </div>


          {isModalOpen && (
            <CustomerDetailModal
              customer={selectedCustomer}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedCustomer(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomerPage;