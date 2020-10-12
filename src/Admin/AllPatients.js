import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "../Partials/Admin/Header";
import Sidebar from "../Partials/Admin/Sidebar";
import Footer from "../Partials/Footer";
import TemplateSettings from "../Partials/TemplateSettings";
import RegisterPatient from "../Partials/Admin/RegisterPatient";
import PageLoader from "../Partials/PageLoader";

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
    const response = await fetch(`${apiUrl}/Admin/GetPatients`);
    const data = await response.json();
    this.setState({ patients: data.patientProfiles });
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
                <header className="page-header">
                  <h4 className="page-title">Our Patients</h4>
                </header>
                <div className="page-content">
                  <div className="card-body"></div>
                </div>
                <div className="page-content">
                  <div className="card mb-0">
                    <div className="card-body">
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
                            {this.state.patients.map((patient) => (
                              <tr>
                                <td>
                                  <img
                                    src="./assets/content/user-40-1.jpg"
                                    alt
                                    width={40}
                                    height={40}
                                    className="rounded-500"
                                  />
                                </td>
                                <td>
                                  {patient.firstName} {patient.lastName}
                                </td>
                                <td>
                                  <strong>
                                    {" "}
                                    <div className="d-flex align-items-center nowrap text-primary">
                                      <span className="icofont-ui-email p-0 mr-2" />
                                      {patient.email}
                                    </div>
                                  </strong>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center nowrap text-primary">
                                    <span className="icofont-ui-email p-0 mr-2" />
                                    {patient.phoneNumber}
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
                                        (window.location.href = `/AdminPreConsultation/${patient.id}`)
                                      }
                                      to={`/AdminPreConsultation/${patient.id}`}
                                      className="btn btn-secondary btn-sm btn-square rounded-pill"
                                    >
                                      <span className="btn-icon icofont-stethoscope-alt" />
                                    </Link>
                                    <Link
                                      title="Update Profile"
                                      onClick={() =>
                                        (window.location.href = `/AdminUpdatePatientProfile/${patient.id}`)
                                      }
                                      to={`/AdminUpdatePatientProfile/${patient.id}`}
                                      className="btn btn-secondary btn-sm btn-square rounded-pill"
                                    >
                                      <span className="btn-icon icofont-ui-edit" />
                                    </Link>

                                    <button className="btn btn-error btn-sm btn-square rounded-pill">
                                      <span className="btn-icon icofont-ui-delete" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
        <RegisterPatient />
        <TemplateSettings />
      </>
    );
  }
}

export default AllPatients;
