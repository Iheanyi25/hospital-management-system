import React, { useEffect, useState } from "react";
import { PageLoader } from "../../../Components";
import {
  PayWithPaystack,
  PayWithFlutter,
} from "../PaymentGateways";

const PayOnline = ({ details, paidSuccessfully }) => {
  const [userDetails, setUserDetails] = useState({
    // invoiceId: "",
    amount: "",
    email: "",
    // serviceRequestId : [],
    // fundAccount: true
  });

  useEffect(() => {
    setUserDetails({
      ...userDetails,
      // invoiceId: details.invoiceId,
      email: details.email,
      amount: details.amount,
      // serviceRequestId: details.serviceRequestId
    });
  }, [details]);
  console.log(userDetails);
  return (
    <>
      <PageLoader />

      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5 needs-validation" noValidate>
                      <h5 className="text-center">
                        Select your prefered payment method
                      </h5>
                      <div className="m-auto mt-2">
                        <div className="row">
                          <PayWithPaystack paymentDetails={userDetails} paidSuccessfully={paidSuccessfully}/>
                          <PayWithFlutter paymentDetails={userDetails} paidSuccessfully={paidSuccessfully}/>
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
