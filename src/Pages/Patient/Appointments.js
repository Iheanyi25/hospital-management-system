import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getPatientAllAppointmentsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
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
    var canceledAppointments = [];
    var completedAppointments = [];
    var pendingAppointments = [];

    const getPatientAllAppointments = getPatientAllAppointmentsUrl(this.state.patientId);
    const getPatientAllAppointmentsConfig = fetchConfig({ url: getPatientAllAppointments, method: "get" });
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

  componentDidMount() {
    this.getPatientAppointments().then(() => this.sync());
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
                                <th>Reason for appointment</th>
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
                                        src="../assets/content/user-40-1.jpg"
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
                                      <div className="actions">
                                       
                                        <button className="btn btn-info btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-edit" />
                                        </button>
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button>
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
                              {completedAppointments &&
                                completedAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt="hello"
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>Ogbona</td>
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
                                          title="View Prescriptions"
                                          className="btn btn-secondary btn-sm btn-square rounded-pill"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link>
                                        
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
                              {canceledAppointments &&
                                canceledAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt="hello"
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>Ogbona</td>
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
                                       
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button>
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

export default Appointments;
