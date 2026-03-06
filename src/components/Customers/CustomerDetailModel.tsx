import React from "react";
import { X, Printer, Building2, Users, CreditCard, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface Props {
  customer: any;
  onClose: () => void;
}

const CustomerDetailModal: React.FC<Props> = ({ customer, onClose }) => {
  const fmt = (n: any) => Number(n || 0).toLocaleString("en-PK");
  const fmtDate = (d: any) => d ? new Date(d).toLocaleDateString("en-PK") : "-";

  const totalRentLiability = customer.smds?.reduce(
    (sum: number, smd: any) => sum + Number(smd.rent_liability || 0), 0
  ) ?? 0;

  const totalRemaining = customer.smds?.reduce(
    (sum: number, smd: any) => sum + Number(smd.remaining_balance || 0), 0
  ) ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm print:bg-transparent print:block print:fixed-none">
      <div
        className="relative w-[210mm] max-h-[95vh] overflow-y-auto bg-white rounded-xl shadow-2xl print:shadow-none print:rounded-none print:max-h-none print:overflow-visible"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >

        {/* ── SCREEN HEADER (hidden on print) ── */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-slate-200 px-8 py-4 print:hidden">
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Customer Detail Sheet</h2>
            <p className="text-xs text-slate-400 mt-0.5">SkywardVision — Confidential</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
            >
              <Printer size={15} /> Print
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── PRINTABLE CONTENT ── */}
        <div className="px-10 py-8 print:px-8 print:py-6">

          {/* Print-only letterhead */}
          <div className="hidden print:flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-800">
            <div>
              <h1 className="text-2xl font-bold tracking-widest text-slate-800 uppercase">SkywardVision</h1>
              <p className="text-xs text-slate-500 mt-1 tracking-wider uppercase">Customer Detail Sheet</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>Generated: {new Date().toLocaleDateString("en-PK")}</p>
              <p className="mt-1">Ref: {customer.customer_id?.slice(0, 8).toUpperCase()}</p>
            </div>
          </div>

          {/* ── SECTION 1: CUSTOMER INFO ── */}
          <Section title="Customer Information" icon={<Users size={15} />}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <Field label="Full Name" value={customer.full_name} />
              <Field label="Reference / Marketer" value={customer.reference} />
              <Field label="CNIC" value={customer.cnic} />
              <Field label="Email" value={customer.email} />
              <Field label="Phone" value={customer.contact_number} />
              <Field label="City" value={customer.city} />
              <Field label="Address" value={customer.address} full />
            </div>
          </Section>

          {/* ── SECTION 2: BANK ACCOUNTS ── */}
          {customer.bank_accounts?.length > 0 && (
            <Section title="Bank Accounts" icon={<CreditCard size={15} />}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <Th>Bank Name</Th>
                    <Th>Account Title</Th>
                    <Th>Account Number</Th>
                  </tr>
                </thead>
                <tbody>
                  {customer.bank_accounts.map((b: any) => (
                    <tr key={b.bank_account_id} className="border-b border-slate-200 even:bg-slate-50">
                      <Td>{b.bank_name || "-"}</Td>
                      <Td>{b.account_name || "-"}</Td>
                      <Td className="font-mono tracking-wide">{b.account_number || "-"}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {/* ── SECTION 3: HEIRS ── */}
          {customer.heirs?.length > 0 && (
            <Section title="Nominated Heirs" icon={<Users size={15} />}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <Th>Full Name</Th>
                    <Th>CNIC</Th>
                    <Th>Phone</Th>
                  </tr>
                </thead>
                <tbody>
                  {customer.heirs.map((h: any) => (
                    <tr key={h.customer_heir_id} className="border-b border-slate-200 even:bg-slate-50">
                      <Td>{h.full_name || "-"}</Td>
                      <Td className="font-mono">{h.cnic || "-"}</Td>
                      <Td>{h.phone_number || "-"}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {/* ── SECTION 4: SMD CLOSINGS ── */}
          <Section title="SMD Investments" icon={<Building2 size={15} />}>

            {/* Summary bar */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <SummaryCard
                label="Total Remaining Balance"
                value={`PKR ${fmt(totalRemaining)}`}
                color="red"
              />
              <SummaryCard
                label="Total Rent Liability"
                value={`PKR ${fmt(totalRentLiability)}`}
                color="amber"
              />
            </div>

            {customer.smds?.length === 0 && (
              <p className="text-center text-slate-400 py-6 text-sm">No SMD records found</p>
            )}

            {customer.smds?.map((smd: any) => (
              <div key={smd.smd_closing_id} className="mb-8 border border-slate-200 rounded-lg overflow-hidden print:break-inside-avoid">

                {/* SMD header bar */}
                <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold tracking-wide">{smd.smd_code}</span>
                    {smd.title && <span className="ml-2 text-slate-300 text-sm">— {smd.title}</span>}
                    {smd.city && <span className="ml-2 text-slate-400 text-xs">{smd.city}{smd.area ? `, ${smd.area}` : ""}</span>}
                  </div>
                  <StatusBadge status={smd.status} />
                </div>

                {/* SMD financial grid */}
                <div className="grid grid-cols-3 gap-0 text-sm border-b border-slate-200">
                  <MiniField label="Closing Date" value={fmtDate(smd.closing_date)} />
                  <MiniField label="Sell Price" value={`PKR ${fmt(smd.sell_price)}`} />
                  <MiniField label="Monthly Rent" value={`PKR ${fmt(smd.monthly_rent)}`} />
                  <MiniField label="Share %" value={`${smd.share_percentage ?? 100}%`} />
                  <MiniField label="Total Due" value={`PKR ${fmt(smd.total_amount_due)}`} />
                  <MiniField label="Amount Paid" value={`PKR ${fmt(smd.amount_paid)}`} />
                </div>

                {/* Balance + Liability highlight row */}
                <div className="grid grid-cols-2 border-b border-slate-200">
                  <div className="px-4 py-3 bg-red-50 border-r border-slate-200">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Remaining Balance</p>
                    <p className="text-base font-bold text-red-600 mt-0.5">PKR {fmt(smd.remaining_balance)}</p>
                  </div>
                  <div className="px-4 py-3 bg-amber-50">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Rent Liability (Unpaid Months)</p>
                    <p className="text-base font-bold text-amber-600 mt-0.5">PKR {fmt(smd.rent_liability)}</p>
                  </div>
                </div>

                {/* Unpaid months */}
                {smd.unpaid_months?.length > 0 && (
                  <div className="px-4 py-3 bg-amber-50/50 border-b border-slate-200">
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <AlertTriangle size={12} /> Unpaid Rent Months ({smd.unpaid_months.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {smd.unpaid_months.map((m: any) => (
                        <span
                          key={m.month}
                          className="px-2 py-0.5 text-xs bg-amber-100 text-amber-800 border border-amber-300 rounded font-mono"
                        >
                          {m.month}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Paid rent payouts */}
                {smd.rent_payouts?.length > 0 && (
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-green-600" /> Paid Rent History
                    </p>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <Th>Month</Th>
                          <Th>Amount</Th>
                          <Th>Paid At</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {smd.rent_payouts.map((p: any) => (
                          <tr key={p.payout_id} className="border-b border-slate-100 even:bg-slate-50">
                            <Td className="font-mono">{p.payout_month}</Td>
                            <Td>PKR {fmt(p.amount)}</Td>
                            <Td>{fmtDate(p.paid_at)}</Td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {smd.rent_payouts?.length === 0 && smd.unpaid_months?.length === 0 && (
                  <div className="px-4 py-4 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                    <Clock size={12} /> No rent history yet
                  </div>
                )}
              </div>
            ))}
          </Section>

          {/* ── FOOTER ── */}
          <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-500">
            <div>
              <p className="mb-8">Customer Signature</p>
              <div className="border-t border-slate-400 pt-1">________________________</div>
            </div>
            <div>
              <p className="mb-8">Authorized Signature</p>
              <div className="border-t border-slate-400 pt-1">________________________</div>
            </div>
            <div className="col-span-2 text-center text-slate-400 text-[10px] mt-2">
              This document is confidential and intended solely for the named customer. — SkywardVision
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;

/* ─────────────── UI HELPERS ─────────────── */

const Section = ({ title, icon, children }: any) => (
  <section className="mb-8">
    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 pb-2 border-b-2 border-slate-800">
      {icon} {title}
    </h3>
    {children}
  </section>
);

const Field = ({ label, value, full = false }: any) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
    <p className="font-semibold text-slate-800 border-b border-slate-200 pb-1">{value || "—"}</p>
  </div>
);

const MiniField = ({ label, value }: any) => (
  <div className="px-4 py-2.5 border-r border-b border-slate-200 last:border-r-0">
    <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
    <p className="font-semibold text-slate-800 text-sm mt-0.5">{value}</p>
  </div>
);

const SummaryCard = ({ label, value, color }: { label: string; value: string; color: "red" | "amber" }) => {
  const colors = {
    red: "bg-red-50 border-red-200 text-red-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
  };
  return (
    <div className={`border rounded-lg px-4 py-3 ${colors[color]}`}>
      <p className="text-[10px] uppercase tracking-wider opacity-70">{label}</p>
      <p className="text-lg font-bold mt-0.5">{value}</p>
    </div>
  );
};

const StatusBadge = ({ status }: any) => {
  const map: Record<string, string> = {
    active: "bg-green-500",
    inactive: "bg-slate-400",
    suspended: "bg-red-500",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full text-white font-medium ${map[status] ?? "bg-slate-400"}`}>
      {status}
    </span>
  );
};

const Th = ({ children }: any) => (
  <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-600 bg-slate-50">
    {children}
  </th>
);

const Td = ({ children, className = "" }: any) => (
  <td className={`border border-slate-200 px-3 py-2 text-slate-700 ${className}`}>
    {children}
  </td> 
);