import React from "react";
import {
  getPatientPendingAppointmentsUrl,
  getPatientCompletedAppointmentsUrl,
  getPatientCancelledAppointmentsUrl,
} from "../../../api/URLs";
import PatientAppointmentTableContainer from "./PatientAppointmentTableContainer";

export default function PatientAppointmentTabContent() {
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-pending"
          role="tabpanel"
          aria-labelledby="pills-pending-tab"
        >
          <PatientAppointmentTableContainer
            url={getPatientPendingAppointmentsUrl}
            category="pending"
          />
        </div>

        <div
           className="tab-pane fade"
           id="pills-completed"
           role="tabpanel"
           aria-labelledby="pills-completed-tab"
        >
          <PatientAppointmentTableContainer
            url={getPatientCompletedAppointmentsUrl}
            category="completed"
          />
        </div>

        <div
            className="tab-pane fade"
            id="pills-cancelled"
            role="tabpanel"
            aria-labelledby="pills-cancelled-tab"
        >
          <PatientAppointmentTableContainer
            url={getPatientCancelledAppointmentsUrl}
            category="cancelled"
          />
        </div>
      </div>
    </div>
  );
}
