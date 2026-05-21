import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import CheckInForm from "../../components/Reception/CheckInForm";
import VisitorTable from "../../components/Reception/VisitorTable";
import {
  ReceptionAPIs,
  type Visitor,
  type CheckInPayload,
  type UpdateVisitorPayload,
} from "../../services/ReceptionAPIs";

const VisitorsPage: React.FC = () => {
  // Data states
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & search
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ─── Fetch ─── */
  const fetchVisitors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ReceptionAPIs.getVisitors(page, 10);
      setVisitors(response.data);
      setTotalPages(response.total_pages);
    } catch {
      setError("Failed to load visitor log. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  /* ─── Check In ─── */
  const handleCheckIn = async (payload: CheckInPayload) => {
    setIsSubmitting(true);
    try {
      await toast.promise(ReceptionAPIs.checkIn(payload), {
        loading: "Logging visitor...",
        success: "Visitor checked in!",
        error: (err) => err?.response?.data?.message || "Failed to check in visitor.",
      });
      fetchVisitors();
    } catch {
      // toast.promise handles the error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── Update ─── */
  const handleUpdate = async (id: string, payload: UpdateVisitorPayload) => {
    await toast.promise(ReceptionAPIs.updateVisitor(id, payload), {
      loading: "Saving changes...",
      success: "Visitor updated!",
      error: (err) => err?.response?.data?.message || "Failed to update visitor.",
    });
    fetchVisitors();
  };

  /* ─── Delete ─── */
  const handleDelete = async (id: string) => {
    try {
      await toast.promise(ReceptionAPIs.deleteVisitor(id), {
        loading: "Deleting...",
        success: "Visitor record deleted.",
        error: (err) => err?.response?.data?.message || "Failed to delete visitor.",
      });
      if (visitors.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        fetchVisitors();
      }
    } catch {
      // handled by toast.promise
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reception</h1>
          <p className="text-slate-500 text-sm mt-1">Log and manage walk-in visitors</p>
        </div>

        {/* Form */}
        <CheckInForm onSubmit={handleCheckIn} isSubmitting={isSubmitting} />

        {/* Table */}
        <VisitorTable
          data={visitors}
          loading={loading}
          error={error}
          page={page}
          totalPages={totalPages}
          search={search}
          onSearchChange={setSearch}
          onPageChange={setPage}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onRetry={fetchVisitors}
        />
      </div>
    </div>
  );
};

export default VisitorsPage;