import React from "react";
import { PageLoader } from "../../Components";
import ConsultationSummary from "./consultation-components/ConsultationSummary";
import ConsultationTabContent from "./consultation-components/ConsultationTabContent";
import ConsultationTabHeader from "./consultation-components/ConsultationTabHeader";

const Consultations = () => {
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <ConsultationSummary />
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
                  <ConsultationTabHeader />
                </div>
                <ConsultationTabContent />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Consultations;
