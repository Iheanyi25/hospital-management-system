import React from "react";

function ConsultationTabHeader() {
  return (
    <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active"
          id="pills-active-tab"
          data-toggle="pill"
          href="#pills-active"
          role="tab"
          aria-controls="pills-active"
          aria-selected="true"
        >
          Patients Waiting
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-accepted-tab"
          data-toggle="pill"
          href="#pills-accepted"
          role="tab"
          aria-controls="pills-accepted"
          aria-selected="false"
        >
          Patients Attended
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-completed-tab"
          data-toggle="pill"
          href="#pills-completed"
          role="tab"
          aria-controls="pills-completed"
          aria-selected="false"
        >
          All Patients
        </a>
      </li>
    </ul>
  );
}

export { ConsultationTabHeader }