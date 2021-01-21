import React from "react";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";
import logoMakeshift from "../../assets/img/logo-makeshift.svg";
import {
  PayWithFlutter,
  PayWithPaystack,
} from "../../Components/Payment/PaymentGateways";
import { getAccountUrl, thirdPartyFundAccountUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../api/fetcher";

const ThirdPartyFundAccount = ({ match }) => {
  const {
    params: { id },
  } = match;
  console.log(id);

  const getAccount = getAccountUrl(id);
  const getAccountConfig = fetchConfig({
    url: getAccount,
    method: "get",
  });
  const { data, error } = useRequest(getAccountConfig, {
    revalidateOnFocus: false,
  });

  const paidSuccessfully = () => {
    const payload = {
      accountNumber: "HMSORTYDUS",
      amount: 200,
      modeOfPayment: "online",
      transactionReference: "string",
      paymentDescription: "string",
      initiator: "string"
    }
    const thirdPartyFundAccount = thirdPartyFundAccountUrl();
    const thirdPartyFundAccountConfig = fetchConfig({
      url: thirdPartyFundAccount,
      method: "post"
    })
    const res = fetchWrapper(thirdPartyFundAccountConfig)
  }
  return (
    <>
      <div className="row h-100">
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <div className="card border-light" style={{ width: "29rem" }}>
            <div className="card-body">
              <form className="mb-4 p-5">
                <h4 className="text-center">Fund patient’s account</h4>
                <div className="text-center mb-4 mt-4">
                  <img
                    src={PatientAndAdminImage}
                    style={{
                      height: "48px",
                      width: "48px",
                      borderRadius: "50%",
                    }}
                    alt="user"
                  />
                </div>
                <div className="form-group">
                  <label>Account name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="passwword"
                    value="Thor Odinson"
                    disabled
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Account number</label>
                  <input
                    className="form-control"
                    type="text"
                    name="passwword"
                    value="08033456123"
                    disabled
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Depositor's name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="passwword"
                    value="08033456123"
                    disabled
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amount(NGN) to fund</label>
                  <input
                    className="form-control"
                    type="number"
                    name="passwword"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Comment</label>
                  <textarea className="form-control" type="text" required />
                </div>
                <p className="text-center">
                  Select your prefered payment method
                </p>
                <div className="row">
                  <PayWithPaystack
                    paymentDetails={{ email: "a@email.com", amount: "300" }}
                  />
                  <PayWithFlutter
                    paymentDetails={{ email: "a@email.com", amount: "300" }}
                  />
                </div>
                {/* <button
                  type="submit"
                  className="btn btn-block btn-primary"
                  type="submit"
                >
                  Fund account
                </button> */}
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 auth-background d-flex flex-column align-items-start justify-content-between p-5">
          <img src={logoMakeshift} alt="logo" />
          <h1 className="text-white">Hospital Management Solution</h1>
        </div>
      </div>
    </>
  );
};
export default ThirdPartyFundAccount;
