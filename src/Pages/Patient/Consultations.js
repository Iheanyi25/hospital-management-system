import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getPatientAllConsulationsUrl,
  cancelPatientConsulationsUrl
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import DoctorImage from "../../assets/img/DoctorIcon.svg"


const $ = window.$;
$.Datatable = require("datatables.net");

class Consultations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      patientConsultations: null,
      canceledConsultations: [],
      completedConsultations: [],
      pendingConsultations: [],
    };
  }

  async componentDidMount() {
    await this.getpatientConsultations();
  }

  async getpatientConsultations() {
    var canceledConsultations = [];
    var completedConsultations = [];
    var pendingConsultations = [];
    const { patientId } = this.state;

    const getPatientAllConsulations = getPatientAllConsulationsUrl(patientId);
    const getPatientAllConsulationsConfig = fetchConfig({
      url: getPatientAllConsulations,
      method: "get",
    });
    const { data } = await fetchWrapper(getPatientAllConsulationsConfig);

    await this.setState({ patientConsultations: data.patientConsultations });

    console.log({ data });
    data.patientConsultations.forEach((patientConsultations) => {
      if (patientConsultations.isCanceled === true) {
        canceledConsultations.push(patientConsultations);
      } else if (patientConsultations.isCompleted === true) {
        completedConsultations.push(patientConsultations);
      } else {
        pendingConsultations.push(patientConsultations);
      }
    });

    this.setState(
      {
        canceledConsultations: canceledConsultations,
        completedConsultations: completedConsultations,
        pendingConsultations: pendingConsultations,
      },
      () => this.sync()
    );
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
  }

  cancelConsultation = async (id) => {
    const cancelPatientConsulations = cancelPatientConsulationsUrl(id);
    const cancelPatientConsulationsConfig = fetchConfig({
      url: cancelPatientConsulations,
      method: "patch",
    });
    const res = await fetchWrapper(cancelPatientConsulationsConfig);
    if (res) {
      alert(res.message);
      this.getpatientConsultations();
    }
  };

  render() {
    const {
      canceledConsultations,
      completedConsultations,
      pendingConsultations,
    } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Pending Consultations</h6>
                        <div className="count text-primary fs-20">
                          {pendingConsultations?.length ?? 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-03s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Finalized Consultations</h6>
                        <div className="count text-primary fs-20">
                          {completedConsultations?.length ?? 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-04s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-list"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1 text-nowrap">
                          Canceled Consultations
                        </h6>
                        <div className="count text-primary fs-20">
                          {canceledConsultations?.length ?? 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <header className="page-header">
              <h4 className="page-title">My Consultations</h4>
            </header>
            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div>
                    <ul
                      className="nav nav-tabs mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="pills-pending-tab"
                          data-toggle="pill"
                          href="#pills-pending"
                          role="tab"
                          aria-controls="pills-pending"
                          aria-selected="true"
                        >
                          Pending Consultations
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-completed-tab"
                          data-toggle="pill"
                          href="#pills-completed"
                          role="tab"
                          aria-controls="pills-completed"
                          aria-selected="false"
                        >
                          Completed Consultations
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-cancelled-tab"
                          data-toggle="pill"
                          href="#pills-cancelled"
                          role="tab"
                          aria-controls="pills-cancelled"
                          aria-selected="false"
                        >
                          Canceled Consultations
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-pending"
                        role="tabpanel"
                        aria-labelledby="pills-pending-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(en) => (this.en = en)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Doctors Name</th>
                                <th>Consultation Title</th>
                                <th>Reason For Consultation</th>
                                <th>Date</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingConsultations &&
                                pendingConsultations.map((queue) => (
                                  <tr>
                                    <td>
                                      <img
                                        src={DoctorImage}
                                        alt="hello"
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {queue.doctor?.firstName}{" "}
                                      {queue.doctor?.lastName ??
                                        "none assigned"}
                                    </td>
                                    <td>{queue.consultationTitle}</td>
                                    <td>{queue.reasonForConsultation}</td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(
                                          queue.dateOfConsultation
                                        ).toDateString()}
                                      </div>
                                    </td>

                                    <td>
                                      <div className="btn-group">
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-sm btn-block dropdown-toggle"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          Action
                                        </button>
                                        <div className="dropdown-menu text-left">
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={(e) =>
                                              this.cancelConsultation(queue.id)
                                            }
                                          >
                                            Cancel Consultation
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(em) => (this.em = em)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Doctors Name</th>
                                <th>Consultation Title</th>
                                <th>Reason For Consultation</th>
                                <th>Date</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {completedConsultations &&
                                completedConsultations.map((queue) => (
                                  <tr>
                                    <td>
                                      <img
                                        src={DoctorImage}
                                        alt="hello"
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {queue.doctor?.firstName}{" "}
                                      {queue.doctor?.lastName ??
                                        "none assigned"}
                                    </td>
                                    <td>{queue.consultationTitle}</td>
                                    <td>{queue.reasonForConsultation}</td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(
                                          queue.dateOfConsultation
                                        ).toDateString()}
                                      </div>
                                    </td>

                                    <td>
                                      <div className="btn-group">
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-sm btn-block dropdown-toggle"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          Action
                                        </button>
                                        <div className="dropdown-menu text-left">
                                          <Link
                                            type="button"
                                            className="btn btn-primary"
                                            to="/PatientClarkingHistory"
                                          >
                                            View Clerking History
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="pills-cancelled"
                        role="tabpanel"
                        aria-labelledby="pills-cancelled-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(el) => (this.el = el)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Doctors Name</th>
                                <th>Consultation Title</th>
                                <th>Reason For Consultation</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {canceledConsultations &&
                                canceledConsultations.map((queue) => (
                                  <tr>
                                    <td>
                                      <img
                                        src={DoctorImage}
                                        alt="hello"
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {queue.doctor?.firstName}{" "}
                                      {queue.doctor?.lastName ??
                                        "none assigned"}
                                    </td>
                                    <td>{queue.consultationTitle}</td>
                                    <td>{queue.reasonForConsultation}</td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(
                                          queue.dateOfConsultation
                                        ).toDateString()}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
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

export default Consultations;
