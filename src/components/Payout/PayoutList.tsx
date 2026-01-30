import React, { useState } from "react";
import { Search, Calendar, Monitor, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";

interface RentPayout {
  payout_id: string;
  payout_month: string;
  amount: string | number;
  status: string;
  customer_name: string;
  customer_email: string;
  smd_code: string;
  smd_title: string;
  paid_by_name: string;
}

interface Props {
  data: RentPayout[];
  isLoading: boolean;
  refreshData: () => void;
  onDelete?: (id: string) => void;
}

const PAGE_SIZE = 8;

const RentPayoutsList: React.FC<Props> = ({ data, isLoading, refreshData, onDelete }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = data.filter(p =>
    p.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    p.smd_code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


  const confirmDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) {
      onDelete?.(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
        <p className="text-slate-500 font-medium">Fetching payout records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Rent Payouts</h1>
            <p className="text-slate-500 mt-1">Total {data.length} records found</p>
          </div>

          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search customer or SMD code..."
              className="w-full md:w-96 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">SMD Details</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Month</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Processed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((p) => (
                  <tr key={p.payout_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700">{p.customer_name}</span>
                        <span className="text-xs text-slate-400">{p.customer_email}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 font-mono text-[10px] font-bold w-fit">
                          <Monitor size={10} /> {p.smd_code}
                        </div>
                        <span className="text-xs text-slate-500 truncate max-w-[150px]">{p.smd_title}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                        <CreditCard size={14} />
                        <span>PKR {Number(p.amount).toLocaleString()}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {new Date(p.payout_month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        <span className="text-sm font-medium text-slate-600">{p.paid_by_name}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {paginated.length} of {filtered.length} records
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPayoutsList;