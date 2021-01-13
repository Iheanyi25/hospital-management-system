import React from "react";
import {
  PayWithPaystack,
  PayWithFlutter,
} from "../../Components/Payment/PaymentGateways";
import { Success } from "../../Components/Alerts";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postPatientFundAccountUrl } from "../../api/URLs";

class FundAccount extends React.Component {
  static contextType = UserContext;
  state = {
    amount: "",
    success: false,
  };

  handleSuccess = () => {
    this.setState({ success: true });
  };

  fundAccount = async (reference) => {
    const content = this.context;
    const { user } = content;
    const { amount } = this.state;
    let payload = {
      patientId: user.id,
      amount: amount,
      modeOfPayment: "Paid online",
      transactionReference: reference,
    };
    try {
      const postPatientFundAccount = postPatientFundAccountUrl()
      const postPatientFundAccountConfig = fetchConfig({url : postPatientFundAccount, data: payload, method : 'post'})
      const res = await fetchWrapper(postPatientFundAccountConfig)
     
      if (res.status === 200) {
        this.handleSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(payload);
  };

  render() {
    const content = this.context;
    const { user } = content;
    const { email, phoneNumber } = user;
    const { amount, success } = this.state;
    return (
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        {success ? (
          <Success
            message="Thank you. You have successfully funded your account"
            nextRoute="/PatientAccount"
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
    );
  }
}

export default observer(FundAccount);
