import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import {
  getCompletedConsultationsCountUrl,
  getPendingConsultationsCountUrl,
  getCanceledConsultationsCountUrl,
} from "../../../api/URLs";

export default function PatientConsultationSummary() {
  const getCompletedConsultationsCount = getCompletedConsultationsCountUrl();
  const getCompletedConsultationsCountConfig = fetchConfig({
    url: getCompletedConsultationsCount,
    method: "get",
  });
  const { data: data1 } = useRequest(getCompletedConsultationsCountConfig, {
    revalidateOnFocus: false,
  });
  const getPendingConsultationsCount = getPendingConsultationsCountUrl();
  const getPendingConsultationsCountConfig = fetchConfig({
    url: getPendingConsultationsCount,
    method: "get",
  });
  const { data: data2 } = useRequest(getPendingConsultationsCountConfig, {
    revalidateOnFocus: false,
  });
  const getCanceledConsultationsCoun = getCanceledConsultationsCountUrl();
  const getCanceledConsultationsCounConfig = fetchConfig({
    url: getCanceledConsultationsCoun,
    method: "get",
  });
  const { data: data3 } = useRequest(getCanceledConsultationsCounConfig, {
    revalidateOnFocus: false,
  });
  const summaryDetails = [
    {
      iconName: "icofont-wheelchair",
      text: "Pending Appointments",
      value: data2?.consultationCount,
    },
    {
      iconName: "icofont-blood",
      text: "Finalized Appointments",
      value: data1?.consultationCount,
    },
    {
      iconName: "icofont-list",
      text: "Cancelled Appointments",
      value: data3?.consultationCount,
    },
  ];
  return (
    <div className="row">
      {summaryDetails.map(({ iconName, text, value }) => (
        <div className="col col-12 col-md-6 col-xl-4">
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
