import React from "react";
import { NavLink } from "react-router-dom";
import paid from "../../assets/img/paid.svg";
import notpaid from "../../assets/img/notpaid.svg";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getRegistrationFeeInvoiceUrl } from "../../api/URLs";

let $ = window.$;
$.DataTables = require("datatables.net");

class RegistrationInvoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registrationInvoices: [],
    };
  }

  async componentDidMount() {
    this.fetchInvoices().then(() => this.sync());
  }

  async fetchInvoices() {
    try {
      const getRegistrationFeeInvoice = getRegistrationFeeInvoiceUrl(this.state.doctorId)
      const getRegistrationFeeInvoiceConfig = fetchConfig({url : getRegistrationFeeInvoice, method : 'get'})
      const { data } = await fetchWrapper(getRegistrationFeeInvoiceConfig)
  
      this.setState({ registrationInvoices: data.registrationInvoices });
    } catch (error) {
      console.log(error)
    }

  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  filterInvoiceLength = (value) => {
    return this.state.registrationInvoices.filter(
      (val) => val.paymentStatus === value
    ).length;
  };

  render() {
    const { registrationInvoices } = this.state;
    console.log(registrationInvoices);
    return (
      <>
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Registration Invoices</h4>
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
                        <h6 className="mt-0 mb-1">No of Paid Invoices</h6>
                        <div className="count text-primary fs-20">
                          {this.filterInvoiceLength("Not Paid")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">No of Unpaid Invoices</h6>
                        <div className="count text-primary fs-20">
                          {this.filterInvoiceLength("Paid")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Total No of Invoices</h6>
                        <div className="count text-primary fs-20">
                          {registrationInvoices.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                            <th>Patient Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Invoice Number</th>
                            <th>Total Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registrationInvoices.map(
                            (registrationInvoice, index) => {
                              return (
                                <tr>
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {index + 1}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {`${registrationInvoice?.patient?.firstName} ${registrationInvoice?.patient?.lastName}`}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {registrationInvoice?.patient?.email ??
                                        "N/A"}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {registrationInvoice?.patient
                                        ?.phoneNumber ?? "N/A"}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {registrationInvoice?.invoiceNumber ??
                                        "N/A"}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {registrationInvoice?.amount ?? "N/A"}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-muted text-nowrap">
                                      {registrationInvoice?.paymentStatus ===
                                      "Not Paid" ? (
                                        <>
                                          <img src={notpaid} alt="not paid" />{" "}
                                          Not paid
                                        </>
                                      ) : (
                                        <>
                                          <img src={paid} alt="paid" /> Paid
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
                                        <NavLink
                                          className="btn btn-sm btn-block"
                                          to={{
                                            pathname: `/AccountPatientRegistration/${this.state.patientId}`,
                                            state: {
                                              patientId:
                                                registrationInvoice?.patient
                                                  ?.id,
                                              email:
                                                registrationInvoice?.patient
                                                  ?.email,
                                              cost: registrationInvoice.amount,
                                            },
                                          }}
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                          Pay Now
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
        </main>
      </>
    );
  }
}

export default RegistrationInvoice;
