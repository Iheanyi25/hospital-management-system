import React, { useContext }  from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import {
  getPatientDashboardUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import PatientAppointmentSummary from "./patient-appointments-components/PatientAppointmentSummary";
import PatientAppointmentTabHeader from "./patient-appointments-components/PatientAppointmentTabHeader";
// import PatientAppointmentTabContent from "./patient-appointments-components/PatientAppointmentTabContent";

const Appointments = () => {
 const {user: { id }} = useContext(UserContext)
  const getPatientAllCounts = getPatientDashboardUrl(id);
  const getPatientAllCountsConfig = fetchConfig({
    url: getPatientAllCounts,
    method: "get",
  });
  const { data: allCounts, error } = useRequest(getPatientAllCountsConfig, {
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
          <PatientAppointmentSummary
            allCounts={allCounts || {}}
          />
          <header className="page-header">
            <h4 className="page-title"> Appointments</h4>
          </header>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  {" "}
                  <PatientAppointmentTabHeader />
                </div>
                  {/* <PatientAppointmentTabContent
                    pendingAppointments={pendingAppointments}
                    acceptedAppointments={acceptedAppointments}
                    completedAppointments={completedAppointments}
                    mutate={mutate}
                  /> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default observer(Appointments);

