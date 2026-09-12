import React from "react";
import { Fragment } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import {
    getAppointmentCountsUrl,
  getPatientsAttentedToCountUrl,
  getPatientsOnOpenListCountUrl,
  getPatientsUnattentedToCountUrl,
} from "../../../api/URLs";

export const NurseDashboardSummary = () => {
  const patientsAttentedToCount = getPatientsAttentedToCountUrl();
  const getPatientsAttentedToCountConfig = fetchConfig({
    url: patientsAttentedToCount,
    method: "get",
  });
  const { data: patientAttendedTo } = useRequest(
    getPatientsAttentedToCountConfig,
    {
      revalidateOnFocus: false,
    }
  );

  const getPatientsUnattentedToCount = getPatientsUnattentedToCountUrl();
  const getgetPatientsUnattentedToCountConfig = fetchConfig({
    url: getPatientsUnattentedToCount,
    method: "get",
  });
  const { data: patientUnattendedTo } = useRequest(
    getgetPatientsUnattentedToCountConfig,
    {
      revalidateOnFocus: false,
    }
  );

  const getPatientsOnOpenListCount = getPatientsOnOpenListCountUrl();
  const getgetPatientsOnOpenListCountConfig = fetchConfig({
    url: getPatientsOnOpenListCount,
    method: "get",
  });
  const { data: patientOnOpenList } = useRequest(
    getgetPatientsOnOpenListCountConfig,
    {
      revalidateOnFocus: false,
    }
  );

  const getAppointmentCounts = getAppointmentCountsUrl();
  const getAppointmentCountsConfig = fetchConfig({
    url: getAppointmentCounts,
    method: "get",
  });
  const { data } = useRequest(getAppointmentCountsConfig, {
    revalidateOnFocus: false,
  });
  const summaryDetails = [
    {
      iconName: "icofont-wheelchair",
      text: "Pending Appointments",
      value: data?.pendingAppoinmentsCount,
    },
    {
      iconName: "icofont-blood",
      text: "Accepted Appointments",
      value: data?.acceptedAppointmentCount,
    },
    {
      iconName: "icofont-list",
      text: "Completed Appointments",
      value: data?.completedAppoinmentsCount,
    },
    {
      iconName: "icofont-list",
      text: "Rejected Appointments",
      value: data?.rejectedAppointmentCount,
    },
  ];
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
                  <h6 className="mt-0 mb-1">
                    Total Consultations On Open List
                  </h6>
                  <div className="count text-primary fs-20">
                    {patientOnOpenList?.consultationCount || 0}
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
                  <h6 className="mt-0 mb-1">Total Consultations Unattended</h6>
                  <div className="count text-primary fs-20">
                    {patientUnattendedTo?.consultationCount || 0}
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
                    Total Consultations Attended
                  </h6>
                  <div className="count text-primary fs-20">
                    {patientAttendedTo?.consultationCount || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {summaryDetails.map(({ iconName, text, value }) => (
          <div className="col col-12 col-md-6 col-xl-3">
            <div className="card animated fadeInUp delay-02s bg-light">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col col-5">
                    <div
                      className={`icon p-0 fs-48 text-primary opacity-50 ${iconName}`}
                    ></div>
                  </div>
                  <div className="col col-7">
                    <h6 className="mt-0 mb-1">{text}</h6>
                    <div className="count text-primary fs-20">{value}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
