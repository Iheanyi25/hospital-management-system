import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import { ReAssign } from "../../Components/Modals/ReAssignModal";

const apiUrl = process.env.REACT_APP_API_URL;
const $ = require("jquery");
$.Datatable = require("datatables.net");

class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeAppointments: [],
      activeAppointmentsCount: [],
      acceptedAppointments: [],
      acceptedAppointmentsCount: 0,
      completedAppointments: [],
      completedAppointmentsCount: 0,
      pendingAppointments: [],
      pendingAppointmentsCount: 0,
    };
  }
  async componentDidMount() {
    await this.getAllAppointments()
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
    this.$eo = $(this.eo);
    this.$eo.DataTable();
  }
  async getAllAppointments() {
    var acceptedAppointments = [];
    var activeAppointments = [];
    var pendingAppointments = [];
    var completedAppointments = [];
    var rejectedAppointments = [];
    const response = await fetch(`${apiUrl}/Admin/GetDoctorAppointments`);

    const data = await response.json();
    this.$el = $(this.el);
    this.$el.DataTable().destroy();
    this.setState({ appointments: data.doctorsAppointments }, () => this.sync());

    console.log({ data });

    data.doctorsAppointments.forEach((appointment) => {
      if (appointment.isActive === true) {
        activeAppointments.push(appointment);
      } else if (appointment.isAccepted === true) {
        acceptedAppointments.push(appointment);
      } else if (appointment.isCompleted === true) {
        completedAppointments.push(appointment);
      } else if (appointment.isRejected === true) {
        rejectedAppointments.push(appointment);
      } else {
        pendingAppointments.push(appointment);
      }
    });
    this.$el = $(this.el);
    this.$el.DataTable().destroy();
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
    }, () => this.sync());
  }

  async deleteAppointment(id) {

    const request = await fetch(apiUrl + "/Admin/DeleteAppointment", {
      method: "POST",
      headers: {
        "Content-type": " application/json"
      },
      body: JSON.stringify({ appointmentId: id })
    });

    const res = await request.json();
    if (res.success) {
      this.getAllAppointments()
      console.log({ res })
    }

  }

  render() {
    const {
      acceptedAppointments,
      acceptedAppointmentsCount,
      pendingAppointments,
      pendingAppointmentsCount,
      activeAppointments,
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
              <div className="col col-12 col-md-12 col-xl-4">
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
                            ref={(em) => (this.em = em)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr >
                                <th>Title</th>
                                <th>Reason for appointment</th>
                                <th className="text-nowrap">Doctor</th>
                                <th className="text-nowrap">Patient</th>
                                <th>Appointment Date</th>
                                <th>Appointment Time</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingAppointments
                                ? pendingAppointments.map((appointment, index) => (
                                  <tr key={index}>
                                    <td> <strong>{appointment?.appointmentTitle ?? " "}</strong></td>
                                    <td>
                                      <strong>{appointment?.reasonForAppointment ?? ""}</strong>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap">
                                        {appointment.doctor?.lastName ?? ""} {appointment.doctor?.firstName ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {appointment.patient?.lastName ?? ""} {appointment.patient?.firstName ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(appointment?.appointmentDate).toLocaleDateString()}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(appointment?.appointmentDate).toLocaleTimeString()}
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
                                            title="Go for Clarking"
                                            to={`/AdminPreConsultation/${appointment.patient.id}`}
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                                            Pre Consultation
                                          </Link>
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
                                            onClick={() => this.setState({ activeAppointment: appointment.id })}
                                            className="btn btn-sm btn-block"
                                            data-toggle="modal"
                                            data-target="#reassign-patient"
                                          >
                                            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                                            ReAssign to Doctor
                                          </button>
                                          <button
                                            className="btn btn-sm btn-block"
                                            onClick={(e) => this.deleteAppointment(e, appointment.id)}
                                          >
                                            <span className="mr-3 btn-icon icofont-delete-alt" />
                                            Delete Consultation
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
                            ref={(en) => (this.en = en)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Reason for appointment</th>
                                <th className="text-nowrap">Doctor</th>
                                <th className="text-nowrap">Patient</th>
                                <th>Appointment Date</th>
                                <th>Appointment Time</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {acceptedAppointments
                                ? acceptedAppointments.map((appointment, index) => (
                                  <tr key={index}>
                                    <td> <strong>{appointment?.appointmentTitle ?? " "}</strong></td>
                                    <td>
                                      <strong>{appointment?.reasonForAppointment ?? ""}</strong>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap">
                                        {appointment.doctor?.lastName ?? ""} {appointment.doctor?.firstName ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {appointment.patient?.lastName ?? ""} {appointment.patient?.firstName ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(appointment?.appointmentDate).toLocaleDateString()}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(appointment?.appointmentDate).toLocaleTimeString()}
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
                                            title="Go for Clarking"
                                            to={`/AdminPreConsultation/${appointment.patient.id}`}
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                                            Pre Consultation
                                          </Link>
                                          <button
                                            onClick={() => this.setState({ activeAppointment: appointment.id })}
                                            className="btn btn-sm btn-block"
                                            data-toggle="modal"
                                            data-target="#reassign-patient"
                                          >
                                            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                                            ReAssign to Doctor
                                          </button>
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
                                            className="btn btn-sm btn-block"
                                            onClick={(e) => this.deleteAppointment(e, appointment.id)}
                                          >
                                            <span className="mr-3 btn-icon icofont-delete-alt" />
                                            Delete Consultation
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
                            ref={(eo) => (this.eo = eo)}
                            className="table table-striped"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Reason for appointment</th>
                                <th className="text-nowrap">Doctor</th>
                                <th className="text-nowrap">Patient</th>
                                <th>Appointment Date</th>
                                <th>Appointment Time</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {completedAppointments
                                ? completedAppointments.map((appointment, index) => (

                                  <tr key={index}>
                                    <td> <strong>{appointment?.appointmentTitle ?? " "}</strong></td>
                                    <td>
                                      <strong>{appointment?.reasonForAppointment ?? ""}</strong>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap">
                                        {appointment.doctor?.lastName ?? ""} {appointment.doctor?.firstName ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {appointment.patient?.lastName ?? ""} {appointment.patient?.firstName ?? ""}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(appointment?.appointmentDate).toLocaleDateString()}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {new Date(appointment?.appointmentDate).toLocaleTimeString()}
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
                                            title="Go for PreConsultation"
                                            to={`/AdminPreConsultation/${appointment.patient.id}`}
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                                            Pre Consultation
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
                                        </div>
                                      </div>
                                    </td>
                                  </tr>))
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

        <ReAssign appointmentId={this.state.activeAppointment} route={"ReassignAppointment"} />

      </>
    );
  }
}

export default Appointments;
