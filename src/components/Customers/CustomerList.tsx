import React, { useState } from "react";
import { Edit2, Trash2, Save, X, Phone, UserPlus, Mail, MapPin, Monitor } from "lucide-react";

/* TYPES */
interface Customer {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  purchased_smds: string[]; // Added this field
  created_by: string;
}

/* MOCK DATA */
const MOCK_CUSTOMERS: Customer[] = Array.from({ length: 20 }).map((_, i) => ({
  id: crypto.randomUUID(),
  full_name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  contact_number: `+92-300-${1234567 + i}`,
  address: `${i + 10}th Street, Industrial Area, Karachi`,
  purchased_smds: [`SMD-${i + 1}`, `SMD-${i + 100}`], // Mock purchased devices
  created_by: i % 3 === 0 ? "Admin" : "Sales_Manager",
}));

const PAGE_SIZE = 8;

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ contact_number: "", created_by: "" });

  const totalPages = Math.ceil(customers.length / PAGE_SIZE);
  const paginatedData = customers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleStartEdit = (c: Customer) => {
    setEditingId(c.id);
    setEditForm({ 
      contact_number: c.contact_number, 
      created_by: c.created_by 
    });
  };

  const handleSave = (id: string) => {
    setCustomers(prev => prev.map(c => 
      c.id === id ? { ...c, ...editForm } : c
    ));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Customer Directory</h1>
          <p className="text-slate-500 mt-1">Manage client contact details and account owners</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Contact Info</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Purchased Devices</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Address</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Created By</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.map((c) => {
                  const isEditing = editingId === c.id;
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors h-[80px]">
                      {/* Full Name & Email */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800">{c.full_name}</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Mail size={12} /> {c.email}
                          </span>
                        </div>
                      </td>

                      {/* Contact Number (Editable) */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div className="relative w-44">
                            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              value={editForm.contact_number}
                              onChange={(e) => setEditForm({ ...editForm, contact_number: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 text-sm border border-blue-300 rounded-lg outline-none ring-4 ring-blue-50 focus:border-blue-500 transition-all"
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-slate-600 font-medium">{c.contact_number}</span>
                        )}
                      </td>

                      {/* Purchased SMDs (Tags) */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                          {c.purchased_smds.map((smd) => (
                            <span 
                                key={smd} 
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-bold uppercase"
                            >
                              <Monitor size={10} /> {smd}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4 max-w-[200px]">
                        <span className="text-sm text-slate-500 line-clamp-1 flex items-center gap-1">
                          <MapPin size={14} className="shrink-0 text-slate-300" /> {c.address}
                        </span>
                      </td>

                      {/* Created By (Editable) */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div className="relative w-36">
                            <UserPlus size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              value={editForm.created_by}
                              onChange={(e) => setEditForm({ ...editForm, created_by: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 text-sm border border-blue-300 rounded-lg outline-none ring-4 ring-blue-50 focus:border-blue-500 transition-all"
                            />
                          </div>
                        ) : (
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-bold uppercase">
                            {c.created_by}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          {isEditing ? (
                            <>
                              <button onClick={() => handleSave(c.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Save size={18} /></button>
                              <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"><X size={18} /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleStartEdit(c)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={18} /></button>
                              <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button 
              disabled={page === 1}
              onClick={() => { setPage(page - 1); setEditingId(null); }}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <div className="text-sm font-medium text-slate-500">
                Page {page} of {totalPages}
            </div>
            <button 
              disabled={page === totalPages}
              onClick={() => { setPage(page + 1); setEditingId(null); }}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;