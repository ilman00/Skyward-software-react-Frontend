import { useEffect, useState } from "react";
import CustomersTable from "../../components/Marketer/CustomersTable";
// import { getMarketerCustomers } from "../../services/marketerService";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // getMarketerCustomers().then(setCustomers);
  }, []);

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-bold">My Clients</h1>
      <CustomersTable customers={customers} />
    </div>
  );
};

export default Customers;