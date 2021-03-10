import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";

function PatientsWaitingTableContainer({ patientsWaiting, category }) {
  let tableData = [];
  if (patientsWaiting) {
    tableData = patientsWaiting.map((patientWaiting, index) => {
      return {
        "#": ++index,
        Title: patientWaiting.patientQueue.consultationTitle,
        "Reason for consultation":
          patientWaiting.patientQueue.reasonForConsultation,
        Patient: `${patientWaiting.patient?.lastName} ${patientWaiting.patient?.firstName}`,
        "Patient Contact": patientWaiting?.patient?.phoneNumber ?? "N/A",
        "Consultation Date": new Date(
          patientWaiting.patientQueue.dateOfConsultation
        ).toLocaleDateString(),
        "Consultation Time": new Date(
          patientWaiting.patientQueue.dateOfConsultation
        ).toLocaleTimeString(),
        Actions: (
          <PatientsWaitingActionTable patientWaiting={patientWaiting} />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={category + patientsWaiting.length}
        key={category + patientsWaiting.length}
      />
    </div>
  );
}

const PatientsWaitingActionTable = ({ patientWaiting }) => {
  return (
    <ActionButton>
      <Link
        title="Clarking"
        to={{
          pathname: "/DoctorClarking",
          state: {
            type: "consultation",
            id: patientWaiting.patientQueue.id,
            patient: patientWaiting.patient,
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
            id: patientWaiting.patient.id,
            firstName: patientWaiting.patient.firstName,
            lastName: patientWaiting.patient.lastName,
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
