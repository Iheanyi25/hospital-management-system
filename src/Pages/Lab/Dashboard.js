import React from "react";
import { PageLoader } from "../../Components";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { labDashboardUrl } from "../../api/URLs";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";
import { getAllServiceRequestInvoiceUrl } from "../../api/URLs";
import formatAmount from "../../utils/formatAmount";
import formatDate from "../../utils/formatDate";
import notpaid from "../../assets/img/notpaid.svg";
import paid from "../../assets/img/paid.svg";
import incomplete from "../../assets/img/incomplete.svg";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../mobx/UserState";
import { toJS } from "mobx";
import { observer } from "mobx-react";

let $ = window.$;
$.DataTables = require("datatables.net");

class Dashboard extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      serviceCategory: 0,
      service: 0,
      completedServiceRequest: 0,
      uncompletedServiceRequest: 0,
      serviceRequestInvoices: [],
    };
  }
  async componentDidMount() {
    this.fetchServiceRequestInvoices().then(() => this.sync());
    const getLabDashboardCounters = labDashboardUrl();
    const getLabDashboardCountersConfig = fetchConfig({
      url: getLabDashboardCounters,
      method: "get",
    });
    console.log(getLabDashboardCountersConfig, 11111);
    const { data } = await fetchWrapper(getLabDashboardCountersConfig);
    console.log(444, data);
    this.setState({ serviceCategory: data.serviceCategoryCount });
    this.setState({ service: data.servicesCount });
    this.setState({
      completedServiceRequest: data.serviceRequestPaidAndDoneCount,
    });
    this.setState({
      uncompletedServiceRequest: data.serviceRequestPaidAndNotDoneCount,
    });
  }

  async fetchServiceRequestInvoices() {
    const getAllServiceRequestInvoice = getAllServiceRequestInvoiceUrl();
    const getAllServiceRequestInvoiceConfig = fetchConfig({
      url: getAllServiceRequestInvoice,
      method: "get",
    });
    const { data } = await fetchWrapper(getAllServiceRequestInvoiceConfig);

    this.setState({ serviceRequestInvoices: data.serviceInvoices });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    console.log($(this.el));
  }

  render() {
    const {
      serviceCategory,
      service,
      completedServiceRequest,
      uncompletedServiceRequest,
      // user,
      userName,
      serviceRequestInvoices,
    } = this.state;
    const { user } = this.context;
    const { firstName, lastName, userType } = user;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <div className="row">
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-01s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Services</h6>
                          <div className="count text-primary fs-20">
                            {service}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-02s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Service Category</h6>
                          <div className="count text-primary fs-20">
                            {serviceCategory}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-03s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Pending Service Request</h6>
                          <div className="count text-primary fs-20">
                            {uncompletedServiceRequest}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-3">
                  <div className="card animated fadeInUp delay-04s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-list"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">
                            Completed Service Request
                          </h6>
                          <div className="count text-primary fs-20">
                            {completedServiceRequest}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="card bg-light">
                    <div className="card-header">
                      Welcome {`${firstName} ${lastName}`}
                    </div>
                    <div className="card-body">
                      You have no new notifications
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card text-white bg-primary">
                    <div className="card-header">Important Updates</div>
                    <div className="card-body">
                      An apple a day keeps the doctor away
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-0">
                <div className="card-header">Recent Requests</div>
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
                                <th>Patient Name</th>
                                <th>No of Services</th>
                                <th>Invoice No</th>
                                <th>Date Generated</th>
                                <th>Total Cost</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.serviceRequestInvoices.map(
                                (category, index) => {
                                  return (
                                    <tr>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {index + 1}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {category?.fullname}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {category?.noofServices}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {category?.invoiceNumber}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {formatDate(
                                            category?.dateGenerated
                                          ) ?? ""}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {formatAmount(category?.cost) ?? ""}
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-muted text-nowrap">
                                          {category?.paymentStatus ===
                                          "NOT PAID" ? (
                                            <>
                                              <img
                                                src={notpaid}
                                                alt="not paid"
                                              />{" "}
                                              Not paid
                                            </>
                                          ) : category?.paymentStatus ===
                                            "PAID" ? (
                                            <>
                                              <img src={paid} alt="paid" /> Paid
                                            </>
                                          ) : (
                                            <>
                                              <img
                                                src={incomplete}
                                                alt="paid"
                                              />{" "}
                                              Incomplete
                                            </>
                                          )}
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
                                            {userType ===
                                            "Lab" ? null : category?.paymentStatus ===
                                                "NOT PAID" ||
                                              category?.paymentStatus ===
                                                "INCOMPLETE" ? (
                                              <NavLink
                                                to={{
                                                  pathname:
                                                    userType === "Admin"
                                                      ? `/AdminPaymentForService/${category.id}`
                                                      : `/AccountPaymentForService/${category.id}`,
                                                  state: {
                                                    invoiceId: category.id,
                                                    patientId:
                                                      category.patientId,
                                                    invoiceNumber:
                                                      category.invoiceNumber,
                                                    user: toJS(user),
                                                  },
                                                }}
                                                className="btn btn-sm btn-block"
                                              >
                                                <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                                Pay for Services
                                              </NavLink>
                                            ) : null}

                                            <NavLink
                                              to={{
                                                pathname:
                                                  userType === "Admin"
                                                    ? `/AdminViewServiceRequestContents/${category.id}`
                                                    : userType === "Lab"
                                                    ? `/LabServiceRequestContents/${category.id}`
                                                    : `/AccountServiceRequestContents/${category.id}`,
                                                state: {
                                                  invoiceId: category.id,
                                                  patientId: category.patientId,
                                                  invoiceNumber:
                                                    category.invoiceNumber,
                                                  paymentStatus:
                                                    category.paymentStatus,
                                                  user: toJS(user),
                                                },
                                              }}
                                              className="btn btn-sm btn-block"
                                            >
                                              <span className="btn-icon icofont-server mr-2" />
                                              View Contents
                                            </NavLink>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
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

export default observer(Dashboard);
