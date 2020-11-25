import React from "react";
import { PageLoader } from "../../Components";
import { PayOnline, PayCash, Others } from "./FundingPaymentModes";
import { Success } from "../../Components/Alerts";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class FundAccount extends React.Component {
  state = {
    email: "",
    accountId: "",
    user: {},
    amount: "",
    paymentDescription: "",
    success: false,
  };

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("authenticatedUser"));
    console.log("user email", this.props.history.location.state.id, user.email);
    this.setState({
      accountId: this.props.history.location.state.id,
      user: this.props.history.location.state.user,
      email: user.email,
    });
  }

  setPaymentParams = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  fundAccount = async (reference, modeOfPayment, offline) => {
    const { accountId, user } = this.state;
    let payload = {
      accountId: accountId,
      amount: this.state.amount,
      modeOfPayment: modeOfPayment,
      transactionReference:
        modeOfPayment === "online-paystack"
          ? reference.trxref
          : modeOfPayment === "online-flutterwave"
          ? reference.data?.data?.orderRef
          : offline
          ? reference
          : "",
      paymentDescription: this.state.paymentDescription,
      // userId: user.id,
    };
    try {
      let res = await fetch(
        `https://hms-tenece.azurewebsites.net/api/Admin/Account/FundAccount`,
        {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "POST",
          body: JSON.stringify(payload),
          redirect: "follow",
        }
      );
      if (res.status === 200) {
        this.handleSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(payload);
  };

  handleSuccess = () => {
    this.setState({ success: true });
  };

  render() {
    const { amount, email, user } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {this.state.success ? (
            <Success
              history={this.props.history}
              message="You have successfully funded this account"
              nextRoute={
                user.userType === "Admin"
                  ? "/AdminManageAccounts"
                  : "/AccountantManageAccounts"
              }
            />
          ) : null}
          <div className="main-content-wrap">
            <header className="page-heade">
              <h3>Fund Account</h3>
            </header>

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
                        <PayOnline
                          details={{ email, amount }}
                          paidSuccessfully={this.fundAccount}
                          setPaymentParams={this.setPaymentParams}
                        />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <PayCash
                          paidSuccessfully={this.fundAccount}
                          setPaymentParams={this.setPaymentParams}
                        />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <Others
                          paidSuccessfully={this.fundAccount}
                          setPaymentParams={this.setPaymentParams}
                        />
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

export default FundAccount;
