import React from "react";
import { PageLoader } from "../../Components";
import {
  PayOnline,
  PayCash,
  Others,
} from "./Components/PaymentForServiceModes";

// const apiUrl = process.env.REACT_APP_API_URL;

const $ = require("jquery");
$.Datatable = require("datatables.net");

class PaymentForService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      apiUrl: process.env.REACT_APP_API_URL,
    };
  }

  componentDidMount() {
    this.getAllPatients().then(() => this.sync());
  }

  async getAllPatients() {
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Patient/GetPatients`);
    const data = await response.json();
    this.setState({ patients: data.patients });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
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
              <h4 className="text-info">NGN 5000</h4>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-md-5">
                      <div className="card bg-light">
                        <div className="card-body p-5 m-auto">
                          <h4>Services requested</h4>
                          <div className="d-flex justify-content-between border-bottom p-3">
                            <div>
                              <h5 className="m-0 font-weight-light">Service Name</h5>
                              <h6 className="mt-0 font-weight-light text-info">3000</h6>
                            </div>
                            <div className="custom-control custom-checkbox mb-3 mt-2">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                              />{" "}
                              <label
                                className="custom-control-label"
                                for="customCheck1"
                              ></label>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between border-bottom p-3">
                            <div>
                              <h5 className="m-0 font-weight-light">Service Name</h5>
                              <h6 className="mt-0 font-weight-light text-info">3000</h6>
                            </div>
                            <div className="custom-control custom-checkbox mb-3 mt-2">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck2"
                              />{" "}
                              <label
                                className="custom-control-label"
                                for="customCheck2"
                              ></label>
                            </div>
                          </div>
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
                        <PayOnline />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <PayCash />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <Others />
                      </div>
                    </div>
                  </div></div>
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
