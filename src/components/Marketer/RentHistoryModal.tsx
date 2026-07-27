import React, { useEffect, useState } from "react";
import { X, Loader, Calendar } from "lucide-react";
import { MarketerAPIs } from "../../services/MarketerAPIs";

interface RentPayout {
  payout_id: string;
  payout_month: string;
  amount: number;
  status: string;
  paid_at: string | null;
}

interface Props {
  smdClosingId: string;
  smdCode: string;
  onClose: () => void;
}

const RentHistoryModal: React.FC<Props> = ({ smdClosingId, smdCode, onClose }) => {
  const [payouts, setPayouts] = useState<RentPayout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await MarketerAPIs.getSmdRentHistory(smdClosingId);
        setPayouts(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [smdClosingId]);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">
            Rent History — {smdCode}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="p-8 flex items-center justify-center gap-2 text-slate-500">
              <Loader className="w-4 h-4 animate-spin" />
              Loading...
            </div>
          ) : payouts.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No rent payments recorded yet.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 border-b border-slate-100 sticky top-0 bg-white">
                  <th className="px-6 py-3">Month</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Paid At</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.payout_id} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-3 text-sm text-slate-700 flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-400" />
                      {p.payout_month}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">
                      Rs. {p.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          p.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-500">
                      {p.paid_at ? new Date(p.paid_at).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentHistoryModal;