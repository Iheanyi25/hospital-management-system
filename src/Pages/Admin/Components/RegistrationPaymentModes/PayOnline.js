import React from "react";
import paystack1 from "../../../../assets/img/paystack-icon1.svg";
import paystack2 from "../../../../assets/img/paystack-icon2.svg";
import flutterwave1 from "../../../../assets/img/flutterwave1.svg";
import flutterwave2 from "../../../../assets/img/flutterwave2.svg";

const PayOnline = () => {
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
                    <div className="w-75 m-auto d-flex justify-content-between">
                      <button className="btn btn-light btn-lg">
                        <img src={paystack1} className="mr-1" alt="" />
                        <img src={paystack2} alt="" />
                      </button>
                      <button className="btn btn-light btn-lg">
                        <img src={flutterwave1} className="mr-1" alt="" />
                        <img src={flutterwave2} alt="" />
                      </button>
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
