import React from "react";

import MarketersList from "../../components/Marketer/MarketerList";

const MarketersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MarketersList />
    </div>
  );
};

export default MarketersPage;
