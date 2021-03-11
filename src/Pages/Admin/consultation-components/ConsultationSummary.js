import React, { Fragment } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getPatientsAttentedToCountUrl } from "../../../api/URLs";

export default function ConsultationSummary({
  patientsAttachedToDoctorsCount,
  patientsOnOpenListCount,
}) {
  const patientsAttentedToCount = getPatientsAttentedToCountUrl();
  const getPatientsAttentedToCountConfig = fetchConfig({
    url: patientsAttentedToCount,
    method: "get",
  });
  const { data } = useRequest(getPatientsAttentedToCountConfig, {
    revalidateOnFocus: false,
  });
  return (
    <Fragment>
      <div className="row">
        <div className="col col-12 col-md-6 col-xl-4">
          <div className="card animated fadeInUp delay-02s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-3">
                  <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                </div>
                <div className="col col-9">
                  <h6 className="mt-0 mb-1">Total Patient On Open List</h6>
                  <div className="count text-primary fs-20">
                    {patientsOnOpenListCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-6 col-xl-4">
          <div className="card animated fadeInUp delay-03s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-3">
                  <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                </div>
                <div className="col col-9">
                  <h6 className="mt-0 mb-1">Total Patients Unattended</h6>
                  <div className="count text-primary fs-20">
                    {patientsAttachedToDoctorsCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col col-12 col-md-12 col-xl-4">
          <div className="card animated fadeInUp delay-04s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-3">
                  <div className="icon p-0 fs-48 text-primary opacity-50 icofont-list"></div>
                </div>
                <div className="col col-9">
                  <h6 className="mt-0 mb-1 text-nowrap">
                    Total Patients Attended
                  </h6>
                  <div className="count text-primary fs-20">
                    {data?.consultationCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
