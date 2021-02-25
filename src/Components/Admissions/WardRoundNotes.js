import { observer } from "mobx-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  postAdmitOrSendPatientHomeUrl,
  updatePatientClerkingUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import {
  PreConsultationHistory,
  ClarkingHistory,
  PatientProfile,
  LabResults,
} from "../../Components/Clarking";
// import AdmissionReferral from "../../Components/Admissions/ReferredPatients";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";
import { DoctorsNotes } from "../../Components/Admissions/DoctorsNotes";

class WardRoundNotes extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      doctorQueue: null,
      canceledConsultations: [],
      completedConsultations: [],
      pendingConsultations: [],
      capturePatientHealthHistory: {},
      clarking: {},
      healthHistory: {},
      labHistory: {},
      message: "",
      success: false,
      reMount: true,
    };
  }

  handleSubmit = (type, key, e) => {
    e.preventDefault();

    let payload = [];
    key.forEach((element) => {
      let newPatch = this.formatJSONPATCH(
        "replace",
        `/${element}`,
        this.state[type][element]
      );
      payload.push(newPatch);
    });

    this.submitRequest(payload);
    this.setState({ reMount: !this.state.reMount });
  };


  submitRequest = async (payload) => {
    const {
      user: { id: userId },
    } = this.context;
    const { id, type, patient } = this.props.location.state;


    try {
      const updatePatientClerking = updatePatientClerkingUrl(
        id,
        type,
        userId,
        patient.id
      );
      const updatePatientClerkingConfig = fetchConfig({
        url: updatePatientClerking,
        data: JSON.stringify(payload),
        method: "patch",
      });
      const res = await fetchWrapper(updatePatientClerkingConfig);
      notification.success({ message : res.data.message})
    } catch (error) {
      notification.error({ message : error?.response?.data?.message})
    }
  };

  handleChange = (type, key, e) => {
    this.setState({ [type]: { ...this.state[type], [key]: e.target.value } });
  };

  formatJSONPATCH = (op, path, value) => {
    return {
      op,
      path,
      value,
    };
  };

  clearData = (type, key) => {
    this.setState({ [type]: { [key]: "" } });
  };


  finishClarking = async (e, key) => {
    e.preventDefault();

    let payload = {
      id: this.props.location.state.id,
      isAdmitted: false,
      isSentHome: false,
    };

    payload[key] = true; //change here
    try {
      const postAdmitOrSendPatientHome = postAdmitOrSendPatientHomeUrl();
      const postAdmitOrSendPatientHomeConfig = fetchConfig({
        url: postAdmitOrSendPatientHome,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(postAdmitOrSendPatientHomeConfig);
      notification.success({ message : res.data.message})
      this.props.history.push("/")
    } catch (error) {
      notification.error({ message : error?.response?.data?.message})
    }
  };

  render() {
    const { firstName, lastName, id } = { firstName: "udo", lastName: "kadss", id:"528ddf11-d80e-45a1-a62c-efcbf07ce538"};
    return (
      <>
        <PageLoader />

        {/* <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <header>
                <h4 className="text-center">Patient’s clarking history</h4>
              </header>
              <div className="card border-light w-75 m-auto">
                <ClarkingHistory patientDetails={{ id, firstName, lastName }} />
              </div>
            </div>
          </div>
        </main> */}

        <main className="main-content mt-5">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
          <div className="card border-light w-75 m-auto">
                                      <ClarkingHistory
                                        patientDetails={{ firstName, lastName, id }}
                                        setCount={this.setCount}
                                        user
                                      />
                                    </div>
            {/* <header className="page-header d-flex justify-content-between">
              <h3 className="page-title">
                Doctor Clerking:{" "}
                <font>
                  {lastName.toUpperCase() + " " + firstName.toUpperCase()}
                </font>
              </h3>
              <div>
                <div className="col"></div>
                <div className="col text-right">
                  <Link
                    onClick={(e) => this.finishClarking(e, "isSentHome")}
                    className="btn btn-primary mr-2 mb-2"
                  >
                    Send Home
                  </Link>
                  <Link
                    // onClick={(e) => this.finishClarking(e, "isAdmitted")}
                    to="#"
                    data-toggle="modal"
                    data-target="#admission-referral"
                    className="btn btn-outline-primary mr-2 mb-2"
                  >
                    Admit
                  </Link>
                </div>
              </div>
            </header> */}
             <div className="page-content">
              <div className="row">
                {/*<div
                  className="nav flex-column nav-tabs col-md-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Capture Patient Health History
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Clerking
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-health-history-tab"
                    data-toggle="pill"
                    href="#v-pills-health-history"
                    role="tab"
                    aria-controls="v-pills-health-history"
                    aria-selected="false"
                  >
                    Health History
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-settings-tab"
                    data-toggle="pill"
                    href="#v-pills-settings"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    Lab History and Service Prescription
                  </a>
                  <NavLink
                    to={{
                      pathname: "/AdminServiceRequests",
                      state: this.props.location.state,
                    }}
                    className="nav-link"
                    aria-selected="false"
                  >
                    Request new service
                  </NavLink>
                </div> */}
                <div className="tab-content col-md-9" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div>
                      <ul
                        className="nav nav-tabs mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="pills-home-tab"
                            data-toggle="pill"
                            href="#pills-home"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                          >
                            Doctors Notes
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-profile-tab"
                            data-toggle="pill"
                            href="#pills-profile"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                          >
                            Medications
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-contact-tab"
                            data-toggle="pill"
                            href="#pills-contact"
                            role="tab"
                            aria-controls="pills-contact"
                            aria-selected="false"
                          >
                            Observation Chart
                          </a>
                        </li>
                        {/* <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-travel-tab"
                            data-toggle="pill"
                            href="#pills-travel"
                            role="tab"
                            aria-controls="pills-travel"
                            aria-selected="false"
                          >
                            Travel History
                          </a>
                        </li> */}
                      </ul>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  {/* <form className="mb-4"> */}
                                    <div className="card border-light w-75 m-auto">
                                    <h4>Doctors Notes</h4>
                                      <DoctorsNotes
                                        patientDetails={{ firstName, lastName, id }}
                                        setCount={this.setCount}
                                        user
                                      />
                                    </div>
                                    {/* <div className="form-group">
                                      <label>
                                        Additions like Smoking, Drinking etc
                                      </label>
                                      <textarea
                                        onChange={(e) =>
                                          this.handleChange(
                                            "capturePatientHealthHistory",
                                            "socialHistory",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.capturePatientHealthHistory
                                            ?.socialHistory ?? ""
                                        }
                                        className="form-control"
                                        placeholder="Enter Social History Here"
                                        rows={3}
                                      />
                                    </div> */}

                                    {/* <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "capturePatientHealthHistory",
                                              ["socialHistory"],
                                              e
                                            )
                                          }
                                        >
                                          Record Social History
                                        </button>
                                      </div>
                                    </div> */}
                                  {/* </form> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-profile"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Family History</h4>

                                    <div className="form-group">
                                      <label>
                                        Hereditary sickness like mental health,
                                        blood pressure etc
                                      </label>
                                      <textarea
                                        onChange={(e) =>
                                          this.handleChange(
                                            "capturePatientHealthHistory",
                                            "familyHistory",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.capturePatientHealthHistory
                                            ?.familyHistory ?? ""
                                        }
                                        className="form-control"
                                        placeholder="Enter Family History Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "capturePatientHealthHistory",
                                              ["familyHistory"],
                                              e
                                            )
                                          }
                                        >
                                          Save Family History
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-contact"
                          role="tabpanel"
                          aria-labelledby="pills-contact-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Medical History</h4>

                                    <div className="form-group">
                                      <label>
                                        Common Sicknesses like
                                        Hepatitis,Diabetes etc
                                      </label>
                                      <textarea
                                        onChange={(e) =>
                                          this.handleChange(
                                            "capturePatientHealthHistory",
                                            "medicalHistory",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.capturePatientHealthHistory
                                            ?.medicalHistory ?? ""
                                        }
                                        className="form-control"
                                        placeholder="Enter Medical History Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "capturePatientHealthHistory",
                                              ["medicalHistory"],
                                              e
                                            )
                                          }
                                          className="btn btn-primary"
                                        >
                                          Save Medical History
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-travel"
                          role="tabpanel"
                          aria-labelledby="pills-travel-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Travel History</h4>
                                    <div className="form-group">
                                      <label>Last Country Visited</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        onChange={(e) =>
                                          this.handleChange(
                                            "capturePatientHealthHistory",
                                            "lastCountryVisited",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.capturePatientHealthHistory
                                            ?.lastCountryVisited ?? ""
                                        }
                                        placeholder="Countries Visitied"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>Date Visited</label>
                                      <input
                                        className="form-control"
                                        type="date"
                                        onChange={(e) =>
                                          this.handleChange(
                                            "capturePatientHealthHistory",
                                            "dateOfVisitation",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.capturePatientHealthHistory
                                            ?.dateOfVisitation ?? ""
                                        }
                                        placeholder="Date Visited"
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "capturePatientHealthHistory",
                                              [
                                                "lastCountryVisited",
                                                "dateOfVisitation",
                                              ],
                                              e
                                            )
                                          }
                                        >
                                          Save Travel History
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
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div>
                      <ul
                        className="nav nav-tabs mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="pills-complain-tab"
                            data-toggle="pill"
                            href="#pills-complain"
                            role="tab"
                            aria-controls="pills-complain"
                            aria-selected="true"
                          >
                            Presenting Complaints
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-history-tab"
                            data-toggle="pill"
                            href="#pills-history"
                            role="tab"
                            aria-controls="pills-history"
                            aria-selected="false"
                          >
                            History of Presenting Complaints
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-review-tab"
                            data-toggle="pill"
                            href="#pills-review"
                            role="tab"
                            aria-controls="pills-review"
                            aria-selected="false"
                          >
                            Review of System
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-physical-tab"
                            data-toggle="pill"
                            href="#pills-physical"
                            role="tab"
                            aria-controls="pills-physical"
                            aria-selected="false"
                          >
                            Physical Examination
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-diagonis-tab"
                            data-toggle="pill"
                            href="#pills-diagonis"
                            role="tab"
                            aria-controls="pills-diagonis"
                            aria-selected="false"
                          >
                            Diagnosis
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-treatment-tab"
                            data-toggle="pill"
                            href="#pills-treatment"
                            role="tab"
                            aria-controls="pills-treatment"
                            aria-selected="false"
                          >
                            Treatment Plan
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-obstetrics-tab"
                            data-toggle="pill"
                            href="#pills-obstetrics"
                            role="tab"
                            aria-controls="pills-obstetrics"
                            aria-selected="false"
                          >
                            Obstetrics and Gynaecologist
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-prescription-tab"
                            data-toggle="pill"
                            href="#pills-prescription"
                            role="tab"
                            aria-controls="pills-prescription"
                            aria-selected="false"
                          >
                            Prescriptions
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-complain"
                          role="tabpanel"
                          aria-labelledby="pills-complain-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Presenting Complains</h4>

                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        onChange={(e) =>
                                          this.handleChange(
                                            "clarking",
                                            "presentingComplaints",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.clarking
                                            ?.presentingComplaints ?? ""
                                        }
                                        placeholder="Enter Presenting Complains Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "clarking",
                                              ["presentingComplaints"],
                                              e
                                            )
                                          }
                                        >
                                          Record Presenting Complaints
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-history"
                          role="tabpanel"
                          aria-labelledby="pills-history-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>History of Presenting Complain</h4>

                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter History of Presenting Complain Here"
                                        rows={3}
                                        onChange={(e) =>
                                          this.handleChange(
                                            "clarking",
                                            "historyOfPresentingComplaints",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.clarking
                                            ?.historyOfPresentingComplaints
                                        }
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "clarking",
                                              ["historyOfPresentingComplaints"],
                                              e
                                            )
                                          }
                                        >
                                          Save History
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-review"
                          role="tabpanel"
                          aria-labelledby="pills-review-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Review of System</h4>

                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Review of System Here"
                                        rows={3}
                                        onChange={(e) =>
                                          this.handleChange(
                                            "clarking",
                                            "reviewOfSystem",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.clarking?.reviewOfSystem
                                        }
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "clarking",
                                              ["reviewOfSystem"],
                                              e
                                            )
                                          }
                                        >
                                          Save Review of System
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-physical"
                          role="tabpanel"
                          aria-labelledby="pills-physical-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Physical Examination</h4>

                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Patient Physical Examination"
                                        rows={3}
                                        onChange={(e) =>
                                          this.handleChange(
                                            "clarking",
                                            "physicalExamination",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.clarking
                                            ?.physicalExamination
                                        }
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "clarking",
                                              ["physicalExamination"],
                                              e
                                            )
                                          }
                                          className="btn btn-primary"
                                        >
                                          Save Physical Examination
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-diagonis"
                          role="tabpanel"
                          aria-labelledby="pills-diagonis-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Diagnosis</h4>

                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Diagnosis"
                                        rows={3}
                                        onChange={(e) =>
                                          this.handleChange(
                                            "clarking",
                                            "diagnosis",
                                            e
                                          )
                                        }
                                        value={this.state.clarking?.diagnosis}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "clarking",
                                              ["diagnosis"],
                                              e
                                            )
                                          }
                                          className="btn btn-primary"
                                        >
                                          Save Diagnosis
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-treatment"
                          role="tabpanel"
                          aria-labelledby="pills-treatment-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Treatment Plan</h4>

                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Treatment Plan"
                                        rows={3}
                                        onChange={(e) =>
                                          this.handleChange(
                                            "clarking",
                                            "treatmentPlan",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.clarking?.treatmentPlan
                                        }
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "clarking",
                                              ["treatmentPlan"],
                                              e
                                            )
                                          }
                                        >
                                          Save Treatment Plan
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-obstetrics"
                          role="tabpanel"
                          aria-labelledby="pills-obstetrics-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Obstetrics and Gynaecologist</h4>

                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Obstetrics"
                                        rows={3}
                                        onChange={(e) =>
                                          this.handleChange(
                                            "clarking",
                                            "obstetricsAndGynecology",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.clarking
                                            ?.obstetricsAndGynecology
                                        }
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "clarking",
                                              ["obstetricsAndGynecology"],
                                              e
                                            )
                                          }
                                        >
                                          Save Obstetrics and Gynaecologist
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-prescription"
                          role="tabpanel"
                          aria-labelledby="pills-prescription-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Prescription</h4>

                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Prescriptions"
                                        rows={3}
                                        onChange={(e) =>
                                          this.handleChange(
                                            "clarking",
                                            "prescription",
                                            e
                                          )
                                        }
                                        value={
                                          this.state.clarking?.prescription
                                        }
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col"></div>
                                      <div className="col text-right">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={(e) =>
                                            this.handleSubmit(
                                              "clarking",
                                              ["prescription"],
                                              e
                                            )
                                          }
                                        >
                                          Prescribe
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div
                          className="tab-pane fade"
                          id="pills-prescription"
                          role="tabpanel"
                          aria-labelledby="pills-prescription-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <form className="mb-4">
                                    <h4>Prescription</h4>

                                    <div className="form-group">
                                      <label>Prescription</label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter your prescriptions her e"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                        >
                                          Save Prescriptions
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
                                          <span className="d-sm-none">
                                            Cancel
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-health-history"
                    role="tabpanel"
                    aria-labelledby="v-pills-health-history-tab"
                  >
                    <div>
                      <ul
                        className="nav nav-tabs mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="pills-pre-consultation-tab"
                            data-toggle="pill"
                            href="#pills-pre-consultation"
                            role="tab"
                            aria-controls="pills-pre-consultation"
                            aria-selected="true"
                          >
                            Pre-Consultation History
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-clarking-history-tab"
                            data-toggle="pill"
                            href="#pills-clarking-history"
                            role="tab"
                            aria-controls="pills-clarking-history"
                            aria-selected="false"
                          >
                            Clerking History
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-patient-profile-tab"
                            data-toggle="pill"
                            href="#pills-patient-profile"
                            role="tab"
                            aria-controls="pills-patient-profile"
                            aria-selected="false"
                          >
                            Patient Profile
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-pre-consultation"
                          role="tabpanel"
                          aria-labelledby="pills-pre-consultation-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <PreConsultationHistory
                                  patientDetails={{ id, firstName, lastName }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-clarking-history"
                          role="tabpanel"
                          aria-labelledby="pills-clarking-history-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <ClarkingHistory
                                  patientDetails={{ id, firstName, lastName }}
                                  reMount={this.state.reMount}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-patient-profile"
                          role="tabpanel"
                          aria-labelledby="pills-patient-profile-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  <PatientProfile patientId={id} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-settings"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab"
                  >
                    <div>
                      <ul
                        className="nav nav-tabs mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="pills-lab-history-tab"
                            data-toggle="pill"
                            href="#pills-lab-history"
                            role="tab"
                            aria-controls="pills-lab-history"
                            aria-selected="true"
                          >
                            Lab/Service History
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-lab-history"
                          role="tabpanel"
                          aria-labelledby="pills-lab-history-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <LabResults patientId={id} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </main>
        {/* <AdmissionReferral/> */}
      </>
    );
  }
}

export default observer(WardRoundNotes);
