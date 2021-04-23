import React from "react";

export default function NursingReportTabHeader() {
  return (
    <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active show"
          id="pills-nursing-report-tab"
          data-toggle="pill"
          href="#pills-nursing-report"
          role="tab"
          aria-controls="pills-nursing-report"
          aria-selected="false"
        >
          Nursing report
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-nanda-tab"
          data-toggle="pill"
          href="#pills-nanda"
          role="tab"
          aria-controls="pills-nanda"
          aria-selected="false"
        >
          NANDA
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-daily-report-tab"
          data-toggle="pill"
          href="#pills-daily-report"
          role="tab"
          aria-controls="pills-daily-report"
          aria-selected="false"
        >
          Daily report
        </a>
      </li>
    </ul>
  );
}
