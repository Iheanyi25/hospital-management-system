import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../../Components";
import formatAmount from "../../../utils/formatAmount";
import formatDate from "../../../utils/formatDate";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";

let $ = window.$;
$.DataTables = require("datatables.net");
const apiUrl = process.env.REACT_APP_API_URL;

class ManageServiceRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    this.fetchCategory().then(() => this.sync());
  }

  async fetchCategory() {
    const res = await fetch(`${apiUrl}/Admin/GetAllServiceRequestInvoice`);
    const response = await res.json();
    console.log(response);
    this.setState({ categories: response.serviceInvoices });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    console.log(this.state.categories);
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Manage services requested</h4>
              <NavLink className="btn btn-primary" to="/AdminServiceRequests">
                Request Service
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
                        <h6 className="mt-0 mb-1">No of Services request</h6>
                        <div className="count text-primary fs-20">
                          {this.state.categories.length}
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
                        className="table"
                        // data-columns='[
                        //         { "data": "#" },
                        //         { "data": "name" },
                        //         { "data": "invoicenumber" },
                        //         { "data": "date-generated" },
                        //         { "data": "cost" },
                        //         { "data": "actions" }
                        //     ]'
                        data-paging="true"
                        data-info="true"
                      >
                        <thead>
                          <tr className="bg-primary text-white">
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
                          {this.state.categories.map((category, index) => {
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
                                    {formatDate(category?.dateGenerated) ?? ""}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {formatAmount(category?.cost) ?? ""}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {category?.paymentStatus === "NOT PAID" ? (
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
                                      {category?.paymentStatus ===
                                      "NOT PAID" ? (
                                        <NavLink
                                          to={{
                                            pathname: `/AdminPaymentForService/${category.id}`,
                                            state: {
                                              invoiceId: category.id,
                                              patientId: category.patientId,
                                              invoiceNumber:
                                                category.invoiceNumber,
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
                                          pathname: `/AdminViewServiceRequestContents/${category.id}`,
                                          state: {
                                            invoiceId: category.id,
                                            patientId: category.patientId,
                                            invoiceNumber:
                                              category.invoiceNumber,
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
                          })}
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

export default ManageServiceRequest;
