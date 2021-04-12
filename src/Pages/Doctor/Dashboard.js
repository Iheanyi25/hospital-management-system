import React, { useContext } from "react";
import { observer } from "mobx-react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getDoctorDashboardUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import DoctorDashboardHeader from "./doctor-dashboard-components/DoctorDashboardHeader";
import DoctorDashboardSummary from "./doctor-dashboard-components/DoctorDashboardSummary";
import { PatientsWaitingTableContainer } from "./consultation-components/tab-components";

const Dashboard = () => {
  const {
    user: { id, firstName, lastName },
  } = useContext(UserContext);

  const getDoctorDashboard = getDoctorDashboardUrl(id);
  const getDoctorDashboardConfig = fetchConfig({
    url: getDoctorDashboard,
    method: "get",
  });
  const { data, error } = useRequest(getDoctorDashboardConfig, {
    revalidateOnFocus: false,
  });
  if (error) return <div>failed to load</div>;
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <DoctorDashboardSummary allCounts={data || {}} />
            <DoctorDashboardHeader firstName={firstName} lastName={lastName} />
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title mb-0">Consultation List</h4>
            </header>
            <PatientsWaitingTableContainer doctorId={id} />
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(Dashboard);
