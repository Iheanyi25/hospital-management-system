import React from 'react'

export default function AppointmentTabHeader() {
    return (
        <ul
        className="nav nav-tabs mb-3"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className="nav-link active show"
            id="pills-pending-tab"
            data-toggle="pill"
            href="#pills-pending"
            role="tab"
            aria-controls="pills-pending"
            aria-selected="false"
          >
            Pending Appointments
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-accepted-tab"
            data-toggle="pill"
            href="#pills-accepted"
            role="tab"
            aria-controls="pills-accepted"
            aria-selected="false"
          >
            Accepted Apppointments
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
            id="pills-rejected-tab"
            data-toggle="pill"
            href="#pills-rejected"
            role="tab"
            aria-controls="pills-rejected"
            aria-selected="false"
          >
            Rejected Appointments
          </a>
        </li>

      </ul>
    )
}
