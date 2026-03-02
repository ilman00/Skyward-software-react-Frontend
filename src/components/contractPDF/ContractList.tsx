import React from "react";
import { FileText, Search, Monitor, BadgeDollarSign, Calendar, Mail, Phone, Loader2 } from "lucide-react";

export interface ApiDeal {
  deal_id: string;
  customer_name: string;
  customer_email: string;
  phone_number: string;
  city: string;
  total_amount: number;
  smd_count: number;
  created_at: string;
  created_by_name: string;
}

interface Props {
  data: ApiDeal[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onGenerateContract: (dealId: string) => void; // ← now just a string
  generatingId: string | null;                  // ← new
}

const ContractList: React.FC<Props> = ({
  data,
  isLoading,
  searchTerm,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  onGenerateContract,
  generatingId,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header & Search */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Transaction Summary</h2>
          <p className="text-sm text-slate-500">Overview of hardware deal distributions</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search deals..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Inventory Details</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Customer Profile</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Transaction Value</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Date Logged</th>
              <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-6 h-16 bg-slate-50/50"></td>
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((deal) => {
                const isGenerating = generatingId === deal.deal_id;

                return (
                  <tr key={deal.deal_id} className="hover:bg-blue-50/30 transition-colors group">
                    {/* SMD COUNT */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <Monitor size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-700">{deal.smd_count} Units</div>
                          <div className="text-[11px] text-slate-400">SMD Hardware</div>
                        </div>
                      </div>
                    </td>

                    {/* CUSTOMER DETAILS */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800">{deal.customer_name}</span>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Mail size={10} /> {deal.customer_email}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Phone size={10} /> {deal.phone_number}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* FINANCIALS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-blue-700">
                        <BadgeDollarSign size={16} />
                        <span className="font-mono font-bold">PKR {deal.total_amount.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* DATE LOGGED */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar size={14} />
                        {new Date(deal.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onGenerateContract(deal.deal_id)}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileText size={14} />
                            Generate Contract
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No deals found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractList;