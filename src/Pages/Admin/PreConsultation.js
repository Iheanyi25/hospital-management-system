import React from "react";
import { PageLoader } from "../../Components";

class PreConsultation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      patientId: "",
      patient: null,

      bloodPressure: "",
      respiration: "",
      pulse: "",
      spo2: "",
      temperature: "",

      weight: "",
      height: "",
      calculatedBMI: "",

      displayVitalsSuccessNotification: null,
      displayVitalsFailureNotification: null,

      displayBMISuccessNotification: null,
      displayBMIFailureNotification: null,
    };
  }

  async componentDidMount() {
    const { apiUrl } = this.state;
    const { params } = this.props.match;
    await this.setState({ patientId: params.id });
    const response = await fetch(
      `${apiUrl}/Patient/GetPatient?id=${this.state.patientId}`
    );
    const data = await response.json();
    console.log(data)
    this.setState({
      patient: data,
    });
  }

  handleChange = async (name, e) => {
    const value = e.target.value;
    await this.setState({
      [name]: value,
    });
    if (this.state.weight !== "" && this.state.height !== "") {
      this.setState({
        calculatedBMI: parseFloat(
          this.state.weight / Math.pow(this.state.height, 2)
        ).toFixed(2),
      });
    }
  };

  updatePatientVitals = async (e) => {
    e.preventDefault();

    try {
      const {
        apiUrl,
        bloodPressure,
        respiration,
        pulse,
        spo2,
        temperature,
        patientId,
      } = this.state;
      //
      const request = await fetch(
        `${apiUrl}/PatientPreConsultation/UpdatePatientVitals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            bloodPressure,
            respiration,
            pulse,
            spo2,
            temperature,
          }),
        }
      );
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient vitals successfully updated
      this.setState({
        displayVitalsSuccessNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayVitalsSuccessNotification: false,
          }),
        1500
      );
    } catch (error) {
      console.log(error);
      this.setState({
        displayVitalsFailureNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayVitalsFailureNotification: false,
          }),
        1500
      );
    }
  };

  updatePatientBMI = async (e) => {
    e.preventDefault();

    try {
      const { apiUrl, weight, height, calculatedBMI, patientId } = this.state;

      const request = await fetch(
        `${apiUrl}/PatientPreConsultation/UpdatePatientBMI`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            weight,
            height,
            calculatedBMI,
          }),
        }
      );
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient BMI successfully updated

      this.setState({
        displayBMISuccessNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayBMISuccessNotification: false,
          }),
        1500
      );
    } catch (error) {
      console.log(error);
      this.setState({
        displayBMIFailureNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayBMIFailureNotification: false,
          }),
        1500
      );
    }
  };

  render() {
    const {
      patient,
      bloodPressure,
      respiration,
      pulse,
      spo2,
      temperature,
      weight,
      height,
      calculatedBMI,
      displayBMISuccessNotification,
      displayBMIFailureNotification,
      displayVitalsSuccessNotification,
      displayVitalsFailureNotification,
    } = this.state;
    return (
      <>
        <PageLoader />

        {patient ? (
          <main className="main-content mt-5">
            <div className="app-loader">
              <i className="icofont-spinner-alt-4 rotate" />
            </div>
            <div className="main-content-wrap">
              {displayBMISuccessNotification === true ? (
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className="alert alert-primary alert-dismissible fade show mb-0"
                        role="alert"
                      >
                        BMI successfully Updated{" "}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span className="icofont-close-line"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {displayBMIFailureNotification === true ? (
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className="alert alert-primary alert-dismissible fade show mb-0"
                        role="alert"
                      >
                        There was an error{" "}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span className="icofont-close-line"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {displayVitalsSuccessNotification === true ? (
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className="alert alert-primary alert-dismissible fade show mb-0"
                        role="alert"
                      >
                        Patient Vitals successfully Updated{" "}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span className="icofont-close-line"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {displayVitalsFailureNotification === true ? (
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className="alert alert-primary alert-dismissible fade show mb-0"
                        role="alert"
                      >
                        There was an error{" "}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span className="icofont-close-line"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <header className="page-header">
                <h3 className="page-title">Patient Preconsultation( {patient.patientProfile.fullName} )</h3>
              </header>
              <div className="page-content">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="card border-light">
                      <div className="card-body">
                        <form className="mb-4">
                          <h4>Patient Vitals</h4>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Blood Pressure</label>{" "}
                                <input
                                  className="form-control"
                                  type="number"
                                  value={
                                    bloodPressure ? bloodPressure : ""
                                  }
                                  required
                                  onChange={(e) =>
                                    this.handleChange("bloodPressure", e)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Respiration</label>{" "}
                                <input
                                  className="form-control"
                                  type="number"
                                  value={respiration ? respiration : ""}
                                  onChange={(e) =>
                                    this.handleChange("respiration", e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Pulse</label>{" "}
                                <input
                                  className="form-control"
                                  type="number"
                                  value={pulse ? pulse : ""}
                                  onChange={(e) =>
                                    this.handleChange("pulse", e)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>SPO2</label>{" "}
                                <input
                                  className="form-control"
                                  type="number"
                                  value={spo2 ? spo2 : ""}
                                  onChange={(e) =>
                                    this.handleChange("spo2", e)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Temperature(Celcius)</label>{" "}
                            <input
                              className="form-control"
                              type="number"
                              value={temperature ? temperature : ""}
                              onChange={(e) =>
                                this.handleChange("temperature", e)
                              }
                            />
                          </div>

                          <div className="row justify-content-between mt-5">
                            <div className="col">
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
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => this.updatePatientVitals(e)}
                              >
                                Save Patient Vitals
                                  </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div className="card border-light">
                      <div className="card-body">
                        <form className="mb-4">
                          <h4>Patient BMI</h4>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Weigth(Kg)</label>{" "}
                                <input
                                  className="form-control"
                                  type="number"
                                  value={weight}
                                  onChange={(e) =>
                                    this.handleChange("weight", e)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Height(M)</label>{" "}
                                <input
                                  className="form-control"
                                  type="number"
                                  value={height}
                                  onChange={(e) =>
                                    this.handleChange("height", e)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Calculated BMI</label>{" "}
                            <input
                              className="form-control"
                              type="number"
                              value={calculatedBMI}
                              onChange={(e) =>
                                this.handleChange("calculatedBMI", e)
                              }
                              disabled
                            />
                          </div>

                          <div className="row mt-5 justify-content-between">
                            <div className="col">
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
                            <div className="col text-right">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => this.updatePatientBMI(e)}
                              >
                                Save Patient BMI
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
        ) : null}
      </>
    );
  }
}

export default PreConsultation;
