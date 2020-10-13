import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "../Partials/Doctor/Header";
import Sidebar from "../Partials/Doctor/Sidebar";
import Footer from "../Partials/Footer";
import TemplateSettings from "../Partials/TemplateSettings";
import PageLoader from "../Partials/PageLoader";

class UpdateDoctorProfile extends React.Component {
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
    };
  }

  async componentDidMount() {
    const { apiUrl } = this.state;
    const { params } = this.props.match;
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
        phoneNumber:
          data1.patientProfile.patientProfile.applicationUser.phoneNumber,
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

      const data = await request.json();
    } catch (error) {
      console.log(error);
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

      const data = await request.json();
      console.log(data);
    } catch (error) {
      console.log(error);
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

      const data = await request.json();
      console.log(data);
    } catch (error) {
      console.log(error);
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
    } = this.state;
    return (
      <>
        <PageLoader />
        <div className="page-box">
          <div className="app-container">
            {/* Horizontal navbar---Header */}
            <Header></Header>

            {/* Vertical navbar */}
            <Sidebar></Sidebar>

           
              <main className="main-content">
                <div className="app-loader">
                  <i className="icofont-spinner-alt-4 rotate" />
                </div>
                <div className="main-content-wrap">
                  <header className="page-header">
                    <h3 className="page-title">Update Doctor Profile</h3>
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
                                alt
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
                              <h4>Educational Details</h4>

                              <div className="form-group">
                                <label>Phone Number</label>{" "}
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Phone Number"
                                 
                                />
                              </div>
                              <div className="form-group">
                                <label>Email address</label>{" "}
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Email Address"
                                  
                                  disabled
                                />
                              </div>
                              <div className="form-group">
                                <label>Address</label>{" "}
                                <textarea
                                  className="form-control"
                                  placeholder="Address"
                                  rows={3}
                                 
                                />
                              </div>
                             
                              <div className="row">
                                <div className="col">
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    
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
                                      placeholder={"Enter Patient Allergies"}
                                      
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
                                      
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col">
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                   
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
           
            {/* Footer */}
            <Footer />
          </div>
        </div>
    
        <TemplateSettings />
      </>
    );
  }
}

export default UpdateDoctorProfile;
