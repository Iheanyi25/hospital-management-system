import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorUrl, postPatientAppointmentUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { formatInputDate } from "../../utils/formatInputDate";
import { Success } from "../../Components/Alerts/Success";

//const patientId = JSON.parse(localStorage.getItem("authenticatedUser")).id;
class BookAppointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      doctor: "",
      doctorProfile: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentTitle: "",
      reasonForAppointment: "",
      success: false,
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;
    this.setState({ doctorId: params.doctorId });

    const getDoctor = getDoctorUrl(this.props.doctorId);
    const getDoctorConfig = fetchConfig({ url: getDoctor, method: "get" });
    const { data } = await fetchWrapper(getDoctorConfig);

    console.log(data, 11111);
    this.setState({
      doctor: data,
    });
  }

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  async bookAppointment(e) {
    e.preventDefault();
    const appointmentDet = {
      appointmentDate: this.state.appointmentDate,
      appointmentTime: this.state.appointmentTime,
      appointmentTitle: this.state.appointmentTitle,
      reasonForAppointment: this.state.reasonForAppointment,
      patientId: this.state.patientId,
      doctorId: this.state.doctorId,
    };
    try {
      const postPatientAppointment = postPatientAppointmentUrl();
      const postPatientAppointmentConfig = fetchConfig({
        url: postPatientAppointment,
        data: appointmentDet,
        method: "post",
      });
      const res = await fetchWrapper(postPatientAppointmentConfig);
      const { data, error } = res;

      if (res.status !== 200) {
        throw Error(error.message);
      }

      this.setState({
        showSuccessMessage: true,
        successMessage: data.message,
        appointmentDate: "",
        appointmentTime: "",
        appointmentTitle: "",
        reasonForAppointment: "",
      });
      this.displaySuccess(this.state.successMessage);
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
  }

  displaySuccess = (message) => {
    this.setState({ success: true, message: message });
  };

  render() {
    const { firstName, lastName } = this.props.location.state;
    let {
      doctor,
      appointmentDate,
      appointmentTime,
      appointmentTitle,
      reasonForAppointment,
    } = this.state;

    let displayErrorMessage;
    let displaySuccessMessage;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {this.state.success ? (
            <Success
              history={this.props.history}
              message={this.state.message}
              callback={this.changeSuccess}
              nextRoute={"/AdminAppointments"}
            />
          ) : null}
          <div className="main-content-wrap">
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4">
                        <h4 className="text-center">
                          {`Appointment Form (${firstName} ${lastName}`})
                        </h4>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Appointment Date</label>
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
                        <div className="row mt-5">
                          <div className="col"></div>
                          <div className="col text-right">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => this.bookAppointment(e)}
                              disabled={
                                appointmentDate === "" ||
                                appointmentTime === "" ||
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
