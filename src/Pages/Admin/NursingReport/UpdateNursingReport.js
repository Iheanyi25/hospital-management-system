import React, { Fragment } from "react";
import { PageLoader } from "../../../Components";
import { ShiftSelectionForm } from "./nursing-report-components/forms";
import NursingReportTabContent from "./nursing-report-components/NursingReportTabContent";
import NursingReportTabHeader from "./nursing-report-components/NursingReportTabHeader";

const UpdateNursingReport = () => {
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <div className="row mx-0">
              <div className="col-12 col-md-6">
                <header className="page-header justify-content-between d-flex align-items-center mb-2">
                  <h3 className="page-title mb-5">Nursing report</h3>
                </header>
                <ShiftSelectionForm />
                <NursingReportTabHeader />
                <NursingReportTabContent />
              </div>
              <div className="col-12 col-md-6"></div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default UpdateNursingReport;
