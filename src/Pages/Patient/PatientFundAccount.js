import React from "react";
import { PageLoader } from "../../Components";
import paystack1 from "../../assets/img/paystack-icon1.svg";
import paystack2 from "../../assets/img/paystack-icon2.svg";
import flutterwave1 from "../../assets/img/flutterwave1.svg";
import flutterwave2 from "../../assets/img/flutterwave2.svg";

class FundAccount extends React.Component {
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
                            type="text"
                            tabIndex={-98}
                            placeholder="Amount"
                            name="name"
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
                            <div className="col-md-6">
                              <button className="btn btn-light btn-lg btn-block">
                                <img src={paystack1} className="mr-1" alt="" />
                                <img src={paystack2} alt="" />
                              </button>
                            </div>
                            <div className="col-md-6">
                              <button className="btn btn-light btn-lg btn-block">
                                <img
                                  src={flutterwave1}
                                  className="mr-1"
                                  alt=""
                                />
                                <img src={flutterwave2} alt="" />
                              </button>
                            </div>
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
