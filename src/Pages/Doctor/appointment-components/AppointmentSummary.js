import React from "react";
import { Fragment } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getDoctorDashboardUrl } from "../../../api/URLs";

function AppointmentSummary({ doctorId }) {
  const getDoctorDashboard = getDoctorDashboardUrl(doctorId);
  const getDoctorDashboardConfig = fetchConfig({
    url: getDoctorDashboard,
    method: "get",
  });
  const { data } = useRequest(getDoctorDashboardConfig, {
    revalidateOnFocus: false,
  });
  return (
    <Fragment>
      <div className="row">
        <div className="col col-12 col-md-6 col-xl-3">
          <div className="card animated fadeInUp delay-02s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-5">
                  <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                </div>
                <div className="col col-7">
                  <h6 className="mt-0 mb-1">Pending Appointments</h6>
                  <div className="count text-primary fs-20">
                    {data?.pendingAppoinmentsCount}
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
                  <h6 className="mt-0 mb-1">Accepted Appointments</h6>
                  <div className="count text-primary fs-20">
                    {data?.acceptedAppointmentsCount}
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
                  <h6 className="mt-0 mb-1">Completed Appointments</h6>
                  <div className="count text-primary fs-20">
                    {data?.completedAppoinmentsCount}
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
                  <h6 className="mt-0 mb-1">Rejected Appointments</h6>
                  <div className="count text-primary fs-20">{data?.rejetecdAppointmentCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { AppointmentSummary };
