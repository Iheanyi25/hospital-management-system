import React from "react";
import { PageLoader } from "../../Components";
import { Link } from "react-router-dom";
import { Success } from "../../Components/Alerts";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getPatientRegistrationInvoiceUrl, getPatientUrl, updatePatientBasicInfoUrl, updatePatientContactDetailsUrl, UpdatePatientHealthDetailsUrl } from "../../api/URLs";
import CountryRegionDropdown from "../../Components/Select/CountryRegionSelectableDropdown";

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

      success: false,
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;

    if (params.id) {
      await this.fetchPatientDetails(params.id);
      return;
    }
  }
  // this.state = { country: '', region: '' };
  // }

  // selectCountry (val) {
  //   this.setState({ country: val });
  // }

  // selectRegion (val) {
  //   this.setState({ region: val });
  // }

  getRegistrationStatus = async () => {
    try {
      const getPatientRegistrationInvoice = getPatientRegistrationInvoiceUrl(this.state.patientId)
      const getPatientRegistrationInvoiceConfig = fetchConfig({ url: getPatientRegistrationInvoice, method: 'get' })
      const { data } = await fetchWrapper(getPatientRegistrationInvoiceConfig)
      console.log(data, 1111)
      this.setState({ paymentStatus: data.registrationInvoice.paymentStatus });
    } catch (error) {
      console.log(error);
    }
  };

  fetchPatientDetails = async (id) => {
    console.log(id)

    const getPatient = getPatientUrl(id)
    const getPatientConfig = fetchConfig({ url: getPatient, method: 'get' })
    const { data } = await fetchWrapper(getPatientConfig)
    console.log(data, 222222)

    console.log(data, 999999);

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
      patientId: id
    });
    await this.getRegistrationStatus();
  };

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  updateCoreDetails = async (e) => {
    e.preventDefault();
    this.setState({ success: false });

    try {
      const payload = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        otherNames: this.state.otherNames,
        dateOfBirth: this.state.dateOfBirth,
        gender: this.state.gender,
        patientId: this.state.patientId,
      };

      const updatePatientBasicInfo = updatePatientBasicInfoUrl()
      const updatePatientBasicInfoConfig = fetchConfig({ url: updatePatientBasicInfo, data: payload, method: 'post' })
      const res = await fetchWrapper(updatePatientBasicInfoConfig)

      console.log(res, 33333);
      if (res.status === 200) {
        this.setState({ success: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateContactDetails = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address,
        state: this.state.state,
        country: this.state.country,
        patientId: this.state.patientId,
      };

      const updatePatientContactDetails = updatePatientContactDetailsUrl()
      const updatePatientContactDetailsConfig = fetchConfig({ url: updatePatientContactDetails, data: payload, method: 'post' })
      const res = await fetchWrapper(updatePatientContactDetailsConfig)

      console.log(res, 4444)

      if (res.status === 200) {
        this.setState({ success: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateHealthDetails = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        bloodGroup: this.state.bloodGroup,
        genoType: this.state.genoType,
        diabetic: this.state.diabetic,
        allergies: this.state.allergies,
        disabilities: this.state.disabilities,
        patientId: this.state.patientId,
      };

      // );
      const UpdatePatientHealthDetails = UpdatePatientHealthDetailsUrl()
      const UpdatePatientHealthDetailsConfig = fetchConfig({ url: UpdatePatientHealthDetails, data: payload, method: 'post' })
      const res = await fetchWrapper(UpdatePatientHealthDetailsConfig)
      console.log(res, 55555)
      if (res.status === 200) {
        this.setState({ success: true });
      }
    } catch (error) {
      console.log(error);
    }
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
      paymentStatus,
    } = this.state;

    console.log(paymentStatus, "PaymentStatus")
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            {this.state.success ? (
              <Success
                message="Well done, you successfully added this update"
                dontRoute={true}
              />
            ) : null}
            {paymentStatus === "Paid" ? null : paymentStatus === "Not Paid" ? (
              <div className="card">
                <div className="card-body bg-warning p-4">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <h6 className="m-0 p-0 text-left">{`${firstName} ${lastName} is yet to pay for a hospital card. To have access to the services click, the pay now button to complete registration`}</h6>{" "}                    </div>
                    <div className="">
                      <Link
                        className="btn btn-sm btn-primary"
                        to={{
                          pathname: `/AdminPatientRegistration/${this.state.patientId}`,
                          state: {
                            patientId: this.state.patientId,
                            email: this.state.email,
                            cost: this.state.patient?.patientProfile?.account
                              ?.healthPlan?.cost,
                          },
                        }}
                      >
                        Pay Now
                      </Link>
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
                      <form onSubmit={(e) => this.updateCoreDetails(e)}>
                        <h4>Core Details</h4>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>First name</label>{" "}
                              <input
                                required
                                required
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
                                required
                                required
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
                            required
                            required
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
                                required
                                required
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
                                required
                                value={gender ? gender : ""}
                                onChange={(e) => this.handleChange("gender", e)}
                                tabIndex={-98}
                              >
                                <option disabled value="">
                                  Select gender
                                </option>
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col"></div>
                          <div className="col text-right">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={(e) => this.updateCoreDetails(e)}
                            >
                              Save Core Details
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
                      <form className="mb-4" onSubmit={(e) => this.updateContactDetails(e)}>
                        <h4>Contact Details</h4>

                        <div className="form-group">
                          <label>Phone Number</label>{" "}
                          <input
                            required
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
                            required
                            className="form-control"
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Address</label>{" "}
                          <textarea
                            required
                            className="form-control"
                            placeholder="Address"
                            rows={3}
                            onChange={(e) => this.handleChange("address", e)}
                            value={address ? address : ""}
                          />
                        </div>
                        <CountryRegionDropdown />
                        <div className="row">
                          <div className="col"></div>
                          <div className="col text-right">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={(e) => this.updateContactDetails(e)}
                            >
                              Save Contact Details
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
                      <form className="mb-4" onSubmit={(e) => this.updateHealthDetails(e)}>
                        <h4>Basic Health Details</h4>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Blood Group</label>

                              <select
                                required
                                className="form-control"
                                title="bloodGroup"
                                tabIndex={-98}
                                value={bloodGroup ? bloodGroup : ""}
                                onChange={(e) =>
                                  this.handleChange("bloodGroup", e)
                                }
                              >
                                <option disabled value="">
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
                                required
                                value={genoType ? genoType : ""}
                                tabIndex={-98}
                                onChange={(e) =>
                                  this.handleChange("genoType", e)
                                }
                              >
                                <option disabled value="">
                                  Select Genotype
                                </option>
                                <option value="aa">AA</option>
                                <option value="as">AS</option>
                                <option value="ss">SS</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Diabetic</label>

                          <select
                            className="form-control"
                            title="diabetic"
                            required
                            tabIndex={-98}
                            value={diabetic ? diabetic : ""}
                            onChange={(e) => this.handleChange("diabetic", e)}
                          >
                            <option disabled value="">
                              Diabetic?
                            </option>

                            <option value={true}>True</option>
                            <option value={false}>False</option>
                          </select>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Allergies</label>{" "}
                              <textarea
                                required
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
                                required
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
                          <div className="col"></div>
                          <div className="col text-right">
                            <button
                              type="submit"
                              className="btn btn-primary"
                            // onClick={}
                            >
                              Save Health Details
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

export default UpdatePatientProfile;
