import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getDoctorAllConsultationsUrl,
  getDoctorDashboardUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";

class Dashboard extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      pendingAppointment: 0,
      completedAppointment: 0,
      pendingConsultation: 0,
      completedConsultation: 0,
    };
  }

  async componentDidMount() {
    const getDoctorAllConsultations = getDoctorAllConsultationsUrl(
      this.state.patientId
    );
    const getDoctorAllConsultationsConfig = fetchConfig({
      url: getDoctorAllConsultations,
      method: "get",
    });
    const { data } = await fetchWrapper(getDoctorAllConsultationsConfig);

    this.setState({ doctorConsultations: data.doctorConsultations });

    console.log({ data });

    let pendingAppointments = [];
    data.doctorConsultations.forEach((queue) => {
      if (
        !queue.isActive &&
        !queue.isAccepted &&
        !queue.isCompleted &&
        !queue.isRejected
      )
        pendingAppointments.push(queue);
    });

    this.setState({
      pendingAppointments: pendingAppointments,
    });
    const {
      user: { id },
    } = this.context;
    const getDoctorDashboard = getDoctorDashboardUrl(id);
    const getDoctorDashboardConfig = fetchConfig({
      url: getDoctorDashboard,
      method: "get",
    });
    const { data: data2 } = await fetchWrapper(getDoctorDashboardConfig);
    this.setState({ pendingAppointment: data2.pendingAppoinmentsCount });
    this.setState({ completedAppointment: data2.completedAppoinmentsCount });
    this.setState({ pendingConsultation: data2.pendingConsultationsCount });
    this.setState({ completedConsultation: data2.completedConsultationCount });
  }

  render() {
    const {
      pendingAppointments,
      completedAppointment,
      completedConsultation,
      pendingAppointment,
      pendingConsultation,
    } = this.state;
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
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-01s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Completed Appointments</h6>
                          <div className="count text-primary fs-20">
                            {completedAppointment}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-02s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Pending Appointments</h6>
                          <div className="count text-primary fs-20">
                            {pendingAppointment}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-03s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Completed Consultations</h6>
                          <div className="count text-primary fs-20">
                            {completedConsultation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-04s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-list"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1 text-wrap">
                            Pending Consultations
                          </h6>
                          <div className="count text-primary fs-20">
                            {pendingConsultation}
                          </div>
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
                      Welcome {`${firstName} ${lastName}`}
                    </div>
                    <div className="card-body">
                      You hava 5 patients due for consultation
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card text-white bg-primary">
                    <div className="card-header">Important Updates</div>
                    <div className="card-body">
                      An apple a day keeps the doctor away
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-0">
                <div className="card-header">Pending Consultations</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
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
                                  {consultation.patientQueue.consultationTitle}
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
                                          id: consultation.patientQueue.id,
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
                                            consultation.patient.firstName,
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
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default observer(Dashboard);
