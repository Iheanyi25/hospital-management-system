import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import {  useRequest } from "../../api/fetcher";
import {
  getPatientConsultationsUrl
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import ConsultationSummary from "./consultation-components/ConsultationSummary";
import ConsultationTabContent from "./consultation-components/ConsultationTabContent";
import ConsultationTabHeader from "./consultation-components/ConsultationTabHeader";

const Consultations = () => { 
  const getPatientConsultations = getPatientConsultationsUrl();
  const getPatientConsultationsConfig = fetchConfig({
    url: getPatientConsultations,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getPatientConsultationsConfig, {
    revalidateOnFocus: false,
  });

  const patientsOnOpenList  = [];
  const patientsAttachedToDoctors = [];
  const patientsAttendedTo = [];

  if (data) {
    data.consultations.forEach((consultation) => {
      if (consultation.isCompleted === true) {
        patientsAttendedTo.push(consultation);
      } else if (!consultation.doctorId) {
        patientsOnOpenList.push(consultation);
      } else if (consultation.doctorId) {
        patientsAttachedToDoctors.push(consultation);
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
            <ConsultationSummary
              patientsOnOpenListCount={patientsOnOpenList.length}
              patientsAttachedToDoctorsCount={patientsAttachedToDoctors.length}
              patientsAttendedToCount={patientsAttendedTo.length}
            />
          <header className="page-header">
            <h4 className="page-title"> Consultation List</h4>
          </header>
          <div className="page-content">
            <div className="card-body"></div>
          </div>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  {" "}
                  <ConsultationTabHeader />
                </div>
                {data && (
                  <ConsultationTabContent
                    patientsAttendedTo={patientsAttendedTo}
                    patientsOnOpenList={patientsOnOpenList}
                    patientsAttachedToDoctors={patientsAttachedToDoctors}
                    mutate={mutate}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Consultations;

