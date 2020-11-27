import React from "react";
import { PageLoader } from "../../../Components";

let $ = window.$;
$.DataTables = require("datatables.net");
const apiUrl = process.env.REACT_APP_API_URL;

class UploadServiceRequestResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      images: [],
      additionalComments: "",
      serviceRequestId: "",
    };
  }

  fileSelectedHandler = async (e) => {
    await this.setState({ images: [...this.state.images, ...e.target.files] });
    console.log(this.state.images);
  };

  async componentDidMount() {
    const { params } = this.props.match;

    if (params.serviceRequestId) {
      this.setState({ serviceRequestId: params.serviceRequestId });
      this.fetchServiceRequest(params.serviceRequestId);
      return;
    }
  }

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  uploadServiceRequestResult = async (e) => {
    e.preventDefault();

    //append others
    const { result, additionalComments, serviceRequestId } = this.state;
    const requestResultData = new FormData();
    await requestResultData.append("serviceRequestId", serviceRequestId);
    await requestResultData.append("result", result);

    this.state.images.forEach(
      async (image) => await requestResultData.append("images", image)
    );
    setTimeout(async () => {
      try {
        const request = await fetch(
          `${apiUrl}/Admin/UploadServiceRequestResult`,
          {
            method: "POST",
            body: requestResultData,
          }
        );
        if (!request.ok) {
          const error = await request.json();
          throw Error(error.message);
        }

        //result uploaded successfully
      } catch (error) {
        console.log(error);
      }
    }, 2000);
    await requestResultData.append("additionalComments", additionalComments);

    // Display the key/value pairs
    for (var pair of requestResultData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

  async fetchServiceRequest(serviceRequestId) {
    const res = await fetch(
      apiUrl + `/Admin/GetServiceRequest/${serviceRequestId}`
    );
    const response = await res.json();

    this.setState({
      serviceRequest: response.serviceRequest,
      serviceRequestId: response.serviceRequest.id,
    });
  }

  render() {
    const { serviceRequest, result, image, additionalComments } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Upload Results for (Lab) Services</h4>
            </header>

            <div className="page-content">
              <div className="card-body"></div>
            </div>

            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-12 col-xl-8">
                  <form className="mb-4" onSubmit={this.uploadServiceRequestResult}>
                    <div className="form-group">
                      <label>Service Category</label>{" "}
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        value={serviceRequest?.service.serviceCategory.name}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>Service Name</label>{" "}
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        value={serviceRequest?.service.name}
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>Result</label>{" "}
                      <textarea
                        className="form-control"
                        placeholder="Enter Result"
                        rows={3}
                        onChange={(e) => this.handleChange("result", e)}
                        value={result}
                      />
                    </div>
                    <div className="form-group">
                      <label>Images(If Any)</label>{" "}
                      <input
                        className="form-control"
                        type="file"
                        multiple
                        placeholder=""
                        onChange={(e) => this.fileSelectedHandler(e)}
                        name="image"
                      />
                    </div>

                    <div className="form-group">
                      <label>Additonal Comments</label>{" "}
                      <textarea
                        className="form-control"
                        placeholder="Additional Comments"
                        rows={3}
                        onChange={(e) =>
                          this.handleChange("additionalComments", e)
                        }
                        value={additionalComments}
                      />
                    </div>
                    <div className="row ">
                      <div className="col">
                        <button
                          type="submit"
                          className="btn btn-primary d-flex ml-auto"
                        >
                          Save Result{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default UploadServiceRequestResult;
