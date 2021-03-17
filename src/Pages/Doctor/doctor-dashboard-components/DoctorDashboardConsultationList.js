import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../Components";

export default function DoctorDashboardConsultationList({
  pendingConsultations
}) {
  let dataTable = [];
  if (pendingConsultations) {
    dataTable = pendingConsultations.map((pendingConsultation, index) => {
      return {
        "#": ++index,
        Title: pendingConsultation?.patientQueue?.consultationTitle,
        "Reason for Consultation":
          pendingConsultation?.patientQueue?.reasonForConsultation,
        Patient:
          `${pendingConsultation?.patient?.firstName} ${pendingConsultation?.patient?.lastName}` ??
          "N/A",
        "Patient Contact": pendingConsultation?.patient?.phoneNumber ?? "N/A",
        Time: new Date(
          pendingConsultation.patientQueue.dateOfConsultation
        ).toLocaleTimeString(),
        Actions: (
          <DoctorDashboardTableActions
            pendingConsultation={pendingConsultation}
          />
        ),
      };
    });
  }

  return (
    <div>
      <div className="card mb-0">
        <div className="card-header">Pending Consultations</div>
        <div className="card-body">
          <div className="table-responsive">
            <Table content={dataTable} />
          </div>
        </div>
      </div>
    </div>
  );
}

const DoctorDashboardTableActions = ({pendingConsultation}) => {
  return (
    <div>
      <Link
        title="Clarking"
        to={{
          pathname: "/DoctorClarking",
          state: {
            type: "pendingConsultation",
            id: pendingConsultation.patientQueue.id,
            patient: pendingConsultation.patient,
          },
        }}
        className="btn btn-secondary btn-sm btn-square rounded-pill"
      >
        <span className="btn-icon icofont-stethoscope-alt" />
      </Link>
      <Link
        title="Clarking History"
        to={{
          pathname: "/ViewClarkingHistory",
          state: {
            id: pendingConsultation.patient.id,
            firstName: pendingConsultation.patient.firstName,
            lastName: pendingConsultation.patient.lastName,
          },
        }}
        className="btn btn-primary btn-sm btn-square rounded-pill"
      >
        <span className="btn-icon icofont-stethoscope-alt" />
      </Link>
    </div>
  );
};
