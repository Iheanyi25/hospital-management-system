import React, { useContext } from "react";
import paystack1 from "../../../assets/img/paystack-icon1.svg";
import paystack2 from "../../../assets/img/paystack-icon2.svg";
import { usePaystackPayment } from "react-paystack";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";

const PayWithPaystack = observer(({ paymentDetails, paidSuccessfully }) => {
  const {
    user: { id },
  } = useContext(UserContext);
  const { email, amount } = paymentDetails;
  const details = {
    email,
    amount: amount + "00",
    reference: new Date().getTime(),
    publicKey: "pk_test_497061cac95adf87f3030c4b986972429b3d153e",
  };

  const initializePayment = usePaystackPayment(details);

  const handlePayment = (e) => {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
  };
  const onSuccess = (reference) => {
    paidSuccessfully(reference.trxref, "online-paystack", "Paid online", id);
  };

  const onClose = () => {
    console.log("closed");
  };

  return (
    <div className="col-md-6 mb-2">
      <button
        className="btn btn-light btn-lg btn-block"
        onClick={handlePayment}
      >
        <img src={paystack1} className="mr-1" alt="" />
        <img src={paystack2} alt="" />
      </button>
    </div>
  );
});

export { PayWithPaystack };
