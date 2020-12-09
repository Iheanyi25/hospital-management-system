import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class Consultations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      patientQueue: null,
      acceptedAppointments: [],
      acceptedAppointmentsCount: 0,
      activeAppointments: [],
      pendingAppointments: [],
      pendingAppointmentsCount: 0,
      completedAppointments: [],
      rejectedAppointmentsCount: 0,
    };
  }

  async componentDidMount() {
    const { apiUrl } = this.state;

    var acceptedAppointments = [];
    var activeAppointments = [];
    var pendingAppointments = [];
    var completedAppointments = [];
    var rejectedAppointments = [];

    const response = await fetch(
      `${apiUrl}/Doctor/ViewAllConsultations?DoctorId=${this.state.doctorId}`
    );

    const data = await response.json();
    console.log({ data });

    this.setState({ doctorConsultations: data.doctorConsultations });

    data.doctorConsultations.forEach((queue) => {
      if (queue.isActive === true) {
        activeAppointments.push(queue);
      } else if (queue.isAccepted === true) {
        acceptedAppointments.push(queue);
      } else if (queue.isCompleted === true) {
        completedAppointments.push(queue);
      } else if (queue.isRejected === true) {
        rejectedAppointments.push(queue);
      } else {
        pendingAppointments.push(queue);
      }
    });

    this.setState({
      activeAppointments: activeAppointments,
      activeAppointmentsCount: activeAppointments.length,
      acceptedAppointments: acceptedAppointments,
      acceptedAppointmentsCount: acceptedAppointments.length,
      completedAppointments: completedAppointments,
      completedAppointmentsCount: completedAppointments.length,
      pendingAppointments: pendingAppointments,
      pendingAppointmentsCount: pendingAppointments.length,
      rejectedAppointmentsCount: rejectedAppointments.length,
    });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
  }

  render() {
    const {
      acceptedAppointments,
      acceptedAppointmentsCount,
      pendingAppointments,
      pendingAppointmentsCount,
      completedAppointments,
      rejectedAppointmentsCount,
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
                        <h6 className="mt-0 mb-1">Total Patient on Queue</h6>
                        <div className="count text-primary fs-20">
                          {pendingAppointmentsCount}
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
                        <h6 className="mt-0 mb-1">Total Patients Unattended</h6>
                        <div className="count text-primary fs-20">
                          {acceptedAppointmentsCount}
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
                          Total Patients Attended
                        </h6>
                        <div className="count text-primary fs-20">
                          {rejectedAppointmentsCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <header className="page-header">
              <h4 className="page-title">My Consultation List</h4>
            </header>
            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div>
                    <ul
                      className="nav nav-pills nav-fill mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="pills-active-tab"
                          data-toggle="pill"
                          href="#pills-active"
                          role="tab"
                          aria-controls="pills-active"
                          aria-selected="true"
                        >
                          Patients Waiting
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-accepted-tab"
                          data-toggle="pill"
                          href="#pills-accepted"
                          role="tab"
                          aria-controls="pills-accepted"
                          aria-selected="false"
                        >
                          Patients Attended
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
                          All Patients
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane show fade active"
                        id="pills-active"
                        role="tabpanel"
                        aria-labelledby="pills-active-tab"
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
                                {/* <th>Title</th>
                                <th>Reason for appointment</th> */}
                                {/* <th className="text-nowrap">Doctor</th> */}
                                <th>Title</th>
                                <th>Reason for Consultation</th>
                                <th className="text-nowrap">Patient</th>
                                <th className="text-nowrap">Patient Contact</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingAppointments
                                ? pendingAppointments.map((consultation) => (
                                    <tr>
                                      <td>
                                        {
                                          consultation.patientQueue
                                            .consultationTitle
                                        }
                                      </td>
                                      <td>
                                        {
                                          consultation.patientQueue
                                            .reasonForConsultation
                                        }
                                      </td>
                                      <td>
                                        {consultation.patient.firstName}{" "}
                                        {consultation.patient.lastName}
                                      </td>
                                      <td>
                                        <div className="d-flex align-items-center nowrap">
                                          {consultation.patient.phoneNumber}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {new Date(
                                            consultation.patientQueue.dateOfConsultation
                                          ).toLocaleDateString()}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {new Date(
                                            consultation.patientQueue.dateOfConsultation
                                          ).toLocaleTimeString()}
                                        </div>
                                      </td>

                                      <td>
                                        <div className="actions">
                                          {/* <Link
                                          title="Pre-consultation"
                                          to="/AdminPreConsultation"
                                          className="btn btn-secondary btn-sm btn-square rounded-pill"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link> */}
                                          <Link
                                            title="Clarking"
                                            to={{
                                              pathname: "/DoctorClarking",
                                              state: {
                                                type: "consultation",
                                                id:
                                                  consultation.patientQueue.id,
                                                patient: consultation.patient,
                                              },
                                            }}
                                            className="btn btn-secondary btn-sm btn-square rounded-pill"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt" />
                                          </Link>
                                          <Link
                                            title="Clarking History"
                                            to={{
                                              pathname: "/ViewClarkingHistory",
                                              state: {
                                                id: consultation.patient.id,
                                                firstName:
                                                  consultation.patient
                                                    .firstName,
                                                lastName:
                                                  consultation.patient.lastName,
                                              },
                                            }}
                                            className="btn btn-primary btn-sm btn-square rounded-pill"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt" />
                                          </Link>

                                          {/* <button className="btn btn-info btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-edit" />
                                        </button>
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button> */}
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(em) => (this.em = em)}
                            className="table data-table"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Reason for appointment</th>
                                <th className="text-nowrap">Patient</th>
                                <th className="text-nowrap">Patient Contact</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {acceptedAppointments
                                ? acceptedAppointments.map((consultation) => (
                                    <tr>
                                      <td>
                                        {
                                          consultation.patientQueue
                                            .consultationTitle
                                        }
                                      </td>
                                      <td>
                                        {
                                          consultation.patientQueue
                                            .reasonForConsultation
                                        }
                                      </td>
                                      <td>
                                        {consultation.patient.firstName}{" "}
                                        {consultation.patient.lastName}
                                      </td>
                                      <td>
                                        <div className="d-flex align-items-center nowrap">
                                          {consultation.patient.phoneNumber}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {new Date(
                                            consultation.patientQueue.dateOfConsultation
                                          ).toLocaleDateString()}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {new Date(
                                            consultation.patientQueue.dateOfConsultation
                                          ).toLocaleTimeString()}
                                        </div>
                                      </td>

                                      <td>
                                        <div className="actions">
                                          {/* <Link
                                        title="Pre-consultation"
                                        to="/AdminPreConsultation"
                                        className="btn btn-secondary btn-sm btn-square rounded-pill"
                                      >
                                        <span className="btn-icon icofont-stethoscope-alt" />
                                      </Link> */}
                                          <Link
                                            title="Clarking"
                                            to={{
                                              pathname: "/DoctorClarking",
                                              state: {
                                                type: "consultation",
                                                id:
                                                  consultation.patientQueue.id,
                                                patient: consultation.patient,
                                              },
                                            }}
                                            className="btn btn-secondary btn-sm btn-square rounded-pill"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt" />
                                          </Link>
                                          <button className="btn btn-info btn-sm btn-square rounded-pill">
                                            <span className="btn-icon icofont-ui-edit" />
                                          </button>
                                          <button className="btn btn-error btn-sm btn-square rounded-pill">
                                            <span className="btn-icon icofont-ui-delete" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                : null}
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
                            ref={(en) => (this.en = en)}
                            className="table data-table"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Reason for appointment</th>
                                <th className="text-nowrap">Patient</th>
                                <th className="text-nowrap">Patient Contact</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {completedAppointments
                                ? completedAppointments.map((consultation) => (
                                    <tr>
                                      <td>
                                        {
                                          consultation.patientQueue
                                            .consultationTitle
                                        }
                                      </td>
                                      <td>
                                        {
                                          consultation.patientQueue
                                            .reasonForConsultation
                                        }
                                      </td>
                                      <td>
                                        {consultation.patient.firstName}{" "}
                                        {consultation.patient.lastName}
                                      </td>
                                      <td>
                                        <div className="d-flex align-items-center nowrap">
                                          {consultation.patient.phoneNumber}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {new Date(
                                            consultation.patientQueue.dateOfConsultation
                                          ).toLocaleDateString()}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {new Date(
                                            consultation.patientQueue.dateOfConsultation
                                          ).toLocaleTimeString()}
                                        </div>
                                      </td>

                                      <td>
                                        <div className="actions">
                                          {/* <Link
                                      title="Pre-consultation"
                                      to="/AdminPreConsultation"
                                      className="btn btn-secondary btn-sm btn-square rounded-pill"
                                    >
                                      <span className="btn-icon icofont-stethoscope-alt" />
                                    </Link> */}
                                          <Link
                                            title="Clarking"
                                            to={{
                                              pathname: "/DoctorClarking",
                                              state: {
                                                type: "consultation",
                                                id:
                                                  consultation.patientQueue.id,
                                                patient: consultation.patient,
                                              },
                                            }}
                                            className="btn btn-secondary btn-sm btn-square rounded-pill"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt" />
                                          </Link>
                                          <button className="btn btn-info btn-sm btn-square rounded-pill">
                                            <span className="btn-icon icofont-ui-edit" />
                                          </button>
                                          <button className="btn btn-error btn-sm btn-square rounded-pill">
                                            <span className="btn-icon icofont-ui-delete" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* <div
                        className="tab-pane fade"
                        id="pills-pending"
                        role="tabpanel"
                        aria-labelledby="pills-pending-tab"
                      >
                        <div className="table-responsive">
                          <table
                            className="table data-table"
                            data-columns='[
                                                                    { "data": "photo" },
                                                                    { "data": "name" },
                                                                    { "data": "email" },
                                                                    { "data": "phone" },
                                                                    { "data": "date-of-birth" },
                                                                    { "data": "address" },
                                                                    { "data": "actions" }
                                                                ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date Of Birth</th>
                                <th>Address</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingAppointments
                                ? pendingAppointments.map((consultation) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      {[
                                        consultation.firstName,
                                        consultation.lastName,
                                      ].toString(" ")}
                                    </td>
                                    <td>
                                      <strong>Liam</strong>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        <span className="icofont-ui-email p-0 mr-2" />
                                          liam@gmail.com
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        10 Feb 2018
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        9:15 - 9:45
                                        </div>
                                    </td>

                                    <td>
                                      <div className="actions">
                                        <Link
                                          title="Pre-consultation"
                                          onClick={() =>
                                            (window.location.href =
                                              "/AdminPreConsultation")
                                          }
                                          to="/AdminPreConsultation"
                                          className="btn btn-secondary btn-sm btn-square rounded-pill"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link>
                                        <button className="btn btn-info btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-edit" />
                                        </button>
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-action-box">
                <button
                  className="btn btn-primary btn-lg btn-square rounded-pill"
                  data-toggle="modal"
                  data-target="#add-consultation"
                >
                  <span className="btn-icon icofont-stethoscope-alt" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Consultations;
