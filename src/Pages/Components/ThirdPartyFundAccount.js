import React, { useState } from "react";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";
import logoMakeshift from "../../assets/img/logo-makeshift.svg";
import {
  PayWithFlutter,
  PayWithPaystack,
} from "../../Components/Payment/PaymentGateways";
import { getAccountUrl, thirdPartyFundAccountUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../api/fetcher";
import { PageLoader } from "../../Components";
import { notification } from "../../utils/notification";

const ThirdPartyFundAccount = ({ match }) => {
  const [details, setDetails] = useState({});
  const {
    params: { id: accountNumber },
  } = match;

  const getAccount = getAccountUrl(accountNumber);
  const getAccountConfig = fetchConfig({
    url: getAccount,
    method: "get",
  });
  const { data } = useRequest(getAccountConfig, {
    revalidateOnFocus: false,
  });
  const account = data?.account;
  console.log(account);
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  const paidSuccessfully = async (referencce, modeOfPayment) => {
    const payload = {
      ...details,
      accountNumber,
      paymentMethod: modeOfPayment,
      transactionReference: referencce,
    };
    try {
      const thirdPartyFundAccount = thirdPartyFundAccountUrl();
      const thirdPartyFundAccountConfig = fetchConfig({
        url: thirdPartyFundAccount,
        method: "post",
        data: payload,
      });
      const res = await fetchWrapper(thirdPartyFundAccountConfig);
      console.log(res, 545);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(payload);
  };
  return !data ? (
    <PageLoader />
  ) : (
    <>
      <div className="row h-100">
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <div className="card border-light" style={{ width: "29rem" }}>
            <div className="card-body scroll-property">
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
                    // alt="user"
                  />
                </div>
                <div className="form-group">
                  <label>Account name</label>
                  <input
                    className="form-control"
                    type="text"
                    value={account?.name}
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
                    value={account?.accountNumber}
                    disabled
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Depositor's name</label>
                  <input
                    className="form-control"
                    name="initiator"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Depositor's email</label>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Amount(NGN) to fund</label>
                  <input
                    className="form-control"
                    type="number"
                    name="amount"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Comment</label>
                  <textarea
                    className="form-control"
                    name="paymentDescription"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-center">
                  Select your prefered payment method
                </p>
                <div className="row">
                  <PayWithPaystack
                    paymentDetails={{
                      email: details.email || "hms@email.com",
                      amount: details.amount,
                    }}
                    paidSuccessfully={paidSuccessfully}
                  />
                  <PayWithFlutter
                    paymentDetails={{
                      email: details.email || "hms@email.com",
                      amount: details.amount,
                    }}
                    paidSuccessfully={paidSuccessfully}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 third-background d-flex flex-column align-items-start justify-content-between p-5">
          <img src={logoMakeshift} alt="logo" />
          <h1 className="text-white">Hospital Management Solution</h1>
        </div>
      </div>
    </>
  );
};
export default ThirdPartyFundAccount;
