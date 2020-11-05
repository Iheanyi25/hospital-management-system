import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class AllPatients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      apiUrl: process.env.REACT_APP_API_URL,
    };
  }

  async getAllPatients() {
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Patient/GetPatients`);
    const data = await response.json();
    this.setState({ patients: data.patients });
  }

  componentDidMount() {
    this.getAllPatients().then(() => this.sync());
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header">
              <h4 className="page-title">Our Patients</h4>
            </header>
            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div>
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
                            className="table"
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
                              {this.state.patients.map((patient) => (
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
                                    {patient.patient.firstName} {patient.patient.lastName}
                                  </td>
                                  <td>
                                    <strong>
                                      {" "}
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        <span className="icofont-ui-email p-0 mr-2" />
                                        {patient.patient.email}
                                      </div>
                                    </strong>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center nowrap text-primary">
                                      <span className="icofont-ui-email p-0 mr-2" />
                                      {patient.patient.phoneNumber}
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
                                        <NavLink
                                          to={{
                                            pathname: `/AdminPreConsultation/${patient.patient.id}`,
                                            state: patient
                                          }}
                                          className="btn btn-sm btn-block"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                        Go for Pre-Consultation
                                      </NavLink>
                                        <NavLink
                                          to={{
                                            pathname: `/AdminPreConsultation/${patient.patient.id}`,
                                            state: patient
                                          }}
                                          className="btn btn-sm btn-block"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                        Pre-Consultation History
                                      </NavLink>
                                        <NavLink
                                          to={{
                                            pathname: `/AdminUpdatePatientProfile/${patient.patient.id}`,
                                            state: patient
                                          }}
                                          className="btn btn-sm btn-block"
                                        >
                                          <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                        Update Profile
                                      </NavLink>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
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

export default AllPatients;
