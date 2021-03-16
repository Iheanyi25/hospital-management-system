import React from "react";

export default function LabDashboardSummary({
  service,
  serviceCategory,
  uncompletedServiceRequest,
  completedServiceRequest,
}) {
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
                <h6 className="mt-0 mb-1">Services</h6>
                <div className="count text-primary fs-20">{service}</div>
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
                <h6 className="mt-0 mb-1">Service Category</h6>
                <div className="count text-primary fs-20">
                  {serviceCategory}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-12 col-md-6 col-xl-3">
        <div className="card animated fadeInUp delay-03s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1">Pending Service Request</h6>
                <div className="count text-primary fs-20">
                  {uncompletedServiceRequest}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-12 col-md-6 col-xl-3">
        <div className="card animated fadeInUp delay-04s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-list"></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1">Completed Service Request</h6>
                <div className="count text-primary fs-20">
                  {completedServiceRequest}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
