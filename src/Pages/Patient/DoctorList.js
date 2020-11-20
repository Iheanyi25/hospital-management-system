import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";

class DoctorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      apiUrl: process.env.REACT_APP_API_URL,
    };
  }

  async getAllDoctors() {
    const data = await (
      await fetch(`${this.state.apiUrl}/Doctor/GetDoctors`)
    ).json();
    this.setState({ doctors: data.doctors });
  }

  componentDidMount() {
    this.getAllDoctors();
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
              <h4 className="page-title">Doctors</h4>
            </header>
            <div className="page-content">
              <div className="row">
                {this.state.doctors.map((doctor, index) => (
                  <div className="col-12 col-md-4 col-sm-6" key={index}>
                    <div className="contact">
                      <div className="img-box">
                        <img
                          src="../assets/content/doctor-400-1.jpg"
                          width={400}
                          height={400}
                          alt="Hello"
                        />
                      </div>
                      <div className="info-box">
                        <Link
                          className="name text-primary nameLink"
                          to={`/ViewDoctorProfile/${doctor.doctorId}`}
                        >
                          <h4 className="my-0">
                            Dr. {doctor.doctor.lastName}{" "}
                            {doctor.doctor.firstName}
                          </h4>
                        </Link>
                        <p className="role">
                          {doctor?.specialization || "Lawyer and Engineer"}
                        </p>
                        <div className="d-flex align-items-center justify-content-center">
                          <div
                            style={{ width: 8, height: 8, borderRadius: 5 }}
                            className={
                              !doctor?.isAvailable
                                ? "bg-success"
                                : "bg-secondary"
                            }
                          ></div>
                          <p className="ml-3">Avalible for Consultation</p>
                        </div>
                        <p className="address">{doctor?.bio || ""}</p>
                        <div className="button-box row">
                          <Link
                            style={{ fontSize: "0.9em" }}
                            className="btn btn-outline-primary mb-3"
                            to={{
                              pathname: `/PatientBookAppointment/${doctor.doctorId}`,
                              state: {
                                firstName: doctor.doctor.firstName,
                                lastName: doctor.doctor.lastName,
                              },
                            }}
                          >
                            <span className="link-icon icofont-doctor" />
                            <span className="link-text">Book Appointment</span>
                          </Link>

                          <Link
                            style={{ fontSize: "0.9em" }}
                            className="btn btn-primary mb-3"
                            to={{
                              pathname: `/PatientBookConsultation/${doctor.doctorId}`,
                              state: {
                                firstName: doctor.doctor.firstName,
                                lastName: doctor.doctor.lastName,
                              },
                            }}
                          >
                            <span className="link-icon icofont-doctor" />
                            <span className="link-text">Book Consultation</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="add-action-box">
                <button
                  className="btn btn-dark btn-lg btn-square rounded-pill"
                  data-toggle="modal"
                  data-target="#add-doctor"
                >
                  <span className="btn-icon icofont-contact-add" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default DoctorList;
