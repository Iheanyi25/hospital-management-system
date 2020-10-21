import React from "react";
import { Footer, PageLoader, PatientHeader, PatientSidebar, TemplateSettings } from "../../Components";
// import Header from "../../Components/Header/PatientHeader";
// import Sidebar from "../../Components/Sidebar/PatientSidebar";
// import Footer from "../../Components/Footer";
// import TemplateSettings from "../../Components/TemplateSettings";
// import PageLoader from "../../Components/Loader/PageLoader";

class BookAppointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      doctor: "",

      doctorProfile: "",

      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentTitle: "",
      reasonForAppointment: "",
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;

    //grab the logged in user
    this.setState({ doctorId: params.doctorId });

    const data = await (
      await fetch(
        `${this.state.apiUrl}/Patient/ViewADoctorProfile?DoctorId=${params.doctorId}`
      )
    ).json();
    this.setState({
      doctor: data.doctorProfile.applicationUser,
      doctorProfile: data.doctorProfile.doctorProfile,
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

    const {
      appointmentDate,
      appointmentTime,
      appointmentTitle,
      reasonForAppointment,
      patientId,
      doctorId,
    } = this.state;

    try {
      const request = await fetch(
        `${this.state.apiUrl}/Patient/BookAppointment`,
        {
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
        }
      );

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
      doctor,
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
        <div className="page-box">
          <div className="app-container">
            {/* Horizontal navbar---Header */}
            <PatientHeader />

            {/* Vertical navbar */}
            <PatientSidebar />

            <main className="main-content">
              <div className="app-loader">
                <i className="icofont-spinner-alt-4 rotate" />
              </div>
              <div className="main-content-wrap">
                <header className="page-header">
                  <h3 className="page-title">
                    Book Appointment With Dr. {doctor.firstName}{" "}
                    {doctor.lastName}
                  </h3>
                </header>
                <div className="page-content">
                  <div className="row justify-content-center">
                    <div className="col col-md-12">
                      <div class="card border-light">
                        <div class="card-body">
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
                                  <span className="d-none d-sm-block">
                                    Cancel
                                  </span>{" "}
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

            {/* Footer */}
            <Footer />
          </div>
        </div>
        <TemplateSettings />
      </>
    );
  }
}

export default BookAppointment;
