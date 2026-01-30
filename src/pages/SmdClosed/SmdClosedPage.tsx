import React, { useEffect, useState, useCallback } from "react";
import ClosedDealsList from "../../components/SmdClosed/SmdClosedList";
import { dealService as smdService} from "../../services/SmdAPIs";
import { toast } from "react-hot-toast";

/* ALIGNED INTERFACE */
export interface ClosedDeal {
  smd_closing_id: string;
  closing_status: string;
  sell_price: number;
  monthly_rent: number;
  closed_at: string;
  smd_code: string;
  city: string;
  area: string;
  customer_name: string;
  customer_email: string;
  contact_number: string;
  marketer_name: string | null;
  closed_by_name: string;
}

const SmdClosedPage: React.FC = () => {
  const [deals, setDeals] = useState<ClosedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      // API call with query params
      const response = await smdService.getClosedDeals({
        page,
        search: search        
      });

      // Mapping response from the 'data' property
      setDeals(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching closed deals");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return (
    <div className="min-h-screen bg-slate-50">
      <ClosedDealsList
        deals={deals}
        loading={loading}
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        pagination={{
          current: page,
          total: totalPages,
          onPageChange: (p) => setPage(p),
        }}
      />
    </div>
  );
};

export default SmdClosedPage;