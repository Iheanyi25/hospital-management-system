import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PageLoader } from "../../../Components";

let $ = window.$;
$.DataTables = require("datatables.net");
const apiUrl = process.env.REACT_APP_API_URL;

class UploadServiceRequestResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      image: [],
      additionalComments: "",
      serviceRequestId: "",
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;

    if (params.serviceRequestId) {
      this.fetchServiceRequest(params.serviceRequestId);
      return;
    }
  }

  handleChange(name, e) {
    const value = e.target.value;
    console.log(value);
    if (name == "image") {
      this.state.image.push(value);
    }
    console.log(this.state.image);
    this.setState({
      [name]: value,
    });
  }

  uploadServiceRequestResult = async (e) => {
    e.preventDefault();

    try {
      const {
        result,
        image,
        additionalComments,
        serviceRequestId,
      } = this.state;

      const data = {
        serviceRequestId,
        result,
        image,
        additionalComments,
      };
      console.log(data);

      const request = await fetch(
        `${apiUrl}/Admin/UploadServiceRequestResult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "*/*",
          },
          body: JSON.stringify(data),
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

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
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
                  <form className="mb-4">
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
                        placeholder=""
                        onChange={(e) => this.handleChange("image", e)}
                        value={image}
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
                    <div className="row">
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={(e) => this.uploadServiceRequestResult(e)}
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
