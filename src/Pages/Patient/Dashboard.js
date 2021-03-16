import React, { useContext } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import {
  getPatientAllAppointmentsUrl
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
  const getPatientAllAppointments = getPatientAllAppointmentsUrl(id);
  const getPatientAllAppointmentsConfig = fetchConfig({
    url: getPatientAllAppointments,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getPatientAllAppointmentsConfig, {
    revalidateOnFocus: false,
  });
  const pendingAppointments = [];
  if (data) {
    data.appointments.forEach((appointment) => {
      if (appointment.isPending) {
        pendingAppointments.push(appointment);
      }
    });
  }

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
            <PatientDashboardSummary
              pendingAppointmentsCount={pendingAppointments.length}
            />
            <PatientDahboardHeader firstName={firstName} lastName={lastName} />
            {data && (
              <PatientDashboardAppointmentList
                pendingAppointments={pendingAppointments}
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
