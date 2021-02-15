import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorAllConsultationsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import {
  ConsultationSummary,
  ConsultationTabContent,
  ConsultationTabHeader,
} from "./consultation-components";

const $ = window.$;
$.Datatable = require("datatables.net");

class Consultations extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      patientQueue: null,
      acceptedAppointments: [],
      acceptedAppointmentsCount: 0,
      activeAppointments: [],
      pendingAppointments: [],
      pendingAppointmentsCount: 0,
      completedConsultations: [],
      rejectedAppointmentsCount: 0,
    };
  }

  async componentDidMount() {
    const {
      user: { id },
    } = this.context;
    const acceptedAppointments = [];
    const activeAppointments = [];
    const pendingAppointments = [];
    const completedConsultations = [];
    const rejectedAppointments = [];

    try {
      const getDoctorAllConsultations = getDoctorAllConsultationsUrl(id);
      const getDoctorAllConsultationsConfig = fetchConfig({
        url: getDoctorAllConsultations,
        method: "get",
      });
      const { data } = await fetchWrapper(getDoctorAllConsultationsConfig);
      console.log(data);

      this.setState({ doctorConsultations: data.doctorConsultations });

      console.log(data.doctorConsultations[0].patientQueue);
      data.doctorConsultations.forEach((consultation) => {
        if (consultation.patientQueue.isActive === true) {
          activeAppointments.push(consultation);
        } else if (consultation.patientQueue.isAccepted === true) {
          acceptedAppointments.push(consultation);
        } else if (consultation.patientQueue.isCompleted === true) {
          completedConsultations.push(consultation);
        } else if (consultation.patientQueue.isRejected === true) {
          rejectedAppointments.push(consultation);
        } else {
          pendingAppointments.push(consultation);
        }
      });
      console.log("com", completedConsultations);
      console.log("pen", pendingAppointments);
      this.setState({
        activeAppointments: activeAppointments,
        activeAppointmentsCount: activeAppointments.length,
        acceptedAppointments: acceptedAppointments,
        acceptedAppointmentsCount: acceptedAppointments.length,
        completedConsultations: completedConsultations,
        completedAppointmentsCount: completedConsultations.length,
        pendingAppointments: pendingAppointments,
        pendingAppointmentsCount: pendingAppointments.length,
        rejectedAppointmentsCount: rejectedAppointments.length,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // filterConsultations = (consultations) => [
  //   this.setState({
  //     activeAppointments: consultations.filter((consultation) =>consultation.patientQueue.isActive === true),
  //     acceptedAppointments: consultations.filter((consultation) => consultation.patientQueue.isCompleted === true),
  //     completedConsultations: consultations.filter((consultation) => consultation.patientQueue.isCompleted === true),
  //     pendingAppointments: consultations.filter((consultation) => consultation.consultationType === "inhalers"),
  //     powderDrugs: consultations.filter((consultation) => consultation.consultationType === "powder"),
  //     loading: false,
  //   }),
  // ];

  render() {
    const {
      acceptedAppointmentsCount,
      pendingAppointments,
      pendingAppointmentsCount,
      completedConsultations,
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
            <ConsultationSummary
              pendingAppointmentsCount={pendingAppointmentsCount}
              acceptedAppointmentsCount={acceptedAppointmentsCount}
              rejectedAppointmentsCount={rejectedAppointmentsCount}
            />

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
                    <ConsultationTabHeader />
                    <ConsultationTabContent
                      pendingAppointments={pendingAppointments}
                      completedConsultations={completedConsultations}
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

export default observer(Consultations);
