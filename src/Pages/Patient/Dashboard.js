import React, { useContext } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import {
  getPatientDashboardUrl,
  getPatientPendingAppointmentsUrl
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import PatientDashboardSummary from "./patient-dashboard-components/PatientDashboardSummary";
import PatientDahboardHeader from "./patient-dashboard-components/PatientDahboardHeader";
import PatientDashboardAppointmentList from "./patient-dashboard-components/PatientDashboardAppointmentList";

const Dashboard = () => {
  const {
    user: { id, firstName, lastName },
  } = useContext(UserContext);
  const getPatientAllAppointments = getPatientPendingAppointmentsUrl(id);
  const getPatientAllAppointmentsConfig = fetchConfig({
    url: getPatientAllAppointments,
    method: "get",
  });
  const { data, error1, mutate } = useRequest(getPatientAllAppointmentsConfig, {
    revalidateOnFocus: false,
  });

  const getPatientAllCounts = getPatientDashboardUrl(id);
  const getPatientAllCountsConfig = fetchConfig({
    url: getPatientAllCounts,
    method: "get",
  });
  const { data: allCounts, error2 } = useRequest(getPatientAllCountsConfig, {
    revalidateOnFocus: false,
  });

  if (error1 && error2) return <div>failed to load</div>;
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <PatientDashboardSummary
              allCounts={allCounts || {}}
            />
            <PatientDahboardHeader firstName={firstName} lastName={lastName} />
            {data && (
              <PatientDashboardAppointmentList
                pendingAppointments={data?.appointments}
                mutate={mutate}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(Dashboard);
