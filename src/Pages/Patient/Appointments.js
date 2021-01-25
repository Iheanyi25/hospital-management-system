import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getPatientAllAppointmentsUrl,
  patientCancelAppointments,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import DoctorImage from "../../assets/img/DoctorIcon.svg";
import { Success } from "../../Components/Alerts";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";

const $ = window.$;
$.Datatable = require("datatables.net");

class Appointments extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      patientAppointments: null,
      canceledAppointments: [],
      canceledAppointmentsCount: 0,
      completedAppointments: [],
      completedAppointmentsCount: 0,
      pendingAppointments: [],
      pendingAppointmentsCount: 0,
    };
  }

  async getPatientAppointments() {
    const {
      user: { id },
    } = this.context;
    var canceledAppointments = [];
    var completedAppointments = [];
    var pendingAppointments = [];

    const getPatientAllAppointments = getPatientAllAppointmentsUrl(id);
    const getPatientAllAppointmentsConfig = fetchConfig({
      url: getPatientAllAppointments,
      method: "get",
    });
    const { data } = await fetchWrapper(getPatientAllAppointmentsConfig);

    this.setState({ patientAppointments: data.appointments });

    data.appointments.forEach((appointment) => {
      if (appointment.isCanceled === true) {
        canceledAppointments.push(appointment);
      } else if (appointment.isCompleted === true) {
        completedAppointments.push(appointment);
      } else {
        pendingAppointments.push(appointment);
      }
    });

    this.setState({
      canceledAppointments: canceledAppointments,
      canceledAppointmentsCount: canceledAppointments.length,
      completedAppointments: completedAppointments,
      completedAppointmentsCount: completedAppointments.length,
      pendingAppointments: pendingAppointments,
      pendingAppointmentsCount: pendingAppointments.length,
    });
  }

  async componentDidMount() {
    await this.getPatientAppointments().then(() => this.sync());
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
  }

  cancelAppointments = async (id) => {
    const cancelPatientAppointment = patientCancelAppointments(id);
    const cancelPatientAppointmentConfig = fetchConfig({
      url: cancelPatientAppointment,
      method: "post",
    });
    const res = await fetchWrapper(cancelPatientAppointmentConfig);
    if (res) {
      this.setState({
        showSuccessMessage: true,
        successMessage: res.data.message,
      });
      this.getPatientAppointments();
    }
  };

  render() {
    const {
      canceledAppointments,
      canceledAppointmentsCount,
      completedAppointments,
      completedAppointmentsCount,
      pendingAppointments,
      pendingAppointmentsCount,
    } = this.state;
    return (
      <>
        <PageLoader />
        {this.state?.showSuccessMessage ? (
          <Success message={this.state?.successMessage} />
        ) : (
          <></>
        )}
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
                        <h6 className="mt-0 mb-1">Finalized Appointments</h6>
                        <div className="count text-primary fs-20">
                          {completedAppointmentsCount}
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
                          Canceled Appointments
                        </h6>
                        <div className="count text-primary fs-20">
                          {canceledAppointmentsCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <header className="page-header">
              <h4 className="page-title">My Appointments</h4>
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
                          id="pills-active-tab"
                          data-toggle="pill"
                          href="#pills-active"
                          role="tab"
                          aria-controls="pills-active"
                          aria-selected="true"
                        >
                          Pending Appointments
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
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-pending-tab"
                          data-toggle="pill"
                          href="#pills-pending"
                          role="tab"
                          aria-controls="pills-pending"
                          aria-selected="false"
                        >
                          Canceled Appointments
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
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
                                <th></th>
                                <th>Title</th>
                                <th>Reason for Appointment</th>
                                <th>Doctor's Name</th>
                                <th>Doctor's Phone Number</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingAppointments &&
                                pendingAppointments.map((appointment) => (
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
                                    <td>{appointment.appointmentTitle}</td>
                                    <td>{appointment.reasonForAppointment}</td>
                                    <td>
                                      {appointment.doctor?.firstName ??
                                        "None specified yet" +
                                          " " +
                                          appointment.doctor?.lastName}
                                    </td>
                                    <td>
                                      {appointment.doctor?.phoneNumber ??
                                        "None Specified Yet"}
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
                                              this.cancelAppointments(
                                                appointment.id
                                              )
                                            }
                                          >
                                            Cancel Appointment
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
                        aria-labelledby="pills-accepted-tab"
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
                                <th>Title</th>
                                <th>Reason for Appointment</th>
                                <th>Doctor's Name</th>
                                <th>Doctor's Phone Number</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {completedAppointments &&
                                completedAppointments.map((appointment) => (
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
                                    <td>{appointment.appointmentTitle}</td>
                                    <td>{appointment.reasonForAppointment}</td>
                                    <td>
                                      {appointment.doctor?.firstName ??
                                        "None specified yet" +
                                          " " +
                                          appointment.doctor?.lastName}
                                    </td>
                                    <td>
                                      {appointment.doctor?.phoneNumber ??
                                        "None Specified Yet"}
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
                              <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Reason for Appointment</th>
                                <th>Doctor's Name</th>
                                <th>Doctor's Phone Number</th>
                              </tr>
                            </thead>
                            <tbody>
                              {canceledAppointments &&
                                canceledAppointments.map((appointment) => (
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
                                    <td>{appointment.appointmentTitle}</td>
                                    <td>{appointment.reasonForAppointment}</td>
                                    <td>
                                      {appointment.doctor?.firstName ??
                                        "None specified yet" +
                                          " " +
                                          appointment.doctor?.lastName}
                                    </td>
                                    <td>
                                      {appointment.doctor?.phoneNumber ??
                                        "None Specified Yet"}
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

export default observer(Appointments);
