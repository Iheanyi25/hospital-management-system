import React from "react";
import { PageLoader } from "../../Components";

class UpdateDoctorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      doctor: {},
      firstName: "",
      lastName: "",
      otherNames: "",
      dateOfBirth: "",
      gender: "",

      phoneNumber: "",
      email: "",
      address: "",

      about: "",
      education: "",
      specialization: "",

      displayCoreDetailsSuccessNotification: null,
      displayCoreDetailsFailureNotification: null,

      displayContactDetailsSuccessNotification: null,
      displayContactDetailsFailureNotification: null,

      displayProfessionalDetailsSuccessNotification: null,
      displayProfessionalDetailsFailureNotification: null,
    };
  }

  async componentDidMount() {
    const { apiUrl } = this.state;

    const response = await fetch(
      `${apiUrl}/Doctor/GetDoctor?DoctorId=${this.state.doctorId}`
    );
    const data = response.json();
    
    this.setState({
      doctor: data.doctorProfile,
    });
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
        doctorId,
        firstName,
        lastName,
        otherNames,
        dateOfBirth,
        gender,
      } = this.state;

      const request = await fetch(`${apiUrl}/Doctor/UpdateDoctorBasicInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId,
          firstName,
          lastName,
          otherNames,
          dateOfBirth,
          gender
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
        doctorId,
      } = this.state;

      const request = await fetch(
        `${apiUrl}/Doctor/UpdateDoctorContactDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctorId,
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

      const data = await request.json();
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
      console.log(data);
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

  updateProfessionalDetails = async (e) => {
    e.preventDefault();

    try {
      const { apiUrl, doctorId, about, education, specialization } = this.state;

      const request = await fetch(
        `${apiUrl}/Doctor/UpdateDoctorProfessionalDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctorId,
            about,
            education,
            specialization,
          }),
        }
      );
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient contact details successfully updated

      this.setState({
        displayProfessionalDetailsSuccessNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayProfessionalDetailsSuccessNotification: false,
          }),
        1500
      );
    } catch (error) {
      console.log(error);
      this.setState({
        displayProfessionalDetailsFailureNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayProfessionalDetailsFailureNotification: false,
          }),
        1500
      );
    }
  };

  render() {
    const {
      firstName,
      lastName,
      otherNames,
      email,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      about,
      education,
      specialization,
      displayCoreDetailsSuccessNotification,
      displayContactDetailsSuccessNotification,
      displayProfessionalDetailsSuccessNotification,
    } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            {displayCoreDetailsSuccessNotification === true ? (
              <div className="col-12 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div
                      className="alert alert-primary alert-dismissible fade show mb-0"
                      role="alert"
                    >
                      Core Details successfully Updated{" "}
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
            ) : null}
            {displayContactDetailsSuccessNotification === true ? (
              <div className="col-12 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div
                      className="alert alert-primary alert-dismissible fade show mb-0"
                      role="alert"
                    >
                      Contact Details successfully Updated{" "}
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
            ) : null}
            {displayProfessionalDetailsSuccessNotification === true ? (
              <div className="col-12 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div
                      className="alert alert-primary alert-dismissible fade show mb-0"
                      role="alert"
                    >
                      Professional Details successfully Updated{" "}
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
            ) : null}
            <header className="page-header">
              <h3 className="page-title">Update Doctor Profile</h3>
            </header>
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card border-light">
                    <div className="card-body">
                      <label>Photo</label>
                      <div className="form-group avatar-box d-flex align-items-center">
                        <img
                          src="../assets/content/user-400-1.jpg"
                          width={100}
                          height={100}
                          alt=""
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
                                onChange={(e) =>
                                  this.handleChange("firstName", e)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Last name</label>{" "}
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) =>
                                  this.handleChange("lastName", e)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Other Name</label>{" "}
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Other Name"
                            value={otherNames}
                            onChange={(e) =>
                              this.handleChange("otherNames", e)
                            }
                          />
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Date of Birth</label>{" "}
                              <input
                                className="form-control"
                                type="date"
                                placeholder="date of birth"
                                defaultValue={Date.now}
                                onChange={(e) =>
                                  this.handleChange("dateOfBirth", e)
                                }
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
                                tabIndex={-98}
                                value={gender}
                                onChange={(e) =>
                                  this.handleChange("gender", e)
                                }
                              >
                                <option
                                  className="bs-title-option"
                                  value="select gender"
                                  selected="selected"
                                >
                                  Select Gender
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
                            value={phoneNumber}
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
                            onChange={(e) => this.handleChange("email", e)}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Address</label>{" "}
                          <textarea
                            className="form-control"
                            placeholder="Address"
                            rows={3}
                            value={address}
                            onChange={(e) =>
                              this.handleChange("address", e)
                            }
                          />
                        </div>

                        <div className="row">
                          <div className="col">
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={(e) => this.updateContactDetails(e)}
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
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4">
                        <h4>Professional Profile</h4>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>About Me</label>{" "}
                              <textarea
                                className="form-control"
                                placeholder="About Me"
                                rows={3}
                                value={about}
                                onChange={(e) =>
                                  this.handleChange("about", e)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Education Background</label>{" "}
                              <textarea
                                className="form-control"
                                placeholder="Educational Background"
                                rows={3}
                                value={education}
                                onChange={(e) =>
                                  this.handleChange("education", e)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Specialization</label>{" "}
                          <textarea
                            className="form-control"
                            placeholder="Educational Background"
                            rows={3}
                            value={specialization}
                            onChange={(e) =>
                              this.handleChange("specialization", e)
                            }
                          />
                        </div>

                        <div className="row">
                          <div className="col">
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={(e) =>
                                this.updateProfessionalDetails(e)
                              }
                            >
                              Save Professional Details
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

      </>
    );
  }
}

export default UpdateDoctorProfile;
