import React from "react";

const DailyReport = () => {
  return (
    <form className="mb-4">
      <div className="form-group">
        <label>Report description</label> <textarea className="form-control" />
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

export { DailyReport };
