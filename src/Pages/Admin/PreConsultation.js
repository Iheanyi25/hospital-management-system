import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getPatientUrl,
  updatePatientPreConsultationVitalsUrl,
  updatePatientPreConsultationBMIUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { notification } from "../../utils/notification";

class PreConsultation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: "",
      patient: null,

      bloodPressure: "",
      respiration: "",
      pulse: "",
      spo2: "",
      temperature: "",

      weight: "",
      height: "",
      calculatedBMI: ""
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;
    await this.setState({ patientId: params.id });
    const getPatient = getPatientUrl(this.state.patientId);
    const getPatientConfig = fetchConfig({ url: getPatient, method: "get" });
    const { data } = await fetchWrapper(getPatientConfig);

    console.log(data, 111111);
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
      const payload = {
        bloodPressure: this.state.bloodPressure,
        respiration: this.state.respiration,
        pulse: this.state.pulse,
        spo2: this.state.spo2,
        temperature: this.state.spo2,
        patientId: this.state.patientId,
      };
      //
      const updatePatientPreConsultationVitals = updatePatientPreConsultationVitalsUrl();
      const getPatientConfig = fetchConfig({
        url: updatePatientPreConsultationVitals,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(getPatientConfig);
      notification.success({ message: res.data.message})
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message })
    }
  };

  updatePatientBMI = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        weight: this.state.weight,
        height: this.state.height,
        calculatedBMI: this.state.calculatedBMI,
        patientId: this.state.patientId,
      };
      const updatePatientPreConsultationBMI = updatePatientPreConsultationBMIUrl();
      const updatePatientPreConsultationBMIConfig = fetchConfig({
        url: updatePatientPreConsultationBMI,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(updatePatientPreConsultationBMIConfig);
      notification.success({ message: res.data.message})
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message })
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
      calculatedBMI
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

              <header className="page-header">
                <h3 className="page-title">
                  Patient Preconsultation( {patient.patientProfile?.fullName} )
                </h3>
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
                                  type="text"
                                  value={bloodPressure ? bloodPressure : ""}
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
                                  onChange={(e) => this.handleChange("spo2", e)}
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

                          <div className="row justify-content-end mt-5">
                            {/* <div className="col">
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                              >
                                <span className="d-none d-sm-block">
                                  Cancel
                                    </span>{" "}
                                <span className="d-sm-none">Cancel</span>
                              </button>
                            </div> */}
                            <div className="col text-right">
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

                          <div className="row mt-5 justify-content-end">
                            {/* <div className="col">
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                              >
                                <span className="d-none d-sm-block">
                                  Cancel
                                    </span>{" "}
                                <span className="d-sm-none">Cancel</span>
                              </button>
                            </div> */}
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
