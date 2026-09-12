import React from "react";

export default function PatientHealthHistoryHeader({handlePrint}) {
  return (
    <div className="d-flex justify-content-between pb-5">
      <h3 className="mt-0">Patient Details</h3>
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm btn-block py-3 px-3"
          aria-expanded="false"
          onClick={handlePrint}
        >
          Export Patient Details
        </button>
      </div>
    </div>
  );
}
