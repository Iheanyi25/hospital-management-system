import React from "react";
import {
  AcceptedAppointmentsTableContainer,
  CompletedAppointmentsTableContainer,
  PendingAppointmentsTableContainer,
} from "./tab-components";

const AppointmentTabContent = ({
  acceptedAppointments,
  pendingAppointments,
  completedAppointments,
  mutate,
}) => {

  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane show fade active"
          id="pills-pending"
          role="tabpanel"
          aria-labelledby="pills-pending-tab"
        >
          <PendingAppointmentsTableContainer
            pendingAppointments={pendingAppointments}
            mutate={mutate}
            category="pendingList"
          />
        </div>
        <div
          className="tab-pane fade"
          id="pills-accepted"
          role="tabpanel"
          aria-labelledby="pills-accepted-tab"
        >
          <AcceptedAppointmentsTableContainer
            acceptedAppointments={acceptedAppointments}
            category="acceptedList"
          />
        </div>
        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          <CompletedAppointmentsTableContainer
            completedAppointments={completedAppointments}
            category="completedList"
          />
        </div>
      </div>
    </div>
  );
};

export { AppointmentTabContent };
