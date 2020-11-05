import React, { useEffect, useState } from "react";
import { useRavePayment } from "react-ravepayment";
import flutterwave1 from "../../../assets/img/flutterwave1.svg";
import flutterwave2 from "../../../assets/img/flutterwave2.svg";

const PayWithFlutter = ({ paymentDetails }) => {
  const [details, setDetails] = useState({
    txref: "rave-123456",
    customer_email: "",
    customer_phone: "",
    amount: "",
    PBFPubKey: "FLWPUBK_TEST-7753e6df013e9285a4d93a10b751b747-X",
    production: true,
  });

  useEffect(() => {
    setDetails({
      ...details,
      customer_email: paymentDetails.email,
      customer_phone: paymentDetails.phoneNumber,
      amount: paymentDetails.amount,
    });
    console.log(details);
  }, [paymentDetails]);

  const handlePayment = (e) => {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
  };
  const onSuccess = (reference) => {
    console.log(reference);
    handleSubmit(reference);
  };

  const handleSubmit = async (reference) => {
    let payload = {
      amount: paymentDetails.amount,
      patientId: paymentDetails.patientId,
      modeOfPayment: "online-flutterwave",
      transactionRefrence: reference.data.data.orderRef,
    };
    console.log(payload);
    try {
      let res = await fetch(
        "https://hms-tenece.azurewebsites.net/api/Admin/Account/FundAccount",
        {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "POST",
          body: JSON.stringify(payload),
          redirect: "follow",
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    console.log("closed");
  };
  const { initializePayment } = useRavePayment(details);
  return (
    <div className="col-md-6">
      <button
        className="btn btn-light btn-lg btn-block"
        name="modeOfPayment"
        value="paystack"
        // onClick={(e) => {
        //   handlePayment(e, initializePayment, details);
        // }}
        onClick={(e) => handlePayment(e)}
      >
        <img src={flutterwave1} className="mr-1" alt="" />
        <img src={flutterwave2} alt="" />
      </button>
    </div>
  );
};

export { PayWithFlutter };
