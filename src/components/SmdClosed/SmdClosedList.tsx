import React, { useState } from "react";
import { Search, Monitor, TrendingUp } from "lucide-react";

/* TYPES */
interface ClosedDeal {
  id: string;
  smd_code: string;
  customer_name: string;
  marketer_name: string | null;
  sell_price: number;
  monthly_rent: number;
  closed_by: string; // Staff member
  closed_at: string;
}

/* MOCK DATA */
const MOCK_DEALS: ClosedDeal[] = Array.from({ length: 15 }).map((_, i) => ({
  id: crypto.randomUUID(),
  smd_code: `SMD-${i + 101}`,
  customer_name: i % 2 === 0 ? "Global Industries" : "Local Retailer Co.",
  marketer_name: i % 3 === 0 ? "John Doe" : null,
  sell_price: 700000 + (i * 10000),
  monthly_rent: 45000 + (i * 500),
  closed_by: "Sarah Jenkins",
  closed_at: "2025-02-15",
}));

const PAGE_SIZE = 10;

const ClosedDealsList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = MOCK_DEALS.filter(d => 
    d.smd_code.toLowerCase().includes(search.toLowerCase()) ||
    d.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Closed SMD Deals</h1>
            <p className="text-slate-500 mt-1">Historical record of all successfully closed device sales</p>
          </div>

          <div className="relative group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by code or customer..."
              className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">SMD Code</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Broker / Marketer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Sell Price</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Rent</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Closed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((deal) => (
                  <tr key={deal.id} className="hover:bg-blue-50/30 transition-colors">
                    {/* SMD Code Badge */}
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                        <Monitor size={14} className="text-blue-500" />
                        <span className="font-mono font-bold text-sm">{deal.smd_code}</span>
                      </div>
                    </td>

                    {/* Customer Name */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700">{deal.customer_name}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight mt-0.5">Verified Client</span>
                      </div>
                    </td>

                    {/* Marketer Name */}
                    <td className="px-6 py-5">
                      {deal.marketer_name ? (
                        <div className="flex items-center gap-2 text-slate-600">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                            {deal.marketer_name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{deal.marketer_name}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 italic">Direct Sale</span>
                      )}
                    </td>

                    {/* Sell Price */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">PKR {deal.sell_price.toLocaleString()}</span>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase">One-time Payment</span>
                      </div>
                    </td>

                    {/* Monthly Rent */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                        <TrendingUp size={14} className="text-emerald-500" />
                        <span>PKR {deal.monthly_rent.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Closed By Staff */}
                    <td className="px-6 py-5 text-right">
                      <div className="inline-flex flex-col items-end">
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                           {deal.closed_by}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 font-medium italic">
                          Closed on {deal.closed_at}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-700">{paginated.length}</span> of <span className="font-semibold text-slate-700">{filtered.length}</span> deals
            </div>
            <div className="flex gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all"
              >
                Prev
              </button>
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedDealsList;