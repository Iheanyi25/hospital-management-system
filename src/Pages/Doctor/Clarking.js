import React from "react";
import { PageLoader } from "../../Components";

class Clarking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      doctorQueue: null,
      canceledConsultations: [],
      completedConsultations: [],
      pendingConsultations: [],
    };
  }

  async getDoctorQueue() {
    var canceledConsultations = [];
    var completedConsultations = [];
    var pendingConsultations = [];
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Doctor/GetDoctorQueue`);
    const data = await response.json();

    this.setState({ doctorQueue: data.patientQueue });

    data.patientQueue.forEach((patientQueue) => {
      if (patientQueue.isCanceled === true) {
        canceledConsultations.push(patientQueue);
      } else if (patientQueue.isCompleted === true) {
        completedConsultations.push(patientQueue);
      } else {
        pendingConsultations.push(patientQueue);
      }
    });
    console.log(canceledConsultations);
    console.log(completedConsultations);
    console.log(pendingConsultations);
    this.setState({
      canceledConsultations: canceledConsultations,
      completedConsultations: completedConsultations,
      pendingConsultations: pendingConsultations,
    });
  }

  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content mt-5">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header">
              <h3 className="page-title">Doctor Clarking</h3>
            </header>
            <div className="page-content">
              <div className="row">
                <div
                  className="nav flex-column nav-pills col-md-3"
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
                    Clarking
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
                </div>
                <div className="tab-content col-md-9" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div>
                      <ul
                        className="nav nav-pills mb-3"
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
                            Social History
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
                            Family History
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
                            Medical History
                          </a>
                        </li>
                        <li className="nav-item">
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
                        </li>
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
                                  <form className="mb-4">
                                    <h4>Social History</h4>

                                    <div className="form-group">
                                      <label>
                                        Additons like smoking, drinking etc
                                      </label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Social History Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Record Social History
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
                                        Heriditory sickness like mental health,
                                        blood pressure etc
                                      </label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Family History Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save Family History
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
                                        Common sickness like Hepitities etc
                                      </label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Medical History Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save Medical History
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
                                        placeholder="Countries Visitied"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>Date Visited</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Date Visited"
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save Travel History
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
                        className="nav nav-pills mb-3"
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
                            Presenting Complains
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
                            History of Presenting Complain
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
                            Obstetrics and Gynecology
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
                                      <label>Presenting Complains</label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Presenting Complains Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Record Presenting Complains
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
                                      <label>
                                        Patient History of Presenting Complains
                                      </label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter History of Presenting Complain Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save
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
                                      <label>Review of System Here</label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Riview od System Here"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save Review of System
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
                                      <label>
                                        Patient Physical Examination
                                      </label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Patient Physical Examination"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save Physical Examination
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
                                      <label>Diagnosis</label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Diagnosis"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save Diagnosis
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
                                      <label>Patient Treatment Plan</label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Treatment Plan"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save Treatment Plan
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
                                    <h4>Obstetrics and Gynecology</h4>

                                    <div className="form-group">
                                      <label>Obstetrics and Gynecology</label>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter Obstetrics"
                                        rows={3}
                                      />
                                    </div>

                                    <div className="row">
                                      <div className="col">
                                        <button
                                          type="button"
                                          className="btn btn-success"
                                        >
                                          Save Obstetrics and Gynecology
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
                                          className="btn btn-success"
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
                        </div>
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
                        className="nav nav-pills mb-3"
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
                            Clarking History
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
                                <div className="card-body">

                                  <h4>History of Pre-Consultation History</h4>
                                  <div id="accordion">
                                    <div className="card mb-0">
                                      <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                          <button className="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Collapsible Group Item #1
                                            </button>
                                        </h5>
                                      </div>
                                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div className="card-body">
                                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                          </div>
                                      </div>
                                    </div>
                                    <div className="card mb-0">
                                      <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                          <button className="btn btn-primary btn-block collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Collapsible Group Item #2
                                            </button>
                                        </h5>
                                      </div>
                                      <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="card-body">
                                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                          </div>
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
                          id="pills-clarking-history"
                          role="tabpanel"
                          aria-labelledby="pills-clarking-history-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">

                                  <h4>History of Clarking History</h4>
                                  <div id="accordion">
                                    <div className="card mb-0">
                                      <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                          <button className="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Collapsible Group Item #1
                                          </button>
                                        </h5>
                                      </div>
                                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div className="card-body">
                                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card mb-0">
                                      <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                          <button className="btn btn-primary btn-block collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Collapsible Group Item #2
                                          </button>
                                        </h5>
                                      </div>
                                      <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="card-body">
                                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                        </div>
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
                          id="pills-patient-profile"
                          role="tabpanel"
                          aria-labelledby="pills-patient-profile-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">

                                  <h4>Patient Profile</h4>



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
                        className="nav nav-pills mb-3"
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
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-service-request-tab"
                            data-toggle="pill"
                            href="#pills-service-request"
                            role="tab"
                            aria-controls="pills-service-request"
                            aria-selected="false"
                          >
                            Request New Service
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
                                <div className="card-body">

                                  <h4>Lab/Service Result History</h4>
                                  <div id="accordion">
                                    <div className="card mb-0">
                                      <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                          <button className="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Collapsible Group Item #1
                                            </button>
                                        </h5>
                                      </div>
                                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div className="card-body">
                                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                          </div>
                                      </div>
                                    </div>
                                    <div className="card mb-0">
                                      <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                          <button className="btn btn-primary btn-block collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Collapsible Group Item #2
                                            </button>
                                        </h5>
                                      </div>
                                      <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="card-body">
                                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                          </div>
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
                          id="pills-service-request"
                          role="tabpanel"
                          aria-labelledby="pills-service-request-tab"
                        >
                          <div className="row justify-content-center mt-5">
                            <div className="col-md-12">
                              <div className="card border-light">
                                <div className="card-body">
                                  Service Request Goes Here
                                  
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
          </div>
        </main>
      </>
    );
  }
}

export default Clarking;
