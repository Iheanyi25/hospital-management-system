import React from "react";
import { PageLoader } from "../../Components";
import formatAmount from "../../utils/formatAmount";
import {
  PayOnline,
  PayCash,
  Others,
  PayFromAccount,
} from "../../Components/Payment/PaymentModes";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getServicesInAnInvoiceUrl,
  postPayForServicesUrl,
  postPayForServicesWithAccountUrl,
} from "../../api/URLs";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";

const $ = window.$;
$.Datatable = require("datatables.net");

class PaymentForService extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.myRef = [];

    this.state = {
      services: [],
      invoiceId: "",
      patientId: "",
      selectedServices: [],
      amount: 0,
      email: "",
      userId: "",
      serviceRequestId: [],
    };
  }

  componentDidMount() {
    this.getSerivices().then(() => this.sync());
    const { invoiceId, user, patientId } = this.props.history.location.state;
    this.setState({
      invoiceId: invoiceId,
      email: user.email,
      userId: user.id,
      patientId: patientId,
    });
  }

  async getSerivices() {
    const {
      history: { location },
    } = this.props;
    const getServicesInAnInvoice = getServicesInAnInvoiceUrl(
      location.state.invoiceId
    );
    const getServicesInAnInvoiceConfig = fetchConfig({
      url: getServicesInAnInvoice,
      method: "get",
    });
    const { data } = await fetchWrapper(getServicesInAnInvoiceConfig);
    console.log(data, 44444);
    this.initializeComponent(data.serviceRequest);
  }

  initializeComponent = (services) => {
    this.setState({
      services: services,
      selectedServices: services,
    });

    this.calculateAmount();
    let ids = [];
    services.map((service) => {
       return ids = [...ids, ...this.formatServiceId(service.id)];
    });
    this.setState({ ...this.state, init: true, serviceRequestId: ids });
  };

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  onServiceSelected = (e, services) => {
    let updatedSelectedServices = undefined;
    let updatedServiceRequestId = undefined;
    if (e.target.checked) {
      updatedSelectedServices = [...this.state.selectedServices, services];
    } else {
      updatedSelectedServices = this.state.selectedServices.filter(
        (item) => item.id !== services.id
      );
    }
    updatedServiceRequestId = this.formatServiceId(services.id);
    this.setState({
      ...this.state,
      selectedServices: updatedSelectedServices,
      serviceRequestId: updatedServiceRequestId,
    });
    this.calculateAmount();
  };

  calculateAmount = () => {
    this.setState((state) => ({
      amount: state.selectedServices.reduce((amount, service) => {
        return amount + service.amount;
      }, 0),
    }));
  };

  formatServiceId = (id) => {
    const { serviceRequestId } = this.state;
    const currentIndex = serviceRequestId.indexOf(id);
    if (currentIndex < 0) {
      return [...serviceRequestId, id];
    } else {
      return serviceRequestId.filter((x) => x !== id);
    }
  };

  payForServices = async (
    referenceNumber,
    paymentMethod,
    description,
    initiatorId
  ) => {
    const { amount: totalAmount, serviceRequestId, patientId } = this.state;
    const { user } = this.props.history.location.state;
    const nextRoute = user.userType === "Admin"? "/AdminManageServiceRequests" : "/AccountManageServiceRequest"

    let payload = {
      patientId,
      serviceRequestId,
      totalAmount,
      paymentMethod,
      referenceNumber,
      initiatorId,
    };

    try {
      const postPayForServices = postPayForServicesUrl();
      const postPayForServicesConfig = fetchConfig({
        url: postPayForServices,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(postPayForServicesConfig);
      notification.success({ message: res.data.message})
      this.history.push(nextRoute)
    } catch (error) {
      notification.error({ message: error?.response?.data?.message})
    }
  };
  payWithAccount = async (
    referenceNumber,
    paymentMethod,
    description,
    initiatorId
  ) => {
    const { amount: totalAmount, serviceRequestId, patientId } = this.state;
    const { user } = this.props.history.location.state;
    const nextRoute = user.userType === "Admin"? "/AdminManageServiceRequests" : "/AccountManageServiceRequest"
    let payload = {
      patientId,
      serviceRequestId,
      totalAmount,
      paymentMethod,
      referenceNumber,
      initiatorId,
    };
    try {
      const postPayForServices = postPayForServicesWithAccountUrl();
      const postPayForServicesConfig = fetchConfig({
        url: postPayForServices,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(postPayForServicesConfig);
      notification.success({ message: res.data.message})
      this.history.push(nextRoute)
    } catch (error) {
      notification.error({ message: error?.response?.data?.message})
    }
    console.log(payload);
  };

  render() {
    const { amount, email } = this.state;
    const { patientId } = this.props.history.location.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header">
              <h3>{`Payment for service invoice #${this.props.history.location.state.invoiceNumber}`}</h3>
            </header>
            <div className=" d-flex">
              <h4 className="font-weight-light">Total Amount:&nbsp;</h4>
              {amount === 0 ? (
                <h4 className="text-info">Nothing selected yet</h4>
              ) : (
                <h4 className="text-info"> &#x20A6;{formatAmount(amount)}</h4>
              )}
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-md-5">
                      <div className="card bg-light">
                        <div className="card-body p-5 m-auto">
                          <h4>Services requested</h4>
                          {this.state.services.length > 0 &&
                            this.state.services.map((service, index) => {
                              return (
                                <div className="d-flex justify-content-between border-bottom p-3">
                                  <div>
                                    <p className="m-0">
                                      {service?.serviceName}
                                    </p>
                                    <small className="mt-0 text-info">
                                      {formatAmount(service?.amount) + " - " ??
                                        ""}
                                      {service.paymentStatus === "PAID" ? (
                                        <span className="text-success">
                                          Paid
                                        </span>
                                      ) : (
                                        <span className="text-danger">
                                          Not paid
                                        </span>
                                      )}
                                    </small>
                                  </div>
                                  <div className="custom-control custom-checkbox mb-3 mt-2">
                                    <input
                                      type="checkbox"
                                      defaultChecked={true}
                                      className="custom-control-input"
                                      onChange={(e) =>
                                        this.onServiceSelected(
                                          e,
                                          service,
                                          index
                                        )
                                      }
                                      id={`customCheck1${index}`}
                                    />{" "}
                                    <label
                                      className="custom-control-label"
                                      for={`customCheck1${index}`}
                                    ></label>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div>
                        <ul
                          className="nav nav-tabs mb-3"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="pills-active-tab"
                              data-toggle="pill"
                              href="#pills-active"
                              role="tab"
                              aria-controls="pills-active"
                              aria-selected="true"
                            >
                              Pay online
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="pills-accepted-tab"
                              data-toggle="pill"
                              href="#pills-accepted"
                              role="tab"
                              aria-controls="pills-accepted"
                              aria-selected="false"
                            >
                              Pay cash
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="pills-account-tab"
                              data-toggle="pill"
                              href="#pills-account"
                              role="tab"
                              aria-controls="pills-account"
                              aria-selected="false"
                            >
                              Pay from account
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="pills-completed-tab"
                              data-toggle="pill"
                              href="#pills-completed"
                              role="tab"
                              aria-controls="pills-completed"
                              aria-selected="false"
                            >
                              Other options
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="pills-active"
                            role="tabpanel"
                            aria-labelledby="pills-active-tab"
                          >
                            <PayOnline
                              details={{ amount, email }}
                              paidSuccessfully={this.payForServices}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-accepted"
                            role="tabpanel"
                            aria-labelledby="pills-accepted-tab"
                          >
                            <PayCash
                              details={{ amount, email }}
                              paidSuccessfully={this.payForServices}
                            />
                          </div>{" "}
                          <div
                            className="tab-pane fade"
                            id="pills-account"
                            role="tabpanel"
                            aria-labelledby="pills-account-tab"
                          >
                            <PayFromAccount
                              patientId={patientId}
                              details={{ amount, email }}
                              paidSuccessfully={this.payWithAccount}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-completed"
                            role="tabpanel"
                            aria-labelledby="pills-completed-tab"
                          >
                            <Others
                              details={{ amount, email }}
                              paidSuccessfully={this.payForServices}
                            />
                          </div>
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

export default observer(PaymentForService);
