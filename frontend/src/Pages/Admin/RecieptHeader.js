import React from "react";
import formatDate from "../../utils/formatDate";

function ReceiptHeader({ invoiceNumber }) {
  return (
    <div className="bg-light p-5">
      <div className="container">
        <div className="row align-items-baseline">
          <div className="col">
            <div className="logo-wrap">
              <img
                src="../../assets/img/logo.svg"
                width={147}
                height={33}
                className="logo-img"
                alt="Hello"
              />
            </div>
          </div>
          <div className="col">
            <h3>Invoice</h3>
            <h6 className="mb-0">Invoice number:</h6>
            <p>{invoiceNumber ?? "N/A"}</p>
            <h6 className="mb-0">Date: </h6>
            <p className="">{formatDate(Date.now())}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReceiptHeader;
