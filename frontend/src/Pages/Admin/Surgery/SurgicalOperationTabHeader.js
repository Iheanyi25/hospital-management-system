import React from 'react'

export default function SurgicalOperationTabHeader() {
    return (
        <ul
        className="nav nav-tabs mb-3"
        id="operations-tab"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className="nav-link active show"
            id="operations-note-tab"
            data-toggle="pill"
            href="#operations-note"
            role="tab"
            // aria-controls="pills-pending"
            aria-selected="false"
          >
            Operation Note I
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="operations-notetwo-tab"
            data-toggle="pill"
            href="#operations-notetwo"
            role="tab"
            // aria-controls="pills-accepted"
            aria-selected="false"
          >
             Operation Note II
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="operations-procedure-tab"
            data-toggle="pill"
            href="#operations-procedure"
            role="tab"
            // aria-controls="operations-procedure"
            aria-selected="false"
          >
             Operation procedure
          </a>
        </li>

      </ul>
    )
}
