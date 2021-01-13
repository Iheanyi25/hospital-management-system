import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import {
  AddEducation,
  AddExperience,
  AddOfficeTime,
  EditContactInfo,
  AddWebsites,
  AddSpecialization,
} from "../../Components/Modals";
import { Success } from "../Alerts";
import formatTime from "../../utils/formatTime";
import userImage from "../../assets/img/user.png";
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
import linkedin from "../../assets/img/linkedin.svg";
import location from "../../assets/img/location.svg";
import remove from "../../assets/img/remove.svg";
import close from "../../assets/img/close.svg";
import { UserContext } from "../../mobx/UserState";
import EmptyState from "../EmptyState/EmptyUploadState";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { deleteDoctorProfileInfoUrl, getDoctorUrl } from "../../api/URLs";

class DocProfile extends React.Component {
  static contextType = UserContext;
  state = {
    doctorDetails: {},
    doctorId: "",
    doctorAvailability: false,
    doctor: {},
    educations: [],
    experiences: [],
    officeTime: [],
    specializations: [],
    socials: [],

    loading: true,
    displayDeleteEducation: false,
    displayDeleteExperience: false,
    displayDeleteOfficeTime: false,
    displayDeleteWebsite: false,
    displayDeleteSpecialization: false,

    success: false,
    message: "",
  };

  componentDidMount() {
    this.fetchPatientDetails();
  }

  fetchPatientDetails = async () => {
    try {
      const getDoctor = getDoctorUrl(this.props.doctorId);
      const getDoctorConfig = fetchConfig({ url: getDoctor, method: "get" });
      const { data } = await fetchWrapper(getDoctorConfig);

      let doctorDetails = data.doctorProfile;

      this.setState({
        ...this.state,
        doctorDetails: doctorDetails,
        doctorId: doctorDetails.id,
        doctorAvailability: doctorDetails.isAvailable,
        doctor: doctorDetails.doctor,
        educations: doctorDetails.educations,
        experiences: doctorDetails.experiences,
        officeTime: doctorDetails.officeTime,
        specializations: doctorDetails.specializations,
        socials: doctorDetails.socials,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteItem = async (action, id) => {
    try {
      const deleteDoctorProfileInfo = deleteDoctorProfileInfoUrl(action, id);
      const deleteDoctorProfileInfoConfig = fetchConfig({ url: deleteDoctorProfileInfo, method: "delete" });
      const res = await fetchWrapper(deleteDoctorProfileInfoConfig);

      if (res.status === 200) {
        this.displaySuccess(res.message);
        this.fetchPatientDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  displaySuccess = (message) => {
    this.setState({ success: true, message: message });
  };

  changeSuccess = () => {
    this.setState({ success: false });
  };

  render() {
    const content = this.context;
    const { user } = content;
    console.log(user);
    const {
      doctorDetails,
      doctorId,
      doctorAvailability,
      doctor,
      educations,
      experiences,
      officeTime,
      specializations,
      socials,
      loading,
    } = this.state;
    console.log(doctor);
    const specArray = specializations.slice(0, 3);

    return (
      <>
        {loading ? (
          <PageLoader />
        ) : (
            <main className="main-content">
              <div className="app-loader">
                <i className="icofont-spinner-alt-4 rotate" />
              </div>
              {this.state.success ? (
                <Success
                  history={this.props.history}
                  message={this.state.message}
                  callback={this.changeSuccess}
                />
              ) : null}
              <div className="main-content-wrap">
                <div className="page-content">
                  {user.userType === "Patient" ? (
                    <header className="page-header d-flex justify-content-between">
                      <h3 className="page-title">{`Dr. ${doctor?.firstName ?? ""
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
                          {doctorAvailability ? (
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
                          ) : (
                              <button
                                disabled
                                className="btn btn-primary mr-2 mb-2"
                              >
                                Book consultation
                              </button>
                            )}
                        </div>
                      </div>
                    </header>
                  ) : (
                      <header className="page-header ml-3">
                        <h3 className="page-title">{`Dr. ${doctor?.firstName ?? ""
                          } ${doctor?.lastName ?? ""}`}</h3>
                      </header>
                    )}

                  <div className="col col-md-12">
                    <div className="card border-light p-4">
                      <div className="card-body d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                          <img
                            src={userImage}
                            style={{ height: "100px", width: "100px" }}
                            className="mr-3"
                            alt="user"
                          />
                          <div>
                            <h5 className="mb-2 mt-2 font-weight-bold">
                              {`${doctor?.firstName ?? ""} ${doctor?.lastName ?? ""
                                }`}
                            </h5>
                            <p className="mb-2">
                              {specArray.map((specialization, index) =>
                                index === specArray.length - 1
                                  ? `${specialization.specialization}`
                                  : `${specialization.specialization}, `
                              ) ?? "N/A"}
                              {/* General practioner, nuerosurgeon * */}
                            </p>
                            {user.userType === "Doctor" ? (
                              <Link
                                to={{
                                  pathname: "/changepassword",
                                  query: { userType: "doctor" },
                                }}
                              >
                                <img src={reset} alt="reset" className="mr-2" />
                                <img
                                  src={resetText}
                                  alt="reset"
                                  className="mr-2"
                                />
                              </Link>
                            ) : null}
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
                              {user.userType === "Doctor" ? (
                                <img
                                  src={add}
                                  alt="reset"
                                  className="ml-3 mb-2"
                                  data-toggle="modal"
                                  data-target="#add-education"
                                  style={{ cursor: "pointer" }}
                                />
                              ) : null}
                            </div>
                            {user.userType === "Doctor" ? (
                              this.state.displayDeleteEducation ? (
                                <img
                                  src={close}
                                  alt="reset"
                                  className="ml-2 mode-animation"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    this.setState({
                                      displayDeleteEducation: false,
                                    })
                                  }
                                />
                              ) : (
                                  <img
                                    src={remove}
                                    alt="reset"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.setState({
                                        displayDeleteEducation: true,
                                      })
                                    }
                                  />
                                )
                            ) : null}
                          </div>
                          {educations?.map((education, index) => (
                            <div className="row mx-0 mt-4" key={index}>
                              <div className="col-8 p-0">
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
                              <div className="col-1 p-0 text-right">
                                <p></p>
                                {this.state.displayDeleteEducation ? (
                                  <img
                                    src={remove}
                                    alt="reset"
                                    className="mode-animation"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.deleteItem(
                                        "DeleteDoctorEducation",
                                        education.id
                                      )
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>
                          )) ?? "N/A"}
                          {educations.length === 0 ? (
                            <div style={{ marginTop: "50px" }}>
                              <EmptyState
                                message="Nothing uploaded yet"
                                target="#add-education"
                                targetDescription="Upload"
                                noAction={
                                  user.userType === "Doctor" ? false : true
                                }
                              />
                            </div>
                          ) : null}
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
                          <img src={location} alt="location" className="mt-0" />
                          <div className="mt-4 ml-3">
                            <p className="font-weight-bold mb-0">Location</p>
                            <p className="m-0">{`${doctorDetails.city}, ${doctorDetails.state}`}</p>
                            <p className="m-0">{`${doctorDetails.country}`}.</p>
                          </div>
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
                              {user.userType === "Doctor" ? (
                                <img
                                  src={add}
                                  alt="reset"
                                  data-toggle="modal"
                                  data-target="#add-experience"
                                  className="ml-3 mb-2"
                                  style={{ cursor: "pointer" }}
                                />
                              ) : null}
                            </div>
                            {user.userType === "Doctor" ? (
                              this.state.displayDeleteExperience ? (
                                <img
                                  src={close}
                                  alt="reset"
                                  className="ml-2 mode-animation"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    this.setState({
                                      displayDeleteExperience: false,
                                    })
                                  }
                                />
                              ) : (
                                  <img
                                    src={remove}
                                    alt="reset"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.setState({
                                        displayDeleteExperience: true,
                                      })
                                    }
                                  />
                                )
                            ) : null}
                          </div>
                          {experiences?.map((experience, index) => (
                            <div className="row mx-0 mt-4" key={index}>
                              <div className="col-7 p-0">
                                <p className="font-weight-bold mb-2">
                                  {experience?.role ?? "N/A"}
                                </p>
                                <p>{experience?.company ?? "N/A"}</p>
                              </div>
                              <div className="col-3 p-0">
                                <p className="font-weight-bold mb-2">Year</p>
                                <p className="text-nowrap">{`${experience?.startYear ?? "N/A"
                                  } ${experience.endYear === "till date" ? "" : "-"
                                  } ${experience?.endYear ?? "N/A"}`}</p>
                              </div>
                              <div className="col-2 p-0 text-right">
                                <p></p>
                                {this.state.displayDeleteExperience ? (
                                  <img
                                    src={remove}
                                    alt="reset"
                                    className="mode-animation"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.deleteItem(
                                        "DeleteDoctorExperience",
                                        experience.id
                                      )
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>
                          ))}
                          {experiences.length === 0 ? (
                            <div style={{ marginTop: "50px" }}>
                              <EmptyState
                                message="Nothing uploaded yet"
                                target="#add-experience"
                                targetDescription="Upload"
                                noAction={
                                  user.userType === "Doctor" ? false : true
                                }
                              />
                            </div>
                          ) : null}
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
                                Office Time
                            </h6>
                              {user.userType === "Doctor" ? (
                                <img
                                  src={add}
                                  data-toggle="modal"
                                  data-target="#add-office-time"
                                  alt="reset"
                                  className="ml-3 mb-2"
                                  style={{ cursor: "pointer" }}
                                />
                              ) : null}
                            </div>
                            {user.userType === "Doctor" ? (
                              this.state.displayDeleteOfficeTime ? (
                                <img
                                  src={close}
                                  alt="reset"
                                  className="ml-2 mode-animation"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    this.setState({
                                      displayDeleteOfficeTime: false,
                                    })
                                  }
                                />
                              ) : (
                                  <img
                                    src={remove}
                                    alt="reset"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.setState({
                                        displayDeleteOfficeTime: true,
                                      })
                                    }
                                  />
                                )
                            ) : null}
                            {/* {this.props.user ? null : (
                            <img src={edit} alt="reset" className="mr-3 " />
                          )} */}
                          </div>
                          <div className="row mx-0 mt-4 mb-2">
                            <div className="col-8 p-0">
                              <p className="font-weight-bold mb-2">Work days</p>
                            </div>
                            <div className="col-3 p-0">
                              <p className="font-weight-bold mb-2">Period</p>
                            </div>
                            <div className="col-1 p-0"></div>
                          </div>
                          {officeTime?.map((officeTime, index) => (
                            <>
                              <div className="row mx-0 mb-2" key={index}>
                                <div className="col-8 p-0">
                                  <p className="mb-2">
                                    {officeTime?.workDays ?? "N/A"}
                                  </p>
                                </div>
                                <div className="col-3 p-0">
                                  <p className="text-nowrap">
                                    {formatTime(officeTime?.startTime) ?? "N/A"} -{" "}
                                    {formatTime(officeTime?.endTime) ?? "N/A"}
                                  </p>
                                </div>
                                <div className="col-1 p-0 text-right">
                                  {this.state.displayDeleteOfficeTime ? (
                                    <img
                                      src={remove}
                                      alt="reset"
                                      className="mode-animation"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        this.deleteItem(
                                          "DeleteDoctorOfficeTime",
                                          officeTime.id
                                        )
                                      }
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </>
                          )) ?? "N/A"}
                          {officeTime.length === 0 ? (
                            <div style={{ marginTop: "50px" }}>
                              <EmptyState
                                message="Nothing uploaded yet"
                                target="#add-office-time"
                                targetDescription="Upload"
                                noAction={
                                  user.userType === "Doctor" ? false : true
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-5">
                      <div className="card border-light p-4">
                        <div className="card-body">
                          <div className="d-flex justify-content-between border-bottom pb-2">
                            <div className="d-flex">
                              <h6 className="card-title mt-0 font-weight-bold">
                                Contact Information
                            </h6>
                            </div>
                            {user.userType === "Doctor" ? (
                              <img
                                src={edit}
                                data-toggle="modal"
                                data-target="#add-contact-info"
                                alt="reset"
                                className="mb-2"
                                style={{ cursor: "pointer" }}
                              />
                            ) : null}
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
                            <img src={location} alt="location" className="mt-0" />
                            <div className="mt-3 ml-3">
                              <p className="font-weight-bold mb-0">Location</p>
                              {doctorDetails.city === null &&
                                doctorDetails.state === null &&
                                doctorDetails.country === null ? (
                                  <p>N/A</p>
                                ) : (
                                  <>
                                    <p className="m-0">{`${doctorDetails.city}, ${doctorDetails.state}`}</p>
                                    <p className="m-0">
                                      {`${doctorDetails.country}`}.
                                </p>
                                  </>
                                )}
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
                              {user.userType === "Doctor" ? (
                                <img
                                  src={add}
                                  alt="reset"
                                  data-toggle="modal"
                                  data-target="#add-specialization"
                                  className="ml-3 mb-2"
                                  style={{ cursor: "pointer" }}
                                />
                              ) : null}
                            </div>
                            {user.userType === "Doctor" ? (
                              this.state.displayDeleteSpecialization ? (
                                <img
                                  src={close}
                                  alt="reset"
                                  className="ml-2 mode-animation"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    this.setState({
                                      displayDeleteSpecialization: false,
                                    })
                                  }
                                />
                              ) : (
                                  <img
                                    src={remove}
                                    alt="reset"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.setState({
                                        displayDeleteSpecialization: true,
                                      })
                                    }
                                  />
                                )
                            ) : null}
                          </div>
                          <div className="d-flex flex-wrap mt-4">
                            {specializations?.map((specialization, index) => (
                              <p className="mr-5" key={index}>
                                {specialization?.specialization}
                                {this.state.displayDeleteSpecialization ? (
                                  <img
                                    src={remove}
                                    alt="reset"
                                    className="ml-2 mode-animation"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.deleteItem(
                                        "DeleteDoctorSpecialization",
                                        specialization.id
                                      )
                                    }
                                  />
                                ) : null}
                              </p>
                            )) ?? "N/A"}
                          </div>
                          {specializations.length === 0 ? (
                            <div style={{ marginTop: "50px" }}>
                              <EmptyState
                                message="Nothing uploaded yet"
                                target="#add-specialization"
                                targetDescription="Upload"
                                noAction={
                                  user.userType === "Doctor" ? false : true
                                }
                              />
                            </div>
                          ) : null}
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
                              {user.userType === "Doctor" ? (
                                <img
                                  src={add}
                                  data-toggle="modal"
                                  data-target="#add-websites"
                                  alt="reset"
                                  className="ml-3 mb-2"
                                  style={{ cursor: "pointer" }}
                                />
                              ) : null}
                            </div>
                            {user.userType === "Doctor" ? (
                              this.state.displayDeleteWebsite ? (
                                <img
                                  src={close}
                                  alt="reset"
                                  className="ml-2 mode-animation"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    this.setState({
                                      displayDeleteWebsite: false,
                                    })
                                  }
                                />
                              ) : (
                                  <img
                                    src={remove}
                                    alt="reset"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.setState({
                                        displayDeleteWebsite: true,
                                      })
                                    }
                                  />
                                )
                            ) : null}
                          </div>
                          <div className="d-flex flex-wrap">
                            {socials?.map((social, index) =>
                              social.webSite === "LinkedIn" ? (
                                <div className="d-flex mr-5" key={index}>
                                  <img src={linkedin} alt="youtube" />
                                  <div className="ml-4 mr-5">
                                    <div className="d-flex">
                                      <p className="mt-3 font-weight-bold mb-2">
                                        {social.webSite}
                                      </p>
                                      {this.state.displayDeleteWebsite ? (
                                        <img
                                          src={remove}
                                          alt="reset"
                                          className="ml-2 mt-2 mode-animation"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            this.deleteItem(
                                              "DeleteDoctorSocial",
                                              social.id
                                            )
                                          }
                                        />
                                      ) : null}
                                    </div>
                                    <Link to="#" onClick={() => window.open(social.url)}>{social.url}</Link>
                                  </div>
                                </div>
                              ) : social.webSite === "Facebook" ? (
                                <div className="d-flex mr-5">
                                  <img src={facebook} alt="youtube" />
                                  <div className="ml-4 mr-5">
                                    <div className="d-flex">
                                      <p className="mt-3 font-weight-bold mb-2">
                                        {social.webSite}
                                      </p>
                                      {this.state.displayDeleteWebsite ? (
                                        <img
                                          src={remove}
                                          alt="reset"
                                          className="ml-2 mt-2 mode-animation"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            this.deleteItem(
                                              "DeleteDoctorSocial",
                                              social.id
                                            )
                                          }
                                        />
                                      ) : null}
                                    </div>
                                    <Link to="#" onClick={() => window.open(social.url)}>{social.url}</Link>
                                  </div>
                                </div>
                              ) : social.webSite === "Twitter" ? (
                                <div className="d-flex mr-5">
                                  <img src={twitter} alt="youtube" />
                                  <div className="ml-4 mr-5">
                                    <div className="d-flex">
                                      <p className="mt-3 font-weight-bold mb-2">
                                        {social.webSite}
                                      </p>
                                      {this.state.displayDeleteWebsite ? (
                                        <img
                                          src={remove}
                                          alt="reset"
                                          className="ml-2 mt-2 mode-animation"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            this.deleteItem(
                                              "DeleteDoctorSocial",
                                              social.id
                                            )
                                          }
                                        />
                                      ) : null}
                                    </div>
                                    <Link to="#" onClick={() => window.open(social.url)}>{social.url}</Link>
                                  </div>
                                </div>
                              ) : null
                            ) ?? "N/A"}
                          </div>
                          {socials.length === 0 ? (
                            <div style={{ marginTop: "50px" }}>
                              <EmptyState
                                message="Nothing uploaded yet"
                                target="#add-specialization"
                                targetDescription="Upload"
                                noAction={
                                  user.userType === "Doctor" ? false : true
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <AddEducation
                doctorId={doctorId}
                displaySuccess={this.displaySuccess}
                doctorEmail={user.email}
                updatePatientDetails={this.fetchPatientDetails}
              />
              <AddExperience
                doctorId={doctorId}
                displaySuccess={this.displaySuccess}
                doctorEmail={user.email}
                updatePatientDetails={this.fetchPatientDetails}
              />
              <AddOfficeTime
                doctorId={doctorId}
                displaySuccess={this.displaySuccess}
                doctorEmail={user.email}
                updatePatientDetails={this.fetchPatientDetails}
              />
              <EditContactInfo
                doctorId={this.props.doctorId}
                displaySuccess={this.displaySuccess}
                doctorEmail={user.email}
                doctor={doctorDetails}
                updatePatientDetails={this.fetchPatientDetails}
              />
              <AddWebsites
                doctorId={doctorId}
                displaySuccess={this.displaySuccess}
                doctorEmail={user.email}
                updatePatientDetails={this.fetchPatientDetails}
              />
              <AddSpecialization
                doctorId={doctorId}
                displaySuccess={this.displaySuccess}
                doctorEmail={user.email}
                updatePatientDetails={this.fetchPatientDetails}
              />
            </main>
          )}
      </>
    );
  }
}
const DoctorProfile = observer(DocProfile);
export { DoctorProfile };
