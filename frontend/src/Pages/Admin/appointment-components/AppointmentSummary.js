import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getAppointmentCountsUrl } from "../../../api/URLs";

export default function AppointmentSummary() {
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
  );
}
