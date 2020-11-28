import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";

const apiUrl = process.env.REACT_APP_API_URL;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorName:
        JSON.parse(localStorage.getItem("authenticatedUser")).firstName +
        " " +
        JSON.parse(localStorage.getItem("authenticatedUser")).lastName,
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,

    };
  }

  async componentDidMount() {
    const response = await fetch(
      `${apiUrl}/Doctor/ViewAllConsultations?DoctorId=${this.state.doctorId}`
    );

    const data = await response.json();
    this.setState({ doctorConsultations: data.doctorConsultations });

    console.log({ data });

    let pendingAppointments = [];
    data.doctorConsultations.forEach((queue) => {
      if (!queue.isActive && !queue.isAccepted && !queue.isCompleted && !queue.isRejected)
        pendingAppointments.push(queue);
    });

    this.setState({
      pendingAppointments: pendingAppointments
    })
  }

  render() {
    const {
      pendingAppointments,
      doctorName,
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
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-01s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Appointments</h6>
                          <div className="count text-primary fs-20">213</div>
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
                          <h6 className="mt-0 mb-1">My Patients</h6>
                          <div className="count text-primary fs-20">104</div>
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
                          <h6 className="mt-0 mb-1">My Prescriptions</h6>
                          <div className="count text-primary fs-20">24</div>
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
                          <h6 className="mt-0 mb-1 text-nowrap">Schedules</h6>
                          <div className="count text-primary fs-20">5238</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="card bg-light">
                    <div className="card-header">Welcome {doctorName}</div>
                    <div className="card-body">
                      You Have No New Notifications
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card text-white bg-primary">
                    <div className="card-header">Important Updates</div>
                    <div className="card-body">
                      An Apple A Day Keeps the Doctor Away
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-0">
                <div className="card-header">Pending consultations</div>
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
                                {consultation.patientQueue.reasonForConsultation}
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
                                  {new Date(consultation.patientQueue.dateOfConsultation).toLocaleDateString()}
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  {new Date(consultation.patientQueue.dateOfConsultation).toLocaleTimeString()}
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
                                        firstName: consultation.patient.firstName,
                                        lastName: consultation.patient.lastName
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

export default Dashboard;
