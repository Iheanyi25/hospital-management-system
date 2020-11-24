import React from "react";

const EditContactInfo = () => {
  return (
    <div
      className="modal fade"
      id="add-contact-info"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add contact information</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  placeholder="Phone Number"
                  // value={this.state.phoneNumber}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  placeholder="City"
                  // value={this.state.phoneNumber}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  placeholder="State"
                  // value={this.state.phoneNumber}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  placeholder="Country"
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

export { EditContactInfo };
