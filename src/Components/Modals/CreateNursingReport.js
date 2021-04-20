import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

// const $ = window.$;

const CreateNursingReport = () => {
  return (
    <div
      className="modal fade"
      id="create-nursing-report"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Create Report</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Shift selection</label>
                <Select
                  //   value={patient}
                  isSearchable={false}
                  options={[
                    { value: "Morning", label: "Morning" },
                    { value: "Evening", label: "Evening" },
                  ]}
                  //   onChange={handleChange}
                  placeholder="Select a shift"
                />
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col text-right">
                  <Link type="submit" to="/AdminUpdateNursingReport" className="btn btn-primary">
                    Create report
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateNursingReport };
