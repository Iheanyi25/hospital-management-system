import React from "react";

const AddOfficeTime = () => {
  return (
    <div
      className="modal fade"
      id="add-office-time"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add office time</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Work Days</label>
                <select className="form-control" name="serviceCategoryId">
                  <option value="" disabled>
                    Select a day
                  </option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Start</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="eg. 10"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>End</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="eg. 12"
                  />
                </div>
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button
                  className="btn btn-outline-danger mr-3"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddOfficeTime };
