import { observer } from "mobx-react";
import React, { useContext } from "react";
import { useRavePayment } from "react-ravepayment";
import flutterwave1 from "../../../assets/img/flutterwave1.svg";
import flutterwave2 from "../../../assets/img/flutterwave2.svg";
import { UserContext } from "../../../mobx/UserState";

const publicKey = process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY;
const PayWithFlutter = observer(({ paymentDetails, paidSuccessfully }) => {
  const {
    user: { id },
  } = useContext(UserContext);
  const {
    amount,
    email: customer_email,
    phoneNumber: customer_phone,
  } = paymentDetails;
  const details = {
    txref: "rave-123456",
    customer_email,
    customer_phone,
    amount,
    PBFPubKey: publicKey,
    production: true,
  };

  const handlePayment = (e) => {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
  };

  const onSuccess = (reference) => {
    paidSuccessfully(
      reference.data?.data?.orderRef,
      "flutterwave",
      "Paid online",
      id
    );
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
        onClick={handlePayment}
      >
        <img src={flutterwave1} className="mr-1" alt="" />
        <img src={flutterwave2} alt="" />
      </button>
    </div>
  );
});

export { PayWithFlutter };
