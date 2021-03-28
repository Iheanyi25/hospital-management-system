import React from "react";
import SurgicalOperationNoteOne from "./SurgicalOperationNoteOne";
import SurgicalOperationNoteTwo from "./SurgicalOperationNoteTwo";
import SurgicalOperationsProcedure from "./SurgicalOperationsProcedure";

export default function SurgicalOperationTabContent({ surgeryId }) {
  return (
    <div>
      <div className="tab-content" id="operations-tabContent">
        <div
          className="tab-pane show fade active"
          id="operations-note"
          role="tabpanel"
          aria-labelledby="operations-note-tab"
        >
          <SurgicalOperationNoteOne surgeryId={surgeryId} />
        </div>

        <div
          className="tab-pane fade"
          id="operations-notetwo"
          role="tabpanel"
          aria-labelledby="operations-notetwo-tab"
        >
          <SurgicalOperationNoteTwo surgeryId={surgeryId} />
        </div>

        <div
          className="tab-pane fade"
          id="operations-procedure"
          role="tabpanel"
          aria-labelledby="operations-procedure-tab"
        >
          <SurgicalOperationsProcedure surgeryId={surgeryId} />
        </div>
      </div>
    </div>
  );
}
