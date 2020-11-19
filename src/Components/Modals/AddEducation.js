import React from "react";

const AddEducation = () => {
  return (
    <div
      className="modal fade"
      id="modal-10"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add Education</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Institution</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ name: e.target.value })}
                  placeholder="Institution"
                  // value={this.state.name}
                />
              </div>
              <div className="form-group">
                <label>Area of study</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  placeholder="Area of study"
                  // value={this.state.phoneNumber}
                />
              </div>
              <div className="form-group">
                <label>Certification</label>
                <select
                  className="form-control"
                  name="serviceCategoryId"
                  // onChange={(e) => {
                  //   this.setState({
                  //     [e.target.name]: e.target.value,
                  //   });
                  // }}
                >
                  <option value="" selected disabled>
                    Select a category
                  </option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Start</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="eg. 1990"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">End</label>
                  <input
                    type="number"
                    class="form-control"
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

export { AddEducation };
