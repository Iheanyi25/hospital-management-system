import React from "react";
import { PageLoader } from "../../Components";
import user from "../../assets/img/user.png";

let $ = window.$;
$.DataTables = require("datatables.net");

const apiUrl = process.env.REACT_APP_API_URL;

class ViewClarkingHistory extends React.Component {
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
              <div className="card border-light w-75 m-auto">
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
                          //   aria-expanded="true"
                          //   aria-controls="collapseOne"
                        >
                          Captured 12 Dec, 2020
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      //   data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="d-flex mt-3 mb-3">
                          <img
                            src={user}
                            style={{ height: "64px", width: "64px" }}
                            className="rounded-circle mr-3"
                            alt="user"
                          />
                          <div>
                            <h5 className="mb-2 mt-1 font-weight-bold">
                              <u>Dr Emene Vitalis</u>
                            </h5>
                            <p className="mb-2">
                              Clerked patient on 12/12/2020
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-primary btn-block mb-4"
                          data-toggle="collapse"
                          data-target="#collapsePatientHistoryOne"
                        >
                          Patient health history
                        </button>
                        <div
                          id="collapsePatientHistoryOne"
                          className="collapse show"
                        >
                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Social history</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                            <div className="col col-md-6">
                              <h5>Family history</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                          </div>

                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Medical history</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                            <div className="col col-md-6 mb-4">
                              <h5>Travel history</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-primary btn-block"
                          data-toggle="collapse"
                          data-target="#collapseClarking"
                        >
                          Clarking
                        </button>
                        <div id="collapseClarking" className="collapse show">
                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Presenting complains</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                            <div className="col col-md-6">
                              <h5>History of complains</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                          </div>

                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Review of system</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                            <div className="col col-md-6">
                              <h5>Physical exam</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                          </div>

                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Diagnosis</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                            <div className="col col-md-6">
                              <h5>Treatment plan</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                          </div>

                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Obstetrics & Gynecology</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
                            <div className="col col-md-6">
                              <h5>Priscriptions</h5>
                              <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch.{" "}
                              </p>
                            </div>
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
                      <div className="card-body"></div>
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

export default ViewClarkingHistory;
