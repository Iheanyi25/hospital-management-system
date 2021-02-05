import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorAllConsultationsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { getPatientsUrl } from "../../api/URLs";
import DoctorImage from "../../assets/img/PatientAndAdminIcon.svg";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";

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
      patients: [],
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

      let patients = await this.getAllPatients();

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
      this.setState(
        {
          activeAppointments: activeAppointments,
          activeAppointmentsCount: activeAppointments.length,
          acceptedAppointments: acceptedAppointments,
          acceptedAppointmentsCount: acceptedAppointments.length,
          completedConsultations: completedConsultations,
          completedAppointmentsCount: completedConsultations.length,
          pendingAppointments: pendingAppointments,
          pendingAppointmentsCount: pendingAppointments.length,
          rejectedAppointmentsCount: rejectedAppointments.length,
          patients: patients.patients,
        },
        () => this.sync()
      );
    } catch (error) {
      console.log(error);
    }
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
  }

  async getAllPatients() {
    try {
      const getPatients = getPatientsUrl();
      const getPatientsConfig = fetchConfig({
        url: getPatients,
        method: "get",
      });
      const { data } = await fetchWrapper(getPatientsConfig);
      return data;
      //this.setState({ patients: data.patients.map((x) => x.patient) });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      acceptedAppointmentsCount,
      pendingAppointments,
      pendingAppointmentsCount,
      completedConsultations,
      rejectedAppointmentsCount,
      patients,
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
                        <h6 className="mt-0 mb-1">
                          Total Patient On Open List
                        </h6>
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
                        <h6 className="mt-0 mb-1">Total Patients Unattended</h6>
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
                          Total Patients Attended
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
              <h4 className="page-title">My Consultation List</h4>
            </header>
            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div>
                    <ul
                      className="nav nav-tabs mb-3"
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
                          Patients Waiting
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
                          Patients Attended
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
                          All Patients
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane show fade active"
                        id="pills-active"
                        role="tabpanel"
                        aria-labelledby="pills-active-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(el) => (this.el = el)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                {/* <th>Title</th>
                                <th>Reason for appointment</th> */}
                                {/* <th className="text-nowrap">Doctor</th> */}
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
                                        {
                                          consultation.patientQueue
                                            .consultationTitle
                                        }
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
                                              title="Clerking"
                                              to={{
                                                pathname: "/DoctorClarking",
                                                state: {
                                                  type: "consultation",
                                                  id:
                                                    consultation.patientQueue
                                                      .id,
                                                  patient: consultation.patient,
                                                },
                                              }}
                                              className="btn btn-sm btn-block"
                                            >
                                              <span className="btn-icon icofont-stethoscope-alt mr-3" />
                                              Go to Clerking
                                            </Link>
                                            <Link
                                              title="Clarking History"
                                              to={{
                                                pathname:
                                                  "/ViewClarkingHistory",
                                                state: {
                                                  id: consultation.patient.id,
                                                  firstName:
                                                    consultation.patient
                                                      .firstName,
                                                  lastName:
                                                    consultation.patient
                                                      .lastName,
                                                },
                                              }}
                                              className="btn btn-sm btn-block"
                                            >
                                              <span className="btn-icon icofont-stethoscope-alt mr-3" />
                                              View Clerking History
                                            </Link>
                                          </div>
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
                            ref={(em) => (this.em = em)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Reason for appointment</th>
                                <th className="text-nowrap">Patient</th>
                                <th className="text-nowrap">Patient Contact</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {completedConsultations
                                ? completedConsultations.map((consultation) => (
                                    <tr>
                                      <td>
                                        {
                                          consultation.patientQueue
                                            .consultationTitle
                                        }
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
                                          <div className="dropdown-menu">
                                            <Link
                                              title="Patient Profile"
                                              to={{
                                                pathname: `/DoctorPatientProfile/${consultation.patient.id}`,
                                                state: consultation.patient,
                                              }}
                                              className="btn btn-sm btn-block"
                                            >
                                              <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                              View Profile
                                            </Link>
                                          </div>
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
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(en) => (this.en = en)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th>Photo</th>
                                <th>First Name</th>
                                <th className="text-nowrap">Last Name</th>
                                <th className="text-nowrap">Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {patients
                                ? patients.map((patient) => (
                                    <tr>
                                      <td>
                                        {" "}
                                        <img
                                          src={DoctorImage}
                                          alt=""
                                          width={40}
                                          height={40}
                                          className="rounded-500"
                                        />
                                      </td>
                                      <td>{patient.patient.firstName}</td>
                                      <td>{patient.patient.lastName}</td>
                                      <td>
                                        <div className="d-flex align-items-center nowrap">
                                          {patient.patient.email}
                                        </div>
                                      </td>
                                      <td>{patient.patient.phoneNumber}</td>
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
                                          <div className="dropdown-menu">
                                            <Link
                                              title="Patient Profile"
                                              to={{
                                                pathname: `/DoctorPatientProfile/${patient.patientId}`,
                                                state: patient.patient,
                                              }}
                                              className="btn btn-sm btn-block"
                                            >
                                              <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                              View Profile
                                            </Link>
                                          </div>
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
              {/* <div className="add-action-box">
                <button
                  className="btn btn-primary btn-lg btn-square rounded-pill"
                  data-toggle="modal"
                  data-target="#add-consultation"
                >
                  <span className="btn-icon icofont-stethoscope-alt" />
                </button>
              </div> */}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default observer(Consultations);
