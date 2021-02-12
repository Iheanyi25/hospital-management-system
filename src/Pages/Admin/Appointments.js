import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getDoctorAppointmentsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import AppointmentSummary from "./appointment-components/AppointmentSummary";
import AppointmentTabHeader from "./appointment-components/AppointmentTabHeader";
import AppointmentTabContent from "./appointment-components/AppointmentTabContent";

const Appointments = () => {
  const getDoctorAppointments = getDoctorAppointmentsUrl();
  const getDoctorAppointmentsUrlConfig = fetchConfig({
    url: getDoctorAppointments,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getDoctorAppointmentsUrlConfig, {
    revalidateOnFocus: false,
  });

  const acceptedAppointments = [];
  const activeAppointments = [];
  const pendingAppointments = [];
  const completedAppointments = [];
  const rejectedAppointments = [];

  if (data) {
    data.appointments.forEach((appointment) => {
      if (appointment.isActive) {
        activeAppointments.push(appointment);
      } else if (appointment.isAccepted) {
        acceptedAppointments.push(appointment);
      } else if (appointment.isCompleted) {
        completedAppointments.push(appointment);
      } else if (appointment.isRejected) {
        rejectedAppointments.push(appointment);
      } else {
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
          <AppointmentSummary
            pendingAppointmentsCount={pendingAppointments.length}
            acceptedAppointmentsCount={acceptedAppointments.length}
            completedAppointmentsCount={completedAppointments.length}
          />
          <header className="page-header">
            <h4 className="page-title"> Appointments List</h4>
          </header>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  {" "}
                  <AppointmentTabHeader />
                </div>
                {data && (
                  <AppointmentTabContent
                    pendingAppointments={pendingAppointments}
                    acceptedAppointments={acceptedAppointments}
                    completedAppointments={completedAppointments}
                    mutate={mutate}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Appointments;
