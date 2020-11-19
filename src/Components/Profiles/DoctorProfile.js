import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import {
  AddEducation,
  AddExperience,
  AddOfficeTime,
  AddContactInfo,
  AddWebsites,
  AddSpecialization,
} from "../../Components/Modals";
import user from "../../assets/img/user.png";
import reset from "../../assets/img/reset.svg";
import email from "../../assets/img/email.svg";
import phone from "../../assets/img/phone.svg";
import edit from "../../assets/img/edit.svg";
import add from "../../assets/img/add.svg";
import resetText from "../../assets/img/resetText.svg";
import darkPhone from "../../assets/img/darkPhone.svg";
import darkEmail from "../../assets/img/darkEmail.svg";
import facebook from "../../assets/img/facebook.svg";
import twitter from "../../assets/img/twitter.svg";
import youtube from "../../assets/img/youtube.svg";
import location from "../../assets/img/location.svg";

const apiUrl = process.env.REACT_APP_API_URL;
class DoctorProfile extends React.Component {
  state = {
    doctor: {},
    educations: [],
    experiences: [],
    officeTime: [],
    skills: [],
    socials: [],

    loading: true,
  };

  componentDidMount() {
    this.fetchPatientDetails();
  }

  fetchPatientDetails = async (id) => {
    try {
      let res = await fetch(
        `${apiUrl}/Doctor/GetDoctor?DoctorId=${this.props.doctorId}`,
        {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "GET",
          redirect: "follow",
        }
      );
      const data = await res.text();
      let doctorDetails = JSON.parse(data).doctorProfile;
      console.log(doctorDetails);
      this.setState({
        doctor: doctorDetails.doctor,
        educations: doctorDetails.educations,
        experiences: doctorDetails.experiences,
        officeTime: doctorDetails.officeTime,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { doctor, educations, experiences, officeTime, loading } = this.state;
    return (
      <>
        {loading ? (
          <PageLoader />
        ) : (
          <main className="main-content">
            <div className="app-loader">
              <i className="icofont-spinner-alt-4 rotate" />
            </div>
            <div className="main-content-wrap">
              <div className="page-content">
                {this.props.user ? (
                  <header className="page-header d-flex justify-content-between">
                    <h3 className="page-title">{`Dr. ${
                      doctor?.firstName ?? ""
                    } ${doctor?.lastName ?? ""}`}</h3>
                    <div>
                      <div className="col"></div>
                      <div className="col text-right">
                        <Link
                          to={{
                            pathname: `/PatientBookAppointment/${this.props.doctorId}`,
                            state: {
                              firstName: doctor.firstName,
                              lastName: doctor.lastName,
                            },
                          }}
                          className="btn btn-outline-primary mr-2 mb-2"
                        >
                          Book Appointment
                        </Link>
                        <Link
                          to={{
                            pathname: `/PatientBookConsultation/${this.props.doctorId}`,
                            state: {
                              firstName: doctor.firstName,
                              lastName: doctor.lastName,
                            },
                          }}
                          type="submit"
                          className="btn btn-primary mr-2 mb-2"
                        >
                          Book consultation
                        </Link>
                      </div>
                    </div>
                  </header>
                ) : (
                  <header className="page-header">
                    <h3 className="page-title">{`Dr. ${
                      doctor?.firstName ?? ""
                    } ${doctor?.lastName ?? ""}`}</h3>
                  </header>
                )}

                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body d-flex justify-content-between">
                      <div className="d-flex justify-content-between">
                        <img
                          src={user}
                          style={{ height: "100px", width: "100px" }}
                          className="mr-3"
                          alt="user"
                        />
                        <div>
                          <h5 className="mb-2 mt-2 font-weight-bold">
                            {`${doctor?.firstName ?? ""} ${
                              doctor?.lastName ?? ""
                            }`}
                          </h5>
                          <p className="mb-2">
                            General practioner, nuerosurgeon *
                          </p>
                          <Link to="/">
                            <img src={reset} alt="reset" className="mr-2" />
                            <img src={resetText} alt="reset" className="mr-2" />
                          </Link>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="d-flex mb-3 mt-2">
                          <img src={email} alt="reset" className="mr-2 mb-2" />
                          <p>{doctor?.email?.toLowerCase() ?? "N/A"}</p>
                        </div>
                        <div className="d-flex pl-1">
                          <img src={phone} alt="reset" className="mr-3 mb-2" />
                          <p>{doctor?.phoneNumber ?? "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-12 col-md-7">
                    <div className="card border-light p-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                          <div className="d-flex">
                            <h6 className="card-title mt-0 font-weight-bold">
                              Education
                            </h6>
                          </div>
                          {this.props.user ? null : (
                            <img
                              src={add}
                              alt="reset"
                              className="ml-3 mb-2"
                              data-toggle="modal"
                              data-target="#add-education"
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </div>
                        {educations?.map((education, index) => (
                          <div className="row mx-0 mt-4" key={index}>
                            <div className="col-7 p-0">
                              <p className="font-weight-bold mb-2">
                                {education?.degree ?? "N/A"}
                              </p>
                              <p>{education?.institution ?? "N/A"}</p>
                            </div>
                            <div className="col-3 p-0">
                              <p className="font-weight-bold mb-2">Year</p>
                              <p className="text-nowrap">
                                {education?.startYear ?? "N/A"} -{" "}
                                {education?.endYear ?? "N/A"}
                              </p>
                            </div>
                            <div className="col-2 p-0 text-right">
                              <p></p>
                              {this.props.user ? null : (
                                <img
                                  src={edit}
                                  alt="reset"
                                  className="mr-3 mb-2"
                                />
                              )}
                            </div>
                          </div>
                        )) ?? "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-5">
                    <div className="card border-light p-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                          <div className="d-flex">
                            <h6 className="card-title mt-0 font-weight-bold">
                              Experience
                            </h6>
                            {this.props.user ? null : (
                              <img
                                src={add}
                                alt="reset"
                                data-toggle="modal"
                                data-target="#add-experience"
                                className="ml-3 mb-2"
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </div>
                          {this.props.user ? null : (
                            <img src={edit} alt="reset" className="mr-3 mb-2" />
                          )}
                        </div>
                        {experiences?.map((experience, index) => (
                          <div className="row mx-0 mt-4" key={index}>
                            <div className="col-9">
                              <p className="font-weight-bold mb-2">
                                {experience?.role ?? "N/A"}
                              </p>
                              <p>{experience?.company ?? "N/A"}</p>
                            </div>
                            <div className="col-3">
                              <p className="font-weight-bold mb-2">Year</p>
                              <p className="text-nowrap">{`${
                                experience?.startYear ?? "N/A"
                              } - ${experience?.endYear ?? "N/A"}`}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col col-md-7">
                    <div className="card border-light p-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                          <div className="d-flex">
                            <h6 className="card-title mt-0 font-weight-bold">
                              Office Time
                            </h6>
                            {this.props.user ? null : (
                              <img
                                src={add}
                                data-toggle="modal"
                                data-target="#add-office-time"
                                alt="reset"
                                className="ml-3 mb-2"
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </div>
                          {this.props.user ? null : (
                            <img src={edit} alt="reset" className="mr-3 " />
                          )}
                        </div>
                        <div className="row mx-0 mt-4 mb-2">
                          <div className="col-9">
                            <p className="font-weight-bold mb-2">Work days</p>
                          </div>
                          <div className="col-3">
                            <p className="font-weight-bold mb-2">Period</p>
                          </div>
                        </div>
                        {officeTime?.map((officeTime, index) => (
                          <div className="row mx-0 mb-2" key={index}>
                            <div className="col-9">
                              <p className="mb-2">
                                {officeTime?.workDays ?? "N/A"}
                              </p>
                            </div>
                            <div className="col-3">
                              <p className="text-nowrap">
                                {officeTime?.startTime ?? "N/A"} -{" "}
                                {officeTime?.endTime ?? "N/A"}
                              </p>
                            </div>
                          </div>
                        )) ?? "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-5">
                    <div className="card border-light p-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                          <div className="d-flex">
                            <h6 className="card-title mt-0 font-weight-bold">
                              Contact Information
                            </h6>
                            {this.props.user ? null : (
                              <img
                                src={add}
                                data-toggle="modal"
                                data-target="#add-contact-info"
                                alt="reset"
                                className="ml-3 mb-2"
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </div>
                          {this.props.user ? null : (
                            <img src={edit} alt="reset" className="mr-3 mb-2" />
                          )}
                        </div>
                        <div className="d-flex mt-4">
                          <img src={darkEmail} alt="email" className="mt-0" />
                          <div className="mt-3 ml-4">
                            <p className="font-weight-bold mb-0">Email</p>
                            <p>{doctor?.email?.toLowerCase() ?? "N/A"}</p>
                          </div>
                        </div>
                        <div className="d-flex mt-4">
                          <img
                            src={darkPhone}
                            alt="email"
                            className="mt-0 ml-1"
                          />
                          <div className="mt-3 ml-4">
                            <p className="font-weight-bold mb-0">Mobile</p>
                            <p>{doctor?.phoneNumber ?? "N/A"}</p>
                          </div>
                        </div>
                        <div className="d-flex mt-4">
                          <img
                            src={location}
                            alt="location"
                            className="mt-0"
                          />
                          <div className="mt-3 ml-3">
                            <p className="font-weight-bold mb-0">Location</p>
                            <p>Gwarimpa, Abuja</p>
                            {/* <p>Nigeria.</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col col-md-12">
                    <div className="card border-light p-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                          <div className="d-flex">
                            <h6 className="card-title mt-0 font-weight-bold">
                              Specialization
                            </h6>
                            {this.props.user ? null : (
                              <img
                                src={add}
                                alt="reset"
                                data-toggle="modal"
                                data-target="#add-specialization"
                                className="ml-3 mb-2"
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </div>
                          {this.props.user ? null : (
                            <img src={edit} alt="reset" className="mr-3 " />
                          )}
                        </div>
                        <div className="d-flex flex-wrap mt-4">
                          <p className="mr-5">Skills</p>
                          <p className="mr-5">Different skill</p>
                          <p className="mr-5">Another skill</p>
                          <p className="mr-5">Skills</p>
                          <p className="mr-5">Different skill</p>
                          <p className="mr-5">Another skill</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col col-md-12">
                    <div className="card border-light p-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                          <div className="d-flex">
                            <h6 className="card-title mt-0 font-weight-bold">
                              Websites & Socials
                            </h6>
                            {this.props.user ? null : (
                              <img
                                src={add}
                                data-toggle="modal"
                                data-target="#add-websites"
                                alt="reset"
                                className="ml-3 mb-2"
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </div>
                          {this.props.user ? null : (
                            <img src={edit} alt="reset" className="mr-3 " />
                          )}
                        </div>
                        <div className="d-flex flex-wrap">
                          <div className="d-flex">
                            <img src={youtube} alt="youtube" />
                            <div className="ml-4 mr-5">
                              <p className="mt-3 font-weight-bold mb-2">
                                Youtube
                              </p>
                              <Link to="#">youtube.com/liam-jouns</Link>
                            </div>
                          </div>
                          <div className="d-flex">
                            <img src={facebook} alt="youtube" />
                            <div className="ml-4 mr-5">
                              <p className="mt-3 font-weight-bold mb-2">
                                Facebook
                              </p>
                              <Link to="#">youtube.com/liam-jouns</Link>
                            </div>
                          </div>
                          <div className="d-flex">
                            <img src={twitter} alt="youtube" />
                            <div className="ml-4 mr-5">
                              <p className="mt-3 font-weight-bold mb-2">
                                Twitter
                              </p>
                              <Link to="#">youtube.com/liam-jouns</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AddEducation />
            <AddExperience />
            <AddOfficeTime />
            <AddContactInfo />
            <AddWebsites />
            <AddSpecialization />
          </main>
        )}
      </>
    );
  }
}

export { DoctorProfile };
