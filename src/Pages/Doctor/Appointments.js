import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDoctorAcceptAppointmentUrl, getDoctorAllAppointmentsUrl, postDoctorCancelAppointmentUrl, postDoctorRejectAppointmentUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import formatDate from "../../utils/formatDate";
import formatTime from "../../utils/formatTime";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      appointmentId: null,
      acceptedAppointments: [],
      acceptedAppointmentsCount: 0,
      activeAppointments: [],
      pendingAppointments: [],
      pendingAppointmentsCount: 0,
      completedAppointments: [],
      rejectedAppointmentsCount: 0,
    };
  }

  async getDoctorAppointments() {
    var acceptedAppointments = [];
    var activeAppointments = [];
    var pendingAppointments = [];
    var completedAppointments = [];
    var rejectedAppointments = [];

    const getDoctorAllAppointments = getDoctorAllAppointmentsUrl(this.state.doctorId)
    const getDoctorAllAppointmentsConfig = fetchConfig({url : getDoctorAllAppointments, method : 'get'})
    const { data } = await fetchWrapper(getDoctorAllAppointmentsConfig)

    this.setState({ appointments: data.appointments });
    console.log(data.appointments,11111);
    data.appointments.forEach((appointment) => {
      if (appointment.isAccepted === true) {
        acceptedAppointments.push(appointment);
      } else if (appointment.isCompleted === true) {
        completedAppointments.push(appointment);
      } else if (appointment.isRejected === true) {
        rejectedAppointments.push(appointment);
      } else {
        pendingAppointments.push(appointment);
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

  async componentDidMount() {
    this.getDoctorAppointments().then(() => this.sync());
  }

  sync() {
    this.$ek = $(this.ek);
    this.$ek.DataTable();
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
  }

  async acceptAppointment(e, id) {
    e.preventDefault();

    try {
      const postDoctorAcceptAppointment = postDoctorAcceptAppointmentUrl(id)
      const postDoctorAcceptAppointmentConfig = fetchConfig({url : postDoctorAcceptAppointment, method : 'post'})
      const res = await fetchWrapper(postDoctorAcceptAppointmentConfig)
      const {error} = res;
      console.log(res,22222)
      if (res.status !== 200) {
        throw Error(error.message);
      }

      this.setState({ success: true });
      this.getDoctorAppointments().then(() => this.sync());
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
  }

  async rejectAppointment(e, id) {
    e.preventDefault();

    try {

      const postDoctorRejectAppointment = postDoctorRejectAppointmentUrl(id)
      const postDoctorRejectAppointmentConfig = fetchConfig({url : postDoctorRejectAppointment, method : 'post'})
      const res = await fetchWrapper(postDoctorRejectAppointmentConfig)
      const {error} = res;
      console.log(res,33333)

      if (res.status !== 200) {
        throw Error(error.message);
      }

      this.setState({ success: true });
      this.getDoctorAppointments().then(() => this.sync());
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
  }

  async cancelAppointment(e, id) {
    e.preventDefault();

    try {
      const postDoctorCancelAppointment = postDoctorCancelAppointmentUrl(id)
      const postDoctorCancelAppointmentConfig = fetchConfig({url : postDoctorCancelAppointment, method : 'post'})
      const res = await fetchWrapper(postDoctorCancelAppointmentConfig)
      const {error} = res;
      console.log(res,4444)
      if (res.status !== 200) {
        throw Error(error.message);
      }
      this.setState({ success: true });
      this.getDoctorAppointments().then(() => this.sync());
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
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
                        <h6 className="mt-0 mb-1">Pending Appointments</h6>
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
                        <h6 className="mt-0 mb-1">Accepted Appointments</h6>
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
                          Rejected Appointments
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
              <h4 className="page-title"> Appointments List</h4>
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
                          className="nav-link active show"
                          id="pills-pending-tab"
                          data-toggle="pill"
                          href="#pills-pending"
                          role="tab"
                          aria-controls="pills-pending"
                          aria-selected="false"
                        >
                          Pending Appointments
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
                          Accepted Apppointments
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
                          Completed Appointments
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane show fade active"
                        id="pills-pending"
                        role="tabpanel"
                        aria-labelledby="pills-pending-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(ek) => (this.ek = ek)}
                            className="table table-striped"
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
                              {pendingAppointments
                                ? pendingAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        {appointment.appointmentTitle}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        {appointment.reasonForAppointment}
                                      </div>
                                    </td>
                                    <td>
                                      {appointment.patient?.firstName}{" "}
                                      {appointment.patient?.lastName}
                                    </td>
                                    <td>
                                      {appointment.patient?.phoneNumber}{" "}
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {formatDate(
                                          appointment.appointmentDate
                                        ) ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {formatTime(
                                          appointment.appointmentTime
                                        ) ?? ""}
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
                                            title="Accept Appointment"
                                            onClick={(e) =>
                                              this.acceptAppointment(
                                                e,
                                                appointment.id
                                              )
                                            }
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                              Accept Appointment
                                            </button>
                                          <button
                                            title="Reject Appointment"
                                            onClick={(e) =>
                                              this.rejectAppointment(
                                                e,
                                                appointment.id
                                              )
                                            }
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                              Reject Appointment
                                            </button>
                                        </div>
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
                            className="table table-striped"
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
                                ? acceptedAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        {appointment.appointmentTitle}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        {appointment.reasonForAppointment}
                                      </div>
                                    </td>
                                    <td>
                                      {appointment.patient?.firstName}{" "}
                                      {appointment.patient?.lastName}
                                    </td>
                                    <td>
                                      {appointment.patient?.phoneNumber}{" "}
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {formatDate(
                                          appointment.appointmentDate
                                        ) ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {formatTime(
                                          appointment.appointmentTime
                                        ) ?? ""}
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
                                            title="Go for clarking"
                                            to={{
                                              pathname: "/DoctorClarking",
                                              state: {
                                                id: appointment.id,
                                                type: "appointment",
                                                patient: appointment.patient
                                              }
                                            }}
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="btn-icon icofont-user" />
                                            Go for Clarking
                                          </Link>
                                          <Link
                                            title="Clarking History"
                                            to={{
                                              pathname: "/ViewClarkingHistory",
                                              state: {
                                                id: appointment.patient.id,
                                                firstName: appointment.patient.firstName,
                                                lastName: appointment.patient.lastName
                                              },
                                            }}
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                                            Clarking History
                                          </Link>
                                          <button
                                            title="Accept Appointment"
                                            onClick={(e) =>
                                              this.acceptAppointment(
                                                e,
                                                appointment.id
                                              )
                                            }
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                              Accept Appointment
                                            </button>
                                          <button
                                            title="Reject Appointment"
                                            onClick={(e) =>
                                              this.rejectAppointment(
                                                e,
                                                appointment.id
                                              )
                                            }
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                              Reject Appointment
                                            </button>
                                        </div>
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
                            className="table table-striped"
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
                                ? completedAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        {appointment.appointmentTitle}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        {appointment.reasonForAppointment}
                                      </div>
                                    </td>
                                    <td>
                                      {appointment.patient?.firstName}{" "}
                                      {appointment.patient?.lastName}
                                    </td>
                                    <td>
                                      {appointment.patient?.phoneNumber}{" "}
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {formatDate(
                                          appointment.appointmentDate
                                        ) ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {formatTime(
                                          appointment.appointmentTime
                                        ) ?? ""}
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
                                            title="Clarking History"
                                            to={{
                                              pathname: "/ViewClarkingHistory",
                                              state: {
                                                id: appointment.patient.id,
                                                firstName: appointment.patient.firstName,
                                                lastName: appointment.patient.lastName
                                              },
                                            }}
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                                            Clarking History
                                          </Link>
                                          {/* <button
                                            title="Accept Appointment"
                                            onClick={(e) =>
                                              this.acceptAppointment(
                                                e,
                                                appointment.id
                                              )
                                            }
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                              Accept Appointment
                                            </button>
                                          <button
                                            title="Reject Appointment"
                                            onClick={(e) =>
                                              this.rejectAppointment(
                                                e,
                                                appointment.id
                                              )
                                            }
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                              Reject Appointment
                                            </button> */}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>

                                ))
                                : null}
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

export default Appointments;
