import React from "react";

export default function PharmacyDashboardSummary({drugCount, prescriptionsCount}) {
  return (
    <div className="row">
      <div className="col col-12 col-md-6 col-xl-3">
        <div className="card animated fadeInUp delay-01s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1">Number of Drugs</h6>
                <div className="count text-primary fs-20">{drugCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-12 col-md-6 col-xl-3">
        <div className="card animated fadeInUp delay-02s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1">Recent Prescriptions</h6>
                <div className="count text-primary fs-20">
                  {prescriptionsCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
