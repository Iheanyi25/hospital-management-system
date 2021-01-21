import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getPatientAccountBalanceUrl,
  getPatientAccountTransactionsUrl,
  getPatientAccountUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import EmptyUploadState from "../../Components/EmptyState/EmptyUploadState";
import { UserContext } from "../../mobx/UserState";
import formatDate from "../../utils/formatDate";

const $ = window.$;
$.Datatable = require("datatables.net");
const local = "http://localhost:3000";
const dev = " https://hms-tenece-dev.herokuapp.com";
const live = " https://hms-tenece.herokuapp.com";
class PatientAccount extends React.Component {
  static contextType = UserContext;
  state = {
    accountBalance: 0,
    accountTransactions: [],
    acceptedAppointments: [],
    activeAppointments: [],
    pendingAppointments: [],
    completedAppointments: [],
    loading: true,
    thirdPartyFundingLink: "",
  };

  async componentDidMount() {
    const content = this.context;
    const { user } = content;
    try {
      const getPatientAccountBalance = getPatientAccountBalanceUrl(user.id);
      const getPatientAccountBalanceConfig = fetchConfig({
        url: getPatientAccountBalance,
        method: "get",
      });
      const { data } = await fetchWrapper(getPatientAccountBalanceConfig);

      const getPatientAccountTransactions = getPatientAccountTransactionsUrl(
        user.id
      );
      const getPatientAccountTransactionsConfig = fetchConfig({
        url: getPatientAccountTransactions,
        method: "get",
      });
      const { data: data1 } = await fetchWrapper(
        getPatientAccountTransactionsConfig
      );
      const getPatientAccount = getPatientAccountUrl(user.id);
      const getPatientAccountConfig = fetchConfig({
        url: getPatientAccount,
        method: "get",
      });
      const {
        data: { account },
      } = await fetchWrapper(getPatientAccountConfig);
      this.setState({
        thirdPartyFundingLink: `${local}/common/ThirdPartyFundAccount/${account.accountNumber}`,
      });
      console.log(account);

      console.log(data1.accountTransactions);

      this.setState(
        {
          accountBalance: data.accountBalance,
          accountTransactions: data1.accountTransactions,
          loading: false,
        },
        () => this.sync()
      );
    } catch (error) {
      console.log(error);
    }
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  copyToClipboard = () => {
    const { thirdPartyFundingLink } = this.state;
    navigator.clipboard.writeText(`${thirdPartyFundingLink}`);
  };

  render() {
    const { accountBalance, accountTransactions, loading } = this.state;
    console.log(accountTransactions);

    return loading ? (
      <PageLoader />
    ) : (
      <>
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Account History</h4>
              <div>
                <Link
                  type="button"
                  className="btn btn-outline-primary mr-2 mb-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Tooltip on top"
                  to="#"
                  onClick={this.copyToClipboard}
                >
                  Generate Link
                </Link>
                <Link
                  className="btn btn-primary mr-2 mb-2"
                  to="/PatientFundAccount"
                >
                  Fund my account
                </Link>
              </div>
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
              {accountTransactions.length === 0 ? (
                <div
                  className="d-flex justify-content-center"
                  style={{ height: "200px", marginTop: "100px" }}
                >
                  <EmptyUploadState message="You haven’t made any payments" />
                </div>
              ) : (
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
                                <tr>
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
                                  ? accountTransactions.map(
                                      (transaction, index) => (
                                        <tr key={index}>
                                          <td>{transaction.amount}</td>
                                          <td>{transaction.transactionType}</td>
                                          <td>{transaction.paidBy}</td>
                                          <td>{transaction.description}</td>
                                          <td>
                                            {formatDate(
                                              transaction.trasactionDate
                                            )}
                                          </td>
                                          <td>{transaction.amount}</td>
                                        </tr>
                                      )
                                    )
                                  : null}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default observer(PatientAccount);
