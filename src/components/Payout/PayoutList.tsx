import React, { useState } from "react";
import { Search, Trash2, Calendar, Monitor, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";

/* TYPES */
interface RentPayout {
  id: string;
  customer_name: string;
  smd_code: string;
  amount: number;
  paid_by: string; // Admin or Staff name
  paid_at_month: string; // e.g., "January 2025"
}

/* MOCK DATA */
const MOCK_PAYOUTS: RentPayout[] = Array.from({ length: 22 }).map((_, i) => ({
  id: crypto.randomUUID(),
  customer_name: i % 3 === 0 ? "Global Industries" : "Retail Hub Ltd",
  smd_code: `SMD-${100 + i}`,
  amount: 45000 + (i * 100),
  paid_by: i % 2 === 0 ? "Admin (Super)" : "Sarah Staff",
  paid_at_month: i < 10 ? "January 2026" : "December 2025",
}));

const PAGE_SIZE = 8;

const RentPayoutsList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [payouts, setPayouts] = useState<RentPayout[]>(MOCK_PAYOUTS);

  /* SEARCH LOGIC (Customer Name & Payout Month) */
  const filtered = payouts.filter(p => 
    p.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    p.paid_at_month.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    if(window.confirm("Are you sure you want to delete this payout record?")) {
        setPayouts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Rent Payouts</h1>
            <p className="text-slate-500 mt-1">Record of monthly rent disbursements to customers</p>
          </div>

          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search Customer or Month (e.g. Jan)..."
              className="w-full md:w-96 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">SMD Code</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Amount Paid</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Payout Month</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Processed By</th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Customer */}
                    <td className="px-6 py-5">
                      <span className="font-semibold text-slate-700">{p.customer_name}</span>
                    </td>

                    {/* SMD Code Badge */}
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200 font-mono text-xs font-bold">
                        <Monitor size={12} /> {p.smd_code}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                        <CreditCard size={14} />
                        <span>PKR {p.amount.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Payout Month */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {p.paid_at_month}
                      </div>
                    </td>

                    {/* Paid By */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.paid_by.includes('Admin') ? 'bg-purple-400' : 'bg-blue-400'}`} />
                        <span className="text-sm font-medium text-slate-600">{p.paid_by}</span>
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">
              Showing {paginated.length} of {filtered.length} records
            </p>
            <div className="flex items-center gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all text-slate-600"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                      page === i + 1 
                        ? "bg-slate-800 text-white" 
                        : "bg-white border border-slate-200 text-slate-400 hover:border-slate-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all text-slate-600"
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