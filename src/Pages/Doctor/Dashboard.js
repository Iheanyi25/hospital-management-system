import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorName:
        JSON.parse(localStorage.getItem("authenticatedUser")).firstName +
        " " +
        JSON.parse(localStorage.getItem("authenticatedUser")).lastName,
    };
  }

  render() {
    const {
      pendingAppointments,
      pendingAppointmentsCount,
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
                <div className="card-header">Recent appointments</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Photo</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Date</th>
                          <th scope="col">Visit time</th>
                          <th scope="col">Number</th>
                          <th scope="col">Doctor</th>
                          <th scope="col">Injury / Condition</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="./assets/content/user-40-1.jpg"
                              width={40}
                              height={40}
                              className="rounded-500"
                              alt=""
                            />
                          </td>
                          <td>
                            <strong>Liam</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center nowrap text-primary">
                              <span className="icofont-ui-email p-0 mr-2" />{" "}
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
                            <div className="d-flex align-items-center nowrap text-primary">
                              <span className="icofont-ui-cell-phone p-0 mr-2" />{" "}
                              0126595743
                            </div>
                          </td>
                          <td>Dr. Benjamin</td>
                          <td>mumps</td>

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
                                  title="Pre-consultation"
                                  onClick={() =>
                                    (window.location.href = `/DoctorConsultation`)
                                  }
                                  to={`/DoctorConsultation`}
                                  className="btn btn-sm btn-block"
                                >
                                  <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                  Go for Clarking
                                </Link>
                                <Link
                                  title="Pre-consultation"
                                  onClick={() =>
                                    (window.location.href = `/AdminPreConsultation`)
                                  }
                                  to={`/AdminPreConsultation`}
                                  className="btn btn-sm btn-block"
                                >
                                  <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                  Consultation History
                                </Link>
                                <Link
                                  title="Pre-consultation"
                                  onClick={() =>
                                    (window.location.href = `/AdminPreConsultation`)
                                  }
                                  to={`/AdminPreConsultation`}
                                  className="btn btn-sm btn-block"
                                >
                                  <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                  Pre-Consultation History
                                </Link>
                                <Link
                                  title="Pre-consultation"
                                  onClick={() =>
                                    (window.location.href = `/AdminUpdatePatientProfile`)
                                  }
                                  to={`/AdminUpdatePatientProfile`}
                                  className="btn btn-sm btn-block"
                                >
                                  <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                  View Profile
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
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
