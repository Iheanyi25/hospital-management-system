import React from "react";
import { DailyReport, NursingReportForm } from "./forms";

export default function NursingReportTabContent() {
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane show fade active"
          id="pills-nursing-report"
          role="tabpanel"
          aria-labelledby="pills-nursing-report-tab"
        >
          <NursingReportForm />
        </div>

        <div
          className="tab-pane fade"
          id="pills-nanda"
          role="tabpanel"
          aria-labelledby="pills-nanda-tab"
        >
          NANDA
        </div>

        <div
          className="tab-pane fade"
          id="pills-daily-report"
          role="tabpanel"
          aria-labelledby="pills-daily-report-tab"
        >
          <DailyReport />
        </div>
      </div>
    </div>
  );
}
