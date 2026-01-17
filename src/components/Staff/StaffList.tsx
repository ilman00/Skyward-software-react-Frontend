import React, { useState } from "react";
import { Edit2, Trash2, Save, X, ShieldCheck, Search, Mail, UserCircle } from "lucide-react";

/* TYPES */
type UserRole = "admin" | "staff" | "marketer" | "customer";

interface StaffMember {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
}

/* MOCK DATA */
const MOCK_STAFF: StaffMember[] = [
  { id: "1", full_name: "Sarah Jenkins", email: "sarah@company.com", role: "admin" },
  { id: "2", full_name: "Ali Khan", email: "ali.k@company.com", role: "staff" },
  { id: "3", full_name: "John Doe", email: "john.marketer@gmail.com", role: "marketer" },
  { id: "4", full_name: "Emma Wilson", email: "emma.w@client.com", role: "customer" },
];

const PAGE_SIZE = 8;

const StaffList: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ full_name: "", role: "" as UserRole });

  /* SEARCH LOGIC */
  const filtered = staff.filter(s => 
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleStartEdit = (s: StaffMember) => {
    setEditingId(s.id);
    setEditForm({ full_name: s.full_name, role: s.role });
  };

  const handleSave = (id: string) => {
    setStaff(prev => prev.map(s => 
      s.id === id ? { ...s, ...editForm } : s
    ));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-500 mt-1">Manage staff roles and access permissions</p>
          </div>

          <div className="relative group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, email, or role..."
              className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-[11px]">Full Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-[11px]">Email Address</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-[11px]">Assigned Role</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 text-[11px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((s) => {
                  const isEditing = editingId === s.id;
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors h-[72px]">
                      
                      {/* Name (Editable) */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div className="relative w-full max-w-[200px]">
                            <UserCircle size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              value={editForm.full_name}
                              onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 text-sm border border-blue-300 rounded-lg outline-none ring-4 ring-blue-50 transition-all"
                            />
                          </div>
                        ) : (
                          <span className="font-semibold text-slate-700">{s.full_name}</span>
                        )}
                      </td>

                      {/* Email (Read Only) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Mail size={14} className="text-slate-300" />
                          {s.email}
                        </div>
                      </td>

                      {/* Role (Editable Select) */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editForm.role}
                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value as UserRole })}
                            className="w-40 border border-blue-300 rounded-lg px-3 py-2 text-sm outline-none ring-4 ring-blue-50 bg-white"
                          >
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="marketer">Marketer</option>
                            <option value="customer">Customer</option>
                          </select>
                        ) : (
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-tight
                            ${s.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                              s.role === 'staff' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                              s.role === 'marketer' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                              'bg-slate-50 text-slate-600 border-slate-200'}
                          `}>
                            <ShieldCheck size={12} />
                            {s.role}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button onClick={() => handleSave(s.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Save size={18} /></button>
                              <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"><X size={18} /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleStartEdit(s)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={18} /></button>
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
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => { setPage(i + 1); setEditingId(null); }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    page === i + 1 ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border border-slate-200 text-slate-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
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

export default StaffList;