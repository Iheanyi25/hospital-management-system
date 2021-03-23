import React from "react";
import TableSize from "../../../../Components/DataTable/TableSize";

const HMODashboardSummary = ({ planCount, userCount, userGroupCount }) => {
  return (
    <div className="row">
      <TableSize size={planCount} heading="Number of Plans" />
      <TableSize size={userCount} heading="Total Users" />
      <TableSize size={userGroupCount} heading="Total User Groups" />
    </div>
  );
};

export { HMODashboardSummary };
