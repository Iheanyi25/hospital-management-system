import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getServiceRequestResultUrl, getServiceRequestResultForPatientUrl } from "../../api/URLs";
// import { PageLoader } from "../../../Components";
import resultImage from "../../assets/img/resultImage.svg";

let $ = window.$;
$.DataTables = require("datatables.net");
class LabResults extends React.Component {
  state = {
    serviceRequestResults: [],
  };

  componentDidMount() {
    this.fetchServiceCategories();
  }

  fetchServiceCategories = async () => {
    console.log(this.props.patientId);
    const { serviceRequestId, patientId } = this.props;
    try {
      const getServiceRequestResult = patientId ? getServiceRequestResultForPatientUrl(patientId)  : getServiceRequestResultUrl(serviceRequestId)
      const getServiceRequestResultConfig = fetchConfig({ url: getServiceRequestResult, method : 'GET'})
      const {data} = await fetchWrapper(getServiceRequestResultConfig)
      this.setState({
        serviceRequestResults: data.serviceRequestResults,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <div className="card-body">
          <h4 className="text-center mb-4">Result of Lab services</h4>
          <div id="accordion" className="mb-3">
            {this.state.serviceRequestResults.length === 0 ? (
              <div className="d-flex justify-content-center my-4">
               <img
                 src={require("../../assets/img/emptyData.svg")}
                 alt="empty states"
               />
             </div>
            ) : (
              this.state.serviceRequestResults.map(
                (serviceRequestResult, index) => (
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
                          {`${serviceRequestResult.serviceRequest?.service?.name}`}
                        </button>
                      </h5>
                    </div>
                    <div
                      id={`collapse${index + 1}`}
                      className="collapse"
                      className={`collapse ${ serviceRequestResult.id === this.props.showId && "show"}`}
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
                              style={{
                                height: "200px",
                                width: "200px",
                              }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2 mb-2">
                            <img
                              src={resultImage}
                              style={{
                                height: "200px",
                                width: "200px",
                              }}
                              alt="result"
                            />
                          </div>
                          <div className="mr-2 mb-2">
                            <img
                              src={resultImage}
                              style={{
                                height: "200px",
                                width: "200px",
                              }}
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
              )
            )}
          </div>
        </div>
      </>
    );
  }
}

export { LabResults };
