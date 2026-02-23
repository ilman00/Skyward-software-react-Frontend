import { Monitor, CreditCard, Calendar, User, CheckCircle2, Clock } from "lucide-react";

interface Earnings {
  id: string;
  customer_name: string;
  smd_code: string;
  commission_amount: number;
  status: string;
  created_at: string;
}

const EarningsTable = ({ data }: { data: Earnings[] }) => {
  // Helper to style the status badges
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "failed":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Source Details</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider text-center">SMD Reference</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Earnings</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Payout Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/80 transition-colors duration-200">
                  {/* Customer Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                        <User size={16} />
                      </div>
                      <span className="font-bold text-slate-800">{e.customer_name}</span>
                    </div>
                  </td>

                  {/* SMD Code */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      <Monitor size={12} /> {e.smd_code}
                    </span>
                  </td>

                  {/* Commission Amount */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <CreditCard size={14} className="text-slate-400" />
                      PKR {e.commission_amount.toLocaleString()}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[11px] font-bold uppercase ${getStatusStyle(e.status)}`}>
                      {e.status.toLowerCase() === 'paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {e.status}
                    </span>
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(e.created_at).toLocaleDateString('en-PK', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsTable;