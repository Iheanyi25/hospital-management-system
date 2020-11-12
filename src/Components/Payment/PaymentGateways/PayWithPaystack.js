import React, { useEffect, useState } from "react";
import paystack1 from "../../../assets/img/paystack-icon1.svg";
import paystack2 from "../../../assets/img/paystack-icon2.svg";
import { usePaystackPayment } from "react-paystack";

const PayWithPaystack = ({
  paymentDetails,
  handleSuccess,
  paidSuccessfully,
}) => {
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

  const handlePayment = (e) => {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
  };
  const onSuccess = (reference) => {
    paidSuccessfully(reference, "online-paystack");
    // if (paymentDetails.fundAccount) {
    //   payForServices(reference);
    //   let payload = {
    //     amount: paymentDetails.amount,
    //     patientId: paymentDetails.patientId,
    //     serviceRequestId: paymentDetails.serviceRequestId,
    //     modeOfPayment: "online-paystack",
    //     referenceNumber: reference.trxref,
    //     paymentDescription: paymentDetails.paymentDescription,
    //   };
    //   console.log(payload);
    // } else {
    //   fundAccount(reference);
    // }
  };

  // const payForServices = async (reference) => {
  //   console.log(reference);
  // };

  // const fundAccount = async (reference) => {
  //   let payload = {
  //     amount: paymentDetails.amount,
  //     [`${
  //       userType === "Admin" ? "accountId" : "patientId"
  //     }`]: paymentDetails.patientId,
  //     modeOfPayment: "online-paystack",
  //     transactionRefrence: reference.trxref,
  //     paymentDescription: paymentDetails.paymentDescription,
  //   };
  //   console.log(payload);
  //   try {
  //     let res = await fetch(`${apiUrl}/${userType}/Account/FundAccount`, {
  //       headers: { "Content-Type": "application/json-patch+json" },
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //       redirect: "follow",
  //     });
  //     if (res.status === 200) {
  //       handleSuccess(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onClose = () => {
    console.log("closed");
  };

  return (
    <div className="col-md-6 mb-2">
      <button
        className="btn btn-light btn-lg btn-block"
        name="modeOfPayment"
        value="paystack"
        onClick={(e) => {
          handlePayment(e);
        }}
      >
        <img src={paystack1} className="mr-1" alt="" />
        <img src={paystack2} alt="" />
      </button>
    </div>
  );
};

export { PayWithPaystack };
