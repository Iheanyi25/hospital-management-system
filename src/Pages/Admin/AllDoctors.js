import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class AllDoctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      apiUrl: process.env.REACT_APP_API_URL,
    };
  }

  async getAllDoctors() {
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Doctor/GetDoctors`);
    const data = await response.json();
    this.setState({ doctors: data.doctors });
  }

  componentDidMount() {
    this.getAllDoctors().then(() => this.sync());
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
              <h4 className="page-title">Our Doctors</h4>
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
                          <th>Specialization</th>
                          <th>Office Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.doctors.map((doctor) => (
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
                            <td>
                              {doctor.doctor.firstName} {doctor.doctor.lastName}
                            </td>
                            <td>
                              <strong>
                                {" "}
                                <div className="d-flex align-items-center nowrap text-primary">
                                  <span className="icofont-ui-email p-0 mr-2" />
                                  {doctor.doctor.email}
                                </div>
                              </strong>
                            </td>
                            <td>
                              <div className="d-flex align-items-center nowrap text-primary">
                                <span className="icofont-ui-email p-0 mr-2" />
                                {doctor.doctor.phoneNumber}
                              </div>
                            </td>
                            <td>
                              <div className="text-muted text-nowrap">
                                Anatomy and Chemistry
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
                                <div className="dropdown-menu">
                                  <NavLink
                                    to={`/AdminDoctorConsultations/${doctor.doctorId}`}
                                    className="btn btn-sm btn-block"
                                  >
                                    <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                    View Consultation List
                                  </NavLink>

                                  <NavLink
                                    to={`/AdminDoctorAppointments/${doctor.doctorId}`}
                                    className="btn btn-sm btn-block"
                                  >
                                    <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                    View Appointment List
                                  </NavLink>

                                  <NavLink
                                    to={`#`}
                                    className="btn btn-sm btn-block"
                                  >
                                    <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                    View Profile
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

export default AllDoctors;
