import React from "react";
import {
  CanceledConsultation,
  CompletedConsultation,
  PendingConsultations,
} from "./tab-components";

export default function PatientConsultationTabContent({ patientId }) {
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-pending"
          role="tabpanel"
          aria-labelledby="pills-pending-tab"
        >
          <PendingConsultations patientId={patientId} />
        </div>

        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          <CompletedConsultation patientId={patientId} />
        </div>

        <div
          className="tab-pane fade"
          id="pills-cancelled"
          role="tabpanel"
          aria-labelledby="pills-cancelled-tab"
        >
          <CanceledConsultation patientId={patientId} />
        </div>
      </div>
    </div>
  );
}
