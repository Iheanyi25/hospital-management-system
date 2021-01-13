import React, { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";

import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postAdminFundAccountsUrl, postPatientFundAccountUrl } from "../../api/URLs";
import paystack1 from "../../assets/img/paystack-icon1.svg";
import paystack2 from "../../assets/img/paystack-icon2.svg";

const PayWithPaystack = ({ paymentDetails, handleSuccess }) => {
  let userType = JSON.parse(localStorage.getItem("authenticatedUser")).userType;

  const [details, setDetails] = useState({
    reference: new Date().getTime(),
    email: "",
    amount: "",
    publicKey: "pk_test_497061cac95adf87f3030c4b986972429b3d153e",
  });

  useEffect(() => {
    setDetails({
      ...details,
      email: paymentDetails.email,
      amount: paymentDetails.amount + "00",
    });
  }, [paymentDetails]);

  const initializePayment = usePaystackPayment(details);

  const handlePayment = (e, initializePayment, details) => {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
  };
  const onSuccess = (reference) => {
    if (paymentDetails.fundAccount) {
      payForServices(reference);
      let payload = {
        amount: paymentDetails.amount,
        patientId: paymentDetails.patientId,
        serviceRequestId: paymentDetails.serviceRequestId,
        modeOfPayment: "online-paystack",
        referenceNumber: reference.trxref,
        paymentDescription: paymentDetails.paymentDescription,
      };
      console.log(payload);
    } else {
      fundAccount(reference);
    }
  };

  const payForServices = async (reference) => {
    console.log(reference);
  };

  const fundAccount = async (reference) => {
    let payload = {
      amount: paymentDetails.amount,
      [`${
        userType === "Admin" ? "accountId" : "patientId"
      }`]: paymentDetails.patientId,
      modeOfPayment: "online-paystack",
      transactionRefrence: reference.trxref,
      paymentDescription: paymentDetails.paymentDescription,
    };
    try {
      const postFundAccounts = userType === "Admin" ? postAdminFundAccountsUrl() : postPatientFundAccountUrl()
      const postAdminFundAccountsConfig = fetchConfig({ url: postFundAccounts, data: payload, method: "post" });
      const res = await fetchWrapper(postAdminFundAccountsConfig)
      if (res.status === 200) {
        handleSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    console.log("closed");
  };

  return (
    <div className="col-md-6">
      <button
        className="btn btn-light btn-lg btn-block"
        name="modeOfPayment"
        value="paystack"
        onClick={(e) => {
          handlePayment(e, initializePayment, details);
        }}
      >
        <img src={paystack1} className="mr-1" alt="" />
        <img src={paystack2} alt="" />
      </button>
    </div>
  );
};

export { PayWithPaystack };
