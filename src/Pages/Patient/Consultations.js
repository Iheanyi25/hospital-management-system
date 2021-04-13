import React, { useContext } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getPatientAllConsulationsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import PatientConsultationTabContent from "./patient-consultation-components/PatientConsultationTabContent";
import PatientConsultationSummary from "./patient-consultation-components/PatientConsultationSummary";
import PatientConsultationTabHeader from "./patient-consultation-components/PatientConsultationTabHeader";

const Consultations = () => {
  const {
    user: { id },
  } = useContext(UserContext);
  const getPatientAllConsulations = getPatientAllConsulationsUrl(id);
  const getPatientAllConsulationsConfig = fetchConfig({
    url: getPatientAllConsulations,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getPatientAllConsulationsConfig, {
    revalidateOnFocus: false,
  });

  const cancelledConsultations = [];
  const completedConsultations = [];
  const pendingConsultations = [];

  if (data) {
    data.patientConsultations.forEach((patientConsultations) => {
      if (patientConsultations.isCanceled === true) {
        cancelledConsultations.push(patientConsultations);
      } else if (patientConsultations.isCompleted === true) {
        completedConsultations.push(patientConsultations);
      } else {
        pendingConsultations.push(patientConsultations);
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
          <PatientConsultationSummary
            pendingConsultationsCount={pendingConsultations.length}
            finalizedConsultationsCount={completedConsultations.length}
            cancelledConsultationsCount={cancelledConsultations.length}
          />
          <header className="page-header">
            <h4 className="page-title">My Consultations</h4>
          </header>
          <div className="page-content">
            <div className="card-body"></div>
          </div>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  <PatientConsultationTabHeader />
                  {data && (
                    <PatientConsultationTabContent
                      patientId={id}
                      pendingConsultations={pendingConsultations}
                      completedConsultations={completedConsultations}
                      cancelledConsultations={cancelledConsultations}
                      mutate={mutate}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(Consultations);
