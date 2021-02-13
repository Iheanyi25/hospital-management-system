import React from "react";
import DoctorImage from "../../../assets/img/PatientAndAdminIcon.svg";
import { Link } from "react-router-dom";
import {
  PatientsAttendedTableContainer,
  PatientsWaitingTableContainer,
} from "./tab-components";

const $ = window.$;
$.Datatable = require("datatables.net");

function ConsultationTabContent({
  pendingAppointments,
  completedConsultations,
  patients,
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
            pendingAppointments={pendingAppointments}
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
            completedConsultations={completedConsultations}
            category="attendedList"
          />
        </div>
        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          <div className="table-responsive">
            <table
              //   ref={(en) => (this.en = en)}
              className="table table-striped"
              data-paging="true"
              data-info="true"
            >
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>First Name</th>
                  <th className="text-nowrap">Last Name</th>
                  <th className="text-nowrap">Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients
                  ? patients.map((patient) => (
                      <tr>
                        <td>
                          {" "}
                          <img
                            src={DoctorImage}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-500"
                          />
                        </td>
                        <td>{patient.patient.firstName}</td>
                        <td>{patient.patient.lastName}</td>
                        <td>
                          <div className="d-flex align-items-center nowrap">
                            {patient.patient.email}
                          </div>
                        </td>
                        <td>{patient.patient.phoneNumber}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm btn-block dropdown-toggle"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Action
                            </button>
                            <div className="dropdown-menu">
                              <Link
                                title="Patient Profile"
                                to={{
                                  pathname: `/DoctorPatientProfile/${patient.patientId}`,
                                  state: patient.patient,
                                }}
                                className="btn btn-sm btn-block"
                              >
                                <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                View Profile
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ConsultationTabContent };
