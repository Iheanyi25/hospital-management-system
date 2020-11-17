import React from "react";
import { PageLoader } from "../../../Components";
import resultImage from "../../../assets/img/resultImage.svg";

let $ = window.$;
$.DataTables = require("datatables.net");

const apiUrl = process.env.REACT_APP_API_URL;

class ViewLabResults extends React.Component {
  state = {
    serviceRequestResults: [],
  };

  componentDidMount() {
    this.fetchServiceCategories();
  }

  fetchServiceCategories = async () => {
    const { id } = this.props.match.params;
    try {
      let res = await fetch(`${apiUrl}/Admin/GetServiceRequestResults/${id}`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "GET",
        redirect: "follow",
      });
      const data = await res.text();
      console.log(JSON.parse(data).serviceRequestResults);
      this.setState({
        serviceRequestResults: JSON.parse(data).serviceRequestResults,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                        <div className="count text-primary fs-20">
                          {this.state.serviceRequestResults.length}
                        </div>
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
                    {this.state.serviceRequestResults?.map(
                      (serviceRequestResult, index) => (
                        <div className="card mb-0">
                          <div
                            className="card-header"
                            id={`heading${index + 1}`}
                          >
                            <h5 className="mb-0">
                              <button
                                className="btn btn-outline-primary btn-block"
                                data-toggle="collapse"
                                data-target={`#collapse${index + 1}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index + 1}`}
                              >
                                {`${serviceRequestResult.serviceRequest?.service?.name}`}
                              </button>
                            </h5>
                          </div>
                          <div
                            id={`collapse${index + 1}`}
                            className="collapse"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              <div>
                                <h5 className="m-0">{`${serviceRequestResult.serviceRequest?.service?.name}`}</h5>
                                <h6 className="mt-1">{`${serviceRequestResult.serviceRequest?.service?.serviceCategory?.name}`}</h6>
                              </div>
                              <div className="m-auto d-flex flex-wrap">
                                <div className="mr-2 mb-2">
                                  <img
                                    src={resultImage}
                                    style={{ height: "200px", width: "200px" }}
                                    alt="result"
                                  />
                                </div>
                                <div className="mr-2 mb-2">
                                  <img
                                    src={resultImage}
                                    style={{ height: "200px", width: "200px" }}
                                    alt="result"
                                  />
                                </div>
                                <div className="mr-2 mb-2">
                                  <img
                                    src={resultImage}
                                    style={{ height: "200px", width: "200px" }}
                                    alt="result"
                                  />
                                </div>
                              </div>
                              <div className="result">
                                <h5>Result</h5>
                                <p>{`${serviceRequestResult.result}`}</p>
                              </div>
                              <div className="comments">
                                <h5>Additional comments</h5>
                                <p>{`${serviceRequestResult.additionalComments}`}</p>
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

export default ViewLabResults;
