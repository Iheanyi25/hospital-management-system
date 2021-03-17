import React from "react";
import AppointmentsAccepted from "./AppointmentsAccepted";
import AppointmentsCompleted from "./AppointmentsCompleted";
import AppointmentsPending from "./AppointmentsPending";

export default function AppointmentTabContent() {
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane show fade active"
          id="pills-pending"
          role="tabpanel"
          aria-labelledby="pills-pending-tab"
        >
          <AppointmentsPending />
        </div>

        <div
          className="tab-pane fade"
          id="pills-accepted"
          role="tabpanel"
          aria-labelledby="pills-accepted-tab"
        >
          <AppointmentsAccepted />
        </div>

        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          <AppointmentsCompleted />
        </div>
      </div>
    </div>
  );
}
