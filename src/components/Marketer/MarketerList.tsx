import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  Save,
  X,
  Percent,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader,
} from "lucide-react";

// FIXED: Path updated to match your file structure
import { type Marketer } from "../../pages/Marketers/MarketerListPage"

const PAGE_SIZE = 8;

interface Props {
  marketers: Marketer[];
  loading: boolean;
  search: string;
  commissionType: "Fixed" | "Percentage" | "";
  onSearchChange: (val: string) => void;
  onCommissionTypeChange: (val: "Fixed" | "Percentage" | "") => void;
  onUpdate: (id: string, payload: Partial<Marketer>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const MarketersList: React.FC<Props> = ({
  marketers,
  loading,
  search,
  commissionType,
  onSearchChange,
  onCommissionTypeChange,
  onUpdate,
  onDelete,
}) => {
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Marketer>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(marketers.length / PAGE_SIZE));
  const paginatedData = marketers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleSave = async (id: string) => {
    try {
      setSavingId(id);
      await onUpdate(id, editForm);
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-slate-200">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Marketers & Brokers
        </h2>
        <p className="text-sm text-slate-600">
          Manage broker commissions and assigned devices
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      {/* FILTERS */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Commission Type
          </label>
          <select
            value={commissionType}
            onChange={(e) => {
              onCommissionTypeChange(e.target.value as "Fixed" | "Percentage" | "");
              setPage(1);
            }}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          >
            <option value="">All Types</option>
            <option value="Percentage">Percentage</option>
            <option value="Fixed">Fixed</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-slate-50 rounded-lg border border-slate-200">
        {loading ? (
          <div className="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            Loading marketers...
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No marketers found
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Commission Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Commission Value
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((m, index) => {
                const isEditing = editingId === m.id;
                const isSaving = savingId === m.id;
                const isDeleting = deletingId === m.id;

                return (
                  <tr
                    key={m.id}
                    className={`border-b border-slate-200 hover:bg-slate-100 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } ${isDeleting ? "opacity-50" : ""}`}
                  >
                    <td className="px-6 py-3 text-sm text-slate-800">
                      {m.full_name}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-600">
                      {m.email}
                    </td>
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <select
                          value={editForm.commission_type || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              commission_type: e.target.value as any,
                            })
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="">Select Type</option>
                          <option value="Percentage">Percentage</option>
                          <option value="Fixed">Fixed</option>
                        </select>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          {m.commission_type === "Percentage" ? (
                            <Percent className="w-4 h-4 text-blue-500" />
                          ) : (
                            <DollarSign className="w-4 h-4 text-green-500" />
                          )}
                          {m.commission_type}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.commission_value ?? ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              commission_value: Number(e.target.value),
                            })
                          }
                          className="border rounded px-2 py-1 w-24 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-slate-800">
                          {m.commission_value}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-600">
                      {m.created_by}
                    </td>
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(m.id)}
                            disabled={isSaving}
                            className="mr-2 p-1 hover:bg-green-100 rounded transition-colors disabled:opacity-50"
                            title="Save"
                          >
                            {isSaving ? (
                              <Loader className="w-4 h-4 animate-spin text-green-600" />
                            ) : (
                              <Save className="w-4 h-4 text-green-600" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditForm({});
                            }}
                            disabled={isSaving}
                            className="p-1 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                            title="Cancel"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(m.id);
                              setEditForm(m); // FIXED: Initializes the form with current values
                            }}
                            disabled={isDeleting}
                            className="mr-4 p-1 hover:bg-blue-100 rounded transition-colors disabled:opacity-50"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(m.id)}
                            disabled={isDeleting}
                            className="p-1 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {isDeleting ? (
                              <Loader className="w-4 h-4 animate-spin text-red-600" />
                            ) : (
                              <Trash2 className="w-4 h-4 text-red-600" />
                            )}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-slate-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketersList;