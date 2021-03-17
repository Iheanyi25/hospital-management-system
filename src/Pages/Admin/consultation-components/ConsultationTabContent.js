import React from "react";
import ConsultationsCompleted from "./ConsultationsCompleted";
import ConsultationsOnOpenList from "./ConsultationsOnOpenList";
import ConsultationsWithDoctors from "./ConsultationsWithDoctors";
// import ConsultationTableContainer from "./ConsultationTableContainer";

export default function ConsultationTabContent() {
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
          <ConsultationsWithDoctors />
        </div>

        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          <ConsultationsCompleted />
        </div>
      </div>
    </div>
  );
}
