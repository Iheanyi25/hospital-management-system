import React from "react";
import { PageLoader } from "../../Components";
import formatDate from "../../utils/formatDate";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorAppointments: [],
      doctorConsultations: [],
      systemCount: null,
    };
  }

  async componentDidMount() {
    const patientQueue = await fetch(
      `${this.state.apiUrl}/Admin/GetPatientConsultations`
    );
    let data = await patientQueue.json();
    this.setState({ doctorConsultations: data.consultations });

    const doctorAppointments = await fetch(
      `${this.state.apiUrl}/Admin/GetDoctorAppointments`
    );
    let tempData = await doctorAppointments.json();
    this.setState({ doctorAppointments: tempData.doctorsAppointments });

    const systemCount = await fetch(`${this.state.apiUrl}/Admin/Dashboard`);
    let systemData = await systemCount.json();

    this.setState({ systemCount: systemData });
  }

  render() {
    const { systemCount } = this.state;
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
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-doctor"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">My Doctors</h6>
                          <div className="count text-primary fs-20">
                            {systemCount?.doctorCount}
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
                          <h6 className="mt-0 mb-1">My patients</h6>
                          <div className="count text-primary fs-20">
                            {systemCount?.patientCount}
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
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-clip-board" />
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Appointments</h6>
                          <div className="count text-primary fs-20">
                            {systemCount?.pendingAppoinmentsCount}
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
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-users"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1 text-nowrap">All Users</h6>
                          <div className="count text-primary fs-20">
                            {systemCount?.userCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-6">
                  <div className="card animated fadeInUp delay-04s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-search-user"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1 text-nowrap">
                            Total Service Request
                          </h6>
                          <div className="count text-primary fs-20">
                            {systemCount?.serviceRequestCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-6">
                  <div className="card animated fadeInUp delay-04s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-pills"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1 text-nowrap">Total Drugs</h6>
                          <div className="count text-primary fs-20">
                            {systemCount?.drugCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col col-md-12">
                  <div className="card mb-0">
                    <div className="card-header">Doctor Consultation Queue</div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th className="text-nowrap" scope="col">
                                Consultation Title
                              </th>
                              <th className="text-nowrap" scope="col">
                                Patient Name
                              </th>
                              {/* <th className="text-nowrap" scope="col">
                                Patient Email
                              </th> */}
                              <th className="text-nowrap" scope="col">
                                Doctor Name
                              </th>
                              {/* <th className="text-nowrap" scope="col">
                                Doctor Email
                              </th> */}
                              <th scope="col">Date</th>
                              <th className="text-nowrap" scope="col">
                                Status
                              </th>

                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.doctorConsultations.map(
                              (consultation, index) => (
                                <tr key={index}>
                                  <td>{consultation.consultationTitle}</td>
                                  <td>
                                    <strong>
                                      {consultation.patient.lastName}{" "}
                                      {consultation.patient.firstName}
                                    </strong>
                                  </td>
                                  {/* <td>
                                    <div className="d-flex align-items-center nowrap text-primary">
                                      <span className="icofont-ui-email p-0 mr-2" />
                                      {consultation.patient.email}
                                    </div>
                                  </td> */}
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {consultation.doctor
                                        ? consultation.doctor.lastName
                                        : null}{" "}
                                      {consultation.doctor
                                        ? consultation.doctor.firstName
                                        : null}
                                    </div>
                                  </td>
                                  {/* <td>
                                    <div className="text-muted text-nowrap">
                                      {consultation.doctor
                                        ? consultation.doctor.email
                                        : null}
                                      s
                                    </div>
                                  </td> */}
                                  <td>
                                    <div className="d-flex align-items-center nowrap">
                                      {formatDate(
                                        consultation.dateOfConsultation
                                      ) ?? ""}
                                    </div>
                                  </td>

                                  <td>mumps</td>
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
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col col-md-12 mt-5">
                  <div className="card mb-0">
                    <div className="card-header">Doctors Appointment List</div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th className="text-nowrap" scope="col">
                                Appointment Title
                              </th>
                              <th className="text-nowrap" scope="col">
                                Patient Name
                              </th>
                              {/* <th className="text-nowrap" scope="col">
                                Patient Email
                              </th> */}
                              <th className="text-nowrap" scope="col">
                                Doctor Name
                              </th>
                              {/* <th className="text-nowrap" scope="col">
                                Doctor Email
                              </th> */}
                              <th className="text-nowrap" scope="col">
                                Date
                              </th>
                              {/* <th className="text-nowrap" scope="col">
                                Time
                              </th> */}
                              <th className="text-nowrap" scope="col">
                                Status
                              </th>

                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.doctorAppointments.map(
                              (appointment, key) => (
                                <tr key={key}>
                                  <td className="wrap">
                                    {appointment.appointmentTitle}
                                  </td>
                                  <td>
                                    <strong>
                                      {appointment.patient.lastName}{" "}
                                      {appointment.patient.firstName}
                                    </strong>
                                  </td>
                                  {/* <td>
                                    <div className="d-flex align-items-center nowrap text-primary">
                                      <span className="icofont-ui-email p-0 mr-2" />
                                      {appointment.patient.email}
                                    </div>
                                  </td> */}
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {appointment.doctor.lastName}{" "}
                                      {appointment.doctor.firstName}
                                    </div>
                                  </td>
                                  {/* <td>
                                    <div className="text-muted text-nowrap">
                                      {appointment.doctor.email}
                                    </div>
                                  </td> */}
                                  <td>
                                    <div className="d-flex align-items-center nowrap">
                                      {formatDate(appointment.appointmentDate) ?? ""}
                                    </div>
                                  </td>

                                  {/* <td>
                                    <div className="d-flex align-items-center nowrap text-primary">
                                      {appointment.appointmentTime}
                                    </div>
                                  </td> */}
                                  <td>
                                    <div>Not Completed</div>
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
                              )
                            )}
                          </tbody>
                        </table>
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

export default Dashboard;
