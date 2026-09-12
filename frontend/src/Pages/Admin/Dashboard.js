import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import {
  getDoctorAppointmentsUrl,
  getPatientConsultationsUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import AdminDashboardSummary from "./dashboard-components/AdminDashboardSummary";
import DashboardAppointmentList from "./dashboard-components/DashboardAppointmentList";
import DashboardConsultationList from "./dashboard-components/DashboardConsultationList";

const Dashboard = () => {
  const getPatientConsultations = getPatientConsultationsUrl();
  const getPatientConsultationsConfig = fetchConfig({
    url: getPatientConsultations,
    method: "get",
  });
  const { data: data1 } = useRequest(getPatientConsultationsConfig, {
    revalidateOnFocus: false,
  });

  const getDoctorAppointments = getDoctorAppointmentsUrl();
  const getDoctorAppointmentsConfig = fetchConfig({
    url: getDoctorAppointments,
    method: "get",
  });
  const { data: data2 } = useRequest(getDoctorAppointmentsConfig, {
    revalidateOnFocus: false,
  });

  return (
    <>
      <PageLoader />

      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <AdminDashboardSummary />
            <div className="row">
              {data1 && (
                <DashboardConsultationList
                  consultations={data1?.consultations || []}
                />
              )}
              {data2 && (
                <DashboardAppointmentList
                  appointments={data2?.appointments || []}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
