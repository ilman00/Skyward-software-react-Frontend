interface Customer {
  id: string;
  full_name: string;
  phone: string;
  total_smds: number;
  total_investment: number;
  total_commission: number;
}

const CustomersTable = ({ customers }: { customers: Customer[] }) => {
  return (
    <div className="bg-white rounded-xl shadow border overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">SMDs</th>
            <th className="p-3">Investment</th>
            <th className="p-3">Commission</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.full_name}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.total_smds}</td>
              <td className="p-3">PKR {c.total_investment}</td>
              <td className="p-3">PKR {c.total_commission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;