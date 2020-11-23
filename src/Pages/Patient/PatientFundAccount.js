import React from "react";
import { PageLoader } from "../../Components";
import {
  PayWithPaystack,
  PayWithFlutter,
} from "../../Components/Payment/PaymentGateways";
import { Success } from "../../Components/Alerts";
const apiUrl = process.env.REACT_APP_API_URL;

class FundAccount extends React.Component {
  state = {
    patientId: "",
    amount: "",
    email: "",
    phoneNumber: "",
    success: false,
  };

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("authenticatedUser"));
    console.log(user.id);
    this.setState({
      patientId: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  }

  handleSuccess = () => {
    this.setState({ success: true });
  };

  fundAccount = async (reference, modeOfPayment) => {
    const { patientId, amount } = this.state;
    let payload = {
      patientId: patientId,
      amount: amount,
      modeOfPayment: modeOfPayment,
      transactionReference:
        modeOfPayment === "online-paystack"
          ? reference.trxref
          : modeOfPayment === "online-flutterwave"
          ? reference.data?.data?.orderRef
          : "",
    };
    try {
      let res = await fetch(`${apiUrl}/Patient/Account/FundAccount`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "POST",
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      if (res.status === 200) {
        this.handleSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(payload);
  };

  render() {
    const { email, amount, phoneNumber } = this.state;
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
              message="Thank you. You have successfully funded your account"
              nextRoute="/patient/PatientDashboard"
            />
          ) : null}
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
                        <h4 className="text-center">Fund my account</h4>
                        <div className="form-group">
                          <label>Amount(NGN)</label>
                          <input
                            className="form-control"
                            type="number"
                            tabIndex={-98}
                            placeholder="Amount"
                            name="amount"
                            onChange={(e) => {
                              this.setState({
                                [e.target.name]: e.target.value,
                              });
                            }}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Oops! should be numbers only.
                          </div>
                        </div>
                        <div className="m-auto">
                          <label>Pay with</label>
                          <div className="row">
                            <PayWithPaystack
                              paymentDetails={{ amount, email }}
                              paidSuccessfully={this.fundAccount}
                            />
                            <PayWithFlutter
                              paymentDetails={{ amount, email, phoneNumber }}
                              paidSuccessfully={this.fundAccount}
                            />
                          </div>
                        </div>
                      </form>
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

export default FundAccount;
