import React from "react";
import { Search, Monitor, TrendingUp, User, MapPin, Calendar } from "lucide-react";
import { type ClosedDeal } from "../../pages/SmdClosed/SmdClosedPage";

interface Props {
  deals: ClosedDeal[];
  loading: boolean;
  search: string;
  onSearchChange: (val: string) => void;
  pagination: {
    current: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

const ClosedDealsList: React.FC<Props> = ({ deals, loading, search, onSearchChange, pagination }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Closed SMD Deals</h1>
        <p className="text-slate-500 mt-1">Full history of sales and rental agreements</p>
      </header>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by code or customer..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">SMD & Location</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Customer Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Financials</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Closing Info</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 relative">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 animate-pulse">Updating records...</td>
                </tr>
              ) : deals.length > 0 ? (
                deals.map((deal) => (
                  <tr key={deal.smd_closing_id} className="hover:bg-slate-50/80 transition-colors">
                    {/* SMD & Location */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 w-fit">
                          <Monitor size={12} />
                          <span className="font-mono font-bold text-xs">{deal.smd_code}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{deal.city}</span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin size={10} /> {deal.area}
                        </span>
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{deal.customer_name}</span>
                        <span className="text-xs text-slate-500">{deal.customer_email}</span>
                        <span className="text-[11px] text-slate-400 mt-1">{deal.contact_number}</span>
                      </div>
                    </td>

                    {/* Financials */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <div className="text-sm font-bold text-slate-800">
                          PKR {deal.sell_price.toLocaleString()}
                          <span className="text-[10px] text-slate-400 font-normal ml-1">(Sale)</span>
                        </div>
                        <div className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                          <TrendingUp size={12} />
                          PKR {deal.monthly_rent.toLocaleString()}
                          <span className="text-[10px] text-emerald-500/70 font-normal">(Rent)</span>
                        </div>
                      </div>
                    </td>

                    {/* Closing Info */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <User size={12} className="text-slate-400" /> {deal.closed_by_name}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Calendar size={10} /> {new Date(deal.closed_at).toLocaleDateString()}
                        </span>
                        {deal.marketer_name && (
                           <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded w-fit">
                             Via {deal.marketer_name}
                           </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        deal.closing_status === 'active' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-slate-100 text-slate-500'
                      }`}>
                        {deal.closing_status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400">No records found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Page {pagination.current} of {pagination.total}
          </span>
          <div className="flex gap-2">
            <button 
              disabled={pagination.current === 1 || loading}
              onClick={() => pagination.onPageChange(pagination.current - 1)}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <button 
              disabled={pagination.current === pagination.total || loading}
              onClick={() => pagination.onPageChange(pagination.current + 1)}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedDealsList;