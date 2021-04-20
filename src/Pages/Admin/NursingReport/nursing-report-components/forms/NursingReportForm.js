import React from "react";

const NursingReportForm = () => {
  return (
    <form className="mb-4">
      <div className="form-group">
        <label>Nursing assessment</label> <textarea className="form-control" />
      </div>
      <div className="form-group">
        <label>Nursing diagnosis</label> <textarea className="form-control" />
      </div>
      <div className="form-group">
        <label>Nursing objectives</label> <textarea className="form-control" />
      </div>
      <div className="form-group">
        <label>Nursing actions</label> <textarea className="form-control" />
      </div>
      <div className="form-group">
        <label>Nursing evaluation</label> <textarea className="form-control" />
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
  );
};

export { NursingReportForm };
