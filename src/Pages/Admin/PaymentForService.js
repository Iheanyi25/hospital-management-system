import React from "react";
import { PageLoader } from "../../Components";
import formatAmount from "../../utils/formatAmount";
// import {
//   PayOnline,
//   PayCash,
//   Others,
// } from "./Components/PaymentForServiceModes";
import {
  PayOnline,
  PayCash,
  Others,
} from "../../Components/Payment/PaymentModes";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class PaymentForService extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = [];

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      services: [],
      invoiceId: "",
      selectedServices: [],
      amount: 0,
      email: "",
      serviceRequestId: [],
    };
  }

  componentDidMount() {
    this.getSerivices().then(() => this.sync());
    let user = JSON.parse(localStorage.getItem("authenticatedUser"));
    this.setState({
      invoiceId: this.props.history.location.state,
      email: user.email,
    });
  }

  async getSerivices() {
    const { apiUrl } = this.state;
    const response = await fetch(
      `${apiUrl}/Admin/GetServicesInAnInvoice/${this.props.history.location.state}`
    );
    const data = await response.json();
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
      ids = [...ids, ...this.formatServiceId(service.id)];
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
        return amount + service.cost;
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

  payForServices = async (reference, modeOfPayment) => {
    const { amount, serviceRequestId } = this.state;
    let payload ={
      patientId: "string",
      serviceRequestId: serviceRequestId,
      totalAmount: amount,
      description: "Paid online",
      modeOfPayment: modeOfPayment,
      referenceNumber: modeOfPayment === "online-paystack"? reference.trxref : reference.data?.data?.orderRef
    }
    console.log(payload);
  };

  render() {
    const { amount, email } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header">
              <h3>Payment for service invoice 6740</h3>
            </header>
            <div className=" d-flex">
              <h4 className="font-weight-light">Total Amount:&nbsp;</h4>
              {amount === 0 ? (
                <h4 className="text-info">Nothing selected yet</h4>
              ) : (
                <h4 className="text-info">{`NGN ${formatAmount(amount)}`}</h4>
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
                                      {formatAmount(service?.cost) ?? ""}
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
                          className="nav nav-pills nav-fill mb-3"
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
                            <PayOnline details={{ amount, email }} paidSuccessfully= {this.payForServices}/>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-accepted"
                            role="tabpanel"
                            aria-labelledby="pills-accepted-tab"
                          >
                            <PayCash details={this.state} />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-completed"
                            role="tabpanel"
                            aria-labelledby="pills-completed-tab"
                          >
                            <Others details={this.state} />
                          </div>
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

export default PaymentForService;
