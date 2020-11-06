import React from "react";
import { PageLoader } from "../../Components";

const apiUrl = process.env.REACT_APP_API_URL;
const $ = window.$;

class BookAppointment extends React.Component {
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
    let res = await fetch(apiUrl + "/Patient/GetPatients");
    const data = await res.json();
    const patientArray = [];

    data.patients.forEach((element) => {
      patientArray.push(element.patient);
    });

    this.setState({ patients: patientArray }, () => {
      this.renderPatientPicker();
    });
  };

  fetchDoctors = async () => {
    let res = await fetch(apiUrl + "/Doctor/GetDoctors");
    const data = await res.json();
    const doctorArray = [];

    data.doctors.forEach((element) => {
      doctorArray.push(element.doctor);
    });

    this.setState({ doctors: doctorArray }, () => {
      this.renderDoctorPicker();
    });
  };

  handleChange(name, e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      [name]: value,
    });
  }

  async bookAppointment(e) {
    e.preventDefault();

    const {
      appointmentDate,
      appointmentTime,
      appointmentTitle,
      reasonForAppointment,
      patientId,
      doctorId,
    } = this.state;

    try {
      const request = await fetch(`${apiUrl}/Admin/BookAppointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentDate,
          appointmentTime,
          appointmentTitle,
          reasonForAppointment,
          patientId,
          doctorId,
        }),
      });

      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      const data = await request.json();

      this.setState({
        showSuccessMessage: true,
        successMessage: data.message,
        appointmentDate: "",
        appointmentTime: "",
        appointmentTitle: "",
        reasonForAppointment: "",
      });
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
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

    let displayErrorMessage;
    let displaySuccessMessage;

    if (this.state.showErrorMessage) {
      displayErrorMessage = (
        <div className="alert alert-danger with-after-icon" role="alert">
          <div className="alert-content">{this.state.errorMessage}</div>
          <div className="alert-icon">
            <i className="icofont-alarm" />
          </div>
        </div>
      );
    }

    if (this.state.showSuccessMessage) {
      displaySuccessMessage = (
        <div className="alert alert-info with-after-icon" role="alert">
          <div className="alert-content text-center">
            {this.state.successMessage}
          </div>
          <div className="alert-icon">
            <i className="icon icofont-ui-check" />
          </div>
        </div>
      );
    }

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
                              <label>Appointment Date</label>

                              <input
                                type="date"
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
                              <label>Appointment Time</label>

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
                          <label>Select A Patient</label>
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
                                  value={item.id}
                                >{`${item.firstName} ${item.lastName}`}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>
                            Select A Doctor(If you want this consultation to be
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
                                  value={item.id}
                                >{`${item.firstName} ${item.lastName}`}</option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Title of Appointment</label>

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
                          <label>Reason for Appointment</label>{" "}
                          <textarea
                            className="form-control"
                            placeholder="Readon For Appointment"
                            rows={3}
                            onChange={(e) =>
                              this.handleChange("reasonForAppointment", e)
                            }
                            value={reasonForAppointment}
                          />
                        </div>
                        {displayErrorMessage}
                        {displaySuccessMessage}
                        <div className="row">
                          <div className="col">
                            <button
                              type="button"
                              className="btn btn-success"
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
                          <div className="col text-right">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                            >
                              <span className="d-none d-sm-block">Cancel</span>{" "}
                              <span className="d-sm-none">Cancel</span>
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
