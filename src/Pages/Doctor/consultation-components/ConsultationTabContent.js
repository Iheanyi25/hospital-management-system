import React from "react";

import {
  PatientsAttendedTableContainer,
  PatientsWaitingTableContainer,
} from "./tab-components";

function ConsultationTabContent({
  patientsWaiting,
  patientsAttendedTo,
}) {
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane show fade active"
          id="pills-active"
          role="tabpanel"
          aria-labelledby="pills-active-tab"
        >
          <PatientsWaitingTableContainer
            patientsWaiting={patientsWaiting}
            category="waitingList"
          />
        </div>
        <div
          className="tab-pane fade"
          id="pills-accepted"
          role="tabpanel"
          aria-labelledby="pills-accepted-tab"
        >
          <PatientsAttendedTableContainer
            patientsAttendedTo={patientsAttendedTo}
            category="attendedList"
          />
        </div>
      </div>
    </div>
  );
}

export { ConsultationTabContent };
