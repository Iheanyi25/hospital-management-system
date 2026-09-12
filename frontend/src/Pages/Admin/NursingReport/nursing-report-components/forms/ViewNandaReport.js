import React from "react";

const ViewNandaReport = ({ report }) => {
  return (
    <div className="card border-light p-4 w-75 m-auto">
      <div className="card-body">
        <div className="d-flex justify-content-between border-bottom">
          <h6 className="font-weight-bold">NANDA Report</h6>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div>
              <h6 className="mb-2">Nursing assessment</h6>
              <p>{report?.nandaReport ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewNandaReport };
