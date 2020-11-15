import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PageLoader } from "../../../Components";

const $ = require("jquery");
$.Datatable = require("datatables.net");

const apiUrl = process.env.REACT_APP_API_URL;

class ServiceRequestContents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceRequests: [],
    };
  }

  async componentDidMount() {
    // this.fetchCategory();

    const { params } = this.props.match;
    if (params.invoiceId) {
      this.fetchServiceRequestsInInvoice(params.invoiceId);
      return;
    }
    // .then(() => this.sync());
  }

  //   async fetchCategory() {
  //     const res = await fetch(apiUrl + "/Admin/GetAllServiceCategories");
  //     const response = await res.json();
  //     this.setState({ categories: response });
  //   }

  async fetchServiceRequestsInInvoice(invoiceId) {
    const res = await fetch(
      apiUrl + `/Admin/GetServicesInAnInvoice/${invoiceId}`
    );
    const response = await res.json();
    console.log(response);
    this.setState({ serviceRequests: response.serviceRequest });
  }

  //   sync() {
  //     this.$el = $(this.el);
  //     this.$el.DataTable();
  //   }

  render() {
    const { serviceRequests } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">
                {" "}
                Services Request in Invoice #AB2344
              </h4>
              <NavLink className="btn btn-primary" to="#">
                {" "}
                Pay For Services
              </NavLink>
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
                        <h6 className="mt-0 mb-1">No of Services In Invoice</h6>
                        <div className="count text-primary fs-20">
                          {serviceRequests.length}
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
              <div className="card mb-0">
                <div className="card-body">
                  <div>
                    <div className="table-responsive">
                      <table
                        ref={(el) => (this.el = el)}
                        className="table data-table"
                        data-columns='[
                                                        { "data": "#" },
                                                        { "data": "name" },
                                                        { "data": "invoicenumber" },
                                                        { "data": "date-generated" },
                                                        { "data": "cost" },
                                                        { "data": "actions" }
                                                    ]'
                        data-paging="true"
                        data-info="true"
                      >
                        <thead>
                          <tr className="bg-primary text-white">
                            <th>#</th>
                            <th>Patient's Name</th>
                            <th>Service Category</th>
                            <th>Service Name</th>
                            <th>Requested By</th>
                            <th>Date On</th>
                            <th>Amount</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serviceRequests.map((serviceRequest, index) => (
                            <tr>
                              <td>
                                <div className="text-muted text-nowrap">1</div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  {serviceRequest.serviceName}
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  Lab Service
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  Imaging and health
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  Dr Vitalis
                                </div>
                              </td>

                              <td>
                                <div className="text-muted text-nowrap">
                                  7th Nov 2020
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  700
                                </div>
                              </td>

                              <td>
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm btn-block dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    Action
                                  </button>
                                  <div className="dropdown-menu">
                                    <NavLink
                                      to={`/AdminUploadServiceRequestResult/${serviceRequest.id}`}
                                      className="btn btn-sm btn-block"
                                    >
                                      <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                      Upload Result
                                    </NavLink>

                                    <NavLink
                                      to="#"
                                      className="btn btn-sm btn-block"
                                    >
                                      <span className="btn-icon icofont-server mr-2" />
                                      View Result
                                    </NavLink>
                                    <NavLink
                                      to="#"
                                      className="btn btn-sm btn-block"
                                    >
                                      <span className="btn-icon icofont-server mr-2" />
                                      Remove From Invoice
                                    </NavLink>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default ServiceRequestContents;
