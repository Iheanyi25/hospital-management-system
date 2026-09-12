import React from "react";

const ViewNursingReport = ({ report }) => {
  return (
    <div className="card border-light p-4 w-75 m-auto">
      <div className="card-body">
        <div className="d-flex justify-content-between border-bottom">
          <h6 className="font-weight-bold">Nursing Report</h6>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div>
              <h6 className="mb-2">Nursing assessment</h6>
              <p>{report?.nursingAssessment ?? "N/A"}</p>
            </div>
            <div>
              <h6 className="mb-2">Nursing diagnosis</h6>
              <p>{report?.nursingDiagnosis ?? "N/A"}</p>
            </div>
            <div>
              <h6 className="mb-2">Nursing objectives</h6>
              <p>{report?.nursingObjectives ?? "N/A"}</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <h6 className="mb-2">Nursing actions</h6>
              <p>{report?.nursingActions ?? "N/A"}</p>
            </div>
            <div>
              <h6 className="mb-2">Nursing evaluation</h6>
              <p>{report?.nursingEvaluation ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewNursingReport };
