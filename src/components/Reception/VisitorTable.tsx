import React, { useState } from "react";
import { Trash2, Pencil, Save, X, Loader2, Search } from "lucide-react";
import { type Visitor, type UpdateVisitorPayload } from "../../services/ReceptionAPIs";

interface EditState {
  full_name: string;
  host_name: string;
  checked_in_at: string;
  checked_out_at: string;
}

interface VisitorTableProps {
  data: Visitor[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  search: string;
  onSearchChange: (val: string) => void;
  onPageChange: (page: number) => void;
  onUpdate: (id: string, payload: UpdateVisitorPayload) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onRetry: () => void;
}

const cellInputClass =
  "w-full px-2 py-1 text-sm bg-white border border-blue-300 rounded outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700";

const toLocalInput = (iso: string | null): string => {
  if (!iso) return "";
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const formatDisplay = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const VisitorTable: React.FC<VisitorTableProps> = ({
  data,
  loading,
  error,
  page,
  totalPages,
  search,
  onSearchChange,
  onPageChange,
  onUpdate,
  onDelete,
  onRetry,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const startEdit = (visitor: Visitor) => {
    setEditingId(visitor.visitor_id);
    setEditState({
      full_name: visitor.full_name,
      host_name: visitor.host_name ?? "",
      checked_in_at: toLocalInput(visitor.checked_in_at),
      checked_out_at: toLocalInput(visitor.checked_out_at),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditState(null);
  };

  const handleEditChange = (field: keyof EditState, value: string) => {
    setEditState((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSave = async (id: string) => {
    if (!editState) return;
    setSavingId(id);
    const payload: UpdateVisitorPayload = {
      full_name: editState.full_name || undefined,
      host_name: editState.host_name || undefined,
      checked_in_at: editState.checked_in_at
        ? new Date(editState.checked_in_at).toISOString()
        : undefined,
      checked_out_at: editState.checked_out_at
        ? new Date(editState.checked_out_at).toISOString()
        : undefined,
    };
    await onUpdate(id, payload);
    setSavingId(null);
    setEditingId(null);
    setEditState(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this visitor record?")) return;
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px]">
      {/* Table Header */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-800">Visitor Log</h2>
        <div className="relative group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
          />
          <input
            value={search}
            onChange={(e) => { onSearchChange(e.target.value); onPageChange(1); }}
            placeholder="Search by name..."
            className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
          <Loader2 className="animate-spin text-blue-500" size={28} />
          <p className="text-sm font-medium">Loading visitors...</p>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-red-500 p-6 text-center">
          <p className="font-bold">Error</p>
          <p className="text-sm">{error}</p>
          <button onClick={onRetry} className="mt-3 text-sm text-blue-600 underline">
            Try Again
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">#</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Visitor Name</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Host</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Checked In</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Checked Out</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No visitors found.
                  </td>
                </tr>
              ) : (
                data.map((visitor, idx) => {
                  const isEditing = editingId === visitor.visitor_id;
                  const isSaving = savingId === visitor.visitor_id;
                  const isDeleting = deletingId === visitor.visitor_id;

                  return (
                    <tr
                      key={visitor.visitor_id}
                      className={`transition-colors ${isEditing ? "bg-blue-50/40" : "hover:bg-slate-50"}`}
                    >
                      {/* Row number */}
                      <td className="px-6 py-3.5 text-sm text-slate-400">
                        {idx + 1}
                      </td>

                      {/* Full Name */}
                      <td className="px-6 py-3.5">
                        {isEditing ? (
                          <input
                            value={editState!.full_name}
                            onChange={(e) => handleEditChange("full_name", e.target.value)}
                            className={cellInputClass}
                          />
                        ) : (
                          <span className="font-medium text-slate-700 text-sm">{visitor.full_name}</span>
                        )}
                      </td>

                      {/* Host */}
                      <td className="px-6 py-3.5">
                        {isEditing ? (
                          <input
                            value={editState!.host_name}
                            onChange={(e) => handleEditChange("host_name", e.target.value)}
                            placeholder="Host name"
                            className={cellInputClass}
                          />
                        ) : (
                          <span className="text-slate-600 text-sm">{visitor.host_name || "—"}</span>
                        )}
                      </td>

                      {/* Checked In */}
                      <td className="px-6 py-3.5">
                        {isEditing ? (
                          <input
                            type="datetime-local"
                            value={editState!.checked_in_at}
                            onChange={(e) => handleEditChange("checked_in_at", e.target.value)}
                            className={cellInputClass}
                          />
                        ) : (
                          <span className="text-slate-500 text-sm">{formatDisplay(visitor.checked_in_at)}</span>
                        )}
                      </td>

                      {/* Checked Out */}
                      <td className="px-6 py-3.5">
                        {isEditing ? (
                          <input
                            type="datetime-local"
                            value={editState!.checked_out_at}
                            onChange={(e) => handleEditChange("checked_out_at", e.target.value)}
                            className={cellInputClass}
                          />
                        ) : (
                          <span className="text-slate-500 text-sm">{formatDisplay(visitor.checked_out_at)}</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSave(visitor.visitor_id)}
                                disabled={isSaving}
                                className="p-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all disabled:opacity-50"
                                title="Save"
                              >
                                {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                              </button>
                              <button
                                onClick={cancelEdit}
                                disabled={isSaving}
                                className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-all"
                                title="Cancel"
                              >
                                <X size={15} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(visitor)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                                title="Edit"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                onClick={() => handleDelete(visitor.visitor_id)}
                                disabled={isDeleting}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all disabled:opacity-50"
                                title="Delete"
                              >
                                {isDeleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                  page === i + 1
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorTable;