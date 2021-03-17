import React from 'react'
import DoctorImage from "../../assets/img/DoctorIcon.svg";
import { notification } from "../../utils/notification";

export default function PatientAppointmentTabContent() {
    return (
        <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane show fade active"
          id="pills-pending"
          role="tabpanel"
          aria-labelledby="pills-pending-tab"
        >
          <AppointmentTableContainer
            appointments={pendingAppointments}
            category="pending"
            mutate={mutate}
          />
        </div>

        <div
          className="tab-pane fade"
          id="pills-accepted"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          <AppointmentTableContainer
            appointments={acceptedAppointments}
            category="accepted"
            mutate={mutate}
          />
        </div>

        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-cancelled-tab"
        >
          <AppointmentTableContainer
            appointments={completedAppointments}
            category="completed"
            mutate={mutate}
          />
        </div>
      </div>
    </div>
    )
}
