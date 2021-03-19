import React from 'react'
import PatientConsultationTableContainer from './PatientConsultationTableContainer'


export default function PatientConsultationTabContent({
    pendingConsultations,
    completedConsultations,
    cancelledConsultations,
    mutate
  }) {
      console.log(pendingConsultations, completedConsultations, cancelledConsultations,44444)
    return (
        <div>
        <div className="tab-content" id="pills-tabContent">
          <div
           className="tab-pane fade show active"
           id="pills-pending"
           role="tabpanel"
           aria-labelledby="pills-pending-tab"
          >
            <PatientConsultationTableContainer
              consultations={pendingConsultations}
              category="pending"
              mutate={mutate}
            />
          </div>
  
          <div
           className="tab-pane fade"
           id="pills-completed"
           role="tabpanel"
           aria-labelledby="pills-completed-tab"
          >
            <PatientConsultationTableContainer
              consultations={completedConsultations}
              category="completed"
              mutate={mutate}
            />
          </div>
  
          <div
            className="tab-pane fade"
            id="pills-cancelled"
            role="tabpanel"
            aria-labelledby="pills-cancelled-tab"
          >
            <PatientConsultationTableContainer
              consultations={cancelledConsultations}
              category="cancelled"
              mutate={mutate}
            />
          </div>
        </div>
      </div>
    )
}
