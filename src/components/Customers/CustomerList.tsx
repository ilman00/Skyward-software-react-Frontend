import React from "react";
import { Trash2, Mail, MapPin, Monitor, Phone, User } from "lucide-react";
import { type Customer } from "../../pages/Customers/CustomerListPage";

interface Props {
  customers: Customer[];
  onDelete: (id: string) => void;
  pagination: {
    current: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

const CustomerList: React.FC<Props> = ({ customers, onDelete, pagination }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Customer Directory</h1>
        <p className="text-slate-500 mt-1">Real-time overview of clients and assigned SMDs</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Contact</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Purchased SMDs</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Location</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Added By</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => (
                <tr key={c.customer_id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{c.full_name}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Mail size={12} /> {c.email}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 flex items-center gap-1">
                      <Phone size={14} className="text-slate-400" /> {c.contact_number}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                      {c.smds?.map((smd) => (
                        <span 
                          key={smd.smd_id}
                          title={`${smd.title} - ${smd.status}`}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 border rounded text-[10px] font-bold uppercase ${
                            smd.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}
                        >
                          <Monitor size={10} /> {smd.smd_code}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 max-w-[200px]">
                    <div className="flex flex-col">
                        <span className="text-sm text-slate-700 font-medium">{c.city}</span>
                        <span className="text-xs text-slate-400 line-clamp-1 flex items-center gap-1">
                            <MapPin size={12} /> {c.address}
                        </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-semibold">
                      <User size={12} /> {c.created_by_name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDelete(c.customer_id)}
                      className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button 
            disabled={pagination.current === 1}
            onClick={() => pagination.onPageChange(pagination.current - 1)}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-500 font-medium">
            Page {pagination.current} of {pagination.total}
          </span>
          <button 
            disabled={pagination.current === pagination.total}
            onClick={() => pagination.onPageChange(pagination.current + 1)}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;