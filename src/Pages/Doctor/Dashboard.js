import React, { useContext } from "react";
import { observer } from "mobx-react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import {
  getDoctorPendingConsultationsUrl,
  getDoctorDashboardUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import DoctorDashboardHeader from "./doctor-dashboard-components/DoctorDashboardHeader";
import DoctorDashboardSummary from "./doctor-dashboard-components/DoctorDashboardSummary";
import DoctorDashboardConsultationList from "./doctor-dashboard-components/DoctorDashboardConsultationList";

const Dashboard = () => {
  const {
    user: { id, firstName, lastName },
  } = useContext(UserContext);

  const getDoctorPendingConsultations = getDoctorPendingConsultationsUrl(id);
  const getDoctorPendingConsultationsConfig = fetchConfig({
    url: getDoctorPendingConsultations,
    method: "get",
  });
  const { data, error1 } = useRequest(getDoctorPendingConsultationsConfig);

  const getDoctorDashboard = getDoctorDashboardUrl(id);
  const getDoctorDashboardConfig = fetchConfig({
    url: getDoctorDashboard,
    method: "get",
  });
  const { data: allCounts, error2 } = useRequest(getDoctorDashboardConfig, {
    revalidateOnFocus: false,
  });
console.log(data?.consultations,11111)
if (error1 && error2) return <div>An error occurred</div>;
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <DoctorDashboardSummary allCounts={allCounts || {}} />
            <DoctorDashboardHeader firstName={firstName} lastName={lastName} />
            {data && (
              <DoctorDashboardConsultationList
                pendingConsultations={data?.consultations}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(Dashboard);
