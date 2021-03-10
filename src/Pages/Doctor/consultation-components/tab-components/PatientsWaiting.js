import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";

function PatientsWaitingTableContainer({ pendingAppointments, category }) {
  let tableData = [];
  if (pendingAppointments) {
    tableData = pendingAppointments.map((pendingAppointment, index) => {
      return {
        "#": ++index,
        Title: pendingAppointment.patientQueue.consultationTitle,
        "Reason for consultation":
          pendingAppointment.patientQueue.reasonForConsultation,
        Patient: `${pendingAppointment.patient?.lastName} ${pendingAppointment.patient?.firstName}`,
        "Patient Contact": pendingAppointment?.patient?.phoneNumber ?? "N/A",
        "Consultation Date": new Date(
          pendingAppointment.patientQueue.dateOfConsultation
        ).toLocaleDateString(),
        "Consultation Time": new Date(
          pendingAppointment.patientQueue.dateOfConsultation
        ).toLocaleTimeString(),
        Actions: (
          <PatientsWaitingActionTable pendingAppointment={pendingAppointment} />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={category + pendingAppointments.length}
        key={category + pendingAppointments.length}
      />
    </div>
  );
}

const PatientsWaitingActionTable = ({ pendingAppointment }) => {
  return (
    <ActionButton>
      <Link
        title="Clarking"
        to={{
          pathname: "/DoctorClarking",
          state: {
            type: "consultation",
            id: pendingAppointment.patientQueue.id,
            patient: pendingAppointment.patient,
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-stethoscope-alt mr-3" />
        Go to Clarking
      </Link>
      <Link
        title="Clarking History"
        to={{
          pathname: "/ViewClarkingHistory",
          state: {
            id: pendingAppointment.patient.id,
            firstName: pendingAppointment.patient.firstName,
            lastName: pendingAppointment.patient.lastName,
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-stethoscope-alt mr-3" />
        View Clarking History
      </Link>
    </ActionButton>
  );
};
export { PatientsWaitingTableContainer };
