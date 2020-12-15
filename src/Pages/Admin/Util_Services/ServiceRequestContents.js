import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../../Components";
import formatAmount from "../../../utils/formatAmount";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";

let $ = window.$;
$.DataTables = require("datatables.net");

const apiUrl = process.env.REACT_APP_API_URL;

class ServiceRequestContents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceRequests: [],
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;
    console.log(params.invoiceId);
    if (params.invoiceId) {
      this.fetchServiceRequestsInInvoice(params.invoiceId).then(() =>
        this.sync()
      );
    }
  }

  async fetchServiceRequestsInInvoice(invoiceId) {
    const res = await fetch(
      apiUrl + `/Admin/GetServicesInAnInvoice/${invoiceId}`
    );
    const response = await res.json();
    console.log(response);
    this.setState({ serviceRequests: response.serviceRequest });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    const { serviceRequests } = this.state;
    const { invoiceNumber, invoiceId, patientId, paymentStatus, user } =
      this.props.location?.state ?? "";

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
                {`Services Request in Invoice #${invoiceNumber}`}
              </h4>
              {paymentStatus === "PAID" || user.userType === "Lab" ? null : (
                <NavLink
                  className="btn btn-primary"
                  to={{
                    pathname:
                      user.userType === "Admin"
                        ? `/AdminPaymentForService/${invoiceId}`
                        : `/AccountPaymentForService/${invoiceId}`,
                    state: {
                      invoiceId: invoiceId,
                      patientId: patientId,
                      invoiceNumber: invoiceNumber,
                    },
                  }}
                >
                  Pay For Services
                </NavLink>
              )}
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
                        className="table table-striped"
                        data-paging="true"
                        data-info="true"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Patient's Name</th>
                            <th>Service Category</th>
                            <th>Service Name</th>
                            <th>Amount</th>
                            <th>Status</th>
                            {user.userType === "Admin" ||
                            user.userType === "Lab" ? (
                              <th>Actions</th>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {serviceRequests.map((serviceRequest, index) => (
                            <tr key={index}>
                              <td>
                                <div className="text-muted text-nowrap">1</div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  {`${serviceRequest?.patientFirstName} ${serviceRequest?.patientLastName}`}
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  {serviceRequest?.serviceCategoryName}
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  {serviceRequest?.serviceName}
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  {formatAmount(serviceRequest?.amount) ?? ""}
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  {serviceRequest?.paymentStatus === "False" ? (
                                    <>
                                      <img src={notpaid} alt="not paid" /> Not
                                      paid
                                    </>
                                  ) : (
                                    <>
                                      <img src={paid} alt="paid" /> Paid
                                    </>
                                  )}
                                </div>
                              </td>
                              {user.userType === "Admin" ||
                              user.userType === "Lab" ? (
                                <td>
                                  {user.userType === "Lab" &&
                                  serviceRequest?.paymentStatus === "False" ? (
                                    <p>Refer to accounts</p>
                                  ) : (
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
                                          to={user.userType === "Admin" ? `/AdminUploadServiceRequestResult/${serviceRequest.id}`:`/LabUploadServiceRequestResult/${serviceRequest.id}`}
                                          className="btn btn-sm btn-block"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                          Upload Result
                                        </NavLink>

                                        <NavLink
                                          to={user.userType === "Admin" ? `/AdminViewLabResults/${serviceRequest.id}`: `/LabViewLabResults/${serviceRequest.id}`}
                                          className="btn btn-sm btn-block"
                                        >
                                          <span className="btn-icon icofont-server mr-2" />
                                          View Result
                                        </NavLink>
                                        {/* <NavLink
                                      to="#"
                                      className="btn btn-sm btn-block"
                                    >
                                      <span className="btn-icon icofont-server mr-2" />
                                      Remove From Invoice
                                    </NavLink> */}
                                      </div>
                                    </div>
                                  )}
                                </td>
                              ) : null}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default ServiceRequestContents;
 