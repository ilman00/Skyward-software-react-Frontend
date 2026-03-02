import React, { useEffect, useState, useCallback } from "react";
import { contractAPI } from "../../services/ContractAPIs";
import { toast } from "react-hot-toast";
import DealsSummaryTable, { type ApiDeal } from "../../components/contractPDF/ContractList";

const SmdContractPage: React.FC = () => {
  const [deals, setDeals] = useState<ApiDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await contractAPI.getContracts({ page, limit: 10, search });
      setDeals(response.data);
      setTotalPages(Math.ceil(response.total / response.limit) || 1);
    } catch (error) {
      toast.error("Failed to load records");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

 const handleGenerateContract = async (dealId: string) => {
  try {
    setGeneratingId(dealId);

    const blob = await contractAPI.generateContractPDF(dealId);

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");

    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch (error) {
    toast.error("Failed to generate contract PDF");
  } finally {
    setGeneratingId(null);
  }
};

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-black text-slate-900">Inventory Contracts</h1>
          <p className="text-slate-500">Manage hardware legal agreements.</p>
        </header>

        <DealsSummaryTable
          data={deals}
          isLoading={loading}
          searchTerm={search}
          onSearchChange={(val) => { setSearch(val); setPage(1); }}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
          onGenerateContract={handleGenerateContract}
          generatingId={generatingId}
        />
      </div>
    </div>
  );
};

export default SmdContractPage;