interface Earnings {
  id: string;
  customer_name: string;
  smd_code: string;
  commission_amount: number;
  status: string;
  created_at: string;
}

const EarningsTable = ({ data }: { data: Earnings[] }) => {
  return (
    <div className="bg-white rounded-xl shadow border overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3">Customer</th>
            <th className="p-3">SMD</th>
            <th className="p-3">Commission</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-3">{e.customer_name}</td>
              <td className="p-3">{e.smd_code}</td>
              <td className="p-3">PKR {e.commission_amount}</td>
              <td className="p-3">{e.status}</td>
              <td className="p-3">
                {new Date(e.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EarningsTable;