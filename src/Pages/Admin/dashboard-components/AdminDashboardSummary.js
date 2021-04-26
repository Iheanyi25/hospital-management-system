import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getAdminDashboardUrl } from "../../../api/URLs";

export default function AdminDashboardSummary() {
  const getAdminDashboard = getAdminDashboardUrl();
  const getAdminDashboardConfig = fetchConfig({
    url: getAdminDashboard,
    method: "get",
  });

  const { data: systemCount } = useRequest(getAdminDashboardConfig, {
    revalidateOnFocus: false,
  });
  return (
    <div className="row">
      <div className="col col-12 col-md-6 col-xl-3">
        <div className="card animated fadeInUp delay-01s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-doctor"></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1">Doctors</h6>
                <div className="count text-primary fs-20">
                  {systemCount?.doctorCount}
                </div>
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
                <h6 className="mt-0 mb-1">Patients</h6>
                <div className="count text-primary fs-20">
                  {systemCount?.patientCount}
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
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-clip-board" />
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1">Appointments</h6>
                <div className="count text-primary fs-20">
                  {systemCount?.pendingAppoinmentsCount}
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
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-users"></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1 text-nowrap">Users</h6>
                <div className="count text-primary fs-20">
                  {systemCount?.userCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-12 col-md-6 col-xl-6">
        <div className="card animated fadeInUp delay-04s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-search-user"></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1 text-nowrap">Service Requests</h6>
                <div className="count text-primary fs-20">
                  {systemCount?.serviceRequestCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-12 col-md-6 col-xl-6">
        <div className="card animated fadeInUp delay-04s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-pills"></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1 text-nowrap">Drugs</h6>
                <div className="count text-primary fs-20">
                  {systemCount?.drugCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
