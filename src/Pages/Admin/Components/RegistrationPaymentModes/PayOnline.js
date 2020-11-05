import React, { useState, useEffect } from "react";
import {
  PayWithPaystack,
  PayWithFlutter,
} from "../../../../Components/Payment";

const PayOnline = () => {
  const [user, setUser] = useState({
    userId: "",
    amount: 5000,
    email: "",
  });

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("authenticatedUser"));
    console.log("userDetails", user);
    setUser({ ...user, userId: user.id, email: user.email });
  }, []);
  return (
    <div className="table-responsive">
      <div className="main-content-wrap w-50">
        <div className="page-content">
          <div className="row justify-content-center">
            <div className="col col-md-12">
              <div className="card border-light">
                <div className="card-body mb-5">
                  <h4 className="text-center mt-5">
                    Select your prefered payment method
                  </h4>
                  <div className="m-auto">
                    <div className="row">
                      <PayWithPaystack paymentDetails={user} />
                      <PayWithFlutter paymentDetails={user} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PayOnline };
