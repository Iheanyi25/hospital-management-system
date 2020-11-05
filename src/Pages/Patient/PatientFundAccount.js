import React from "react";
import { PageLoader } from "../../Components";
import { PayWithPaystack, PayWithFlutter } from "./Component";

class FundAccount extends React.Component {
  state = {
    patientId: "",
    amount: "",
    email: "",
    phoneNumber: "",
  };

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("authenticatedUser"));
    this.setState({
      patientId: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  }

  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
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
                            Please provide a valid name.
                          </div>
                        </div>
                        <div className="m-auto">
                          <label>Pay with</label>
                          <div className="row">
                            <PayWithPaystack paymentDetails={this.state} />
                            <PayWithFlutter paymentDetails={this.state} />
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
