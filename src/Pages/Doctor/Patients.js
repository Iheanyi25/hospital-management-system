import React from "react";
import { PageLoader } from "../../Components";
import { getPatientsUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import DoctorPatientSummary from "./doctor-patient-components/DoctorPatientSummary";
import DoctorPatientList from "./doctor-patient-components/DoctorPatientList";
import { useRequest } from "../../api/fetcher";

const Patients = () => {
  const getPatients = getPatientsUrl();
  const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
  const { data } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });

  return (
    <>
      <PageLoader />

      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="page-content">
          <div className="main-content-wrap">
            <DoctorPatientSummary patientCount={data?.patients?.length || 0} />
            <DoctorPatientList
              patients={data?.patients}
              headerText="Our Patients"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Patients;
