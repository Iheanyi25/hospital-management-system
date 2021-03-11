import React from "react";
import ConsultationsOnOpenList from "./ConsultationsOnOpenList";
import ConsultationTableContainer from "./ConsultationTableContainer";

export default function ConsultationTabContent({
  patientsAttendedTo,
  patientsOnOpenList,
  patientsAttachedToDoctors,
  mutate,
}) {
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-active"
          role="tabpanel"
          aria-labelledby="pills-active-tab"
        >
          <ConsultationsOnOpenList />
        </div>

        <div
          className="tab-pane fade"
          id="pills-accepted"
          role="tabpanel"
          aria-labelledby="pills-accepted-tab"
        >
          <ConsultationTableContainer
            consultations={patientsAttachedToDoctors}
            category="attachedToDoctors"
            mutate={mutate}
          />
        </div>

        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          <ConsultationTableContainer
            consultations={patientsAttendedTo}
            category="attendedPatients"
            mutate={mutate}
          />
        </div>
      </div>
    </div>
  );
}
