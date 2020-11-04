import React from "react";
import { PageLoader } from "../../Components";
import paystack1 from "../../assets/img/paystack-icon1.svg";
import paystack2 from "../../assets/img/paystack-icon2.svg";
import flutterwave1 from "../../assets/img/flutterwave1.svg";
import flutterwave2 from "../../assets/img/flutterwave2.svg";

// const apiUrl = process.env.REACT_APP_API_URL;

const $ = require("jquery");
$.Datatable = require("datatables.net");

class PatientRegistration extends React.Component {
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
            <header className="page-heade">
              <h3>Payment for registration</h3>
            </header>
            <div className=" d-flex">
              <h4>Amount:&nbsp;</h4>
              <h4 className="text-info">5000</h4>
            </div>

            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
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
                        <div className="table-responsive">
                          <div className="main-content-wrap w-50">
                            <div className="page-content">
                              <div className="row justify-content-center">
                                <div className="col col-md-12">
                                  <div className="card border-light">
                                    <div className="card-body mb-5">
                                      <h4 className="text-center mt-5">
                                        Select your prefered payment method
                                      </h4>
                                      <div className="w-75 m-auto d-flex justify-content-between">
                                        <button className="btn btn-light btn-lg">
                                          <img
                                            src={paystack1}
                                            className="mr-1"
                                            alt=""
                                          />
                                          <img src={paystack2} alt="" />
                                        </button>
                                        <button className="btn btn-light btn-lg">
                                        <img src={flutterwave1} className="mr-1" alt="" />
                                          <img src={flutterwave2} alt="" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <div className="table-responsive">
                          <div className="main-content-wrap w-50">
                            <div className="page-content">
                              <div className="row justify-content-center">
                                <div className="col col-md-12">
                                  <div className="card border-light">
                                    <div className="card-body">
                                      <form
                                        className="mb-4 p-5 needs-validation"
                                        onSubmit={this.handleSubmit}
                                        noValidate
                                      >
                                        <div className="form-group">
                                          <label>Amount(NGN)</label>
                                          <input
                                            className="form-control"
                                            type="number"
                                            tabIndex={-98}
                                            name="name"
                                            defaultValue="5000"
                                            required
                                          />
                                          <div className="valid-feedback">
                                            Looks good!
                                          </div>
                                          <div className="invalid-feedback">
                                            Oops! should be numbers only.
                                          </div>
                                        </div>
                                        <div className="form-group">
                                          <label>Comment</label>
                                          <textarea
                                            className="form-control"
                                            rows={3}
                                            name="description"
                                            required
                                          />
                                          <div className="valid-feedback">
                                            Looks good!
                                          </div>
                                          <div className="invalid-feedback">
                                            Enter a valid comment
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col"></div>
                                          <div className="col text-right">
                                            <button
                                              type="submit"
                                              className="btn btn-primary"
                                            >
                                              Pay now
                                            </button>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <div className="table-responsive">
                          <div className="main-content-wrap w-50">
                            <div className="page-content">
                              <div className="row justify-content-center">
                                <div className="col col-md-12">
                                  <div className="card border-light">
                                    <div className="card-body">
                                      <form
                                        className="mb-4 p-5 needs-validation"
                                        onSubmit={this.handleSubmit}
                                        noValidate
                                      >
                                        <div className="form-group">
                                          <label>Amount(NGN)</label>
                                          <input
                                            className="form-control"
                                            type="number"
                                            tabIndex={-98}
                                            name="name"
                                            defaultValue="5000"
                                            required
                                          />
                                          <div className="valid-feedback">
                                            Looks good!
                                          </div>
                                          <div className="invalid-feedback">
                                            Oops! should be numbers only.
                                          </div>
                                        </div>
                                        <div className="form-group">
                                          <label>Comment</label>
                                          <select
                                            className="form-control"
                                            name="serviceCategoryId"
                                          >
                                            <option>POS</option>
                                            <option>Cash</option>
                                          </select>
                                          <div className="valid-feedback">
                                            Looks good!
                                          </div>
                                          <div className="invalid-feedback">
                                            Enter a valid comment
                                          </div>
                                        </div>
                                        <div className="form-group">
                                          <label>
                                            Tranfer Reference Number
                                          </label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            tabIndex={-98}
                                            name="name"
                                            required
                                          />
                                          <div className="valid-feedback">
                                            Looks good!
                                          </div>
                                          <div className="invalid-feedback">
                                            Enter a valid ref!
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col"></div>
                                          <div className="col text-right">
                                            <button
                                              type="submit"
                                              className="btn btn-primary"
                                            >
                                              Pay now
                                            </button>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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

export default PatientRegistration;
