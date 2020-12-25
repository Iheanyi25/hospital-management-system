import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";
import formatDate from "../../utils/formatDate";

const apiUrl = process.env.REACT_APP_API_URL;
const $ = require("jquery");
$.Datatable = require("datatables.net");

class PatientAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      accountBalance: 0,
      accountTransactions: [],
      acceptedAppointments: [],
      activeAppointments: [],
      pendingAppointments: [],
      completedAppointments: [],
    };
  }

  async componentDidMount() {
    const { patientId } = this.state;
    const response = await fetch(
      `${apiUrl}/Patient/Account/GetAccountBalance?PatientId=${this.state.patientId}`
    );
    const data = await response.json();

    const response1 = await fetch(
      `${apiUrl}/Patient/Account/GetPatientAccountTransactions?PatientId=${patientId}`
    );
    const data1 = await response1.json();
    console.log(data1.accountTransactions);
    this.setState({
      accountBalance: data.accountBalance,
      accountTransactions: data1.accountTransactions,
    });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  fetchAccountsHistory = async () => {
    const request = await fetch(
      `${apiUrl}/Patient/Account/GetPatientAccountTransactions?PatientId=${this.state.patientId}`
    );
    const responses = await request.json();
    console.log({ responses });
  };

  render() {
    const { accountBalance, accountTransactions } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title"> Account History</h4>
              <NavLink className="btn btn-primary" to="/PatientFundAccount">
                Fund my account
              </NavLink>
            </header>

            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-money"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Account Total (NGN)</h6>
                        <div className="count text-primary fs-20">
                          {accountBalance}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-03s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-money" />
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Account spent (NGN)</h6>
                        <div className="count text-primary fs-20">
                          {accountTransactions.amount}
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
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-active"
                        role="tabpanel"
                        aria-labelledby="pills-active-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(el) => (this.el = el)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Amount</th>
                                <th>Transaction Type</th>
                                <th>Paid By</th>
                                <th>Medium Of Payment</th>
                                <th>Date</th>
                                <th>Account Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {accountTransactions
                                ? accountTransactions.map((transaction, index) => (
                                    <tr key={index}>
                                      <td>{transaction.amount}</td>
                                      <td>
                                        <td>{transaction.transactionType}</td>
                                      </td>
                                      <td>
                                        <td>{transaction.paidBy}</td>
                                      </td>
                                      <td>
                                        <td>{transaction.description}</td>
                                      </td>
                                      <td>
                                        <td>
                                          {formatDate(
                                            transaction.trasactionDate
                                          )}
                                        </td>
                                      </td>
                                      <td>
                                        <td>{transaction.amount}</td>
                                      </td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <div className="table-responsive">
                          <table
                            className="table data-table"
                            data-columns='[
                                                        { "data": "photo" },
                                                        { "data": "name" },
                                                        { "data": "email" },
                                                        { "data": "phone" },
                                                        { "data": "date-of-birth" },
                                                        { "data": "address" },
                                                        { "data": "actions" }
                                                    ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date Of Birth</th>
                                <th>Address</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <div className="table-responsive">
                          <table
                            className="table data-table"
                            data-columns='[
                                                        { "data": "photo" },
                                                        { "data": "name" },
                                                        { "data": "email" },
                                                        { "data": "phone" },
                                                        { "data": "date-of-birth" },
                                                        { "data": "address" },
                                                        { "data": "actions" }
                                                    ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date Of Birth</th>
                                <th>Address</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-pending"
                        role="tabpanel"
                        aria-labelledby="pills-pending-tab"
                      >
                        <div className="table-responsive">
                          <table
                            className="table data-table"
                            data-columns='[
                                                                    { "data": "photo" },
                                                                    { "data": "name" },
                                                                    { "data": "email" },
                                                                    { "data": "phone" },
                                                                    { "data": "date-of-birth" },
                                                                    { "data": "address" },
                                                                    { "data": "actions" }
                                                                ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date Of Birth</th>
                                <th>Address</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
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

export default PatientAccount;
