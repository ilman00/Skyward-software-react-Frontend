import { useEffect, useState } from "react";
import EarningsTable from "../../components/Marketer/EarningTable";
// import { getMarketerEarnings } from "../../services/marketerService";

const Earnings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // getMarketerEarnings().then(setData);
  }, []);

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-bold">My Earnings</h1>
      <EarningsTable data={data} />
    </div>
  );
};

export default Earnings;