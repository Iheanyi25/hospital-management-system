import React from "react";

const DailyReport = () => {
  return (
    <div className="card border-light p-4 w-50 m-auto">
      <div className="card-body">
        <form className="mb-4">
        <h5 className="text-center">Daily Report</h5>
          <div className="form-group">
            <label>Report description</label>{" "}
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

export { DailyReport };
