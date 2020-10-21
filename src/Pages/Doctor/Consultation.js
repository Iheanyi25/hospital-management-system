import React from "react";
import Header from "../../Components/Header/DoctorHeader";
import Sidebar from "../../Components/Sidebar/DoctorSidebar";
import Footer from "../../Components/Footer";
import TemplateSettings from "../../Components/TemplateSettings";
import PageLoader from "../../Components/PageLoader";

class Consultation extends React.Component {
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
        <div className="page-box">
          <div className="app-container">
            {/* Horizontal navbar---Header */}
            <Header></Header>

            {/* Vertical navbar */}
            <Sidebar></Sidebar>

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
                        Capture Patient Personnal Vitals
                      </a>
                      <a
                        className="nav-link"
                        id="v-pills-messages-tab"
                        data-toggle="pill"
                        href="#v-pills-messages"
                        role="tab"
                        aria-controls="v-pills-messages"
                        aria-selected="false"
                      >
                        Drug Prescription
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
                        Lab Prescription
                      </a>
                    </div>
                    <div
                      className="tab-content col-md-9"
                      id="v-pills-tabContent"
                    >
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
                                  <div class="card border-light">
                                    <div class="card-body">
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
                                  <div class="card border-light">
                                    <div class="card-body">
                                      <form className="mb-4">
                                        <h4>Family History</h4>

                                        <div className="form-group">
                                          <label>
                                            Heriditory sickness like mental
                                            health, blood pressure etc
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
                                  <div class="card border-light">
                                    <div class="card-body">
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
                                  <div class="card border-light">
                                    <div class="card-body">
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
                                Obstetrics
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="pills-gynecology-tab"
                                data-toggle="pill"
                                href="#pills-gynecology"
                                role="tab"
                                aria-controls="pills-gynecology"
                                aria-selected="false"
                              >
                                Gynecology
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
                                  <div class="card border-light">
                                    <div class="card-body">
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
                                  <div class="card border-light">
                                    <div class="card-body">
                                      <form className="mb-4">
                                        <h4>History of Presenting Complain</h4>

                                        <div className="form-group">
                                          <label>
                                            Patient History of Presenting
                                            Complains
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
                                  <div class="card border-light">
                                    <div class="card-body">
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
                                  <div class="card border-light">
                                    <div class="card-body">
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
                                  <div class="card border-light">
                                    <div class="card-body">
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
                                  <div class="card border-light">
                                    <div class="card-body">
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
                                  <div class="card border-light">
                                    <div class="card-body">
                                      <form className="mb-4">
                                        <h4>Obstetrics</h4>

                                        <div className="form-group">
                                          <label>Obstetrics</label>
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
                                              Save Obstetrics
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
                              id="pills-gynecology"
                              role="tabpanel"
                              aria-labelledby="pills-gynecology-tab"
                            >
                              <div className="row justify-content-center mt-5">
                                <div className="col-md-12">
                                  <div class="card border-light">
                                    <div class="card-body">
                                      <form className="mb-4">
                                        <h4>Gynecology</h4>

                                        <div className="form-group">
                                          <label>Gynecology</label>
                                          <textarea
                                            className="form-control"
                                            placeholder="Enter Gynecology"
                                            rows={3}
                                          />
                                        </div>

                                        <div className="row">
                                          <div className="col">
                                            <button
                                              type="button"
                                              className="btn btn-success"
                                            >
                                              Save Gynecology
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
                        id="v-pills-messages"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
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
                                Fresh Prescription
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
                                Prescription Templates
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
                                  <div class="card border-light">
                                    <div class="card-body">
                                      <form className="mb-4">
                                        <h4> Prescribe Drugs</h4>
                                        <div className="row border-primary">
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>Drug</label>
                                              <input
                                                className="form-control"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>Quantity</label>
                                              <input
                                                className="form-control"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>Dosage</label>
                                              <input
                                                className="form-control"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>Frequency</label>
                                              <input
                                                className="form-control"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-12">
                                            <div className="form-group">
                                              <label>Doctor Note</label>
                                              <textarea
                                                className="form-control"
                                                placeholder="Enter Comments Here"
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
                                              Prescribe Drugs
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
                                  <div class="card border-light">
                                    <div class="card-body">
                                      <form className="mb-4">
                                        <h4>History of Presenting Complain</h4>

                                        <div className="form-group">
                                          <label>
                                            Patient History of Presenting
                                            Complains
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
                                id="pills-complain-tab"
                                data-toggle="pill"
                                href="#pills-complain"
                                role="tab"
                                aria-controls="pills-complain"
                                aria-selected="true"
                              >
                                Fresh Prescription
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
                                Prescription Templates
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
                                  <div class="card border-light">
                                    <div class="card-body">
                                      <form className="mb-4">
                                        <h4> Prescribe Lab Test</h4>
                                        <div className="row border-primary">
                                          <div className="col-md-12">
                                            <div className="form-group">
                                              <label>Lab Test</label>
                                              <input
                                                className="form-control"
                                                type="text"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-12">
                                            <div className="form-group">
                                              <label>Doctor Note</label>
                                              <textarea
                                                className="form-control"
                                                placeholder="Enter Comments Here"
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
                                              Prescribe Lab
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
                                  <div class="card border-light">
                                    <div class="card-body">Lab Templates</div>
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

            {/* Footer */}
            <Footer />
          </div>
        </div>

        <TemplateSettings />
      </>
    );
  }
}

export default Consultation;
