import React from "react";

const AddWebsites = () => {
  return (
    <div
      className="modal fade"
      id="add-websites"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Edit Socials</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Socials</label>
                <select className="form-control">
                  <option value="" selected disabled>
                    Select a social network
                  </option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                </select>
              </div>
              <div className="form-group">
                <label>Url</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  placeholder="Url"
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

export { AddWebsites };
