import { observer } from "mobx-react";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorAllAppointmentsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import {
  AppointmentSummary,
  AppointmentTabContent,
  AppointmentTabHeader,
} from "./appointment-components";

const Appointments = observer(() => {
  const [appointments, setAppointments] = useState({
    acceptedAppointments: [],
    pendingAppointments: [],
    completedAppointments: [],
  });
  const {
    user: { id },
  } = useContext(UserContext);
  const fetchAppointments = useCallback(async () => {
    const getDoctorAllAppointments = getDoctorAllAppointmentsUrl(id);
    const getDoctorAllAppointmentsConfig = fetchConfig({
      url: getDoctorAllAppointments,
      method: "get",
    });
    const { data, status } = await fetchWrapper(getDoctorAllAppointmentsConfig);
    if (status === 200) {
      filterAppointments(data?.appointments);
    }
    console.log(data);
  }, [id]);
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const filterAppointments = (appointments) => {
    setAppointments({
      acceptedAppointments: appointments.filter(
        (appointment) => appointment.isAccepted === true
      ),
      pendingAppointments: appointments.filter(
        (appointment) => appointment.isPending === true
      ),
      completedAppointments: appointments.filter(
        (appointment) => appointment.isCompleted === true
      ),
    });
  };

  const {
    acceptedAppointments,
    pendingAppointments,
    completedAppointments,
  } = appointments;

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
                  <AppointmentTabContent
                    acceptedAppointments={acceptedAppointments}
                    pendingAppointments={pendingAppointments}
                    completedAppointments={completedAppointments}
                    getDoctorAppointments={fetchAppointments}
                  />
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
