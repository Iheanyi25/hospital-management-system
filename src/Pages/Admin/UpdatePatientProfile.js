import React from "react";
import { PageLoader, RegisterPatientModal, TemplateSettings } from "../../Components";

class UpdatePatientProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      patientId: "",
      patient: null,
      firstName: "",
      lastName: "",
      otherNames: "",
      dateOfBirth: "",
      gender: "",

      phoneNumber: "",
      email: "",
      address: "",
      state: "",
      country: "",

      bloodGroup: "",
      genoType: "",
      diabetic: false,
      allergies: "",
      disabilities: "",

      displayCoreDetailsSuccessNotification: null,
      displayCoreDetailsFailureNotification: null,

      displayContactDetailsSuccessNotification: null,
      displayContactDetailsFailureNotification: null,

      displayHealthDetailsSuccessNotification: null,
      displayHealthDetailsFailureNotification: null,
    };
  }

  async componentDidMount() {
    const { apiUrl } = this.state;
    // const { params } = this.props.match;
    let params = ""
    await this.setState({ patientId: params.id });
    const response = await fetch(
      `${apiUrl}/Admin/GetPatient?id=${this.state.patientId}`
    );
    const data = await response.json();
    const response1 = await fetch(
      `${apiUrl}/Admin/GetPatientProfile?id=${this.state.patientId}`
    );
    const data1 = await response1.json();

    this.setState({
      patient: data,
      firstName: data.patientProfile.firstName,
      lastName: data.patientProfile.lastName,
      otherNames: data.patientProfile.otherNames,
      email: data.patientProfile.email,
    });
    if (data1.patientProfile != null) {
      console.log(data1.patientProfile.patientProfile);
      this.setState({
        dateOfBirth: data1.patientProfile.patientProfile.dateOfBirth,
        gender: data1.patientProfile.patientProfile.gender,
        phoneNumber: data1.patientProfile.patientProfile.applicationUser.phoneNumber,
        address: data1.patientProfile.patientProfile.address,
        state: data1.patientProfile.patientProfile.state,
        country: data1.patientProfile.patientProfile.country,
        bloodGroup: data1.patientProfile.patientProfile.bloodGroup,
        genoType: data1.patientProfile.patientProfile.genoType,
        diabetic: data1.patientProfile.patientProfile.diabetic,
        allergies: data1.patientProfile.patientProfile.allergies,
        disabilities: data1.patientProfile.patientProfile.disabilities,
      });
    }
  }

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  updateCoreDetails = async (e) => {
    e.preventDefault();

    try {
      const {
        apiUrl,
        firstName,
        lastName,
        otherNames,
        dateOfBirth,
        gender,
        patientId,
      } = this.state;

      const request = await fetch(`${apiUrl}/Admin/UpdatePatientBasicInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          firstName,
          lastName,
          otherNames,
          dateOfBirth,
          gender,
        }),
      });
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient profile successfully updated

      this.setState({
        displayCoreDetailsSuccessNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayCoreDetailsSuccessNotification: false,
          }),
        1500
      );
    } catch (error) {
      console.log(error);
      this.setState({
        displayCoreDetailsFailureNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayCoreDetailsFailureNotification: false,
          }),
        1500
      );
    }
  };

  updateContactDetails = async (e) => {
    e.preventDefault();

    try {
      const {
        apiUrl,
        phoneNumber,
        email,
        address,
        state,
        country,
        patientId,
      } = this.state;

      const request = await fetch(
        `${apiUrl}/Admin/UpdatePatientContactDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            phoneNumber,
            email,
            address,
            state,
            country,
          }),
        }
      );
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient contact details successfully updated

      this.setState({
        displayContactDetailsSuccessNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayContactDetailsSuccessNotification: false,
          }),
        1500
      );
    } catch (error) {
      console.log(error);
      this.setState({
        displayContactDetailsFailureNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayContactDetailsFailureNotification: false,
          }),
        1500
      );
    }
  };

  updateHealthDetails = async (e) => {
    e.preventDefault();

    try {
      const {
        apiUrl,
        bloodGroup,
        genoType,
        diabetic,
        allergies,
        disabilities,
        patientId,
      } = this.state;

      const request = await fetch(
        `${apiUrl}/Admin/UpdatePatientHealthDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            bloodGroup,
            genoType,
            allergies,
            disabilities,
            diabetic,
          }),
        }
      );
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient contact details successfully updated

      this.setState({
        displayHealthDetailsSuccessNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayHealthDetailsSuccessNotification: false,
          }),
        1500
      );
    } catch (error) {
      console.log(error);
      this.setState({
        displayHealthDetailsFailureNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayHealthDetailsFailureNotification: false,
          }),
        1500
      );
    }
  };

  render() {
    const {
      patient,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      state,
      country,
      bloodGroup,
      genoType,
      diabetic,
      allergies,
      disabilities,

      displayCoreDetailsSuccessNotification,

      displayContactDetailsSuccessNotification,

      displayHealthDetailsSuccessNotification,
    } = this.state;
    return (
      <>
        <PageLoader />

        {patient ? (
          <main className="main-content">
            <div className="app-loader">
              <i className="icofont-spinner-alt-4 rotate" />
            </div>
            <div className="main-content-wrap">
              {displayCoreDetailsSuccessNotification === true ? (
                <div class="col-12 col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <div
                        class="alert alert-primary alert-dismissible fade show mb-0"
                        role="alert"
                      >
                        Core Details successfully Updated{" "}
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span class="icofont-close-line"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {displayContactDetailsSuccessNotification === true ? (
                <div class="col-12 col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <div
                        class="alert alert-primary alert-dismissible fade show mb-0"
                        role="alert"
                      >
                        Contact Details successfully Updated{" "}
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span class="icofont-close-line"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {displayHealthDetailsSuccessNotification === true ? (
                <div class="col-12 col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <div
                        class="alert alert-primary alert-dismissible fade show mb-0"
                        role="alert"
                      >
                        Health Details successfully Updated{" "}
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span class="icofont-close-line"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <header className="page-header">
                <h3 className="page-title">Update Patient Profile</h3>
              </header>
              <div className="page-content">
                <div className="row justify-content-center">
                  <div class="col-md-6">
                    <div class="card border-light">
                      <div class="card-body">
                        <label>Photo</label>
                        <div className="form-group avatar-box d-flex align-items-center">
                          <img
                            src="../assets/content/user-400-1.jpg"
                            width={100}
                            height={100}
                            alt="user avatar"
                            className="rounded-500 mr-4"
                          />
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                          >
                            Change Photo
                                <span className="btn-icon icofont-ui-user ml-2" />
                          </button>
                        </div>
                        <form>
                          <h4>Core Details</h4>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>First name</label>{" "}
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="First name"
                                  value={patient.patientProfile.firstName}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Last name</label>{" "}
                                <input
                                  className="form-control"
                                  type="text"
                                  value={patient.patientProfile.lastName}
                                  placeholder="Last name"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Other Name</label>{" "}
                            <input
                              className="form-control"
                              type="text"
                              value={patient.patientProfile.otherNames}
                              onChange={(e) =>
                                this.handleChange("otherNames", e)
                              }
                              placeholder="Other Name"
                            />
                          </div>

                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Date of Birth</label>{" "}
                                <input
                                  className="form-control"
                                  type="date"
                                  onChange={(e) =>
                                    this.handleChange("dateOfBirth", e)
                                  }
                                  placeholder="date of birth"
                                  defaultValue={Date.now}
                                  value={dateOfBirth ? dateOfBirth : null}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Gender</label>

                                <select
                                  className="form-control"
                                  title="Gender"
                                  value={gender ? gender : null}
                                  onChange={(e) =>
                                    this.handleChange("gender", e)
                                  }
                                  tabIndex={-98}
                                >
                                  <option
                                    className="bs-title-option"
                                    value="select gender"
                                    selected="selected"
                                  >
                                    select gender
                                      </option>
                                  <option>Male</option>
                                  <option>Female</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={(e) => this.updateCoreDetails(e)}
                              >
                                Save Core Details
                                  </button>
                            </div>
                            <div className="col text-right">
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                              >
                                <span className="d-none d-sm-block">
                                  Cancel
                                    </span>{" "}
                                <span className="d-sm-none">Cancel</span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div class="card border-light">
                      <div class="card-body">
                        <form className="mb-4">
                          <h4>Contact Details</h4>

                          <div className="form-group">
                            <label>Phone Number</label>{" "}
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Phone Number"
                              value={phoneNumber ? phoneNumber : null}
                              onChange={(e) =>
                                this.handleChange("phoneNumber", e)
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Email address</label>{" "}
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Email Address"
                              value={patient.patientProfile.email}
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label>Address</label>{" "}
                            <textarea
                              className="form-control"
                              placeholder="Address"
                              rows={3}
                              onChange={(e) =>
                                this.handleChange("address", e)
                              }
                              value={address ? address : null}
                            />
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>State of Origin</label>

                                <select
                                  className="form-control"
                                  title="state"
                                  tabIndex={-98}
                                  onChange={(e) =>
                                    this.handleChange("state", e)
                                  }
                                  value={state ? state : null}
                                >
                                  <option
                                    className="bs-title-option"
                                    value
                                  />
                                  <option selected="selected">
                                    Select State
                                      </option>
                                  <option>Enugu</option>
                                  <option>Abuja</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Country</label>

                                <select
                                  className="form-control"
                                  title="country"
                                  tabIndex={-98}
                                  onChange={(e) =>
                                    this.handleChange("country", e)
                                  }
                                  value={country ? country : null}
                                >
                                  <option
                                    className="bs-title-option"
                                    value
                                  />
                                  <option selected="selected">
                                    Select Country
                                      </option>
                                  <option>Nigeria</option>
                                  <option>Ghana</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={(e) =>
                                  this.updateContactDetails(e)
                                }
                              >
                                Save Contact Details
                                  </button>
                            </div>
                            <div className="col text-right">
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                              >
                                <span className="d-none d-sm-block">
                                  Cancel
                                    </span>{" "}
                                <span className="d-sm-none">Cancel</span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-12">
                    <div class="card border-light">
                      <div class="card-body">
                        <form className="mb-4">
                          <h4>Basic Health Details</h4>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Blood Group</label>

                                <select
                                  className="form-control"
                                  title="bloodGroup"
                                  tabIndex={-98}
                                  value={bloodGroup ? bloodGroup : null}
                                  onChange={(e) =>
                                    this.handleChange("bloodGroup", e)
                                  }
                                >
                                  <option
                                    className="bs-title-option"
                                    value
                                  />
                                  <option selected="selected">
                                    Select Blood Group
                                      </option>
                                  <option>O+</option>
                                  <option>O-</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Genotype</label>

                                <select
                                  className="form-control"
                                  title="genoType"
                                  value={genoType ? genoType : null}
                                  tabIndex={-98}
                                  onChange={(e) =>
                                    this.handleChange("genoType", e)
                                  }
                                >
                                  <option
                                    className="bs-title-option"
                                    value
                                  />
                                  <option selected="selected">
                                    Select Genotype
                                      </option>
                                  <option>AA</option>
                                  <option>AS</option>
                                  <option>SS</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Diabetic</label>

                            <select
                              className="form-control"
                              title="diabetic"
                              tabIndex={-98}
                              value={diabetic ? diabetic : null}
                              onChange={(e) =>
                                this.handleChange("diabetic", e)
                              }
                            >
                              <option
                                className="bs-title-option"
                                selected="selected"
                                value
                              >
                                Diabetic?
                                  </option>

                              <option>True</option>
                              <option>False</option>
                            </select>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Allergies</label>{" "}
                                <textarea
                                  className="form-control"
                                  placeholder="Address"
                                  rows={3}
                                  value={allergies ? allergies : null}
                                  onChange={(e) =>
                                    this.handleChange("allergies", e)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Disabilities </label>{" "}
                                <textarea
                                  className="form-control"
                                  placeholder="Address"
                                  rows={3}
                                  value={disabilities ? disabilities : null}
                                  onChange={(e) =>
                                    this.handleChange("disabilities", e)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={(e) => this.updateHealthDetails(e)}
                              >
                                Save Health Details
                                  </button>
                            </div>
                            <div className="col text-right">
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                              >
                                <span className="d-none d-sm-block">
                                  Cancel
                                    </span>{" "}
                                <span className="d-sm-none">Cancel</span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : null}
        <RegisterPatientModal />
        <TemplateSettings />
      </>
    );
  }
}

export default UpdatePatientProfile;
