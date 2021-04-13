import React, { useContext } from "react";
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

  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <PatientConsultationSummary patientId={id} />
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
                  <PatientConsultationTabContent patientId={id} />
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
