import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getDoctorsUrl,
  getPatientsUrl,
  postAppointmentUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import { formatInputDate } from "../../utils/formatInputDate";
import { notification } from "../../utils/notification";
const $ = window.$;

class BookAppointment extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      patientId: "",
      doctors: [],
      doctorId: "",

      appointmentDate: "",
      appointmentTime: "",
      appointmentTitle: "",
      reasonForAppointment: "",
    };
  }

  async componentDidMount() {
    this.fetchDoctors();
    this.fetchPatients();
  }

  renderPatientPicker() {
    var select = $(".custom-patient-picker");

    if (select.length) {
      select.each(function () {
        $(this).selectpicker({
          style: "",
          styleBase: "form-control",
          tickIcon: "icofont-check-alt",
        });
      });
    }
  }

  renderDoctorPicker() {
    var select = $(".custom-doctor-picker");

    if (select.length) {
      select.each(function () {
        $(this).selectpicker({
          style: "",
          styleBase: "form-control",
          tickIcon: "icofont-check-alt",
        });
      });
    }
  }

  fetchPatients = async () => {
    const getPatients = getPatientsUrl(1, 200);
    const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
    const { data } = await fetchWrapper(getPatientsConfig);

    this.setState({ patients: data?.patients }, () => {
      this.renderPatientPicker();
    });
  };

  fetchDoctors = async () => {
    const getDoctors = getDoctorsUrl();
    const getDoctorsConfig = fetchConfig({ url: getDoctors, method: "get" });
    const { data: doctors } = await fetchWrapper(getDoctorsConfig);
    this.setState({ doctors: doctors?.doctors }, () => {
      this.renderDoctorPicker();
    });
  };

  handleChange(name, e) {
    const value = e.target.value;
    // console.log(value);
    this.setState({
      [name]: value,
    });
  }

  async bookAppointment(e) {
    e.preventDefault();
    const {
      user: { userType },
    } = this.context;
    const nextRoute =
      userType === "Nurse" ? "/NurseAppointments" : "/AdminAppointments";
    const bookAppointmentDet = {
      appointmentDate: this.state.appointmentDate,
      appointmentTime: this.state.appointmentTime,
      appointmentTitle: this.state.appointmentTitle,
      reasonForAppointment: this.state.reasonForAppointment,
      patientId: this.state.patientId,
      doctorId: this.state.doctorId,
    };

    console.log(this.state.appointmentTime);

    try {
      const postAppointment = postAppointmentUrl();
      const postAppointmentConfig = fetchConfig({
        url: postAppointment,
        data: bookAppointmentDet,
        method: "post",
      });
      const res = await fetchWrapper(postAppointmentConfig);

      const { data } = res;

      this.setState({
        successMessage: data.message,
        appointmentDate: "",
        appointmentTime: "",
        appointmentTitle: "",
        reasonForAppointment: "",
      });
      notification.success({ message: res.data.message });
      this.props.history.push(nextRoute);
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  }

  render() {
    let {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      appointmentTitle,
      reasonForAppointment,
    } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header">
              <h3 className="page-title">Book Appointment</h3>
            </header>
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4">
                        <h4>Appointment Form</h4>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>
                                Appointment Date
                                <small className="text-danger">*</small>
                              </label>

                              <input
                                type="date"
                                min={formatInputDate()}
                                className="form-control"
                                tabIndex={-98}
                                placeholder="Appointment Date"
                                onChange={(e) =>
                                  this.handleChange("appointmentDate", e)
                                }
                                value={appointmentDate}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>
                                Appointment Time
                                <small className="text-danger">*</small>
                              </label>

                              <input
                                type="time"
                                className="form-control"
                                tabIndex={-98}
                                placeholder="Appointment Time"
                                onChange={(e) =>
                                  this.handleChange("appointmentTime", e)
                                }
                                value={appointmentTime}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>
                            Select a Patient
                            <small className="text-danger">*</small>
                          </label>
                          <select
                            className=" custom-patient-picker rounded form-control"
                            data-live-search="true"
                            value={patientId}
                            onChange={(e) => this.handleChange("patientId", e)}
                          >
                            <option selected value="">
                              Select a Patient
                            </option>
                            {this.state.patients.map((item, index) => {
                              return (
                                <option
                                  key={index}
                                  value={item.patientId}
                                >{`${item.firstName} ${item.lastName}`}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>
                            Select a Doctor(If you want this consultation to be
                            assigned to a doctor)
                          </label>
                          <select
                            className=" custom-doctor-picker rounded form-control"
                            data-live-search="true"
                            value={doctorId}
                            onChange={(e) => this.handleChange("doctorId", e)}
                          >
                            <option selected value="">
                              Select a Doctor
                            </option>
                            {this.state.doctors.map((item, index) => {
                              return (
                                <option
                                  key={index}
                                  value={item.doctorId}
                                >{`${item.firstName} ${item.lastName}`}</option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="form-group">
                          <label>
                            Title of Appointment
                            <small className="text-danger">*</small>
                          </label>

                          <input
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            placeholder="Appointment Title"
                            onChange={(e) =>
                              this.handleChange("appointmentTitle", e)
                            }
                            value={appointmentTitle}
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            Reason for Appointment
                            <small className="text-danger">*</small>
                          </label>{" "}
                          <textarea
                            className="form-control"
                            placeholder="Reason For Appointment"
                            rows={3}
                            onChange={(e) =>
                              this.handleChange("reasonForAppointment", e)
                            }
                            value={reasonForAppointment}
                          />
                        </div>
                        <div className="row justify-content-between mt-5">
                          <div className="col">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => this.props.history.goBack()}
                            >
                              <span className="d-none d-sm-block">Cancel</span>{" "}
                              <span className="d-sm-none">Cancel</span>
                            </button>
                          </div>
                          <div className="col text-right">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => this.bookAppointment(e)}
                              disabled={
                                appointmentDate === "" ||
                                appointmentTime === "" ||
                                patientId === "" ||
                                doctorId === "" ||
                                reasonForAppointment === "" ||
                                appointmentTitle === ""
                                  ? true
                                  : false
                              }
                            >
                              Book Appointment
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
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

export default BookAppointment;
