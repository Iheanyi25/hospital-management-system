import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { deleteAppointmentUrl, getDoctorAppointmentsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { Success } from "../../Components/Alerts";
import { ReAssign } from "../../Components/Modals/ReAssignModal";
import AcceptedAppointments from "./appointment-components/AcceptedAppointments";
import AppointmentSummary from "./appointment-components/AppointmentSummary";
import AppointmentTabHeader from "./appointment-components/AppointmentTabHeader";
import CompletedAppointments from "./appointment-components/CompletedAppointments";
import PendingAppointments from "./appointment-components/PendingAppointments";

const $ = window.$;
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
      success: { show: false, message: "", delError: false },
    };

    this.getAllAppointments = this.getAllAppointments.bind(this);
  }

  async componentDidMount() {
    this.getAllAppointments().then(() => this.sync());
  }

  async getAllAppointments() {
    var acceptedAppointments = [];
    var activeAppointments = [];
    var pendingAppointments = [];
    var completedAppointments = [];
    var rejectedAppointments = [];

    try {
      const getDoctorAppointments = getDoctorAppointmentsUrl();
      const getDoctorAppointmentsUrlConfig = fetchConfig({ url: getDoctorAppointments, method: "get" });
      const { data } = await fetchWrapper(getDoctorAppointmentsUrlConfig);

      this.setState({ appointments: data.doctorsAppointments });

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
    } catch (error) {
      console.log(error)
    }
  }

  deleteAppointment = async (id) => {
    try {
      const deleteAppointment = deleteAppointmentUrl();
      const deleteAppointmentConfig = fetchConfig({ url: deleteAppointment, data: JSON.stringify({ appointmentId: id }), method: "post" });
      const res = await fetchWrapper(deleteAppointmentConfig);

      if (res.status === 200) {
        this.getAllAppointments().then(() => this.sync());
        this.setState({
          success: { show: true, message: res.message, delError: false },
        });
      } else {
        throw res.message;
      }
    } catch (error) {
      console.log(error);
      this.setState({
        success: { show: true, message: error, delError: true },
      });
    }
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

  setAppointmentId = (id) => {
    this.setState({ activeAppointment: id })
  }

  resetShowState = () =>
    this.setState((state) => ({
      ...state,
      success: { show: false, message: " ", delError: false },
    }));

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
          {this.state.success.show && (
            <Success
              message={this.state.success.message}
              callback={this.resetShowState}
              isError={this.state.success.delError}
            />
          )}
          <div className="main-content-wrap">
            <AppointmentSummary
              pendingAppointmentsCount={pendingAppointmentsCount}
              acceptedAppointmentsCount={acceptedAppointmentsCount}
              rejectedAppointmentsCount={rejectedAppointmentsCount}
            />
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
                    <AppointmentTabHeader />
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
                            <PendingAppointments
                              pendingAppointments={pendingAppointments}
                              setAppointmentId={this.setAppointmentId}
                              deleteAppointment={this.deleteAppointment}
                            />
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
                            <AcceptedAppointments
                              acceptedAppointments={acceptedAppointments}
                              setAppointmentId={this.setAppointmentId}
                              deleteAppointment={this.deleteAppointment}
                            />
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
                            <CompletedAppointments
                              completedAppointments={completedAppointments}
                            />
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

        <ReAssign
          appointmentId={this.state.activeAppointment}
          route={"ReassignAppointment"}
          reRun={this.getAllAppointments}
        />
      </>
    );
  }
}

export default Appointments;
