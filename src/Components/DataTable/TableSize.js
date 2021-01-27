import React from "react";

export default function TableSize({ heading, size, icon }) {
  return (
    // <div className="row">
      <div className="col col-12 col-md-6 col-xl-4">
        <div className="card animated fadeInUp delay-02s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className={`icon p-0 fs-48 text-primary opacity-50 ${icon || "icofont-wheelchair"}`}></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1">{heading}</h6>
                <div className="count text-primary fs-20">{size}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
}
