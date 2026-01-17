import React, { useState } from "react";
import { Trash2, Search, MapPin, DollarSign, Calendar } from "lucide-react";
import SmdDetailsModal from "./SmdDetailsModal";
import { type SmdTableItem } from "../../types/smd.types";

const MOCK_DATA: SmdTableItem[] = Array.from({ length: 25 }).map((_, i) => ({
    smd_id: crypto.randomUUID(),
    smd_code: `SMD-${i + 1}`,
    title: `Main Road Location ${i + 1}`,
    purchase_price: 500000 + i * 15000,
    installed_at: "2025-01-10",
}));

const PAGE_SIZE = 10;

const SmdList: React.FC = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedSmdId, setSelectedSmdId] = useState<string | null>(null);

    const filtered = MOCK_DATA.filter((smd) =>
        smd.smd_code.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            SMD Inventory
                        </h1>
                        <p className="text-slate-500 mt-1">Manage and track street measurement devices</p>
                    </div>

                    <div className="relative group">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search by code..."
                            className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-2">Code</div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-2"><MapPin size={14} /> Title</div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-2"><DollarSign size={14} /> Price</div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-2"><Calendar size={14} /> Installed</div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {paginated.map((smd) => (
                                    <tr
                                        key={smd.smd_id}
                                        onClick={() => setSelectedSmdId(smd.smd_id)}
                                        className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                {smd.smd_code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">
                                            {smd.title || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            PKR {smd.purchase_price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-sm">
                                            {smd.installed_at}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); alert("Delete Logic"); }}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Showing page {page} of {totalPages}
                            </p>
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setPage(i + 1)}
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
            </div>

            {selectedSmdId && (
                <SmdDetailsModal
                    smdId={selectedSmdId}
                    onClose={() => setSelectedSmdId(null)}
                />
            )}
        </div>
    );
};

export default SmdList;