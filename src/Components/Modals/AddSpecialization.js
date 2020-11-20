import React from "react";

const AddSpecialization = () => {
  return (
    <div
      className="modal fade"
      id="add-specialization"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add specialization</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Specialization</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  placeholder="Specialization"
                  // value={this.state.phoneNumber}
                />
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

export { AddSpecialization };
