import React from "react";
import { PageLoader } from "../../Components";
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

class UpdatePatientProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: "",
      patient: {},
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
    const { params } = this.props.match;

    if (params.id) {
      this.fetchPatientDetails(params.id);
      return;
    }
  }

  fetchPatientDetails = async (id) => {
    this.setState({ patientId: id });

    const response = await fetch(`${apiUrl}/Patient/GetPatient?id=${id}`);
    const data = await response.json();

    console.log(data);

    this.setState({
      firstName: data.patientProfile.patient.firstName,
      lastName: data.patientProfile.patient.lastName,
      otherNames: data.patientProfile.patient.otherNames,
      email: data.patientProfile.patient.email,
      patient: data,
      dateOfBirth: data.patientProfile?.dateOfBirth,
      gender: data.patientProfile?.gender,
      phoneNumber: data.patientProfile.patient?.phoneNumber,
      address: data.patientProfile?.address,
      state: data.patientProfile?.state,
      country: data.patientProfile?.country,
      bloodGroup: data.patientProfile?.bloodGroup,
      genoType: data.patientProfile?.genoType,
      diabetic: data.patientProfile?.diabetic,
      allergies: data.patientProfile?.allergies,
      disabilities: data.patientProfile?.disabilities,
    });
  };

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

  SuccessNotification = (message) => {
    return (
      <div className="col-12 col-md-6">
        <div className="card">
          <div className="card-body">
            <div
              className="alert alert-primary alert-dismissible fade show mb-0"
              role="alert"
            >
              {message}{" "}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span className="icofont-close-line"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      lastName,
      otherNames,
      email,
      dateOfBirth,
      gender,
      phoneNumber,
      firstName,
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

    console.log(this.state.patient.patientProfile?.account);
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="row">
              <div className="col-12 col-md-12 pb-5 mb-5">
                <div className="card">
                  <div className="card-body">
                    <div
                      className="col-12 alert alert-warning with-before-icon"
                      role="alert"
                    >
                      <div className="alert-content row">
                        <div className="col-md-11 text-center m-auto">
                          <h6 className="m-0 p-0 text-left">{`${firstName} ${lastName} is yet to pay for a hospital card. To have access to the services click the pay button and complete registration`}</h6>
                        </div>
                        <div className="col-md-1">
                          <Link
                            className="btn btn-sm btn-primary"
                            to={{
                              pathname: `/AdminPatientRegistration/${this.state.patientId}`,
                              state: {
                                patientId: this.state.patientId,
                                email: this.state.email,
                                cost: this.state.patient?.patientProfile?.account?.healthPlan?.cost
                              },
                            }}
                          >
                            Pay Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {displayCoreDetailsSuccessNotification &&
              this.SuccessNotification("Core Details successfully Updated")}
            {displayContactDetailsSuccessNotification &&
              this.SuccessNotification("Contact Details successfully Updated")}
            {displayHealthDetailsSuccessNotification &&
              this.SuccessNotification("Health Details successfully Updated")}

            <header className="page-header">
              <h3 className="page-title">Update Patient Profile</h3>
            </header>

            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card border-light">
                    <div className="card-body">
                      <label>Photo</label>
                      <div className="form-group avatar-box d-flex align-items-center">
                        <img
                          src="../../assets/content/user-400-1.jpg"
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
                                value={firstName}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Last name</label>{" "}
                              <input
                                className="form-control"
                                type="text"
                                value={lastName}
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
                            value={otherNames}
                            onChange={(e) => this.handleChange("otherNames", e)}
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
                                value={dateOfBirth}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Gender</label>

                              <select
                                className="form-control"
                                title="Gender"
                                value={gender ? gender : ""}
                                onChange={(e) => this.handleChange("gender", e)}
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
                              className="btn btn-primary"
                              onClick={(e) => this.updateCoreDetails(e)}
                            >
                              Save Core Details
                            </button>
                          </div>
                          <div className="col text-right"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col col-md-6">
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4">
                        <h4>Contact Details</h4>

                        <div className="form-group">
                          <label>Phone Number</label>{" "}
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber ? phoneNumber : ""}
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
                            value={email}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Address</label>{" "}
                          <textarea
                            className="form-control"
                            placeholder="Address"
                            rows={3}
                            onChange={(e) => this.handleChange("address", e)}
                            value={address ? address : ""}
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
                                onChange={(e) => this.handleChange("state", e)}
                                value={state ? state : ""}
                              >
                                <option className="bs-title-option" value />
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
                                value={country ? country : ""}
                              >
                                <option className="bs-title-option" value />
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
                              className="btn btn-primary"
                              onClick={(e) => this.updateContactDetails(e)}
                            >
                              Save Contact Details
                            </button>
                          </div>
                          <div className="col text-right"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body">
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
                                value={bloodGroup ? bloodGroup : ""}
                                onChange={(e) =>
                                  this.handleChange("bloodGroup", e)
                                }
                              >
                                <option className="bs-title-option" value />
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
                                value={genoType ? genoType : ""}
                                tabIndex={-98}
                                onChange={(e) =>
                                  this.handleChange("genoType", e)
                                }
                              >
                                <option className="bs-title-option" value />
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
                            value={diabetic ? diabetic : ""}
                            onChange={(e) => this.handleChange("diabetic", e)}
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
                                value={allergies ? allergies : ""}
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
                                value={disabilities ? disabilities : ""}
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
                              className="btn btn-primary"
                              onClick={(e) => this.updateHealthDetails(e)}
                            >
                              Save Health Details
                            </button>
                          </div>
                          <div className="col text-right"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default UpdatePatientProfile;
