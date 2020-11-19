import React from "react";

const AddExperience = () => {
  return (
    <div
      className="modal fade"
      id="add-experience"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add Education</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Company</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ name: e.target.value })}
                  placeholder="Company"
                  // value={this.state.name}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  placeholder="Role"
                  // value={this.state.phoneNumber}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Start</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="eg. 1990"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">End</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="eg. 1990"
                  />
                </div>
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button className="btn btn-outline-danger mr-3" data-dismiss="modal">Close</button>
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

export { AddExperience };
