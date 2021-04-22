import React from "react";

const NursingReportForm = () => {
  return (
    <div className="card border-light p-4 w-50 m-auto">
      <div className="card-body">
        <form className="mb-4">
        <h5 className="text-center">Nursing Report</h5>
          <div className="form-group">
            <label>Nursing assessment</label>{" "}
            <textarea className="form-control" />
          </div>
          <div className="form-group">
            <label>Nursing diagnosis</label>{" "}
            <textarea className="form-control" />
          </div>
          <div className="form-group">
            <label>Nursing objectives</label>{" "}
            <textarea className="form-control" />
          </div>
          <div className="form-group">
            <label>Nursing actions</label> <textarea className="form-control" />
          </div>
          <div className="form-group">
            <label>Nursing evaluation</label>{" "}
            <textarea className="form-control" />
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col text-right">
              <button type="submit" className="btn btn-primary">
                Save report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { NursingReportForm };
