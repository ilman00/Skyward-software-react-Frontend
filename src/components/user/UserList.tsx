import React, { useState } from "react";
import { 
  Search, Trash, UserCircle, ChevronLeft, ChevronRight, 
  Loader2, Edit2, X, Save 
} from "lucide-react";

export interface ClientMember {
  user_id: string;
  full_name: string;
  email: string;
  roles: { is_marketer: boolean; is_customer: boolean };
  marketer: { status: string; commission_value: number } | null;
  customer: { status: string; city: string } | null;
}

interface UserListProps {
  title: string;
  description: string;
  data: ClientMember[];
  loading: boolean;
  onUpdate: (id: string, payload: any) => void;
  onDelete: (id: string) => void;
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearchChange: (val: string) => void;
}

const PAGE_SIZE = 8;

const UserList: React.FC<UserListProps> = ({ 
  title, 
  description, 
  data = [], 
  loading, 
  onUpdate,
  onDelete, 
  total = 0, 
  currentPage, 
  onPageChange, 
  onSearchChange 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    status: "active",
    is_marketer: false,
    is_customer: false
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleStartEdit = (u: ClientMember) => {
    setEditingId(u.user_id);
    // Grab status from whichever role exists
    const currentStatus = u.marketer?.status || u.customer?.status || "active";
    setEditForm({
      status: currentStatus,
      is_marketer: u.roles.is_marketer,
      is_customer: u.roles.is_customer
    });
  };

  const handleSave = (id: string) => {
    onUpdate(id, editForm);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="text-slate-500 mt-1">{description}</p>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              className="pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 w-full md:w-80 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all bg-white"
              placeholder="Search participants..."
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          )}

          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-tight text-slate-500">Participant</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-tight text-slate-500">Roles</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-tight text-slate-500">Status</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-tight text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.length > 0 ? data.map((u) => {
                const isEditing = editingId === u.user_id;
                const activeStatus = u.marketer?.status || u.customer?.status || "active";

                return (
                  <tr key={u.user_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <UserCircle className="text-slate-200" size={36} />
                      <div>
                        <div className="font-semibold text-slate-700">{u.full_name}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <div className="flex gap-3">
                           <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                              <input 
                                type="checkbox" 
                                checked={editForm.is_marketer}
                                onChange={(e) => setEditForm({...editForm, is_marketer: e.target.checked})}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              /> Marketer
                           </label>
                           <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                              <input 
                                type="checkbox" 
                                checked={editForm.is_customer}
                                onChange={(e) => setEditForm({...editForm, is_customer: e.target.checked})}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              /> Customer
                           </label>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          {u.roles.is_marketer && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-100">
                              Marketer
                            </span>
                          )}
                          {u.roles.is_customer && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-50 text-purple-700 border border-purple-100">
                              Customer
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <select 
                          value={editForm.status}
                          onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                          className="text-xs border border-blue-200 rounded-md px-2 py-1 outline-none ring-2 ring-blue-50"
                        >
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      ) : (
                        <span className={`text-[10px] font-bold uppercase tracking-wide ${activeStatus === 'active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {activeStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        {isEditing ? (
                          <>
                            <button onClick={() => handleSave(u.user_id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors">
                              <Save size={18}/>
                            </button>
                            <button onClick={() => setEditingId(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors">
                              <X size={18}/>
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleStartEdit(u)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                              <Edit2 size={18}/>
                            </button>
                            <button onClick={() => onDelete(u.user_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                              <Trash size={18}/>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400">No participants found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Footer - FULLY PRESERVED */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">
              Total Results: <span className="text-slate-900">{total}</span>
            </span>
            <div className="flex gap-2 items-center">
              <span className="text-xs text-slate-400 mr-2 uppercase font-bold">Page {currentPage} of {totalPages || 1}</span>
              <button 
                disabled={currentPage === 1 || loading}
                onClick={() => onPageChange(currentPage - 1)}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                disabled={currentPage >= totalPages || loading}
                onClick={() => onPageChange(currentPage + 1)}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;