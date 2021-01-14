import React from "react";
import { NavLink } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import TableSize from "../../Components/DataTable/TableSize";
import DoctorImage from "../../assets/img/DoctorIcon.svg"

const $ = require("jquery");
$.Datatable = require("datatables.net");

class AllDoctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
    };
  }

  async getAllDoctors() {
    const getDoctors = getDoctorsUrl()
    const getDoctorsConfig = fetchConfig({url : getDoctors, method : 'get'})
    const {data} = await fetchWrapper(getDoctorsConfig)

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
    const { doctors } = this.state;
    console.log(doctors);
    console.log();
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
              <TableSize size={doctors.length} heading="Doctors" />
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      ref={(el) => (this.el = el)}
                      className="table table-striped"
                      data-paging="true"
                      data-info="true"
                    >
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {doctors.map((doctor) => (
                          <tr>
                            <td>
                              <img
                                src={DoctorImage}
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
                                <div className="d-flex align-items-center nowrap">
                                  {doctor.doctor.email}
                                </div>
                              </strong>
                            </td>
                            <td>
                              <div className="d-flex align-items-center nowrap">
                                {doctor.doctor.phoneNumber}
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
                                    to={`/DoctorProfile/${doctor.doctorId}`}
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
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default AllDoctors;
