import React, { useEffect, useState } from "react";
import MarketersList from "../../components/Marketer/MarketerList";
import { MarketerAPIs } from "../../services/MarketerAPIs";

export interface Marketer {
  id: string;
  full_name: string;
  email: string;
  commission_type: "Percentage" | "Fixed";
  commission_value: number;
  created_by: string;
  all_smds: string[];
}

const MarketersPage: React.FC = () => {
  const [marketers, setMarketers] = useState<Marketer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [commissionType, setCommissionType] = useState<"Fixed" | "Percentage" | "">("");

  const fetchMarketers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await MarketerAPIs.getMarketers({
        search: search || undefined,
        // Change this line below:
        commission_type: commissionType
          ? (commissionType.toLowerCase() as "fixed" | "percentage")
          : undefined,
      });

      // Fixed mapping to match your UI interface
      const mapped = (res.data || []).map((m: any) => ({
        id: m.marketer_id,
        full_name: m.full_name,
        email: m.email,
        commission_type: m.commission_type === "fixed" ? "Fixed" : "Percentage",
        commission_value: Number(m.commission_value),
        created_by: m.created_by_name || "N/A",
        all_smds: m.all_smds || [],
      }));

      setMarketers(mapped);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch marketers";
      setError(errorMessage);
      console.error("Fetch marketers error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketers();
  }, [search, commissionType]);

  const handleUpdate = async (id: string, payload: Partial<Marketer>) => {
    try {
      setError(null);
      const updatePayload: any = {};

      if (payload.commission_type) {
        updatePayload.commission_type = payload.commission_type.toLowerCase();
      }
      if (payload.commission_value !== undefined) {
        updatePayload.commission_value = payload.commission_value;
      }

      await MarketerAPIs.updateMarketer(id, updatePayload);

      // Update local state immediately for better UX
      setMarketers((prevMarketers) =>
        prevMarketers.map((m) =>
          m.id === id
            ? {
              ...m,
              commission_type: payload.commission_type || m.commission_type,
              commission_value: payload.commission_value ?? m.commission_value,
            }
            : m
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update marketer";
      setError(errorMessage);
      console.error("Update marketer error:", err);
      // Refetch to ensure UI is in sync with server
      await fetchMarketers();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      const confirmed = window.confirm(
        "Are you sure you want to delete this marketer?"
      );
      if (!confirmed) return;

      await MarketerAPIs.deleteMarketer(id);

      // Update local state immediately for better UX
      setMarketers((prevMarketers) =>
        prevMarketers.filter((m) => m.id !== id)
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete marketer";
      setError(errorMessage);
      console.error("Delete marketer error:", err);
      // Refetch to ensure UI is in sync with server
      await fetchMarketers();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">Error: {error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <MarketersList
        marketers={marketers}
        loading={loading}
        search={search}
        commissionType={commissionType}
        onSearchChange={setSearch}
        onCommissionTypeChange={setCommissionType}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MarketersPage;