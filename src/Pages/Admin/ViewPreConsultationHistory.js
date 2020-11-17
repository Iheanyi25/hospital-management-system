import React from "react";
import { PageLoader } from "../../Components";

let $ = window.$;
$.DataTables = require("datatables.net");

const apiUrl = process.env.REACT_APP_API_URL;

class ViewPreConsultationHistory extends React.Component {
  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <div className="card border-light w-50 m-auto">
                <div className="card-body">
                  <h4 className="text-center mb-4">
                    Patient’s preconsultation health history
                  </h4>
                  <div id="accordion">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-outline-primary btn-block"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Captured 12 Dec, 2020
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body w-50">
                        <div className="pl-5">
                          <h6 className="font-weight-bold">Patient Vitals</h6>
                          <div className="border-bottom pb-3">
                              <p className="mb-0">Blood pressure</p>
                              <small className="text-info">120/80</small>
                          </div>
                          <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">Respiration</p>
                              <small className="text-info">16</small>
                          </div>
                          <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">Pulse</p>
                              <small className="text-info">100</small>
                          </div>
                          <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">SPO2</p>
                              <small className="text-info">3,000</small>
                          </div>
                          <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">Tempreture (celcius)</p>
                              <small className="text-info">36</small>
                          </div>
                        </div>
                        <div className="pl-5 mt-4">
                          <h6 className="font-weight-bold">Patient BMI</h6>
                          <div className="border-bottom pb-3">
                              <p className="mb-0">Weight (kg)</p>
                              <small className="text-info">78</small>
                          </div>
                          <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">Height (m)</p>
                              <small className="text-info">192</small>
                          </div>
                          <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">Calculated BMI</p>
                              <small className="text-info">30 </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-primary btn-block collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Captured 12 Dec, 2020
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        
                      </div>
                    </div>
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
