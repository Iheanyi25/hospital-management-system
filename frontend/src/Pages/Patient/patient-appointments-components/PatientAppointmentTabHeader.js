import React from 'react'

export default function PatientAppointmentTabHeader() {
    return (
        <ul
        className="nav nav-tabs mb-3"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-pending-tab"
            data-toggle="pill"
            href="#pills-pending"
            role="tab"
            aria-controls="pills-pending"
            aria-selected="true"
          >
            Pending Appointments
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-completed-tab"
            data-toggle="pill"
            href="#pills-completed"
            role="tab"
            aria-controls="pills-completed"
            aria-selected="false"
          >
            Completed Appointments
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-cancelled-tab"
            data-toggle="pill"
            href="#pills-cancelled"
            role="tab"
            aria-controls="pills-cancelled"
            aria-selected="false"
          >
            Canceled Appointments
          </a>
        </li>
      </ul>
    )
}
