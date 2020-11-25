import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";
import formatAmount from "../../utils/formatAmount";

const apiUrl = process.env.REACT_APP_API_URL;
const $ = window.$;
$.Datatable = require("datatables.net");

class ManageAccounts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      user: "",
    };
  }

  async componentDidMount() {
    this.fecthAllAcounts().then(() => this.sync());
    this.setState({
      user: JSON.parse(localStorage.getItem("authenticatedUser")),
    });
  }

  fecthAllAcounts = async () => {
    const response = await fetch(`${apiUrl}/Admin/Account/GetAllAccounts`);
    const data = await response.json();
    console.log(data.accounts);
    this.setState({ accounts: data.accounts });
    console.log(data.accounts);
  };

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    const { accounts, user } = this.state;
    console.log(this.props, "restashznvusdhf");

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title"> Manage Accounts</h4>
            </header>

            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-patient-file"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Account Total</h6>
                        <div className="count text-primary fs-20">
                          {accounts.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-03s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-patient-file" />
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Amount spent (NGN)</h6>
                        <div className="count text-primary fs-20">
                          {accounts.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-03s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-patient-file" />
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Account (NGN)</h6>
                        <div className="count text-primary fs-20">
                          {accounts.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
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
                          <table ref={(el) => (this.el = el)} className="table">
                            <thead>
                              <tr>
                                <th>Photo</th>
                                <th>Account</th>
                                <th>Phone Number</th>
                                <th>Health Plan</th>
                                <th>Balance</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {accounts.length > 0 &&
                                accounts.map((account, index) => (
                                  <tr key={index}>
                                    <td>
                                      <img
                                        src="../assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      <strong>{account?.name}</strong>
                                    </td>
                                    <td>
                                      {account?.phoneNumber ?? "none yet"}
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap">
                                        {account?.healthPlan.name}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        {formatAmount(
                                          account?.accountBalance
                                        ) ?? ""}
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
                                        <div className="dropdown-menu text-left">
                                          <NavLink
                                            to={{
                                              pathname: `${
                                                user.userType === "Admin"
                                                  ? `/AdminFundAccount/${account.id}`
                                                  : `/AccountFundAccount/${account.id}`
                                              }`,
                                              state: { id: account.id, user },
                                            }}
                                            className="btn btn-sm btn-block"
                                          >
                                            <span className="btn-icon icon sli-link mr-2" />{" "}
                                            Fund Account
                                          </NavLink>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
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

export default ManageAccounts;
