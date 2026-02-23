import React from "react";
import { Phone, Wallet, Monitor, ArrowUpRight, Trash2 } from "lucide-react";

export interface Customer {
  id: string;
  full_name: string;
  phone: string;
  total_smds: number;
  total_investment: number;
  total_commission: number;
}

interface Props {
  customers: Customer[];
  onDelete?: (id: string) => void;
  onRowClick?: (id: string) => void;
}

const CustomersTable: React.FC<Props> = ({ customers, onDelete, onRowClick }) => {
  return (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Customer Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider text-center">Active SMDs</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Financials</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onRowClick?.(c.id)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors duration-200"
                >
                  {/* Name Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {c.full_name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{c.full_name}</span>
                    </div>
                  </td>

                  {/* Phone Column */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 flex items-center gap-1.5">
                      <Phone size={14} className="text-slate-400" /> {c.phone}
                    </span>
                  </td>

                  {/* SMDs Column */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                      <Monitor size={12} /> {c.total_smds} Units
                    </span>
                  </td>

                  {/* Financials Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                        <Wallet size={14} className="text-emerald-500" />
                        PKR {c.total_investment.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                        <ArrowUpRight size={12} />
                        Comm: PKR {c.total_commission.toLocaleString()}
                      </div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(c.id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;