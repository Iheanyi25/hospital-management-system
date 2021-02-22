import React from "react";
import TableSize from "../../DataTable/TableSize";

const AdmissionsSummary = () => {
  return (
    <div className="row">
      <TableSize size="100" heading="No of Patients admitted" icon="" />
      <TableSize size="100" heading="Patients waiting for admission" icon="" />
    </div>
  );
};

export default AdmissionsSummary;
