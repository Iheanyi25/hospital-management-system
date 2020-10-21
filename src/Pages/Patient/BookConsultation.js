import React from "react";
import { Footer, PageLoader, PatientHeader, PatientSidebar, TemplateSettings } from "../../Components";

class BookConsultation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      doctor: "",
      doctorProfile: "",
      doctorId: "",

      consultationTitle: "",
      reasonForConsultation: "",
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

  async bookConsultation(e) {
    e.preventDefault();

    const {
      consultationTitle,
      reasonForConsultation,
      patientId,
      doctorId,
    } = this.state;

    try {
      const request = await fetch(
        `${this.state.apiUrl}/Patient/AddPatientToQueue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            consultationTitle,
            reasonForConsultation,
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
        consultationTitle: "",
        reasonForConsultation: "",
      });
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
  }

  render() {
    let { doctor, consultationTitle, reasonForConsultation } = this.state;

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
                    Book Consultation With Dr. {doctor.firstName}{" "}
                    {doctor.lastName}{" "}
                  </h3>
                </header>
                <div className="page-content">
                  <div className="row justify-content-center">
                    <div className="col col-md-12">
                      <div class="card border-light">
                        <div class="card-body">
                          <form className="mb-4">
                            <h4>Consultation Form</h4>

                            <div className="form-group">
                              <label>Title of Consultation</label>

                              <input
                                className="form-control"
                                placeholder="Consulation Title"
                                tabIndex={-98}
                                onChange={(e) =>
                                  this.handleChange("consultationTitle", e)
                                }
                                value={consultationTitle}
                              />
                            </div>
                            <div className="form-group">
                              <label>Reason for Consultation</label>{" "}
                              <textarea
                                className="form-control"
                                rows={4}
                                placeholder={"Reason for Consultation"}
                                onChange={(e) =>
                                  this.handleChange("reasonForConsultation", e)
                                }
                                value={reasonForConsultation}
                              />
                            </div>
                            {displayErrorMessage}
                            {displaySuccessMessage}
                            <div className="row">
                              <div className="col">
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={(e) => this.bookConsultation(e)}
                                  disabled={
                                    reasonForConsultation === "" ||
                                      consultationTitle === ""
                                      ? true
                                      : false
                                  }
                                >
                                  Book Now
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

export default BookConsultation;
