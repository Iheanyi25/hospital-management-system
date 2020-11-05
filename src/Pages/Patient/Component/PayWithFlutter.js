import React from "react";
import flutterwave1 from "../../../assets/img/flutterwave1.svg";
import flutterwave2 from "../../../assets/img/flutterwave2.svg";

const PayWithFlutter = () => {
  return (
    <div className="col-md-6">
      <button
        className="btn btn-light btn-lg btn-block"
        name="modeOfPayment"
        value="flutter"
        onClick={(e) => {
          this.payWithFlutter(e);
        }}
      >
        <img src={flutterwave1} className="mr-1" alt="" />
        <img src={flutterwave2} alt="" />
      </button>
    </div>
  );
};

export { PayWithFlutter };
