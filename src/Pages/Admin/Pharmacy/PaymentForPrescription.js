import React from "react";
import { PageLoader } from "../../../Components";
import {
  PayOnline,
  PayCash,
  Others,
} from "../../../Components/Payment/PaymentModes";
import formatAmount from "../../../utils/formatAmount";

const PaymentForPrescription = () => {
  return (
    <>
      <PageLoader />

      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header">
            <h3>Payment for prescription invoice 6740</h3>
          </header>
          <div className=" d-flex">
            <h4 className="font-weight-light">Total Amount:&nbsp;</h4>
            <h4 className="text-info">Nothing selected yet</h4>
          </div>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-5">
                    <div className="card bg-light">
                      <div className="card-body p-5 m-auto">
                        <h4>[Patient Name]</h4>
                        <div className="border-bottom p-3">
                          <p className="m-0">Paracetamol</p>
                          <small className="mt-0 text-info">
                            {formatAmount(3000) + " - " ?? ""}
                            <span className="text-dark">3 packets</span>
                          </small>
                        </div>
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
                            details={{ amount: 5000, email: "k@email.com" }}
                            // paidSuccessfully={this.payForServices}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-accepted"
                          role="tabpanel"
                          aria-labelledby="pills-accepted-tab"
                        >
                          <PayCash
                            details={{ amount: 5000, email: "k@email.com" }}
                            // paidSuccessfully={this.payForServices}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-completed"
                          role="tabpanel"
                          aria-labelledby="pills-completed-tab"
                        >
                          <Others
                            details={{ amount: 5000, email: "k@email.com" }}
                            // paidSuccessfully={this.payForServices}
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
};

export default PaymentForPrescription;
