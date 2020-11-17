import React from "react";
import { PageLoader } from "../../Components";
import formatDate from '../../utils/formatDate'

let $ = window.$;
$.DataTables = require("datatables.net");

const apiUrl = process.env.REACT_APP_API_URL;

class ViewPreConsultationHistory extends React.Component {
  state = {
    patientPreConsultations: [],
  };

  componentDidMount() {
    this.fetchServiceCategories();
  }

  fetchServiceCategories = async () => {
    const { id } = this.props.match.params;
    try {
      let res = await fetch(
        `${apiUrl}/PatientPreConsultation/GetPatientPreConsultation?PatientId=${id}`,
        {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "GET",
          redirect: "follow",
        }
      );
      const data = await res.text();
      console.log(JSON.parse(data));
      this.setState({
        patientPreConsultations: JSON.parse(data).patientPreConsultation,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { firstName, lastName} =this.props.history.location.state
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <div className="card border-light w-75 m-auto">
                <div className="card-body">
                  <h4 className="text-center mb-4">
                    {`${firstName} ${lastName}’s pre-consultation health history`}
                  </h4>
                  <div id="accordion" className="mb-3">
                    {this.state.patientPreConsultations.length === 0 ?<h5 className="text-center mt-5">Nothing to see here</h5>: this.state.patientPreConsultations.map(
                      (patientPreConsultation, index) => (
                        <div className="card mb-0">
                          <div className="card-header" id={`heading${index + 1}`}>
                            <h5 className="mb-0">
                              <button
                                className="btn btn-outline-primary btn-block"
                                data-toggle="collapse"
                                data-target={`#collapse${index + 1}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index + 1}`}
                              >
                                {`Captured on ${formatDate(patientPreConsultation?.date) ?? ""}`}
                              </button>
                            </h5>
                          </div>
                          <div
                            id={`collapse${index + 1}`}
                            className="collapse"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="card-body w-50">
                              <div className="pl-5">
                                <h6 className="font-weight-bold">
                                  Patient Vitals
                                </h6>
                                <div className="border-bottom pb-3">
                                  <p className="mb-0">Blood pressure</p>
                                  <small className="text-info">{patientPreConsultation?.bloodPressure}</small>
                                </div>
                                <div className="border-bottom pb-3">
                                  <p className="mb-0 mt-2">Respiration</p>
                                  <small className="text-info">{patientPreConsultation?.respiration}</small>
                                </div>
                                <div className="border-bottom pb-3">
                                  <p className="mb-0 mt-2">Pulse</p>
                                  <small className="text-info">{patientPreConsultation?.pulse}</small>
                                </div>
                                <div className="border-bottom pb-3">
                                  <p className="mb-0 mt-2">SPO2</p>
                                  <small className="text-info">{patientPreConsultation?.spO2}</small>
                                </div>
                                <div className="border-bottom pb-3">
                                  <p className="mb-0 mt-2">
                                    Tempreture (celcius)
                                  </p>
                                  <small className="text-info">{patientPreConsultation?.temperature}</small>
                                </div>
                              </div>
                              <div className="pl-5 mt-4">
                                <h6 className="font-weight-bold">
                                  Patient BMI
                                </h6>
                                <div className="border-bottom pb-3">
                                  <p className="mb-0">Weight (kg)</p>
                                  <small className="text-info">{patientPreConsultation?.weight}</small>
                                </div>
                                <div className="border-bottom pb-3">
                                  <p className="mb-0 mt-2">Height (m)</p>
                                  <small className="text-info">{patientPreConsultation?.height}</small>
                                </div>
                                <div className="border-bottom pb-3">
                                  <p className="mb-0 mt-2">Calculated BMI</p>
                                  <small className="text-info">{patientPreConsultation?.calculatedBMI}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ) ?? null}
                  </div>
                </div>
              </div>
              <div className="add-action-box">
                <button
                  className="btn btn-primary btn-lg btn-square rounded-pill"
                  data-toggle="modal"
                  data-target="#add-appointment"
                >
                  <span className="btn-icon icofont-stethoscope-alt" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default ViewPreConsultationHistory;
