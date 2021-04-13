import { observer } from "mobx-react";
import React, { useContext } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getDoctorAllAppointmentsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import {
  AppointmentSummary,
  AppointmentTabContent,
  AppointmentTabHeader,
} from "./appointment-components";

const Appointments = observer(({doctorId}) => {
  const {
    user: { id },
  } = useContext(UserContext);

  //if there is props called doctorId, it means its coming from admin
  const getDoctorAllAppointments = getDoctorAllAppointmentsUrl(doctorId || id);
  const getDoctorAllAppointmentsConfig = fetchConfig({
    url: getDoctorAllAppointments,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getDoctorAllAppointmentsConfig, {
    revalidateOnFocus: false,
  });

  const acceptedAppointments = [];
  const pendingAppointments = [];
  const completedAppointments = [];

  if (data) {
    data.appointments.forEach((appointment) => {
      if (appointment.isPending) {
        pendingAppointments.push(appointment);
      } else if (appointment.isAccepted) {
        acceptedAppointments.push(appointment);
      } else if (appointment.isCompleted) {
        completedAppointments.push(appointment);
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
            <div className="card-body"></div>
          </div>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  <AppointmentTabHeader />
                  {data && <AppointmentTabContent
                    acceptedAppointments={acceptedAppointments}
                    pendingAppointments={pendingAppointments}
                    completedAppointments={completedAppointments}
                    mutate={mutate}
                    doctorId={doctorId || id}
                  />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
});

export default Appointments;
