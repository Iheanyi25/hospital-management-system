import React from "react";
import { Link } from "react-router-dom";
import Header from "../Partials/Doctor/Header";
import Sidebar from "../Partials/Doctor/Sidebar";
import Footer from "../Partials/Footer";
import TemplateSettings from "../Partials/TemplateSettings";
import PageLoader from "../Partials/PageLoader";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
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
    const { apiUrl } = this.state;

    var acceptedAppointments = [];
    var activeAppointments = [];
    var pendingAppointments = [];
    var completedAppointments = [];
    var rejectedAppointments = [];

    const response = await fetch(`${apiUrl}/Admin/GetDoctorAppointments`);
    const data = await response.json();

    this.setState({ appointments: data });
    console.log(data.doctorAppointments);
    data.doctorAppointments.forEach((appointment) => {
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
  }

  async componentDidMount() {
    this.getDoctorAppointments().then(() => this.sync());
  }

  sync() {
    this.$ek = $(this.ek);
    this.$ek.DataTable();
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
  }

  render() {
    const {
      acceptedAppointments,
      acceptedAppointmentsCount,
      pendingAppointments,
      pendingAppointmentsCount,
      activeAppointments,
      completedAppointments,
      rejectedAppointmentsCount,
    } = this.state;

    return (
      <>
        <PageLoader />
        <div className="page-box">
          <div className="app-container">
            {/* Horizontal navbar---Header */}
            <Header></Header>

            {/* Vertical navbar */}
            <Sidebar></Sidebar>

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
                            <h6 className="mt-0 mb-1">Pending Appointments</h6>
                            <div className="count text-primary fs-20">
                              {pendingAppointmentsCount}
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
                            <h6 className="mt-0 mb-1">Accepted Appointments</h6>
                            <div className="count text-primary fs-20">
                              {acceptedAppointmentsCount}
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
                              Rejected Appointments
                            </h6>
                            <div className="count text-primary fs-20">
                              {rejectedAppointmentsCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <header className="page-header">
                  <h4 className="page-title">My Appointments</h4>
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
                              Active Appointments
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
                              Accepted Apppointments
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
                              Completed Appointments
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="pills-pending-tab"
                              data-toggle="pill"
                              href="#pills-pending"
                              role="tab"
                              aria-controls="pills-pending"
                              aria-selected="false"
                            >
                              Pending Appointments
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
                                ref={(ek) => (this.ek = ek)}
                                class="table"
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
                                  {activeAppointments
                                    ? activeAppointments.map((appointment) => (
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
                                ref={(el) => (this.el = el)}
                                class="table"
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
                                  {acceptedAppointments
                                    ? acceptedAppointments.map(
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
                                ref={(em) => (this.em = em)}
                                class="table"
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
                                  {completedAppointments
                                    ? completedAppointments.map(
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
                                ref={(en) => (this.en = en)}
                                class="table"
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
                                  {pendingAppointments
                                    ? pendingAppointments.map((appointment) => (
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
                                          {appointment.patient.firstName}{" "}
                                          {appointment.patient.lastName}
                                        </td>
                                        <td>
                                          <div className="d-flex align-items-center nowrap text-primary">
                                            <span className="icofont-ui-email p-0 mr-2" />
                                            {appointment.patient.email}
                                          </div>
                                        </td>
                                        <td>
                                          <div className="d-flex align-items-center nowrap text-primary">
                                            <span className="icofont-ui-email p-0 mr-2" />
                                            {appointment.patient.phoneNumber}
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

            {/* Footer */}
            <Footer />
          </div>
        </div>

        <TemplateSettings />
      </>
    );
  }
}

export default Appointments;
