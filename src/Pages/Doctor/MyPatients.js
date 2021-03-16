import React, { useContext } from "react";
import { PageLoader } from "../../Components";
import { getMyPatients } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { observer } from "mobx-react";
import DoctorPatientSummary from "./doctor-patient-components/DoctorPatientSummary";
import DoctorPatientList from "./doctor-patient-components/DoctorPatientList";
import { useRequest } from "../../api/fetcher";
import { UserContext } from "../../mobx/UserState";

const MyPatients = () => {
 const { user : { id }} = useContext(UserContext)
  const myPatients = getMyPatients(id);
  const getPatientAllAppointmentsConfig = fetchConfig({
    url: myPatients,
    method: "get",
  });
  const { data } = useRequest(getPatientAllAppointmentsConfig, {
    revalidateOnFocus: false,
  });

  console.log(data,9999)
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
          <DoctorPatientList patients={data?.patients} headerText="My Patients" />
        </div>
        </div>
      </main>
    </>
  );
};

export default observer(MyPatients);
