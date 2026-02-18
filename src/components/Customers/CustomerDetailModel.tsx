import React from "react";
import { X, Printer } from "lucide-react";

interface Props {
  customer: any;
  onClose: () => void;
}

const CustomerDetailModal: React.FC<Props> = ({ customer, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[210mm] max-h-[95vh] overflow-y-auto bg-white rounded-lg shadow-xl p-8 print:p-0 print:shadow-none print:rounded-none">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 print:hidden">
          <h2 className="text-xl font-bold text-slate-800">
            Customer Detail Sheet
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Printer size={16} /> Print
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Title for Print */}
        <h1 className="hidden print:block text-center text-2xl font-bold mb-6">
          Customer Detail Sheet
        </h1>

        {/* CUSTOMER INFO */}
        <Section title="Customer Information">
          <Grid>
            <Field label="Full Name" value={customer.full_name} />
            <Field label="Reference" value={customer.reference} />
            <Field label="CNIC" value={customer.cnic} />
            <Field label="Email" value={customer.email} />
            <Field label="Phone" value={customer.contact_number} />
            <Field label="City" value={customer.city} />
            <Field label="Address" value={customer.address} full />
          </Grid>
        </Section>

        {/* SMD DETAILS */}
        <Section title="SMD Details">
          <table className="w-full border border-slate-300 text-sm">
            <thead className="bg-slate-100">
              <tr>
                <Th>SMD Code</Th>
                <Th>Closing Date</Th>
                <Th>Sell Price</Th>
                <Th>Monthly Rent</Th>
                <Th>Total Due</Th>
                <Th>Paid</Th>
                <Th>Remaining</Th>
              </tr>
            </thead>

            <tbody>
              {customer.smds?.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-slate-500">
                    No SMD records found
                  </td>
                </tr>
              )}

              {customer.smds?.map((smd: any) => (
                <React.Fragment key={smd.smd_closing_id}>
                  <tr className="border-t">
                    <Td>{smd.smd_code}</Td>
                    <Td>
                      {smd.closing_date
                        ? new Date(smd.closing_date).toLocaleDateString()
                        : "-"}
                    </Td>
                    <Td>{Number(smd.sell_price).toLocaleString()}</Td>
                    <Td>{Number(smd.monthly_rent).toLocaleString()}</Td>
                    <Td>{Number(smd.total_amount_due).toLocaleString()}</Td>
                    <Td>{Number(smd.amount_paid).toLocaleString()}</Td>
                    <Td className="font-semibold text-red-600">
                      {Number(smd.remaining_balance).toLocaleString()}
                    </Td>
                  </tr>

                  {/* RENT PAYOUTS */}
                  {smd.rent_payouts?.length > 0 && (
                    <tr className="bg-slate-50">
                      <td colSpan={7} className="p-3">
                        <p className="font-semibold mb-2">Rent Payouts</p>

                        <table className="w-full text-xs border">
                          <thead className="bg-slate-100">
                            <tr>
                              <Th>Month</Th>
                              <Th>Amount</Th>
                              <Th>Status</Th>
                              <Th>Paid At</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {smd.rent_payouts.map((p: any) => (
                              <tr key={p.payout_id}>
                                <Td>{p.payout_month}</Td>
                                <Td>{Number(p.amount).toLocaleString()}</Td>
                                <Td>{p.status}</Td>
                                <Td>
                                  {p.paid_at
                                    ? new Date(p.paid_at).toLocaleDateString()
                                    : "-"}
                                </Td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </Section>

        {/* FOOTER */}
        <div className="mt-10 flex justify-between text-xs text-slate-500 print:mt-16">
          <div>
            <p>Authorized Signature: ________________________</p>
          </div>
          <div>
            <p>Date: ________________________</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDetailModal;

/* ---------- UI HELPERS ---------- */

const Section = ({ title, children }: any) => (
  <section className="mb-8">
    <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
      {title}
    </h3>
    {children}
  </section>
);

const Grid = ({ children }: any) => (
  <div className="grid grid-cols-2 gap-4 text-sm">
    {children}
  </div>
);

const Field = ({ label, value, full = false }: any) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="text-slate-500">{label}</p>
    <p className="font-semibold border-b border-slate-300 pb-1">
      {value || "-"}
    </p>
  </div>
);

const Th = ({ children }: any) => (
  <th className="border border-slate-300 px-3 py-2 text-left font-semibold">
    {children}
  </th>
);

const Td = ({ children, className = "" }: any) => (
  <td className={`border border-slate-300 px-3 py-2 ${className}`}>
    {children}
  </td>
);
