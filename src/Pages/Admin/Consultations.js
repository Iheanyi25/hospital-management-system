import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import { Success } from "../../Components/Alerts";
import { ReAssign } from "../../Components/Modals/ReAssignModal";

const apiUrl = process.env.REACT_APP_API_URL;
const $ = require("jquery");
$.Datatable = require("datatables.net");

class Consultations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientsOnOpenList: [],
      patientsOnOpenListCount: 0,
      patientsAttachedToDoctors: [],
      patientsAttachedToDoctorsCount: 0,
      patientsAttendedTo: [],
      patientsAttendedToCount: 0,
    };
  }

  async getAllConsultations() {
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Patient/GetPatients`);
    const data = await response.json();
    this.setState({ patients: data.patients });
  }

  componentDidMount() {
    this.getAllConsultations().then(() => this.sync());
  }

  async deleteConsultation(e, id) {
    e.preventDefault();
    const request = await fetch(apiUrl + "/Admin/DeleteConsultation", {
      method: "POST",
      headers: {
        "Content-type": " application/json"
      },
      body: JSON.stringify({ consultationId: id })
    });

    const res = await request.json();
    this.setState({
      success: true, message: res.message
    });
    this.getAllConsultations();
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
  }

  async getAllConsultations() {
    var patientsOnOpenList = [];
    var patientsOnOpenListCount = 0;
    var patientsAttachedToDoctors = [];
    var patientsAttachedToDoctorsCount = 0;
    var patientsAttendedTo = [];
    var patientsAttendedToCount = 0;

    let response = await fetch(`${apiUrl}/Admin/GetPatientConsultations`);
    const data = await response.json();

    let response1 = await fetch(`${apiUrl}/Admin/GetPatientConsultationCount`);
    const data1 = await response1.json();
    console.log(data1);
    let response2 = await fetch(`${apiUrl}/Admin/GetPatientsUnattendedToCount`);
    const data2 = await response2.json();

    let response3 = await fetch(`${apiUrl}/Admin/GetPatientsAttendedToCount`);
    const data3 = await response3.json();

    this.setState({ consultations: data.patientConsultations });

    data.consultations.forEach((consultation) => {
      if (consultation.isCompleted === true) {
        patientsAttendedTo.push(consultation);
      } else if (consultation.doctorId == undefined) {
        patientsOnOpenList.push(consultation);
      } else if (consultation.doctorId != undefined) {
        patientsAttachedToDoctors.push(consultation);
      }
    });

    this.setState({
      patientsOnOpenList: patientsOnOpenList,
      patientsOnOpenListCount: data1.consultationCount,
      patientsAttachedToDoctors: patientsAttachedToDoctors,
      patientsAttachedToDoctorsCount: data2.consultationCount,
      patientsAttendedTo: patientsAttendedTo,
      patientsAttendedToCount: data3.consultationCount,
    });
    console.log(this.state);
  }

  render() {
    const {
      patientsOnOpenList,
      patientsOnOpenListCount,
      patientsAttachedToDoctors,
      patientsAttachedToDoctorsCount,
      patientsAttendedTo,
      patientsAttendedToCount,
    } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {
            this.state.success ?
              <Success
                history={this.props.history}
                message={this.state.message}
              />
              :
              null
          }
          <div className="main-content-wrap">
            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-3">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                      </div>
                      <div className="col col-9">
                        <h6 className="mt-0 mb-1">Total Patient on Queue</h6>
                        <div className="count text-primary fs-20">
                          {patientsOnOpenListCount}
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
                      <div className="col col-3">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                      </div>
                      <div className="col col-9">
                        <h6 className="mt-0 mb-1">Total Patients Unattended</h6>
                        <div className="count text-primary fs-20">
                          {patientsAttachedToDoctorsCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-12 col-xl-4">
                <div className="card animated fadeInUp delay-04s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-3">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-list"></div>
                      </div>
                      <div className="col col-9">
                        <h6 className="mt-0 mb-1 text-nowrap">
                          Total Patients Attended
                        </h6>
                        <div className="count text-primary fs-20">
                          {patientsAttendedToCount}
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
                            ref={(el) => (this.el = el)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Appointment Title</th>
                                <th>Reason For Appointment</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {patientsOnOpenList
                                ? patientsOnOpenList.map((consultation) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="../assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td className="nowrap">
                                      {consultation.patient.firstName}{" "}
                                      {consultation.patient.lastName}
                                    </td>
                                    <td>{consultation.consultationTitle}</td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {consultation.reasonForConsultation}
                                      </div>
                                    </td>

                                    <td>
                                      <div className="actions">
                                        <Link
                                          title="Go for Clarking"
                                          to={{
                                            pathname: "/DoctorClarking",
                                            state: {
                                              id: consultation.id,
                                              type: "consultation",
                                              patient: consultation.patient
                                            }
                                          }}
                                          className="btn btn-primary btn-sm btn-square rounded-pill"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link>
                                        <button
                                          className="btn btn-danger btn-sm btn-square rounded-pill"
                                          onClick={(e) => this.deleteConsultation(e, consultation.id)}
                                        >
                                          <span className="btn-icon icofont-delete-alt" />
                                        </button>
                                        <Link
                                          // to=""
                                          onClick={() => this.setState({ activeConsultation: consultation.id })}
                                          className="btn btn-secondary btn-sm btn-square rounded-pill"
                                          data-toggle="modal"
                                          data-target="#reassign-patient"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link>
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
                                <th></th>
                                <th>Name</th>
                                {/* <th>Phone</th> */}
                                <th className="nowrap">Appointment Title</th>
                                <th className="nowrap">Reason For Appointment</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {patientsAttachedToDoctors
                                ? patientsAttachedToDoctors.map(
                                  (consultation, index) => (
                                    <tr key={index}>
                                      <td>
                                        <img
                                          src="../assets/content/user-40-1.jpg"
                                          alt=""
                                          width={40}
                                          height={40}
                                          className="rounded-500"
                                        />
                                      </td>
                                      <td className="text-nowrap">
                                        {consultation.patient.firstName}{" "}
                                        {consultation.patient.lastName}
                                      </td>
                                      <td>
                                        {consultation.consultationTitle}
                                      </td>
                                      <td>
                                        <div className="text-muted text-wrap">
                                          {consultation.reasonForConsultation}
                                        </div>
                                      </td>

                                      <td>
                                        <div className="actions">
                                          <button
                                            className="btn btn-danger btn-sm btn-square rounded-pill"
                                            onClick={(e) => this.deleteConsultation(e, consultation.id)}
                                          >
                                            <span className="btn-icon icofont-delete-alt" />
                                          </button>
                                          <button
                                            onClick={() => this.setState({ activeConsultation: consultation.id })}
                                            className="btn btn-secondary btn-sm btn-square rounded-pill"
                                            data-toggle="modal"
                                            data-target="#reassign-patient"
                                          >
                                            <span className="btn-icon icofont-stethoscope-alt" />
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
                            ref={(en) => (this.en = en)}
                            className="table"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Name</th>
                                {/* <th>Phone</th> */}
                                <th>Appointment Title</th>
                                <th className="nowrap">Reason For Appointment</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {patientsAttendedTo
                                ? patientsAttendedTo.map((consultation) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="../assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td className="nowrap">
                                      {consultation.patient.firstName}{" "}
                                      {consultation.patient.lastName}
                                    </td>
                                    {/* <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        <span className="icofont-ui-email p-0 mr-2" />
                                        {consultation.patient.phoneNumber}
                                      </div>
                                    </td> */}
                                    <td>{consultation.consultationTitle}</td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {consultation.reasonForConsultation}
                                      </div>
                                    </td>

                                    <td>
                                      <div className="actions">
                                        <Link
                                          title="Pre-consultation"
                                          to={`/AdminPreConsultation/${consultation.id}`}
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

        <ReAssign consultationId={this.state.activeConsultation} route={"ReassignConsultation"} />
      </>
    );
  }
}

export default Consultations;
