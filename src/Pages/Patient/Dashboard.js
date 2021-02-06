import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getPatientAllAppointmentsUrl,
  patientCancelAppointments,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import DoctorImage from "../../assets/img/DoctorIcon.svg";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import { notification } from "../../utils/notification";

const $ = window.$;
$.Datatable = require("datatables.net");

class Dashboard extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      pendingAppointments: [],
      pendingAppointmentsCount: 0,
    };
  }

  async componentDidMount() {
    await this.getPatientAppointments().then(() => this.sync());
  }

  sync() {
    this.$dash = $(this.dash);
    this.$dash.DataTable();
  }

  async getPatientAppointments() {
    var pendingAppointments = [];
    var pendingAppointmentsCount = 0;
    const {
      user: { id },
    } = this.context;
    const getPatientAllAppointments = getPatientAllAppointmentsUrl(id);
    const getPatientAllAppointmentsConfig = fetchConfig({
      url: getPatientAllAppointments,
      method: "get",
    });
    const { data } = await fetchWrapper(getPatientAllAppointmentsConfig);

    console.log(data, 77777);
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

  cancelAppointments = async (id) => {
    try {
      const cancelPatientAppointment = patientCancelAppointments(id);
      const cancelPatientAppointmentConfig = fetchConfig({
        url: cancelPatientAppointment,
        method: "post",
      });
      const res = await fetchWrapper(cancelPatientAppointmentConfig);
      notification.success({ message: res.data.message})
      this.getPatientAppointments().then(() => this.sync());
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message})
    }
  };

  render() {
    const { pendingAppointments, pendingAppointmentsCount } = this.state;
    const {
      user: { firstName, lastName },
    } = this.context;

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
                    <div className="card-header">
                      Hello {`${firstName} ${lastName}`}
                    </div>
                    <div className="card-body">
                      You have no new notifications
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
                      ref={(dash) => (this.dash = dash)}
                      className="table table-striped"
                      // data-paging="true"
                      // data-info="true"
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
                                        this.cancelAppointments(appointment.id)
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
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default observer(Dashboard);
