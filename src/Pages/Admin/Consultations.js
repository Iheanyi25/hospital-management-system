
import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";

class Consultations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      acceptedConsultations: [],
      acceptedConsultationsCount: 0,
      activeConsultations: [],
      pendingConsultations: [],
      pendingConsultationsCount: 0,
      completedConsultations: [],
      rejectedConsultationsCount: 0,
    };
  }

  async componentDidMount() {
    const { apiUrl, doctorId } = this.state;
    console.log(this.state);
    var acceptedConsultations = [];
    var activeConsultations = [];
    var pendingConsultations = [];
    var completedConsultations = [];
    var rejectedConsultations = [];

    const response = await fetch(
      `${apiUrl}/Admin/GetPatientConsultations`
    );
    const data = await response.json();
    console.log(data);
    this.setState({ consultations: data.patientConsultations });

    data.patientConsultations.forEach((consultation) => {
      if (consultation.applicationUser.consultation.isActive === true) {
        activeConsultations.push(consultation);
      } else if (consultation.applicationUser.consultation.isAccepted === true) {
        acceptedConsultations.push(consultation);
      } else if (consultation.applicationUser.consultation.isCompleted === true) {
        completedConsultations.push(consultation);
      } else if (consultation.applicationUser.consultation.isRejected === true) {
        rejectedConsultations.push(consultation);
      } else {
        pendingConsultations.push(consultation);
      }
    });

    this.setState({
      activeConsultations: activeConsultations,
      activeConsultationsCount: activeConsultations.length,
      acceptedConsultations: acceptedConsultations,
      acceptedConsultationsCount: acceptedConsultations.length,
      completedConsultations: completedConsultations,
      completedConsultationsCount: completedConsultations.length,
      pendingConsultations: pendingConsultations,
      pendingConsultationsCount: pendingConsultations.length,
      rejectedConsultationsCount: rejectedConsultations.length
    });
  }

  render() {
    const {
      acceptedConsultations,
      acceptedConsultationsCount,
      pendingConsultations,
      pendingConsultationsCount,
      activeConsultations,
      completedConsultations,
      rejectedConsultationsCount,
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
                        <h6 className="mt-0 mb-1">Total Patient on Queue</h6>
                        <div className="count text-primary fs-20">
                          {pendingConsultationsCount}
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
                        <h6 className="mt-0 mb-1">Total Patients Unattended</h6>
                        <div className="count text-primary fs-20">
                          {acceptedConsultationsCount}
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
                          Total Patients Attended
                            </h6>
                        <div className="count text-primary fs-20">
                          {rejectedConsultationsCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <header className="page-header">
              <h4 className="page-title">Consultation List</h4>
            </header>
            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div>
                    <ul
                      className="nav nav-pills nav-fill mb-3"
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
                          Patients On Open List
                            </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-accepted-tab"
                          data-toggle="pill"
                          href="#pills-accepted"
                          role="tab"
                          aria-controls="pills-accepted"
                          aria-selected="false"
                        >
                          Patients Attached to Doctors
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
                          Attended Patients
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
                            className="table data-table"
                            data-columns='[
                                { "data": "photo" },
                                { "data": "name" },
                                { "data": "email" },
                                { "data": "phone" },
                                { "data": "date-of-birth" },
                                { "data": "address" },
                                { "data": "actions" }
                            ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
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
                              {activeConsultations
                                ? activeConsultations.map((appointment) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      {[
                                        appointment.applicationUser
                                          .applicationUser.firstName,
                                        appointment.applicationUser
                                          .applicationUser.lastName,
                                      ].toString(" ")}
                                    </td>
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
                                          title="Pre-consultation"
                                          onClick={() =>
                                            (window.location.href =
                                              "/AdminPreConsultation")
                                          }
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
                                      </div>
                                    </td>
                                  </tr>
                                ))
                                : null}
                            </tbody>
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
                            className="table data-table"
                            data-columns='[
                                                        { "data": "photo" },
                                                        { "data": "name" },
                                                        { "data": "email" },
                                                        { "data": "phone" },
                                                        { "data": "date-of-birth" },
                                                        { "data": "address" },
                                                        { "data": "actions" }
                                                    ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
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
                              {acceptedConsultations
                                ? acceptedConsultations.map(
                                  (appointment) => (
                                    <tr>
                                      <td>
                                        <img
                                          src="./assets/content/user-40-1.jpg"
                                          alt=""
                                          width={40}
                                          height={40}
                                          className="rounded-500"
                                        />
                                      </td>
                                      <td>
                                        {[
                                          appointment.applicationUser
                                            .applicationUser.firstName,
                                          appointment.applicationUser
                                            .applicationUser.lastName,
                                        ].toString(" ")}
                                      </td>
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
                                            title="Pre-consultation"
                                            onClick={() =>
                                              (window.location.href =
                                                "/AdminPreConsultation")
                                            }
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
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )
                                : null}
                            </tbody>
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
                            className="table data-table"
                            data-columns='[
                                                        { "data": "photo" },
                                                        { "data": "name" },
                                                        { "data": "email" },
                                                        { "data": "phone" },
                                                        { "data": "date-of-birth" },
                                                        { "data": "address" },
                                                        { "data": "actions" }
                                                    ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
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
                              {completedConsultations
                                ? completedConsultations.map(
                                  (appointment) => (
                                    <tr>
                                      <td>
                                        <img
                                          src="./assets/content/user-40-1.jpg"
                                          alt=""
                                          width={40}
                                          height={40}
                                          className="rounded-500"
                                        />
                                      </td>
                                      <td>
                                        {" "}
                                        {[
                                          appointment.applicationUser
                                            .applicationUser.firstName,
                                          appointment.applicationUser
                                            .applicationUser.lastName,
                                        ].toString(" ")}
                                      </td>
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
                                            title="Pre-consultation"
                                            onClick={() =>
                                              (window.location.href =
                                                "/AdminPreConsultation")
                                            }
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
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )
                                : null}
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
                            className="table data-table"
                            data-columns='[
                                                                    { "data": "photo" },
                                                                    { "data": "name" },
                                                                    { "data": "email" },
                                                                    { "data": "phone" },
                                                                    { "data": "date-of-birth" },
                                                                    { "data": "address" },
                                                                    { "data": "actions" }
                                                                ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
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
                              {pendingConsultations
                                ? pendingConsultations.map((appointment) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      {[
                                        appointment.applicationUser
                                          .applicationUser.firstName,
                                        appointment.applicationUser
                                          .applicationUser.lastName,
                                      ].toString(" ")}
                                    </td>
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
                                          title="Pre-consultation"
                                          onClick={() =>
                                            (window.location.href =
                                              "/AdminPreConsultation")
                                          }
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
              </div>
              <div className="add-action-box">
                <button
                  className="btn btn-primary btn-lg btn-square rounded-pill"
                  data-toggle="modal"
                  data-target="#add-appointment"
                >
                  <span className="btn-icon icofont-stethoscope-alt" />
                </button>
              </div>
            </div>
          </div>
        </main>

      </>
    );
  }
}

export default Consultations;