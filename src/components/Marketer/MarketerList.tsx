import React, { useState } from "react";
import { Edit2, Trash2, Save, X, UserCheck, Percent, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";

/* TYPES & MOCK DATA */
interface Marketer {
    id: string;
    full_name: string;
    all_smds: string[];
    commission_type: "Percentage" | "Fixed";
    commission_value: number;
    created_by: string;
}

// Generating 25 mock marketers to demonstrate pagination
const MOCK_MARKETERS: Marketer[] = Array.from({ length: 25 }).map((_, i) => ({
    id: (i + 1).toString(),
    full_name: `Marketer ${i + 1}`,
    all_smds: [`SMD-${i + 1}`, `SMD-${i + 10}`],
    commission_type: i % 2 === 0 ? "Percentage" : "Fixed",
    commission_value: i % 2 === 0 ? 10 : 5000,
    created_by: "Admin",
}));

const PAGE_SIZE = 8;

const MarketersList: React.FC = () => {
    const [marketers, setMarketers] = useState<Marketer[]>(MOCK_MARKETERS);
    const [page, setPage] = useState(1);
    
    // Inline Edit State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Marketer>>({});

    /* PAGINATION LOGIC */
    const totalPages = Math.ceil(marketers.length / PAGE_SIZE);
    const paginatedData = marketers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setEditingId(null); // Reset editing when moving between pages
    };

    const handleStartEdit = (m: Marketer) => {
        setEditingId(m.id);
        setEditForm({ 
            commission_type: m.commission_type, 
            commission_value: m.commission_value 
        });
    };

    const handleSave = (id: string) => {
        setMarketers(prev => prev.map(m => 
            m.id === id ? { ...m, ...editForm } as Marketer : m
        ));
        setEditingId(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Marketers & Brokers</h1>
                        <p className="text-slate-500 mt-1">Manage broker commissions and assigned devices</p>
                    </div>
                    <div className="text-sm font-medium text-slate-400">
                        Total Records: {marketers.length}
                    </div>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Full Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Assigned SMDs</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Comm. Type</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Comm. Value</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Created By</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedData.map((m) => {
                                    const isEditing = editingId === m.id;
                                    return (
                                        <tr key={m.id} className="hover:bg-slate-50/50 transition-colors h-[72px]">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-200">
                                                        {m.full_name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-slate-700">{m.full_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {m.all_smds.map(code => (
                                                        <span key={code} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold border border-blue-100">
                                                            {code}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {isEditing ? (
                                                    <select
                                                        value={editForm.commission_type}
                                                        onChange={(e) => setEditForm({...editForm, commission_type: e.target.value as any})}
                                                        className="w-full border border-blue-300 rounded-lg px-2 py-1.5 text-sm outline-none ring-4 ring-blue-50"
                                                    >
                                                        <option value="Percentage">Percentage</option>
                                                        <option value="Fixed">Fixed</option>
                                                    </select>
                                                ) : (
                                                    <span className={`inline-flex items-center gap-1 text-sm font-medium ${m.commission_type === 'Percentage' ? 'text-indigo-600' : 'text-emerald-600'}`}>
                                                        {m.commission_type === 'Percentage' ? <Percent size={14}/> : <DollarSign size={14}/>}
                                                        {m.commission_type}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {isEditing ? (
                                                    <input
                                                        type="number"
                                                        value={editForm.commission_value}
                                                        onChange={(e) => setEditForm({...editForm, commission_value: Number(e.target.value)})}
                                                        className="w-24 border border-blue-300 rounded-lg px-2 py-1.5 text-sm outline-none ring-4 ring-blue-50"
                                                    />
                                                ) : (
                                                    <span className="font-mono font-semibold text-slate-700">
                                                        {m.commission_type === 'Percentage' ? `${m.commission_value}%` : `${m.commission_value.toLocaleString()}`}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                                                    <UserCheck size={14} /> {m.created_by}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {isEditing ? (
                                                        <>
                                                            <button onClick={() => handleSave(m.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Save size={18} /></button>
                                                            <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"><X size={18} /></button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => handleStartEdit(m)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={18} /></button>
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

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                        <button 
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={16} /> Previous
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                                        page === i + 1
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                            : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button 
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketersList;