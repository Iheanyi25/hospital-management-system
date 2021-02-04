import React, { useState, useEffect } from "react";
import { PageLoader } from "../../../Components";
import {
  PayWithPaystack,
  PayWithFlutter,
} from "../../../Components/Payment/PaymentGateways";

const PayOnline = ({ details, paidSuccessfully, setPaymentParams }) => {
  const [userDetails, setUserDetails] = useState({
    patientId: "",
    amount: "",
    email: "",
    paymentDescription: "",
  });

  useEffect(() => {
    setUserDetails({
      ...userDetails,
      amount: details.amount,
      email: details.email,
    });
  }, [details, userDetails]);

  const handleChange = (e) => {
    setPaymentParams(e.target.name, e.target.value);
  };
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
                    <form className="mb-4 p-5 needs-validation" noValidate>
                      <h4 className="text-center">Fund account</h4>
                      <div className="form-group">
                        <label>Amount(NGN)</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          placeholder="Amount"
                          name="amount"
                          onChange={handleChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">
                          Please provide a valid amount.
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          placeholder="Description"
                          name="paymentDescription"
                          onChange={handleChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">
                          Please provide a valid description.
                        </div>
                      </div>
                      <div className="m-auto">
                        <label>Pay with</label>
                        <div className="row">
                          <PayWithPaystack
                            paymentDetails={userDetails}
                            paidSuccessfully={paidSuccessfully}
                          />
                          <PayWithFlutter
                            paymentDetails={userDetails}
                            paidSuccessfully={paidSuccessfully}
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
};

export { PayOnline };
