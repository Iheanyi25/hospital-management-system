import React from "react";
import { PageLoader } from "../../Components";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      patientName:
        JSON.parse(localStorage.getItem("authenticatedUser")).firstName +
        " " +
        JSON.parse(localStorage.getItem("authenticatedUser")).lastName,
      pendingAppointments: [],
      pendingAppointmentsCount: 0,
    };
  }

  componentDidMount() {
    this.getPatientAppointments().then(() => this.sync());
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  async getPatientAppointments() {
    var pendingAppointments = [];
    var pendingAppointmentsCount = 0;
    const { apiUrl } = this.state;
    const response = await fetch(
      `${apiUrl}/Patient/ViewAllAppointments?PatientId=${this.state.patientId}`
    );
    const data = await response.json();

    this.setState({ patientAppointments: data.appointments });

    data.appointments.forEach((appointment) => {
      if (appointment.isCanceled === true) {
      } else if (appointment.isCompleted === true) {
      } else {
        pendingAppointments.push(appointment);
      }

      pendingAppointmentsCount = pendingAppointments.length;
    });

    this.setState({
      pendingAppointments: pendingAppointments,
      pendingAppointmentsCount: pendingAppointmentsCount,
    });
  }

  render() {
    const {
      pendingAppointments,
      pendingAppointmentsCount,
      patientName,
    } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <div className="row">
                <div className="col col-12 col-md-6 col-xl-4">
                  <div className="card animated fadeInUp delay-01s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Appointments</h6>
                          <div className="count text-primary fs-20">
                            {pendingAppointmentsCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-4">
                  <div className="card animated fadeInUp delay-02s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Prescriptions</h6>
                          <div className="count text-primary fs-20">0</div>
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
                          <h6 className="mt-0 mb-1">Notifications</h6>
                          <div className="count text-primary fs-20">0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="card bg-light">
                    <div className="card-header">Hello {patientName}</div>
                    <div className="card-body">
                      You Have No New Notifications
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card text-white bg-info">
                    <div className="card-header">Important Updates</div>
                    <div className="card-body">
                    Yellow fever vaccinations are currently on going from 8am
                      - 2pm everyday at our hospital, Get vaccinated today!
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-0">
                <div className="card-header">Pending Appointments</div>
                <div className="card-body">
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
                                  src="../../assets/content/user-40-1.jpg"
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
                                {/* <div className="actions">
                                        <Link
                                          title="Pre-consultation"
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
                                      </div> */}
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
        </main>
      </>
    );
  }
}

export default Dashboard;
