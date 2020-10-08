import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,

      email: "",
      firstName: "",
      lastName: "",
      password: "Password101@",
      roleName: "",
      healthPlan: "",
      userId: "",
      showErrorMessage: false,
      showAccountantSuccessMessage: false,
      showDoctorSuccessMessage: false,
      showPharmacySuccessMessage: false,
      showLabSuccessMessage: false,
    };
  }

  handleChange = (name, e) => {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  registerUser = async (e) => {
    e.preventDefault();

    const { email, firstName, lastName, password, roleName } = this.state;
    const url = this.state.apiUrl;
    try {
      const request = await fetch(`${url}/Admin/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          roleName,
        }),
      });

      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      const data = await request.json();
      console.log(roleName);
      if (roleName == "accountant") {
        this.setState({
          showAccountantSuccessMessage: true,
          successMessage: data.message,
          userId: data.newApplicationUser.id,
        });
      } else if (roleName == "doctor") {
        this.setState({
          showDoctorSuccessMessage: true,
          successMessage: data.message,
          userId: data.newApplicationUser.id,
        });
      } else if (roleName == "pharmacy") {
        this.setState({
          showPharmacySuccessMessage: true,
          successMessage: data.message,
          userId: data.newApplicationUser.id,
        });
      } else if (roleName == "lab") {
        this.setState({
          showLabSuccessMessage: true,
          successMessage: data.message,
          userId: data.newApplicationUser.id,
        });
      }

      localStorage.setItem(
        "registeredPatient",
        JSON.stringify(data.authenticatedUser)
      );
    } catch (err) {
      console.log(err.message);
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
  };

  render() {
    const {
      email,
      firstName,
      lastName,
      password,
      roleName,
      userId,
    } = this.state;
    var displayError;
    var displaySuccess;

    if (this.state.showErrorMessage) {
      displayError = (
        <div className="alert alert-danger with-after-icon" role="alert">
          <div className="alert-content">{this.state.errorMessage}</div>
          <div className="alert-icon">
            <i className="icofont-alarm" />
          </div>
        </div>
      );
    }

    if (this.state.showAccountantSuccessMessage) {
      displaySuccess = (
        <div className="alert alert-info with-after-icon" role="alert">
          <div className="alert-content text-center">
            {this.state.successMessage}.
            <p class="mb-0 ">
              Would you like to update the users profile?
              <Link
                to={`/adminupdateaccountantprofile/${userId}`}
                class="btn btn-outline-light"
              >
                <span class="btn-icon icon icofont-ui-edit mr-2"></span>Update
                Profile
              </Link>
            </p>
          </div>
          <div className="alert-icon">
            <i className="icon icofont-ui-check" />
          </div>
        </div>
      );
    }

    if (this.state.showDoctorSuccessMessage) {
      displaySuccess = (
        <div className="alert alert-info with-after-icon" role="alert">
          <div className="alert-content text-center">
            {this.state.successMessage}.
            <p class="mb-0 ">
              Would you like to update the users profile?
              <Link
                to={`/adminupdatedoctorprofile/${userId}`}
                class="btn btn-outline-light"
              >
                <span class="btn-icon icon icofont-ui-edit mr-2"></span>Update
                Profile
              </Link>
            </p>
          </div>
          <div className="alert-icon">
            <i className="icon icofont-ui-check" />
          </div>
        </div>
      );
    }

    if (this.state.showPharmacySuccessMessage) {
      displaySuccess = (
        <div className="alert alert-info with-after-icon" role="alert">
          <div className="alert-content text-center">
            {this.state.successMessage}.
            <p class="mb-0 ">
              Would you like to update the users profile?
              <Link
                to={`/adminupdatepharmacistprofile/${userId}`}
                class="btn btn-outline-light"
              >
                <span class="btn-icon icon icofont-ui-edit mr-2"></span>Update
                Profile
              </Link>
            </p>
          </div>
          <div className="alert-icon">
            <i className="icon icofont-ui-check" />
          </div>
        </div>
      );
    }

    if (this.state.showLabSuccessMessage) {
      displaySuccess = (
        <div className="alert alert-info with-after-icon" role="alert">
          <div className="alert-content text-center">
            {this.state.successMessage}.
            <p class="mb-0 ">
              Would you like to update the users profile?
              <Link
                to={`/adminupdatelabprofile/${userId}`}
                class="btn btn-outline-light"
              >
                <span class="btn-icon icon icofont-ui-edit mr-2"></span>Update
                Profile
              </Link>
            </p>
          </div>
          <div className="alert-icon">
            <i className="icon icofont-ui-check" />
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Add patients modals */}
        <div
          className="modal fade"
          id="add-user"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center">Onboard a New User</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input
                      className="form-control"
                      value={this.state.firstName}
                      onChange={(e) => this.handleChange("firstName", e)}
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      value={this.state.lastName}
                      onChange={(e) => this.handleChange("lastName", e)}
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      value={this.state.email}
                      onChange={(e) => this.handleChange("email", e)}
                      type="email"
                      placeholder="Email"
                    />
                  </div>

                  
                      <div className="form-group">
                        <label>User Type</label>
                        <select
                          className="selectpicker"
                          title="Gender"
                          value={this.state.roleName}
                          onChange={(e) => this.handleChange("roleName", e)}
                        >
                          <option value="" selected="true" disabled>
                            Register As
                          </option>
                          <option value="accountant">Accountant</option>
                          <option value="doctor">Doctor</option>
                          <option value="pharmacy">Pharmacy</option>
                          <option value="lab">Lab</option>
                        </select>
                      </div>
                    
                  {displayError}
                  {displaySuccess}
                </form>
              </div>

              <div className="modal-footer d-block">
                <div className="actions justify-content-between">
                  <button
                    type="button"
                    className="btn btn-error"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={(e) => this.registerUser(e)}
                    disabled={
                      email === "" ||
                      firstName === "" ||
                      lastName === "" ||
                      roleName === ""
                        ? true
                        : false
                    }
                  >
                    Register Patient
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end Add patients modals */}
      </>
    );
  }
}

export default RegisterUser;
