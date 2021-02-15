import { observer } from "mobx-react";
import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorAllAppointmentsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import {
  AppointmentSummary,
  AppointmentTabContent,
  AppointmentTabHeader,
} from "./appointment-components";

class Appointments extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
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
    const {
      user: { id },
    } = this.context;
    var acceptedAppointments = [];
    var activeAppointments = [];
    var pendingAppointments = [];
    var completedAppointments = [];
    var rejectedAppointments = [];
    const getDoctorAllAppointments = getDoctorAllAppointmentsUrl(id);
    const getDoctorAllAppointmentsConfig = fetchConfig({
      url: getDoctorAllAppointments,
      method: "get",
    });
    const { data } = await fetchWrapper(getDoctorAllAppointmentsConfig);

    this.setState({ appointments: data.appointments });
    console.log(data.appointments, 11111);
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
    await this.getDoctorAppointments();
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
                    <AppointmentTabContent
                      acceptedAppointments={acceptedAppointments}
                      pendingAppointments={pendingAppointments}
                      completedAppointments={completedAppointments}
                      getDoctorAppointments={this.getDoctorAppointments}
                    />
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
