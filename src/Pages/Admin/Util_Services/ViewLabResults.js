import React from "react";
import { PageLoader } from "../../../Components";
import resultImage from "../../../assets/img/resultImage.svg";

let $ = window.$;
$.DataTables = require("datatables.net");

const apiUrl = process.env.REACT_APP_API_URL;

class ViewLabResults extends React.Component {
  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Results for (lab) services</h4>
            </header>
            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">
                          No of Results for Lab Service
                        </h6>
                        <div className="count text-primary fs-20">14</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card border-light w-75 m-auto">
                <div className="card-body">
                  <h4 className="text-center mb-4">
                    Results of (lab) services
                  </h4>
                  <div id="accordion">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-primary btn-block"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Service name
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div>
                          <h5 className="m-0">Service name</h5>
                          <h6 className="mt-1">Service category</h6>
                        </div>
                        <div className="d-flex flex-wrap">
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                        </div>
                        <div className="result">
                          <h5>Result</h5>
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid.{" "}
                          </p>
                        </div>
                        <div className="comments">
                          <h5>Additional comments</h5>
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch.{" "}
                          </p>
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
                          Service name
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
                        <div>
                          <h5 className="m-0">Service name</h5>
                          <h6 className="mt-1">Service category</h6>
                        </div>
                        <div className="d-flex flex-wrap">
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2">
                            <img
                              src={resultImage}
                              style={{ height: "64px", width: "64px" }}
                              alt="result"
                            />
                          </div>
                        </div>
                        <div className="result">
                          <h5>Result</h5>
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid.{" "}
                          </p>
                        </div>
                        <div className="comments">
                          <h5>Additional comments</h5>
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

export default ViewLabResults;
