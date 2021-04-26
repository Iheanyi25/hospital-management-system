import React, { Fragment } from "react";
import { PageLoader } from "../../../Components";
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
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h3 className="page-title mb-5">Nursing report</h3>
            </header>
            <NursingReportTabHeader />
            <NursingReportTabContent />
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default UpdateNursingReport;
